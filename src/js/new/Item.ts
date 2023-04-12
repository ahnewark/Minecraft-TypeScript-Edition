


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
    public static itemsList:  Item[] = new  Array<Item>(32000);
	public static shovelSteel:  Item;
	public static pickaxeSteel:  Item;
	public static axeSteel:  Item;
	public static flintAndSteel:  Item;
	public static appleRed:  Item;
	public static bow:  Item;
	public static arrow:  Item;
	public static coal:  Item;
	public static diamond:  Item;
	public static ingotIron:  Item;
	public static ingotGold:  Item;
	public static swordSteel:  Item;
	public static swordWood:  Item;
	public static shovelWood:  Item;
	public static pickaxeWood:  Item;
	public static axeWood:  Item;
	public static swordStone:  Item;
	public static shovelStone:  Item;
	public static pickaxeStone:  Item;
	public static axeStone:  Item;
	public static swordDiamond:  Item;
	public static shovelDiamond:  Item;
	public static pickaxeDiamond:  Item;
	public static axeDiamond:  Item;
	public static stick:  Item;
	public static bowlEmpty:  Item;
	public static bowlSoup:  Item;
	public static swordGold:  Item;
	public static shovelGold:  Item;
	public static pickaxeGold:  Item;
	public static axeGold:  Item;
	public static silk:  Item;
	public static feather:  Item;
	public static gunpowder:  Item;
	public static hoeWood:  Item;
	public static hoeStone:  Item;
	public static hoeSteel:  Item;
	public static hoeDiamond:  Item;
	public static hoeGold:  Item;
	public static seeds:  Item;
	public static wheat:  Item;
	public static bread:  Item;
	public static helmetLeather:  Item;
	public static plateLeather:  Item;
	public static legsLeather:  Item;
	public static bootsLeather:  Item;
	public static helmetChain:  Item;
	public static plateChain:  Item;
	public static legsChain:  Item;
	public static bootsChain:  Item;
	public static helmetSteel:  Item;
	public static plateSteel:  Item;
	public static legsSteel:  Item;
	public static bootsSteel:  Item;
	public static helmetDiamond:  Item;
	public static plateDiamond:  Item;
	public static legsDiamond:  Item;
	public static bootsDiamond:  Item;
	public static helmetGold:  Item;
	public static plateGold:  Item;
	public static legsGold:  Item;
	public static bootsGold:  Item;
	public static flint:  Item;
	public static porkRaw:  Item;
	public static porkCooked:  Item;
	public static painting:  Item;
	public static appleGold:  Item;
	public static sign:  Item;
	public static doorWood:  Item;
	public static bucketEmpty:  Item;
	public static bucketWater:  Item;
	public static bucketLava:  Item;
	public static minecartEmpty:  Item;
	public static saddle:  Item;
	public static doorSteel:  Item;
	public static redstone:  Item;
	public static snowball:  Item;
	public static boat:  Item;
	public static leather:  Item;
	public static bucketMilk:  Item;
	public static brick:  Item;
	public static clay:  Item;
	public static reed:  Item;
	public static paper:  Item;
	public static book:  Item;
	public static slimeBall:  Item;
	public static minecartCrate:  Item;
	public static minecartPowered:  Item;
	public static egg:  Item;
	public static compass:  Item;
	public static fishingRod:  Item;
	public static pocketSundial:  Item;
	public static lightStoneDust:  Item;
	public static fishRaw:  Item;
	public static fishCooked:  Item;
	public static dyePowder:  Item;
	public static bone:  Item;
	public static sugar:  Item;
	public static cake:  Item;
	public static record13:  Item;
	public static recordCat:  Item;
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
		if(Item.itemsList[256 + i1] !== undefined) {
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
