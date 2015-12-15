#pragma strict

function PlayBlockParticleEffect(atPosition : Vector3) {
	GetComponent.<ParticleSystem>().Stop();
	transform.position = atPosition + Vector3.up*2;
	GetComponent.<ParticleSystem>().Play();
}