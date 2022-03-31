const listSvg = d3.select("body")
    .append("div")
    .attr("class","list-container")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + xSize + " " + ySize)
    .append("g")
    .attr("transform","translate(" + margin + "," + 75 + ")");

const token = "BQCxtBiyuc2oczfSgfnZ1Xxkp4sCmMhkpvoASYVTBp25aihs5_5yravCJXs6Rhb1kue73KvwGvjIbMVAbEGzAHhqJT14mE2Pl6E0jR6EOCAuH8gT9NlYtO0sHAkY8G6kX0E99fbjejKv0Kk";

function updateList(data,yearList){

    listSvg.selectAll("text")
        .attr("opacity",1)
        .transition()
        .duration(transitionSpeed)
        .attr("opacity",0)

    listSvg.append("text")
        .attr("x", xMax/2)
        .attr("y",-50)
        .attr("class","listLabel")
        .text("Most Popular Songs from " + d3.min(yearList) + " to " + d3.max(yearList))
        .attr("text-anchor","middle")
        .attr("opacity",0)
        .transition()
        .duration(transitionSpeed)
        .attr("opacity",1);
    
    
    d3.selectAll(".listitem")
        .remove();
    
    initPreview(data[0])
    
    for(let i = 0; i<data.length; i++){

        listSvg.append("text")
            .attr("x", -125)
            .attr("y",(75 * i))
            .attr("class","listitem")
            .style("font-size",()=>(20-2*i)+"px")
            .text((i+1) + ". " + data[i].name)
            .on("mouseover",function(event){

                initPreview(data[i]);
            
            });
}
   
}

function initPreview(data){

    getAlbumCover(data)
    //console.log(data)

    d3.selectAll(".previewText")
        .remove();

    listSvg.append("text")
        .attr("class","previewText")
        .attr("x",xMax-50)
        .attr("y",150)
        .text("Artist(s): " + data.artists)
        .attr("text-anchor","middle")
    
    listSvg.append("text")
        .attr("class","previewText")
        .attr("x",xMax-50)
        .attr("y",187.5)
        .text("Popularity: " + data.popularity)
        .attr("text-anchor","middle")
    
    listSvg.append("text")
        .attr("class","previewText")
        .attr("x",xMax-50)
        .attr("y",225)
        .text("Released: " + data.release_date)
        .attr("text-anchor","middle")




}

function getAlbumCover(data){
    
    let url = "https://api.spotify.com/v1/tracks/" + data.id;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            
            let response = xhr.responseText;
            let jsonResponse = JSON.parse(response)
            
            let image = jsonResponse["album"]["images"][1]["url"];

            d3.select("#image")
                .remove();

            listSvg
                .append("svg:image")
                .attr("xlink:href", image)
                .attr("width", 150)
                .attr("height", 150)
                .attr("x", xMax - 125)
                .attr("y", -25)
                .attr("id","image")

        }
    };

    console.log(xhr);
    xhr.send();
}