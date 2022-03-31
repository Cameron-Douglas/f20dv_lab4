const keys = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const modes = ["Major","Minor"]

const radius = ySize/2;

// Initialise pie variable
let pie = d3.pie()
.sort(null);

// Initialise arc varible
let keyArc = d3.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);
let modeArc = d3.arc()
    .innerRadius(radius - 150)
    .outerRadius(radius - 100);



const pieSvg = d3.select("body")
    .append("div")
    .attr("class","pie-container")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + xSize + " " + ySize)
    .append("g")
    .attr("transform","translate(" + xSize/2 + "," + radius + ")");

var myColor = d3.scaleLinear().domain([0,11])
    .range(["#494949","#1db954"]);
var fontColor = d3.scaleLinear().domain([0,1])
    .range(["#b3b3b3","#212121"]);

/**
 * Builds the outer pie chart showing the distribution of each individual key signature
 * @param {*} dataset containing number of songs in each key in order, starting with C(0) ending in B(11) [num,num,...,num]
 */
function drawKey(dataset, yearList){ 

    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0)
        .style("height","55px");

    // Append pie paths
    let path = pieSvg.selectAll(".keyPath")
        .data(pie(dataset))
        .enter().append("path")
        .attr("class","keyPath")
        .attr("fill", function(d,i){return myColor(i)})
        .attr("d", keyArc)
        .attr("stroke","#b3b3b3")
        .attr("stroke-width","1px")
        .on("mouseover", function(event,data){

            d3.select(this)
                .transition()
                .ease(d3.easeBounce)
                .duration(1000)
                .attr('d',function(d){return d3.arc().innerRadius(radius - 100)
                    .outerRadius((radius - 50) + 10)(d)})
                .attr("stroke","#b3b3b3")
                .attr("stroke-width","2px");

            div.transition()		
                .duration(200)		
                .style("opacity", 0.9)
                .style("background",function(){return myColor(data.index)})
                .style("color",function(){ 
                    let ind = 0;
                    if(data.index < 6){
                        ind = 0;
                     } else {
                         ind = 1;
                     }
                    return fontColor(ind)});	
            
            div.html("# of Songs" + "<br/>"  + data.data)	
                .style("left", (event.pageX + 15) + "px")		
                .style("top", (event.pageY - 28) + "px");

        }) .on("mouseout",function(event,data,index){

            div.transition()		
                .duration(500)		
                .style("opacity", 0);

            d3.select(this)
                .transition()
                .ease(d3.easeBounce)
                .duration(500)
                .attr('d',function(d){return d3.arc().innerRadius(radius - 100)
                    .outerRadius(radius - 50)(d)})
                    .attr("stroke","#b3b3b3")
                    .attr("stroke-width","1px");
        })
        .transition()  // Smoothly interpolate between the old angle and the new angle
        .duration(1000)
        .attrTween("d", function (d) {
            let i = d3.interpolate(d.endAngle, d.startAngle);
            return function (t) {
            d.startAngle = i(t);
            return keyArc(d);
            }
        });

    pieSvg.selectAll('arcs')
        .data(pie(dataset))
        .enter()
        .append('text')
        .attr("class","pieLabel")
        .text(function(d,i){return keys[i]})
        .attr("transform", function(d) {return "translate(" + keyArc.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)
      
    pieSvg.append("text")
        .attr("x",0)
        .attr("y",-150)
        .attr("class","pieTitle")
        .text("Key Signature Distribution from "+ d3.min(yearList)+ " to " + d3.max(yearList))
        .attr("text-anchor","middle")
    
}

/**
 * Draws the inner pie chart showing distribution of major and minor key
 * @param {*} dataset containing number of songs in a major key and minor key: [major,minor]
 */
