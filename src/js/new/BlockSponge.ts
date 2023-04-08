
import { World } from "./World";
import { Material } from "./Material";
import { Block } from "./Block";

export  class BlockSponge extends Block {
	protected constructor(i1: number) {
		super(i1, Material.sponge);
		this.blockIndexInTexture = 48;
	}

	public onBlockAdded(world1: World, i2: number, i3: number, i4: number):  void {
		let  b5: number = 2;

		for(let  i6: number = i2 - b5; i6 <= i2 + b5; ++i6) {
			for(let  i7: number = i3 - b5; i7 <= i3 + b5; ++i7) {
				for(let  i8: number = i4 - b5; i8 <= i4 + b5; ++i8) {
					if(world1.getBlockMaterial(i6, i7, i8) === Material.water) {
						;
					}
				}
			}
		}

	}

	public onBlockRemoval(world1: World, i2: number, i3: number, i4: number):  void {
		let  b5: number = 2;

		for(let  i6: number = i2 - b5; i6 <= i2 + b5; ++i6) {
			for(let  i7: number = i3 - b5; i7 <= i3 + b5; ++i7) {
				for(let  i8: number = i4 - b5; i8 <= i4 + b5; ++i8) {
					world1.notifyBlocksOfNeighborChange(i6, i7, i8, world1.getBlockId(i6, i7, i8));
				}
			}
		}
	}
}
