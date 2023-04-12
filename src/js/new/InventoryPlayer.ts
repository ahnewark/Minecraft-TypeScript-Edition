
import { int, float, byte } from "../jree/index";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { ItemArmor } from "./ItemArmor";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";
import { Entity } from "./Entity";
import { Block } from "./Block";

import { MaterialRegistry } from './static/MaterialRegistry';
import { ItemStack } from "./ItemStack";

export  class InventoryPlayer implements IInventory {
	public mainInventory:  ItemStack[] | undefined = new   Array<ItemStack>(36);
	public armorInventory:  ItemStack[] | undefined = new   Array<ItemStack>(4);
	public currentItem:  int = 0;
	private player:  EntityPlayer | undefined;
	private itemStack:  ItemStack | undefined;
	public inventoryChanged:  boolean = false;

	public constructor(entityPlayer1: EntityPlayer| undefined) {
		this.player = entityPlayer1;
	}

	public getCurrentItem():  ItemStack | undefined {
		return this.mainInventory[this.currentItem];
	}

	private getInventorySlotContainItem(i1: int):  int {
		for(let  i2: int = 0; i2 < this.mainInventory.length; ++i2) {
			if(this.mainInventory[i2] !== undefined && this.mainInventory[i2].itemID === i1) {
				return i2;
			}
		}

		return -1;
	}

	private func_21105_c(itemStack1: ItemStack| undefined):  int {
		for(let  i2: int = 0; i2 < this.mainInventory.length; ++i2) {
			if(this.mainInventory[i2] !== undefined && this.mainInventory[i2].itemID === itemStack1.itemID && this.mainInventory[i2].func_21180_d() && this.mainInventory[i2].stackSize < this.mainInventory[i2].getMaxStackSize() && this.mainInventory[i2].stackSize < this.getInventoryStackLimit() && (!this.mainInventory[i2].getHasSubtypes() || this.mainInventory[i2].getItemDamage() === itemStack1.getItemDamage())) {
				return i2;
			}
		}

		return -1;
	}

	private getFirstEmptyStack():  int {
		for(let  i1: int = 0; i1 < this.mainInventory.length; ++i1) {
			if(this.mainInventory[i1] === undefined) {
				return i1;
			}
		}

		return -1;
	}

	public setCurrentItem(i1: int, z2: boolean):  void {
		let  i3: int = this.getInventorySlotContainItem(i1);
		if(i3 >= 0 && i3 < 9) {
			this.currentItem = i3;
		}
	}

	public changeCurrentItem(i1: int):  void {
		if(i1 > 0) {
			i1 = 1;
		}

		if(i1 < 0) {
			i1 = -1;
		}

		for(this.currentItem -= i1; this.currentItem < 0; this.currentItem += 9) {
		}

		while(this.currentItem >= 9) {
			this.currentItem -= 9;
		}

	}

	private func_21106_d(itemStack1: ItemStack| undefined):  int {
		let  i2: int = itemStack1.itemID;
		let  i3: int = itemStack1.stackSize;
		let  i4: int = this.func_21105_c(itemStack1);
		if(i4 < 0) {
			i4 = this.getFirstEmptyStack();
		}

		if(i4 < 0) {
			return i3;
		} else {
			if(this.mainInventory[i4] === undefined) {
				this.mainInventory[i4] = new  ItemStack(i2, 0, itemStack1.getItemDamage());
			}

			let  i5: int = i3;
			if(i3 > this.mainInventory[i4].getMaxStackSize() - this.mainInventory[i4].stackSize) {
				i5 = this.mainInventory[i4].getMaxStackSize() - this.mainInventory[i4].stackSize;
			}

			if(i5 > this.getInventoryStackLimit() - this.mainInventory[i4].stackSize) {
				i5 = this.getInventoryStackLimit() - this.mainInventory[i4].stackSize;
			}

			if(i5 === 0) {
				return i3;
			} else {
				i3 -= i5;
				this.mainInventory[i4].stackSize += i5;
				this.mainInventory[i4].animationsToGo = 5;
				return i3;
			}
		}
	}

