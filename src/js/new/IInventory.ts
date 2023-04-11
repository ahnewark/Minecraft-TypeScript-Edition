
import { int, java } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { EntityPlayer } from "./EntityPlayer";

export interface IInventory {
	 getSizeInventory(): int;
	 getStackInSlot(i1: int): ItemStack;
	 decrStackSize(i1: int, i2: int): ItemStack;
	 setInventorySlotContents(i1: int, itemStack2: ItemStack| null): void;
	 getInvName(): string;
	 getInventoryStackLimit(): int;
	 onInventoryChanged(): void;
	 canInteractWith(entityPlayer1: EntityPlayer| null): Promise<boolean>;
}
