import { Random } from "../java/util/Random";
import { IllegalArgumentException } from "../jree/java/lang/IllegalArgumentException";
import { JavaMath } from "../jree/java/lang/Math";
import { S } from "../jree/templates";


export class NoiseGenerator2 {
	private static field_4296_d:  number[][] = ([[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]]);
	private field_4295_e:  Int32Array;
	public field_4292_a:  number;
	public field_4291_b:  number;
	public field_4297_c:  number;
	private static readonly field_4294_f:  number = 0.5 * (JavaMath.sqrt(3.0) - 1.0);
	private static readonly field_4293_g:  number = (3.0 - JavaMath.sqrt(3.0)) / 6.0;

	public constructor();

	public constructor(random1: Random);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
		        return new NoiseGenerator2(new Random());
			}

			case 1: {
				const [random1] = args as [Random];
                this.field_4295_e = new Int32Array(512);
                this.field_4292_a = random1.nextDouble() * 256.0;
                this.field_4291_b = random1.nextDouble() * 256.0;
                this.field_4297_c = random1.nextDouble() * 256.0;

                let  i2: number;
                for(i2 = 0; i2 < 256; this.field_4295_e[i2] = i2++) {
                }

                for(i2 = 0; i2 < 256; ++i2) {
                    let  i3: number = random1.nextInt(256 - i2) + i2;
                    let  i4: number = this.field_4295_e[i2];
                    this.field_4295_e[i2] = this.field_4295_e[i3];
                    this.field_4295_e[i3] = i4;
                    this.field_4295_e[i2 + 256] = this.field_4295_e[i2];
                }

				break;
			}

			default: {
				throw new IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	private static wrap(d0: number):  number {
		return d0 > 0.0 ? d0 as number : d0 as number - 1;
	}

	private static func_4156_a(i0: number[], d1: number, d3: number):  number {
		return i0[0] as number * d1 + i0[1] as number * d3;
	}

	public func_4157_a(d1: Float64Array, d2: number, d4: number, i6: number, i7: number, d8: number, d10: number, d12: number):  void {
		let  i14: number = 0;

		for(let  i15: number = 0; i15 < i6; ++i15) {
			let  d16: number = (d2 + i15 as number) * d8 + this.field_4292_a;

			for(let  i18: number = 0; i18 < i7; ++i18) {
				let  d19: number = (d4 + i18 as number) * d10 + this.field_4291_b;
				let  d27: number = (d16 + d19) * NoiseGenerator2.field_4294_f;
				let  i29: number = NoiseGenerator2.wrap(d16 + d27);
				let  i30: number = NoiseGenerator2.wrap(d19 + d27);
				let  d31: number = (i29 + i30) as number * NoiseGenerator2.field_4293_g;
				let  d33: number = i29 as number - d31;
				let  d35: number = i30 as number - d31;
				let  d37: number = d16 - d33;
				let  d39: number = d19 - d35;
				let  b41: number;
				let  b42: number;
				if(d37 > d39) {
					b41 = 1;
					b42 = 0;
				} else {
					b41 = 0;
					b42 = 1;
				}

				let  d43: number = d37 - b41 as number + NoiseGenerator2.field_4293_g;
				let  d45: number = d39 - b42 as number + NoiseGenerator2.field_4293_g;
				let  d47: number = d37 - 1.0 + 2.0 * NoiseGenerator2.field_4293_g;
				let  d49: number = d39 - 1.0 + 2.0 * NoiseGenerator2.field_4293_g;
				let  i51: number = i29 & 255;
				let  i52: number = i30 & 255;
				let  i53: number = this.field_4295_e[i51 + this.field_4295_e[i52]] % 12;
				let  i54: number = this.field_4295_e[i51 + b41 + this.field_4295_e[i52 + b42]] % 12;
				let  i55: number = this.field_4295_e[i51 + 1 + this.field_4295_e[i52 + 1]] % 12;
				let  d56: number = 0.5 - d37 * d37 - d39 * d39;
				let  d21: number;
				if(d56 < 0.0) {
					d21 = 0.0;
				} else {
					d56 *= d56;
					d21 = d56 * d56 * NoiseGenerator2.func_4156_a(NoiseGenerator2.field_4296_d[i53], d37, d39);
				}

				let  d58: number = 0.5 - d43 * d43 - d45 * d45;
				let  d23: number;
				if(d58 < 0.0) {
					d23 = 0.0;
				} else {
					d58 *= d58;
					d23 = d58 * d58 * NoiseGenerator2.func_4156_a(NoiseGenerator2.field_4296_d[i54], d43, d45);
				}

				let  d60: number = 0.5 - d47 * d47 - d49 * d49;
				let  d25: number;
				if(d60 < 0.0) {
					d25 = 0.0;
				} else {
					d60 *= d60;
					d25 = d60 * d60 * NoiseGenerator2.func_4156_a(NoiseGenerator2.field_4296_d[i55], d47, d49);
				}

				let  i10001: number = i14++;
				d1[i10001] += 70.0 * (d21 + d23 + d25) * d12;
			}
		}

	}
}
