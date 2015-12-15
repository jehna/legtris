#pragma strict

function GameOver () {
	GetComponent.<GUIText>().text = "Score: " + Mathf.Floor(Time.timeSinceLevelLoad) + " sec";
	GetComponent.<GUIText>().enabled = true;
}