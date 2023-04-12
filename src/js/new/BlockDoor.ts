import { int, float, java, double } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { Material } from "./Material";
import { Item } from "./Item";
import { IBlockAccess } from "./IBlockAccess";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { Random } from "../java/util/Random";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class BlockDoor extends Block {
	public constructor(i1: int, material2: Material| null) {
		super(i1, material2);
		this.blockIndexInTexture = 97;
		if(material2 === MaterialRegistry.iron) {
			++this.blockIndexInTexture;
		}

		let  f3: float = 0.5;
		let  f4: float = 1.0;
		this.setBlockBounds(0.5 - f3, 0.0, 0.5 - f3, 0.5 + f3, f4, 0.5 + f3);
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		if(i1 !== 0 && i1 !== 1) {
			let  i3: int = this.func_312_c(i2);
			// I have no idea how this is supposed to look, will need debugging.
			if(((i3 === 0 || i3 === 2) ? 1 : 0) ^ (i1 <= 3 ? 1 : 0)) {
				return this.blockIndexInTexture;
			} else {
				let  i4: int = i3 / 2 + (i1 & 1 ^ i3);
				i4 += (i2 & 4) / 4;
				let  i5: int = this.blockIndexInTexture - (i2 & 8) * 2;
				if((i4 & 1) !== 0) {
					i5 = -i5;
				}

				return i5;
			}
		} else {
			return this.blockIndexInTexture;
		}
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 7;
	}

	public async getSelectedBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		this.setBlockBoundsBasedOnState(world1, i2, i3, i4);
		return await super.getSelectedBoundingBoxFromPool(world1, i2, i3, i4);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		this.setBlockBoundsBasedOnState(world1, i2, i3, i4);
		return await super.getCollisionBoundingBoxFromPool(world1, i2, i3, i4);
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<void> {
		this.func_313_b(this.func_312_c(await iBlockAccess1.getBlockMetadata(i2, i3, i4)));
	}

	public func_313_b(i1: int):  void {
		let  f2: float = 0.1875;
		this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 2.0, 1.0);
		if(i1 === 0) {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, f2);
		}

		if(i1 === 1) {
			this.setBlockBounds(1.0 - f2, 0.0, 0.0, 1.0, 1.0, 1.0);
		}

		if(i1 === 2) {
			this.setBlockBounds(0.0, 0.0, 1.0 - f2, 1.0, 1.0, 1.0);
		}

		if(i1 === 3) {
			this.setBlockBounds(0.0, 0.0, 0.0, f2, 1.0, 1.0);
		}

	}

	public async onBlockClicked(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null):  Promise<void> {
		await this.blockActivated(world1, i2, i3, i4, entityPlayer5);
	}

	public async blockActivated(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null):  Promise<boolean> {
		if(this.blockMaterial === MaterialRegistry.iron) {
			return true;
		} else {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			if((i6 & 8) !== 0) {
				if(await world1.getBlockId(i2, i3 - 1, i4) === this.blockID) {
					await this.blockActivated(world1, i2, i3 - 1, i4, entityPlayer5);
				}

				return true;
			} else {
				if(await world1.getBlockId(i2, i3 + 1, i4) === this.blockID) {
					await world1.setBlockMetadataWithNotify(i2, i3 + 1, i4, (i6 ^ 4) + 8);
				}

				await world1.setBlockMetadataWithNotify(i2, i3, i4, i6 ^ 4);
				world1.markBlocksDirty(i2, i3 - 1, i4, i2, i3, i4);
				if(java.lang.Math.random() < 0.5) {
					world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "random.door_open", 1.0, world1.rand.nextFloat() * 0.1 + 0.9);
				} else {
					world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "random.door_close", 1.0, world1.rand.nextFloat() * 0.1 + 0.9);
				}

				return true;
			}
		}
	}

	public async func_311_a(world1: World| null, i2: int, i3: int, i4: int, z5: boolean):  Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		if((i6 & 8) !== 0) {
			if(await world1.getBlockId(i2, i3 - 1, i4) === this.blockID) {
				await this.func_311_a(world1, i2, i3 - 1, i4, z5);
			}

		} else {
			let  z7: boolean = (await world1.getBlockMetadata(i2, i3, i4) & 4) > 0;
			if(z7 !== z5) {
				if(await world1.getBlockId(i2, i3 + 1, i4) === this.blockID) {
					await world1.setBlockMetadataWithNotify(i2, i3 + 1, i4, (i6 ^ 4) + 8);
				}

				await world1.setBlockMetadataWithNotify(i2, i3, i4, i6 ^ 4);
				world1.markBlocksDirty(i2, i3 - 1, i4, i2, i3, i4);
				if(java.lang.Math.random() < 0.5) {
					world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "random.door_open", 1.0, world1.rand.nextFloat() * 0.1 + 0.9);
				} else {
					world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "random.door_close", 1.0, world1.rand.nextFloat() * 0.1 + 0.9);
				}

			}
		}
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		if((i6 & 8) !== 0) {
			if(await world1.getBlockId(i2, i3 - 1, i4) !== this.blockID) {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			}

			if(i5 > 0 && Block.blocksList[i5].canProvidePower()) {
				await this.onNeighborBlockChange(world1, i2, i3 - 1, i4, i5);
			}
		} else {
			let  z7: boolean = false;
			if(await world1.getBlockId(i2, i3 + 1, i4) !== this.blockID) {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
				z7 = true;
				if(await world1.getBlockId(i2, i3 + 1, i4) === this.blockID) {
					await world1.setBlockWithNotify(i2, i3 + 1, i4, 0);
				}
			}

			if(z7) {
				this.dropBlockAsItem(world1, i2, i3, i4, i6);
			} else if(i5 > 0 && Block.blocksList[i5].canProvidePower()) {
				let  z8: boolean = await world1.isBlockIndirectlyGettingPowered(i2, i3, i4) || await world1.isBlockIndirectlyGettingPowered(i2, i3 + 1, i4);
				await this.func_311_a(world1, i2, i3, i4, z8);
			}
		}

	}

	public idDropped(i1: int, random2: Random| null):  int {
		return (i1 & 8) !== 0 ? 0 : (this.blockMaterial === MaterialRegistry.iron ? ItemRegistry.doorSteel.shiftedIndex : ItemRegistry.doorWood.shiftedIndex);
	}

	public async collisionRayTrace(world1: World| null, i2: int, i3: int, i4: int, vec3D5: Vec3D| null, vec3D6: Vec3D| null):  Promise<MovingObjectPosition | null> {
		await this.setBlockBoundsBasedOnState(world1, i2, i3, i4);
		return await super.collisionRayTrace(world1, i2, i3, i4, vec3D5, vec3D6);
	}

	public func_312_c(i1: int):  int {
		return (i1 & 4) === 0 ? i1 - 1 & 3 : i1 & 3;
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return i3 >= 127 ? false : await world1.isBlockOpaqueCube(i2, i3 - 1, i4) && await super.canPlaceBlockAt(world1, i2, i3, i4) && await super.canPlaceBlockAt(world1, i2, i3 + 1, i4);
	}
}
