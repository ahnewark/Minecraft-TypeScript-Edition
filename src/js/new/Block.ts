


import { java, S } from "jree";
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
// import { BlockWorkbench } from "./BlockWorkbench";
// import { BlockTorch } from "./BlockTorch";
// import { BlockTNT } from "./BlockTNT";
import { BlockStone } from "./BlockStone";
// import { BlockStep } from "./BlockStep";
// import { BlockStationary } from "./BlockStationary";
// import { BlockStairs } from "./BlockStairs";
// import { BlockSponge } from "./BlockSponge";
// import { BlockSoil } from "./BlockSoil";
// import { BlockSnowBlock } from "./BlockSnowBlock";
// import { BlockSnow } from "./BlockSnow";
// import { BlockSlowSand } from "./BlockSlowSand";
// import { BlockSign } from "./BlockSign";
// import { BlockSapling } from "./BlockSapling";
import { BlockSandStone } from "./BlockSandStone";
// import { BlockSand } from "./BlockSand";
// import { BlockReed } from "./BlockReed";
// import { BlockRedstoneWire } from "./BlockRedstoneWire";
// import { BlockRedstoneTorch } from "./BlockRedstoneTorch";
// import { BlockRedstoneOre } from "./BlockRedstoneOre";
// import { BlockPumpkin } from "./BlockPumpkin";
// import { BlockPressurePlate } from "./BlockPressurePlate";
// import { BlockPortal } from "./BlockPortal";
import { BlockOreBlock } from "./BlockOreBlock";
// import { BlockOre } from "./BlockOre";
import { BlockObsidian } from "./BlockObsidian";
// import { BlockNote } from "./BlockNote";
// import { BlockMushroom } from "./BlockMushroom";
// import { BlockMobSpawner } from "./BlockMobSpawner";
// import { BlockMinecartTrack } from "./BlockMinecartTrack";
// import { BlockLog } from "./BlockLog";
// import { BlockLightStone } from "./BlockLightStone";
// import { BlockLever } from "./BlockLever";
// import { BlockLeaves } from "./BlockLeaves";
// import { BlockLadder } from "./BlockLadder";
// import { BlockJukeBox } from "./BlockJukeBox";
// import { BlockIce } from "./BlockIce";
// import { BlockGravel } from "./BlockGravel";
// import { BlockGrass } from "./BlockGrass";
import { BlockGlass } from "./BlockGlass";
// import { BlockFurnace } from "./BlockFurnace";
// import { BlockFlowing } from "./BlockFlowing";
// import { BlockFlower } from "./BlockFlower";
// import { BlockFire } from "./BlockFire";
// import { BlockFence } from "./BlockFence";
// import { BlockDoor } from "./BlockDoor";
// import { BlockDispenser } from "./BlockDispenser";
import { BlockDirt } from "./BlockDirt";
// import { BlockCrops } from "./BlockCrops";
import { BlockCloth } from "./BlockCloth";
// import { BlockClay } from "./BlockClay";
// import { BlockChest } from "./BlockChest";
// import { BlockCake } from "./BlockCake";
// import { BlockCactus } from "./BlockCactus";
// import { BlockButton } from "./BlockButton";
import { BlockBookshelf } from "./BlockBookshelf";
import { BlockBloodStone } from "./BlockBloodStone";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";

