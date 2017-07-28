var index = 0;
const SLIDES = ["title.png", "task.png", "approximation.png", "parameters.png", "description.png", "h11.png", "h12.png", "question.png", "explanation.png", "solution.png", "wish.png"];
const LEN = SLIDES.length - 1;

this.addEventListener("load", CounterAttack, false);

/**
 * Adding event handlers to user guide components
 */
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

/**
 * Handler for change textbox value, responsible for validating user input and executing main flof
 *
 *@param {Object} e event information
 */
function ChangeHandler(e)
{
	var root = e.target.parentNode;
	var len = root.children.length;
	var synapses = new Array(len);

	for (var i = 0; i < len; i++)
	{
		synapses[i] = parseFloat(root.children[i].value.replace(",", "."));

		if (isNaN(synapses[i]))
		{
			alert("Dear user, I like you and this all was make for you. Your pleasure, education. But you type into the textbox invalid value. I think actions like this is dishonest and unfair from you. If you will be in future in similar situation, please sacrifice some second from your precious time and ask yourself simple question, What should I type into the textbox? If you do that, you make me happy and I will be so proud of you. Thank you!");
			return;
		}
	}

	MainFlow(synapses);
}

/**
 * Handler for click on close component, responsible for setting opacity to normal value for page and closing user guide
 *
 *@param {Object} e event information
 */
function CloseHandler(e)
{
  var plane = document.getElementById("central");
  plane.style.opacity = 1;
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

/**
 * Handler for click on right arrow, responsible for switch to next page user guide
 */
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

/**
 * Handler for click on left arrow, responsible for switch toprevious page user guide
 */
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

/**
 * Handler for document loading, responsible for location and rewrite advertise position
 */
function CounterAttack()
{
  var body = document.childNodes[1].childNodes[2];
  var len = body.children.length;

  if (len >= 24)
  {
    body.children[23].style.position = "absolute";
    body.children[23].style.top = "900px";
    body.children[23].style.left = "900px";
  }
}
