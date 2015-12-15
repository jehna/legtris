#pragma strict

public var fadeIn : boolean = false;

function GameOver () {
	GetComponent.<AudioSource>().Play();
	if(fadeIn) StartCoroutine("FadeIn");
}

function FadeIn() {
	var startTime : float = Time.time;
	var fadeTime : float = 5.0;
	while(Time.time < startTime + fadeTime) {
		GetComponent.<AudioSource>().volume = Mathf.Lerp(0.0, 0.8, (Time.time - startTime) / fadeTime);
		yield WaitForEndOfFrame();
	}
	GetComponent.<AudioSource>().volume = 0.8;
}