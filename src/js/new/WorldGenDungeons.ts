


import { java, int, byte } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { TileEntityMobSpawner } from "./TileEntityMobSpawner";
import { TileEntityChest } from "./TileEntityChest";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Random } from "../java/util/Random";
import { Block } from "./Block";
import { Item } from "./Item";

export  class WorldGenDungeons extends WorldGenerator {
	public async generate(world1: World| null, random2: Random| null, i3: int, i4: int, i5: int):  Promise<boolean> {
		let  b6: byte = 3;
		let  i7: int = random2.nextInt(2) + 2;
		let  i8: int = random2.nextInt(2) + 2;
		let  i9: int = 0;

		let  i10: int;
		let  i11: int;
		let  i12: int;
		for(i10 = i3 - i7 - 1; i10 <= i3 + i7 + 1; ++i10) {
			for(i11 = i4 - 1; i11 <= i4 + b6 + 1; ++i11) {
				for(i12 = i5 - i8 - 1; i12 <= i5 + i8 + 1; ++i12) {
					let  material13: Material = await world1.getBlockMaterial(i10, i11, i12);
					if(i11 === i4 - 1 && !material13.isSolid()) {
						return false;
					}

					if(i11 === i4 + b6 + 1 && !material13.isSolid()) {
						return false;
					}

					if((i10 === i3 - i7 - 1 || i10 === i3 + i7 + 1 || i12 === i5 - i8 - 1 || i12 === i5 + i8 + 1) && i11 === i4 && await world1.isAirBlock(i10, i11, i12) && await world1.isAirBlock(i10, i11 + 1, i12)) {
						++i9;
					}
				}
			}
		}

		if(i9 >= 1 && i9 <= 5) {
			for(i10 = i3 - i7 - 1; i10 <= i3 + i7 + 1; ++i10) {
				for(i11 = i4 + b6; i11 >= i4 - 1; --i11) {
					for(i12 = i5 - i8 - 1; i12 <= i5 + i8 + 1; ++i12) {
						if(i10 !== i3 - i7 - 1 && i11 !== i4 - 1 && i12 !== i5 - i8 - 1 && i10 !== i3 + i7 + 1 && i11 !== i4 + b6 + 1 && i12 !== i5 + i8 + 1) {
							await world1.setBlockWithNotify(i10, i11, i12, 0);
						} else if(i11 >= 0 && !(await world1.getBlockMaterial(i10, i11 - 1, i12)).isSolid()) {
							await world1.setBlockWithNotify(i10, i11, i12, 0);
						} else if((await world1.getBlockMaterial(i10, i11, i12)).isSolid()) {
							if(i11 === i4 - 1 && random2.nextInt(4) !== 0) {
								await world1.setBlockWithNotify(i10, i11, i12, Block.cobblestoneMossy.blockID);
							} else {
								await world1.setBlockWithNotify(i10, i11, i12, Block.cobblestone.blockID);
							}
						}
					}
				}
			}

			label110:
			for(i10 = 0; i10 < 2; ++i10) {
				for(i11 = 0; i11 < 3; ++i11) {
					i12 = i3 + random2.nextInt(i7 * 2 + 1) - i7;
					let  i14: int = i5 + random2.nextInt(i8 * 2 + 1) - i8;
					if(await world1.isAirBlock(i12, i4, i14)) {
						let  i15: int = 0;
						if((await world1.getBlockMaterial(i12 - 1, i4, i14)).isSolid()) {
							++i15;
						}

						if((await world1.getBlockMaterial(i12 + 1, i4, i14)).isSolid()) {
							++i15;
						}

						if((await world1.getBlockMaterial(i12, i4, i14 - 1)).isSolid()) {
							++i15;
						}

						if((await world1.getBlockMaterial(i12, i4, i14 + 1)).isSolid()) {
							++i15;
						}

						if(i15 === 1) {
							await world1.setBlockWithNotify(i12, i4, i14, Block.crate.blockID);
							let  tileEntityChest16: TileEntityChest = await world1.getBlockTileEntity(i12, i4, i14) as TileEntityChest;
							let  i17: int = 0;

							while(true) {
								if(i17 >= 8) {
									continue label110;
								}

								let  itemStack18: ItemStack = this.pickCheckLootItem(random2);
								if(itemStack18 !== null) {
									await tileEntityChest16.setInventorySlotContents(random2.nextInt(tileEntityChest16.getSizeInventory()), itemStack18);
								}

								++i17;
							}
						}
					}
				}
			}

			await world1.setBlockWithNotify(i3, i4, i5, Block.mobSpawner.blockID);
			let  tileEntityMobSpawner19: TileEntityMobSpawner = await world1.getBlockTileEntity(i3, i4, i5) as TileEntityMobSpawner;
			tileEntityMobSpawner19.setMobID(this.pickMobSpawner(random2));
			return true;
		} else {
			return false;
		}
	}

	private pickCheckLootItem(random1: Random| null):  ItemStack | null {
		let  i2: int = random1.nextInt(11);
		return i2 === 0 ? new  ItemStack(Item.saddle) : (i2 === 1 ? new  ItemStack(Item.ingotIron, random1.nextInt(4) + 1) : (i2 === 2 ? new  ItemStack(Item.bread) : (i2 === 3 ? new  ItemStack(Item.wheat, random1.nextInt(4) + 1) : (i2 === 4 ? new  ItemStack(Item.gunpowder, random1.nextInt(4) + 1) : (i2 === 5 ? new  ItemStack(Item.silk, random1.nextInt(4) + 1) : (i2 === 6 ? new  ItemStack(Item.bucketEmpty) : (i2 === 7 && random1.nextInt(100) === 0 ? new  ItemStack(Item.appleGold) : (i2 === 8 && random1.nextInt(2) === 0 ? new  ItemStack(Item.redstone, random1.nextInt(4) + 1) : (i2 === 9 && random1.nextInt(10) === 0 ? new  ItemStack(Item.itemsList[Item.record13.shiftedIndex + random1.nextInt(2)]) : null)))))))));
	}

	private pickMobSpawner(random1: Random| null):  string {
		let  i2: int = random1.nextInt(4);
		return i2 === 0 ? "Skeleton" : (i2 === 1 ? "Zombie" : (i2 === 2 ? "Zombie" : (i2 === 3 ? "Spider" : "")));
	}
}
