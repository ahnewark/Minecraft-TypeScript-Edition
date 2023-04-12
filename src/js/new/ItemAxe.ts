
import { int } from "../jree/index";
import { ItemTool } from "./ItemTool";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { BlockRegistry } from "./moved/BlockRegistry";
import { Block } from "./Block";

export  class ItemAxe extends ItemTool {
	private static blocksEffectiveAgainst:  Block[] | null =  [BlockRegistry.planks, BlockRegistry.bookShelf, BlockRegistry.wood, BlockRegistry.crate];

	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| null) {
		super(i1, 3, enumToolMaterial2, ItemAxe.blocksEffectiveAgainst);
	}
}
