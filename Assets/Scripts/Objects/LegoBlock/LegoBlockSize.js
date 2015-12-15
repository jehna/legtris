#pragma strict

class LegoBlockSize extends MonoBehaviour {

	public var width : int;
	public var height : int;
	public var target : GameObject;
	
	function GetBlockArea(x : int, y:int) : Vector2[] {
		return GetBlockArea(Vector2(x,y));
	}
	
	function GetBlockArea(blockPosition : Vector2) : Vector2[] {
		var tmpArr : Vector2[] = new Vector2[width*height];
		var i : int = 0;
		for(var x : int = 0; x < width; x++) {
			for(var y : int = 0; y < height; y++) {
				tmpArr[i] = Vector2(x,y) + blockPosition;
				i++;
			}
		}
		return tmpArr;
	}
	
	function Enable() {
		gameObject.SetActiveRecursively(true);
	}
	
	function Disable() {
		gameObject.SetActiveRecursively(false);
	}
}