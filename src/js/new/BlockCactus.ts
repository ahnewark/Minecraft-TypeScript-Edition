


import { int, float, double } from "../jree/index";
import { World } from "./World";
import { Entity } from "./Entity";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";

export  class BlockCactus extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.cactus);
		this.setTickOnLoad(true);
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(world1.isAirBlock(i2, i3 + 1, i4)) {
			let  i6: int;
			for(i6 = 1; await world1.getBlockId(i2, i3 - i6, i4) === this.blockID; ++i6) {
			}

			if(i6 < 3) {
				let  i7: int = await world1.getBlockMetadata(i2, i3, i4);
				if(i7 === 15) {
					await world1.setBlockWithNotify(i2, i3 + 1, i4, this.blockID);
					await world1.setBlockMetadataWithNotify(i2, i3, i4, 0);
				} else {
					await world1.setBlockMetadataWithNotify(i2, i3, i4, i7 + 1);
				}
			}
		}

	}

	public async getCollisionBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		let  f5: float = 0.0625;
		return AxisAlignedBB.getBoundingBoxFromPool((i2 as float + f5) as double, i3 as double, (i4 as float + f5) as double, ((i2 + 1) as float - f5) as double, ((i3 + 1) as float - f5) as double, ((i4 + 1) as float - f5) as double);
	}

	public async getSelectedBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		let  f5: float = 0.0625;
		return AxisAlignedBB.getBoundingBoxFromPool((i2 as float + f5) as double, i3 as double, (i4 as float + f5) as double, ((i2 + 1) as float - f5) as double, (i3 + 1) as double, ((i4 + 1) as float - f5) as double);
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 1 ? this.blockIndexInTexture - 1 : (i1 === 0 ? this.blockIndexInTexture + 1 : this.blockIndexInTexture);
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 13;
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
		if((await world1.getBlockMaterial(i2 - 1, i3, i4)).isSolid()) {
			return false;
		} else if((await world1.getBlockMaterial(i2 + 1, i3, i4)).isSolid()) {
			return false;
		} else if((await world1.getBlockMaterial(i2, i3, i4 - 1)).isSolid()) {
			return false;
		} else if((await world1.getBlockMaterial(i2, i3, i4 + 1)).isSolid()) {
			return false;
		} else {
			let  i5: int = await world1.getBlockId(i2, i3 - 1, i4);
			return i5 === Block.cactus.blockID || i5 === Block.sand.blockID;
		}
	}

	public async onEntityCollidedWithBlock(world1: World| undefined, i2: int, i3: int, i4: int, entity5: Entity| undefined):  Promise<void> {
		await entity5.attackEntityFrom(undefined as Entity, 1);
	}
}
