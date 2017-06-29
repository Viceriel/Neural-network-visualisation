var dataset = createDataset();
var neural = makeNetwork(3, [1, 5, 1], dataset);
var buff = run(dataset, neural, 3, [1, 5, 1]);
getFormulars();

var WIDTH = 300;
var HEIGHT = 300;
var PADDING = 12;
var line = d3.svg.line()
				 .x(function(d){return d[0]*50;})
				 .y(function(d){return HEIGHT-d[1]*100 - PADDING;})
				 .interpolate("linear");


function DrawGraphs(canvases)
{
	canvases[0].append("path")
				.attr({d: line(buff[0]), 
				   "stroke": "green", 
				   "stroke-width": 1,
				   "fill": "none"});

	canvases[0].append("path")
				.attr({d: line(dataset), 
				   "stroke": "blue", 
				   "stroke-width": 1,
				   "fill": "none"});

	for (i = 1; i < 7; i++)
	{
		canvases[i].append("path")
					.attr({d: line(buff[i]), 
				   		"stroke": "blue", 
				   		"stroke-width": 1,
				   		"fill": "none"});
	}
}