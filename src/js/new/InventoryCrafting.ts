
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";
import { CraftingInventoryCB } from "./CraftingInventoryCB";

export  class InventoryCrafting implements IInventory {
	private stackList:  ItemStack[] | null;
	private field_21104_b:  int;
	private eventHandler:  CraftingInventoryCB | null;

	public constructor(craftingInventoryCB1: CraftingInventoryCB| null, i2: int, i3: int) {
		let  i4: int = i2 * i3;
		this.stackList = new   Array<ItemStack>(i4);
		this.eventHandler = craftingInventoryCB1;
		this.field_21104_b = i2;
	}

	public getSizeInventory():  int {
		return this.stackList.length;
	}

	public getStackInSlot(i1: int):  ItemStack | null {
		return i1 >= this.getSizeInventory() ? null : this.stackList[i1];
	}

	public func_21103_b(i1: int, i2: int):  ItemStack | null {
		if(i1 >= 0 && i1 < this.field_21104_b) {
			let  i3: int = i1 + i2 * this.field_21104_b;
			return this.getStackInSlot(i3);
		} else {
			return null;
		}
	}

	public getInvName():  string {
		return "Crafting";
	}

	public async decrStackSize(i1: int, i2: int):  Promise<ItemStack | null> {
		if(this.stackList[i1] !== null) {
			let  itemStack3: ItemStack;
			if(this.stackList[i1].stackSize <= i2) {
				itemStack3 = this.stackList[i1];
				this.stackList[i1] = null;
				this.eventHandler.onCraftMatrixChanged(this);
				return itemStack3;
			} else {
				itemStack3 = this.stackList[i1].splitStack(i2);
				if(this.stackList[i1].stackSize === 0) {
					this.stackList[i1] = null;
				}

				this.eventHandler.onCraftMatrixChanged(this);
				return itemStack3;
			}
		} else {
			return null;
		}
	}

	public async setInventorySlotContents(i1: int, itemStack2: ItemStack| null):  Promise<void> {
		this.stackList[i1] = itemStack2;
		this.eventHandler.onCraftMatrixChanged(this);
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
