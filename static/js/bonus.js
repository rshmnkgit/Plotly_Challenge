// Get the path of the data file
var dataFile = "./data/samples.json"


// Function to create a gauge chart
function guageChart(selectedID) {
    d3.json(dataFile).then(function (dataSample) {
        var dataObj = dataSample.metadata.filter(data => data.id.toString() === selectedID)[0];
        console.log("----- Guage -------")
        console.log(dataObj);
        console.log("----- freq -------")
        var wfreq = dataObj.wfreq;
        console.log(`wfreq:  ${wfreq}`);
        console.log("-------------------")        

        // Set the attributes for the gauge needle
        var traceN = {
             type: 'scatter',
                x: [0], y:[0],
                marker: {size: 30, color:'850000'},
                showlegend: false,
                name: 'Frequency',
                hoverinfo: 'text+name'
        };

        // Set the attributes for the nine sections for the gauge
        var traceD = {
            type: "pie",            
            showlegend: false,
            hole: 0.6,
            rotation: 90,
            values:[180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            hoverinfo: "label",
            marker: {
                colors: ["rgba(220, 20, 20, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", 
                        "rgba(144, 238, 144, 0.6)", "rgba(154, 55, 180, 0.6)","rgba(154, 90, 120, 0.6)", 
                        "rgba(4, 215, 120, 0.6)", "rgba(94, 225, 90, 0.6)", "rgba(24, 225, 5, 0.6)", "white"]
            },
        };
        var freq = parseInt(wfreq);
        console.log(`'freq : ${wfreq}`)

        var degrees = 9-freq, radius = .5;
        var radians = degrees * Math.PI / 10;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        console.log(`degrees:   ${degrees}`);
        console.log(`radians:   ${radians}`);
        console.log(`x:   ${x}`);
        console.log(`y:   ${y}`);

        // var path = path = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L `X` `Y` Z' : 'M -0.025 -0.0 L 0.025 0.0 L `X` `Y` Z'
        // var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // Path: may have to change to create a better triangle
        var mainPath = "M -0.0 -0.025 L 0.0 0.025 L "  // path1, 
        // var mainPath = path1,
            pathX = String(x), 
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        console.log(`path:   ${path}`);

        // Trig to calc meter point
        var layout = {
            height : 550,
            width: 550,
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                  color: '850000',
                  width: 8
                }
              }],
            title: `<b> Belly Button Washing Frequency </b> <br> Scrubs per week`,
            xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]}
          };

        // Define the data for the plot
        var data = [traceN, traceD];
        Plotly.newPlot("gauge", data, layout);
    });
}

