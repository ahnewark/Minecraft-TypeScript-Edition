import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityArrow } from "./EntityArrow";
import { Item } from "./Item";

export  class ItemBow extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxStackSize = 1;
	}

	public async onItemRightClick(itemStack1: ItemStack| null, world2: World| null, entityPlayer3: EntityPlayer| null):  Promise<ItemStack | null> {
		if(entityPlayer3.inventory.consumeInventoryItem(Item.arrow.shiftedIndex)) {
			world2.playSoundAtEntity(entityPlayer3, "random.bow", 1.0, 1.0 / (Item.itemRand.nextFloat() * 0.4 + 0.8));
			if(!world2.multiplayerWorld) {
				await world2.entityJoinedWorld(new  EntityArrow(world2, entityPlayer3));
			}
		}

		return itemStack1;
	}
}
