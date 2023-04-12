


import { java, S } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { StepSoundStone } from "./StepSoundStone";
import { StepSoundSand } from "./StepSoundSand";
import { StepSound } from "./StepSound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
// import { ItemLog } from "./ItemLog";
// import { ItemCloth } from "./ItemCloth";
// import { ItemBlock } from "./ItemBlock";
// import { Item } from "./Item";
import { IBlockAccess } from "./IBlockAccess";
import { IEntityPlayer } from "./interfaces/IEntityPlayer";
// import { EntityLiving } from "./EntityLiving";
// import { EntityItem } from "./EntityItem";
// import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";
import { IEntity } from "./interfaces/IEntity";
import { IEntityLiving } from "./interfaces/IEntityLiving";
import { IEntityItem } from "./interfaces/IEntityItem";
import { IItemStack } from "./interfaces/IItemStack";
import { BlockGrass } from "./BlockGrass";
import { BlockLeaves } from "./BlockLeaves";
import { BlockFlower } from "./BlockFlower";
import { BlockFire } from "./BlockFire";
import { BlockPortal } from "./BlockPortal";
// import { Block } from "./Block";

export class Block {
	// circular dep crudeness.
	public static entityItemCtor: (world: World, a2: number, a3: number, a4: number, itemStack: IItemStack) => IEntityItem;
	public static itemStackCtor: (a1: number, a2: number, a3: number) => IItemStack;

	public static stone:  Block;
	public static grass:  BlockGrass;
	public static dirt:  Block;
	public static cobblestone:  Block;
	public static planks:  Block;
	public static sapling:  Block;
	public static bedrock:  Block;
	public static waterStill:  Block;
	public static waterMoving:  Block;
	public static lavaStill:  Block;
	public static lavaMoving:  Block;
	public static sand:  Block;
	public static gravel:  Block;
	public static oreGold:  Block;
	public static oreIron:  Block;
	public static oreCoal:  Block;
	public static wood:  Block;
	public static leaves:  BlockLeaves;
	public static sponge:  Block;
	public static glass:  Block;
	public static oreLapis:  Block;
	public static blockLapis:  Block;
	public static dispenser:  Block;
	public static sandStone:  Block;
	public static musicBlock:  Block;
	public static field_9262_S:  Block;
	public static field_9261_T:  Block;
	public static field_9260_U:  Block;
	public static field_9259_V:  Block;
	public static field_9258_W:  Block;
	public static field_9257_X:  Block;
	public static field_9256_Y:  Block;
	public static field_9255_Z:  Block;
	public static field_9269_aa:  Block;
	public static cloth:  Block;
	public static field_9268_ac:  Block;
	public static plantYellow:  BlockFlower;
	public static plantRed:  BlockFlower;
	public static mushroomBrown:  BlockFlower;
	public static mushroomRed:  BlockFlower;
	public static blockGold:  Block;
	public static blockSteel:  Block;
	public static stairDouble:  Block;
	public static stairSingle:  Block;
	public static brick:  Block;
	public static tnt:  Block;
	public static bookShelf:  Block;
	public static cobblestoneMossy:  Block;
	public static obsidian:  Block;
	public static torchWood:  Block;
	public static fire:  BlockFire;
	public static mobSpawner:  Block;
	public static stairCompactPlanks:  Block;
	public static crate:  Block;
	public static redstoneWire:  Block;
	public static oreDiamond:  Block;
	public static blockDiamond:  Block;
	public static workbench:  Block;
	public static crops:  Block;
	public static tilledField:  Block;
	public static stoneOvenIdle:  Block;
	public static stoneOvenActive:  Block;
	public static signPost:  Block;
	public static doorWood:  Block;
	public static ladder:  Block;
	public static minecartTrack:  Block;
	public static stairCompactCobblestone:  Block;
	public static signWall:  Block;
	public static lever:  Block;
	public static pressurePlateStone:  Block;
	public static doorSteel:  Block;
	public static pressurePlatePlanks:  Block;
	public static oreRedstone:  Block;
	public static oreRedstoneGlowing:  Block;
	public static torchRedstoneIdle:  Block;
	public static torchRedstoneActive:  Block;
	public static button:  Block;
	public static snow:  Block;
	public static ice:  Block;
	public static blockSnow:  Block;
	public static cactus:  Block;
	public static blockClay:  Block;
	public static reed:  Block;
	public static jukebox:  Block;
	public static fence:  Block;
	public static pumpkin:  Block;
	public static bloodStone:  Block;
	public static slowSand:  Block;
	public static lightStone:  Block;
	public static portal:  BlockPortal;
	public static pumpkinLantern:  Block;
	public static cake:  Block;

