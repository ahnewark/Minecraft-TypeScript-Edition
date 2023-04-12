
import { int, float } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { Block } from "./Block";

export  class ItemSword extends Item {
	private weaponDamage:  int;

	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| null) {
		super(i1);
		this.maxStackSize = 1;
		this.maxDamage = enumToolMaterial2.getMaxUses();
		this.weaponDamage = 4 + enumToolMaterial2.getDamageVsEntity() * 2;
	}

	public getStrVsBlock(itemStack1: ItemStack| null, block2: Block| null):  float {
		return 1.5;
	}

	public hitEntity(itemStack1: ItemStack| null, entityLiving2: EntityLiving| null):  void {
		itemStack1.damageItem(1);
	}

	public hitBlock(itemStack1: ItemStack| null, i2: int, i3: int, i4: int, i5: int):  void {
		itemStack1.damageItem(2);
	}

	public getDamageVsEntity(entity1: Entity| null):  int {
		return this.weaponDamage;
	}

	public isFull3D():  boolean {
		return true;
	}
}
