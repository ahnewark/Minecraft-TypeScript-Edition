import { java, int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Material } from "./Material";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Random } from "../java/util/Random";
import { BlockRegistry } from "./moved/BlockRegistry";
import { MaterialRegistry } from './moved/MaterialRegistry'

export  class WorldGenReed extends WorldGenerator {
	public async generate(world1: World| null, random2: Random| null, i3: int, i4: int, i5: int):  Promise<boolean> {
		for(let  i6: int = 0; i6 < 20; ++i6) {
			let  i7: int = i3 + random2.nextInt(4) - random2.nextInt(4);
			let  i8: int = i4;
			let  i9: int = i5 + random2.nextInt(4) - random2.nextInt(4);
			if(await world1.isAirBlock(i7, i4, i9) && (await world1.getBlockMaterial(i7 - 1, i4 - 1, i9) === MaterialRegistry.water || await world1.getBlockMaterial(i7 + 1, i4 - 1, i9) === MaterialRegistry.water || await world1.getBlockMaterial(i7, i4 - 1, i9 - 1) === MaterialRegistry.water || await world1.getBlockMaterial(i7, i4 - 1, i9 + 1) === MaterialRegistry.water)) {
				let  i10: int = 2 + random2.nextInt(random2.nextInt(3) + 1);

				for(let  i11: int = 0; i11 < i10; ++i11) {
					if(BlockRegistry.reed.canBlockStay(world1, i7, i8 + i11, i9)) {
						world1.setBlock(i7, i8 + i11, i9, BlockRegistry.reed.blockID);
					}
				}
			}
		}

		return true;
	}
}
