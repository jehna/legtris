#pragma strict

var rotationTime : float = 2.0;

function Update () {
	transform.localEulerAngles.y = Mathf.Lerp(0.0,360.0,(Time.time % rotationTime)/rotationTime);
}