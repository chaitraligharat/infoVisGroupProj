$(document).ready(function(){

  var genders ={f:"Female",m:"Male"}

  var selectedGender=$("#gender").val();
  var selectedAge;

  //init
  $("." + selectedGender).show();

  //On changing age
  $("#age").change(function(){
      selectedAge = this.val();

      $("#section1Control").value=selectedAge;
      $("#sel-age").value=selectedAge;
  });

  //On changing age
  $("#gender").change(function(){
      selectedGender = this.val();

      $("#sel-gender").value=genders[selectedGender];

      $(".trends").toggle(false);
      $("." + selectedGender).toggle(true);
  });

  var graph = drawGraph("vis1", 500, 400);
  

});



function drawGraph(id, svgWidth, svgHeight) {
  var graphDIV = d3.select('#' + id)
  var padding = 20;

  var graphSVG=graphDIV.append('svg')        // create an <svg> element
      .attr('width', svgWidth) // set its dimentions
      .attr('height', svgHeight)
      .attr('class','graph');

     // define the y scale  (vertical)
        var yScale = d3.scale.linear()
	        .domain([0, 10])    // values between 0 and 100
		.range([svgHeight - padding*2, padding]);   // map these to the chart height, less padding.
                 //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.


        var xScale = d3.scale.linear()
	        .domain([0, 10])    // values between for month of january
		.range([padding, svgWidth - padding * 2]);   // map these the the chart width = total width minus padding at both sides


     //Create the Axis
     var xAxis = d3.svg.axis()
                        .scale(xScale);


    // define the y axis
        var yAxis = d3.svg.axis()
            .orient("left")
            .scale(yScale);

        // define the y axis
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(xScale);

        // draw y axis with labels and move in from the size by the amount of padding
        graphSVG.append("g")
            .attr("transform", "translate("+padding*2+",0)")
            .call(yAxis);

        // draw x axis with labels and move to the bottom of the chart area
        graphSVG.append("g")
            .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
            .attr("transform", "translate("+padding+"," + (svgHeight - padding*2) + ")")
            .call(xAxis);

        // now add titles to the axes
          graphSVG.append("text")
              .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
              .attr("transform", "translate("+ (padding/2) +","+(svgHeight/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
              .text("Effort")
              .attr("class","graph-text");

          graphSVG.append("text")
              .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
              .attr("transform", "translate("+ (svgWidth/2) +","+(svgHeight-(padding/3))+")")  // centre below axis
              .text("Salary")
              .attr("class","graph-text");

    return graphSVG;
}
