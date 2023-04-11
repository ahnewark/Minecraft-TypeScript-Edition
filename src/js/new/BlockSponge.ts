
import { World } from "./World";
import { Material } from "./Material";
import { Block } from "./Block";
import { MaterialRegistry } from "./moved/MaterialRegistry";

export  class BlockSponge extends Block {
	public constructor(i1: number) {
		super(i1, MaterialRegistry.sponge);
		this.blockIndexInTexture = 48;
	}

	public async onBlockAdded(world1: World, i2: number, i3: number, i4: number):  Promise<void> {
		let  b5: number = 2;

		for(let  i6: number = i2 - b5; i6 <= i2 + b5; ++i6) {
			for(let  i7: number = i3 - b5; i7 <= i3 + b5; ++i7) {
				for(let  i8: number = i4 - b5; i8 <= i4 + b5; ++i8) {
					if(await world1.getBlockMaterial(i6, i7, i8) === MaterialRegistry.water) {
						;
					}
				}
			}
		}

	}

	public async onBlockRemoval(world1: World, i2: number, i3: number, i4: number):  Promise<void> {
		let  b5: number = 2;

		for(let  i6: number = i2 - b5; i6 <= i2 + b5; ++i6) {
			for(let  i7: number = i3 - b5; i7 <= i3 + b5; ++i7) {
				for(let  i8: number = i4 - b5; i8 <= i4 + b5; ++i8) {
					await world1.notifyBlocksOfNeighborChange(i6, i7, i8, await world1.getBlockId(i6, i7, i8));
				}
			}
		}
	}
}
