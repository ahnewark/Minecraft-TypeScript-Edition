import { int, double, java, B } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { Block } from "./Block";
import { ColorizerGrass } from "./ColorizerGrass";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";

export  class BlockGrass extends Block {
	public constructor(i1: int) {
		super(i1, MaterialRegistry.ground);
		this.blockIndexInTexture = 3;
		this.setTickOnLoad(true);
	}

	public async getBlockTexture(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int): Promise<int> {
		if(i5 === 1) {
			return 0;
		} else if(i5 === 0) {
			return 2;
		} else {
			let  material6: Material = await iBlockAccess1.getBlockMaterial(i2, i3 + 1, i4);
			return material6 !== MaterialRegistry.snow && material6 !== MaterialRegistry.builtSnow ? 3 : 68;
		}
	}

	public async colorMultiplier(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<int> {
		iBlockAccess1.getWorldChunkManager().func_4069_a(i2, i4, 1, 1);
		let  d5: double = iBlockAccess1.getWorldChunkManager().temperature[0];
		let  d7: double = iBlockAccess1.getWorldChunkManager().humidity[0];
		return ColorizerGrass.func_4147_a(d5, d7);
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(!world1.multiplayerWorld) {
			if(await world1.getBlockLightValue(i2, i3 + 1, i4) < 4 && (await world1.getBlockMaterial(i2, i3 + 1, i4)).getCanBlockGrass()) {
				if(random5.nextInt(4) !== 0) {
					return;
				}

				await world1.setBlockWithNotify(i2, i3, i4, Block.dirt.blockID);
			} else if(await world1.getBlockLightValue(i2, i3 + 1, i4) >= 9) {
				let  i6: int = i2 + random5.nextInt(3) - 1;
				let  i7: int = i3 + random5.nextInt(5) - 3;
				let  i8: int = i4 + random5.nextInt(3) - 1;
				if(await world1.getBlockId(i6, i7, i8) === Block.dirt.blockID && await world1.getBlockLightValue(i6, i7 + 1, i8) >= 4 && !(await world1.getBlockMaterial(i6, i7 + 1, i8)).getCanBlockGrass()) {
					await world1.setBlockWithNotify(i6, i7, i8, Block.grass.blockID);
				}
			}

		}
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return Block.dirt.idDropped(0, random2);
	}
}
