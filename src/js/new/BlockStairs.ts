import { int, java, float, double } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MathHelper } from "./MathHelper";
import { IBlockAccess } from "./IBlockAccess";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";

export  class BlockStairs extends Block {
	private modelBlock:  Block | null;

	public constructor(i1: int, block2: Block| null) {
		super(i1, block2.blockIndexInTexture, block2.blockMaterial);
		this.modelBlock = block2;
		this.setHardness(block2.blockHardness);
		this.setResistance(block2.blockResistance / 3.0);
		this.setStepSound(block2.stepSound);
	}

	public setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  void {
		this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return await super.getCollisionBoundingBoxFromPool(world1, i2, i3, i4);
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 10;
	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return await super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, i5);
	}

	public async getCollidingBoundingBoxes(world1: World| null, i2: int, i3: int, i4: int, axisAlignedBB5: AxisAlignedBB| null, arrayList6: AxisAlignedBB[]):  Promise<void> {
		let  i7: int = await world1.getBlockMetadata(i2, i3, i4);
		if(i7 === 0) {
			this.setBlockBounds(0.0, 0.0, 0.0, 0.5, 0.5, 1.0);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
			this.setBlockBounds(0.5, 0.0, 0.0, 1.0, 1.0, 1.0);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
		} else if(i7 === 1) {
			this.setBlockBounds(0.0, 0.0, 0.0, 0.5, 1.0, 1.0);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
			this.setBlockBounds(0.5, 0.0, 0.0, 1.0, 0.5, 1.0);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
		} else if(i7 === 2) {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.5, 0.5);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
			this.setBlockBounds(0.0, 0.0, 0.5, 1.0, 1.0, 1.0);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
		} else if(i7 === 3) {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, 0.5);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
			this.setBlockBounds(0.0, 0.0, 0.5, 1.0, 0.5, 1.0);
			super.getCollidingBoundingBoxes(world1, i2, i3, i4, axisAlignedBB5, arrayList6);
		}

		this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
	}

	public randomDisplayTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random | null):  void {
		this.modelBlock.randomDisplayTick(world1, i2, i3, i4, random5);
	}

	public async onBlockClicked(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null):  Promise<void> {
		this.modelBlock.onBlockClicked(world1, i2, i3, i4, entityPlayer5);
	}

	public async onBlockDestroyedByPlayer(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await this.modelBlock.onBlockDestroyedByPlayer(world1, i2, i3, i4, i5);
	}

	public async getBlockBrightness(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<float> {
		return await this.modelBlock.getBlockBrightness(iBlockAccess1, i2, i3, i4);
	}

	public getExplosionResistance(entity1: Entity| null):  float {
		return this.modelBlock.getExplosionResistance(entity1);
	}

	public getRenderBlockPass():  int {
		return this.modelBlock.getRenderBlockPass();
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return this.modelBlock.idDropped(i1, random2);
	}

	public quantityDropped(random1: Random| null):  int {
		return this.modelBlock.quantityDropped(random1);
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return this.modelBlock.getBlockTextureFromSideAndMetadata(i1, i2);
	}

	public getBlockTextureFromSide(i1: int):  int {
		return this.modelBlock.getBlockTextureFromSide(i1);
	}

	public async getBlockTexture(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int):  Promise<int> {
		return await this.modelBlock.getBlockTexture(iBlockAccess1, i2, i3, i4, i5);
	}

	public tickRate():  int {
		return this.modelBlock.tickRate();
	}

	public async getSelectedBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return await this.modelBlock.getSelectedBoundingBoxFromPool(world1, i2, i3, i4);
	}

	public velocityToAddToEntity(world1: World| null, i2: int, i3: int, i4: int, entity5: Entity| null, vec3D6: Vec3D| null):  void {
		this.modelBlock.velocityToAddToEntity(world1, i2, i3, i4, entity5, vec3D6);
	}

	public isCollidable():  boolean {
		return this.modelBlock.isCollidable();
	}

	public canCollideCheck(i1: int, z2: boolean):  boolean {
		return this.modelBlock.canCollideCheck(i1, z2);
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await this.modelBlock.canPlaceBlockAt(world1, i2, i3, i4);
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		this.onNeighborBlockChange(world1, i2, i3, i4, 0);
		this.modelBlock.onBlockAdded(world1, i2, i3, i4);
	}

	public async onBlockRemoval(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		this.modelBlock.onBlockRemoval(world1, i2, i3, i4);
	}

	public async dropBlockAsItemWithChance(world1: World| null, i2: int, i3: int, i4: int, i5: int, f6: float):  Promise<void> {
		await this.modelBlock.dropBlockAsItemWithChance(world1, i2, i3, i4, i5, f6);
	}

	public async dropBlockAsItem(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await this.modelBlock.dropBlockAsItem(world1, i2, i3, i4, i5);
	}

	public async onEntityWalking(world1: World| null, i2: int, i3: int, i4: int, entity5: Entity| null):  Promise<void> {
		this.modelBlock.onEntityWalking(world1, i2, i3, i4, entity5);
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		this.modelBlock.updateTick(world1, i2, i3, i4, random5);
	}

	public async blockActivated(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null):  Promise<boolean> {
		return this.modelBlock.blockActivated(world1, i2, i3, i4, entityPlayer5);
	}

	public async onBlockDestroyedByExplosion(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		this.modelBlock.onBlockDestroyedByExplosion(world1, i2, i3, i4);
	}

	public async onBlockPlacedBy(world1: World| null, i2: int, i3: int, i4: int, entityLiving5: EntityLiving| null):  Promise<void> {
		let  i6: int = MathHelper.floor_double((entityLiving5.rotationYaw * 4.0 / 360.0) as double + 0.5) & 3;
		if(i6 === 0) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 2);
		}

		if(i6 === 1) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 1);
		}

		if(i6 === 2) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 3);
		}

		if(i6 === 3) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 0);
		}

	}
}
