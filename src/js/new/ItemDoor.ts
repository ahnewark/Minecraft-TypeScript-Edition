import { int, double, byte } from "../jree/index";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { BlockRegistry } from "./moved/BlockRegistry";
import { EntityPlayer } from "./EntityPlayer";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { Block } from "./Block";

export  class ItemDoor extends Item {
	private field_321_a:  Material | null;

	public constructor(i1: int, material2: Material| null) {
		super(i1);
		this.field_321_a = material2;
		this.maxDamage = 64;
		this.maxStackSize = 1;
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		if(i7 !== 1) {
			return false;
		} else {
			++i5;
			let  block8: Block;
			if(this.field_321_a === MaterialRegistry.wood) {
				block8 = BlockRegistry.doorWood;
			} else {
				block8 = BlockRegistry.doorSteel;
			}

			if(!await block8.canPlaceBlockAt(world3, i4, i5, i6)) {
				return false;
			} else {
				let  i9: int = MathHelper.floor_double(((entityPlayer2.rotationYaw + 180.0) * 4.0 / 360.0) as double - 0.5) & 3;
				let  b10: byte = 0;
				let  b11: byte = 0;
				if(i9 === 0) {
					b11 = 1;
				}

				if(i9 === 1) {
					b10 = -1;
				}

				if(i9 === 2) {
					b11 = -1;
				}

				if(i9 === 3) {
					b10 = 1;
				}

				let  i12: int = (await world3.isBlockOpaqueCube(i4 - b10, i5, i6 - b11) ? 1 : 0) + (await world3.isBlockOpaqueCube(i4 - b10, i5 + 1, i6 - b11) ? 1 : 0);
				let  i13: int = (await world3.isBlockOpaqueCube(i4 + b10, i5, i6 + b11) ? 1 : 0) + (await world3.isBlockOpaqueCube(i4 + b10, i5 + 1, i6 + b11) ? 1 : 0);
				let  z14: boolean = await world3.getBlockId(i4 - b10, i5, i6 - b11) === block8.blockID || await world3.getBlockId(i4 - b10, i5 + 1, i6 - b11) === block8.blockID;
				let  z15: boolean = await world3.getBlockId(i4 + b10, i5, i6 + b11) === block8.blockID || await world3.getBlockId(i4 + b10, i5 + 1, i6 + b11) === block8.blockID;
				let  z16: boolean = false;
				if(z14 && !z15) {
					z16 = true;
				} else if(i13 > i12) {
					z16 = true;
				}

				if(z16) {
					i9 = i9 - 1 & 3;
					i9 += 4;
				}

				await world3.setBlockWithNotify(i4, i5, i6, block8.blockID);
				await world3.setBlockMetadataWithNotify(i4, i5, i6, i9);
				await world3.setBlockWithNotify(i4, i5 + 1, i6, block8.blockID);
				await world3.setBlockMetadataWithNotify(i4, i5 + 1, i6, i9 + 8);
				--itemStack1.stackSize;
				return true;
			}
		}
	}
}
