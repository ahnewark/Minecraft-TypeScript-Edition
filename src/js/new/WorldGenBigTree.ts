


import { byte, java, int, double, float, long } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { Random } from "../java/util/Random";

export class WorldGenBigTree extends WorldGenerator {
	protected static readonly field_882_a   = Int8Array.from([2, 0, 0, 1, 2, 1]);
	protected field_881_b: Random | null = new  Random();
	protected worldObj: World | null;
	protected basePos = [0,0,0];
	protected field_878_e: int = 0;
	protected height: int;
	protected field_876_g: double = 0.618;
	protected field_875_h: double = 1.0;
	protected field_874_i: double = 0.381;
	protected field_873_j: double = 1.0;
	protected field_872_k: double = 1.0;
	protected field_871_l: int = 1;
	protected field_870_m: int = 12;
	protected field_869_n: int = 4;
	protected field_868_o: number[][] = [];

	protected async func_521_a(): Promise<void> {
		this.height = (this.field_878_e as double * this.field_876_g) as int;
		if(this.height >= this.field_878_e) {
			this.height = this.field_878_e - 1;
		}

		let  i1: int = (1.382 + java.lang.Math.pow(this.field_872_k * this.field_878_e as double / 13.0, 2.0)) as int;
		if(i1 < 1) {
			i1 = 1;
		}

		let  i2: number[][] = [[]];
		let  i3: int = this.basePos[1] + this.field_878_e - this.field_869_n;
		let  i4: int = 1;
		let  i5: int = this.basePos[1] + this.height;
		let  i6: int = i3 - this.basePos[1];
		i2[0][0] = this.basePos[0];
		i2[0][1] = i3;
		i2[0][2] = this.basePos[2];
		i2[0][3] = i5;
		--i3;

		while(true) {
			while(i6 >= 0) {
				let  i7: int = 0;
				let  f8: float = this.func_528_a(i6);
				if(f8 < 0.0) {
					--i3;
					--i6;
				} else {
					for(let  d9: double = 0.5; i7 < i1; ++i7) {
						let  d11: double = this.field_873_j * f8 as double * (this.field_881_b.nextFloat() as double + 0.328);
						let  d13: double = this.field_881_b.nextFloat() as double * 2.0 * 3.14159;
						let  i15: int = (d11 * java.lang.Math.sin(d13) + this.basePos[0] as double + d9) as int;
						let  i16: int = (d11 * java.lang.Math.cos(d13) + this.basePos[2] as double + d9) as int;
						let  i17 =  [i15, i3, i16];
						let  i18 =  [i15, i3 + this.field_869_n, i16];
						if(await this.func_524_a(i17, i18) === -1) {
							let  i19 =  [this.basePos[0], this.basePos[1], this.basePos[2]];
							let  d20: double = java.lang.Math.sqrt(java.lang.Math.pow(java.lang.Math.abs(this.basePos[0] - i17[0]) as double, 2.0) + java.lang.Math.pow(java.lang.Math.abs(this.basePos[2] - i17[2]) as double, 2.0));
							let  d22: double = d20 * this.field_874_i;
							if(i17[1] - d22 > i5) {
								i19[1] = i5;
							} else {
								i19[1] = (i17[1] - d22) as int;
							}

							if(await this.func_524_a(i19, i17) === -1) {
								i2[i4][0] = i15;
								i2[i4][1] = i3;
								i2[i4][2] = i16;
								i2[i4][3] = i19[1];
								++i4;
							}
						}
					}

					--i3;
					--i6;
				}
			}

			this.field_868_o = [];
			java.lang.System.arraycopy(i2, 0, this.field_868_o, 0, i4);
			return;
		}
	}

