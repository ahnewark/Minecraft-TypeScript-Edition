


import { java, int, double, float } from "../jree/index";
import { World } from "./World";
import { RedstoneUpdateInfo } from "./RedstoneUpdateInfo";
import { IBlockAccess } from "./IBlockAccess";
import { BlockTorch } from "./BlockTorch";
import { Block } from "./Block";
import { Random } from "../java/util/Random";

export  class BlockRedstoneTorch extends BlockTorch {
	private torchActive:  boolean = false;
	private static torchUpdates:  RedstoneUpdateInfo[] = [];

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return i1 === 1 ? Block.redstoneWire.getBlockTextureFromSideAndMetadata(i1, i2) : super.getBlockTextureFromSideAndMetadata(i1, i2);
	}

	private checkForBurnout(world1: World| null, i2: int, i3: int, i4: int, z5: boolean):  boolean {
		if(z5) {
			BlockRedstoneTorch.torchUpdates.push(new  RedstoneUpdateInfo(i2, i3, i4, world1.worldTime));
		}

		let  i6: int = 0;

		for(let  i7: int = 0; i7 < BlockRedstoneTorch.torchUpdates.length; ++i7) {
			let  redstoneUpdateInfo8: RedstoneUpdateInfo = BlockRedstoneTorch.torchUpdates[i7] as RedstoneUpdateInfo;
			if(redstoneUpdateInfo8.x === i2 && redstoneUpdateInfo8.y === i3 && redstoneUpdateInfo8.z === i4) {
				++i6;
				if(i6 >= 8) {
					return true;
				}
			}
		}

		return false;
	}

	public constructor(i1: int, i2: int, z3: boolean) {
		super(i1, i2);
		this.torchActive = z3;
		this.setTickOnLoad(true);
	}

	public tickRate():  int {
		return 2;
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(await world1.getBlockMetadata(i2, i3, i4) === 0) {
			await super.onBlockAdded(world1, i2, i3, i4);
		}

		if(this.torchActive) {
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 + 1, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2 - 1, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2 + 1, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4 - 1, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4 + 1, this.blockID);
		}

	}

	public async onBlockRemoval(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(this.torchActive) {
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 + 1, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2 - 1, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2 + 1, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4 - 1, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4 + 1, this.blockID);
		}

	}

	public async isPoweringTo(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(!this.torchActive) {
			return false;
		} else {
			let  i6: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
			return i6 === 5 && i5 === 1 ? false : (i6 === 3 && i5 === 3 ? false : (i6 === 4 && i5 === 2 ? false : (i6 === 1 && i5 === 5 ? false : i6 !== 2 || i5 !== 4)));
		}
	}

	private async isGettingPoweredFromSide(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		return i5 === 5 && world1.isBlockIndirectlyProvidingPowerTo(i2, i3 - 1, i4, 0) ? true : (i5 === 3 && world1.isBlockIndirectlyProvidingPowerTo(i2, i3, i4 - 1, 2) ? true : (i5 === 4 && world1.isBlockIndirectlyProvidingPowerTo(i2, i3, i4 + 1, 3) ? true : (i5 === 1 && world1.isBlockIndirectlyProvidingPowerTo(i2 - 1, i3, i4, 4) ? true : i5 === 2 && world1.isBlockIndirectlyProvidingPowerTo(i2 + 1, i3, i4, 5))));
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		let  z6: boolean = await this.isGettingPoweredFromSide(world1, i2, i3, i4);

		while(BlockRedstoneTorch.torchUpdates.length > 0 && world1.worldTime - (BlockRedstoneTorch.torchUpdates[0] as RedstoneUpdateInfo).updateTime > 100n) {
			BlockRedstoneTorch.torchUpdates.splice(0, 1);
		}

		if(this.torchActive) {
			if(z6) {
				await world1.setBlockAndMetadataWithNotify(i2, i3, i4, Block.torchRedstoneIdle.blockID, await world1.getBlockMetadata(i2, i3, i4));
				if(this.checkForBurnout(world1, i2, i3, i4, true)) {
					world1.playSoundEffect((i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double, "random.fizz", 0.5, 2.6 + (world1.rand.nextFloat() - world1.rand.nextFloat()) * 0.8);

					for(let  i7: int = 0; i7 < 5; ++i7) {
						let  d8: double = i2 as double + random5.nextDouble() * 0.6 + 0.2;
						let  d10: double = i3 as double + random5.nextDouble() * 0.6 + 0.2;
						let  d12: double = i4 as double + random5.nextDouble() * 0.6 + 0.2;
						world1.spawnParticle("smoke", d8, d10, d12, 0.0, 0.0, 0.0);
					}
				}
			}
		} else if(!z6 && !this.checkForBurnout(world1, i2, i3, i4, false)) {
			await world1.setBlockAndMetadataWithNotify(i2, i3, i4, Block.torchRedstoneActive.blockID, await world1.getBlockMetadata(i2, i3, i4));
		}

	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int): Promise<void> {
		await super.onNeighborBlockChange(world1, i2, i3, i4, i5);
		await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
	}

	public async isIndirectlyPoweringTo(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return i5 === 0 ? await this.isPoweringTo(world1, i2, i3, i4, i5) : false;
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return Block.torchRedstoneActive.blockID;
	}

	public canProvidePower():  boolean {
		return true;
	}

	public async randomDisplayTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(this.torchActive) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			let  d7: double = (i2 as float + 0.5) as double + (random5.nextFloat() - 0.5) as double * 0.2;
			let  d9: double = (i3 as float + 0.7) as double + (random5.nextFloat() - 0.5) as double * 0.2;
			let  d11: double = (i4 as float + 0.5) as double + (random5.nextFloat() - 0.5) as double * 0.2;
			let  d13: double = 0.22 as double;
			let  d15: double = 0.27 as double;
			if(i6 === 1) {
				world1.spawnParticle("reddust", d7 - d15, d9 + d13, d11, 0.0, 0.0, 0.0);
			} else if(i6 === 2) {
				world1.spawnParticle("reddust", d7 + d15, d9 + d13, d11, 0.0, 0.0, 0.0);
			} else if(i6 === 3) {
				world1.spawnParticle("reddust", d7, d9 + d13, d11 - d15, 0.0, 0.0, 0.0);
			} else if(i6 === 4) {
				world1.spawnParticle("reddust", d7, d9 + d13, d11 + d15, 0.0, 0.0, 0.0);
			} else {
				world1.spawnParticle("reddust", d7, d9, d11, 0.0, 0.0, 0.0);
			}

		}
	}
}
