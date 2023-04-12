
import { int } from "../jree/index";
import { ItemTool } from "./ItemTool";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { Block } from "./Block";
import { Block } from "./Block";


export  class ItemAxe extends ItemTool {
	private static blocksEffectiveAgainst:  Block[] | undefined =  [Block.planks, Block.bookShelf, Block.wood, Block.crate];

	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| undefined) {
		super(i1, 3, enumToolMaterial2, ItemAxe.blocksEffectiveAgainst);
	}
}
