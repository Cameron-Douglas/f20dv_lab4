let loc = "https://raw.githubusercontent.com/cd94/f20dv_lab4/master/data.csv";

let dataMap = new Map();
let keyMap = new Map();
let MajMinMap = new Map();

let acousticness = [];
let danceability = [];
let energy = [];
let instrumentalness = [];
let liveness = [];
let speechiness = [];
let KeyPie = [];
let ModePie= [];

let yearList = [];

let currCategory = "Acousticness"

const data = ["Acousticness", "Danceability", "Energy", "Instrumentalness", "Liveness", "Speechiness"]

// Dropdown found at: https://stackoverflow.com/questions/33777272/creating-a-drop-down-with-d3-js
const dropdown = d3.select("body")
    .append("div")
    .attr("class","dropdown-container")
    .append("select")
    .attr("class","selection")

const options = dropdown.selectAll("option")
    .data(data)
    .enter()
    .append("option")

const button = d3.select(".dropdown-container")
        .append("input")
        .attr("type","button")
        .attr("class","resetButton")
        .attr("value","Reset Zoom")
        .attr("onclick","buildData(yearList,true)");

options.text(data=>data)
    .attr("value", data=>data)

d3.select("select")
    .on("change",d=>{ var selected = d3.select("select").node().value; onSelection(selected);})

d3.csv(loc,function(data){
    return data;
}).then(function(data){

    console.log("reading data...");

    let year = "1928";
    let yearSongs = [];

    for(let i = 0; i<data.length;i++){
        if(data[i].release_date.split("-")[0] == year){
            yearSongs.push(data[i]);
        } else{
            dataMap.set(year,yearSongs);
            yearSongs = [];
            year = data[i].release_date.split("-")[0];
            yearSongs.push(data[i]);
        }
    }

    dataMap.forEach(function(value,key){
        let date = new Date(`${key}-01-01`)
        yearList.push(date.getFullYear())
    })

    yearList.sort(function(a,b){
        return a.x - b.x;
    })

    console.log(yearList)

    console.log("data imported.");

    console.log("building datasets...")
    buildData(yearList,false);
    console.log("datasets built.")
});


function onSelection(selected){
    console.log(selected)
    switch(selected){
        case "Acousticness" :
            currCategory = "Acousticness";
            updateAxes(acousticness, "Acousticness");
            addLine(acousticness);
            break;
        case "Danceability" :
            currCategory = "Danceability";
            updateAxes(danceability, "Danceability");
            addLine(danceability);
            break;
        case "Energy" :
            currCategory = "Energy";
            updateAxes(energy, "Energy");
            addLine(energy);
            break;
        case "Instrumentalness" :
            currCategory = "Instrumentalness";
            updateAxes(instrumentalness, "Instrumentalness");
            addLine(instrumentalness);
            break;
        case "Liveness" :
            currCategory = "Liveness";
            updateAxes(liveness, "Liveness");
            addLine(liveness);
            break;
        case "Speechiness" :
            currCategory = "Speechiness";
            updateAxes(speechiness, "Speechiness");
            addLine(speechiness);
            break;
    }
}

/**
 * 
 * Function to populate all of the arrays for ranged data: acousticness, danceability, energy, instrumentalness, liveness and speechiness.
 */
function buildData(years,bool){

    acousticness = [];
    danceability = [];
    energy = [];
    instrumentalness = [];
    liveness = [];
    speechiness = [];
    keyMap.clear();
    MajMinMap.clear();
    KeyPie = [];
    ModePie = [];

    

    dataMap.forEach(function(value,key){
        let date = new Date(`${key}-01-01`)
        if(years.includes(date.getFullYear())){
            buildAcousticData(value,key);
            buildDanceData(value,key);
            buildEnergyData(value,key);
            buildInstrumentalData(value,key);
            buildLivenessData(value,key);
            buildSpeechinessData(value,key);

            buildKeyData(value,key);
        }
    });
    //console.log(MajMinMap);

    keyMap.forEach(function(value,key){
        KeyPie.push({x:key,y:value});
    });

    MajMinMap.forEach(function(value,key){
        ModePie.push(value);
    });

    KeyPie.sort(function(a,b){
        return a.x - b.x;
    })

    for(let i = 0; i<KeyPie.length; i++){
        let val = KeyPie[i].y
        KeyPie[i] = val;
    }

    if(bool == false){
        drawMode(ModePie);
        drawKey(KeyPie,years);

        setupAxes(acousticness, currCategory);

        addLine(acousticness);

    } else{
        updateKey(KeyPie,years);
        updateMode(ModePie);
        onSelection(currCategory);
    }
    
}

