


import { java, int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Random } from "../java/util/Random";
import { BlockRegistry } from "./moved/BlockRegistry";




export  class WorldGenFire extends WorldGenerator {
	public async generate(world1: World| null, random2: Random| null, i3: int, i4: int, i5: int):  Promise<boolean> {
		for(let  i6: int = 0; i6 < 64; ++i6) {
			let  i7: int = i3 + random2.nextInt(8) - random2.nextInt(8);
			let  i8: int = i4 + random2.nextInt(4) - random2.nextInt(4);
			let  i9: int = i5 + random2.nextInt(8) - random2.nextInt(8);
			if(await world1.isAirBlock(i7, i8, i9) && await world1.getBlockId(i7, i8 - 1, i9) === BlockRegistry.bloodStone.blockID) {
				await world1.setBlockWithNotify(i7, i8, i9, BlockRegistry.fire.blockID);
			}
		}

		return true;
	}
}
