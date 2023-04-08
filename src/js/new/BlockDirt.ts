
import { Material } from "./Material";
import { Block } from "./Block";

export  class BlockDirt extends Block {
	public constructor(i1: number, i2: number) {
		super(i1, i2, Material.ground);
	}
}
