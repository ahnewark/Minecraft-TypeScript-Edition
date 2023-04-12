
import { JavaObject, int, java } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";

export  class InventoryCraftResult extends JavaObject implements IInventory {
	private stackResult:  ItemStack[] | null = new   Array<ItemStack>(1);

	public getSizeInventory():  int {
		return 1;
	}

	public getStackInSlot(i1: int):  ItemStack | null {
		return this.stackResult[i1];
	}

	public getInvName():  string {
		return "Result";
	}

	public async decrStackSize(i1: int, i2: int):  Promise<ItemStack | null> {
		if(this.stackResult[i1] !== null) {
			let  itemStack3: ItemStack = this.stackResult[i1];
			this.stackResult[i1] = null;
			return itemStack3;
		} else {
			return null;
		}
	}

	public async setInventorySlotContents(i1: int, itemStack2: ItemStack| null):  Promise<void> {
		this.stackResult[i1] = itemStack2;
	}

	public getInventoryStackLimit():  int {
		return 64;
	}

	public onInventoryChanged():  void {
	}

	public async canInteractWith(entityPlayer1: EntityPlayer| null):  Promise<boolean> {
		return true;
	}
}
