
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntitySnowball } from "./EntitySnowball";
import { EntityPlayer } from "./EntityPlayer";

export  class ItemSnowball extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxStackSize = 16;
	}

	public async onItemRightClick(itemStack1: ItemStack| null, world2: World| null, entityPlayer3: EntityPlayer| null):  Promise<ItemStack | null> {
		--itemStack1.stackSize;
		world2.playSoundAtEntity(entityPlayer3, "random.bow", 0.5, 0.4 / (Item.itemRand.nextFloat() * 0.4 + 0.8));
		if(!world2.multiplayerWorld) {
			await world2.entityJoinedWorld(new  EntitySnowball(world2, entityPlayer3));
		}

		return itemStack1;
	}
}
