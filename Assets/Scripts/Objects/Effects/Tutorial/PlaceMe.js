#pragma strict

private var placed : boolean = false;

function Start () {
	StartCoroutine("PlaceMe");
}

function PlaceMe() {
	placed = !placed;
	if(placed) {
		transform.position.y -= 0.5;
	} else {
		transform.position.y += 0.5;
	}
	yield WaitForSeconds(0.3);
	StartCoroutine("PlaceMe");
}