	protected async func_523_a(i1: int, i2: int, i3: int, f4: float, b5: byte, i6: int): Promise<void> {
		let  i7: int = (f4 as double + 0.618) as int;
		let  b8: byte = WorldGenBigTree.field_882_a[b5];
		let  b9: byte = WorldGenBigTree.field_882_a[b5 + 3];
		let  i10 =  [i1, i2, i3];
		let  i11 =  [0, 0, 0];
		let  i12: int = -i7;
		let  i13: int = -i7;

		label32:
		for(i11[b5] = i10[b5]; i12 <= i7; ++i12) {
			i11[b8] = i10[b8] + i12;
			i13 = -i7;

			while(true) {
				while(true) {
					if(i13 > i7) {
						continue label32;
					}

					let  d15: double = java.lang.Math.sqrt(java.lang.Math.pow(java.lang.Math.abs(i12) as double + 0.5, 2.0) + java.lang.Math.pow(java.lang.Math.abs(i13) as double + 0.5, 2.0));
					if(d15 > f4) {
						++i13;
					} else {
						i11[b9] = i10[b9] + i13;
						let  i14: int = await this.worldObj.getBlockId(i11[0], i11[1], i11[2]);
						if(i14 !== 0 && i14 !== 18) {
							++i13;
						} else {
							await this.worldObj.setBlock(i11[0], i11[1], i11[2], i6);
							++i13;
						}
					}
				}
			}
		}

	}

	protected func_528_a(i1: int): float {
		if(i1 < (this.field_878_e) * 0.3) {
			return -1.618;
		} else {
			let  f2: float = this.field_878_e / 2.0;
			let  f3: float = this.field_878_e / 2.0 - i1;
			let  f4: float;
			if(f3 === 0.0) {
				f4 = f2;
			} else if(java.lang.Math.abs(f3) >= f2) {
				f4 = 0.0;
			} else {
				f4 = java.lang.Math.sqrt(java.lang.Math.pow(java.lang.Math.abs(f2), 2.0) - java.lang.Math.pow(java.lang.Math.abs(f3), 2.0));
			}

			f4 *= 0.5;
			return f4;
		}
	}

	protected func_526_b(i1: int): float {
		return i1 >= 0 && i1 < this.field_869_n ? (i1 !== 0 && i1 !== this.field_869_n - 1 ? 3.0 : 2.0) : -1.0;
	}

	protected async func_520_a(i1: int, i2: int, i3: int): Promise<void> {
		let  i4: int = i2;

		for(let  i5: int = i2 + this.field_869_n; i4 < i5; ++i4) {
			let  f6: float = this.func_526_b(i4 - i2);
			await this.func_523_a(i1, i4, i3, f6, 1 as byte, 18);
		}

	}

	protected async func_522_a(i1: number[], i2: number[], i3: int): Promise<void> {
		let  i4 =  [0, 0, 0];
		let  b5: byte = 0;

		let  b6: byte;
		for(b6 = 0; b5 < 3; ++b5) {
			i4[b5] = i2[b5] - i1[b5];
			if(java.lang.Math.abs(i4[b5]) > java.lang.Math.abs(i4[b6])) {
				b6 = b5;
			}
		}

		if(i4[b6] !== 0) {
			let  b7: byte = WorldGenBigTree.field_882_a[b6];
			let  b8: byte = WorldGenBigTree.field_882_a[b6 + 3];
			let  b9: byte;
			if(i4[b6] > 0) {
				b9 = 1;
			} else {
				b9 = -1;
			}

			let  d10: double = i4[b7] / i4[b6];
			let  d12: double = i4[b8] / i4[b6];
			let  i14 =  [0, 0, 0];
			let  i15: int = 0;

			for(let  i16: int = i4[b6] + b9; i15 !== i16; i15 += b9) {
				i14[b6] = MathHelper.floor_double((i1[b6] + i15) + 0.5);
				i14[b7] = MathHelper.floor_double(i1[b7] + i15 * d10 + 0.5);
				i14[b8] = MathHelper.floor_double(i1[b8] + i15 * d12 + 0.5);
				await this.worldObj.setBlock(i14[0], i14[1], i14[2], i3);
			}

		}
	}

	protected async func_518_b(): Promise<void> {
		let  i1: int = 0;

		for(let  i2: int = this.field_868_o.length; i1 < i2; ++i1) {
			let  i3: int = this.field_868_o[i1][0];
			let  i4: int = this.field_868_o[i1][1];
			let  i5: int = this.field_868_o[i1][2];
			await this.func_520_a(i3, i4, i5);
		}

	}

	protected func_527_c(i1: int): boolean {
		return i1 >= this.field_878_e * 0.2;
	}

