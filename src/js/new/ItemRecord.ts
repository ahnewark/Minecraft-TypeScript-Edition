
import { int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Block } from "./Block";
import { EntityPlayer } from "./EntityPlayer";
import { Item } from "./Item";

export  class ItemRecord extends Item {
	private recordName:  string;

	public constructor(i1: int, string2: string) {
		super(i1);
		this.recordName = string2;
		this.maxStackSize = 1;
	}

	public async onItemUse(itemStack1: ItemStack| undefined, entityPlayer2: EntityPlayer| undefined, world3: World| undefined, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(await world3.getBlockId(i4, i5, i6) === Block.jukebox.blockID && await world3.getBlockMetadata(i4, i5, i6) === 0) {
			await world3.setBlockMetadataWithNotify(i4, i5, i6, this.shiftedIndex - Item.record13.shiftedIndex + 1);
			world3.playRecord(this.recordName, i4, i5, i6);
			--itemStack1.stackSize;
			return true;
		} else {
			return false;
		}
	}
}
