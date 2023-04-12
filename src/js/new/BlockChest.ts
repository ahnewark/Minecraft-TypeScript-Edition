import { java, int, byte, float, double } from "../jree/index";
import { World } from "./World";
import { TileEntityChest } from "./TileEntityChest";
import { TileEntity } from "./TileEntity";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { InventoryLargeChest } from "./InventoryLargeChest";
import { IInventory } from "./IInventory";
import { IBlockAccess } from "./IBlockAccess";
import { EntityPlayer } from "./EntityPlayer";
import { EntityItem } from "./EntityItem";
import { BlockContainer } from "./BlockContainer";
import { Block } from "./Block";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";

export  class BlockChest extends BlockContainer {
	private random:  Random | null = new Random();

	public constructor(i1: int) {
		super(i1, MaterialRegistry.wood);
		this.blockIndexInTexture = 26;
	}

	public async getBlockTexture(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int): Promise<int> {
		if(i5 === 1) {
			return this.blockIndexInTexture - 1;
		} else if(i5 === 0) {
			return this.blockIndexInTexture - 1;
		} else {
			let  i6: int = await iBlockAccess1.getBlockId(i2, i3, i4 - 1);
			let  i7: int = await iBlockAccess1.getBlockId(i2, i3, i4 + 1);
			let  i8: int = await iBlockAccess1.getBlockId(i2 - 1, i3, i4);
			let  i9: int = await iBlockAccess1.getBlockId(i2 + 1, i3, i4);
			let  i10: int;
			let  i11: int;
			let  i12: int;
			let  b13: byte;
			if(i6 !== this.blockID && i7 !== this.blockID) {
				if(i8 !== this.blockID && i9 !== this.blockID) {
					let  b14: byte = 3;
					if(Block.opaqueCubeLookup[i6] && !Block.opaqueCubeLookup[i7]) {
						b14 = 3;
					}

					if(Block.opaqueCubeLookup[i7] && !Block.opaqueCubeLookup[i6]) {
						b14 = 2;
					}

					if(Block.opaqueCubeLookup[i8] && !Block.opaqueCubeLookup[i9]) {
						b14 = 5;
					}

					if(Block.opaqueCubeLookup[i9] && !Block.opaqueCubeLookup[i8]) {
						b14 = 4;
					}

					return i5 === b14 ? this.blockIndexInTexture + 1 : this.blockIndexInTexture;
				} else if(i5 !== 4 && i5 !== 5) {
					i10 = 0;
					if(i8 === this.blockID) {
						i10 = -1;
					}

					i11 = await iBlockAccess1.getBlockId(i8 === this.blockID ? i2 - 1 : i2 + 1, i3, i4 - 1);
					i12 = await iBlockAccess1.getBlockId(i8 === this.blockID ? i2 - 1 : i2 + 1, i3, i4 + 1);
					if(i5 === 3) {
						i10 = -1 - i10;
					}

					b13 = 3;
					if((Block.opaqueCubeLookup[i6] || Block.opaqueCubeLookup[i11]) && !Block.opaqueCubeLookup[i7] && !Block.opaqueCubeLookup[i12]) {
						b13 = 3;
					}

					if((Block.opaqueCubeLookup[i7] || Block.opaqueCubeLookup[i12]) && !Block.opaqueCubeLookup[i6] && !Block.opaqueCubeLookup[i11]) {
						b13 = 2;
					}

					return (i5 === b13 ? this.blockIndexInTexture + 16 : this.blockIndexInTexture + 32) + i10;
				} else {
					return this.blockIndexInTexture;
				}
			} else if(i5 !== 2 && i5 !== 3) {
				i10 = 0;
				if(i6 === this.blockID) {
					i10 = -1;
				}

				i11 = await iBlockAccess1.getBlockId(i2 - 1, i3, i6 === this.blockID ? i4 - 1 : i4 + 1);
				i12 = await iBlockAccess1.getBlockId(i2 + 1, i3, i6 === this.blockID ? i4 - 1 : i4 + 1);
				if(i5 === 4) {
					i10 = -1 - i10;
				}

				b13 = 5;
				if((Block.opaqueCubeLookup[i8] || Block.opaqueCubeLookup[i11]) && !Block.opaqueCubeLookup[i9] && !Block.opaqueCubeLookup[i12]) {
					b13 = 5;
				}

				if((Block.opaqueCubeLookup[i9] || Block.opaqueCubeLookup[i12]) && !Block.opaqueCubeLookup[i8] && !Block.opaqueCubeLookup[i11]) {
					b13 = 4;
				}

				return (i5 === b13 ? this.blockIndexInTexture + 16 : this.blockIndexInTexture + 32) + i10;
			} else {
				return this.blockIndexInTexture;
			}
		}
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 1 ? this.blockIndexInTexture - 1 : (i1 === 0 ? this.blockIndexInTexture - 1 : (i1 === 3 ? this.blockIndexInTexture + 1 : this.blockIndexInTexture));
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  i5: int = 0;
		if(await world1.getBlockId(i2 - 1, i3, i4) === this.blockID) {
			++i5;
		}

		if(await world1.getBlockId(i2 + 1, i3, i4) === this.blockID) {
			++i5;
		}

		if(await world1.getBlockId(i2, i3, i4 - 1) === this.blockID) {
			++i5;
		}

		if(await world1.getBlockId(i2, i3, i4 + 1) === this.blockID) {
			++i5;
		}

		return i5 > 1 ? false : (await this.isThereANeighborChest(world1, i2 - 1, i3, i4) ? false : (await this.isThereANeighborChest(world1, i2 + 1, i3, i4) ? false : (await this.isThereANeighborChest(world1, i2, i3, i4 - 1) ? false : !await this.isThereANeighborChest(world1, i2, i3, i4 + 1))));
	}