	public blockIndexInTexture:  number;
	public readonly blockID:  number;
	public blockHardness:  number;
	public blockResistance:  number;
	public minX:  number;
	public minY:  number;
	public minZ:  number;
	public maxX:  number;
	public maxY:  number;
	public maxZ:  number;
	public stepSound:  StepSound;
	public blockParticleGravity:  number;
	public readonly blockMaterial:  Material;
	public slipperiness:  number;
	private blockName:  string

	public static readonly soundPowderFootstep:  StepSound = new  StepSound("stone", 1.0, 1.0);
	public static readonly soundWoodFootstep:  StepSound = new  StepSound("wood", 1.0, 1.0);
	public static readonly soundGravelFootstep:  StepSound = new  StepSound("gravel", 1.0, 1.0);
	public static readonly soundGrassFootstep:  StepSound = new  StepSound("grass", 1.0, 1.0);
	public static readonly soundStoneFootstep:  StepSound = new  StepSound("stone", 1.0, 1.0);
	public static readonly soundMetalFootstep:  StepSound = new  StepSound("stone", 1.0, 1.5);
	public static readonly soundGlassFootstep:  StepSound = new  StepSoundStone("stone", 1.0, 1.0);
	public static readonly soundClothFootstep:  StepSound = new  StepSound("cloth", 1.0, 1.0);
	public static readonly soundSandFootstep:  StepSound = new  StepSoundSand("sand", 1.0, 1.0);
	public static readonly blocksList:  Block[] = new   Array<Block>(256);
	public static readonly tickOnLoad:  boolean[] = new   Array<boolean>(256);
	public static readonly opaqueCubeLookup:  boolean[] = new   Array<boolean>(256);
	public static readonly isBlockContainer:  boolean[] = new   Array<boolean>(256);
	public static readonly lightOpacity:  Int32Array = new Int32Array(256);
	public static readonly unusedBooleanArray:  boolean[] = new   Array<boolean>(256);
	public static readonly lightValue:  Int32Array = new   Int32Array(256);

	public constructor(i1: number, material2: Material);

	public constructor(i1: number, i2: number, material3: Material);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 2: {
				const [i1, material2] = args as [number, Material];
                this.stepSound = Block.soundPowderFootstep;
                this.blockParticleGravity = 1.0;
                this.slipperiness = 0.6;
                if(Block.blocksList[i1] !== undefined) {
                    throw new  java.lang.IllegalArgumentException("Slot " + i1 + " is already occupied by " + Block.blocksList[i1] + " when adding " + this);
                } else {
                    this.blockMaterial = material2;
                    Block.blocksList[i1] = this;
                    this.blockID = i1;
                    this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
                    Block.opaqueCubeLookup[i1] = this.isOpaqueCube();
                    Block.lightOpacity[i1] = this.isOpaqueCube() ? 255 : 0;
                    Block.unusedBooleanArray[i1] = this.unusedMethod();
                    Block.isBlockContainer[i1] = false;
                }

				break;
			}

