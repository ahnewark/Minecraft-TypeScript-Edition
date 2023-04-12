
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";
import { CraftingInventoryCB } from "./CraftingInventoryCB";

export  class InventoryCrafting implements IInventory {
	private stackList:  ItemStack[] | undefined;
	private field_21104_b:  int;
	private eventHandler:  CraftingInventoryCB | undefined;

	public constructor(craftingInventoryCB1: CraftingInventoryCB| undefined, i2: int, i3: int) {
		let  i4: int = i2 * i3;
		this.stackList = new   Array<ItemStack>(i4);
		this.eventHandler = craftingInventoryCB1;
		this.field_21104_b = i2;
	}

	public getSizeInventory():  int {
		return this.stackList.length;
	}

	public getStackInSlot(i1: int):  ItemStack | undefined {
		return i1 >= this.getSizeInventory() ? undefined : this.stackList[i1];
	}

	public func_21103_b(i1: int, i2: int):  ItemStack | undefined {
		if(i1 >= 0 && i1 < this.field_21104_b) {
			let  i3: int = i1 + i2 * this.field_21104_b;
			return this.getStackInSlot(i3);
		} else {
			return undefined;
		}
	}

	public getInvName():  string {
		return "Crafting";
	}

	public async decrStackSize(i1: int, i2: int):  Promise<ItemStack | undefined> {
		if(this.stackList[i1] !== undefined) {
			let  itemStack3: ItemStack;
			if(this.stackList[i1].stackSize <= i2) {
				itemStack3 = this.stackList[i1];
				this.stackList[i1] = undefined;
				this.eventHandler.onCraftMatrixChanged(this);
				return itemStack3;
			} else {
				itemStack3 = this.stackList[i1].splitStack(i2);
				if(this.stackList[i1].stackSize === 0) {
					this.stackList[i1] = undefined;
				}

				this.eventHandler.onCraftMatrixChanged(this);
				return itemStack3;
			}
		} else {
			return undefined;
		}
	}

	public async setInventorySlotContents(i1: int, itemStack2: ItemStack| undefined):  Promise<void> {
		this.stackList[i1] = itemStack2;
		this.eventHandler.onCraftMatrixChanged(this);
	}

	public getInventoryStackLimit():  int {
		return 64;
	}

	public onInventoryChanged():  void {
	}

	public async canInteractWith(entityPlayer1: EntityPlayer| undefined):  Promise<boolean> {
		return true;
	}
}
