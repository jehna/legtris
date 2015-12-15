#pragma strict

var target : Transform;
var addPos : Vector3;

var followCurrentBlock : boolean = false;


function Update () {
	transform.position = GetTarget().position + addPos;
}

function GetTarget() : Transform {
	if(followCurrentBlock) {
		var t : Transform = Game.objects.currentBlock.transform;
		if(t) return t;
		else return transform;
	}
	return target;
}