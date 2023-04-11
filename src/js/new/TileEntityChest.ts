
import { int, java, byte, double } from "../jree/index";
import { TileEntity } from "./TileEntity";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";

export  class TileEntityChest extends TileEntity implements IInventory {
	private chestContents:  ItemStack[] | null = new   Array<ItemStack>(36);

	public get name(): string {
		return 'Chest';
	}

	public getSizeInventory():  int {
		return 27;
	}

	public getStackInSlot(i1: int):  ItemStack | null {
		return this.chestContents[i1];
	}

	public decrStackSize(i1: int, i2: int):  ItemStack | null {
		if(this.chestContents[i1] !== null) {
			let  itemStack3: ItemStack;
			if(this.chestContents[i1].stackSize <= i2) {
				itemStack3 = this.chestContents[i1];
				this.chestContents[i1] = null;
				this.onInventoryChanged();
				return itemStack3;
			} else {
				itemStack3 = this.chestContents[i1].splitStack(i2);
				if(this.chestContents[i1].stackSize === 0) {
					this.chestContents[i1] = null;
				}

				this.onInventoryChanged();
				return itemStack3;
			}
		} else {
			return null;
		}
	}

	public setInventorySlotContents(i1: int, itemStack2: ItemStack| null):  void {
		this.chestContents[i1] = itemStack2;
		if(itemStack2 !== null && itemStack2.stackSize > this.getInventoryStackLimit()) {
			itemStack2.stackSize = this.getInventoryStackLimit();
		}

		this.onInventoryChanged();
	}

	public getInvName(): string {
		return "Chest";
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readFromNBT(nBTTagCompound1);
		let  nBTTagList2: NBTTagList = nBTTagCompound1.getTagList("Items");
		this.chestContents = new   Array<ItemStack>(this.getSizeInventory());

		for(let  i3: int = 0; i3 < nBTTagList2.tagCount(); ++i3) {
			let  nBTTagCompound4: NBTTagCompound = nBTTagList2.tagAt(i3) as NBTTagCompound;
			let  i5: int = nBTTagCompound4.getByte("Slot") & 255;
			if(i5 >= 0 && i5 < this.chestContents.length) {
				this.chestContents[i5] = new  ItemStack(nBTTagCompound4);
			}
		}

	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeToNBT(nBTTagCompound1);
		let  nBTTagList2: NBTTagList = new  NBTTagList();

		for(let  i3: int = 0; i3 < this.chestContents.length; ++i3) {
			if(this.chestContents[i3] !== null) {
				let  nBTTagCompound4: NBTTagCompound = new  NBTTagCompound();
				nBTTagCompound4.setByte("Slot", i3 as byte);
				this.chestContents[i3].writeToNBT(nBTTagCompound4);
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
