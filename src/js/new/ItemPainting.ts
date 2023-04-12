import { int, byte } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityPainting } from "./EntityPainting";

export  class ItemPainting extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxDamage = 64;
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(i7 === 0) {
			return false;
		} else if(i7 === 1) {
			return false;
		} else {
			let  b8: byte = 0;
			if(i7 === 4) {
				b8 = 1;
			}

			if(i7 === 3) {
				b8 = 2;
			}

			if(i7 === 5) {
				b8 = 3;
			}

			let  entityPainting9: EntityPainting = new  EntityPainting(world3, i4, i5, i6, b8);
			if(await entityPainting9.func_410_i()) {
				if(!world3.multiplayerWorld) {
					await world3.entityJoinedWorld(entityPainting9);
				}

				--itemStack1.stackSize;
			}

			return true;
		}
	}
}
