// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("../../MachineLearning/Resources/CSV/trained_models.csv").then(function(modelData) {
  // Step 4: Parse the data
  console.log(modelData);

  // Format the data
  modelData.forEach(function(data) {
    data.Total_Node_Count = +data.Total_Node_Count;
    data.Test_Data_Accuracy = +data.Test_Data_Accuracy;
    console.log(data.Total_Node_Count)

  });  

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, 1.0])
    .range([height, 0]);

  var xLinearScale = d3.scaleTime()
    .domain([0, 400])
    .range([0, width]);

  // Step 7: Create the axes
  // =================================
  var leftAxis = d3.axisLeft(yLinearScale);
  var bottomAxis = d3.axisBottom(xLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for morning data
  var line1 = d3.line()
    .x(d => xLinearScale(d.Total_Node_Count))
    .y(d => yLinearScale(d.Test_Data_Accuracy));

  // Line generator for evening data
//   var line2 = d3.line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale(d.Test_Data_Accuracy));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(modelData))
    .classed("line green", true);

  // Append a path for line2
//   chartGroup
//     .data([data])
//     .append("path")
//     .attr("d", line2)
//     .classed("line orange", true);

}).catch(function(error) {
  console.log(error);
});