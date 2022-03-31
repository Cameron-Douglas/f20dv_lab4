/* Get the 'limits' of the data - the full extent (mins and max)
so the plotted data fits perfectly */

let xExtentScat;
let yExtentScat;


//X Axis
let xScat = d3.scaleLinear();

//Y Axis
let yScat = d3.scaleLinear();

const scatSvg = d3.select("body")
    .append("div")
    .attr("class","scatter-container")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + xSize + " " + ySize)
    .append("g")
    .attr("transform","translate(" + margin + "," + 75 + ")");

// Setup the axes, the axes do not need to be updated for this plot so this is run once on init 
function setupScatterAxes(data){

    /* Get the 'limits' of the data - the full extent (mins and max)
    so the plotted data fits perfectly */

    xExtentScat = d3.extent( data, d=>{ return d.x } );
    yExtentScat = d3.extent( data, d=>{ return d.y } );
    console.log(xExtentScat[0], xExtentScat[1])
    //X Axis
    xScat.domain([ xExtentScat[0], xExtentScat[1] ])
        .range([0, xMax]);

    //Y Axis
    yScat.domain([ 0, yExtentScat[1] ])
        .range([ yMax, 0]);

    //bottom
    scatSvg.append("g")
        .attr("transform", "translate(0," + yMax + ")")
        .attr("class","ScatterXaxis")
        .transition()
        .duration(transitionSpeed)
        .call(d3.axisBottom(xScat))

    //left y axis
    scatSvg.append("g")
        .attr("class","ScatterYaxis")
        .transition()
        .duration(transitionSpeed)
        .call(d3.axisLeft(yScat));


}

// Update the points on the chart
function updateScatterChart(data, category){



    var myColor = d3.scaleLinear().domain([0,212])
        .range(["dodgerblue","#1db954"]);
    
    // Remove old labels and scatter points
    let arr = [];
    
    scatSvg.selectAll(".chartLabel")
        .data(arr)
        .exit()
        .remove();
    
    scatSvg.selectAll(".scatterPoint")
        .data(arr)
        .exit()
        .remove();

    // Append chart title and axis labels

    scatSvg.append("text")
        .attr("x", xMax/2 - 50)
        .attr("y", yMax + 50)
        .attr("class","chartLabel")
        .text(category)

    scatSvg.append("text")
        .attr("x", "-137.5")
        .attr("y", yMax/2)
        .attr("class","chartLabel")
        .text("Tempo (bpm)")

    scatSvg.append("text")
        .attr("x", xMax/2)
        .attr("y",-50)
        .attr("class","chartLabel")
        .text(category + " against Tempo")
        .attr("text-anchor","middle")

    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

    // Append new points
    scatSvg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class","scatterPoint")
        .attr("cx", function (d) { return xScat(d.x) } ) // Set x and y values using the data
        .attr("cy", function (d) { return yScat(d.y) } )
        .attr("r", 5)
        .attr("fill", function(d) { return myColor(d.y) } ) // Set the color using the color scale passed in
        .attr("stroke","#212121")
        .attr("opacity","0.3")
        .on("mouseover",function(event,d,i){

            d3.select(this)
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
                .attr("opacity", "1")
                .attr("r",10);
            
            div.transition()		
                .duration(200)		
                .style("opacity", 0.7)
                .style("height","fit-content")
                .style("width","fit-content");	
            
            div	.html("<b>" + d.z + "</b>" + "<br/>"  + category + ": "+ d.x.toFixed(2) + "<br/>" + "Tempo: " + d.y.toFixed(2))	
                .style("left", (event.pageX + 25) + "px")		
                .style("top", (event.pageY - 28) + "px");
           
    
        })
        .on("mouseout",function(event,d,i){
            
            d3.select(this)
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
                .attr("r",5)
                .attr("opacity","0.3");

            div.transition()		
                .duration(500)		
                .style("opacity", 0);
            
        });
    

}