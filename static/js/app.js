// Get the path of the data file and store into a variable
var dataFile = "./data/samples.json"

// Fetch the JSON data and print it on the console
d3.json(dataFile).then(function (dataSample) {    
    console.log(dataSample);
    dataSample.names.forEach(name => { name
        console.log(`name:  ${name}`);
        d3.select("#selDataset")
            .append("option")
            .text(name)
    });
});

// Retrieve the top ten sample values for the selected ID and plot a horizontal bar chart
function barChart(selectedId){
    d3.json(dataFile).then(function (dataSample) {    
        var dataObj = dataSample.samples.filter(data => data.id === selectedId)[0];
        console.log(dataObj);

        var trace1 = {
            // Get the ten sample values and sort in the reverse order
            x: dataObj.sample_values.slice(0,10).reverse(),
            y: dataObj.otu_ids.slice(0, 10).map(d => `OTU ${d}`).reverse(),
            text: dataObj.otu_ids.slice(0,10),
            type: "bar",
            orientation:"h"
        };

        data = [trace1]
        layout = {
            title: "Sample Values for Top Ten OTU IDs",
            xaxis: {title:"Sample Values"},
            yaxis: {title: "IDs"}
        }

        Plotly.newPlot("bar", data, layout);
    });
}

// Retrieve all the sample values for the selected ID and plot a bubble chart
function bubbleChart(selectedId){
    d3.json(dataFile).then(function (dataSample) {         
        var dataObj = dataSample.samples.filter(data => data.id === selectedId)[0];
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
            title: "Sample Values vs OTU IDs",
            xaxis: {title:"OTU IDs"},
            yaxis: {title: "Sample Values"}
        }
        Plotly.newPlot("bubble", data, layout);
    });    
}

// Retrieve and plot a pie chart for the top ten saple vaues from the dataset for the selected ID
function pieChart(selectedId){
    d3.json(dataFile).then(function (dataSample) {         
        var dataObj = dataSample.samples.filter(data => data.id === selectedId)[0];
        console.log(dataObj);

        var traceP = {
            values: dataObj.sample_values.slice(0,10).reverse(),
            labels: dataObj.otu_ids.slice(0,10).reverse(),
            type:"pie",
            mode: "pie",
            marker: {size: dataObj.sample_values, color: dataObj.otu_ids}
        };

        data = [traceP]
        layout = {
            title: "Sample Values for Top Ten OTU IDs"
        }
        Plotly.newPlot("pie", data, layout);
    });    
}

// Retrieve and display the demographic metadat from the dataset for the selected ID
function demography(selectedId) {
    d3.json(dataFile).then(function (dataSample) {            
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

// Plot the bar chart based on the dropdown item selected
function optionChanged(selectedId){
    pieChart(selectedId);
    barChart(selectedId);
    bubbleChart(selectedId);
    demography(selectedId); 
    guageChart(selectedId);    
}

// Initialize the webpage with the charts corresponding to the first OTU Id from the dataset
function init() {
    d3.json(dataFile).then(function (dataSample) {    
        var firstId = dataSample.metadata[0].id.toString();
        console.log(`first id :  ${firstId}`);

        pieChart(firstId);
        demography(firstId);
        barChart(firstId);
        bubbleChart(firstId);
        guageChart(firstId);
    });
}

// Call the init function on the page load
init();