function drawMode(dataset){ 
   
    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0)
        .style("height","55px");

    // Append pie paths
    let path = pieSvg.selectAll(".modePath")
        .data(pie(dataset))
        .enter().append("path")
        .attr("class","modePath")
        .attr("fill", function(d,i){
            if(i == 0){
                return myColor(11)
            } else{
                return myColor(0)
            }
            })
        .attr("d", modeArc)
        .attr("stroke","#b3b3b3")
        .attr("stroke-width","1px")
        .on("mouseover", function(event,data){

            d3.select(this)
                .transition()
                .ease(d3.easeBounce)
                .duration(1000)
                .attr('d',function(d){return d3.arc().innerRadius((radius - 150))
                    .outerRadius((radius - 100)-10)(d)})
                .attr("stroke","#b3b3b3")
                .attr("stroke-width","2px");

            div.transition()		
                .duration(200)		
                .style("opacity", 0.9)
                .style("background",function(){
                    if(data.index == 0){
                    return myColor(11)
                    } else{
                        return myColor(0)
                    }})
                .style("color",function(){
                    let color; 
                    if(data.index ==1){
                        color = "#b3b3b3"
                    } else{
                        color = "#212121"
                    }
                    return color});	
            
            div.html("# of Songs" + "<br/>"  + data.data)	
                .style("left", (event.pageX + 15) + "px")		
                .style("top", (event.pageY - 28) + "px");

        }) .on("mouseout",function(event,data,index){

            div.transition()		
                .duration(500)		
                .style("opacity", 0);

            d3.select(this)
                .transition()
                .ease(d3.easeBounce)
                .duration(500)
                .attr('d',function(d){return d3.arc().innerRadius(radius - 150)
                    .outerRadius(radius - 100)(d)})
                    .attr("stroke","#b3b3b3")
                    .attr("stroke-width","1px");
        })
        .transition()  // Smoothly interpolate between the old angle and the new angle
        .duration(1000)
        .attrTween("d", function (d) {
            let i = d3.interpolate(d.endAngle, d.startAngle);
            return function (t) {
            d.startAngle = i(t);
            return modeArc(d);
            }
        });

    pieSvg.selectAll('arcs')
        .data(pie(dataset))
        .enter()
        .append('text')
        .attr("class","pieLabel")
        .text(function(d,i){return modes[i]})
        .attr("transform", function(d) {return "translate(" + modeArc.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17);
    
}

/**
 * Transition the current data in the key pie chart to the new data 
 * @param {*} dataset array containing the count of key signatures [num,num,...,num]
 * @param {*} yearList list of selected years
 */
function updateKey(dataset, yearList){
    let path = pieSvg.selectAll(".keyPath")
        .data(pie(dataset))
        .transition()
        .duration(1000)
        .attrTween("d", function(d){

            //https://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e

            var i = d3.interpolate(this._current, d);
            this._current = i(0);
            return function(t) {
                return keyArc(i(t));
            };
        });

    let arr = [];
    d3.selectAll(".pieTitle")
        .data(arr)
        .exit()
        .remove();
    
    d3.selectAll(".pieLabel")
        .data(arr)
        .exit()
        .remove();

    pieSvg.append("text")
        .attr("x",0)
        .attr("y",-150)
        .attr("class","pieTitle")
        .text("Key Signature Distribution from "+ d3.min(yearList)+ " to " + d3.max(yearList))
        .attr("text-anchor","middle");

    pieSvg.selectAll('arcs')
        .data(pie(dataset))
        .enter()
        .append('text')
        .attr("class","pieLabel")
        .text(function(d,i){return keys[i]})
        .attr("transform", function(d) {return "translate(" + keyArc.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17);
    
}

/**
 * Transition the current data in the mode pie chart to the new data 
 * @param {*} dataset array containing the count of modes [num,num]
 * @param {*} yearList list of selected years
 */
function updateMode(dataset){
    let path = pieSvg.selectAll(".modePath")
        .data(pie(dataset))
        .transition()
        .duration(1000)
        .attrTween("d", function(d){

            //https://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e

            var i = d3.interpolate(this._current, d);
            this._current = i(0);
            return function(t) {
                return modeArc(i(t));
            };
        });
    
    pieSvg.selectAll('arcs')
        .data(pie(dataset))
        .enter()
        .append('text')
        .attr("class","pieLabel")
        .text(function(d,i){return modes[i]})
        .attr("transform", function(d) {return "translate(" + modeArc.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17);
}