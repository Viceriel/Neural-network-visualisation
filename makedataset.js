function createDataset()
{
	var dataset = new Array();
	var x = 0;
	var counter = 0;
	var scale_y = d3.scale.linear();
	var scale_x = d3.scale.linear();
	scale_y.domain([-1, 1])
	 	.range([0, 1]);

	scale_x.domain([0, 6.35])
	 	.range([0, 1]);

	while (x < 6.28)
	{
		dataset[counter] = new Array(2);
		dataset[counter][0] = scale_x(x);
		dataset[counter++][1] = scale_y(Math.sin(x));
		x += 0.1;
	}

	return dataset;
}

function makeNetwork(size, topology)
{
	neural = new Array(size);

	for (var i = 0; i < size; i++)
	{
		neural[i] = new Array(topology[i]);

		for (var j = 0; j < topology[i]; j++)
		{
			if (i == 0)
				neural[i][j] = new Neuron(0);
			else
				neural[i][j] = new Neuron(neural[i-1]);
		}
	}

	return neural;
}

function run(dataset, neural, size, topology)
{
	var len = dataset.length;
	var buff = new Array(7);

	for (i = 0; i < 7; i++) 
		buff[i] = new Array(len);

	var index = 0;
	for (i = 0; i < len; i++)
	{	 
		neural[0][0].output = dataset[i][0];

		for (var k = 1; k < size; k++)
		{
			for (j = 0; j < topology[k]; j++)
			{
				neural[k][j].Activate();
				if (k == 1)
				{
					buff[j+1][i] = new Array(2);
					buff[j+1][i][0] = dataset[i][0];
					buff[j+1][i][1] = neural[1][j].output
				}
			}
		}

		buff[0][i] = new Array(2);
		buff[6][i] = new Array(2);
		buff[0][i][0] = dataset[i][0];
		buff[0][i][1] = neural[size-1][0].output;
		buff[6][i][0] = dataset[i][0];
		buff[6][i][1] = neural[size-1][0].input;
	}

	return buff;
}

function getFormulars()
{
	var weights_biases = new Array(2);

	weights_biases[0] = new Array(5);
	root = document.getElementById("synapse");
	counter = 0;
	var classes = ["w1", "b1", "w2", "b2", "w3", "b3", "w4", "b4", "w5", "b5"];

	for (i = 0; i < 5; i++)
	{
		weights_biases[0][i] = new Array(2);
		weights_biases[0][i][0] = root.children[counter++];
		weights_biases[0][i][1] = root.children[counter++];

		weights_biases[0][i][0].className = classes[counter-2];
		weights_biases[0][i][1].className = classes[counter-1];
		weights_biases[0][i][0].addEventListener("change", function(){alert("ahoj");}, false);
		weights_biases[0][i][1].addEventListener("change", function(){alert("ahoj");}, false);
	}

	return weights_biases;
}