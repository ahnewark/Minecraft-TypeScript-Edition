import { int, float, double } from "../jree/index";
import { World } from "./World";
import { IBlockAccess } from "./IBlockAccess";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class BlockLever extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.circuits);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return null;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 12;
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.isBlockOpaqueCube(i2 - 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2 + 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2, i3, i4 - 1) ? true : (await world1.isBlockOpaqueCube(i2, i3, i4 + 1) ? true : await world1.isBlockOpaqueCube(i2, i3 - 1, i4))));
	}

	public async onBlockPlaced(world1: World| null, i2: int, i3: int, i4: int, i5: int): Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		let  i7: int = i6 & 8;
		i6 &= 7;
		if(i5 === 1 && await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
			i6 = 5 + world1.rand.nextInt(2);
		}

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

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 1);
		} else if(await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 2);
		} else if(await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 3);
		} else if(await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 4);
		} else if(await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 5 + world1.rand.nextInt(2));
		}

		await this.checkIfAttachedToBlock(world1, i2, i3, i4);
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(await this.checkIfAttachedToBlock(world1, i2, i3, i4)) {
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

			if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4) && i6 === 5) {
				z7 = true;
			}

			if(z7) {
				await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			}
		}

	}

	private async checkIfAttachedToBlock(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		if(!await this.canPlaceBlockAt(world1, i2, i3, i4)) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
			return false;
		} else {
			return true;
		}
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4) & 7;
		let  f6: float = 0.1875;
		if(i5 === 1) {
			this.setBlockBounds(0.0, 0.2, 0.5 - f6, f6 * 2.0, 0.8, 0.5 + f6);
		} else if(i5 === 2) {
			this.setBlockBounds(1.0 - f6 * 2.0, 0.2, 0.5 - f6, 1.0, 0.8, 0.5 + f6);
		} else if(i5 === 3) {
			this.setBlockBounds(0.5 - f6, 0.2, 0.0, 0.5 + f6, 0.8, f6 * 2.0);
		} else if(i5 === 4) {
			this.setBlockBounds(0.5 - f6, 0.2, 1.0 - f6 * 2.0, 0.5 + f6, 0.8, 1.0);
		} else {
			f6 = 0.25;
			this.setBlockBounds(0.5 - f6, 0.0, 0.5 - f6, 0.5 + f6, 0.6, 0.5 + f6);
		}

	}

	public async onBlockClicked(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null): Promise<void> {
		await this.blockActivated(world1, i2, i3, i4, entityPlayer5);
	}

	public async blockActivated(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null):  Promise<boolean> {
		if(world1.multiplayerWorld) {
			return true;
		} else {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			let  i7: int = i6 & 7;
			let  i8: int = 8 - (i6 & 8);
			await world1.setBlockMetadataWithNotify(i2, i3, i4, i7 + i8);
			world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
			world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "random.click", 0.3, i8 > 0 ? 0.6 : 0.5);
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

			return true;
		}
	}

	public async onBlockRemoval(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
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

	public async isPoweringTo(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return (await iBlockAccess1.getBlockMetadata(i2, i3, i4) & 8) > 0;
	}

	public async isIndirectlyPoweringTo(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
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
}
