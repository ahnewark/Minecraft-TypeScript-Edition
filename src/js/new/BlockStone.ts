


import { Material } from "./Material";
import { Block } from "./Block";
import { Random } from "../java/util/Random";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { BlockRegistry } from "./index";

export  class BlockStone extends Block {
	public constructor(i1: number, i2: number) {
		super(i1, i2, MaterialRegistry.rock);
	}

	public idDropped(i1: number, random2: Random):  number {
		return BlockRegistry.cobblestone.blockID;
	}
}
