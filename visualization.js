var WIDTH = 300;
var HEIGHT = 300;
var PADDING = 12;
var line = d3.line()
				 .x(function(d){return d[0]*50;})
				 .y(function(d){return HEIGHT-d[1]*100 - PADDING;});

var uscale = d3.scaleLinear()
		     .domain([0, 300])
		     .range([0, 300]);

/**
 * Drawing graphs based on input buffer
 *
 *@param {Elements} canvases arrray of canvases Elements
 *@param {Array} buff input dataset
 *@param {Array} dataset input dataset
 */
function DrawGraphs(canvases, buff, dataset)
{
	canvases[0]
		.selectAll("path")
		.remove();

	canvases[0].append("path")
     		.data([buff[0]])
      		.attr("class", "line2")
      		.attr("d", line);

	canvases[0].append("path")
      		.data([dataset])
      		.attr("class", "line")
      		.attr("d", line);

	for (i = 1; i < 7; i++)
	{
		canvases[i]
			.selectAll("path")
			.remove();

		canvases[i].append("path")
      		.data([buff[i]])
      		.attr("class", "line")
      		.attr("d", line);
	}
}

/**
 * creating x gridlines
 */
function make_x_gridlines() {
    return d3.axisBottom(uscale)
        .ticks(5)
}

/**
 * creating y gridlines
 */
function make_y_gridlines() {
    return d3.axisLeft(uscale)
        .ticks(3)
}

/**
 * Getting canvases from document, adding labels to canvases
 *@return {Array} array of canvases
 */
function GetCanvases()
{
	var len = 7;
	var canvases = new Array(len);

	canvases[0] = d3.select(".canvas1");
	canvases[1] = d3.select(".canvas2");
	canvases[2] = d3.select(".canvas3");
	canvases[3] = d3.select(".canvas4");
	canvases[4] = d3.select(".canvas5");
	canvases[5] = d3.select(".canvas6");
	canvases[6] = d3.select(".canvas7");

	var labels = ["Output of o:", "Output of h1:", "Output of h2:", "Output of h3:", "Output of h4:", "Output of h5:", "Weighted output of hidden layer"];

	for (var i = 0; i < len; i++)
	{
		canvases[i]
			.append("g")
			  .attr("class", "grid")
			  .call(make_y_gridlines()
					.tickSize(-300)
					.tickFormat(""));

			canvases[i]
			  .append("g")
			  .attr("class", "grid")
			  .attr("transform", "translate(0," + 300 + ")")
			  .call(make_x_gridlines()
					.tickSize(-300)
					.tickFormat(""));

		if (i != 6)
		{
			canvases[i]
				.append("text")
				.attr("x", 0)
        		.attr("y", 20)
				.attr("class", "description")
				.text(labels[i]);
		}
	}

	canvases[6]
			.append("text")
			.attr("x", 0)
        	.attr("y", 20)
			.attr("class", "description")
			.text(labels[6]);

	canvases[6]
			.append("text")
			.attr("x", 0)
        	.attr("y", 40)
			.attr("class", "description")
			.text("(input of o):");
	return canvases;
}
