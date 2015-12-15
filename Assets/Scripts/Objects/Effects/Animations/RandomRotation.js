#pragma strict

var waitUntilFirst : float = 60;
private var rotationTime : float = 3.0;
var randomRotations : Vector3[];

function Start() {
	yield WaitForSeconds(waitUntilFirst);
	StartCoroutine("Rotate");
}

function Rotate () {
	yield WaitForSeconds(Random.Range(10, 30));
	var startTime : float = Time.time;
	var target : Vector3 = randomRotations[Random.Range(0,randomRotations.length)];
	var simulateRotation : Vector3 = transform.localEulerAngles;
	while(Time.time < startTime + rotationTime) {
		simulateRotation += (target - simulateRotation) * 0.1;
		transform.localEulerAngles = simulateRotation;
		yield WaitForEndOfFrame();
	}
	transform.localEulerAngles = target;
	StartCoroutine("Rotate");
}