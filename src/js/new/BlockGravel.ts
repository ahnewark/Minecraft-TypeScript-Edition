


import { int } from "../jree/index";
import { BlockSand } from "./BlockSand";
import { Item } from "./Item";
import { Random } from "../java/util/Random";

export  class BlockGravel extends BlockSand {
	public constructor(i1: int, i2: int) {
		super(i1, i2);
	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return random2.nextInt(10) === 0 ? Item.flint.shiftedIndex : this.blockID;
	}
}
