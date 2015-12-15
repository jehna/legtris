#pragma strict

function Start () {
	for(var a : Animation in gameObject.GetComponentsInChildren.<Animation>()) {
		a.Play();
		yield WaitForSeconds(0.1);
	}
	//Destroy(this);
}