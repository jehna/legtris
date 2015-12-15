#pragma strict

var places : Vector3[];
private var pushed : boolean = true;
private var currentPlaceNum : int = 0;

function Start () {
	StartCoroutine("PushMe");
}

function PushMe() {
	pushed = !pushed;
	if(pushed) {
		transform.position -= places[currentPlaceNum];
		currentPlaceNum = (currentPlaceNum+1)%places.length;
	} else {
		transform.position += places[currentPlaceNum];
	}
	yield WaitForSeconds(0.6);
	StartCoroutine("PushMe");
}
