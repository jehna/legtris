#pragma strict

class Area extends UnityEngine.Object{
	
	private var __cols : int;
	private var __rows : int;
	
	private var matrix : Array;
	private var heightBlocks : Array;
	
	public function CreateArray(height : int, cols : int, rows : int) : Array {
		var xArr : Array = new Array();
		for(var x : int = 0; x<height; x++) {
			var yArr : Array = new Array();
			for(var y : int = 0; y<cols; y++) {
				var zArr : Array = new Array();
				for(var z : int = 0; z<rows; z++) {
					zArr.Push(0);
				}
				yArr.Push(zArr);
			}
			xArr.Push(yArr);
		}
		return xArr;
	}
	
	public function CreateArray(num : int) : Array {
		var xArr : Array = new Array();
		for(var x : int = 0; x<num; x++) {
			xArr.Push(new Array());
		}
		return xArr;
	}
	
	public function Area(cols : int, rows : int) {
							// Height, X, Y
		matrix = CreateArray(10,cols,rows);
		heightBlocks = new Array();
		__cols = cols;
		__rows = rows;
	}
	
	public function get size() : Vector2 {
		return Vector2(__cols, __rows);
	}
	
	public function SetAreaReserved(blockArea : Vector2[], height : int, byObject : LegoBlock) {
		heightBlocks.Push(byObject);
		for(var pos : Vector2 in blockArea) {
			SetReserved(pos.x, pos.y, height);
		}
		CheckLevel(height);
	}
	
	public function SetReserved(x : int, y : int, height : int) {
		((matrix[height] as Array)[x] as Array)[y] = 1;
	}
	
	public function GetFirstAvailableHeightForBlock(blockArea : Vector2[]) {	
		var maxHeight : int = 0;
		for(var pos : Vector2 in blockArea) {
			var posHeight : int = GetFirstAvailableHeight(pos.x, pos.y);
			maxHeight = Mathf.Max(posHeight, maxHeight);
		}
		return maxHeight;
	}
	
	public function GetFirstAvailableHeight(x : int,y : int) : int {
		var maxHeight : int = -1;
		for(var height : int = 0; height < 10; height++) {
			if(((matrix[height] as Array)[x] as Array)[y] == 1) maxHeight = height+1;
		}
		if(maxHeight >= 10) maxHeight = -1;
		return maxHeight;
	}
	
	public function SetNotReserved(x : int, y : int, height : int) {
		((matrix[height] as Array)[x] as Array)[y] = 0;
	}
	
	public function GetReserved(x : int, y : int, height : int) : boolean {
		return ((matrix[height] as Array)[x] as Array)[y] == 1;
	}
	
	public function CheckLevel(height : int) {
		for(var x : int = 0; x < __cols; x++) {
			for(var y : int = 0; y < __rows; y++) {
				if(((matrix[height] as Array)[x] as Array)[y] == 0) return;
			}
		}
		DestroyHeight(height);
	}
	
	public function DestroyHeight(height : int) {
		Debug.Log("Destroying height: " + height);
		Game.objects.blockRowDestroyEffect.PlayBlockParticleEffect(Vector3.up * (height - 1));
		Game.objects.camWhiter.WhiteOut();
		Game.objects.blockRowDestroySound.Play();
		
		for(var i : int = 0; i < heightBlocks.length; i++) {
			var b : LegoBlock = heightBlocks[i] as LegoBlock;
			if(b) {
				// If we refuse to die, we at least try to fall down
				if(b.Die(height) == false) b.FallDown(height);
			}
		}	
		
		while(height < 10) {
			for(var x : int = 0; x < __cols; x++) {
				for(var y : int = 0; y < __rows; y++) {
					((matrix[height] as Array)[x] as Array)[y] = (height == 9) ? 0 : ((matrix[height+1] as Array)[x] as Array)[y];
				}
			}
			height++;
		}
	}
	
}