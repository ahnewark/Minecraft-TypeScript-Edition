import { BlockStone } from "./BlockStone";
import { Random } from "../jree/java/util/Random";
import { Block } from "./Block";

export  class BlockObsidian extends BlockStone {
	public constructor(i1: number, i2: number) {
		super(i1, i2);
	}

	public quantityDropped(random1: Random):  number {
		return 1;
	}

	public idDropped(i1: number, random2: Random):  number {
		return Block.obsidian.blockID;
	}
}
