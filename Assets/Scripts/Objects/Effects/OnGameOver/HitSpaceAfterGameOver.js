#pragma strict

private var isOver : boolean = false;

function GameOver () {
	GetComponent.<GUIText>().enabled = true;
	isOver = true;
	StartCoroutine("Blink");
}

function Blink() {
	yield WaitForSeconds(1);
	GetComponent.<GUIText>().enabled = !GetComponent.<GUIText>().enabled;
	StartCoroutine("Blink");
}

function Update() {
	if(!isOver) return;
	if(Input.GetKeyUp(KeyCode.Space)) StartCoroutine("StartNewGame");
}

function StartNewGame() {
	Game.objects.camWhiter.WhiteOut();
	yield WaitForEndOfFrame();
	Application.LoadLevel(1);
}