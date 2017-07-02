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

	var dataset = new Array(2);
	len = data.length;
	dataset[0] = new Array(len);
	dataset[1] = new Array(len);
	for (i= 0; i < len; i++)
	{
		dataset[0][i] = data[i][1];
		dataset[1][i] = buff[0][i][1];
	}

	var square_error = ComputeError(dataset[0], dataset[1]);
	var textik = document.getElementById("err");
	textik.innerHTML = "Square error: "
	textik.innerHTML = textik.innerHTML + square_error;
}