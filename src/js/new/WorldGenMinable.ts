import { java } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { Random } from "../jree/java/util/Random";
import { Block } from "./Block";

export  class WorldGenMinable extends WorldGenerator {
	private minableBlockId:  number;
	private numberOfBlocks:  number;

	public constructor(i1: number, i2: number) {
		super();
        this.minableBlockId = i1;
		this.numberOfBlocks = i2;
	}

	public async generate(world1: World, random2: Random, i3: number, i4: number, i5: number):  Promise<boolean> {
		let  f6: number = random2.nextFloat() * java.lang.Math.PI ;
		let  d7: number = ((i3 + 8)  + MathHelper.sin(f6) * this.numberOfBlocks  / 8.0) ;
		let  d9: number = ((i3 + 8)  - MathHelper.sin(f6) * this.numberOfBlocks  / 8.0) ;
		let  d11: number = ((i5 + 8)  + MathHelper.cos(f6) * this.numberOfBlocks  / 8.0) ;
		let  d13: number = ((i5 + 8)  - MathHelper.cos(f6) * this.numberOfBlocks  / 8.0) ;
		let  d15: number = (i4 + random2.nextInt(3) + 2) ;
		let  d17: number = (i4 + random2.nextInt(3) + 2) ;

		for(let  i19: number = 0; i19 <= this.numberOfBlocks; ++i19) {
			let  d20: number = d7 + (d9 - d7) * i19  / this.numberOfBlocks ;
			let  d22: number = d15 + (d17 - d15) * i19  / this.numberOfBlocks ;
			let  d24: number = d11 + (d13 - d11) * i19  / this.numberOfBlocks ;
			let  d26: number = random2.nextDouble() * this.numberOfBlocks  / 16.0;
			let  d28: number = (MathHelper.sin(i19  * java.lang.Math.PI  / this.numberOfBlocks ) + 1.0)  * d26 + 1.0;
			let  d30: number = (MathHelper.sin(i19  * java.lang.Math.PI  / this.numberOfBlocks ) + 1.0)  * d26 + 1.0;
			let  i32: number = Math.floor(d20 - d28 / 2.0) ;
			let  i33: number = Math.floor(d22 - d30 / 2.0) ;
			let  i34: number = Math.floor(d24 - d28 / 2.0) ;
			let  i35: number = Math.floor(d20 + d28 / 2.0) ;
			let  i36: number = Math.floor(d22 + d30 / 2.0) ;
			let  i37: number = Math.floor(d24 + d28 / 2.0) ;

			for(let  i38: number = i32; i38 <= i35; ++i38) {
				let  d39: number = (i38  + 0.5 - d20) / (d28 / 2.0);
				if(d39 * d39 < 1.0) {
					for(let  i41: number = i33; i41 <= i36; ++i41) {
						let  d42: number = (i41  + 0.5 - d22) / (d30 / 2.0);
						if(d39 * d39 + d42 * d42 < 1.0) {
							for(let  i44: number = i34; i44 <= i37; ++i44) {
								let  d45: number = (i44  + 0.5 - d24) / (d28 / 2.0);
								if(d39 * d39 + d42 * d42 + d45 * d45 < 1.0 && (await world1.getBlockId(i38, i41, i44)) === Block.stone.blockID) {
									await world1.setBlock(i38, i41, i44, this.minableBlockId);
								}
							}
						}
					}
				}
			}
		}

		return true;
	}
}
