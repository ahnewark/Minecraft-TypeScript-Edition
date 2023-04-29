import { int, byte } from "../jree/index";
import { World } from "./World";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../jree/java/util/Random";

export  class BlockLog extends Block {
	public constructor(i1: int) {
		super(i1, MaterialRegistry.wood);
		this.blockIndexInTexture = 20;
	}

	public quantityDropped(random1: Random| undefined):  int {
		return 1;
	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return Block.wood.blockID;
	}

	public async onBlockRemoval(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  b5: byte = 4;
		let  i6: int = b5 + 1;
		if(world1.checkChunksExist(i2 - i6, i3 - i6, i4 - i6, i2 + i6, i3 + i6, i4 + i6)) {
			for(let  i7: int = -b5; i7 <= b5; ++i7) {
				for(let  i8: int = -b5; i8 <= b5; ++i8) {
					for(let  i9: int = -b5; i9 <= b5; ++i9) {
						let  i10: int = await world1.getBlockId(i2 + i7, i3 + i8, i4 + i9);
						if(i10 === Block.leaves.blockID) {
							let  i11: int = await world1.getBlockMetadata(i2 + i7, i3 + i8, i4 + i9);
							if((i11 & 4) === 0) {
								await world1.setBlockMetadata(i2 + i7, i3 + i8, i4 + i9, i11 | 4);
							}
						}
					}
				}
			}
		}

	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return i1 === 1 ? 21 : (i1 === 0 ? 21 : (i2 === 1 ? 116 : (i2 === 2 ? 117 : 20)));
	}

	protected damageDropped(i1: int):  int {
		return i1;
	}
}
