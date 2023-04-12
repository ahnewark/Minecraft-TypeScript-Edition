
import { int } from "../jree/index";
import { ItemTool } from "./ItemTool";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { Block } from "./Block";
import { BlockRegistry } from "./moved/BlockRegistry";
import { MaterialRegistry } from "./index";

export  class ItemPickaxe extends ItemTool {
	private static blocksEffectiveAgainst:  Block[] | null =  [BlockRegistry.cobblestone, BlockRegistry.stairDouble, BlockRegistry.stairSingle, BlockRegistry.stone, BlockRegistry.cobblestoneMossy, BlockRegistry.oreIron, BlockRegistry.blockSteel, BlockRegistry.oreCoal, BlockRegistry.blockGold, BlockRegistry.oreGold, BlockRegistry.oreDiamond, BlockRegistry.blockDiamond, BlockRegistry.ice, BlockRegistry.bloodStone, BlockRegistry.oreLapis, BlockRegistry.blockLapis];

	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| null) {
		super(i1, 2, enumToolMaterial2, ItemPickaxe.blocksEffectiveAgainst);
	}

	public canHarvestBlock(block1: Block | null):  boolean {
		return block1 === BlockRegistry.obsidian ? this.toolMaterial.getHarvestLevel() === 3 : (block1 !== BlockRegistry.blockDiamond && block1 !== BlockRegistry.oreDiamond ? (block1 !== BlockRegistry.blockGold && block1 !== BlockRegistry.oreGold ? (block1 !== BlockRegistry.blockSteel && block1 !== BlockRegistry.oreIron ? (block1 !== BlockRegistry.blockLapis && block1 !== BlockRegistry.oreLapis ? (block1 !== BlockRegistry.oreRedstone && block1 !== BlockRegistry.oreRedstoneGlowing ? (block1.blockMaterial === MaterialRegistry.rock ? true : block1.blockMaterial === MaterialRegistry.iron) : this.toolMaterial.getHarvestLevel() >= 2) : this.toolMaterial.getHarvestLevel() >= 1) : this.toolMaterial.getHarvestLevel() >= 1) : this.toolMaterial.getHarvestLevel() >= 2) : this.toolMaterial.getHarvestLevel() >= 2);
	}
}
