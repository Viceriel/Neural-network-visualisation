var data = createDataset();
var neural = makeNetwork(3, [1, 5, 1], data);
var buffer = run(data, neural, 3, [1, 5, 1]);
getFormulars();
var canvases = GetCanvases();

DrawGraphs(canvases, buffer, data);
initializeHandlers();

/**
 * Application of user typed synapse to neural network, running with new synapse, execution of drawing and display of square error
 *
 *@param {Array} synapses array of user typed values of weights
 */
function MainFlow(synapses)
{
	var len = synapses.length;
	var counter = 0;
	var layers = 3;
	var topology = [1, 5, 1];

	for (var i = 1; i < layers; i++)
	{
		for (var j = 0; j < topology[i]; j++)
		{
			var len = neural[i][j].weights.length;
			for (var k = 0; k < len; k++)
			{
				neural[i][j].weights[k] = synapses[counter++];
			}
			neural[i][j].bias = synapses[counter++];
		}
	}

	var buff = run(data, neural, layers, topology);
	DrawGraphs(canvases, buff, data);

	var square_error = ComputeError(data, buff[0]);
	var textik = document.getElementById("err");
	textik.innerHTML = "Square error: "
	textik.innerHTML = textik.innerHTML + square_error;
}
