
import { int, java, byte, short, double } from "../jree/index";
import { TileEntity } from "./TileEntity";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { IInventory } from "./IInventory";
import { FurnaceRecipes } from "./FurnaceRecipes";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityPlayer } from "./EntityPlayer";
import { BlockFurnace } from "./BlockFurnace";
import { ItemRegistry } from "./moved/ItemRegistry";
import { BlockRegistry } from './moved/BlockRegistry';
import { MaterialRegistry } from './moved/MaterialRegistry';
import { Block } from './Block';

export class TileEntityFurnace extends TileEntity implements IInventory {
	private furnaceItemStacks:  ItemStack[] | null = new   Array<ItemStack>(3);
	public furnaceBurnTime:  int = 0;
	public currentItemBurnTime:  int = 0;
	public furnaceCookTime:  int = 0;

	public get name() {
		return 'Furnace';
	}

	public getSizeInventory():  int {
		return this.furnaceItemStacks.length;
	}

	public getStackInSlot(i1: int):  ItemStack | null {
		return this.furnaceItemStacks[i1];
	}

	public decrStackSize(i1: int, i2: int):  ItemStack | null {
		if(this.furnaceItemStacks[i1] !== null) {
			let  itemStack3: ItemStack;
			if(this.furnaceItemStacks[i1].stackSize <= i2) {
				itemStack3 = this.furnaceItemStacks[i1];
				this.furnaceItemStacks[i1] = null;
				return itemStack3;
			} else {
				itemStack3 = this.furnaceItemStacks[i1].splitStack(i2);
				if(this.furnaceItemStacks[i1].stackSize === 0) {
					this.furnaceItemStacks[i1] = null;
				}

				return itemStack3;
			}
		} else {
			return null;
		}
	}

	public setInventorySlotContents(i1: int, itemStack2: ItemStack| null):  void {
		this.furnaceItemStacks[i1] = itemStack2;
		if(itemStack2 !== null && itemStack2.stackSize > this.getInventoryStackLimit()) {
			itemStack2.stackSize = this.getInventoryStackLimit();
		}

	}

	public getInvName():  string {
		return "Furnace";
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readFromNBT(nBTTagCompound1);
		let  nBTTagList2: NBTTagList = nBTTagCompound1.getTagList("Items");
		this.furnaceItemStacks = new   Array<ItemStack>(this.getSizeInventory());

		for(let  i3: int = 0; i3 < nBTTagList2.tagCount(); ++i3) {
			let  nBTTagCompound4: NBTTagCompound = nBTTagList2.tagAt(i3) as NBTTagCompound;
			let  b5: byte = nBTTagCompound4.getByte("Slot");
			if(b5 >= 0 && b5 < this.furnaceItemStacks.length) {
				this.furnaceItemStacks[b5] = new  ItemStack(nBTTagCompound4);
			}
		}

		this.furnaceBurnTime = nBTTagCompound1.getShort("BurnTime");
		this.furnaceCookTime = nBTTagCompound1.getShort("CookTime");
		this.currentItemBurnTime = this.getItemBurnTime(this.furnaceItemStacks[1]);
	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeToNBT(nBTTagCompound1);
		nBTTagCompound1.setShort("BurnTime", this.furnaceBurnTime as short);
		nBTTagCompound1.setShort("CookTime", this.furnaceCookTime as short);
		let  nBTTagList2: NBTTagList = new  NBTTagList();

		for(let  i3: int = 0; i3 < this.furnaceItemStacks.length; ++i3) {
			if(this.furnaceItemStacks[i3] !== null) {
				let  nBTTagCompound4: NBTTagCompound = new  NBTTagCompound();
				nBTTagCompound4.setByte("Slot", i3 as byte);
				this.furnaceItemStacks[i3].writeToNBT(nBTTagCompound4);
				nBTTagList2.setTag(nBTTagCompound4);
			}
		}

		nBTTagCompound1.setTag("Items", nBTTagList2);
	}

	public getInventoryStackLimit():  int {
		return 64;
	}

	public getCookProgressScaled(i1: int):  int {
		return this.furnaceCookTime * i1 / 200;
	}

