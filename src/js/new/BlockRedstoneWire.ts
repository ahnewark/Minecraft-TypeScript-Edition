import { int, double, float } from "../jree/index";
import { World } from "./World";
import { IBlockAccess } from "./IBlockAccess";
import { ChunkPosition } from "./ChunkPosition";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Item } from "./Item";
import { Block } from "./Block";
import { Random } from "../java/util/Random";

export  class BlockRedstoneWire extends Block {
	private wiresProvidePower:  boolean = true;
	private field_21031_b:  Set<ChunkPosition> = new Set;

	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.circuits);
		this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.0625, 1.0);
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return this.blockIndexInTexture + (i2 > 0 ? 16 : 0);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		return undefined;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 5;
	}

	public async canPlaceBlockAt(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.isBlockOpaqueCube(i2, i3 - 1, i4);
	}

	private async updateAndPropagateCurrentStrength(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await this.func_21030_a(world1, i2, i3, i4, i2, i3, i4);
		let  arrayList5 = Array.from(this.field_21031_b);
		this.field_21031_b.clear();

		for(let  i6: int = 0; i6 < arrayList5.length; ++i6) {
			let  chunkPosition7: ChunkPosition = arrayList5[i6];
			await world1.notifyBlocksOfNeighborChange(chunkPosition7.x, chunkPosition7.y, chunkPosition7.z, this.blockID);
		}

	}

	private async func_21030_a(world1: World| undefined, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int):  Promise<void> {
		let  i8: int = await world1.getBlockMetadata(i2, i3, i4);
		let  i9: int = 0;
		this.wiresProvidePower = false;
		let  z10: boolean = await world1.isBlockIndirectlyGettingPowered(i2, i3, i4);
		this.wiresProvidePower = true;
		let  i11: int;
		let  i12: int;
		let  i13: int;
		if(z10) {
			i9 = 15;
		} else {
			for(i11 = 0; i11 < 4; ++i11) {
				i12 = i2;
				i13 = i4;
				if(i11 === 0) {
					i12 = i2 - 1;
				}

				if(i11 === 1) {
					++i12;
				}

				if(i11 === 2) {
					i13 = i4 - 1;
				}

				if(i11 === 3) {
					++i13;
				}

				if(i12 !== i5 || i3 !== i6 || i13 !== i7) {
					i9 = await this.getMaxCurrentStrength(world1, i12, i3, i13, i9);
				}

				if(await world1.isBlockOpaqueCube(i12, i3, i13) && !await world1.isBlockOpaqueCube(i2, i3 + 1, i4)) {
					if(i12 !== i5 || i3 + 1 !== i6 || i13 !== i7) {
						i9 = await this.getMaxCurrentStrength(world1, i12, i3 + 1, i13, i9);
					}
				} else if(!await world1.isBlockOpaqueCube(i12, i3, i13) && (i12 !== i5 || i3 - 1 !== i6 || i13 !== i7)) {
					i9 = await this.getMaxCurrentStrength(world1, i12, i3 - 1, i13, i9);
				}
			}

			if(i9 > 0) {
				--i9;
			} else {
				i9 = 0;
			}
		}

		if(i8 !== i9) {
			world1.field_1043_h = true;
			await world1.setBlockMetadataWithNotify(i2, i3, i4, i9);
			world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
			world1.field_1043_h = false;

			for(i11 = 0; i11 < 4; ++i11) {
				i12 = i2;
				i13 = i4;
				let  i14: int = i3 - 1;
				if(i11 === 0) {
					i12 = i2 - 1;
				}

				if(i11 === 1) {
					++i12;
				}

				if(i11 === 2) {
					i13 = i4 - 1;
				}

				if(i11 === 3) {
					++i13;
				}

				if(await world1.isBlockOpaqueCube(i12, i3, i13)) {
					i14 += 2;
				}

				let  z15: boolean = false;
				let  i16: int = await this.getMaxCurrentStrength(world1, i12, i3, i13, -1);
				i9 = await world1.getBlockMetadata(i2, i3, i4);
				if(i9 > 0) {
					--i9;
				}

				if(i16 >= 0 && i16 !== i9) {
					await this.func_21030_a(world1, i12, i3, i13, i2, i3, i4);
				}

				i16 = await this.getMaxCurrentStrength(world1, i12, i14, i13, -1);
				i9 = await world1.getBlockMetadata(i2, i3, i4);
				if(i9 > 0) {
					--i9;
				}

				if(i16 >= 0 && i16 !== i9) {
					await this.func_21030_a(world1, i12, i14, i13, i2, i3, i4);
				}
			}

			if(i8 === 0 || i9 === 0) {
				this.field_21031_b.add(new  ChunkPosition(i2, i3, i4));
				this.field_21031_b.add(new  ChunkPosition(i2 - 1, i3, i4));
				this.field_21031_b.add(new  ChunkPosition(i2 + 1, i3, i4));
				this.field_21031_b.add(new  ChunkPosition(i2, i3 - 1, i4));
				this.field_21031_b.add(new  ChunkPosition(i2, i3 + 1, i4));
				this.field_21031_b.add(new  ChunkPosition(i2, i3, i4 - 1));
				this.field_21031_b.add(new  ChunkPosition(i2, i3, i4 + 1));
			}
		}

	}

	private async notifyWireNeighborsOfNeighborChange(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		if(await world1.getBlockId(i2, i3, i4) === this.blockID) {
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2 - 1, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2 + 1, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4 - 1, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4 + 1, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 + 1, i4, this.blockID);
		}
	}

	public async onBlockAdded(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await super.onBlockAdded(world1, i2, i3, i4);
		if(!world1.multiplayerWorld) {
			await this.updateAndPropagateCurrentStrength(world1, i2, i3, i4);
			await world1.notifyBlocksOfNeighborChange(i2, i3 + 1, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2 - 1, i3, i4);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2 + 1, i3, i4);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3, i4 - 1);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3, i4 + 1);
			if(await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 - 1, i3 + 1, i4);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 - 1, i3 - 1, i4);
			}

			if(await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 + 1, i3 + 1, i4);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 + 1, i3 - 1, i4);
			}

			if(await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 + 1, i4 - 1);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 - 1, i4 - 1);
			}

			if(await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 + 1, i4 + 1);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 - 1, i4 + 1);
			}

		}
	}

	public async onBlockRemoval(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await super.onBlockRemoval(world1, i2, i3, i4);
		if(!world1.multiplayerWorld) {
			await world1.notifyBlocksOfNeighborChange(i2, i3 + 1, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			await this.updateAndPropagateCurrentStrength(world1, i2, i3, i4);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2 - 1, i3, i4);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2 + 1, i3, i4);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3, i4 - 1);
			await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3, i4 + 1);
			if(await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 - 1, i3 + 1, i4);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 - 1, i3 - 1, i4);
			}

			if(await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 + 1, i3 + 1, i4);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2 + 1, i3 - 1, i4);
			}

			if(await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 + 1, i4 - 1);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 - 1, i4 - 1);
			}

			if(await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 + 1, i4 + 1);
			} else {
				await this.notifyWireNeighborsOfNeighborChange(world1, i2, i3 - 1, i4 + 1);
			}

		}
	}

	private async getMaxCurrentStrength(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<int> {
		if(await world1.getBlockId(i2, i3, i4) !== this.blockID) {
			return i5;
		} else {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			return i6 > i5 ? i6 : i5;
		}
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(!world1.multiplayerWorld) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			let  z7: boolean = await this.canPlaceBlockAt(world1, i2, i3, i4);
			if(!z7) {
				await this.dropBlockAsItem(world1, i2, i3, i4, i6);
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			} else {
				await this.updateAndPropagateCurrentStrength(world1, i2, i3, i4);
			}

			await super.onNeighborBlockChange(world1, i2, i3, i4, i5);
		}
	}

	public idDropped(i1: int, random2: Random | undefined):  int {
		return Item.redstone.shiftedIndex;
	}

	public async isIndirectlyPoweringTo(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return !this.wiresProvidePower ? false : await this.isPoweringTo(world1, i2, i3, i4, i5);
	}

	public async isPoweringTo(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(!this.wiresProvidePower) {
			return false;
		} else if(await iBlockAccess1.getBlockMetadata(i2, i3, i4) === 0) {
			return false;
		} else if(i5 === 1) {
			return true;
		} else {
			let  z6: boolean = await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2 - 1, i3, i4) || !await iBlockAccess1.isBlockOpaqueCube(i2 - 1, i3, i4) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2 - 1, i3 - 1, i4);
			let  z7: boolean = await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2 + 1, i3, i4) || !await iBlockAccess1.isBlockOpaqueCube(i2 + 1, i3, i4) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2 + 1, i3 - 1, i4);
			let  z8: boolean = await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2, i3, i4 - 1) || !await iBlockAccess1.isBlockOpaqueCube(i2, i3, i4 - 1) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2, i3 - 1, i4 - 1);
			let  z9: boolean = await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2, i3, i4 + 1) || !await iBlockAccess1.isBlockOpaqueCube(i2, i3, i4 + 1) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2, i3 - 1, i4 + 1);
			if(!await iBlockAccess1.isBlockOpaqueCube(i2, i3 + 1, i4)) {
				if(await iBlockAccess1.isBlockOpaqueCube(i2 - 1, i3, i4) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2 - 1, i3 + 1, i4)) {
					z6 = true;
				}

				if(await iBlockAccess1.isBlockOpaqueCube(i2 + 1, i3, i4) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2 + 1, i3 + 1, i4)) {
					z7 = true;
				}

				if(await iBlockAccess1.isBlockOpaqueCube(i2, i3, i4 - 1) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2, i3 + 1, i4 - 1)) {
					z8 = true;
				}

				if(await iBlockAccess1.isBlockOpaqueCube(i2, i3, i4 + 1) && await BlockRedstoneWire.isPowerProviderOrWire(iBlockAccess1, i2, i3 + 1, i4 + 1)) {
					z9 = true;
				}
			}

			return !z8 && !z7 && !z6 && !z9 && i5 >= 2 && i5 <= 5 ? true : (i5 === 2 && z8 && !z6 && !z7 ? true : (i5 === 3 && z9 && !z6 && !z7 ? true : (i5 === 4 && z6 && !z8 && !z9 ? true : i5 === 5 && z7 && !z8 && !z9)));
		}
	}

	public canProvidePower():  boolean {
		return this.wiresProvidePower;
	}

	public async randomDisplayTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(await world1.getBlockMetadata(i2, i3, i4) > 0) {
			let  d6: double = i2 as double + 0.5 + (random5.nextFloat() as double - 0.5) * 0.2;
			let  d8: double = (i3 as float + 0.0625) as double;
			let  d10: double = i4 as double + 0.5 + (random5.nextFloat() as double - 0.5) * 0.2;
			world1.spawnParticle("reddust", d6, d8, d10, 0.0, 0.0, 0.0);
		}

	}

	public static async isPowerProviderOrWire(iBlockAccess0: IBlockAccess| undefined, i1: int, i2: int, i3: int):  Promise<boolean> {
		let  i4: int = await iBlockAccess0.getBlockId(i1, i2, i3);
		return i4 === Block.redstoneWire.blockID ? true : (i4 === 0 ? false : await Block.blocksList[i4].canProvidePower());
	}
}
