


import { int, double, float, java, byte } from "../jree/index";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { MapGenBase } from "./MapGenBase";
import { Random } from "../java/util/Random";
import { BlockRegistry } from "./index";

export  class MapGenCavesHell extends MapGenBase {
	protected func_4129_a(i1: int, i2: int, b3: Int8Array, d4: double, d6: double, d8: double):  void {
		this.func_4128_a(i1, i2, b3, d4, d6, d8, 1.0 + this.rand.nextFloat() * 6.0, 0.0, 0.0, -1, -1, 0.5);
	}

	protected func_4128_a(i1: int, i2: int, b3: Int8Array, d4: double, d6: double, d8: double, f10: float, f11: float, f12: float, i13: int, i14: int, d15: double):  void {
		let  d17: double = (i1 * 16 + 8) as double;
		let  d19: double = (i2 * 16 + 8) as double;
		let  f21: float = 0.0;
		let  f22: float = 0.0;
		let  random23 = new  Random(this.rand.nextLong());
		if(i14 <= 0) {
			let  i24: int = this.field_1306_a * 16 - 16;
			i14 = i24 - random23.nextInt(i24 / 4);
		}

		let  z51: boolean = false;
		if(i13 === -1) {
			i13 = i14 / 2;
			z51 = true;
		}

		let  i25: int = random23.nextInt(i14 / 2) + i14 / 4;

		for(let  z26: boolean = random23.nextInt(6) === 0; i13 < i14; ++i13) {
			let  d27: double = 1.5 + (MathHelper.sin(i13 as float * java.lang.Math.PI as float / i14 as float) * f10 * 1.0) as double;
			let  d29: double = d27 * d15;
			let  f31: float = MathHelper.cos(f12);
			let  f32: float = MathHelper.sin(f12);
			d4 += (MathHelper.cos(f11) * f31) as double;
			d6 += f32 as double;
			d8 += (MathHelper.sin(f11) * f31) as double;
			if(z26) {
				f12 *= 0.92;
			} else {
				f12 *= 0.7;
			}

			f12 += f22 * 0.1;
			f11 += f21 * 0.1;
			f22 *= 0.9;
			f21 *= 0.75;
			f22 += (random23.nextFloat() - random23.nextFloat()) * random23.nextFloat() * 2.0;
			f21 += (random23.nextFloat() - random23.nextFloat()) * random23.nextFloat() * 4.0;
			if(!z51 && i13 === i25 && f10 > 1.0) {
				this.func_4128_a(i1, i2, b3, d4, d6, d8, random23.nextFloat() * 0.5 + 0.5, f11 - java.lang.Math.PI as float / 2, f12 / 3.0, i13, i14, 1.0);
				this.func_4128_a(i1, i2, b3, d4, d6, d8, random23.nextFloat() * 0.5 + 0.5, f11 + java.lang.Math.PI as float / 2, f12 / 3.0, i13, i14, 1.0);
				return;
			}

			if(z51 || random23.nextInt(4) !== 0) {
				let  d33: double = d4 - d17;
				let  d35: double = d8 - d19;
				let  d37: double = (i14 - i13) as double;
				let  d39: double = (f10 + 2.0 + 16.0) as double;
				if(d33 * d33 + d35 * d35 - d37 * d37 > d39 * d39) {
					return;
				}

				if(d4 >= d17 - 16.0 - d27 * 2.0 && d8 >= d19 - 16.0 - d27 * 2.0 && d4 <= d17 + 16.0 + d27 * 2.0 && d8 <= d19 + 16.0 + d27 * 2.0) {
					let  i52: int = MathHelper.floor_double(d4 - d27) - i1 * 16 - 1;
					let  i34: int = MathHelper.floor_double(d4 + d27) - i1 * 16 + 1;
					let  i53: int = MathHelper.floor_double(d6 - d29) - 1;
					let  i36: int = MathHelper.floor_double(d6 + d29) + 1;
					let  i54: int = MathHelper.floor_double(d8 - d27) - i2 * 16 - 1;
					let  i38: int = MathHelper.floor_double(d8 + d27) - i2 * 16 + 1;
					if(i52 < 0) {
						i52 = 0;
					}

					if(i34 > 16) {
						i34 = 16;
					}

					if(i53 < 1) {
						i53 = 1;
					}

					if(i36 > 120) {
						i36 = 120;
					}

					if(i54 < 0) {
						i54 = 0;
					}

					if(i38 > 16) {
						i38 = 16;
					}

					let  z55: boolean = false;

					let  i40: int;
					let  i43: int;
					for(i40 = i52; !z55 && i40 < i34; ++i40) {
						for(let  i41: int = i54; !z55 && i41 < i38; ++i41) {
							for(let  i42: int = i36 + 1; !z55 && i42 >= i53 - 1; --i42) {
								i43 = (i40 * 16 + i41) * 128 + i42;
								if(i42 >= 0 && i42 < 128) {
									if(b3[i43] === BlockRegistry.lavaStill.blockID || b3[i43] === BlockRegistry.lavaMoving.blockID) {
										z55 = true;
									}

									if(i42 !== i53 - 1 && i40 !== i52 && i40 !== i34 - 1 && i41 !== i54 && i41 !== i38 - 1) {
										i42 = i53;
									}
								}
							}
						}
					}

					if(!z55) {
						for(i40 = i52; i40 < i34; ++i40) {
							let  d56: double = ((i40 + i1 * 16) as double + 0.5 - d4) / d27;

							for(i43 = i54; i43 < i38; ++i43) {
								let  d44: double = ((i43 + i2 * 16) as double + 0.5 - d8) / d27;
								let  i46: int = (i40 * 16 + i43) * 128 + i36;

								for(let  i47: int = i36 - 1; i47 >= i53; --i47) {
									let  d48: double = (i47 as double + 0.5 - d6) / d29;
									if(d48 > -0.7 && d56 * d56 + d48 * d48 + d44 * d44 < 1.0) {
										let  b50: byte = b3[i46];
										if(b50 === BlockRegistry.bloodStone.blockID || b50 === BlockRegistry.dirt.blockID || b50 === BlockRegistry.grass.blockID) {
											b3[i46] = 0;
										}
									}

									--i46;
								}
							}
						}

						if(z51) {
							break;
						}
					}
				}
			}
		}

	}

	protected func_868_a(world1: World| null, i2: int, i3: int, i4: int, i5: int, b6: Int8Array):  void {
		let  i7: int = this.rand.nextInt(this.rand.nextInt(this.rand.nextInt(10) + 1) + 1);
		if(this.rand.nextInt(5) !== 0) {
			i7 = 0;
		}

		for(let  i8: int = 0; i8 < i7; ++i8) {
			let  d9: double = (i2 * 16 + this.rand.nextInt(16)) as double;
			let  d11: double = this.rand.nextInt(128) as double;
			let  d13: double = (i3 * 16 + this.rand.nextInt(16)) as double;
			let  i15: int = 1;
			if(this.rand.nextInt(4) === 0) {
				this.func_4129_a(i4, i5, b6, d9, d11, d13);
				i15 += this.rand.nextInt(4);
			}

			for(let  i16: int = 0; i16 < i15; ++i16) {
				let  f17: float = this.rand.nextFloat() * java.lang.Math.PI as float * 2.0;
				let  f18: float = (this.rand.nextFloat() - 0.5) * 2.0 / 8.0;
				let  f19: float = this.rand.nextFloat() * 2.0 + this.rand.nextFloat();
				this.func_4128_a(i4, i5, b6, d9, d11, d13, f19 * 2.0, f17, f18, 0, 0, 0.5);
			}
		}

	}
}
