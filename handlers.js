var index = 0;
const SLIDES = ["title.png", "task.png", "approximation.png", "parameters.png", "description.png", "h11.png", "h12.png", "question.png", "explanation.png", "solution.png", "wish.png"];
const LEN = SLIDES.length - 1;

function initializeHandlers()
{
    var close = document.getElementById("close");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var main = document.getElementById("main");

    close.addEventListener("click", CloseHandler, false);
    right.addEventListener("click", RightHandler, false);
    left.style.opacity = 0;

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

function RightHandler()
{

  index++;
  if (index > 0)
  {
    var left = document.getElementById("left");
    left.addEventListener("click", LeftHandler, false);
    left.style.opacity = 1;
  }

  document.getElementById("main").src = SLIDES[index];

  if (LEN == index)
  {
      var right = document.getElementById("right");
      right.removeEventListener("click", RightHandler);
      right.style.opacity = 0;
  }
}

function LeftHandler()
{
  index--;
  if (LEN - 1 == index)
  {
    var right = document.getElementById("right");
    right.addEventListener("click", RightHandler, false);
    right.style.opacity = 1;
  }

  document.getElementById("main").src = SLIDES[index];

  if (index == 0)
  {
    var left = document.getElementById("left");
    left.removeEventListener("click", LeftHandler);
    left.style.opacity = 0;
  }
}
