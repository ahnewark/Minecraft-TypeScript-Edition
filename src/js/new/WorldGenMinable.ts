


import { java } from "jree";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { Random } from "../java/util/Random";
import { Block } from "./Block";

export  class WorldGenMinable extends WorldGenerator {
	private minableBlockId:  number;
	private numberOfBlocks:  number;

	public constructor(i1: number, i2: number) {
		super();
        this.minableBlockId = i1;
		this.numberOfBlocks = i2;
	}

	public generate(world1: World, random2: Random, i3: number, i4: number, i5: number):  boolean {
		let  f6: number = random2.nextFloat() * java.lang.Math.PI as number;
		let  d7: number = ((i3 + 8) as number + MathHelper.sin(f6) * this.numberOfBlocks as number / 8.0) as number;
		let  d9: number = ((i3 + 8) as number - MathHelper.sin(f6) * this.numberOfBlocks as number / 8.0) as number;
		let  d11: number = ((i5 + 8) as number + MathHelper.cos(f6) * this.numberOfBlocks as number / 8.0) as number;
		let  d13: number = ((i5 + 8) as number - MathHelper.cos(f6) * this.numberOfBlocks as number / 8.0) as number;
		let  d15: number = (i4 + random2.nextInt(3) + 2) as number;
		let  d17: number = (i4 + random2.nextInt(3) + 2) as number;

		for(let  i19: number = 0; i19 <= this.numberOfBlocks; ++i19) {
			let  d20: number = d7 + (d9 - d7) * i19 as number / this.numberOfBlocks as number;
			let  d22: number = d15 + (d17 - d15) * i19 as number / this.numberOfBlocks as number;
			let  d24: number = d11 + (d13 - d11) * i19 as number / this.numberOfBlocks as number;
			let  d26: number = random2.nextDouble() * this.numberOfBlocks as number / 16.0;
			let  d28: number = (MathHelper.sin(i19 as number * java.lang.Math.PI as number / this.numberOfBlocks as number) + 1.0) as number * d26 + 1.0;
			let  d30: number = (MathHelper.sin(i19 as number * java.lang.Math.PI as number / this.numberOfBlocks as number) + 1.0) as number * d26 + 1.0;
			let  i32: number = (d20 - d28 / 2.0) as number;
			let  i33: number = (d22 - d30 / 2.0) as number;
			let  i34: number = (d24 - d28 / 2.0) as number;
			let  i35: number = (d20 + d28 / 2.0) as number;
			let  i36: number = (d22 + d30 / 2.0) as number;
			let  i37: number = (d24 + d28 / 2.0) as number;

			for(let  i38: number = i32; i38 <= i35; ++i38) {
				let  d39: number = (i38 as number + 0.5 - d20) / (d28 / 2.0);
				if(d39 * d39 < 1.0) {
					for(let  i41: number = i33; i41 <= i36; ++i41) {
						let  d42: number = (i41 as number + 0.5 - d22) / (d30 / 2.0);
						if(d39 * d39 + d42 * d42 < 1.0) {
							for(let  i44: number = i34; i44 <= i37; ++i44) {
								let  d45: number = (i44 as number + 0.5 - d24) / (d28 / 2.0);
								if(d39 * d39 + d42 * d42 + d45 * d45 < 1.0 && world1.getBlockId(i38, i41, i44) === Block.stone.blockID) {
									world1.setBlock(i38, i41, i44, this.minableBlockId);
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
