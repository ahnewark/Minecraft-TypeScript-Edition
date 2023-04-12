
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { BlockRegistry } from "./moved/BlockRegistry";
import { EntityPlayer } from "./EntityPlayer";

export  class ItemRedstone extends Item {
	public constructor(i1: int) {
		super(i1);
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(i7 === 0) {
			--i5;
		}

		if(i7 === 1) {
			++i5;
		}

		if(i7 === 2) {
			--i6;
		}

		if(i7 === 3) {
			++i6;
		}

		if(i7 === 4) {
			--i4;
		}

		if(i7 === 5) {
			++i4;
		}

		if(!await world3.isAirBlock(i4, i5, i6)) {
			return false;
		} else {
			if(await BlockRegistry.redstoneWire.canPlaceBlockAt(world3, i4, i5, i6)) {
				--itemStack1.stackSize;
				await world3.setBlockWithNotify(i4, i5, i6, BlockRegistry.redstoneWire.blockID);
			}

			return true;
		}
	}
}
