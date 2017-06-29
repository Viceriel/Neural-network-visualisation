function Neuron(previous)			//dynamic prototype of network, argument- previous neuron layer
{
	this.input;						//input of neuron
	this.output;					//output of neuron
	this.weights;					//synapses of neuron
	this.bias;						//bias 
	this.previous_layer= previous;	//previous layer of neuron

	if(this.previous_layer!= 0)
	{	
		this.weights= new Array(this.previous_layer.length);	//count of neuron synapses are previous layer + 1(one represent bias)
		for (var i = 0; i < this.previous_layer.length; i++)
			this.weights[i] = 1;

		this.bias = 0;
	}	
	else
		this.weights= null;										//case of empty previous layer

	if(typeof this.Activate!= "function")						//activation of neuron
	{
		Neuron.prototype.Activate= function()
		{

			var sum= 0;											

			for(var i= 0; i<this.previous_layer.length; i++)			//sumation of previous layer neurons output multiply with with current neuron synapses
			{
				sum+= this.weights[i]*this.previous_layer[i].output;
			}
			
			this.input= sum+this.bias;									//input is equal sumation - bias
			this.output= 1 / (1 + Math.exp(-this.input));				//output of neuron is result of activation function with current input
		}
	}
}