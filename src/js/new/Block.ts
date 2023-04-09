


import { java, S } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
// import { TileEntitySign } from "./TileEntitySign";
import { StepSoundStone } from "./StepSoundStone";
import { StepSoundSand } from "./StepSoundSand";
import { StepSound } from "./StepSound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { Material } from "./Material";
// TODO: Items
// import { ItemStack } from "./ItemStack";
// import { ItemLog } from "./ItemLog";
// import { ItemCloth } from "./ItemCloth";
// import { ItemBlock } from "./ItemBlock";
// import { Item } from "./Item";
import { IBlockAccess } from "./IBlockAccess";
// TODO: Entities
// import { EnumMobType } from "./EnumMobType";
// import { EntityPlayer } from "./EntityPlayer";
// import { EntityLiving } from "./EntityLiving";
// import { EntityItem } from "./EntityItem";
// import { Entity } from "./Entity";
// TODO: Blocks
// // import { BlockWorkbench } from "./BlockWorkbench";
// // import { BlockTorch } from "./BlockTorch";
// // import { BlockTNT } from "./BlockTNT";
// import { BlockStone } from "./BlockStone";
// // import { BlockStep } from "./BlockStep";
// // import { BlockStationary } from "./BlockStationary";
// // import { BlockStairs } from "./BlockStairs";
// // import { BlockSponge } from "./BlockSponge";
// // import { BlockSoil } from "./BlockSoil";
// // import { BlockSnowBlock } from "./BlockSnowBlock";
// // import { BlockSnow } from "./BlockSnow";
// // import { BlockSlowSand } from "./BlockSlowSand";
// // import { BlockSign } from "./BlockSign";
// // import { BlockSapling } from "./BlockSapling";
// import { BlockSandStone } from "./BlockSandStone";
// // import { BlockSand } from "./BlockSand";
// // import { BlockReed } from "./BlockReed";
// // import { BlockRedstoneWire } from "./BlockRedstoneWire";
// // import { BlockRedstoneTorch } from "./BlockRedstoneTorch";
// // import { BlockRedstoneOre } from "./BlockRedstoneOre";
// // import { BlockPumpkin } from "./BlockPumpkin";
// // import { BlockPressurePlate } from "./BlockPressurePlate";
// // import { BlockPortal } from "./BlockPortal";
// import { BlockOreBlock } from "./BlockOreBlock";
// // import { BlockOre } from "./BlockOre";
// import { BlockObsidian } from "./BlockObsidian";
// // import { BlockNote } from "./BlockNote";
// // import { BlockMushroom } from "./BlockMushroom";
// // import { BlockMobSpawner } from "./BlockMobSpawner";
// // import { BlockMinecartTrack } from "./BlockMinecartTrack";
// // import { BlockLog } from "./BlockLog";
// // import { BlockLightStone } from "./BlockLightStone";
// // import { BlockLever } from "./BlockLever";
// // import { BlockLeaves } from "./BlockLeaves";
// // import { BlockLadder } from "./BlockLadder";
// // import { BlockJukeBox } from "./BlockJukeBox";
// // import { BlockIce } from "./BlockIce";
// // import { BlockGravel } from "./BlockGravel";
// // import { BlockGrass } from "./BlockGrass";
// import { BlockGlass } from "./BlockGlass";
// // import { BlockFurnace } from "./BlockFurnace";
// // import { BlockFlowing } from "./BlockFlowing";
// // import { BlockFlower } from "./BlockFlower";
// // import { BlockFire } from "./BlockFire";
// // import { BlockFence } from "./BlockFence";
// // import { BlockDoor } from "./BlockDoor";
// // import { BlockDispenser } from "./BlockDispenser";
// import { BlockDirt } from "./BlockDirt";
// // import { BlockCrops } from "./BlockCrops";
// import { BlockCloth } from "./BlockCloth";
// // import { BlockClay } from "./BlockClay";
// // import { BlockChest } from "./BlockChest";
// // import { BlockCake } from "./BlockCake";
// // import { BlockCactus } from "./BlockCactus";
// // import { BlockButton } from "./BlockButton";
// import { BlockBookshelf } from "./BlockBookshelf";
// import { BlockBloodStone } from "./BlockBloodStone";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";