			case 3: {
				const [i1, i2, material3] = args as [number, number, Material];

                this.stepSound = Block.soundPowderFootstep;
                this.blockParticleGravity = 1.0;
                this.slipperiness = 0.6;
                if(Block.blocksList[i1] !== undefined) {
                    throw new  java.lang.IllegalArgumentException("Slot " + i1 + " is already occupied by " + Block.blocksList[i1] + " when adding " + this);
                } else {
                    this.blockMaterial = material3;
                    Block.blocksList[i1] = this;
                    this.blockID = i1;
                    this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
                    Block.opaqueCubeLookup[i1] = this.isOpaqueCube();
                    Block.lightOpacity[i1] = this.isOpaqueCube() ? 255 : 0;
                    Block.unusedBooleanArray[i1] = this.unusedMethod();
                    Block.isBlockContainer[i1] = false;
                }
                this.blockIndexInTexture = i2;
				
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public setStepSound(stepSound1: StepSound):  Block {
		this.stepSound = stepSound1;
		return this;
	}

	public setLightOpacity(i1: number):  Block {
		Block.lightOpacity[this.blockID] = i1;
		return this;
	}

	public setLightValue(f1: number):  Block {
		Block.lightValue[this.blockID] = (15.0 * f1) as number;
		return this;
	}

	public setResistance(f1: number):  Block {
		this.blockResistance = f1 * 3.0;
		return this;
	}

	private unusedMethod():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return true;
	}

	public getRenderType():  number {
		return 0;
	}

	public setHardness(f1: number):  Block {
		this.blockHardness = f1;
		if(this.blockResistance < f1 * 5.0) {
			this.blockResistance = f1 * 5.0;
		}

		return this;
	}

	public setTickOnLoad(z1: boolean):  void {
		Block.tickOnLoad[this.blockID] = z1;
	}

	public setBlockBounds(f1: number, f2: number, f3: number, f4: number, f5: number, f6: number):  void {
		this.minX = f1 as number;
		this.minY = f2 as number;
		this.minZ = f3 as number;
		this.maxX = f4 as number;
		this.maxY = f5 as number;
		this.maxZ = f6 as number;
	}

	public async getBlockBrightness(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number):  Promise<number> {
		return iBlockAccess1.getLightBrightness(i2, i3, i4);
	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number, i5: number):  Promise<boolean> {
		return i5 === 0 && this.minY > 0.0 ? true : (i5 === 1 && this.maxY < 1.0 ? true : (i5 === 2 && this.minZ > 0.0 ? true : (i5 === 3 && this.maxZ < 1.0 ? true : (i5 === 4 && this.minX > 0.0 ? true : (i5 === 5 && this.maxX < 1.0 ? true : !iBlockAccess1.isBlockOpaqueCube(i2, i3, i4))))));
	}

	public async getBlockTexture(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number, i5: number):  Promise<number> {
		return this.getBlockTextureFromSideAndMetadata(i5, await iBlockAccess1.getBlockMetadata(i2, i3, i4));
	}

	public getBlockTextureFromSideAndMetadata(i1: number, i2: number):  number {
		return this.getBlockTextureFromSide(i1);
	}

	public getBlockTextureFromSide(i1: number):  number {
		return this.blockIndexInTexture;
	}

	public async getSelectedBoundingBoxFromPool(world1: World| undefined, i2: number, i3: number, i4: number):  Promise<AxisAlignedBB | undefined> {
		return AxisAlignedBB.getBoundingBoxFromPool(i2 as number + this.minX, i3 as number + this.minY, i4 as number + this.minZ, i2 as number + this.maxX, i3 as number + this.maxY, i4 as number + this.maxZ);
	}

	public async getCollidingBoundingBoxes(world1: World, i2: number, i3: number, i4: number, axisAlignedBB5: AxisAlignedBB, arrayList6: AxisAlignedBB[]):  Promise<void> {
		let  axisAlignedBB7 = await this.getCollisionBoundingBoxFromPool(world1, i2, i3, i4);
		if(axisAlignedBB7 !== undefined && axisAlignedBB5.intersectsWith(axisAlignedBB7)) {
			arrayList6.push(axisAlignedBB7);
		}

	}

