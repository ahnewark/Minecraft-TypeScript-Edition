
import { int, java, float, double } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { EntityPlayer } from "./EntityPlayer";
import { EntityItem } from "./EntityItem";
import { Block } from "./Block";
import { MaterialRegistry } from "./index";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class BlockJukeBox extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.wood);
	}

	public getBlockTextureFromSide(i1: int):  int {
		return this.blockIndexInTexture + (i1 === 1 ? 1 : 0);
	}

	public async blockActivated(world1: World| null, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| null):  Promise<boolean> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		if(i6 > 0) {
			this.ejectRecord(world1, i2, i3, i4, i6);
			return true;
		} else {
			return false;
		}
	}

	public async ejectRecord(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		world1.playRecord(null, i2, i3, i4);
		await world1.setBlockMetadataWithNotify(i2, i3, i4, 0);
		let  i6: int = ItemRegistry.record13.shiftedIndex + i5 - 1;
		let  f7: float = 0.7;
		let  d8: double = (world1.rand.nextFloat() * f7) as double + (1.0 - f7) as double * 0.5;
		let  d10: double = (world1.rand.nextFloat() * f7) as double + (1.0 - f7) as double * 0.2 + 0.6;
		let  d12: double = (world1.rand.nextFloat() * f7) as double + (1.0 - f7) as double * 0.5;
		let  entityItem14: EntityItem = new  EntityItem(world1, i2 as double + d8, i3 as double + d10, i4 as double + d12, new  ItemStack(i6, 1, 0));
		entityItem14.delayBeforeCanPickup = 10;
		await world1.entityJoinedWorld(entityItem14);
	}

	public async dropBlockAsItemWithChance(world1: World| null, i2: int, i3: int, i4: int, i5: int, f6: float):  Promise<void> {
		if(!world1.multiplayerWorld) {
			if(i5 > 0) {
				this.ejectRecord(world1, i2, i3, i4, i5);
			}

			super.dropBlockAsItemWithChance(world1, i2, i3, i4, i5, f6);
		}
	}
}
