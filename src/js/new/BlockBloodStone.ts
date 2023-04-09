
import { Material } from "./Material";
import { Block } from "./Block";
import { MaterialRegistry } from "./moved/MaterialRegistry";

export  class BlockBloodStone extends Block {
	public constructor(i1: number, i2: number) {
		super(i1, i2, MaterialRegistry.rock);
	}
}