export class Block {
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
	public static readonly stone:  Block = (new  BlockStone(1, 1)).setHardness(1.5).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stone");
	// public static readonly grass:  BlockGrass = (new  BlockGrass(2)).setHardness(0.6).setStepSound(Block.soundGrassFootstep).setBlockName("grass") as BlockGrass;
	public static readonly dirt:  Block = (new  BlockDirt(3, 2)).setHardness(0.5).setStepSound(Block.soundGravelFootstep).setBlockName("dirt");
	public static readonly cobblestone:  Block = (new  Block(4, 16, Material.rock)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stonebrick");
	public static readonly planks:  Block = (new  Block(5, 4, Material.wood)).setHardness(2.0).setResistance(5.0).setStepSound(Block.soundWoodFootstep).setBlockName("wood");
	// public static readonly sapling:  Block = (new  BlockSapling(6, 15)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("sapling");
	public static readonly bedrock:  Block = (new  Block(7, 17, Material.rock)).setHardness(-1.0).setResistance(6000000.0).setStepSound(Block.soundStoneFootstep).setBlockName("bedrock");
	// public static readonly waterStill:  Block = (new  BlockFlowing(8, Material.water)).setHardness(100.0).setLightOpacity(3).setBlockName("water");
	// public static readonly waterMoving:  Block = (new  BlockStationary(9, Material.water)).setHardness(100.0).setLightOpacity(3).setBlockName("water");
	// public static readonly lavaStill:  Block = (new  BlockFlowing(10, Material.lava)).setHardness(0.0).setLightValue(1.0).setLightOpacity(255).setBlockName("lava");
	// public static readonly lavaMoving:  Block = (new  BlockStationary(11, Material.lava)).setHardness(100.0).setLightValue(1.0).setLightOpacity(255).setBlockName("lava");
	// public static readonly sand:  Block = (new  BlockSand(12, 18)).setHardness(0.5).setStepSound(Block.soundSandFootstep).setBlockName("sand");
	// public static readonly gravel:  Block = (new  BlockGravel(13, 19)).setHardness(0.6).setStepSound(Block.soundGravelFootstep).setBlockName("gravel");
	// public static readonly oreGold:  Block = (new  BlockOre(14, 32)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreGold");
	// public static readonly oreIron:  Block = (new  BlockOre(15, 33)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreIron");
	// public static readonly oreCoal:  Block = (new  BlockOre(16, 34)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreCoal");
	// public static readonly wood:  Block = (new  BlockLog(17)).setHardness(2.0).setStepSound(Block.soundWoodFootstep).setBlockName("log");
	// public static readonly leaves:  BlockLeaves | null = (new  BlockLeaves(18, 52)).setHardness(0.2).setLightOpacity(1).setStepSound(Block.soundGrassFootstep).setBlockName("leaves") as BlockLeaves;
	// public static readonly sponge:  Block = (new  BlockSponge(19)).setHardness(0.6).setStepSound(Block.soundGrassFootstep).setBlockName("sponge");
	public static readonly glass:  Block = (new  BlockGlass(20, 49, Material.glass, false)).setHardness(0.3).setStepSound(Block.soundGlassFootstep).setBlockName("glass");
	// public static readonly oreLapis:  Block = (new  BlockOre(21, 160)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreLapis");
	public static readonly blockLapis:  Block = (new  Block(22, 144, Material.rock)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("blockLapis");
	// public static readonly dispenser:  Block = (new  BlockDispenser(23)).setHardness(3.5).setStepSound(Block.soundStoneFootstep).setBlockName("dispenser");
	public static readonly sandStone:  Block = (new  BlockSandStone(24)).setStepSound(Block.soundStoneFootstep).setHardness(0.8).setBlockName("sandStone");
	// public static readonly musicBlock:  Block = (new  BlockNote(25)).setHardness(0.8).setBlockName("musicBlock");
	public static readonly field_9262_S:  Block | null = null;
	public static readonly field_9261_T:  Block | null = null;
	public static readonly field_9260_U:  Block | null = null;
	public static readonly field_9259_V:  Block | null = null;
	public static readonly field_9258_W:  Block | null = null;
	public static readonly field_9257_X:  Block | null = null;
	public static readonly field_9256_Y:  Block | null = null;
	public static readonly field_9255_Z:  Block | null = null;
	public static readonly field_9269_aa:  Block | null = null;
	public static readonly cloth:  Block = (new  BlockCloth()).setHardness(0.8).setStepSound(Block.soundClothFootstep).setBlockName("cloth");
	public static readonly field_9268_ac:  Block | null = null;
	// public static readonly plantYellow:  BlockFlower | null = (new  BlockFlower(37, 13)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("flower") as BlockFlower;
	// public static readonly plantRed:  BlockFlower | null = (new  BlockFlower(38, 12)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("rose") as BlockFlower;
	// public static readonly mushroomBrown:  BlockFlower | null = (new  BlockMushroom(39, 29)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setLightValue(0.125).setBlockName("mushroom") as BlockFlower;
	// public static readonly mushroomRed:  BlockFlower | null = (new  BlockMushroom(40, 28)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("mushroom") as BlockFlower;
	public static readonly blockGold:  Block = (new  BlockOreBlock(41, 23)).setHardness(3.0).setResistance(10.0).setStepSound(Block.soundMetalFootstep).setBlockName("blockGold");
	public static readonly blockSteel:  Block = (new  BlockOreBlock(42, 22)).setHardness(5.0).setResistance(10.0).setStepSound(Block.soundMetalFootstep).setBlockName("blockIron");
	// public static readonly stairDouble:  Block = (new  BlockStep(43, true)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stoneSlab");
	// public static readonly stairSingle:  Block = (new  BlockStep(44, false)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stoneSlab");
	public static readonly brick:  Block = (new  Block(45, 7, Material.rock)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("brick");
	// public static readonly tnt:  Block = (new  BlockTNT(46, 8)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("tnt");
	public static readonly bookShelf:  Block = (new  BlockBookshelf(47, 35)).setHardness(1.5).setStepSound(Block.soundWoodFootstep).setBlockName("bookshelf");
	public static readonly cobblestoneMossy:  Block = (new  Block(48, 36, Material.rock)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stoneMoss");
	public static readonly obsidian:  Block = (new  BlockObsidian(49, 37)).setHardness(10.0).setResistance(2000.0).setStepSound(Block.soundStoneFootstep).setBlockName("obsidian");
	// public static readonly torchWood:  Block = (new  BlockTorch(50, 80)).setHardness(0.0).setLightValue(0.9375).setStepSound(Block.soundWoodFootstep).setBlockName("torch");
	// public static readonly fire:  BlockFire | null = (new  BlockFire(51, 31)).setHardness(0.0).setLightValue(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("fire") as BlockFire;
	// public static readonly mobSpawner:  Block = (new  BlockMobSpawner(52, 65)).setHardness(5.0).setStepSound(Block.soundMetalFootstep).setBlockName("mobSpawner");
	// public static readonly stairCompactPlanks:  Block = (new  BlockStairs(53, Block.planks)).setBlockName("stairsWood");
	// public static readonly crate:  Block = (new  BlockChest(54)).setHardness(2.5).setStepSound(Block.soundWoodFootstep).setBlockName("chest");
	// public static readonly redstoneWire:  Block = (new  BlockRedstoneWire(55, 84)).setHardness(0.0).setStepSound(Block.soundPowderFootstep).setBlockName("redstoneDust");
	// public static readonly oreDiamond:  Block = (new  BlockOre(56, 50)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreDiamond");
	public static readonly blockDiamond:  Block = (new  BlockOreBlock(57, 24)).setHardness(5.0).setResistance(10.0).setStepSound(Block.soundMetalFootstep).setBlockName("blockDiamond");
	// public static readonly workbench:  Block = (new  BlockWorkbench(58)).setHardness(2.5).setStepSound(Block.soundWoodFootstep).setBlockName("workbench");
	// public static readonly crops:  Block = (new  BlockCrops(59, 88)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("crops");
	// public static readonly tilledField:  Block = (new  BlockSoil(60)).setHardness(0.6).setStepSound(Block.soundGravelFootstep).setBlockName("farmland");
	// public static readonly stoneOvenIdle:  Block = (new  BlockFurnace(61, false)).setHardness(3.5).setStepSound(Block.soundStoneFootstep).setBlockName("furnace");
	// public static readonly stoneOvenActive:  Block = (new  BlockFurnace(62, true)).setHardness(3.5).setStepSound(Block.soundStoneFootstep).setLightValue(0.875).setBlockName("furnace");
	// public static readonly signPost:  Block = (new  BlockSign(63, TileEntitySign.class, true)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("sign");
	// public static readonly doorWood:  Block = (new  BlockDoor(64, Material.wood)).setHardness(3.0).setStepSound(Block.soundWoodFootstep).setBlockName("doorWood");
	// public static readonly ladder:  Block = (new  BlockLadder(65, 83)).setHardness(0.4).setStepSound(Block.soundWoodFootstep).setBlockName("ladder");
	// public static readonly minecartTrack:  Block = (new  BlockMinecartTrack(66, 128)).setHardness(0.7).setStepSound(Block.soundMetalFootstep).setBlockName("rail");
	// public static readonly stairCompactCobblestone:  Block = (new  BlockStairs(67, Block.cobblestone)).setBlockName("stairsStone");
	// public static readonly signWall:  Block = (new  BlockSign(68, TileEntitySign.class, false)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("sign");
	// public static readonly lever:  Block = (new  BlockLever(69, 96)).setHardness(0.5).setStepSound(Block.soundWoodFootstep).setBlockName("lever");
	// public static readonly pressurePlateStone:  Block = (new  BlockPressurePlate(70, Block.stone.blockIndexInTexture, EnumMobType.mobs)).setHardness(0.5).setStepSound(Block.soundStoneFootstep).setBlockName("pressurePlate");
	// public static readonly doorSteel:  Block = (new  BlockDoor(71, Material.iron)).setHardness(5.0).setStepSound(Block.soundMetalFootstep).setBlockName("doorIron");
	// public static readonly pressurePlatePlanks:  Block = (new  BlockPressurePlate(72, Block.planks.blockIndexInTexture, EnumMobType.everything)).setHardness(0.5).setStepSound(Block.soundWoodFootstep).setBlockName("pressurePlate");
	// public static readonly oreRedstone:  Block = (new  BlockRedstoneOre(73, 51, false)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreRedstone");
	// public static readonly oreRedstoneGlowing:  Block = (new  BlockRedstoneOre(74, 51, true)).setLightValue(0.625).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreRedstone");
	// public static readonly torchRedstoneIdle:  Block = (new  BlockRedstoneTorch(75, 115, false)).setHardness(0.0).setStepSound(Block.soundWoodFootstep).setBlockName("notGate");
	// public static readonly torchRedstoneActive:  Block = (new  BlockRedstoneTorch(76, 99, true)).setHardness(0.0).setLightValue(0.5).setStepSound(Block.soundWoodFootstep).setBlockName("notGate");
	// public static readonly button:  Block = (new  BlockButton(77, Block.stone.blockIndexInTexture)).setHardness(0.5).setStepSound(Block.soundStoneFootstep).setBlockName("button");
	// public static readonly snow:  Block = (new  BlockSnow(78, 66)).setHardness(0.1).setStepSound(Block.soundClothFootstep).setBlockName("snow");
	// public static readonly ice:  Block = (new  BlockIce(79, 67)).setHardness(0.5).setLightOpacity(3).setStepSound(Block.soundGlassFootstep).setBlockName("ice");
	// public static readonly blockSnow:  Block = (new  BlockSnowBlock(80, 66)).setHardness(0.2).setStepSound(Block.soundClothFootstep).setBlockName("snow");
	// public static readonly cactus:  Block = (new  BlockCactus(81, 70)).setHardness(0.4).setStepSound(Block.soundClothFootstep).setBlockName("cactus");
	// public static readonly blockClay:  Block = (new  BlockClay(82, 72)).setHardness(0.6).setStepSound(Block.soundGravelFootstep).setBlockName("clay");
	// public static readonly reed:  Block = (new  BlockReed(83, 73)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("reeds");
	// public static readonly jukebox:  Block = (new  BlockJukeBox(84, 74)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("jukebox");
	// public static readonly fence:  Block = (new  BlockFence(85, 4)).setHardness(2.0).setResistance(5.0).setStepSound(Block.soundWoodFootstep).setBlockName("fence");
	// public static readonly pumpkin:  Block = (new  BlockPumpkin(86, 102, false)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("pumpkin");
	public static readonly bloodStone:  Block = (new  BlockBloodStone(87, 103)).setHardness(0.4).setStepSound(Block.soundStoneFootstep).setBlockName("hellrock");
	// public static readonly slowSand:  Block = (new  BlockSlowSand(88, 104)).setHardness(0.5).setStepSound(Block.soundSandFootstep).setBlockName("hellsand");
	// public static readonly lightStone:  Block = (new  BlockLightStone(89, 105, Material.glass)).setHardness(0.3).setStepSound(Block.soundGlassFootstep).setLightValue(1.0).setBlockName("lightgem");
	// public static readonly portal:  BlockPortal | null = (new  BlockPortal(90, 14)).setHardness(-1.0).setStepSound(Block.soundGlassFootstep).setLightValue(0.75).setBlockName("portal") as BlockPortal;
	// public static readonly pumpkinLantern:  Block = (new  BlockPumpkin(91, 102, true)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setLightValue(1.0).setBlockName("litpumpkin");
	// public static readonly cake:  Block = (new  BlockCake(92, 121)).setHardness(0.5).setStepSound(Block.soundClothFootstep).setBlockName("cake");
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

	protected constructor(i1: number, material2: Material);

	protected constructor(i1: number, i2: number, material3: Material);
    protected constructor(...args: unknown[]) {
		switch (args.length) {
			case 2: {
				const [i1, material2] = args as [number, Material];
                this.stepSound = Block.soundPowderFootstep;
                this.blockParticleGravity = 1.0;
                this.slipperiness = 0.6;
                if(Block.blocksList[i1] !== null) {
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
                if(Block.blocksList[i1] !== null) {
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


	protected setStepSound(stepSound1: StepSound):  Block {
		this.stepSound = stepSound1;
		return this;
	}

	protected setLightOpacity(i1: number):  Block {
		Block.lightOpacity[this.blockID] = i1;
		return this;
	}

	protected setLightValue(f1: number):  Block {
		Block.lightValue[this.blockID] = (15.0 * f1) as number;
		return this;
	}

	protected setResistance(f1: number):  Block {
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

	protected setHardness(f1: number):  Block {
		this.blockHardness = f1;
		if(this.blockResistance < f1 * 5.0) {
			this.blockResistance = f1 * 5.0;
		}

		return this;
	}

	protected setTickOnLoad(z1: boolean):  void {
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

	public getBlockBrightness(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number):  number {
		return iBlockAccess1.getLightBrightness(i2, i3, i4);
	}

	public shouldSideBeRendered(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number, i5: number):  boolean {
		return i5 === 0 && this.minY > 0.0 ? true : (i5 === 1 && this.maxY < 1.0 ? true : (i5 === 2 && this.minZ > 0.0 ? true : (i5 === 3 && this.maxZ < 1.0 ? true : (i5 === 4 && this.minX > 0.0 ? true : (i5 === 5 && this.maxX < 1.0 ? true : !iBlockAccess1.isBlockOpaqueCube(i2, i3, i4))))));
	}

	public getBlockTexture(iBlockAccess1: IBlockAccess, i2: number, i3: number, i4: number, i5: number):  number {
		return this.getBlockTextureFromSideAndMetadata(i5, iBlockAccess1.getBlockMetadata(i2, i3, i4));
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

	public canPlaceBlockAt(world1: World| null, i2: number, i3: number, i4: number):  boolean {
		let  i5: number = world1.getBlockId(i2, i3, i4);
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