/**
 * Populates the Acousticness array with pairs {year, average acousticness}
 * @param {*} array of songs from a specific year
 * @param {*} string given year for the data array
 */
function buildAcousticData(data,year){
    
    let acouSum = 0;

    for(let i = 0; i<data.length; i++){   
        acouSum += parseFloat(data[i].acousticness);
    }
    let acouAvg = acouSum/data.length;

    let date = new Date(`${year}-01-01`)

    acousticness.push({x:date,y:acouAvg});

    acousticness.sort(function(a,b){
        return a.x - b.x;
    })
}

/**
 * Populates the Danceability array with pairs {year, average danceability}
 * @param {*} array of songs from a specific year
 * @param {*} string given year for the data array
 */
function buildDanceData(data,year){
    
    let danceSum = 0;

    for(let i = 0; i<data.length; i++){   
        danceSum += parseFloat(data[i].danceability);
    }
    let danceAvg = danceSum/data.length;

    let date = new Date(`${year}-01-01`)
    
    danceability.push({x:date,y:danceAvg});

    danceability.sort(function(a,b){
        return a.x - b.x;
    })
}

/**
 * Populates the Energy array with pairs {year, average energy}
 * @param {*} array of songs from a specific year
 * @param {*} string given year for the data array
 */
function buildEnergyData(data,year){
    
    let energySum = 0;

    for(let i = 0; i<data.length; i++){   
        energySum += parseFloat(data[i].energy);
    }
    let energyAvg = energySum/data.length;

    let date = new Date(`${year}-01-01`)
    
    energy.push({x:date,y:energyAvg});

    energy.sort(function(a,b){
        return a.x - b.x;
    })
}

/**
 * Populates the Instrumentalness array with pairs {year, average instrumentalness}
 * @param {*} array of songs from a specific year
 * @param {*} string given year for the data array
 */
function buildInstrumentalData(data,year){
    
    let instrumentalSum = 0;

    for(let i = 0; i<data.length; i++){   
        instrumentalSum += parseFloat(data[i].instrumentalness);
    }
    let instrumentalAvg = instrumentalSum/data.length;

    let date = new Date(`${year}-01-01`)
    
    instrumentalness.push({x:date,y:instrumentalAvg});

    instrumentalness.sort(function(a,b){
        return a.x - b.x;
    })
}

/**
 * Populates the Liveness array with pairs {year, average liveness}
 * @param {*} array of songs from a specific year
 * @param {*} string given year for the data array
 */
function buildLivenessData(data,year){
    
    let liveSum = 0;

    for(let i = 0; i<data.length; i++){   
        liveSum += parseFloat(data[i].liveness);
    }
    let liveAvg = liveSum/data.length;

    let date = new Date(`${year}-01-01`)
    
    liveness.push({x:date,y:liveAvg});

    liveness.sort(function(a,b){
        return a.x - b.x;
    })
}

/**
 * Populates the Speechiness array with pairs {year, average speechiness}
 * @param {*} array of songs from a specific year
 * @param {*} string given year for the data array
 */
function buildSpeechinessData(data,year){
    
    let speechSum = 0;

    for(let i = 0; i<data.length; i++){   
        speechSum += parseFloat(data[i].speechiness);
    }
    let speechAvg = speechSum/data.length;

    let date = new Date(`${year}-01-01`)
    
    speechiness.push({x:date,y:speechAvg});

    speechiness.sort(function(a,b){
        return a.x - b.x;
    })
}

/**
 * Populates the keyMap with counts of each key signature 
 * @param {*} array of songs from a specific year
 * @param {*} string given year for the data array
 */
function buildKeyData(data){

    for(let i = 0; i<data.length; i++){
        let base = parseInt(data[i].key);
        if(keyMap.get(base) == null){
            keyMap.set(base, 1);
        } else{
            keyMap.set(base, keyMap.get(base)+1);
        }
        
        let mode = parseInt(data[i].mode);
        if(MajMinMap.get(mode) == null){
            MajMinMap.set(mode, 1);
        } else{
            MajMinMap.set(mode, MajMinMap.get(mode)+1);
        }
    }
}