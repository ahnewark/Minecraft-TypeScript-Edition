


import { int, java } from "../jree/index";
import { Material } from "./Material";
import { Block } from "./Block";
import { ItemRegistry } from "./moved/ItemRegistry";
import { MaterialRegistry } from "./index";
import { Random } from "../java/util/Random";

export  class BlockClay extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.clay);
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return ItemRegistry.clay.shiftedIndex;
	}

	public quantityDropped(random1: Random| null):  int {
		return 4;
	}
}
