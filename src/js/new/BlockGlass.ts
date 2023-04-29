


import { Material } from "./Material";
import { BlockBreakable } from "./BlockBreakable";
import { Random } from "../jree/java/util/Random";

export  class BlockGlass extends BlockBreakable {
	public constructor(i1: number, i2: number, material3: Material, z4: boolean) {
		super(i1, i2, material3, z4);
	}

	public quantityDropped(random1: Random):  number {
		return 0;
	}
}
