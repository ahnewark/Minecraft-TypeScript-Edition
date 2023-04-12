
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { ItemDye } from "./ItemDye";
import { ItemBlock } from "./ItemBlock";
import { BlockCloth } from "./BlockCloth";
import { Block } from "./Block";

export  class ItemCloth extends ItemBlock {
	public constructor(i1: int) {
		super(i1);
		this.setMaxDamage(0);
		this.setHasSubtypes(true);
	}

	public getIconIndex(itemStack1: ItemStack| undefined):  int {
		return Block.cloth.getBlockTextureFromSideAndMetadata(2, BlockCloth.func_21034_c(itemStack1.getItemDamage()));
	}

	public func_21012_a(i1: int):  int {
		return i1;
	}

	public getItemNameIS(itemStack1: ItemStack| undefined):  string {
		return super.getItemName() + "." + ItemDye.dyeColors[BlockCloth.func_21034_c(itemStack1.getItemDamage())];
	}
}
