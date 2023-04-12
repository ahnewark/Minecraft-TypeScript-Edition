
import { int } from "../jree/index";
import { Slot } from "./Slot";
import { ItemStack } from "./ItemStack";
import { ItemArmor } from "./ItemArmor";
import { IInventory } from "./IInventory";
import { CraftingInventoryPlayerCB } from "./CraftingInventoryPlayerCB";
import { Block } from "./Block";

export class SlotArmor extends Slot {
	protected field_1124_c:  int;
	protected field_1123_d:  CraftingInventoryPlayerCB | undefined;

	public constructor(craftingInventoryPlayerCB1: CraftingInventoryPlayerCB| undefined, iInventory2: IInventory| undefined, i3: int, i4: int, i5: int, i6: int) {
		super(iInventory2, i3, i4, i5);
		this.field_1123_d = craftingInventoryPlayerCB1;
		this.field_1124_c = i6;
	}

	public getSlotStackLimit():  int {
		return 1;
	}

	public isItemValid(itemStack1: ItemStack| undefined):  boolean {
		return itemStack1.getItem() instanceof ItemArmor ? (itemStack1.getItem() as ItemArmor).armorType === this.field_1124_c : (itemStack1.getItem().shiftedIndex === Block.pumpkin.blockID ? this.field_1124_c === 0 : false);
	}
}