	public async getCollisionBoundingBoxFromPool(world1: World, i2: number, i3: number, i4: number):  Promise<AxisAlignedBB> {
		return AxisAlignedBB.getBoundingBoxFromPool(i2 as number + this.minX, i3 as number + this.minY, i4 as number + this.minZ, i2 as number + this.maxX, i3 as number + this.maxY, i4 as number + this.maxZ);
	}

	public isOpaqueCube():  boolean {
		return true;
	}

	public canCollideCheck(i1: number, z2: boolean):  boolean {
		return this.isCollidable();
	}

	public isCollidable():  boolean {
		return true;
	}

	public async updateTick(world1: World| undefined, i2: number, i3: number, i4: number, random5: Random):  Promise<void> {
	}

	public randomDisplayTick(world1: World| undefined, i2: number, i3: number, i4: number, random5: Random):  void {
	}

	public async onBlockDestroyedByPlayer(world1: World| undefined, i2: number, i3: number, i4: number, i5: number):  Promise<void> {
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: number, i3: number, i4: number, i5: number):  Promise<void> {
	}

	public tickRate():  number {
		return 10;
	}

	public async onBlockAdded(world1: World| undefined, i2: number, i3: number, i4: number):  Promise<void> {
	}

	public async onBlockRemoval(world1: World| undefined, i2: number, i3: number, i4: number):  Promise<void> {
	}

	public quantityDropped(random1: Random):  number {
		return 1;
	}

	public idDropped(i1: number, random2: Random):  number {
		return this.blockID;
	}

	public blockStrength(entityPlayer1: IEntityPlayer| undefined):  number {
		return this.blockHardness < 0.0 ? 0.0 : (!entityPlayer1.canHarvestBlock(this) ? 1.0 / this.blockHardness / 100.0 : entityPlayer1.getCurrentPlayerStrVsBlock(this) / this.blockHardness / 30.0);
	}

	public async dropBlockAsItem(world1: World| undefined, i2: number, i3: number, i4: number, i5: number):  Promise<void> {
		await this.dropBlockAsItemWithChance(world1, i2, i3, i4, i5, 1.0);
	}

	public async dropBlockAsItemWithChance(world1: World| undefined, i2: number, i3: number, i4: number, i5: number, f6: number):  Promise<void> {
		if(!world1.multiplayerWorld) {
			let  i7: number = this.quantityDropped(world1.rand);

			for(let  i8: number = 0; i8 < i7; ++i8) {
				if(world1.rand.nextFloat() <= f6) {
					let  i9: number = this.idDropped(i5, world1.rand);
					if(i9 > 0) {
						let  f10: number = 0.7;
						let  d11: number = (world1.rand.nextFloat() * f10) as number + (1.0 - f10) as number * 0.5;
						let  d13: number = (world1.rand.nextFloat() * f10) as number + (1.0 - f10) as number * 0.5;
						let  d15: number = (world1.rand.nextFloat() * f10) as number + (1.0 - f10) as number * 0.5;
						let entityItem17 = Block.entityItemCtor(world1, i2 + d11, i3 + d13, i4 + d15, Block.itemStackCtor(i9, 1, this.damageDropped(i5)));
						//let  entityItem17: EntityItem = new  EntityItem(world1, i2 as number + d11, i3 as number + d13, i4 as number + d15, new  ItemStack(i9, 1, this.damageDropped(i5)));
						entityItem17.delayBeforeCanPickup = 10;
						//crude, due to circular deps.
						await (world1 as any).entityJoinedWorld(entityItem17);
					}
				}
			}

		}
	}

	protected damageDropped(i1: number):  number {
		return 0;
	}

	public getExplosionResistance(entity1: IEntity | undefined):  number {
		return this.blockResistance / 5.0;
	}

