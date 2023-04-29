


import { NoiseGeneratorPerlin } from "./NoiseGeneratorPerlin";
import { NoiseGenerator } from "./NoiseGenerator";
import { Random } from "../jree/java/util/Random";

export  class NoiseGeneratorOctaves extends NoiseGenerator {
	private generatorCollection:  NoiseGeneratorPerlin[];
	private field_1191_b:  number;

	public constructor(random1: Random, i2: number) {
		super();
		this.field_1191_b = i2;
		this.generatorCollection = new Array<NoiseGeneratorPerlin>(i2);

		for(let  i3: number = 0; i3 < i2; ++i3) {
			this.generatorCollection[i3] = new  NoiseGeneratorPerlin(random1);
		}

	}

	public func_806_a(d1: number, d3: number):  number {
		let  d5: number = 0.0;
		let  d7: number = 1.0;

		for(let  i9: number = 0; i9 < this.field_1191_b; ++i9) {
			d5 += this.generatorCollection[i9].func_801_a(d1 * d7, d3 * d7) / d7;
			d7 /= 2.0;
		}

		return d5;
	}

	public generateNoiseOctaves(d1: number[], d2: number, d4: number, d6: number, i8: number, i9: number, i10: number, d11: number, d13: number, d15: number):  number[] {
		if(!d1) {
			d1 = new  Array<number>(i8 * i9 * i10).fill(0);
		} else {
			d1.fill(0);
		}

		let  d20: number = 1.0;

		for(let  i19: number = 0; i19 < this.field_1191_b; ++i19) {
			this.generatorCollection[i19].func_805_a(d1, d2, d4, d6, i8, i9, i10, d11 * d20, d13 * d20, d15 * d20, d20);
			d20 /= 2.0;
		}

		return d1;
	}

	public func_4109_a(d1: number[], i2: number, i3: number, i4: number, i5: number, d6: number, d8: number, d10: number):  number[] {
		return this.generateNoiseOctaves(d1, i2 as number, 10.0, i3 as number, i4, 1, i5, d6, 1.0, d8);
	}
}
