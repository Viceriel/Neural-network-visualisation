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

var canvases = new Array(7);

canvases[0] = d3.select(".canvas1");
canvases[1] = d3.select(".canvas2");
canvases[2] = d3.select(".canvas3");
canvases[3] = d3.select(".canvas4");
canvases[4] = d3.select(".canvas5");
canvases[5] = d3.select(".canvas6");
canvases[6] = d3.select(".canvas7");

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