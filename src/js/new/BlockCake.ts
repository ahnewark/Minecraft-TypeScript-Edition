import { int, float, double } from "../jree/index";
import { World } from "./World";
import { IBlockAccess } from "./IBlockAccess";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../jree/java/util/Random";

export  class BlockCake extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.field_21150_y);
		this.setTickOnLoad(true);
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
		let  f6: float = 0.0625;
		let  f7: float = (1 + i5 * 2) as float / 16.0;
		let  f8: float = 0.5;
		this.setBlockBounds(f7, 0.0, f6, 1.0 - f6, f8, 1.0 - f6);
	}

	public func_237_e():  void {
		let  f1: float = 0.0625;
		let  f2: float = 0.5;
		this.setBlockBounds(f1, 0.0, f1, 1.0 - f1, f2, 1.0 - f1);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		let  f6: float = 0.0625;
		let  f7: float = (1 + i5 * 2) as float / 16.0;
		let  f8: float = 0.5;
		return AxisAlignedBB.getBoundingBoxFromPool((i2 as float + f7) as double, i3 as double, (i4 as float + f6) as double, ((i2 + 1) as float - f6) as double, (i3 as float + f8 - f6) as double, ((i4 + 1) as float - f6) as double);
	}

	public async getSelectedBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		let  f6: float = 0.0625;
		let  f7: float = (1 + i5 * 2) as float / 16.0;
		let  f8: float = 0.5;
		return AxisAlignedBB.getBoundingBoxFromPool((i2 as float + f7) as double, i3 as double, (i4 as float + f6) as double, ((i2 + 1) as float - f6) as double, (i3 as float + f8) as double, ((i4 + 1) as float - f6) as double);
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return i1 === 1 ? this.blockIndexInTexture : (i1 === 0 ? this.blockIndexInTexture + 3 : (i2 > 0 && i1 === 4 ? this.blockIndexInTexture + 2 : this.blockIndexInTexture + 1));
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 1 ? this.blockIndexInTexture : (i1 === 0 ? this.blockIndexInTexture + 3 : this.blockIndexInTexture + 1);
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public async blockActivated(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<boolean> {
		await this.func_21029_c(world1, i2, i3, i4, entityPlayer5);
		return true;
	}

	public async onBlockClicked(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<void> {
		await this.func_21029_c(world1, i2, i3, i4, entityPlayer5);
	}

	private async func_21029_c(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<void> {
		if(entityPlayer5.health < 20) {
			entityPlayer5.heal(3);
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4) + 1;
			if(i6 >= 6) {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			} else {
				await world1.setBlockMetadataWithNotify(i2, i3, i4, i6);
				world1.markBlockAsNeedsUpdate(i2, i3, i4);
			}
		}

	}

	public async canPlaceBlockAt(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		return !await super.canPlaceBlockAt(world1, i2, i3, i4) ? false : await this.canBlockStay(world1, i2, i3, i4);
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(!await this.canBlockStay(world1, i2, i3, i4)) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

	}

	public async canBlockStay(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		return (await world1.getBlockMaterial(i2, i3 - 1, i4)).isSolid();
	}

	public quantityDropped(random1: Random| undefined):  int {
		return 0;
	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return 0;
	}
}
