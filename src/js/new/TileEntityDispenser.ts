


import { java, int, byte, double } from "../jree/index";
import { TileEntity } from "./TileEntity";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";

export  class TileEntityDispenser extends TileEntity implements IInventory {
	private dispenserContents:  ItemStack[] | null = new   Array<ItemStack>(9);
	private dispenserRandom:  java.util.Random | null = new  java.util.Random();

	public get name(): string {
		return 'Trap';
	}

	public getSizeInventory():  int {
		return 9;
	}

	public getStackInSlot(i1: int):  ItemStack | null {
		return this.dispenserContents[i1];
	}

	public decrStackSize(i1: int, i2: int):  ItemStack | null {
		if(this.dispenserContents[i1] !== null) {
			let  itemStack3: ItemStack;
			if(this.dispenserContents[i1].stackSize <= i2) {
				itemStack3 = this.dispenserContents[i1];
				this.dispenserContents[i1] = null;
				this.onInventoryChanged();
				return itemStack3;
			} else {
				itemStack3 = this.dispenserContents[i1].splitStack(i2);
				if(this.dispenserContents[i1].stackSize === 0) {
					this.dispenserContents[i1] = null;
				}

				this.onInventoryChanged();
				return itemStack3;
			}
		} else {
			return null;
		}
	}

	public getRandomStackFromInventory():  ItemStack | null {
		let  i1: int = -1;
		let  i2: int = 1;

		for(let  i3: int = 0; i3 < this.dispenserContents.length; ++i3) {
			if(this.dispenserContents[i3] !== null && this.dispenserRandom.nextInt(i2) === 0) {
				i1 = i3;
				++i2;
			}
		}

		if(i1 >= 0) {
			return this.decrStackSize(i1, 1);
		} else {
			return null;
		}
	}

	public setInventorySlotContents(i1: int, itemStack2: ItemStack| null):  void {
		this.dispenserContents[i1] = itemStack2;
		if(itemStack2 !== null && itemStack2.stackSize > this.getInventoryStackLimit()) {
			itemStack2.stackSize = this.getInventoryStackLimit();
		}

		this.onInventoryChanged();
	}

	public getInvName():  java.lang.String | null {
		return "Trap";
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readFromNBT(nBTTagCompound1);
		let  nBTTagList2: NBTTagList = nBTTagCompound1.getTagList("Items");
		this.dispenserContents = new   Array<ItemStack>(this.getSizeInventory());

		for(let  i3: int = 0; i3 < nBTTagList2.tagCount(); ++i3) {
			let  nBTTagCompound4: NBTTagCompound = nBTTagList2.tagAt(i3) as NBTTagCompound;
			let  i5: int = nBTTagCompound4.getByte("Slot") & 255;
			if(i5 >= 0 && i5 < this.dispenserContents.length) {
				this.dispenserContents[i5] = new  ItemStack(nBTTagCompound4);
			}
		}

	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeToNBT(nBTTagCompound1);
		let  nBTTagList2: NBTTagList = new  NBTTagList();

		for(let  i3: int = 0; i3 < this.dispenserContents.length; ++i3) {
			if(this.dispenserContents[i3] !== null) {
				let  nBTTagCompound4: NBTTagCompound = new  NBTTagCompound();
				nBTTagCompound4.setByte("Slot", i3 as byte);
				this.dispenserContents[i3].writeToNBT(nBTTagCompound4);
				nBTTagList2.setTag(nBTTagCompound4);
			}
		}

		nBTTagCompound1.setTag("Items", nBTTagList2);
	}

	public getInventoryStackLimit():  int {
		return 64;
	}

	public async canInteractWith(entityPlayer1: EntityPlayer| null):  Promise<boolean> {
		return await this.worldObj.getBlockTileEntity(this.xCoord, this.yCoord, this.zCoord) !== this ? false : entityPlayer1.getDistanceSq(this.xCoord as double + 0.5, this.yCoord as double + 0.5, this.zCoord as double + 0.5) <= 64.0;
	}
}
