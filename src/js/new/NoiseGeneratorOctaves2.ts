


import { NoiseGenerator2 } from "./NoiseGenerator2";
import { NoiseGenerator } from "./NoiseGenerator";
import { Random } from "../java/util/Random";

export  class NoiseGeneratorOctaves2 extends NoiseGenerator {
	private field_4234_a:  NoiseGenerator2[];
	private field_4233_b:  number;

	public constructor(random1: Random, i2: number) {
		super();

        this.field_4233_b = i2;
		this.field_4234_a = new Array<NoiseGenerator2>(i2);

		for(let  i3: number = 0; i3 < i2; ++i3) {
			this.field_4234_a[i3] = new  NoiseGenerator2(random1);
		}
	}

	public func_4112_a(d1: Float64Array, d2: number, d4: number, i6: number, i7: number, d8: number, d10: number, d12: number):  Float64Array {
		return this.func_4111_a(d1, d2, d4, i6, i7, d8, d10, d12, 0.5);
	}

	public func_4111_a(d1: Float64Array, d2: number, d4: number, i6: number, i7: number, d8: number, d10: number, d12: number, d14: number):  Float64Array {
		d8 /= 1.5;
		d10 /= 1.5;
		if(d1 !== null && d1.length >= i6 * i7) {
			for(let  i16: number = 0; i16 < d1.length; ++i16) {
				d1[i16] = 0.0;
			}
		} else {
			d1 = new Float64Array(i6 * i7);
		}

		let  d21: number = 1.0;
		let  d18: number = 1.0;

		for(let  i20: number = 0; i20 < this.field_4233_b; ++i20) {
			this.field_4234_a[i20].func_4157_a(d1, d2, d4, i6, i7, d8 * d18, d10 * d18, 0.55 / d21);
			d18 *= d12;
			d21 *= d14;
		}

		return d1;
	}
}
