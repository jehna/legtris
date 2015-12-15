#pragma strict
class GameObjects extends MonoBehaviour {

	public var platform : GameArea;
	public var blocks : LegoBlock[];
	public var legoColors : Color[];
	public var blocksStartColor : Color;

	private var __nextBlock : LegoBlock;
	public var currentBlock : LegoBlock;
	
	public var counter : GUIText;
	
	public var levelMaxTime : float = 180;
	
	public var blockPlaceEffect : EffectPlayer;
	public var blockRowDestroyEffect : EffectPlayer;
	
	public var shaker : CameraShaker;
	public var camWhiter : CameraWhite;
	
	public var blockSound : AudioSource;
	public var blockRotateSound : AudioSource;
	public var blockRowDestroySound : AudioSource;
	public var moveSound1 : AudioSource;
	public var moveSound2 : AudioSource;
	
	public function get nextBlock() : LegoBlock {
		if(__nextBlock == null) __nextBlock = blocks[Random.Range(0, blocks.length)];
		return __nextBlock;
	}
	
	public function InstantiateRandomNextBlcok() {
		currentBlock = UnityEngine.Object.Instantiate(nextBlock) as LegoBlock;
		__nextBlock = null;
	}
	
	public function RandomLegoColor() {
		return legoColors[Random.Range(0, legoColors.length)];
	}
	
	public var debug : GameObject[];
	
}