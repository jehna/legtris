#pragma strict

private var speedingTime : float;

function Start() {
	speedingTime = Game.objects.levelMaxTime;
}

function Update () {
	GetComponent.<AudioSource>().pitch = Mathf.Lerp(0.5, 1.5, Time.timeSinceLevelLoad / speedingTime);
}

function GameOver() {
	GetComponent.<AudioSource>().enabled = false;
	Destroy(this);
}