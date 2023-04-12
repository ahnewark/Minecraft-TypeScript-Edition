
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";

export  class ItemCoal extends Item {
	public constructor(i1: int) {
		super(i1);
		this.setHasSubtypes(true);
		this.setMaxDamage(0);
	}

	public getItemNameIS(itemStack1: ItemStack| null):  string {
		return itemStack1.getItemDamage() === 1 ? "item.charcoal" : "item.coal";
	}
}
