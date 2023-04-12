
import { int } from "../jree/index";
import { ItemTool } from "./ItemTool";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { Block } from "./Block";
import { BlockRegistry } from "./moved/BlockRegistry";

export  class ItemSpade extends ItemTool {
	private static blocksEffectiveAgainst:  Block[] | null =  [BlockRegistry.grass, BlockRegistry.dirt, BlockRegistry.sand, BlockRegistry.gravel, BlockRegistry.snow, BlockRegistry.blockSnow, BlockRegistry.blockClay];

	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| null) {
		super(i1, 1, enumToolMaterial2, ItemSpade.blocksEffectiveAgainst);
	}

	public canHarvestBlock(block1: Block| null):  boolean {
		return block1 === BlockRegistry.snow ? true : block1 === BlockRegistry.blockSnow;
	}
}