	public decrementAnimations():  void {
		for(let  i1: int = 0; i1 < this.mainInventory.length; ++i1) {
			if(this.mainInventory[i1] !== undefined && this.mainInventory[i1].animationsToGo > 0) {
				--this.mainInventory[i1].animationsToGo;
			}
		}

	}

	public consumeInventoryItem(i1: int):  boolean {
		let  i2: int = this.getInventorySlotContainItem(i1);
		if(i2 < 0) {
			return false;
		} else {
			if(--this.mainInventory[i2].stackSize <= 0) {
				this.mainInventory[i2] = undefined;
			}

			return true;
		}
	}

	public addItemStackToInventory(itemStack1: ItemStack| undefined):  boolean {
		if(!itemStack1.isItemDamaged()) {
			itemStack1.stackSize = this.func_21106_d(itemStack1);
			if(itemStack1.stackSize === 0) {
				return true;
			}
		}

		let  i2: int = this.getFirstEmptyStack();
		if(i2 >= 0) {
			this.mainInventory[i2] = itemStack1;
			this.mainInventory[i2].animationsToGo = 5;
			return true;
		} else {
			return false;
		}
	}

	public async decrStackSize(i1: int, i2: int):  Promise<ItemStack | undefined> {
		let  itemStack3: ItemStack[] = this.mainInventory;
		if(i1 >= this.mainInventory.length) {
			itemStack3 = this.armorInventory;
			i1 -= this.mainInventory.length;
		}

		if(itemStack3[i1] !== undefined) {
			let  itemStack4: ItemStack;
			if(itemStack3[i1].stackSize <= i2) {
				itemStack4 = itemStack3[i1];
				itemStack3[i1] = undefined;
				return itemStack4;
			} else {
				itemStack4 = itemStack3[i1].splitStack(i2);
				if(itemStack3[i1].stackSize === 0) {
					itemStack3[i1] = undefined;
				}

				return itemStack4;
			}
		} else {
			return undefined;
		}
	}

	public async setInventorySlotContents(i1: int, itemStack2: ItemStack| undefined):  Promise<void> {
		let  itemStack3: ItemStack[] = this.mainInventory;
		if(i1 >= itemStack3.length) {
			i1 -= itemStack3.length;
			itemStack3 = this.armorInventory;
		}

		itemStack3[i1] = itemStack2;
	}

	public getStrVsBlock(block1: Block | undefined):  float {
		let  f2: float = 1.0;
		if(this.mainInventory[this.currentItem] !== undefined) {
			f2 *= this.mainInventory[this.currentItem].getStrVsBlock(block1);
		}

		return f2;
	}

	public writeToNBT(nBTTagList1: NBTTagList| undefined):  NBTTagList | undefined {
		let  i2: int;
		let  nBTTagCompound3: NBTTagCompound;
		for(i2 = 0; i2 < this.mainInventory.length; ++i2) {
			if(this.mainInventory[i2] !== undefined) {
				nBTTagCompound3 = new  NBTTagCompound();
				nBTTagCompound3.setByte("Slot", i2 as byte);
				this.mainInventory[i2].writeToNBT(nBTTagCompound3);
				nBTTagList1.setTag(nBTTagCompound3);
			}
		}

		for(i2 = 0; i2 < this.armorInventory.length; ++i2) {
			if(this.armorInventory[i2] !== undefined) {
				nBTTagCompound3 = new  NBTTagCompound();
				nBTTagCompound3.setByte("Slot", (i2 + 100) as byte);
				this.armorInventory[i2].writeToNBT(nBTTagCompound3);
				nBTTagList1.setTag(nBTTagCompound3);
			}
		}

		return nBTTagList1;
	}

	public readFromNBT(nBTTagList1: NBTTagList| undefined):  void {
		this.mainInventory = new   Array<ItemStack>(36);
		this.armorInventory = new   Array<ItemStack>(4);

		for(let  i2: int = 0; i2 < nBTTagList1.tagCount(); ++i2) {
			let  nBTTagCompound3: NBTTagCompound = nBTTagList1.tagAt(i2) as NBTTagCompound;
			let  i4: int = nBTTagCompound3.getByte("Slot") & 255;
			let  itemStack5: ItemStack = new  ItemStack(nBTTagCompound3);
			if(itemStack5.getItem() !== undefined) {
				if(i4 >= 0 && i4 < this.mainInventory.length) {
					this.mainInventory[i4] = itemStack5;
				}

				if(i4 >= 100 && i4 < this.armorInventory.length + 100) {
					this.armorInventory[i4 - 100] = itemStack5;
				}
			}
		}

	}

