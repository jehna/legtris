#pragma strict

static class Game extends UnityEngine.Object {
	
	private var __area : Area = null;
	
	public function CreateArea(cols : int, rows : int) {
		__area = new Area(cols, rows);
	}
	
	public function get area() : Area {
		return __area;
	}
	
	private var __objects : GameObjects;
	public function get objects() : GameObjects {
		if(__objects == null) __objects = UnityEngine.Object.FindObjectOfType(GameObjects) as GameObjects;
		return __objects;
	}
	
	private var __input : CustomInput;
	public function get input() : CustomInput {
		if(__input == null) __input = UnityEngine.Object.FindObjectOfType(CustomInput) as CustomInput;
		return __input;
	}
	
	public function Over() {
		for(var t : Transform in UnityEngine.Object.FindObjectsOfType(Transform) as Transform[]) {
			t.SendMessage("GameOver",null,SendMessageOptions.DontRequireReceiver);
		}
		objects.counter.text = "";
		
	}
	
	public function GetSpecialForce() : SpecialForce {
		var random : int = Random.Range(0,50);
		var ret : SpecialForce = SpecialForce.None;
		switch(random) {
			case 5:
				ret = SpecialForce.Explode;
			break;
		}
		return ret;
	}
}