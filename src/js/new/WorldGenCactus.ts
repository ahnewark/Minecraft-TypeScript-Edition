import { java, int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Random } from "../java/util/Random";
import { Block } from "./Block";

export  class WorldGenCactus extends WorldGenerator {
	public async generate(world1: World| null, random2: Random| null, i3: int, i4: int, i5: int):  Promise<boolean> {
		for(let  i6: int = 0; i6 < 10; ++i6) {
			let  i7: int = i3 + random2.nextInt(8) - random2.nextInt(8);
			let  i8: int = i4 + random2.nextInt(4) - random2.nextInt(4);
			let  i9: int = i5 + random2.nextInt(8) - random2.nextInt(8);
			if(await world1.isAirBlock(i7, i8, i9)) {
				let  i10: int = 1 + random2.nextInt(random2.nextInt(3) + 1);

				for(let  i11: int = 0; i11 < i10; ++i11) {
					if(await Block.cactus.canBlockStay(world1, i7, i8 + i11, i9)) {
						await world1.setBlock(i7, i8 + i11, i9, Block.cactus.blockID);
					}
				}
			}
		}

		return true;
	}
}
