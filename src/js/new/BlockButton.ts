


import { int, float, double, java } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";

export  class BlockButton extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.circuits);
		this.setTickOnLoad(true);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		return undefined;
	}

	public tickRate():  int {
		return 20;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public async canPlaceBlockAt(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.isBlockOpaqueCube(i2 - 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2 + 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2, i3, i4 - 1) ? true : await world1.isBlockOpaqueCube(i2, i3, i4 + 1)));
	}

	public async onBlockPlaced(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		let  i7: int = i6 & 8;
		i6 &= 7;
		if(i5 === 2 && await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
			i6 = 4;
		}

		if(i5 === 3 && await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
			i6 = 3;
		}

		if(i5 === 4 && await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
			i6 = 2;
		}

		if(i5 === 5 && await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
			i6 = 1;
		}

		await world1.setBlockMetadataWithNotify(i2, i3, i4, i6 + i7);
	}

	public async onBlockAdded(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		if(await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 1);
		} else if(await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 2);
		} else if(await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 3);
		} else if(await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 4);
		}

		await this.func_305_h(world1, i2, i3, i4);
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(await this.func_305_h(world1, i2, i3, i4)) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4) & 7;
			let  z7: boolean = false;
			if(!await world1.isBlockOpaqueCube(i2 - 1, i3, i4) && i6 === 1) {
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2 + 1, i3, i4) && i6 === 2) {
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2, i3, i4 - 1) && i6 === 3) {
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2, i3, i4 + 1) && i6 === 4) {
				z7 = true;
			}

			if(z7) {
				await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			}
		}

	}

	private async func_305_h(world1: World| undefined, i2: int, i3: int, i4: int): Promise<boolean> {
		if(!await this.canPlaceBlockAt(world1, i2, i3, i4)) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
			return false;
		} else {
			return true;
		}
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
		let  i6: int = i5 & 7;
		let  z7: boolean = (i5 & 8) > 0;
		let  f8: float = 0.375;
		let  f9: float = 0.625;
		let  f10: float = 0.1875;
		let  f11: float = 0.125;
		if(z7) {
			f11 = 0.0625;
		}

		if(i6 === 1) {
			this.setBlockBounds(0.0, f8, 0.5 - f10, f11, f9, 0.5 + f10);
		} else if(i6 === 2) {
			this.setBlockBounds(1.0 - f11, f8, 0.5 - f10, 1.0, f9, 0.5 + f10);
		} else if(i6 === 3) {
			this.setBlockBounds(0.5 - f10, f8, 0.0, 0.5 + f10, f9, f11);
		} else if(i6 === 4) {
			this.setBlockBounds(0.5 - f10, f8, 1.0 - f11, 0.5 + f10, f9, 1.0);
		}

	}

	public async onBlockClicked(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<void> {
		await this.blockActivated(world1, i2, i3, i4, entityPlayer5);
	}

	public async blockActivated(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<boolean> {
		if(world1.multiplayerWorld) {
			return true;
		} else {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			let  i7: int = i6 & 7;
			let  i8: int = 8 - (i6 & 8);
			if(i8 === 0) {
				return true;
			} else {
				await world1.setBlockMetadataWithNotify(i2, i3, i4, i7 + i8);
				world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
				world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "random.click", 0.3, 0.6);
				await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
				if(i7 === 1) {
					await world1.notifyBlocksOfNeighborChange(i2 - 1, i3, i4, this.blockID);
				} else if(i7 === 2) {
					await world1.notifyBlocksOfNeighborChange(i2 + 1, i3, i4, this.blockID);
				} else if(i7 === 3) {
					await world1.notifyBlocksOfNeighborChange(i2, i3, i4 - 1, this.blockID);
				} else if(i7 === 4) {
					await world1.notifyBlocksOfNeighborChange(i2, i3, i4 + 1, this.blockID);
				} else {
					await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
				}

				await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
				return true;
			}
		}
	}

	public async onBlockRemoval(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		if((i5 & 8) > 0) {
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
			let  i6: int = i5 & 7;
			if(i6 === 1) {
				await world1.notifyBlocksOfNeighborChange(i2 - 1, i3, i4, this.blockID);
			} else if(i6 === 2) {
				await world1.notifyBlocksOfNeighborChange(i2 + 1, i3, i4, this.blockID);
			} else if(i6 === 3) {
				await world1.notifyBlocksOfNeighborChange(i2, i3, i4 - 1, this.blockID);
			} else if(i6 === 4) {
				await world1.notifyBlocksOfNeighborChange(i2, i3, i4 + 1, this.blockID);
			} else {
				await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			}
		}

		await super.onBlockRemoval(world1, i2, i3, i4);
	}

	public async isPoweringTo(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return (await iBlockAccess1.getBlockMetadata(i2, i3, i4) & 8) > 0;
	}

	public async isIndirectlyPoweringTo(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		if((i6 & 8) === 0) {
			return false;
		} else {
			let  i7: int = i6 & 7;
			return i7 === 5 && i5 === 1 ? true : (i7 === 4 && i5 === 2 ? true : (i7 === 3 && i5 === 3 ? true : (i7 === 2 && i5 === 4 ? true : i7 === 1 && i5 === 5)));
		}
	}

	public canProvidePower():  boolean {
		return true;
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(!world1.multiplayerWorld) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			if((i6 & 8) !== 0) {
				await world1.setBlockMetadataWithNotify(i2, i3, i4, i6 & 7);
				await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
				let  i7: int = i6 & 7;
				if(i7 === 1) {
					await world1.notifyBlocksOfNeighborChange(i2 - 1, i3, i4, this.blockID);
				} else if(i7 === 2) {
					await world1.notifyBlocksOfNeighborChange(i2 + 1, i3, i4, this.blockID);
				} else if(i7 === 3) {
					await world1.notifyBlocksOfNeighborChange(i2, i3, i4 - 1, this.blockID);
				} else if(i7 === 4) {
					await world1.notifyBlocksOfNeighborChange(i2, i3, i4 + 1, this.blockID);
				} else {
					await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
				}

				world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "random.click", 0.3, 0.5);
				world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
			}
		}
	}

	public func_237_e():  void {
		let  f1: float = 0.1875;
		let  f2: float = 0.125;
		let  f3: float = 0.125;
		this.setBlockBounds(0.5 - f1, 0.5 - f2, 0.5 - f3, 0.5 + f1, 0.5 + f2, 0.5 + f3);
	}
}
