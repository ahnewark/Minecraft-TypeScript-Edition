


import { int, java, float, double } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { BlockRegistry } from "./moved/BlockRegistry";
import { Random } from "../java/util/Random";
import { MaterialRegistry } from "./moved/MaterialRegistry";

export  class WorldGenClay extends WorldGenerator {
	private clayBlockId:  int = BlockRegistry.blockClay.blockID;
	private numberOfBlocks:  int;

	public constructor(i1: int) {
		super();
		this.numberOfBlocks = i1;
	}

	public async generate(world1: World| null, random2: Random | null, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(await world1.getBlockMaterial(i3, i4, i5) !== MaterialRegistry.water) {
			return false;
		} else {
			let  f6: float = random2.nextFloat() * java.lang.Math.PI;
			let  d7: double = ((i3 + 8) + MathHelper.sin(f6) * this.numberOfBlocks / 8.0);
			let  d9: double = ((i3 + 8) - MathHelper.sin(f6) * this.numberOfBlocks / 8.0);
			let  d11: double = ((i5 + 8) + MathHelper.cos(f6) * this.numberOfBlocks / 8.0);
			let  d13: double = ((i5 + 8) - MathHelper.cos(f6) * this.numberOfBlocks / 8.0);
			let  d15: double = (i4 + random2.nextInt(3) + 2);
			let  d17: double = (i4 + random2.nextInt(3) + 2);

			for(let  i19: int = 0; i19 <= this.numberOfBlocks; ++i19) {
				let  d20: double = d7 + (d9 - d7) * i19 / this.numberOfBlocks;
				let  d22: double = d15 + (d17 - d15) * i19 / this.numberOfBlocks;
				let  d24: double = d11 + (d13 - d11) * i19 / this.numberOfBlocks;
				let  d26: double = random2.nextDouble() * this.numberOfBlocks / 16.0;
				let  d28: double = (MathHelper.sin(i19 * java.lang.Math.PI / this.numberOfBlocks) + 1.0) * d26 + 1.0;
				let  d30: double = (MathHelper.sin(i19 * java.lang.Math.PI / this.numberOfBlocks) + 1.0) * d26 + 1.0;

				for(let  i32: int = (d20 - d28 / 2.0) as int; i32 <= (d20 + d28 / 2.0); ++i32) {
					for(let  i33: int = (d22 - d30 / 2.0) as int; i33 <= (d22 + d30 / 2.0); ++i33) {
						for(let  i34: int = (d24 - d28 / 2.0) as int; i34 <= (d24 + d28 / 2.0); ++i34) {
							let  d35: double = (i32 + 0.5 - d20) / (d28 / 2.0);
							let  d37: double = (i33 + 0.5 - d22) / (d30 / 2.0);
							let  d39: double = (i34 + 0.5 - d24) / (d28 / 2.0);
							if(d35 * d35 + d37 * d37 + d39 * d39 < 1.0) {
								let  i41: int = await world1.getBlockId(i32, i33, i34);
								if(i41 === BlockRegistry.sand.blockID) {
									await world1.setBlock(i32, i33, i34, this.clayBlockId);
								}
							}
						}
					}
				}
			}

			return true;
		}
	}
}
