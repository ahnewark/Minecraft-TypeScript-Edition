


import { int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Random } from "../java/util/Random";
import { Block } from "./Block";


export  class WorldGenLightStone1 extends WorldGenerator {
	public async generate(world1: World| null, random2: Random| null, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(!world1.isAirBlock(i3, i4, i5)) {
			return false;
		} else if(await world1.getBlockId(i3, i4 + 1, i5) !== Block.bloodStone.blockID) {
			return false;
		} else {
			await world1.setBlockWithNotify(i3, i4, i5, Block.lightStone.blockID);

			for(let  i6: int = 0; i6 < 1500; ++i6) {
				let  i7: int = i3 + random2.nextInt(8) - random2.nextInt(8);
				let  i8: int = i4 - random2.nextInt(12);
				let  i9: int = i5 + random2.nextInt(8) - random2.nextInt(8);
				if(await world1.getBlockId(i7, i8, i9) === 0) {
					let  i10: int = 0;

					for(let  i11: int = 0; i11 < 6; ++i11) {
						let  i12: int = 0;
						if(i11 === 0) {
							i12 = await world1.getBlockId(i7 - 1, i8, i9);
						}

						if(i11 === 1) {
							i12 = await world1.getBlockId(i7 + 1, i8, i9);
						}

						if(i11 === 2) {
							i12 = await world1.getBlockId(i7, i8 - 1, i9);
						}

						if(i11 === 3) {
							i12 = await world1.getBlockId(i7, i8 + 1, i9);
						}

						if(i11 === 4) {
							i12 = await world1.getBlockId(i7, i8, i9 - 1);
						}

						if(i11 === 5) {
							i12 = await world1.getBlockId(i7, i8, i9 + 1);
						}

						if(i12 === Block.lightStone.blockID) {
							++i10;
						}
					}

					if(i10 === 1) {
						await world1.setBlockWithNotify(i7, i8, i9, Block.lightStone.blockID);
					}
				}
			}

			return true;
		}
	}
}