export class Block {
	public blockIndexInTexture:  number;
	public readonly blockID:  number;
	protected blockHardness:  number;
	protected blockResistance:  number;
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

	protected setLightOpacity(i1: number):  Block {
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

	public getSelectedBoundingBoxFromPool(world1: World| null, i2: number, i3: number, i4: number):  AxisAlignedBB | null {
		return AxisAlignedBB.getBoundingBoxFromPool(i2 as number + this.minX, i3 as number + this.minY, i4 as number + this.minZ, i2 as number + this.maxX, i3 as number + this.maxY, i4 as number + this.maxZ);
	}

	public getCollidingBoundingBoxes(world1: World, i2: number, i3: number, i4: number, axisAlignedBB5: AxisAlignedBB, arrayList6: AxisAlignedBB[]):  void {
		let  axisAlignedBB7 = this.getCollisionBoundingBoxFromPool(world1, i2, i3, i4);
		if(axisAlignedBB7 !== null && axisAlignedBB5.intersectsWith(axisAlignedBB7)) {
			arrayList6.push(axisAlignedBB7);
		}

	}

	public getCollisionBoundingBoxFromPool(world1: World, i2: number, i3: number, i4: number):  AxisAlignedBB {
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

	public updateTick(world1: World| null, i2: number, i3: number, i4: number, random5: Random):  void {
	}

	public randomDisplayTick(world1: World| null, i2: number, i3: number, i4: number, random5: Random):  void {
	}

	public onBlockDestroyedByPlayer(world1: World| null, i2: number, i3: number, i4: number, i5: number):  void {
	}

	public onNeighborBlockChange(world1: World| null, i2: number, i3: number, i4: number, i5: number):  void {
	}

	public tickRate():  number {
		return 10;
	}

	public onBlockAdded(world1: World| null, i2: number, i3: number, i4: number):  void {
	}

	public onBlockRemoval(world1: World| null, i2: number, i3: number, i4: number):  void {
	}

	public quantityDropped(random1: Random):  number {
		return 1;
	}

	public idDropped(i1: number, random2: Random):  number {
		return this.blockID;
	}

    // TODO: Entities
	// public blockStrength(entityPlayer1: EntityPlayer| null):  number {
	// 	return this.blockHardness < 0.0 ? 0.0 : (!entityPlayer1.canHarvestBlock(this) ? 1.0 / this.blockHardness / 100.0 : entityPlayer1.getCurrentPlayerStrVsBlock(this) / this.blockHardness / 30.0);
	// }

    // TODO: Entities

	// public dropBlockAsItem(world1: World| null, i2: number, i3: number, i4: number, i5: number):  void {
	// 	this.dropBlockAsItemWithChance(world1, i2, i3, i4, i5, 1.0);
	// }

	// public dropBlockAsItemWithChance(world1: World| null, i2: number, i3: number, i4: number, i5: number, f6: number):  void {
	// 	if(!world1.multiplayerWorld) {
	// 		let  i7: number = this.quantityDropped(world1.rand);

	// 		for(let  i8: number = 0; i8 < i7; ++i8) {
	// 			if(world1.rand.nextFloat() <= f6) {
	// 				let  i9: number = this.idDropped(i5, world1.rand);
	// 				if(i9 > 0) {
	// 					let  f10: number = 0.7;
	// 					let  d11: number = (world1.rand.nextFloat() * f10) as number + (1.0 - f10) as number * 0.5;
	// 					let  d13: number = (world1.rand.nextFloat() * f10) as number + (1.0 - f10) as number * 0.5;
	// 					let  d15: number = (world1.rand.nextFloat() * f10) as number + (1.0 - f10) as number * 0.5;
	// 					let  entityItem17: EntityItem = new  EntityItem(world1, i2 as number + d11, i3 as number + d13, i4 as number + d15, new  ItemStack(i9, 1, this.damageDropped(i5)));
	// 					entityItem17.delayBeforeCanPickup = 10;
	// 					world1.entityJoinedWorld(entityItem17);
	// 				}
	// 			}
	// 		}

	// 	}
	// }

	protected damageDropped(i1: number):  number {
		return 0;
	}

    // TODO: Entities
	// public getExplosionResistance(entity1: Entity| null):  number {
	// 	return this.blockResistance / 5.0;
	// }

	public collisionRayTrace(world1: World, i2: number, i3: number, i4: number, vec3D5: Vec3D, vec3D6: Vec3D):  MovingObjectPosition | null {
		this.setBlockBoundsBasedOnState(world1, i2, i3, i4);
		vec3D5 = vec3D5.addVector((-i2) as number, (-i3) as number, (-i4) as number);
		vec3D6 = vec3D6.addVector((-i2) as number, (-i3) as number, (-i4) as number);
		let  vec3D7: Vec3D | null = vec3D5.getIntermediateWithXValue(vec3D6, this.minX);
		let  vec3D8: Vec3D | null = vec3D5.getIntermediateWithXValue(vec3D6, this.maxX);
		let  vec3D9: Vec3D | null = vec3D5.getIntermediateWithYValue(vec3D6, this.minY);
		let  vec3D10: Vec3D | null = vec3D5.getIntermediateWithYValue(vec3D6, this.maxY);
		let  vec3D11: Vec3D | null = vec3D5.getIntermediateWithZValue(vec3D6, this.minZ);
		let  vec3D12: Vec3D | null = vec3D5.getIntermediateWithZValue(vec3D6, this.maxZ);
		if(!this.isVecInsideYZBounds(vec3D7)) {
			vec3D7 = null;
		}

		if(!this.isVecInsideYZBounds(vec3D8)) {
			vec3D8 = null;
		}

		if(!this.isVecInsideXZBounds(vec3D9)) {
			vec3D9 = null;
		}

		if(!this.isVecInsideXZBounds(vec3D10)) {
			vec3D10 = null;
		}

		if(!this.isVecInsideXYBounds(vec3D11)) {
			vec3D11 = null;
		}

		if(!this.isVecInsideXYBounds(vec3D12)) {
			vec3D12 = null;
		}

		let  vec3D13: Vec3D | null = null;
		if(vec3D7 !== null && (vec3D13 === null || vec3D5.distanceTo(vec3D7) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D7;
		}

		if(vec3D8 !== null && (vec3D13 === null || vec3D5.distanceTo(vec3D8) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D8;
		}

		if(vec3D9 !== null && (vec3D13 === null || vec3D5.distanceTo(vec3D9) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D9;
		}

		if(vec3D10 !== null && (vec3D13 === null || vec3D5.distanceTo(vec3D10) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D10;
		}

		if(vec3D11 !== null && (vec3D13 === null || vec3D5.distanceTo(vec3D11) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D11;
		}

		if(vec3D12 !== null && (vec3D13 === null || vec3D5.distanceTo(vec3D12) < vec3D5.distanceTo(vec3D13))) {
			vec3D13 = vec3D12;
		}

		if(vec3D13 === null) {
			return null;
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

	private isVecInsideYZBounds(vec3D1: Vec3D| null):  boolean {
		return vec3D1 === null ? false : vec3D1.yCoord >= this.minY && vec3D1.yCoord <= this.maxY && vec3D1.zCoord >= this.minZ && vec3D1.zCoord <= this.maxZ;
	}

	private isVecInsideXZBounds(vec3D1: Vec3D| null):  boolean {
		return vec3D1 === null ? false : vec3D1.xCoord >= this.minX && vec3D1.xCoord <= this.maxX && vec3D1.zCoord >= this.minZ && vec3D1.zCoord <= this.maxZ;
	}

	private isVecInsideXYBounds(vec3D1: Vec3D| null):  boolean {
		return vec3D1 === null ? false : vec3D1.xCoord >= this.minX && vec3D1.xCoord <= this.maxX && vec3D1.yCoord >= this.minY && vec3D1.yCoord <= this.maxY;
	}

	public onBlockDestroyedByExplosion(world1: World| null, i2: number, i3: number, i4: number):  void {
	}

	public getRenderBlockPass():  number {
		return 0;
	}

	public async canPlaceBlockAt(world1: World| null, i2: number, i3: number, i4: number):  Promise<boolean> {
		let  i5: number = await world1.getBlockId(i2, i3, i4);
		return i5 === 0 || Block.blocksList[i5].blockMaterial.getIsLiquid();
	}

    // TODO: ENtities
	// public blockActivated(world1: World| null, i2: number, i3: number, i4: number, entityPlayer5: EntityPlayer| null):  boolean {
	// 	return false;
	// }

	// public onEntityWalking(world1: World| null, i2: number, i3: number, i4: number, entity5: Entity| null):  void {
	// }

	public onBlockPlaced(world1: World| null, i2: number, i3: number, i4: number, i5: number):  void {
	}

    // TODO: ENtities
	// public onBlockClicked(world1: World| null, i2: number, i3: number, i4: number, entityPlayer5: EntityPlayer| null):  void {
	// }

	// public velocityToAddToEntity(world1: World| null, i2: number, i3: number, i4: number, entity5: Entity| null, vec3D6: Vec3D| null):  void {
	// }

	public setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| null, i2: number, i3: number, i4: number):  void {
	}

	public colorMultiplier(iBlockAccess1: IBlockAccess| null, i2: number, i3: number, i4: number):  number {
		return 0xFFFFFF;
	}

	public isPoweringTo(iBlockAccess1: IBlockAccess| null, i2: number, i3: number, i4: number, i5: number):  boolean {
		return false;
	}

	public canProvidePower():  boolean {
		return false;
	}

    // TODO: ENtities
	// public onEntityCollidedWithBlock(world1: World| null, i2: number, i3: number, i4: number, entity5: Entity| null):  void {
	// }

	public isIndirectlyPoweringTo(world1: World| null, i2: number, i3: number, i4: number, i5: number):  boolean {
		return false;
	}

	public func_237_e():  void {
	}

	public harvestBlock(world1: World| null, i2: number, i3: number, i4: number, i5: number):  void {
		// TODO: ENtities
        //this.dropBlockAsItem(world1, i2, i3, i4, i5);
	}

	public canBlockStay(world1: World| null, i2: number, i3: number, i4: number):  boolean {
		return true;
	}

    // TODO: Entities
	// public onBlockPlacedBy(world1: World| null, i2: number, i3: number, i4: number, entityLiving5: EntityLiving| null):  void {
	// }

	public setBlockName(string1: string):  Block {
		this.blockName = "tile." + string1;
		return this;
	}

	public getBlockName():  string {
		return this.blockName;
	}

	public playBlock(world1: World| null, i2: number, i3: number, i4: number, i5: number, i6: number):  void {
	}

	static {
        // TODO: Items
		// Item.itemsList[Block.cloth.blockID] = (new  ItemCloth(Block.cloth.blockID - 256)).setItemName("cloth");
		// Item.itemsList[Block.wood.blockID] = (new  ItemLog(Block.wood.blockID - 256)).setItemName("log");

		// for(let  i0: number = 0; i0 < 256; ++i0) {
		// 	if(Block.blocksList[i0] !== null && Item.itemsList[i0] === null) {
		// 		Item.itemsList[i0] = new  ItemBlock(i0 - 256);
		// 	}
		// }

	}
}