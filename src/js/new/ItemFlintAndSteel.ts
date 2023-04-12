
import { int, double } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";

export  class ItemFlintAndSteel extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxStackSize = 1;
		this.maxDamage = 64;
	}

	public async onItemUse(itemStack1: ItemStack| undefined, entityPlayer2: EntityPlayer| undefined, world3: World| undefined, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
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

		let  i8: int = await world3.getBlockId(i4, i5, i6);
		if(i8 === 0) {
			world3.playSoundEffect(i4 as double + 0.5, i5 as double + 0.5, i6 as double + 0.5, "fire.ignite", 1.0, Item.itemRand.nextFloat() * 0.4 + 0.8);
			await world3.setBlockWithNotify(i4, i5, i6, Block.fire.blockID);
		}

		itemStack1.damageItem(1);
		return true;
	}
}
