import { java, int, float } from "../jree/index";
import { World } from "./World";
import { TileEntity } from "./TileEntity";
import { Material } from "./Material";
import { Item } from "./Item";
import { IBlockAccess } from "./IBlockAccess";
import { BlockContainer } from "./BlockContainer";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./index";
import { Random } from "../java/util/Random";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class BlockSign extends BlockContainer {
	private signEntityClass:  string;
	private isFreestanding:  boolean;

	public constructor(i1: int, class2: string, z3: boolean) {
		super(i1, MaterialRegistry.wood);
		this.isFreestanding = z3;
		this.blockIndexInTexture = 4;
		this.signEntityClass = class2;
		let  f4: float = 0.25;
		let  f5: float = 1.0;
		this.setBlockBounds(0.5 - f4, 0.0, 0.5 - f4, 0.5 + f4, f5, 0.5 + f4);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return null;
	}

	public async getSelectedBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int): Promise<AxisAlignedBB | null> {
		this.setBlockBoundsBasedOnState(world1, i2, i3, i4);
		return await super.getSelectedBoundingBoxFromPool(world1, i2, i3, i4);
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(!this.isFreestanding) {
			let  i5: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
			let  f6: float = 0.28125;
			let  f7: float = 0.78125;
			let  f8: float = 0.0;
			let  f9: float = 1.0;
			let  f10: float = 0.125;
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
			if(i5 === 2) {
				this.setBlockBounds(f8, f6, 1.0 - f10, f9, f7, 1.0);
			}

			if(i5 === 3) {
				this.setBlockBounds(f8, f6, 0.0, f9, f7, f10);
			}

			if(i5 === 4) {
				this.setBlockBounds(1.0 - f10, f6, f8, 1.0, f7, f9);
			}

			if(i5 === 5) {
				this.setBlockBounds(0.0, f6, f8, f10, f7, f9);
			}

		}
	}

	public getRenderType():  int {
		return -1;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	protected getBlockEntity():  TileEntity | null {
		try {
			return TileEntity.getCtor(this.signEntityClass)();
		} catch (exception2) {
			if (exception2 instanceof java.lang.Exception) {
				throw new  java.lang.RuntimeException(exception2);
			} else {
				throw exception2;
			}
		}
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return ItemRegistry.sign.shiftedIndex;
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int): Promise<void> {
		let  z6: boolean = false;
		if(this.isFreestanding) {
			if(!(await world1.getBlockMaterial(i2, i3 - 1, i4)).isSolid()) {
				z6 = true;
			}
		} else {
			let  i7: int = await world1.getBlockMetadata(i2, i3, i4);
			z6 = true;
			if(i7 === 2 && (await world1.getBlockMaterial(i2, i3, i4 + 1)).isSolid()) {
				z6 = false;
			}

			if(i7 === 3 && (await world1.getBlockMaterial(i2, i3, i4 - 1)).isSolid()) {
				z6 = false;
			}

			if(i7 === 4 && (await world1.getBlockMaterial(i2 + 1, i3, i4)).isSolid()) {
				z6 = false;
			}

			if(i7 === 5 && (await world1.getBlockMaterial(i2 - 1, i3, i4)).isSolid()) {
				z6 = false;
			}
		}

		if(z6) {
			this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

		await super.onNeighborBlockChange(world1, i2, i3, i4, i5);
	}
}
