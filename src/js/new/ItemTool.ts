
import { float, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { Block } from "./Block";

export  class ItemTool extends Item {
	private blocksEffectiveAgainst:  Block[] | null;
	private efficiencyOnProperMaterial:  float = 4.0;
	private damageVsEntity:  int;
	protected toolMaterial:  EnumToolMaterial | null;

	protected constructor(i1: int, i2: int, enumToolMaterial3: EnumToolMaterial| null, block4: Block[]| null) {
		super(i1);
		this.toolMaterial = enumToolMaterial3;
		this.blocksEffectiveAgainst = block4;
		this.maxStackSize = 1;
		this.maxDamage = enumToolMaterial3.getMaxUses();
		this.efficiencyOnProperMaterial = enumToolMaterial3.getEfficiencyOnProperMaterial();
		this.damageVsEntity = i2 + enumToolMaterial3.getDamageVsEntity();
	}

	public getStrVsBlock(itemStack1: ItemStack| null, block2: Block| null):  float {
		for(let  i3: int = 0; i3 < this.blocksEffectiveAgainst.length; ++i3) {
			if(this.blocksEffectiveAgainst[i3] === block2) {
				return this.efficiencyOnProperMaterial;
			}
		}

		return 1.0;
	}

	public hitEntity(itemStack1: ItemStack| null, entityLiving2: EntityLiving| null):  void {
		itemStack1.damageItem(2);
	}

	public hitBlock(itemStack1: ItemStack| null, i2: int, i3: int, i4: int, i5: int):  void {
		itemStack1.damageItem(1);
	}

	public getDamageVsEntity(entity1: Entity| null):  int {
		return this.damageVsEntity;
	}

	public isFull3D():  boolean {
		return true;
	}
}
