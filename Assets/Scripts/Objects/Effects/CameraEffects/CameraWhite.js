#pragma strict

var tweenTime : float = 3.0;
var texture : GUITexture;

function Start() {
	StartCoroutine("RealWhiteOut");
}

function WhiteOut () {
	StartCoroutine("RealWhiteOut");
}

function RealWhiteOut() {
	var startTime : float = Time.time;
	texture.enabled = true;
	while(Time.time < startTime + tweenTime) {
		texture.color.a = Mathf.Lerp(0.5, 0.0, (Time.time-startTime) / tweenTime);
		yield WaitForEndOfFrame();
	}
	texture.enabled = false;
}

function GameOver() {
	WhiteOut();
}