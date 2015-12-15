#pragma strict

function Start () {
	StartCoroutine("ShowHide");
}

function ShowHide() {
	GetComponent.<GUIText>().enabled = !GetComponent.<GUIText>().enabled;
	yield WaitForSeconds(1);
	StartCoroutine("ShowHide");
}

function Update() {
	if(Input.GetKeyDown(KeyCode.Space)) {
		Game.objects.camWhiter.WhiteOut();
		Application.LoadLevel(1);
	}
}