	private async isThereANeighborChest(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.getBlockId(i2, i3, i4) !== this.blockID ? false : (await world1.getBlockId(i2 - 1, i3, i4) === this.blockID ? true : (await world1.getBlockId(i2 + 1, i3, i4) === this.blockID ? true : (await world1.getBlockId(i2, i3, i4 - 1) === this.blockID ? true : await world1.getBlockId(i2, i3, i4 + 1) === this.blockID)));
	}

	public async onBlockRemoval(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  tileEntityChest5: TileEntityChest = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityChest;

		for(let  i6: int = 0; i6 < tileEntityChest5.getSizeInventory(); ++i6) {
			let  itemStack7: ItemStack = tileEntityChest5.getStackInSlot(i6);
			if(itemStack7 !== null) {
				let  f8: float = this.random.nextFloat() * 0.8 + 0.1;
				let  f9: float = this.random.nextFloat() * 0.8 + 0.1;
				let  f10: float = this.random.nextFloat() * 0.8 + 0.1;

				while(itemStack7.stackSize > 0) {
					let  i11: int = this.random.nextInt(21) + 10;
					if(i11 > itemStack7.stackSize) {
						i11 = itemStack7.stackSize;
					}

					itemStack7.stackSize -= i11;
					let  entityItem12: EntityItem = new  EntityItem(world1, (i2 as float + f8) as double, (i3 as float + f9) as double, (i4 as float + f10) as double, new  ItemStack(itemStack7.itemID, i11, itemStack7.getItemDamage()));
					let  f13: float = 0.05;
					entityItem12.motionX = (this.random.nextGaussian() as float * f13) as double;
					entityItem12.motionY = (this.random.nextGaussian() as float * f13 + 0.2) as double;
					entityItem12.motionZ = (this.random.nextGaussian() as float * f13) as double;
					await world1.entityJoinedWorld(entityItem12);
				}
			}
		}

		await super.onBlockRemoval(world1, i2, i3, i4);
	}

	public async blockActivated(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null): Promise<boolean> {
		let  object6: IInventory = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityChest;
		if(await world1.isBlockOpaqueCube(i2, i3 + 1, i4)) {
			return true;
		} else if(await world1.getBlockId(i2 - 1, i3, i4) === this.blockID && await world1.isBlockOpaqueCube(i2 - 1, i3 + 1, i4)) {
			return true;
		} else if(await world1.getBlockId(i2 + 1, i3, i4) === this.blockID && await world1.isBlockOpaqueCube(i2 + 1, i3 + 1, i4)) {
			return true;
		} else if(await world1.getBlockId(i2, i3, i4 - 1) === this.blockID && await world1.isBlockOpaqueCube(i2, i3 + 1, i4 - 1)) {
			return true;
		} else if(await world1.getBlockId(i2, i3, i4 + 1) === this.blockID && await world1.isBlockOpaqueCube(i2, i3 + 1, i4 + 1)) {
			return true;
		} else {
			if(await world1.getBlockId(i2 - 1, i3, i4) === this.blockID) {
				object6 = new  InventoryLargeChest("Large chest",await  world1.getBlockTileEntity(i2 - 1, i3, i4) as TileEntityChest, object6 as IInventory);
			}

			if(await world1.getBlockId(i2 + 1, i3, i4) === this.blockID) {
				object6 = new  InventoryLargeChest("Large chest", object6 as IInventory,await  world1.getBlockTileEntity(i2 + 1, i3, i4) as TileEntityChest);
			}

			if(await world1.getBlockId(i2, i3, i4 - 1) === this.blockID) {
				object6 = new  InventoryLargeChest("Large chest", await world1.getBlockTileEntity(i2, i3, i4 - 1) as TileEntityChest, object6 as IInventory);
			}

			if(await world1.getBlockId(i2, i3, i4 + 1) === this.blockID) {
				object6 = new  InventoryLargeChest("Large chest", object6 as IInventory, await world1.getBlockTileEntity(i2, i3, i4 + 1) as TileEntityChest);
			}

			if(world1.multiplayerWorld) {
				return true;
			} else {
				entityPlayer5.displayGUIChest(object6 as IInventory);
				return true;
			}
		}
	}

	protected getBlockEntity():  TileEntity | null {
		return new  TileEntityChest();
	}
}
