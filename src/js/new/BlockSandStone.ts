
import { Material } from "./Material";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Block } from "./Block";

export  class BlockSandStone extends Block {
	public constructor(i1: number) {
		super(i1, 192, Material.rock);
	}

	public getBlockTextureFromSide(i1: number):  number {
		return i1 === 1 ? this.blockIndexInTexture - 16 : (i1 === 0 ? this.blockIndexInTexture + 16 : this.blockIndexInTexture);
	}
}
