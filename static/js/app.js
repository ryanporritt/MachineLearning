
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var Svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../../MachineLearning/Resources/CSV/diamonds.csv", function(data) {
  console.log(data);
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 5.5])
    .range([ 0, width ]);
  var xAxis = Svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 22000])
    .range([ height, 0]);
  Svg.append("g")
    .call(d3.axisLeft(y));

  // Add a clipPath: everything out of this area won't be drawn.
  var clip = Svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

  // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["D", "E", "F", "G", "H", "I", "J"])
    .range([ "yellow", "purple", "green", "pink", "blue", "red", "orange"])


  // Add brushing
  var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

  // Create the scatter variable: where both the circles and the brush take place
  var scatter = Svg.append('g')
    .attr("clip-path", "url(#clip)")

  // Add circles
  scatter
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.carat); } )
      .attr("cy", function (d) { return y(d.price); } )
      .attr("r", 8)
      .style("fill", function (d) { return color(d.color); } )
      .style("opacity", 0.5)

  // Add the brushing
  scatter
    .append("g")
      .attr("class", "brush")
      .call(brush);
  
  Svg.append('text')
      .attr('x', 10)
      .attr('y', 10)
      .attr('class', 'label')
      .text('Price');
  
  Svg.append('text')
      .attr('x', width)
      .attr('y', height - 10)
      .attr('text-anchor', 'end')
      .attr('class', 'label')
      .text('Carats');
  
// draw legend
  var legend = Svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// draw legend colored rectangles
  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

// draw legend text
  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d;})


  // A function that set idleTimeOut to null
  var idleTimeout
  function idled() { idleTimeout = null; }

  //s A function that update the chart for given boundaries
  function updateChart() {

    extent = d3.event.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if(!extent){
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
      x.domain([0, 5.5])
    }else{
      x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and circle position
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    scatter
      .selectAll("circle")
      .transition().duration(1000)
      .attr("cx", function (d) { return x(d.carat); } )
      .attr("cy", function (d) { return y(d.price); } )

    }
    
   

});

