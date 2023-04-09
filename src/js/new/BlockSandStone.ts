
import { Material } from "./Material";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Block } from "./Block";
import { MaterialRegistry } from "./moved/MaterialRegistry";

export  class BlockSandStone extends Block {
	public constructor(i1: number) {
		super(i1, 192, MaterialRegistry.rock);
	}

	public getBlockTextureFromSide(i1: number):  number {
		return i1 === 1 ? this.blockIndexInTexture - 16 : (i1 === 0 ? this.blockIndexInTexture + 16 : this.blockIndexInTexture);
	}
}
