import { int, double, float, byte } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { BlockRegistry } from "./moved/BlockRegistry";
import { EntityPlayer } from "./EntityPlayer";
import { EntityItem } from "./EntityItem";
import { Block } from "./index";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class ItemHoe extends Item {
	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| null) {
		super(i1);
		this.maxStackSize = 1;
		this.maxDamage = enumToolMaterial2.getMaxUses();
	}

	public async onItemUse(itemStack1: ItemStack| null, entityPlayer2: EntityPlayer| null, world3: World| null, i4: int, i5: int, i6: int, i7: int):  Promise<boolean> {
		let  i8: int = await world3.getBlockId(i4, i5, i6);
		let  material9: Material = await world3.getBlockMaterial(i4, i5 + 1, i6);
		if((material9.isSolid() || i8 !== BlockRegistry.grass.blockID) && i8 !== BlockRegistry.dirt.blockID) {
			return false;
		} else {
			let  block10: Block = BlockRegistry.tilledField;
			world3.playSoundEffect((i4 as float + 0.5) as double, (i5 as float + 0.5) as double, (i6 as float + 0.5) as double, block10.stepSound.func_1145_d(), (block10.stepSound.func_1147_b() + 1.0) / 2.0, block10.stepSound.func_1144_c() * 0.8);
			if(world3.multiplayerWorld) {
				return true;
			} else {
				world3.setBlockWithNotify(i4, i5, i6, block10.blockID);
				itemStack1.damageItem(1);
				if(world3.rand.nextInt(8) === 0 && i8 === BlockRegistry.grass.blockID) {
					let  b11: byte = 1;

					for(let  i12: int = 0; i12 < b11; ++i12) {
						let  f13: float = 0.7;
						let  f14: float = world3.rand.nextFloat() * f13 + (1.0 - f13) * 0.5;
						let  f15: float = 1.2;
						let  f16: float = world3.rand.nextFloat() * f13 + (1.0 - f13) * 0.5;
						let  entityItem17: EntityItem = new  EntityItem(world3, (i4 as float + f14) as double, (i5 as float + f15) as double, (i6 as float + f16) as double, new  ItemStack(ItemRegistry.seeds));
						entityItem17.delayBeforeCanPickup = 10;
						world3.entityJoinedWorld(entityItem17);
					}
				}

				return true;
			}
		}
	}

	public isFull3D():  boolean {
		return true;
	}
}