	public getBurnTimeRemainingScaled(i1: int):  int {
		if(this.currentItemBurnTime === 0) {
			this.currentItemBurnTime = 200;
		}

		return this.furnaceBurnTime * i1 / this.currentItemBurnTime;
	}

	public isBurning():  boolean {
		return this.furnaceBurnTime > 0;
	}

	public updateEntity():  void {
		let  z1: boolean = this.furnaceBurnTime > 0;
		let  z2: boolean = false;
		if(this.furnaceBurnTime > 0) {
			--this.furnaceBurnTime;
		}

		if(!this.worldObj.multiplayerWorld) {
			if(this.furnaceBurnTime === 0 && this.canSmelt()) {
				this.currentItemBurnTime = this.furnaceBurnTime = this.getItemBurnTime(this.furnaceItemStacks[1]);
				if(this.furnaceBurnTime > 0) {
					z2 = true;
					if(this.furnaceItemStacks[1] !== null) {
						--this.furnaceItemStacks[1].stackSize;
						if(this.furnaceItemStacks[1].stackSize === 0) {
							this.furnaceItemStacks[1] = null;
						}
					}
				}
			}

			if(this.isBurning() && this.canSmelt()) {
				++this.furnaceCookTime;
				if(this.furnaceCookTime === 200) {
					this.furnaceCookTime = 0;
					this.smeltItem();
					z2 = true;
				}
			} else {
				this.furnaceCookTime = 0;
			}

			if(z1 !== this.furnaceBurnTime > 0) {
				z2 = true;
				BlockFurnace.updateFurnaceBlockState(this.furnaceBurnTime > 0, this.worldObj, this.xCoord, this.yCoord, this.zCoord);
			}
		}

		if(z2) {
			this.onInventoryChanged();
		}

	}

	private canSmelt():  boolean {
		if(this.furnaceItemStacks[0] === null) {
			return false;
		} else {
			let  itemStack1: ItemStack = FurnaceRecipes.smelting().getSmeltingResult(this.furnaceItemStacks[0].getItem().shiftedIndex);
			return itemStack1 === null ? false : (this.furnaceItemStacks[2] === null ? true : (!this.furnaceItemStacks[2].isItemEqual(itemStack1) ? false : (this.furnaceItemStacks[2].stackSize < this.getInventoryStackLimit() && this.furnaceItemStacks[2].stackSize < this.furnaceItemStacks[2].getMaxStackSize() ? true : this.furnaceItemStacks[2].stackSize < itemStack1.getMaxStackSize())));
		}
	}

	public smeltItem():  void {
		if(this.canSmelt()) {
			let  itemStack1: ItemStack = FurnaceRecipes.smelting().getSmeltingResult(this.furnaceItemStacks[0].getItem().shiftedIndex);
			if(this.furnaceItemStacks[2] === null) {
				this.furnaceItemStacks[2] = itemStack1.copy();
			} else if(this.furnaceItemStacks[2].itemID === itemStack1.itemID) {
				++this.furnaceItemStacks[2].stackSize;
			}

			--this.furnaceItemStacks[0].stackSize;
			if(this.furnaceItemStacks[0].stackSize <= 0) {
				this.furnaceItemStacks[0] = null;
			}

		}
	}

	private getItemBurnTime(itemStack1: ItemStack| null):  int {
		if(itemStack1 === null) {
			return 0;
		} else {
			let  i2: int = itemStack1.getItem().shiftedIndex;
			return i2 < 256 && Block.blocksList[i2].blockMaterial === MaterialRegistry.wood ? 300 : (i2 === ItemRegistry.stick.shiftedIndex ? 100 : (i2 === ItemRegistry.coal.shiftedIndex ? 1600 : (i2 === ItemRegistry.bucketLava.shiftedIndex ? 20000 : 0)));
		}
	}

	public async canInteractWith(entityPlayer1: EntityPlayer| null):  Promise<boolean> {
		return await this.worldObj.getBlockTileEntity(this.xCoord, this.yCoord, this.zCoord) !== this ? false : entityPlayer1.getDistanceSq(this.xCoord as double + 0.5, this.yCoord as double + 0.5, this.zCoord as double + 0.5) <= 64.0;
	}
}
