import { int, double, float } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Block } from "./Block";
import { EntityPlayer } from "./EntityPlayer";
import { EntityMinecart } from "./EntityMinecart";

export  class ItemMinecart extends Item {
	public minecartType:  int;

	public constructor(i1: int, i2: int) {
		super(i1);
		this.maxStackSize = 1;
		this.minecartType = i2;
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int): Promise<boolean> {
		let  i8: int = await world3.getBlockId(i4, i5, i6);
		if(i8 === Block.minecartTrack.blockID) {
			if(!world3.multiplayerWorld) {
				await world3.entityJoinedWorld(new  EntityMinecart(world3, (i4 as float + 0.5) as double, (i5 as float + 0.5) as double, (i6 as float + 0.5) as double, this.minecartType));
			}

			--itemStack1.stackSize;
			return true;
		} else {
			return false;
		}
	}
}
