
import { java, int } from "../jree/index";
import { World } from "./World";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntitySheep } from "./EntitySheep";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { BlockSapling } from "./BlockSapling";
import { BlockCrops } from "./BlockCrops";
import { BlockCloth } from "./BlockCloth";
import { Block } from "./Block";

export  class ItemDye extends Item {
	public static readonly dyeColors:  string[] | undefined =  ["black", "red", "green", "brown", "blue", "purple", "cyan", "silver", "gray", "pink", "lime", "yellow", "lightBlue", "magenta", "orange", "white"];

	public constructor(i1: int) {
		super(i1);
		this.setHasSubtypes(true);
		this.setMaxDamage(0);
	}

	public getIconIndex(itemStack1: ItemStack| undefined):  int {
		let  i2: int = itemStack1.getItemDamage();
		return this.iconIndex + i2 % 8 * 16 + i2 / 8;
	}

	public getItemNameIS(itemStack1: ItemStack| undefined): string {
		return super.getItemName() + "." + ItemDye.dyeColors[itemStack1.getItemDamage()];
	}

	public async onItemUse(itemStack1: ItemStack| undefined, entityPlayer2: EntityPlayer| undefined, world3: World| undefined, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(itemStack1.getItemDamage() === 15) {
			let  i8: int = await world3.getBlockId(i4, i5, i6);
			if(i8 === Block.sapling.blockID) {
				await (Block.sapling as BlockSapling).func_21028_c(world3, i4, i5, i6, world3.rand);
				--itemStack1.stackSize;
				return true;
			}

			if(i8 === Block.crops.blockID) {
				await (Block.crops as BlockCrops).func_21027_c_(world3, i4, i5, i6);
				--itemStack1.stackSize;
				return true;
			}
		}

		return false;
	}

	public saddleEntity(itemStack1: ItemStack| undefined, entityLiving2: EntityLiving| undefined):  void {
		if(entityLiving2 instanceof EntitySheep) {
			let  entitySheep3: EntitySheep = entityLiving2 as EntitySheep;
			let  i4: int = BlockCloth.func_21034_c(itemStack1.getItemDamage());
			if(!entitySheep3.func_21072_p() && entitySheep3.getFleeceColor() !== i4) {
				entitySheep3.setFleeceColor(i4);
				--itemStack1.stackSize;
			}
		}

	}
}
