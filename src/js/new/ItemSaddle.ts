
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPig } from "./EntityPig";
import { EntityLiving } from "./EntityLiving";

export  class ItemSaddle extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxStackSize = 1;
		this.maxDamage = 64;
	}

	public saddleEntity(itemStack1: ItemStack| undefined, entityLiving2: EntityLiving| undefined):  void {
		if(entityLiving2 instanceof EntityPig) {
			let  entityPig3: EntityPig = entityLiving2 as EntityPig;
			if(!entityPig3.func_21068_q()) {
				entityPig3.func_21069_a(true);
				--itemStack1.stackSize;
			}
		}

	}

	public hitEntity(itemStack1: ItemStack| undefined, entityLiving2: EntityLiving| undefined):  void {
		this.saddleEntity(itemStack1, entityLiving2);
	}
}
