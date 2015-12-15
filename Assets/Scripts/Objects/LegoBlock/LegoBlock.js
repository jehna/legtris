#pragma strict

class LegoBlock extends MonoBehaviour {
	
	private var blockSizes : LegoBlockSize[];
	
	private var rotation : int = 0;
	private var counter : int = 11;
	private var forceRelease : boolean = false;
	private var liveTime : float;
	private var renderers : MeshRenderer[];
	private var assignColor : Color;
	private var startTime : float;
	private var startColor : Color;
	
	private var isDeactive : boolean = false;
	private var specialForce : SpecialForce;
	
	function Start () {
		
		assignColor = Game.objects.RandomLegoColor();
		startColor = Game.objects.blocksStartColor;
		blockSizes = gameObject.GetComponentsInChildren.<LegoBlockSize>();
		renderers = gameObject.GetComponentsInChildren.<MeshRenderer>();
		
		if(blockSizes.length > 1) {
			rotation = Random.Range(0,blockSizes.length);
			for(var b : LegoBlockSize in blockSizes) {
				b.Disable();
			}
			blockSize.Enable();
		}
		
		startTime = Time.timeSinceLevelLoad;
		var stepTime : float = Mathf.Lerp(1.0, 0.25, Time.timeSinceLevelLoad / Game.objects.levelMaxTime);
		liveTime = stepTime * 10;
		InvokeRepeating("Counter", stepTime, stepTime);
		Counter();
		
		specialForce = Game.GetSpecialForce();
	}
	
	public function Counter() {
		counter--;
		if(counter == 0) forceRelease = true;
		else Game.objects.counter.text = counter.ToString();
	}
	
	public function get blockSize() : LegoBlockSize {
		return blockSizes[rotation];
	}
	
	function Update () {
		if(isDeactive) return;
		
		if(specialForce == SpecialForce.None) SetColor(Color.Lerp(startColor, assignColor, ((Time.timeSinceLevelLoad - startTime) / liveTime) * 0.9));
		else SetColor(Game.objects.RandomLegoColor());
		
		var target : Vector3 = Game.input.position;
		
		Game.input.position.x = target.x = Mathf.Min(Mathf.Round(target.x), Game.area.size.x - blockSize.width);
		Game.input.position.z = target.z = Mathf.Min(Mathf.Round(target.z), Game.area.size.y - blockSize.height);
		
		target.y = Game.area.GetFirstAvailableHeightForBlock(blockSize.GetBlockArea(target.x, target.z));
		
		if(target.y == 9) {
			Game.Over();
			return;
		}
		
		transform.position = target;
	    //Debug.DrawLine (ray.origin, target);
		
		if((Input.GetKeyDown(KeyCode.Return) && Time.timeSinceLevelLoad > startTime + 1.0) || forceRelease) {
			isDeactive = true;
			CancelInvoke("Counter");
			Game.area.SetAreaReserved(blockSize.GetBlockArea(target.x, target.z), target.y, this);
			Game.objects.InstantiateRandomNextBlcok();
			Game.objects.blockPlaceEffect.PlayBlockParticleEffect(transform.position);
			gameObject.AddComponent(PlayAllAnimations);
			SetColor(assignColor);
			Game.objects.blockSound.Play();
			UseSpecialForce(target.y);
			Game.input.position = Vector3(Random.Range(0,Game.area.size.x),0,Random.Range(0,Game.area.size.y)); // Let's do this here.
		}
	
		if(Input.GetKeyDown(KeyCode.Space)) {
			blockSize.Disable();
			Game.objects.blockRotateSound.Play();
			rotation = (rotation+1)%blockSizes.length;
			blockSize.Enable();
		}
	}
	
	private function SetColor(c : Color) {
		for(var r : MeshRenderer in renderers) {
			r.material.color = c;
		}
	}
	
	public function GameOver() {
		Die(transform.position.y);
	}
	
	public function Die(ifHeight : int) : boolean {
		if(ifHeight == transform.position.y) {
			StartCoroutine("RealDie");
			return true;
		}
		return false;
	}
	
	public function RealDie() {
		yield WaitForEndOfFrame();
		Destroy(gameObject);
	}
	
	public function FallDown(height : int) {
		if(transform.position.y > height) StartCoroutine("RealFallDown");
	}
	
	private function RealFallDown() {
		var startTime : float = Time.timeSinceLevelLoad;
		var tweenTime : float = 0.7;
		var startY : float = transform.position.y;
		while(Time.timeSinceLevelLoad < startTime + tweenTime) {
			transform.position.y = Mathf.Lerp(startY, startY-1, (Time.timeSinceLevelLoad-startTime)/tweenTime);
			yield WaitForEndOfFrame();
		}
		transform.position.y = startY-1;
	}
	
	private function UseSpecialForce(height : float) {
		switch(specialForce) {
			case SpecialForce.None:
			break;
			case SpecialForce.Explode:
				Game.area.DestroyHeight(height);
			break;
		}
	}
}

public enum SpecialForce {
	None,
	Explode
}