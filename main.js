let loc = "https://raw.githubusercontent.com/cd94/f20dv_lab4/master/data.csv";

let dataMap = new Map();

let acousticness = [];
let danceability = [];
let energy = [];
let instrumentalness = [];
let liveness = [];
let speechiness = [];



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

    //console.log(dataMap)

    console.log("data imported.");

    buildData();

});


/**
 * 
 * Function to populate all of the arrays for ranged data: acousticness, danceability, energy, instrumentalness, liveness and speechiness.
 */
function buildData(){

    acousticness = [];
    danceability = [];
    energy = [];
    instrumentalness = [];
    liveness = [];
    speechiness = [];
    
    dataMap.forEach(function(value,key){
        
        buildAcousticData(value,key);
        buildDanceData(value,key);
        buildEnergyData(value,key);
        buildInstrumentalData(value,key);
        buildLivenessData(value,key);
        buildSpeechinessData(value,key);
        
    })
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
    
    acousticness.push({year:year,avg:acouAvg});
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
    
    danceability.push({year:year,dance:danceAvg});
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
    
    energy.push({year:year,energy:energyAvg});
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
    
    instrumentalness.push({year:year,instru:instrumentalAvg});
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
    
    liveness.push({year:year,live:liveAvg});
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
    
    speechiness.push({year:year,speech:speechAvg});
}