
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { BlockRegistry } from "./moved/BlockRegistry";
import { EntityPlayer } from "./EntityPlayer";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class ItemRecord extends Item {
	private recordName:  string;

	public constructor(i1: int, string2: string) {
		super(i1);
		this.recordName = string2;
		this.maxStackSize = 1;
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(await world3.getBlockId(i4, i5, i6) === BlockRegistry.jukebox.blockID && await world3.getBlockMetadata(i4, i5, i6) === 0) {
			world3.setBlockMetadataWithNotify(i4, i5, i6, this.shiftedIndex - ItemRegistry.record13.shiftedIndex + 1);
			world3.playRecord(this.recordName, i4, i5, i6);
			--itemStack1.stackSize;
			return true;
		} else {
			return false;
		}
	}
}
