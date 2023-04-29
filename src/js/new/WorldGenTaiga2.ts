


import { java, int, byte } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Random } from "../jree/java/util/Random";
import { Block } from "./Block";

import { BlockRegistry } from './static/BlockRegistry'

export  class WorldGenTaiga2 extends WorldGenerator {
	public async generate(world1: World| undefined, random2: Random| undefined, i3: int, i4: int, i5: int):  Promise<boolean> {
		let  i6: int = random2.nextInt(4) + 6;
		let  i7: int = 1 + random2.nextInt(2);
		let  i8: int = i6 - i7;
		let  i9: int = 2 + random2.nextInt(2);
		let  z10: boolean = true;
		if(i4 >= 1 && i4 + i6 + 1 <= 128) {
			let  i11: int;
			let  i13: int;
			let  i15: int;
			let  i21: int;
			for(i11 = i4; i11 <= i4 + 1 + i6 && z10; ++i11) {
				let  z12: boolean = true;
				if(i11 - i4 < i7) {
					i21 = 0;
				} else {
					i21 = i9;
				}

				for(i13 = i3 - i21; i13 <= i3 + i21 && z10; ++i13) {
					for(let  i14: int = i5 - i21; i14 <= i5 + i21 && z10; ++i14) {
						if(i11 >= 0 && i11 < 128) {
							i15 = await world1.getBlockId(i13, i11, i14);
							if(i15 !== 0 && i15 !== Block.leaves.blockID) {
								z10 = false;
							}
						} else {
							z10 = false;
						}
					}
				}
			}

			if(!z10) {
				return false;
			} else {
				i11 = await world1.getBlockId(i3, i4 - 1, i5);
				if((i11 === Block.grass.blockID || i11 === Block.dirt.blockID) && i4 < 128 - i6 - 1) {
					await world1.setBlock(i3, i4 - 1, i5, Block.dirt.blockID);
					i21 = random2.nextInt(2);
					i13 = 1;
					let  b22: byte = 0;

					let  i16: int;
					let  i17: int;
					for(i15 = 0; i15 <= i8; ++i15) {
						i16 = i4 + i6 - i15;

						for(i17 = i3 - i21; i17 <= i3 + i21; ++i17) {
							let  i18: int = i17 - i3;

							for(let  i19: int = i5 - i21; i19 <= i5 + i21; ++i19) {
								let  i20: int = i19 - i5;
								if((java.lang.Math.abs(i18) !== i21 || java.lang.Math.abs(i20) !== i21 || i21 <= 0) && !Block.opaqueCubeLookup[await world1.getBlockId(i17, i16, i19)]) {
									await world1.setBlockAndMetadata(i17, i16, i19, Block.leaves.blockID, 1);
								}
							}
						}

						if(i21 >= i13) {
							i21 = b22;
							b22 = 1;
							++i13;
							if(i13 > i9) {
								i13 = i9;
							}
						} else {
							++i21;
						}
					}

					i15 = random2.nextInt(3);

					for(i16 = 0; i16 < i6 - i15; ++i16) {
						i17 = await world1.getBlockId(i3, i4 + i16, i5);
						if(i17 === 0 || i17 === Block.leaves.blockID) {
							await world1.setBlockAndMetadata(i3, i4 + i16, i5, Block.wood.blockID, 1);
						}
					}

					return true;
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}
}
