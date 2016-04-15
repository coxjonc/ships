var HEIGHT = 500;
var WIDTH = 700;
var PADDING = 60;

// select the SVG element
var svg = d3.select("svg")
            .attr("height", HEIGHT + "px")
            .attr("width", WIDTH + "px")

// Scale the range of the data
var xScale = d3.scale.linear()
               .range([PADDING, WIDTH-PADDING])
var yScale = d3.scale.linear()
               .range([HEIGHT-PADDING, PADDING])

// Get the data
d3.json("data.json", function(error, data) {

    data = Object.keys(data).map(function(d) {
        return {
            'year': d,
            'ships': data[d]
        }
    })
    debugger
    // Set the domain of the data
    xScale.domain([d3.min(data, function(d){
        return parseInt(d.year)
    }), d3.max(data, function(d){
         return parseInt(d.year)
    })])
    yScale.domain([0, d3.max(data, function(d){
         return d.ships})])

    // Create axes 
    var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .tickFormat(d3.format("d"))
                  .ticks(10)

    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .tickFormat(d3.format("d"))
                  .ticks(10)

    // Create line generator function
    var lineGen = d3.svg.line()
                    .x(function(d) {return xScale(parseInt(d.year))})
                    .y(function(d) {return yScale(d.ships)})

    // Create a line
     svg.append("path")
        .attr("d", lineGen(data))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0, " + (HEIGHT - PADDING) + ")")
       .call(xAxis)
       
    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(" + PADDING + ", 0)")
       .call(yAxis)

    svg.append("text")
       .attr("class", "label")
       .attr("text-anchor", "end")
       .attr("x", WIDTH - PADDING)
       .attr("y", HEIGHT - 20)
       .text("Year")

    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("class", "label")
       .attr("text-anchor", "end")
       .attr("x", -PADDING)
       .attr("y", 10)
       .text("Number of warships with >5 guns in Royal Navy")

    svg.append("text")
       .attr("class", "title")
       .attr("text-anchor", "middle")
       .attr("x", WIDTH/2)
       .attr("y", 20)
       .text("Number of warships active in the British Royal Navy in the mid-Victorian era")
})
