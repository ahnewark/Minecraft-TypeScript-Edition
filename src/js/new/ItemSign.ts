
import { int, double } from "../jree/index";
import { World } from "./World";
import { TileEntitySign } from "./TileEntitySign";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";

export  class ItemSign extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxDamage = 64;
		this.maxStackSize = 1;
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(i7 === 0) {
			return false;
		} else if(!(await world3.getBlockMaterial(i4, i5, i6)).isSolid()) {
			return false;
		} else {
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

			if(!await Block.signPost.canPlaceBlockAt(world3, i4, i5, i6)) {
				return false;
			} else {
				if(i7 === 1) {
					await world3.setBlockAndMetadataWithNotify(i4, i5, i6, Block.signPost.blockID, MathHelper.floor_double(((entityPlayer2.rotationYaw + 180.0) * 16.0 / 360.0) as double + 0.5) & 15);
				} else {
					await world3.setBlockAndMetadataWithNotify(i4, i5, i6, Block.signWall.blockID, i7);
				}

				--itemStack1.stackSize;
				let  tileEntitySign8: TileEntitySign = await world3.getBlockTileEntity(i4, i5, i6) as TileEntitySign;
				if(tileEntitySign8 !== null) {
					entityPlayer2.displayGUIEditSign(tileEntitySign8);
				}

				return true;
			}
		}
	}
}
