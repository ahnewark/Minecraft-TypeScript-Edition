
import { int, float, short, byte, java, S } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { Block } from "./Block";

export class ItemStack {
	public stackSize:  int;
	public animationsToGo:  int;
	public itemID:  int;
	private itemDamage:  int;

	public constructor(block1: Block| null);

	public constructor(item1: Item| null);

	public constructor(nBTTagCompound1: NBTTagCompound| null);

	public constructor(block1: Block| null, i2: int);

	public constructor(item1: Item| null, i2: int);

	public constructor(block1: Block| null, i2: int, i3: int);

	public constructor(item1: Item| null, i2: int, i3: int);

	public constructor(i1: int, i2: int, i3: int);
    public constructor(...args: unknown[]) {
		let itemId = 0;
		let stackSize = 1;
		let itemDamage = 0;

		switch (args.length) {
			case 1: {
				if (args[0] instanceof Block)
					itemId = args[0].blockID;

				if (args[0] instanceof Item)
					itemId = args[0].shiftedIndex;

				if (args[0] instanceof NBTTagCompound) {
					this.stackSize = 0;
					this.readFromNBT(args[0]);
					return;
				}

				break;
			}


			case 2: {
				if (args[0] instanceof Block)
					itemId = args[0].blockID;

				if (args[0] instanceof Item)
					itemId = args[0].shiftedIndex;

				stackSize = args[1] as number;
				break;
			}

			case 3: {
				if (args[0] instanceof Block)
					itemId = args[0].blockID;

				if (args[0] instanceof Item)
					itemId = args[0].shiftedIndex;
				
				if (typeof args[0] === 'number')
					itemId = args[0];

				stackSize = args[1] as number;
				itemDamage = args[2] as number;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public splitStack(i1: int):  ItemStack | null {
		this.stackSize -= i1;
		return new  ItemStack(this.itemID, i1, this.itemDamage);
	}

	public getItem():  Item | null {
		return Item.itemsList[this.itemID];
	}

	public getIconIndex():  int {
		return this.getItem().getIconIndex(this);
	}

	public async useItem(entityPlayer1: EntityPlayer| null, world2: World| null, i3: int, i4: int, i5: int, i6: int):  Promise<boolean> {
		return await this.getItem().onItemUse(this, entityPlayer1, world2, i3, i4, i5, i6);
	}

	public getStrVsBlock(block1: Block| null):  float {
		return this.getItem().getStrVsBlock(this, block1);
	}

	public async useItemRightClick(world1: World| null, entityPlayer2: EntityPlayer| null):  Promise<ItemStack | null> {
		return await this.getItem().onItemRightClick(this, world1, entityPlayer2);
	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| null):  NBTTagCompound | null {
		nBTTagCompound1.setShort("id", this.itemID as short);
		nBTTagCompound1.setByte("Count", this.stackSize as byte);
		nBTTagCompound1.setShort("Damage", this.itemDamage as short);
		return nBTTagCompound1;
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.itemID = nBTTagCompound1.getShort("id");
		this.stackSize = nBTTagCompound1.getByte("Count");
		this.itemDamage = nBTTagCompound1.getShort("Damage");
	}

	public getMaxStackSize():  int {
		return this.getItem().getItemStackLimit();
	}

	public func_21180_d():  boolean {
		return this.getMaxStackSize() > 1 && (!this.isItemStackDamageable() || !this.isItemDamaged());
	}

	public isItemStackDamageable():  boolean {
		return Item.itemsList[this.itemID].getMaxDamage() > 0;
	}

	public getHasSubtypes():  boolean {
		return Item.itemsList[this.itemID].getHasSubtypes();
	}

	public isItemDamaged():  boolean {
		return this.isItemStackDamageable() && this.itemDamage > 0;
	}

	public getItemDamageForDisplay():  int {
		return this.itemDamage;
	}

	public getItemDamage():  int {
		return this.itemDamage;
	}

	public getMaxDamage():  int {
		return Item.itemsList[this.itemID].getMaxDamage();
	}

	public damageItem(i1: int):  void {
		if(this.isItemStackDamageable()) {
			this.itemDamage += i1;
			if(this.itemDamage > this.getMaxDamage()) {
				--this.stackSize;
				if(this.stackSize < 0) {
					this.stackSize = 0;
				}

				this.itemDamage = 0;
			}

		}
	}

	public hitEntity(entityLiving1: EntityLiving| null):  void {
		Item.itemsList[this.itemID].hitEntity(this, entityLiving1);
	}

	public hitBlock(i1: int, i2: int, i3: int, i4: int):  void {
		Item.itemsList[this.itemID].hitBlock(this, i1, i2, i3, i4);
	}

	public getDamageVsEntity(entity1: Entity| null):  int {
		return Item.itemsList[this.itemID].getDamageVsEntity(entity1);
	}

	public canHarvestBlock(block1: Block| null):  boolean {
		return Item.itemsList[this.itemID].canHarvestBlock(block1);
	}

	public func_1097_a(entityPlayer1: EntityPlayer| null):  void {
	}

	public useItemOnEntity(entityLiving1: EntityLiving| null):  void {
		Item.itemsList[this.itemID].saddleEntity(this, entityLiving1);
	}

	public copy():  ItemStack | null {
		return new  ItemStack(this.itemID, this.stackSize, this.itemDamage);
	}

	public static areItemStacksEqual(itemStack0: ItemStack| null, itemStack1: ItemStack| null):  boolean {
		return itemStack0 === null && itemStack1 === null ? true : (itemStack0 !== null && itemStack1 !== null ? itemStack0.isItemStackEqual(itemStack1) : false);
	}

	private isItemStackEqual(itemStack1: ItemStack| null):  boolean {
		return this.stackSize !== itemStack1.stackSize ? false : (this.itemID !== itemStack1.itemID ? false : this.itemDamage === itemStack1.itemDamage);
	}

	public isItemEqual(itemStack1: ItemStack| null):  boolean {
		return this.itemID === itemStack1.itemID && this.itemDamage === itemStack1.itemDamage;
	}

	public func_20109_f():  string {
		return Item.itemsList[this.itemID].getItemNameIS(this);
	}

	public toString():  string {
		return this.stackSize + "x" + Item.itemsList[this.itemID].getItemName() + "@" + this.itemDamage;
	}
}
