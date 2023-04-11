import { int, java, byte, float, double, B } from "../jree/index";
import { World } from "./World";
import { TileEntityDispenser } from "./TileEntityDispenser";
import { TileEntity } from "./TileEntity";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { IBlockAccess } from "./IBlockAccess";
import { EntitySnowball } from "./EntitySnowball";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { EntityItem } from "./EntityItem";
import { EntityEgg } from "./EntityEgg";
import { EntityArrow } from "./EntityArrow";
import { BlockContainer } from "./BlockContainer";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { Random } from "../java/util/Random";
import { BlockRegistry } from './moved/BlockRegistry'
import { Block } from "./Block";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class BlockDispenser extends BlockContainer {
	public constructor(i1: int) {
		super(i1, MaterialRegistry.rock);
		this.blockIndexInTexture = 45;
	}

	public tickRate():  int {
		return 4;
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return BlockRegistry.dispenser.blockID;
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int): Promise<void> {
		await super.onBlockAdded(world1, i2, i3, i4);
		await this.setDispenserDefaultDirection(world1, i2, i3, i4);
	}

	private async setDispenserDefaultDirection(world1: World| null, i2: int, i3: int, i4: int): Promise<void> {
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
			return i5 !== i6 ? this.blockIndexInTexture : this.blockIndexInTexture + 1;
		}
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 1 ? this.blockIndexInTexture + 17 : (i1 === 0 ? this.blockIndexInTexture + 17 : (i1 === 3 ? this.blockIndexInTexture + 1 : this.blockIndexInTexture));
	}

	public async blockActivated(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null):  Promise<boolean> {
		if(world1.multiplayerWorld) {
			return true;
		} else {
			let  tileEntityDispenser6: TileEntityDispenser = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityDispenser;
			entityPlayer5.displayGUIDispenser(tileEntityDispenser6);
			return true;
		}
	}

	private async dispenseItem(world1: World| null, i2: int, i3: int, i4: int, random5: Random | null): Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		let  f9: float = 0.0;
		let  f10: float = 0.0;
		if(i6 === 3) {
			f10 = 1.0;
		} else if(i6 === 2) {
			f10 = -1.0;
		} else if(i6 === 5) {
			f9 = 1.0;
		} else {
			f9 = -1.0;
		}

		let  tileEntityDispenser11: TileEntityDispenser = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityDispenser;
		let  itemStack12: ItemStack = tileEntityDispenser11.getRandomStackFromInventory();
		let  d13: double = i2 as double + f9 as double * 0.5 + 0.5;
		let  d15: double = i3 as double + 0.5;
		let  d17: double = i4 as double + f10 as double * 0.5 + 0.5;
		if(itemStack12 === null) {
			world1.playSoundEffect(i2 as double, i3 as double, i4 as double, "random.click", 1.0, 1.2);
		} else {
			let  d20: double;
			if(itemStack12.itemID === ItemRegistry.arrow.shiftedIndex) {
				let  entityArrow19: EntityArrow = new  EntityArrow(world1, d13, d15, d17);
				entityArrow19.setArrowHeading(f9 as double, 0.1 as double, f10 as double, 1.1, 6.0);
				await world1.entityJoinedWorld(entityArrow19);
				world1.playSoundEffect(i2 as double, i3 as double, i4 as double, "random.bow", 1.0, 1.2);
			} else if(itemStack12.itemID === ItemRegistry.egg.shiftedIndex) {
				let  entityEgg34: EntityEgg = new  EntityEgg(world1, d13, d15, d17);
				entityEgg34.func_20048_a(f9 as double, 0.1 as double, f10 as double, 1.1, 6.0);
				await world1.entityJoinedWorld(entityEgg34);
				world1.playSoundEffect(i2 as double, i3 as double, i4 as double, "random.bow", 1.0, 1.2);
			} else if(itemStack12.itemID === ItemRegistry.snowball.shiftedIndex) {
				let  entitySnowball35: EntitySnowball = new  EntitySnowball(world1, d13, d15, d17);
				entitySnowball35.func_467_a(f9 as double, 0.1 as double, f10 as double, 1.1, 6.0);
				await world1.entityJoinedWorld(entitySnowball35);
				world1.playSoundEffect(i2 as double, i3 as double, i4 as double, "random.bow", 1.0, 1.2);
			} else {
				let  entityItem36: EntityItem = new  EntityItem(world1, d13, d15 - 0.3, d17, itemStack12);
				d20 = random5.nextDouble() * 0.1 + 0.2;
				entityItem36.motionX = f9 as double * d20;
				entityItem36.motionY = 0.2 as double;
				entityItem36.motionZ = f10 as double * d20;
				entityItem36.motionX += random5.nextGaussian() * 0.0075 as double * 6.0;
				entityItem36.motionY += random5.nextGaussian() * 0.0075 as double * 6.0;
				entityItem36.motionZ += random5.nextGaussian() * 0.0075 as double * 6.0;
				await world1.entityJoinedWorld(entityItem36);
				world1.playSoundEffect(i2 as double, i3 as double, i4 as double, "random.click", 1.0, 1.0);
			}

			for(let  i37: int = 0; i37 < 10; ++i37) {
				d20 = random5.nextDouble() * 0.2 + 0.01;
				let  d22: double = d13 + f9 as double * 0.01 + (random5.nextDouble() - 0.5) * f10 as double * 0.5;
				let  d24: double = d15 + (random5.nextDouble() - 0.5) * 0.5;
				let  d26: double = d17 + f10 as double * 0.01 + (random5.nextDouble() - 0.5) * f9 as double * 0.5;
				let  d28: double = f9 as double * d20 + random5.nextGaussian() * 0.01;
				let  d30: double = -0.03 + random5.nextGaussian() * 0.01;
				let  d32: double = f10 as double * d20 + random5.nextGaussian() * 0.01;
				world1.spawnParticle("smoke", d22, d24, d26, d28, d30, d32);
			}
		}

	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(i5 > 0 && Block.blocksList[i5].canProvidePower()) {
			let  z6: boolean = await world1.isBlockIndirectlyGettingPowered(i2, i3, i4) || await world1.isBlockIndirectlyGettingPowered(i2, i3 + 1, i4);
			if(z6) {
				await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
			}
		}

	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(await world1.isBlockIndirectlyGettingPowered(i2, i3, i4) || await world1.isBlockIndirectlyGettingPowered(i2, i3 + 1, i4)) {
			await this.dispenseItem(world1, i2, i3, i4, random5);
		}

	}

	protected getBlockEntity():  TileEntity | null {
		return new  TileEntityDispenser();
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
