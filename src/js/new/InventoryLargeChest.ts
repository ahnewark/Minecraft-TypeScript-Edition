import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";

export  class InventoryLargeChest implements IInventory {
	private name:  string;
	private upperChest:  IInventory | null;
	private lowerChest:  IInventory | null;

	public constructor(string1: string, iInventory2: IInventory| null, iInventory3: IInventory| null) {
		this.name = string1;
		this.upperChest = iInventory2;
		this.lowerChest = iInventory3;
	}

	public getSizeInventory():  int {
		return this.upperChest.getSizeInventory() + this.lowerChest.getSizeInventory();
	}

	public getInvName():  string {
		return this.name;
	}

	public getStackInSlot(i1: int):  ItemStack | null {
		return i1 >= this.upperChest.getSizeInventory() ? this.lowerChest.getStackInSlot(i1 - this.upperChest.getSizeInventory()) : this.upperChest.getStackInSlot(i1);
	}

	public async decrStackSize(i1: int, i2: int):  Promise<ItemStack | null> {
		return i1 >= this.upperChest.getSizeInventory() ? this.lowerChest.decrStackSize(i1 - this.upperChest.getSizeInventory(), i2) : this.upperChest.decrStackSize(i1, i2);
	}

	public async setInventorySlotContents(i1: int, itemStack2: ItemStack| null):  Promise<void> {
		if(i1 >= this.upperChest.getSizeInventory()) {
			await this.lowerChest.setInventorySlotContents(i1 - this.upperChest.getSizeInventory(), itemStack2);
		} else {
			await this.upperChest.setInventorySlotContents(i1, itemStack2);
		}

	}

	public getInventoryStackLimit():  int {
		return this.upperChest.getInventoryStackLimit();
	}

	public onInventoryChanged():  void {
		this.upperChest.onInventoryChanged();
		this.lowerChest.onInventoryChanged();
	}

	public async canInteractWith(entityPlayer1: EntityPlayer| null):  Promise<boolean> {
		return await this.upperChest.canInteractWith(entityPlayer1) && await this.lowerChest.canInteractWith(entityPlayer1);
	}
}
