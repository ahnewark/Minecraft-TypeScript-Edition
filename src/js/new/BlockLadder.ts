import { int, float, java } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";

export  class BlockLadder extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.circuits);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		let  f6: float = 0.125;
		if(i5 === 2) {
			this.setBlockBounds(0.0, 0.0, 1.0 - f6, 1.0, 1.0, 1.0);
		}

		if(i5 === 3) {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, f6);
		}

		if(i5 === 4) {
			this.setBlockBounds(1.0 - f6, 0.0, 0.0, 1.0, 1.0, 1.0);
		}

		if(i5 === 5) {
			this.setBlockBounds(0.0, 0.0, 0.0, f6, 1.0, 1.0);
		}

		return super.getCollisionBoundingBoxFromPool(world1, i2, i3, i4);
	}

	public async getSelectedBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		let  f6: float = 0.125;
		if(i5 === 2) {
			this.setBlockBounds(0.0, 0.0, 1.0 - f6, 1.0, 1.0, 1.0);
		}

		if(i5 === 3) {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, f6);
		}

		if(i5 === 4) {
			this.setBlockBounds(1.0 - f6, 0.0, 0.0, 1.0, 1.0, 1.0);
		}

		if(i5 === 5) {
			this.setBlockBounds(0.0, 0.0, 0.0, f6, 1.0, 1.0);
		}

		return super.getSelectedBoundingBoxFromPool(world1, i2, i3, i4);
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 8;
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.isBlockOpaqueCube(i2 - 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2 + 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2, i3, i4 - 1) ? true : await world1.isBlockOpaqueCube(i2, i3, i4 + 1)));
	}

	public async onBlockPlaced(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		if((i6 === 0 || i5 === 2) && await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
			i6 = 2;
		}

		if((i6 === 0 || i5 === 3) && await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
			i6 = 3;
		}

		if((i6 === 0 || i5 === 4) && await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
			i6 = 4;
		}

		if((i6 === 0 || i5 === 5) && await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
			i6 = 5;
		}

		await world1.setBlockMetadataWithNotify(i2, i3, i4, i6);
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		let  z7: boolean = false;
		if(i6 === 2 && await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
			z7 = true;
		}

		if(i6 === 3 && await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
			z7 = true;
		}

		if(i6 === 4 && await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
			z7 = true;
		}

		if(i6 === 5 && await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
			z7 = true;
		}

		if(!z7) {
			await this.dropBlockAsItem(world1, i2, i3, i4, i6);
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

		await super.onNeighborBlockChange(world1, i2, i3, i4, i5);
	}

	public quantityDropped(random1: Random| null):  int {
		return 1;
	}
}
