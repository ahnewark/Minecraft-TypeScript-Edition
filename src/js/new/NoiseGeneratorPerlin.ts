


import {  java, S } from "../jree/index";
import { Random } from "../jree/java/util/Random";
import { NoiseGenerator } from "./NoiseGenerator";

export  class NoiseGeneratorPerlin extends NoiseGenerator {
	private permutations:  number[];
	public xCoord:  number;
	public yCoord:  number;
	public zCoord:  number;

	public constructor();

	public constructor(random1: Random);
    public constructor(...args: unknown[]) {
		let random: Random;
		switch (args.length) {
			case 0: {
				random = new Random();
				super();
				break;
			}

			case 1: {
				const [random1] = args as [Random];
				random = random1;
				super();
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}

		this.permutations = new   Array<number>(512).fill(0);
		this.xCoord = random.nextDouble() * 256.0;
		this.yCoord = random.nextDouble() * 256.0;
		this.zCoord = random.nextDouble() * 256.0;

		let  i2: number;
		for(i2 = 0; i2 < 256; this.permutations[i2] = i2++) {
		}

		for(i2 = 0; i2 < 256; ++i2) {
			let  i3: number = random.nextInt(256 - i2) + i2;
			let  i4: number = this.permutations[i2];
			this.permutations[i2] = this.permutations[i3];
			this.permutations[i3] = i4;
			this.permutations[i2 + 256] = this.permutations[i2];
		}
	}


	public generateNoise(d1: number, d3: number, d5: number):  number {
		let  d7: number = d1 + this.xCoord;
		let  d9: number = d3 + this.yCoord;
		let  d11: number = d5 + this.zCoord;
		let  i13: number = d7 as number;
		let  i14: number = d9 as number;
		let  i15: number = d11 as number;
		if(d7 < i13) {
			--i13;
		}

		if(d9 < i14) {
			--i14;
		}

		if(d11 < i15) {
			--i15;
		}

		let  i16: number = i13 & 255;
		let  i17: number = i14 & 255;
		let  i18: number = i15 & 255;
		d7 -= i13 as number;
		d9 -= i14 as number;
		d11 -= i15 as number;
		let  d19: number = d7 * d7 * d7 * (d7 * (d7 * 6.0 - 15.0) + 10.0);
		let  d21: number = d9 * d9 * d9 * (d9 * (d9 * 6.0 - 15.0) + 10.0);
		let  d23: number = d11 * d11 * d11 * (d11 * (d11 * 6.0 - 15.0) + 10.0);
		let  i25: number = this.permutations[i16] + i17;
		let  i26: number = this.permutations[i25] + i18;
		let  i27: number = this.permutations[i25 + 1] + i18;
		let  i28: number = this.permutations[i16 + 1] + i17;
		let  i29: number = this.permutations[i28] + i18;
		let  i30: number = this.permutations[i28 + 1] + i18;
		return this.lerp(d23, this.lerp(d21, this.lerp(d19, this.grad(this.permutations[i26], d7, d9, d11), this.grad(this.permutations[i29], d7 - 1.0, d9, d11)), this.lerp(d19, this.grad(this.permutations[i27], d7, d9 - 1.0, d11), this.grad(this.permutations[i30], d7 - 1.0, d9 - 1.0, d11))), this.lerp(d21, this.lerp(d19, this.grad(this.permutations[i26 + 1], d7, d9, d11 - 1.0), this.grad(this.permutations[i29 + 1], d7 - 1.0, d9, d11 - 1.0)), this.lerp(d19, this.grad(this.permutations[i27 + 1], d7, d9 - 1.0, d11 - 1.0), this.grad(this.permutations[i30 + 1], d7 - 1.0, d9 - 1.0, d11 - 1.0))));
	}

	// public lerp(d1: number, d3: number, d5: number):  number {
	// 	return d3 + d1 * (d5 - d3);
	// }

	public func_4110_a(i1: number, d2: number, d4: number):  number {
		let  i6: number = i1 & 15;
		let  d7: number = (1 - ((i6 & 8) >> 3)) as number * d2;
		let  d9: number = i6 < 4 ? 0.0 : (i6 !== 12 && i6 !== 14 ? d4 : d2);
		return ((i6 & 1) === 0 ? d7 : -d7) + ((i6 & 2) === 0 ? d9 : -d9);
	}

	// public grad(i1: number, d2: number, d4: number, d6: number):  number {
	// 	let  i8: number = i1 & 15;
	// 	let  d9: number = i8 < 8 ? d2 : d4;
	// 	let  d11: number = i8 < 4 ? d4 : (i8 !== 12 && i8 !== 14 ? d6 : d2);
	// 	return ((i8 & 1) === 0 ? d9 : -d9) + ((i8 & 2) === 0 ? d11 : -d11);
	// }

	public lerp(x: number, a: number, b: number): number {
        return a + x * (b - a);
    }

    public grad(hash: number, x: number, y: number, z: number): number {
        let h = hash & 15;                                    // Take the hashed value and take the first 4 bits of it (15 == 0b1111)
        let u = h < 8 /* 0b1000 */ ? x : y;                // If the most significant bit (MSB) of the hash is 0 then set u = x.  Otherwise y.

        let v;                                             // In Ken Perlin's original implementation this was another conditional operator (?:).  I
        // expanded it for readability.
        if (h < 4 /* 0b0100 */)                                // If the first and second significant bits are 0 set v = y
            v = y;
        else if (h === 12 /* 0b1100 */ || h === 14 /* 0b1110*/)  // If the first and second significant bits are 1 set v = x
            v = x;
        else                                                  // If the first and second significant bits are not equal (0/1, 1/0) set v = z
            v = z;

        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v); // Use the last 2 bits to decide if u and v are positive or negative.  Then return their addition.
    }