	protected async func_529_c(): Promise<void> {
		let  i1: int = this.basePos[0];
		let  i2: int = this.basePos[1];
		let  i3: int = this.basePos[1] + this.height;
		let  i4: int = this.basePos[2];
		let  i5 =  [i1, i2, i4];
		let  i6 =  [i1, i3, i4];
		await this.func_522_a(i5, i6, 17);
		if(this.field_871_l === 2) {
			++i5[0];
			++i6[0];
			await this.func_522_a(i5, i6, 17);
			++i5[2];
			++i6[2];
			await this.func_522_a(i5, i6, 17);
			i5[0] += -1;
			i6[0] += -1;
			await this.func_522_a(i5, i6, 17);
		}

	}

	protected async func_525_d(): Promise<void> {
		let  i1: int = 0;
		let  i2: int = this.field_868_o.length;

		for(let  i3 =  [this.basePos[0], this.basePos[1], this.basePos[2]]; i1 < i2; ++i1) {
			let  i4 = this.field_868_o[i1];
			let  i5 =  [i4[0], i4[1], i4[2]];
			i3[1] = i4[3];
			let  i6: int = i3[1] - this.basePos[1];
			if(this.func_527_c(i6)) {
				await this.func_522_a(i3, i5, 17);
			}
		}

	}

	protected async func_524_a(i1: number[], i2: number[]): Promise<int> {
		let  i3 =  [0, 0, 0];
		let  b4: byte = 0;

		let  b5: byte;
		for(b5 = 0; b4 < 3; ++b4) {
			i3[b4] = i2[b4] - i1[b4];
			if(java.lang.Math.abs(i3[b4]) > java.lang.Math.abs(i3[b5])) {
				b5 = b4;
			}
		}

		if(i3[b5] === 0) {
			return -1;
		} else {
			let  b6: byte = WorldGenBigTree.field_882_a[b5];
			let  b7: byte = WorldGenBigTree.field_882_a[b5 + 3];
			let  b8: byte;
			if(i3[b5] > 0) {
				b8 = 1;
			} else {
				b8 = -1;
			}

			let  d9: double = i3[b6] as double / i3[b5] as double;
			let  d11: double = i3[b7] as double / i3[b5] as double;
			let  i13 =  [0, 0, 0];
			let  i14: int = 0;

			let  i15: int;
			for(i15 = i3[b5] + b8; i14 !== i15; i14 += b8) {
				i13[b5] = i1[b5] + i14;
				i13[b6] = (i1[b6] as double + i14 as double * d9) as int;
				i13[b7] = (i1[b7] as double + i14 as double * d11) as int;
				let  i16: int = await this.worldObj.getBlockId(i13[0], i13[1], i13[2]);
				if(i16 !== 0 && i16 !== 18) {
					break;
				}
			}

			return i14 === i15 ? -1 : java.lang.Math.abs(i14);
		}
	}

	protected async func_519_e(): Promise<boolean> {
		let  i1 =  [this.basePos[0], this.basePos[1], this.basePos[2]];
		let  i2 =  [this.basePos[0], this.basePos[1] + this.field_878_e - 1, this.basePos[2]];
		let  i3: int = await this.worldObj.getBlockId(this.basePos[0], this.basePos[1] - 1, this.basePos[2]);
		if(i3 !== 2 && i3 !== 3) {
			return false;
		} else {
			let  i4: int = await this.func_524_a(i1, i2);
			if(i4 === -1) {
				return true;
			} else if(i4 < 6) {
				return false;
			} else {
				this.field_878_e = i4;
				return true;
			}
		}
	}

	public func_517_a(d1: double, d3: double, d5: double):  void {
		this.field_870_m = (d1 * 12.0) as int;
		if(d1 > 0.5) {
			this.field_869_n = 5;
		}

		this.field_873_j = d3;
		this.field_872_k = d5;
	}

	public async generate(world1: World| null, random2: Random| null, i3: int, i4: int, i5: int):  Promise<boolean> {
		this.worldObj = world1;
		let  j6: long = random2.nextLong();
		this.field_881_b.setSeed(j6);
		this.basePos[0] = i3;
		this.basePos[1] = i4;
		this.basePos[2] = i5;
		if(this.field_878_e === 0) {
			this.field_878_e = 5 + this.field_881_b.nextInt(this.field_870_m);
		}

		if(!await this.func_519_e()) {
			return false;
		} else {
			await this.func_521_a();
			await this.func_518_b();
			await this.func_529_c();
			await this.func_525_d();
			return true;
		}
	}
}
