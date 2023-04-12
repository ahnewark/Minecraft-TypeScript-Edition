


import { int, float, double } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { EntityItem } from "./EntityItem";
import { BlockFlower } from "./BlockFlower";
import { Block } from "./Block";
import { Random } from "../java/util/Random";
import { Item } from "./Item";

export  class BlockCrops extends BlockFlower {
	public constructor(i1: int, i2: int) {
		super(i1, i2);
		this.blockIndexInTexture = i2;
		this.setTickOnLoad(true);
		let  f3: float = 0.5;
		this.setBlockBounds(0.5 - f3, 0.0, 0.5 - f3, 0.5 + f3, 0.25, 0.5 + f3);
	}

	protected canThisPlantGrowOnThisBlockID(i1: int):  boolean {
		return i1 === Block.tilledField.blockID;
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null): Promise<void> {
		await super.updateTick(world1, i2, i3, i4, random5);
		if(await world1.getBlockLightValue(i2, i3 + 1, i4) >= 9) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			if(i6 < 7) {
				let  f7: float = await this.getGrowthRate(world1, i2, i3, i4);
				if(random5.nextInt((100.0 / f7) as int) === 0) {
					++i6;
					await world1.setBlockMetadataWithNotify(i2, i3, i4, i6);
				}
			}
		}

	}

	public async func_21027_c_(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		await world1.setBlockMetadataWithNotify(i2, i3, i4, 7);
	}

	private async getGrowthRate(world1: World| null, i2: int, i3: int, i4: int):  Promise<float> {
		let  f5: float = 1.0;
		let  i6: int = await world1.getBlockId(i2, i3, i4 - 1);
		let  i7: int = await world1.getBlockId(i2, i3, i4 + 1);
		let  i8: int = await world1.getBlockId(i2 - 1, i3, i4);
		let  i9: int = await world1.getBlockId(i2 + 1, i3, i4);
		let  i10: int = await world1.getBlockId(i2 - 1, i3, i4 - 1);
		let  i11: int = await world1.getBlockId(i2 + 1, i3, i4 - 1);
		let  i12: int = await world1.getBlockId(i2 + 1, i3, i4 + 1);
		let  i13: int = await world1.getBlockId(i2 - 1, i3, i4 + 1);
		let  z14: boolean = i8 === this.blockID || i9 === this.blockID;
		let  z15: boolean = i6 === this.blockID || i7 === this.blockID;
		let  z16: boolean = i10 === this.blockID || i11 === this.blockID || i12 === this.blockID || i13 === this.blockID;

		for(let  i17: int = i2 - 1; i17 <= i2 + 1; ++i17) {
			for(let  i18: int = i4 - 1; i18 <= i4 + 1; ++i18) {
				let  i19: int = await world1.getBlockId(i17, i3 - 1, i18);
				let  f20: float = 0.0;
				if(i19 === Block.tilledField.blockID) {
					f20 = 1.0;
					if(await world1.getBlockMetadata(i17, i3 - 1, i18) > 0) {
						f20 = 3.0;
					}
				}

				if(i17 !== i2 || i18 !== i4) {
					f20 /= 4.0;
				}

				f5 += f20;
			}
		}

		if(z16 || z14 && z15) {
			f5 /= 2.0;
		}

		return f5;
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		if(i2 < 0) {
			i2 = 7;
		}

		return this.blockIndexInTexture + i2;
	}

	public getRenderType():  int {
		return 6;
	}

	public async onBlockDestroyedByPlayer(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await super.onBlockDestroyedByPlayer(world1, i2, i3, i4, i5);
		if(!world1.multiplayerWorld) {
			for(let  i6: int = 0; i6 < 3; ++i6) {
				if(world1.rand.nextInt(15) <= i5) {
					let  f7: float = 0.7;
					let  f8: float = world1.rand.nextFloat() * f7 + (1.0 - f7) * 0.5;
					let  f9: float = world1.rand.nextFloat() * f7 + (1.0 - f7) * 0.5;
					let  f10: float = world1.rand.nextFloat() * f7 + (1.0 - f7) * 0.5;
					let  entityItem11: EntityItem = new  EntityItem(world1, (i2 as float + f8) as double, (i3 as float + f9) as double, (i4 as float + f10) as double, new  ItemStack(Item.seeds));
					entityItem11.delayBeforeCanPickup = 10;
					await world1.entityJoinedWorld(entityItem11);
				}
			}
		}

	}

	public idDropped(i1: int, random2: Random| null):  int {
		return i1 === 7 ? Item.wheat.shiftedIndex : -1;
	}

	public quantityDropped(random1: Random| null):  int {
		return 1;
	}
}
