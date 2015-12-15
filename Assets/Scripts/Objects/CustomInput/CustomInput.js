#pragma strict

class CustomInput extends MonoBehaviour {

	var position : Vector3 = Vector3.zero;

	function Update () {
		if(Input.GetKeyDown("right")) position.x = Mathf.Min(position.x+1,Game.area.size.x-1);
		if(Input.GetKeyDown("left")) position.x = Mathf.Max(position.x-1,0);
		if(Input.GetKeyDown("down")) position.z = Mathf.Max(position.z-1,0);
		if(Input.GetKeyDown("up")) position.z = Mathf.Min(position.z+1,Game.area.size.y-1);
		
		if(Input.GetKeyDown("down") || Input.GetKeyDown("up")) Game.objects.moveSound1.Play();
		if(Input.GetKeyDown("left") || Input.GetKeyDown("right")) Game.objects.moveSound2.Play();
	}

}