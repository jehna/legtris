#pragma strict

var defaultColor : Color;
var colors : Color[];
private var currentColorIndex : int = 0;
private var colorChangeTime : float = 3.0;
private var updateToThisColor : Color;
private var fullColorTime : float;

function Start() {
	fullColorTime = Game.objects.levelMaxTime;
	StartCoroutine("ChangeColor");
}

function ChangeColor () {
	var lastColor : Color = colors[currentColorIndex];
	currentColorIndex = (currentColorIndex+1)%colors.length;
	var currentColor : Color = colors[currentColorIndex];
	var startTime : float = Time.timeSinceLevelLoad;
	colorChangeTime = Mathf.Lerp(3.0, 0.01, Time.timeSinceLevelLoad / fullColorTime);
	while(Time.timeSinceLevelLoad < startTime + colorChangeTime) {
		updateToThisColor = Color.Lerp(defaultColor, Color.Lerp(lastColor, currentColor, (Time.timeSinceLevelLoad - startTime)/colorChangeTime), Time.timeSinceLevelLoad / fullColorTime);
		yield WaitForEndOfFrame();
	}
	updateToThisColor = Color.Lerp(defaultColor, currentColor, Time.timeSinceLevelLoad / fullColorTime);
	yield WaitForEndOfFrame();
	StartCoroutine("ChangeColor");
}

function Update() {
	GetComponent.<Camera>().backgroundColor = updateToThisColor;
}