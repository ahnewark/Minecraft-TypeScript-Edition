
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { Block } from "./Block";





export  class BlockBreakable extends Block {
	private field_6363_a:  boolean;

	protected constructor(i1: number, i2: number, material3: Material, z4: boolean) {
		super(i1, i2, material3);
		this.field_6363_a = z4;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number, i5: number):  Promise<boolean> {
		let  i6: number = await iBlockAccess1.getBlockId(i2, i3, i4);
		return !this.field_6363_a && i6 === this.blockID ? false : super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, i5);
	}
}
