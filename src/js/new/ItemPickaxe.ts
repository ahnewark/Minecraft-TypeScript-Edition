
import { int } from "../jree/index";
import { ItemTool } from "./ItemTool";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { Block } from "./Block";

import { Block } from "./Block";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class ItemPickaxe extends ItemTool {
	private static blocksEffectiveAgainst:  Block[] | null =  [Block.cobblestone, Block.stairDouble, Block.stairSingle, Block.stone, Block.cobblestoneMossy, Block.oreIron, Block.blockSteel, Block.oreCoal, Block.blockGold, Block.oreGold, Block.oreDiamond, Block.blockDiamond, Block.ice, Block.bloodStone, Block.oreLapis, Block.blockLapis];

	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| null) {
		super(i1, 2, enumToolMaterial2, ItemPickaxe.blocksEffectiveAgainst);
	}

	public canHarvestBlock(block1: Block | null):  boolean {
		return block1 === Block.obsidian ? this.toolMaterial.getHarvestLevel() === 3 : (block1 !== Block.blockDiamond && block1 !== Block.oreDiamond ? (block1 !== Block.blockGold && block1 !== Block.oreGold ? (block1 !== Block.blockSteel && block1 !== Block.oreIron ? (block1 !== Block.blockLapis && block1 !== Block.oreLapis ? (block1 !== Block.oreRedstone && block1 !== Block.oreRedstoneGlowing ? (block1.blockMaterial === MaterialRegistry.rock ? true : block1.blockMaterial === MaterialRegistry.iron) : this.toolMaterial.getHarvestLevel() >= 2) : this.toolMaterial.getHarvestLevel() >= 1) : this.toolMaterial.getHarvestLevel() >= 1) : this.toolMaterial.getHarvestLevel() >= 2) : this.toolMaterial.getHarvestLevel() >= 2);
	}
}
