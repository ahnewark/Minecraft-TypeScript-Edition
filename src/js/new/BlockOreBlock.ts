import { Material } from "./Material";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";

export  class BlockOreBlock extends Block {
	public constructor(i1: number, i2: number) {
		super(i1, MaterialRegistry.iron);
		this.blockIndexInTexture = i2;
	}

	public getBlockTextureFromSide(i1: number):  number {
		return this.blockIndexInTexture;
	}
}
