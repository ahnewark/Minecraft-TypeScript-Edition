import { int, java } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { Block } from "./Block";
import { BlockFluids } from "./BlockFluids";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";

export  class BlockStationary extends BlockFluids {
	public constructor(i1: int, material2: Material| null) {
		super(i1, material2);
		this.setTickOnLoad(false);
		if(material2 === MaterialRegistry.lava) {
			this.setTickOnLoad(true);
		}

	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await super.onNeighborBlockChange(world1, i2, i3, i4, i5);
		if(await world1.getBlockId(i2, i3, i4) === this.blockID) {
			await this.func_20016_j(world1, i2, i3, i4);
		}

	}

	private async func_20016_j(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		world1.field_1043_h = true;
		await world1.setBlockAndMetadata(i2, i3, i4, this.blockID - 1, i5);
		world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
		await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID - 1);
		world1.field_1043_h = false;
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random | null):  Promise<void> {
		if(this.blockMaterial === MaterialRegistry.lava) {
			let  i6: int = random5.nextInt(3);

			for(let  i7: int = 0; i7 < i6; ++i7) {
				i2 += random5.nextInt(3) - 1;
				++i3;
				i4 += random5.nextInt(3) - 1;
				let  i8: int = await world1.getBlockId(i2, i3, i4);
				if(i8 === 0) {
					if(await this.func_301_k(world1, i2 - 1, i3, i4) || await this.func_301_k(world1, i2 + 1, i3, i4) || await this.func_301_k(world1, i2, i3, i4 - 1) || await this.func_301_k(world1, i2, i3, i4 + 1) || await this.func_301_k(world1, i2, i3 - 1, i4) || await this.func_301_k(world1, i2, i3 + 1, i4)) {
						await world1.setBlockWithNotify(i2, i3, i4, Block.fire.blockID);
						return;
					}
				} else if(Block.blocksList[i8].blockMaterial.getIsSolid()) {
					return;
				}
			}
		}

	}

	private async func_301_k(world1: World| null, i2: int, i3: int, i4: int): Promise<boolean> {
		return (await world1.getBlockMaterial(i2, i3, i4)).getBurning();
	}
}
