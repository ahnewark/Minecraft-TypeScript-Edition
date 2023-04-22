


import { int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { BlockFlower } from "./BlockFlower";
import { Random } from "../java/util/Random";
import { Block } from "./Block";


export  class WorldGenFlowers extends WorldGenerator {
	private plantBlockId:  int;

	public constructor(i1: int) {
		super();
		this.plantBlockId = i1;
	}

	public async generate(world1: World| undefined, random2: Random | undefined, i3: int, i4: int, i5: int):  Promise<boolean> {
		for(let  i6: int = 0; i6 < 64; ++i6) {
			let  i7: int = i3 + random2.nextInt(8) - random2.nextInt(8);
			let  i8: int = i4 + random2.nextInt(4) - random2.nextInt(4);
			let  i9: int = i5 + random2.nextInt(8) - random2.nextInt(8);
			if(await world1.isAirBlock(i7, i8, i9) && await (Block.blocksList[this.plantBlockId] as BlockFlower).canBlockStay(world1, i7, i8, i9)) {
				await world1.setBlock(i7, i8, i9, this.plantBlockId);
			}
		}

		return true;
	}
}
