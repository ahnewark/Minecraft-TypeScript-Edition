import { int } from "../jree/index";
import { Slot } from "./Slot";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";

export  class SlotCrafting extends Slot {
	private readonly craftMatrix:  IInventory | undefined;

	public constructor(iInventory1: IInventory| undefined, iInventory2: IInventory| undefined, i3: int, i4: int, i5: int) {
		super(iInventory2, i3, i4, i5);
		this.craftMatrix = iInventory1;
	}

	public isItemValid(itemStack1: ItemStack| undefined):  boolean {
		return false;
	}

	public async onPickupFromSlot():  Promise<void> {
		for(let  i1: int = 0; i1 < this.craftMatrix.getSizeInventory(); ++i1) {
			let  itemStack2: ItemStack = this.craftMatrix.getStackInSlot(i1);
			if(itemStack2 !== undefined) {
				await this.craftMatrix.decrStackSize(i1, 1);
				if(itemStack2.getItem().func_21014_i()) {
					await this.craftMatrix.setInventorySlotContents(i1, new  ItemStack(itemStack2.getItem().getContainerItem()));
				}
			}
		}

	}
}