	public func_801_a(d1: number, d3: number):  number {
		return this.generateNoise(d1, d3, 0.0);
	}

	public func_805_a(d1: number[], d2: number, d4: number, d6: number, i8: number, i9: number, i10: number, d11: number, d13: number, d15: number, d17: number):  void {
		let  i10001: number;
		let  i19: number;
		let  i22: number;
		let  d31: number;
		let  d35: number;
		let  i37: number;
		let  d38: number;
		let  i40: number;
		let  i41: number;
		let  d42: number;
		let  i75: number;
		if(i9 === 1) {
			let  z64: boolean = false;
			let  z65: boolean = false;
			let  z21: boolean = false;
			let  z68: boolean = false;
			let  d70: number = 0.0;
			let  d73: number = 0.0;
			i75 = 0;
			let  d77: number = 1.0 / d17;

			for(let  i30: number = 0; i30 < i8; ++i30) {
				d31 = (d2 + i30) * d11 + this.xCoord;
				let  i78: number = Math.floor(d31);
				if(d31 < i78) {
					--i78;
				}

				let  i34: number = i78 & 255;
				d31 -= i78;
				d35 = d31 * d31 * d31 * (d31 * (d31 * 6.0 - 15.0) + 10.0);

				for(i37 = 0; i37 < i10; ++i37) {
					d38 = (d6 + i37) * d15 + this.zCoord;
					i40 = Math.floor(d38);
					if(d38 < i40) {
						--i40;
					}

					i41 = i40 & 255;
					d38 -= i40;
					d42 = d38 * d38 * d38 * (d38 * (d38 * 6.0 - 15.0) + 10.0);
					i19 = this.permutations[i34] + 0;
					let  i66: number = this.permutations[i19] + i41;
					let  i67: number = this.permutations[i34 + 1] + 0;
					i22 = this.permutations[i67] + i41;
					d70 = this.lerp(d35, this.func_4110_a(this.permutations[i66], d31, d38), this.grad(this.permutations[i22], d31 - 1.0, 0.0, d38));
					d73 = this.lerp(d35, this.grad(this.permutations[i66 + 1], d31, 0.0, d38 - 1.0), this.grad(this.permutations[i22 + 1], d31 - 1.0, 0.0, d38 - 1.0));
					let  d79: number = this.lerp(d42, d70, d73);

					i10001 = i75++;
					d1[i10001] += d79 * d77;
				}
			}

		} else {
			i19 = 0;
			let  d20: number = 1.0 / d17;
			i22 = -1;
			let  z23: boolean = false;
			let  z24: boolean = false;
			let  z25: boolean = false;
			let  z26: boolean = false;
			let  z27: boolean = false;
			let  z28: boolean = false;
			let  d29: number = 0.0;
			d31 = 0.0;
			let  d33: number = 0.0;
			d35 = 0.0;

			for(i37 = 0; i37 < i8; ++i37) {
				d38 = (d2 + i37 as number) * d11 + this.xCoord;
				i40 = Math.floor(d38);
				if(d38 < i40) {
					--i40;
				}

				i41 = i40 & 255;
				d38 -= i40;
				d42 = d38 * d38 * d38 * (d38 * (d38 * 6.0 - 15.0) + 10.0);

				for(let  i44: number = 0; i44 < i10; ++i44) {
					let  d45: number = (d6 + i44 as number) * d15 + this.zCoord;
					let  i47: number = Math.floor(d45);
					if(d45 < i47) {
						--i47;
					}

					let  i48: number = Math.floor(i47 & 255);
					d45 -= i47 as number;
					let  d49: number = d45 * d45 * d45 * (d45 * (d45 * 6.0 - 15.0) + 10.0);

					for(let  i51: number = 0; i51 < i9; ++i51) {
						let  d52: number = (d4 + i51 as number) * d13 + this.yCoord;
						let  i54: number = Math.floor(d52);
						if(d52 < i54) {
							--i54;
						}

						let  i55: number = Math.floor(i54 & 255);
						d52 -= i54 as number;
						let  d56: number = d52 * d52 * d52 * (d52 * (d52 * 6.0 - 15.0) + 10.0);
						if(i51 === 0 || i55 !== i22) {
							i22 = i55;
							let  i69: number = this.permutations[i41] + i55;
							let  i71: number = this.permutations[i69] + i48;
							let  i72: number = this.permutations[i69 + 1] + i48;
							let  i74: number = this.permutations[i41 + 1] + i55;
							i75 = this.permutations[i74] + i48;
							let  i76: number = this.permutations[i74 + 1] + i48;
							d29 = this.lerp(d42, this.grad(this.permutations[i71], d38, d52, d45), this.grad(this.permutations[i75], d38 - 1.0, d52, d45));
							d31 = this.lerp(d42, this.grad(this.permutations[i72], d38, d52 - 1.0, d45), this.grad(this.permutations[i76], d38 - 1.0, d52 - 1.0, d45));
							d33 = this.lerp(d42, this.grad(this.permutations[i71 + 1], d38, d52, d45 - 1.0), this.grad(this.permutations[i75 + 1], d38 - 1.0, d52, d45 - 1.0));
							d35 = this.lerp(d42, this.grad(this.permutations[i72 + 1], d38, d52 - 1.0, d45 - 1.0), this.grad(this.permutations[i76 + 1], d38 - 1.0, d52 - 1.0, d45 - 1.0));
						}

						let  d58: number = this.lerp(d56, d29, d31);
						let  d60: number = this.lerp(d56, d33, d35);
						let  d62: number = this.lerp(d49, d58, d60);
						i10001 = i19++;
						d1[i10001] += d62 * d20;
					}
				}
			}

		}
	}
}
