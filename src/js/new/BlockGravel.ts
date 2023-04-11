


import { int } from "../jree/index";
import { BlockSand } from "./BlockSand";
import { ItemRegistry } from "./moved/ItemRegistry";
import { Random } from "../java/util/Random";

export  class BlockGravel extends BlockSand {
	public constructor(i1: int, i2: int) {
		super(i1, i2);
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return random2.nextInt(10) === 0 ? ItemRegistry.flint.shiftedIndex : this.blockID;
	}
}
