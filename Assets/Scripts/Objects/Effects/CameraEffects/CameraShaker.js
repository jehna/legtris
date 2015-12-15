#pragma strict

var shakeLength : float = 1.0;

function Shake() {
	StartCoroutine("RealShake");
}

function RealShake() {
	var startTime : float = Time.time;
	var startPos : Vector3 = transform.localPosition;
	while(Time.time < startTime + shakeLength) {
		transform.localPosition = startPos + (Vector3(1,1,1) * Random.Range(-0.5, 0.5));
		yield WaitForEndOfFrame();
	}
	transform.localPosition = startPos;
}