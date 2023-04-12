import { int } from "../jree/index";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";
import { Item } from "./Item";
import { BlockRegistry} from './static/BlockRegistry'

export  class BlockOre extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.rock);
	}

	public idDropped(i1: int, random2: Random | null):  int {
		return this.blockID === Block.oreCoal.blockID ? Item.coal.shiftedIndex : (this.blockID === Block.oreDiamond.blockID ? Item.diamond.shiftedIndex : (this.blockID === Block.oreLapis.blockID ? Item.dyePowder.shiftedIndex : this.blockID));
	}

	public quantityDropped(random1: Random| null):  int {
		return this.blockID === Block.oreLapis.blockID ? 4 + random1.nextInt(5) : 1;
	}

	protected damageDropped(i1: int):  int {
		return this.blockID === Block.oreLapis.blockID ? 4 : 0;
	}
}
