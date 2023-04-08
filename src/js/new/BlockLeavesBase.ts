
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { Block } from "./Block";

export  class BlockLeavesBase extends Block {
	protected graphicsLevel:  boolean;

	protected constructor(i1: number, i2: number, material3: Material, z4: boolean) {
		super(i1, i2, material3);
		this.graphicsLevel = z4;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public shouldSideBeRendered(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number, i5: number):  boolean {
		let  i6: number = iBlockAccess1.getBlockId(i2, i3, i4);
		return !this.graphicsLevel && i6 === this.blockID ? false : super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, i5);
	}
}
