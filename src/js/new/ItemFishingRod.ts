
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityFish } from "./EntityFish";

export  class ItemFishingRod extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxDamage = 64;
	}

	public isFull3D():  boolean {
		return true;
	}

	public shouldRotateAroundWhenRendering():  boolean {
		return true;
	}

	public async onItemRightClick(itemStack1: ItemStack| null, world2: World| null, entityPlayer3: EntityPlayer| null):  Promise<ItemStack | null> {
		if(entityPlayer3.fishEntity !== null) {
			let  i4: int = await entityPlayer3.fishEntity.func_4043_i();
			itemStack1.damageItem(i4);
			entityPlayer3.swingItem();
		} else {
			world2.playSoundAtEntity(entityPlayer3, "random.bow", 0.5, 0.4 / (Item.itemRand.nextFloat() * 0.4 + 0.8));
			if(!world2.multiplayerWorld) {
				await world2.entityJoinedWorld(new  EntityFish(world2, entityPlayer3));
			}

			entityPlayer3.swingItem();
		}

		return itemStack1;
	}
}
