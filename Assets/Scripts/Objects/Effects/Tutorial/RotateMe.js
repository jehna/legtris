#pragma strict

private var rotated : boolean = false;

function Start () {
	StartCoroutine("RotateMe");
}

function RotateMe() {
	rotated = !rotated;
	if(rotated) {
		transform.localEulerAngles.y = 270;
	} else {
		transform.localEulerAngles.y = 180;
	}
	yield WaitForSeconds(1.1);
	StartCoroutine("RotateMe");
}
