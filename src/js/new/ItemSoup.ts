
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

	public async onItemRightClick(itemStack1: ItemStack| null, world2: World| null, entityPlayer3: EntityPlayer| null):  Promise<ItemStack | null> {
		await super.onItemRightClick(itemStack1, world2, entityPlayer3);
		return new  ItemStack(Item.bowlEmpty);
	}
}
