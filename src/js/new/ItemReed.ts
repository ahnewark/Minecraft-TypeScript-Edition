import { int, double, float } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Block } from "./Block";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";


export  class ItemReed extends Item {
	private field_320_a:  int;

	public constructor(i1: int, block2: Block| undefined) {
		super(i1);
		this.field_320_a = block2.blockID;
	}

	public async onItemUse(itemStack1: ItemStack| undefined, entityPlayer2: EntityPlayer| undefined, world3: World| undefined, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(await world3.getBlockId(i4, i5, i6) === Block.snow.blockID) {
			i7 = 0;
		} else {
			if(i7 === 0) {
				--i5;
			}

			if(i7 === 1) {
				++i5;
			}

			if(i7 === 2) {
				--i6;
			}

			if(i7 === 3) {
				++i6;
			}

			if(i7 === 4) {
				--i4;
			}

			if(i7 === 5) {
				++i4;
			}
		}

		if(itemStack1.stackSize === 0) {
			return false;
		} else {
			if(await world3.canBlockBePlacedAt(this.field_320_a, i4, i5, i6, false)) {
				let  block8: Block = Block.blocksList[this.field_320_a];
				if(await world3.setBlockWithNotify(i4, i5, i6, this.field_320_a)) {
					await Block.blocksList[this.field_320_a].onBlockPlaced(world3, i4, i5, i6, i7);
					world3.playSoundEffect((i4 as float + 0.5) as double, (i5 as float + 0.5) as double, (i6 as float + 0.5) as double, block8.stepSound.func_1145_d(), (block8.stepSound.func_1147_b() + 1.0) / 2.0, block8.stepSound.func_1144_c() * 0.8);
					--itemStack1.stackSize;
				}
			}

			return true;
		}
	}
}
