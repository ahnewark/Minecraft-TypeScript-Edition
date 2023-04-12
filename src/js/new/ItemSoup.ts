
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { ItemFood } from "./ItemFood";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { Item } from "./Item";

export  class ItemSoup extends ItemFood {
	public constructor(i1: int, i2: int) {
		super(i1, i2);
	}

	public async onItemRightClick(itemStack1: ItemStack| undefined, world2: World| undefined, entityPlayer3: EntityPlayer| undefined):  Promise<ItemStack | undefined> {
		await super.onItemRightClick(itemStack1, world2, entityPlayer3);
		return new  ItemStack(Item.bowlEmpty);
	}
}
