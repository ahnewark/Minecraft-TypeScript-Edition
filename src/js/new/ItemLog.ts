
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { ItemBlock } from "./ItemBlock";
import { Item } from "./Item";
import { Block } from "./Block";

export  class ItemLog extends ItemBlock {
	public constructor(i1: int) {
		super(i1);
		this.setMaxDamage(0);
		this.setHasSubtypes(true);
	}

	public getIconIndex(itemStack1: ItemStack| undefined):  int {
		return Block.wood.getBlockTextureFromSideAndMetadata(2, itemStack1.getItemDamage());
	}

	public func_21012_a(i1: int):  int {
		return i1;
	}
}
