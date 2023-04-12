import { int } from "../jree/index";
import { World } from "./World";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./index";

export  class BlockFence extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.wood);
	}

	public async getCollidingBoundingBoxes(world1: World| null, i2: int, i3: int, i4: int, axisAlignedBB5: AxisAlignedBB| null, arrayList6: AxisAlignedBB[]):  Promise<void> {
		arrayList6.push(AxisAlignedBB.getBoundingBoxFromPool(i2, i3, i4, (i2 + 1), i3 + 1.5, (i4 + 1)));
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int): Promise<boolean> {
		return await world1.getBlockId(i2, i3 - 1, i4) === this.blockID ? false : (!(await world1.getBlockMaterial(i2, i3 - 1, i4)).isSolid() ? false : await super.canPlaceBlockAt(world1, i2, i3, i4));
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 11;
	}
}
