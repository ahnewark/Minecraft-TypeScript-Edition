import { int } from "../jree/index";
import { Material } from "./Material";
import { Block } from "./Block";

import { Item } from "./Item";
import { Random } from "../java/util/Random";

export  class BlockLightStone extends Block {
	public constructor(i1: int, i2: int, material3: Material| null) {
		super(i1, i2, material3);
	}

	public idDropped(i1: int, random2: Random | null):  int {
		return Item.lightStoneDust.shiftedIndex;
	}
}
