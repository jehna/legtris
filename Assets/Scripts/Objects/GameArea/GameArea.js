#pragma strict

@script ExecuteInEditMode

var cols : int;
var rows : int;

private var __cols : int = 0;
private var __rows : int = 0;

function Awake() {
	if(Application.isPlaying) Game.CreateArea(cols, rows);
}

function Update () {
	if(__cols != cols || rows != __rows) {
		__cols = cols;
		__rows = rows;
		transform.localScale.x = 0.1 * cols;
		transform.localScale.z = 0.1 * rows;
		transform.position.x = 0.5 * cols;
		transform.position.z = 0.5 * rows;
	}
}

function GameOver() {
	Destroy(gameObject);
}