	public getSizeInventory():  int {
		return this.mainInventory.length + 4;
	}

	public getStackInSlot(i1: int):  ItemStack | undefined {
		let  itemStack2: ItemStack[] = this.mainInventory;
		if(i1 >= itemStack2.length) {
			i1 -= itemStack2.length;
			itemStack2 = this.armorInventory;
		}

		return itemStack2[i1];
	}

	public getInvName():  string {
		return "Inventory";
	}

	public getInventoryStackLimit():  int {
		return 64;
	}

	public getDamageVsEntity(entity1: Entity| undefined):  int {
		let  itemStack2: ItemStack = this.getStackInSlot(this.currentItem);
		return itemStack2 !== undefined ? itemStack2.getDamageVsEntity(entity1) : 1;
	}

	public canHarvestBlock(block1: Block| undefined):  boolean {
		if(block1.blockMaterial !== MaterialRegistry.rock && block1.blockMaterial !== MaterialRegistry.iron && block1.blockMaterial !== MaterialRegistry.builtSnow && block1.blockMaterial !== MaterialRegistry.snow) {
			return true;
		} else {
			let  itemStack2: ItemStack = this.getStackInSlot(this.currentItem);
			return itemStack2 !== undefined ? itemStack2.canHarvestBlock(block1) : false;
		}
	}

	public armorItemInSlot(i1: int):  ItemStack | undefined {
		return this.armorInventory[i1];
	}

	public getTotalArmorValue():  int {
		let  i1: int = 0;
		let  i2: int = 0;
		let  i3: int = 0;

		for(let  i4: int = 0; i4 < this.armorInventory.length; ++i4) {
			if(this.armorInventory[i4] !== undefined && this.armorInventory[i4].getItem() instanceof ItemArmor) {
				let  i5: int = this.armorInventory[i4].getMaxDamage();
				let  i6: int = this.armorInventory[i4].getItemDamageForDisplay();
				let  i7: int = i5 - i6;
				i2 += i7;
				i3 += i5;
				let  i8: int = (this.armorInventory[i4].getItem() as ItemArmor).damageReduceAmount;
				i1 += i8;
			}
		}

		if(i3 === 0) {
			return 0;
		} else {
			return (i1 - 1) * i2 / i3 + 1;
		}
	}

	public damageArmor(i1: int):  void {
		for(let  i2: int = 0; i2 < this.armorInventory.length; ++i2) {
			if(this.armorInventory[i2] !== undefined && this.armorInventory[i2].getItem() instanceof ItemArmor) {
				this.armorInventory[i2].damageItem(i1);
				if(this.armorInventory[i2].stackSize === 0) {
					this.armorInventory[i2].func_1097_a(this.player);
					this.armorInventory[i2] = undefined;
				}
			}
		}

	}

	public async dropAllItems():  Promise<void> {
		let  i1: int;
		for(i1 = 0; i1 < this.mainInventory.length; ++i1) {
			if(this.mainInventory[i1] !== undefined) {
				await this.player.dropPlayerItemWithRandomChoice(this.mainInventory[i1], true);
				this.mainInventory[i1] = undefined;
			}
		}

		for(i1 = 0; i1 < this.armorInventory.length; ++i1) {
			if(this.armorInventory[i1] !== undefined) {
				await this.player.dropPlayerItemWithRandomChoice(this.armorInventory[i1], true);
				this.armorInventory[i1] = undefined;
			}
		}

	}

	public onInventoryChanged():  void {
		this.inventoryChanged = true;
	}

	public setItemStack(itemStack1: ItemStack| undefined):  void {
		this.itemStack = itemStack1;
		this.player.onItemStackChanged(itemStack1);
	}

	public getItemStack():  ItemStack | undefined {
		return this.itemStack;
	}

	public async canInteractWith(entityPlayer1: EntityPlayer| undefined):  Promise<boolean> {
		return await this.player.isDead ? false : entityPlayer1.getDistanceSqToEntity(this.player) <= 64.0;
	}
}
