import { int, float, java, double } from "../jree/index";
import { World } from "./World";
import { IBlockAccess } from "./IBlockAccess";
import { EnumMobType } from "./EnumMobType";
import { Entity } from "./Entity";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../jree/java/util/Random";

export  class BlockPressurePlate extends Block {
	private triggerMobType:  EnumMobType | undefined;

	public constructor(i1: int, i2: int, enumMobType3: EnumMobType| undefined) {
		super(i1, i2, MaterialRegistry.rock);
		this.triggerMobType = enumMobType3;
		this.setTickOnLoad(true);
		let  f4: float = 0.0625;
		this.setBlockBounds(f4, 0.0, f4, 1.0 - f4, 0.03125, 1.0 - f4);
	}

	public tickRate():  int {
		return 20;
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

	public async canPlaceBlockAt(world1: World| undefined, i2: int, i3: int, i4: int): Promise<boolean> {
		return world1.isBlockOpaqueCube(i2, i3 - 1, i4);
	}

	public async onBlockAdded(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  z6: boolean = false;
		if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
			z6 = true;
		}

		if(z6) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(!world1.multiplayerWorld) {
			if(await world1.getBlockMetadata(i2, i3, i4) !== 0) {
				await this.setStateIfMobInteractsWithPlate(world1, i2, i3, i4);
			}
		}
	}

	public async onEntityCollidedWithBlock(world1: World| undefined, i2: int, i3: int, i4: int, entity5: Entity| undefined):  Promise<void> {
		if(!world1.multiplayerWorld) {
			if(await world1.getBlockMetadata(i2, i3, i4) !== 1) {
				await this.setStateIfMobInteractsWithPlate(world1, i2, i3, i4);
			}
		}
	}

	private async setStateIfMobInteractsWithPlate(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  z5: boolean = await world1.getBlockMetadata(i2, i3, i4) === 1;
		let  z6: boolean = false;
		let  f7: float = 0.125;
		let  list8: Entity[] = [];
		if(this.triggerMobType === EnumMobType.everything) {
			list8 = await world1.getEntitiesWithinAABBExcludingEntity(undefined, AxisAlignedBB.getBoundingBoxFromPool((i2 as float + f7) as double, i3 as double, (i4 as float + f7) as double, ((i2 + 1) as float - f7) as double, i3 as double + 0.25, ((i4 + 1) as float - f7) as double));
		}

		if(this.triggerMobType === EnumMobType.mobs) {
			list8 = await world1.getEntitiesWithinAABB('Living', AxisAlignedBB.getBoundingBoxFromPool((i2 as float + f7) as double, i3 as double, (i4 as float + f7) as double, ((i2 + 1) as float - f7) as double, i3 as double + 0.25, ((i4 + 1) as float - f7) as double));
		}

		if(this.triggerMobType === EnumMobType.players) {
			list8 = await world1.getEntitiesWithinAABB('Player', AxisAlignedBB.getBoundingBoxFromPool((i2 as float + f7) as double, i3 as double, (i4 as float + f7) as double, ((i2 + 1) as float - f7) as double, i3 as double + 0.25, ((i4 + 1) as float - f7) as double));
		}

		if(list8.length > 0) {
			z6 = true;
		}

		if(z6 && !z5) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 1);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
			world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.1, i4 as double + 0.5, "random.click", 0.3, 0.6);
		}

		if(!z6 && z5) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 0);
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
			world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
			world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.1, i4 as double + 0.5, "random.click", 0.3, 0.5);
		}

		if(z6) {
			await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
		}

	}

	public async onBlockRemoval(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		if(i5 > 0) {
			await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
			await world1.notifyBlocksOfNeighborChange(i2, i3 - 1, i4, this.blockID);
		}

		await super.onBlockRemoval(world1, i2, i3, i4);
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  z5: boolean = await iBlockAccess1.getBlockMetadata(i2, i3, i4) === 1;
		let  f6: float = 0.0625;
		if(z5) {
			await this.setBlockBounds(f6, 0.0, f6, 1.0 - f6, 0.03125, 1.0 - f6);
		} else {
			await this.setBlockBounds(f6, 0.0, f6, 1.0 - f6, 0.0625, 1.0 - f6);
		}

	}

	public async isPoweringTo(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return await iBlockAccess1.getBlockMetadata(i2, i3, i4) > 0;
	}

	public async isIndirectlyPoweringTo(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return await world1.getBlockMetadata(i2, i3, i4) === 0 ? false : i5 === 1;
	}

	public canProvidePower():  boolean {
		return true;
	}

	public func_237_e():  void {
		let  f1: float = 0.5;
		let  f2: float = 0.125;
		let  f3: float = 0.5;
		this.setBlockBounds(0.5 - f1, 0.5 - f2, 0.5 - f3, 0.5 + f1, 0.5 + f2, 0.5 + f3);
	}
}
