//---------------------------------------------------------
//GLOBAL VARIABLES
//---------------------------------------------------------
// create filepath of file
const filepath = 'resources/samples.json'

//---------------------------------------------------------
//LOADER FUNCTION THAT LOADS DATA FROM FILE
//---------------------------------------------------------
// fetch call using promises
// fetch(filepath).then(response => response.json())

// fetch call using async function
async function loadFile(path) {
    return (await fetch(path)).json();
};

//---------------------------------------------------------
//SCRAPER/PARSER FUNCTION FOR ANY GIVEN SUBJECT NUMBER
//---------------------------------------------------------
// scraping samples
async function scrapeData(subjectNum, type) {
    // load data from file
    let bigData = await loadFile(filepath);
    // console.log(bigData);

    // filter down to either sample or metadata of given subject number
    if (type === "sample") {
        return bigData.samples.filter(item => item.id == subjectNum)[0];
    } else if (type === "metadata") {
        return bigData.metadata.filter(item => item.id == subjectNum)[0];
    } else {
        return;
    };
};

//---------------------------------------------------------
//WEBPAGE POPULATOR/GRAPHER FUNCTION FOR ANY GIVEN SUBJECT NUMBER
//---------------------------------------------------------
function populator(subjectNum) {
    //build table
    let metadata = scrapeData(subjectNum, "metadata");
    buildTable(metadata);

    // build charts
    let sample = scrapeData(subjectNum, "sample");
    let sortedSample = sortTopTen(sample);
    buildBar(sortedSample);
    buildBubble(sortedSample);
    // buildGauge(sortedSample);
};

//---------------------------------------------------------
//SORTER FUNCTION TO FIND TOP 10 OTU FROM SAMPLE
//---------------------------------------------------------
// define a helper function called zip to help combine arrays
// function zip(arr1, arr2) {
//     return arr1.map((element, i) => [element, arr2[i]]);
// };

// // function that sorts, using the helper function
// function sortTopTen(sample) {
//     let zippedSample = zip(sample.sample_values, zip(sample.otu_ids, sample.otu_labels));
//     let sortedZippedSample = zippedSample.sort((a,b) => b[0] - a[0]);
//     return sortedZippedSample.slice(0, 10);
// };

// sample is already sorted, just return the slice
function sortTopTen(sample) {
    sample.otu_ids = sample.otu_ids.slice(0, 10)
    sample.otu_labels = sample.otu_labels.slice(0, 10)
    sample.sample_values = sample.sample_values.slice(0, 10)
};

//---------------------------------------------------------
//WEBPAGE CONSTRUCTOR FUNCTION FOR CREATING GRAPH ELEMENTS
//---------------------------------------------------------
function constructor() {
    // initialize default graphs
    populator('940')
    // add functionality to each item in dropdown menu
    document.querySelector("#selDataset").addEventListener("change", event => {
        populator(event.target.value);
        // buildMetadata(event.target.value);
    });

    // populate dropdown menu
    bigData.names.forEach(item => {
        let option = document.createElement("option");
        option.textContent = item;
        document.querySelector("#selDataset").append(option);
    });
    // initialize default menu option
    document.querySelector("#selDataset").value = '940';
};

//---------------------------------------------------------
//AND FINALLY, RUNNING ALL THE FUNCTIONS
//---------------------------------------------------------
constructor();