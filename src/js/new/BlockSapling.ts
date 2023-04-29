


import { int, float, java } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { WorldGenTrees } from "./WorldGenTrees";
import { WorldGenBigTree } from "./WorldGenBigTree";
import { World } from "./World";
import { BlockFlower } from "./BlockFlower";
import { Random } from "../jree/java/util/Random";

export  class BlockSapling extends BlockFlower {
	public constructor(i1: int, i2: int) {
		super(i1, i2);
		let  f3: float = 0.4;
		this.setBlockBounds(0.5 - f3, 0.0, 0.5 - f3, 0.5 + f3, f3 * 2.0, 0.5 + f3);
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		await super.updateTick(world1, i2, i3, i4, random5);
		if(await world1.getBlockLightValue(i2, i3 + 1, i4) >= 9 && random5.nextInt(5) === 0) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			if(i6 < 15) {
				await world1.setBlockMetadataWithNotify(i2, i3, i4, i6 + 1);
			} else {
				await this.func_21028_c(world1, i2, i3, i4, random5);
			}
		}

	}

	public async func_21028_c(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		await world1.setBlock(i2, i3, i4, 0);
		let  object6 = new  WorldGenTrees();
		if(random5.nextInt(10) === 0) {
			object6 = new  WorldGenBigTree();
		}

		if(!await (object6 as WorldGenerator).generate(world1, random5, i2, i3, i4)) {
			await world1.setBlock(i2, i3, i4, this.blockID);
		}

	}
}
