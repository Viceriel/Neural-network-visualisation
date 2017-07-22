function initializeHandlers()
{
    var close = document.getElementById("close");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var source_list = ["title", "explanation1"];
    var index = 0;

    close.addEventListener("click", CloseHandler, false);
    //left.addEventListener("click", LeftHandler, false);
    //right.addEventListener("click", RightHandler, false);
}

function ChangeHandler(e)
{
	var root = e.target.parentNode;
	var len = root.children.length;
	var synapses = new Array(len);

	for (var i = 0; i < len; i++)
	{
		synapses[i] = parseFloat(root.children[i].value);

		if (isNaN(synapses[i]))
		{
			alert("Dear user, I like you and this all was make for you. Your pleasure, education. But you type into the textbox invalid value. I think actions like this is dishonest and unfair from you. If you will be in future in similar situation, please sacrifice some second from your precious time and ask yourself simple question, What should I type into the textbox? If you do that, you make me happy and I will be so proud of you. Thank you!");
			return;
		}
	}

	MainFlow(synapses);
}

function CloseHandler(e)
{
  var plane = document.getElementById("central");
  plane.style.opacity = 1;
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}
