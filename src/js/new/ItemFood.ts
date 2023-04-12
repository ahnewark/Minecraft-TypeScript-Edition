
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";

export  class ItemFood extends Item {
	private healAmount:  int;

	public constructor(i1: int, i2: int) {
		super(i1);
		this.healAmount = i2;
		this.maxStackSize = 1;
	}

	public async onItemRightClick(itemStack1: ItemStack| null, world2: World| null, entityPlayer3: EntityPlayer| null):  Promise<ItemStack | null> {
		--itemStack1.stackSize;
		entityPlayer3.heal(this.healAmount);
		return itemStack1;
	}
}
