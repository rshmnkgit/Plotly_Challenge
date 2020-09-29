var dataFile = "./data/samples.json"


function guageChart(selectedID) {
    // var gaugeDiv = document.getElementById("gauge-chart");
    // d3.select("#gaugeID").html("");
    d3.json(dataFile).then(function (dataSample) {
        var dataObj = dataSample.metadata.filter(data => data.id.toString() === selectedID)[0];
        console.log("----- Guage -------")
        console.log(dataObj);
        console.log("----- freq -------")
        var wfreq = dataObj.wfreq;
        console.log(`wfreq:  ${wfreq}`);
        console.log("-------------------")        

        var traceN = {
             type: 'scatter',
                x: [0], y:[0],
                marker: {size: 30, color:'850000'},
                showlegend: false,
                name: 'Frequency',
                text: level,
                hoverinfo: 'text+name'
        };

        var traceD = {
            type: "pie",
            
            showlegend: false,
            hole: 0.6,
            rotation: 90,
            // values: [100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100],
            values:[180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            hoverinfo: "label",
            marker: {
                colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", 
                        "rgba(144, 238, 144, 0.6)", "rgba(154, 55, 180, 0.6)","rgba(154, 90, 120, 0.6)", 
                        "rgba(164, 215, 120, 0.6)", "rgba(174, 220, 90, 0.6)", "rgba(184, 225, 200, 0.6)", "white"]
            },
        };
        var level = wfreq;
        // var degrees = ((180/9) * level) , radius = .4;
        var degrees = (180 - (20*level)) , radius = .4;
        console.log(`degrees:   ${degrees}`);
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // Path: may have to change to create a better triangle
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = 'Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

// Trig to calc meter point

        var layout = {
            height : 600,
            width: 800,
            shapes:[{
                type: 'path',
                path: path,
                // x0: 0,
                // y0: 0,
                // x1: 0.5,
                // y1: 0.5,
                fillcolor: '850000',
                line: {
                  color: '850000',
                  width: 8
                }
              }],
            title: `Belly Button Washing Frequency \n Scrubs per week`,
            // xaxis: {visible: false, range: [-1, 1]},
            xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]}
            // yaxis: {visible: false, range: [-1, 1]}
          };
// // var layout = {
//     shapes:[{
//         type: 'path',
//         path: path,
//         fillcolor: '850000',
//         line: {
//           color: '850000'
//         }
//       }],
//     height: 400,
//     width: 400,
//     xaxis: {zeroline:false, showticklabels:false,
//                showgrid: false, range: [-1, 1]},
//     yaxis: {zeroline:false, showticklabels:false,
//                showgrid: false, range: [-1, 1]}
//   };
  

        // var degrees = 115, radius = .2;
        // var radians = degrees * Math.PI / 180;
        // var x = -1 * radius * Math.cos(radians);
        // var y = radius * Math.sin(radians);

        // var layout = {
        //     shapes: [{
        //         type: 'line',
        //         x0: 0,
        //         y0: 0,
        //         x1: wfreq,
        //         y1: 0.5,
        //         line: {
        //             color: 'black',
        //             width: 8
        //         }
        //     }],
        //     title: 'Number of Printers Sold in a Week',
        //     xaxis: { visible: false, range: [-1, 1] },
        //     yaxis: { visible: false, range: [-1, 1] }
        // };

        var data = [traceN, traceD];
        // Plotly.plot("gauge", data, layout);
        Plotly.plot("gauge", data, layout, { staticPlot: true });
    });
}

