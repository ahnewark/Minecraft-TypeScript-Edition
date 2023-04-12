


import { java, int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Random } from "../java/util/Random";
import { Block } from "./Block";
import { Block } from "./Block";



export  class WorldGenTaiga1 extends WorldGenerator {
	public async generate(world1: World| undefined, random2: Random| undefined, i3: int, i4: int, i5: int):  Promise<boolean> {
		let  i6: int = random2.nextInt(5) + 7;
		let  i7: int = i6 - random2.nextInt(2) - 3;
		let  i8: int = i6 - i7;
		let  i9: int = 1 + random2.nextInt(i8 + 1);
		let  z10: boolean = true;
		if(i4 >= 1 && i4 + i6 + 1 <= 128) {
			let  i11: int;
			let  i13: int;
			let  i14: int;
			let  i15: int;
			let  i18: int;
			for(i11 = i4; i11 <= i4 + 1 + i6 && z10; ++i11) {
				let  z12: boolean = true;
				if(i11 - i4 < i7) {
					i18 = 0;
				} else {
					i18 = i9;
				}

				for(i13 = i3 - i18; i13 <= i3 + i18 && z10; ++i13) {
					for(i14 = i5 - i18; i14 <= i5 + i18 && z10; ++i14) {
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
					i18 = 0;

					for(i13 = i4 + i6; i13 >= i4 + i7; --i13) {
						for(i14 = i3 - i18; i14 <= i3 + i18; ++i14) {
							i15 = i14 - i3;

							for(let  i16: int = i5 - i18; i16 <= i5 + i18; ++i16) {
								let  i17: int = i16 - i5;
								if((java.lang.Math.abs(i15) !== i18 || java.lang.Math.abs(i17) !== i18 || i18 <= 0) && !Block.opaqueCubeLookup[await world1.getBlockId(i14, i13, i16)]) {
									await world1.setBlockAndMetadata(i14, i13, i16, Block.leaves.blockID, 1);
								}
							}
						}

						if(i18 >= 1 && i13 === i4 + i7 + 1) {
							--i18;
						} else if(i18 < i9) {
							++i18;
						}
					}

					for(i13 = 0; i13 < i6 - 1; ++i13) {
						i14 = await world1.getBlockId(i3, i4 + i13, i5);
						if(i14 === 0 || i14 === Block.leaves.blockID) {
							await world1.setBlockAndMetadata(i3, i4 + i13, i5, Block.wood.blockID, 1);
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
