//---------------------------------------------------------
//TABLE CONSTRUCTOR FUNCTION
//---------------------------------------------------------
function buildTable(metadata) {
    // reset data in table
    document.querySelector("#sample-metadata").innerHTML = "";
  
    // populating each value
    Object.entries(metadata).forEach(([key, value]) => {
        let tableElement = document.createElement("h4");
        tableElement.textContent = `${key.toUpperCase()}: ${value}`;
        panel.append(tableElement);
    });
};

//---------------------------------------------------------
//BAR CHART CONSTRUCTOR FUNCTION
//---------------------------------------------------------
function buildBar(sortedSample) {
    // define title here for easy editing
    let barTitle = `Top 10 OTUs Found in Subject ${subjectNum}'s Bellybutton`

    // define trace's data
    let trace1 = {
        y: sortedSample.otu_ids,
        x: sortedSample.sample_values,
        text: sortedSample.otu_labels,
        name: `Subject ${subjectNum}`,
        type: "bar",
        orientation: "h",
    };
    let barTraceData = [trace1]

    // define trace's layout
    let barLayout = {
        title: barTitle,
        margin: {
            t: 30,
            b: 30,
            l: 10,
            r: 10
        }
    };

    // graph plot
    Plotly.newPlot("bar", barTraceData, barLayout);
};

//---------------------------------------------------------
//BUBBLE CHART CONSTRUCTOR FUNCTION
//---------------------------------------------------------
function buildBubble(sortedSample) {
    // define title here for easy editing
    let barTitle = `Bacteria Cultures Per Sample in ${subjectNum}'s Bellybutton`

    // define trace's data
    let trace1 = {
        y: sortedSample.otu_ids,
        x: sortedSample.sample_values,
        text: sortedSample.otu_labels,
        name: `Subject ${subjectNum}`,
        mode: 'markers',
        marker: {
            size: sortedSample.sample_values,
            color: sortedSample.otu_ids,
            // colorscale: 'Earth'
        }
        // type: "bubble"
    };
    let bubbleTraceData = [trace1]

    // define trace's layout
    let barLayout = {
        title: barTitle,
        margin: {
            t: 30,
            b: 30,
            l: 10,
            r: 10
        },
        hovermode: "closest",
        xaxis: { title: "OTU ID" }
    };

    // graph plot
    Plotly.newPlot("bubble", bubbleTraceData, bubbleLayout);
};

//---------------------------------------------------------
//GAUGE CHART CONSTRUCTOR FUNCTION
//---------------------------------------------------------
function buildGauge(sortedSample) {
    // define title here for easy editing
    let gaugeTitle = `Gauge ${subjectNum}'s`

    // define trace's data
    var trace1 = [
        {
            type: "indicator",
            mode: "gauge+number+delta",
            value: 420,
            title: {
                text: "Speed",
                font: { size: 24 }
            },
            delta: {
                reference: 400,
                increasing: { color: "RebeccaPurple" }
            },
            gauge: {
                axis: { 
                    range: [null, 500],
                    tickwidth: 1,
                    tickcolor: "darkblue" 
                },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 250], color: "cyan" },
                    { range: [250, 400], color: "royalblue" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 490
                }
            }
        }
    ];
    let gaugeTraceData = [trace1]
    
    // define trace's layout
    var gaugeLayout = {
        //title: gaugeTitle,
        width: 500,
        height: 400,
        paper_bgcolor: "lavender",
        margin: {
            t: 25,
            r: 25,
            l: 25,
            b: 25
        },
        font: {
            color: "darkblue",
            family: "Arial" 
        }
    };
    
    // graph plot
    Plotly.newPlot('myDiv', gaugeTraceData, gaugeLayout);
};