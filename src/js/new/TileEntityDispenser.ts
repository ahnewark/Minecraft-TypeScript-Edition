


import { int, byte, double } from "../jree/index";
import { TileEntity } from "./TileEntity";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";
import { Random } from "../java/util/Random";

export  class TileEntityDispenser extends TileEntity implements IInventory {
	private dispenserContents:  ItemStack[] = new   Array<ItemStack>(9);
	private dispenserRandom:  Random | undefined = new  Random();

	public get name(): string {
		return 'Trap';
	}

	public getSizeInventory():  int {
		return 9;
	}

	public getStackInSlot(i1: int):  ItemStack | undefined {
		return this.dispenserContents[i1];
	}

	public async decrStackSize(i1: int, i2: int):  Promise<ItemStack | undefined> {
		if(this.dispenserContents[i1] !== undefined) {
			let  itemStack3: ItemStack;
			if(this.dispenserContents[i1].stackSize <= i2) {
				itemStack3 = this.dispenserContents[i1];
				this.dispenserContents[i1] = undefined;
				await this.onInventoryChanged();
				return itemStack3;
			} else {
				itemStack3 = this.dispenserContents[i1].splitStack(i2);
				if(this.dispenserContents[i1].stackSize === 0) {
					this.dispenserContents[i1] = undefined;
				}

				await this.onInventoryChanged();
				return itemStack3;
			}
		} else {
			return undefined;
		}
	}

	public async getRandomStackFromInventory():  Promise<ItemStack | undefined> {
		let  i1: int = -1;
		let  i2: int = 1;

		for(let  i3: int = 0; i3 < this.dispenserContents.length; ++i3) {
			if(this.dispenserContents[i3] !== undefined && this.dispenserRandom.nextInt(i2) === 0) {
				i1 = i3;
				++i2;
			}
		}

		if(i1 >= 0) {
			return await this.decrStackSize(i1, 1);
		} else {
			return undefined;
		}
	}

	public async setInventorySlotContents(i1: int, itemStack2: ItemStack| undefined):  Promise<void> {
		this.dispenserContents[i1] = itemStack2;
		if(itemStack2 !== undefined && itemStack2.stackSize > this.getInventoryStackLimit()) {
			itemStack2.stackSize = this.getInventoryStackLimit();
		}

		await this.onInventoryChanged();
	}

	public getInvName(): string {
		return "Trap";
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
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

	public writeToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		super.writeToNBT(nBTTagCompound1);
		let  nBTTagList2: NBTTagList = new  NBTTagList();

		for(let  i3: int = 0; i3 < this.dispenserContents.length; ++i3) {
			if(this.dispenserContents[i3] !== undefined) {
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

	public async canInteractWith(entityPlayer1: EntityPlayer| undefined):  Promise<boolean> {
		return await this.worldObj.getBlockTileEntity(this.xCoord, this.yCoord, this.zCoord) !== this ? false : entityPlayer1.getDistanceSq(this.xCoord as double + 0.5, this.yCoord as double + 0.5, this.zCoord as double + 0.5) <= 64.0;
	}
}
