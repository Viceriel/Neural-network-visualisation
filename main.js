var data = createDataset();
var neural = makeNetwork(3, [1, 5, 1], data);
var buffer = run(data, neural, 3, [1, 5, 1]);
getFormulars();
var canvases = GetCanvases();

DrawGraphs(canvases, buffer, data);

function MainFlow(synapses)
{
	var len = synapses.length;
	var counter = 0;

	for (var i = 0; i < len; i+=2)
	{
		neural[1][counter].weights[0] = synapses[i];
		neural[1][counter++].bias = synapses[i+1];
	}

	var buff = run(data, neural, 3, [1, 5, 1]);
	DrawGraphs(canvases, buff, data);
}