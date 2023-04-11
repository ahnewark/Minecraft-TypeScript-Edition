


import { int, java, byte, float, double } from "../jree/index";
import { World } from "./World";
import { TileEntityFurnace } from "./TileEntityFurnace";
import { TileEntity } from "./TileEntity";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { BlockContainer } from "./BlockContainer";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { BlockRegistry } from "./moved/BlockRegistry";
import { Block } from "./index";
import { Random } from "../java/util/Random";




export  class BlockFurnace extends BlockContainer {
	private readonly isActive:  boolean;

	public constructor(i1: int, z2: boolean) {
		super(i1, MaterialRegistry.rock);
		this.isActive = z2;
		this.blockIndexInTexture = 45;
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return BlockRegistry.stoneOvenIdle.blockID;
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		super.onBlockAdded(world1, i2, i3, i4);
		this.setDefaultDirection(world1, i2, i3, i4);
	}

	private async setDefaultDirection(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await world1.getBlockId(i2, i3, i4 - 1);
		let  i6: int = await world1.getBlockId(i2, i3, i4 + 1);
		let  i7: int = await world1.getBlockId(i2 - 1, i3, i4);
		let  i8: int = await world1.getBlockId(i2 + 1, i3, i4);
		let  b9: byte = 3;
		if(Block.opaqueCubeLookup[i5] && !Block.opaqueCubeLookup[i6]) {
			b9 = 3;
		}

		if(Block.opaqueCubeLookup[i6] && !Block.opaqueCubeLookup[i5]) {
			b9 = 2;
		}

		if(Block.opaqueCubeLookup[i7] && !Block.opaqueCubeLookup[i8]) {
			b9 = 5;
		}

		if(Block.opaqueCubeLookup[i8] && !Block.opaqueCubeLookup[i7]) {
			b9 = 4;
		}

		await world1.setBlockMetadataWithNotify(i2, i3, i4, b9);
	}

	public async getBlockTexture(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int): Promise<int> {
		if(i5 === 1) {
			return this.blockIndexInTexture + 17;
		} else if(i5 === 0) {
			return this.blockIndexInTexture + 17;
		} else {
			let  i6: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
			return i5 !== i6 ? this.blockIndexInTexture : (this.isActive ? this.blockIndexInTexture + 16 : this.blockIndexInTexture - 1);
		}
	}

	public async randomDisplayTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null): Promise<void> {
		if(this.isActive) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			let  f7: float = i2 as float + 0.5;
			let  f8: float = i3 as float + 0.0 + random5.nextFloat() * 6.0 / 16.0;
			let  f9: float = i4 as float + 0.5;
			let  f10: float = 0.52;
			let  f11: float = random5.nextFloat() * 0.6 - 0.3;
			if(i6 === 4) {
				world1.spawnParticle("smoke", (f7 - f10) as double, f8 as double, (f9 + f11) as double, 0.0, 0.0, 0.0);
				world1.spawnParticle("flame", (f7 - f10) as double, f8 as double, (f9 + f11) as double, 0.0, 0.0, 0.0);
			} else if(i6 === 5) {
				world1.spawnParticle("smoke", (f7 + f10) as double, f8 as double, (f9 + f11) as double, 0.0, 0.0, 0.0);
				world1.spawnParticle("flame", (f7 + f10) as double, f8 as double, (f9 + f11) as double, 0.0, 0.0, 0.0);
			} else if(i6 === 2) {
				world1.spawnParticle("smoke", (f7 + f11) as double, f8 as double, (f9 - f10) as double, 0.0, 0.0, 0.0);
				world1.spawnParticle("flame", (f7 + f11) as double, f8 as double, (f9 - f10) as double, 0.0, 0.0, 0.0);
			} else if(i6 === 3) {
				world1.spawnParticle("smoke", (f7 + f11) as double, f8 as double, (f9 + f10) as double, 0.0, 0.0, 0.0);
				world1.spawnParticle("flame", (f7 + f11) as double, f8 as double, (f9 + f10) as double, 0.0, 0.0, 0.0);
			}

		}
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 1 ? this.blockIndexInTexture + 17 : (i1 === 0 ? this.blockIndexInTexture + 17 : (i1 === 3 ? this.blockIndexInTexture - 1 : this.blockIndexInTexture));
	}

	public async blockActivated(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null): Promise<boolean> {
		if(world1.multiplayerWorld) {
			return true;
		} else {
			let  tileEntityFurnace6: TileEntityFurnace = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityFurnace;
			entityPlayer5.displayGUIFurnace(tileEntityFurnace6);
			return true;
		}
	}

	public static async updateFurnaceBlockState(z0: boolean, world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		let  tileEntity6: TileEntity = await world1.getBlockTileEntity(i2, i3, i4);
		if(z0) {
			world1.setBlockWithNotify(i2, i3, i4, BlockRegistry.stoneOvenActive.blockID);
		} else {
			world1.setBlockWithNotify(i2, i3, i4, BlockRegistry.stoneOvenIdle.blockID);
		}

		world1.setBlockMetadataWithNotify(i2, i3, i4, i5);
		world1.setBlockTileEntity(i2, i3, i4, tileEntity6);
	}

	protected getBlockEntity():  TileEntity | null {
		return new  TileEntityFurnace();
	}

	public async onBlockPlacedBy(world1: World| null, i2: int, i3: int, i4: int, entityLiving5: EntityLiving| null):  Promise<void> {
		let  i6: int = MathHelper.floor_double((entityLiving5.rotationYaw * 4.0 / 360.0) as double + 0.5) & 3;
		if(i6 === 0) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 2);
		}

		if(i6 === 1) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 5);
		}

		if(i6 === 2) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 3);
		}

		if(i6 === 3) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 4);
		}

	}
}
