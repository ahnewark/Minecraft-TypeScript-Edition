


import { JavaObject, java, int, float } from "../jree/index";
import { World } from "./World";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { Block } from "./Block";
import { ItemStack } from "./ItemStack";
import { Random } from "../java/util/Random";

export  class Item extends JavaObject {
	protected static itemRand:  Random | null = new  Random();
    public static itemsList:  Item[] | null = new   Array<Item>(32000);
    public readonly shiftedIndex:  int;
	protected maxStackSize:  int = 64;
	protected maxDamage:  int = 32;
	protected iconIndex:  int;
	protected bFull3D:  boolean = false;
	protected hasSubtypes:  boolean = false;
	private containerItem:  Item | null = null;
	private itemName:  string;

	public constructor(i1: int) {
		super();
        this.shiftedIndex = 256 + i1;
		if(Item.itemsList[256 + i1] !== null) {
			console.log("CONFLICT @ " + i1);
		}

		Item.itemsList[256 + i1] = this;
	}

	public setIconIndex(i1: int):  Item | null {
		this.iconIndex = i1;
		return this;
	}

	public setMaxStackSize(i1: int):  Item | null {
		this.maxStackSize = i1;
		return this;
	}

	public setIconCoord(i1: int, i2: int):  Item | null {
		this.iconIndex = i1 + i2 * 16;
		return this;
	}

	public getIconIndex(itemStack1: ItemStack| null):  int {
		return this.iconIndex;
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int): Promise<boolean> {
		return false;
	}

	public getStrVsBlock(itemStack1: ItemStack| null, block2: Block| null):  float {
		return 1.0;
	}

	public async onItemRightClick(itemStack1: ItemStack| null, world2: World| null, entityPlayer3: EntityPlayer| null):  Promise<ItemStack | null> {
		return itemStack1;
	}

	public getItemStackLimit():  int {
		return this.maxStackSize;
	}

	public func_21012_a(i1: int):  int {
		return 0;
	}

	public getHasSubtypes():  boolean {
		return this.hasSubtypes;
	}

	protected setHasSubtypes(z1: boolean):  Item | null {
		this.hasSubtypes = z1;
		return this;
	}

	public getMaxDamage():  int {
		return this.maxDamage;
	}

	protected setMaxDamage(i1: int):  Item | null {
		this.maxDamage = i1;
		return this;
	}

	public hitEntity(itemStack1: ItemStack| null, entityLiving2: EntityLiving| null):  void {
	}

	public hitBlock(itemStack1: ItemStack| null, i2: int, i3: int, i4: int, i5: int):  void {
	}

	public getDamageVsEntity(entity1: Entity| null):  int {
		return 1;
	}

	public canHarvestBlock(block1: Block| null):  boolean {
		return false;
	}

	public saddleEntity(itemStack1: ItemStack| null, entityLiving2: EntityLiving| null):  void {
	}

	public setFull3D():  Item | null {
		this.bFull3D = true;
		return this;
	}

	public isFull3D():  boolean {
		return this.bFull3D;
	}

	public shouldRotateAroundWhenRendering():  boolean {
		return false;
	}

	public setItemName(string1: string):  Item | null {
		this.itemName = "item." + string1;
		return this;
	}

	public getItemName():  string {
		return this.itemName;
	}

	public getItemNameIS(itemStack1: ItemStack| null):  string {
		return this.itemName;
	}

	public setContainerItem(item1: Item| null):  Item | null {
		if(this.maxStackSize > 1) {
			throw new  java.lang.IllegalArgumentException("Max stack size must be 1 for items with crafting results");
		} else {
			this.containerItem = item1;
			return this;
		}
	}

	public getContainerItem():  Item | null {
		return this.containerItem;
	}

	public func_21014_i():  boolean {
		return this.containerItem !== null;
	}
}
