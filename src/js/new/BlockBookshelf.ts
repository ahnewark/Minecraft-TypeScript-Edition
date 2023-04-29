


import { Material } from "./Material";
import { Block } from "./Block";

import { Random } from "../jree/java/util/Random";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class BlockBookshelf extends Block {
	public constructor(i1: number, i2: number) {
		super(i1, i2, MaterialRegistry.wood);
	}

	public getBlockTextureFromSide(i1: number):  number {
		return i1 <= 1 ? 4 : this.blockIndexInTexture;
	}

	public quantityDropped(random1: Random):  number {
		return 0;
	}
}
