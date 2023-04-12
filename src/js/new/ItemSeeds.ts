
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";

export  class ItemSeeds extends Item {
	private field_318_a:  int;

	public constructor(i1: int, i2: int) {
		super(i1);
		this.field_318_a = i2;
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(i7 !== 1) {
			return false;
		} else {
			let  i8: int = await world3.getBlockId(i4, i5, i6);
			if(i8 === Block.tilledField.blockID && await world3.isAirBlock(i4, i5 + 1, i6)) {
				await world3.setBlockWithNotify(i4, i5 + 1, i6, this.field_318_a);
				--itemStack1.stackSize;
				return true;
			} else {
				return false;
			}
		}
	}
}
