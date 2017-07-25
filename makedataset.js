/**
 * Creating normalize sine data
 *
 * @return {Array} sine data
 */
function createDataset()
{
	var dataset = new Array();
	var x = 0;
	var counter = 0;
	var scale_y = d3.scaleLinear();
	var scale_x = d3.scaleLinear();
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

/**
 * Creating neural network
 *
 *@param {Number} size neural network layers
 *@param {Array} topology count  of neurons in layers
 *@return {Neurons} specified network
 */
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

/**
 * Feedforward propagation through neural network
 *
 *@param {Array}  dataset input data for neural network
 *@param {Neurons} neural neural network
 *@param {Number} size neural network layers count
 *@param {Array} topology count  of neurons in layers
 *@return {Array} neuron responses to input stimuls
 */
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

/**
 * Setting labels to textboxesand adding jhandlers to input formulars
 */
function getFormulars()
{
	var weights_biases = new Array(1);

	weights_biases[0] = new Array(5);
	root = document.getElementById("synapse");
	counter = 0;
	var classes = ["w1", "b1", "w2", "b2", "w3", "b3", "w4", "b4", "w5", "b5", "w6", "w7", "w8", "w9", "w10", "b6"];
	var len = classes.length;

	for (var i = 0; i < 5; i++)
	{
		weights_biases[0][i] = new Array(2);
		weights_biases[0][i][0] = root.children[counter++];
		weights_biases[0][i][1] = root.children[counter++];

		weights_biases[0][i][0].className = classes[counter-2];
		weights_biases[0][i][1].className = classes[counter-1];
		weights_biases[0][i][0].value = 0;
		weights_biases[0][i][1].value = 0;
		weights_biases[0][i][0].addEventListener("change", ChangeHandler, false);
		weights_biases[0][i][1].addEventListener("change", ChangeHandler, false);

		var block = document.createElement("p");
		var tex = document.createTextNode(classes[counter-2]+":");
		block.appendChild(tex);
		document.body.appendChild(block);
		block.style.position = "absolute";
		block.style.left = weights_biases[0][i][0].offsetLeft - 30 + "px";
		block.style.top = weights_biases[0][i][0].offsetTop;
		block.style.margin = "0px";

		var block1 = document.createElement("p");
		var tex1 = document.createTextNode(classes[counter-1]+":");
		block1.appendChild(tex1);
		document.body.appendChild(block1);
		block1.style.position = "absolute";
		block1.style.left = weights_biases[0][i][1].offsetLeft - 30 + "px";
		block1.style.top = weights_biases[0][i][1].offsetTop;
		block1.style.margin = "0px";

	}

	weights_biases[1] = new Array(6);
	for (i = 0; i < 6; i++)
	{
		weights_biases[1][i] = root.children[counter++];
		weights_biases[1][i].className = classes[counter-1];
		weights_biases[1][i].value = 0;
		weights_biases[1][i].addEventListener("change", ChangeHandler, false);

		block= document.createElement("p");
		tex = document.createTextNode(classes[counter-1]+":");
		block.appendChild(tex);
		document.body.appendChild(block);
		block.style.position = "absolute";
		block.style.left = weights_biases[1][i].offsetLeft - 35 + "px";
		block.style.top = weights_biases[1][i].offsetTop;
		block.style.margin = "0px";
	}
}

/**
 * Compute sum of square differencies between two arrays
 *
 *@param {Array}
 *@param {Array}
 *@return sum of square differencies
 */
function ComputeError(arr1, arr2)
{
	var len = arr1.length;
	var res = 0;

	for (var i = 0; i < len; i++)
		res += (arr1[i][1]-arr2[i][1])*(arr1[i][1]-arr2[i][1]);

	return res;
}