	public async collisionRayTrace(world1: World, i2: number, i3: number, i4: number, vec3D5: Vec3D, vec3D6: Vec3D):  Promise<MovingObjectPosition | undefined> {
		this.setBlockBoundsBasedOnState(world1, i2, i3, i4);
		vec3D5 = vec3D5.addVector((-i2) as number, (-i3) as number, (-i4) as number);
		vec3D6 = vec3D6.addVector((-i2) as number, (-i3) as number, (-i4) as number);
		let  vec3D7: Vec3D | undefined = vec3D5.getIntermediateWithXValue(vec3D6, this.minX);
		let  vec3D8: Vec3D | undefined = vec3D5.getIntermediateWithXValue(vec3D6, this.maxX);
		let  vec3D9: Vec3D | undefined = vec3D5.getIntermediateWithYValue(vec3D6, this.minY);
		let  vec3D10: Vec3D | undefined = vec3D5.getIntermediateWithYValue(vec3D6, this.maxY);
		let  vec3D11: Vec3D | undefined = vec3D5.getIntermediateWithZValue(vec3D6, this.minZ);
		let  vec3D12: Vec3D | undefined = vec3D5.getIntermediateWithZValue(vec3D6, this.maxZ);
		if(!this.isVecInsideYZBounds(vec3D7)) {
			vec3D7 = undefined;
		}

		if(!this.isVecInsideYZBounds(vec3D8)) {
			vec3D8 = undefined;
		}

		if(!this.isVecInsideXZBounds(vec3D9)) {
			vec3D9 = undefined;
		}

		if(!this.isVecInsideXZBounds(vec3D10)) {
			vec3D10 = undefined;
		}

		if(!this.isVecInsideXYBounds(vec3D11)) {
			vec3D11 = undefined;
		}

		if(!this.isVecInsideXYBounds(vec3D12)) {
			vec3D12 = undefined;
		}

		let  vec3D13: Vec3D | undefined = undefined;
		if(vec3D7 !== undefined && (vec3D13 === undefined || vec3D5.distanceTo(vec3D7) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D7;
		}

		if(vec3D8 !== undefined && (vec3D13 === undefined || vec3D5.distanceTo(vec3D8) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D8;
		}

		if(vec3D9 !== undefined && (vec3D13 === undefined || vec3D5.distanceTo(vec3D9) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D9;
		}

		if(vec3D10 !== undefined && (vec3D13 === undefined || vec3D5.distanceTo(vec3D10) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D10;
		}

		if(vec3D11 !== undefined && (vec3D13 === undefined || vec3D5.distanceTo(vec3D11) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D11;
		}

		if(vec3D12 !== undefined && (vec3D13 === undefined || vec3D5.distanceTo(vec3D12) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D12;
		}

		if(vec3D13 === undefined) {
			return undefined;
		} else {
			let  b14: number = -1;
			if(vec3D13 === vec3D7) {
				b14 = 4;
			}

			if(vec3D13 === vec3D8) {
				b14 = 5;
			}

			if(vec3D13 === vec3D9) {
				b14 = 0;
			}

			if(vec3D13 === vec3D10) {
				b14 = 1;
			}

			if(vec3D13 === vec3D11) {
				b14 = 2;
			}

			if(vec3D13 === vec3D12) {
				b14 = 3;
			}

			return new  MovingObjectPosition(i2, i3, i4, b14, vec3D13.addVector(i2 as number, i3 as number, i4 as number));
		}
	}

	private isVecInsideYZBounds(vec3D1: Vec3D| undefined):  boolean {
		return vec3D1 === undefined ? false : vec3D1.yCoord >= this.minY && vec3D1.yCoord <= this.maxY && vec3D1.zCoord >= this.minZ && vec3D1.zCoord <= this.maxZ;
	}

	private isVecInsideXZBounds(vec3D1: Vec3D| undefined):  boolean {
		return vec3D1 === undefined ? false : vec3D1.xCoord >= this.minX && vec3D1.xCoord <= this.maxX && vec3D1.zCoord >= this.minZ && vec3D1.zCoord <= this.maxZ;
	}

	private isVecInsideXYBounds(vec3D1: Vec3D| undefined):  boolean {
		return vec3D1 === undefined ? false : vec3D1.xCoord >= this.minX && vec3D1.xCoord <= this.maxX && vec3D1.yCoord >= this.minY && vec3D1.yCoord <= this.maxY;
	}

	public async onBlockDestroyedByExplosion(world1: World| undefined, i2: number, i3: number, i4: number):  Promise<void> {
	}

	public getRenderBlockPass():  number {
		return 0;
	}

	public async canPlaceBlockAt(world1: World| undefined, i2: number, i3: number, i4: number):  Promise<boolean> {
		let  i5: number = await world1.getBlockId(i2, i3, i4);
		return i5 === 0 || Block.blocksList[i5].blockMaterial.getIsLiquid();
	}

	public async blockActivated(world1: World| undefined, i2: number, i3: number, i4: number, entityPlayer5: IEntityPlayer| undefined):  Promise<boolean> {
		return false;
	}

	public async onEntityWalking(world1: World| undefined, i2: number, i3: number, i4: number, entity5: IEntity | undefined):  Promise<void> {
	}

	public async onBlockPlaced(world1: World| undefined, i2: number, i3: number, i4: number, i5: number):  Promise<void> {
	}

	public async onBlockClicked(world1: World| undefined, i2: number, i3: number, i4: number, entityPlayer5: IEntityPlayer| undefined):  Promise<void> {
	}

	public velocityToAddToEntity(world1: World| undefined, i2: number, i3: number, i4: number, entity5: IEntity | undefined, vec3D6: Vec3D| undefined):  void {
	}

	public setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| undefined, i2: number, i3: number, i4: number):  void {
	}

	public async colorMultiplier(iBlockAccess1: IBlockAccess| undefined, i2: number, i3: number, i4: number):  Promise<number> {
		return 0xFFFFFF;
	}

	public async isPoweringTo(iBlockAccess1: IBlockAccess| undefined, i2: number, i3: number, i4: number, i5: number):  Promise<boolean> {
		return false;
	}

	public canProvidePower():  boolean {
		return false;
	}

	public async onEntityCollidedWithBlock(world1: World| undefined, i2: number, i3: number, i4: number, entity5: IEntity | undefined):  Promise<void> {
	}

	public async isIndirectlyPoweringTo(world1: World| undefined, i2: number, i3: number, i4: number, i5: number):  Promise<boolean> {
		return false;
	}

	public func_237_e():  void {
	}

	public async harvestBlock(world1: World| undefined, i2: number, i3: number, i4: number, i5: number):  Promise<void> {
        await this.dropBlockAsItem(world1, i2, i3, i4, i5);
	}

	public async canBlockStay(world1: World| undefined, i2: number, i3: number, i4: number):  Promise<boolean> {
		return true;
	}

	public async onBlockPlacedBy(world1: World| undefined, i2: number, i3: number, i4: number, entityLiving5: IEntityLiving| undefined):  Promise<void> {
	}

	public setBlockName(string1: string):  Block {
		this.blockName = "tile." + string1;
		return this;
	}

	public getBlockName():  string {
		return this.blockName;
	}

	public playBlock(world1: World| undefined, i2: number, i3: number, i4: number, i5: number, i6: number):  void {
	}

	// static {
	// 	Item.itemsList[Block.cloth.blockID] = (new  ItemCloth(Block.cloth.blockID - 256)).setItemName("cloth");
	// 	Item.itemsList[Block.wood.blockID] = (new  ItemLog(Block.wood.blockID - 256)).setItemName("log");

	// 	for(let  i0: number = 0; i0 < 256; ++i0) {
	// 		if(Block.blocksList[i0] !== undefined && Item.itemsList[i0] === undefined) {
	// 			Item.itemsList[i0] = new  ItemBlock(i0 - 256);
	// 		}
	// 	}
	// }
}