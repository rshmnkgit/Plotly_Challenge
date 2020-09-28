// retrieve all the data elements from a specific column of the dataset
// function unpack(rows, index) {
//     return rows.map(function (row) {
//         return row[index];
//     });
// }

// Fetch the JSON data and console log it
d3.json("samples.json").then(function (dataSample) {
    console.log(dataSample);
    dataSample.names.forEach(name => { name
        // console.log(name);
        d3.select("#selDataset")
            .append("option")
            .text(name)
    });
});

// Plot the bar chart based on the dropdown item selected
function optionChanged(selectedId){
    // d3.json("samples.json").then(function (dataSample) {        
        
    //     var dataObj = dataSample.samples.filter(data => data.id === selectedId)[0];
    //     // dataObj = dataObj.reverse();
    //     console.log(dataObj);

    //     var trace1 = {
    //         x: dataObj.sample_values.slice(0,10).reverse(),
    //         y: dataObj.otu_ids.slice(0, 10).map(d => `OTU ${d}`).reverse(),
    //         text: dataObj.otu_ids.slice(0,10),
    //         type: "bar",
    //         orientation:"h"
    //     };

    //     data = [trace1]
    //     layout = {
    //         title: "Bar Chart",
    //     }

    //     Plotly.newPlot("bar", data, layout);

        barChart(selectedId);
        bubbleChart(selectedId);
        demography(selectedId);
    // });    
}

function barChart(selectedId){
    d3.json("samples.json").then(function (dataSample) {        
        
        var dataObj = dataSample.samples.filter(data => data.id === selectedId)[0];
        // dataObj = dataObj.reverse();
        console.log(dataObj);

        var trace1 = {
            x: dataObj.sample_values.slice(0,10).reverse(),
            y: dataObj.otu_ids.slice(0, 10).map(d => `OTU ${d}`).reverse(),
            text: dataObj.otu_ids.slice(0,10),
            type: "bar",
            orientation:"h"
        };

        data = [trace1]
        layout = {
            title: "Bar Chart",
        }

        Plotly.newPlot("bar", data, layout);
    });
}

function bubbleChart(selectedId){
    d3.json("samples.json").then(function (dataSample) {        
        
        var dataObj = dataSample.samples.filter(data => data.id === selectedId)[0];
        // dataObj = dataObj.reverse();
        console.log(dataObj);

        var trace2 = {
            y: dataObj.sample_values,
            x: dataObj.otu_ids,
            text: dataObj.otu_labels,
            mode: "markers",
            marker: {size: dataObj.sample_values, color: dataObj.otu_ids}
        };

        data = [trace2]
        layout = {
            title: "Bubble Chart",
        }

        Plotly.newPlot("bubble", data, layout);
    });    
}

function demography(selectedId) {
    d3.json("samples.json").then(function (dataSample) {                
        var dataObj = dataSample.metadata.filter(data => data.id.toString() === selectedId);
        console.log("------- Metadata Obj ---------")
        console.log(dataObj);
        console.log("------------------------------")

        d3.select("#sample-metadata").html("");
        Object.entries(dataObj[0]).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h6")
                .text(`${key} : ${value}`)
        });
    });
}

function init() {
    d3.json("samples.json").then(function (dataSample) {                
        var firstId = dataSample.metadata[0].id.toString();
        console.log(`first id :  ${firstId}`);

        demography(firstId);
        barChart(firstId);
        bubbleChart(firstId);
    });
}

init();