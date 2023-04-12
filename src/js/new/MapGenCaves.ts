


import { java } from "../jree/index";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { MapGenBase } from "./MapGenBase";
import { Random } from "../java/util/Random";
import { Block } from "./Block";

export  class MapGenCaves extends MapGenBase {
	protected func_870_a(i1: number, i2: number, b3: Int8Array, d4: number, d6: number, d8: number):  void {
		this.releaseEntitySkin(i1, i2, b3, d4, d6, d8, 1.0 + this.rand.nextFloat() * 6.0, 0.0, 0.0, -1, -1, 0.5);
	}

	protected releaseEntitySkin(i1: number, i2: number, b3: Int8Array, d4: number, d6: number, d8: number, f10: number, f11: number, f12: number, i13: number, i14: number, d15: number):  void {
		let  d17: number = (i1 * 16 + 8) as number;
		let  d19: number = (i2 * 16 + 8) as number;
		let  f21: number = 0.0;
		let  f22: number = 0.0;
		let  random23: Random = new  Random(this.rand.nextLong());
		if(i14 <= 0) {
			let  i24: number = this.field_1306_a * 16 - 16;
			i14 = i24 - random23.nextInt(i24 / 4);
		}

		let  z52: boolean = false;
		if(i13 === -1) {
			i13 = i14 / 2;
			z52 = true;
		}

		let  i25: number = random23.nextInt(i14 / 2) + i14 / 4;

		for(let  z26: boolean = random23.nextInt(6) === 0; i13 < i14; ++i13) {
			let  d27: number = 1.5 + (MathHelper.sin(i13 as number * java.lang.Math.PI as number / i14 as number) * f10 * 1.0) as number;
			let  d29: number = d27 * d15;
			let  f31: number = MathHelper.cos(f12);
			let  f32: number = MathHelper.sin(f12);
			d4 += (MathHelper.cos(f11) * f31) as number;
			d6 += f32 as number;
			d8 += (MathHelper.sin(f11) * f31) as number;
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
			if(!z52 && i13 === i25 && f10 > 1.0) {
				this.releaseEntitySkin(i1, i2, b3, d4, d6, d8, random23.nextFloat() * 0.5 + 0.5, f11 - java.lang.Math.PI as number / 2, f12 / 3.0, i13, i14, 1.0);
				this.releaseEntitySkin(i1, i2, b3, d4, d6, d8, random23.nextFloat() * 0.5 + 0.5, f11 + java.lang.Math.PI as number / 2, f12 / 3.0, i13, i14, 1.0);
				return;
			}

			if(z52 || random23.nextInt(4) !== 0) {
				let  d33: number = d4 - d17;
				let  d35: number = d8 - d19;
				let  d37: number = (i14 - i13) as number;
				let  d39: number = (f10 + 2.0 + 16.0) as number;
				if(d33 * d33 + d35 * d35 - d37 * d37 > d39 * d39) {
					return;
				}

				if(d4 >= d17 - 16.0 - d27 * 2.0 && d8 >= d19 - 16.0 - d27 * 2.0 && d4 <= d17 + 16.0 + d27 * 2.0 && d8 <= d19 + 16.0 + d27 * 2.0) {
					let  i53: number = MathHelper.floor_double(d4 - d27) - i1 * 16 - 1;
					let  i34: number = MathHelper.floor_double(d4 + d27) - i1 * 16 + 1;
					let  i54: number = MathHelper.floor_double(d6 - d29) - 1;
					let  i36: number = MathHelper.floor_double(d6 + d29) + 1;
					let  i55: number = MathHelper.floor_double(d8 - d27) - i2 * 16 - 1;
					let  i38: number = MathHelper.floor_double(d8 + d27) - i2 * 16 + 1;
					if(i53 < 0) {
						i53 = 0;
					}

					if(i34 > 16) {
						i34 = 16;
					}

					if(i54 < 1) {
						i54 = 1;
					}

					if(i36 > 120) {
						i36 = 120;
					}

					if(i55 < 0) {
						i55 = 0;
					}

					if(i38 > 16) {
						i38 = 16;
					}

					let  z56: boolean = false;

					let  i40: number;
					let  i43: number;
					for(i40 = i53; !z56 && i40 < i34; ++i40) {
						for(let  i41: number = i55; !z56 && i41 < i38; ++i41) {
							for(let  i42: number = i36 + 1; !z56 && i42 >= i54 - 1; --i42) {
								i43 = (i40 * 16 + i41) * 128 + i42;
								if(i42 >= 0 && i42 < 128) {
									if(b3[i43] === Block.waterStill.blockID || b3[i43] === Block.waterMoving.blockID) {
										z56 = true;
									}

									if(i42 !== i54 - 1 && i40 !== i53 && i40 !== i34 - 1 && i41 !== i55 && i41 !== i38 - 1) {
										i42 = i54;
									}
								}
							}
						}
					}

					if(!z56) {
						for(i40 = i53; i40 < i34; ++i40) {
							let  d57: number = ((i40 + i1 * 16) as number + 0.5 - d4) / d27;

							for(i43 = i55; i43 < i38; ++i43) {
								let  d44: number = ((i43 + i2 * 16) as number + 0.5 - d8) / d27;
								let  i46: number = (i40 * 16 + i43) * 128 + i36;
								let  z47: boolean = false;
								if(d57 * d57 + d44 * d44 < 1.0) {
									for(let  i48: number = i36 - 1; i48 >= i54; --i48) {
										let  d49: number = (i48 as number + 0.5 - d6) / d29;
										if(d49 > -0.7 && d57 * d57 + d49 * d49 + d44 * d44 < 1.0) {
											let  b51: number = b3[i46];
											if(b51 === Block.grass.blockID) {
												z47 = true;
											}

											if(b51 === Block.stone.blockID || b51 === Block.dirt.blockID || b51 === Block.grass.blockID) {
												if(i48 < 10) {
													b3[i46] = Block.lavaStill.blockID as number;
												} else {
													b3[i46] = 0;
													if(z47 && b3[i46 - 1] === Block.dirt.blockID) {
														b3[i46 - 1] = Block.grass.blockID as number;
													}
												}
											}
										}

										--i46;
									}
								}
							}
						}

						if(z52) {
							break;
						}
					}
				}
			}
		}

	}

	protected func_868_a(world1: World| null, i2: number, i3: number, i4: number, i5: number, b6: Int8Array):  void {
		let  i7: number = this.rand.nextInt(this.rand.nextInt(this.rand.nextInt(40) + 1) + 1);
		if(this.rand.nextInt(15) !== 0) {
			i7 = 0;
		}

		for(let  i8: number = 0; i8 < i7; ++i8) {
			let  d9: number = (i2 * 16 + this.rand.nextInt(16)) as number;
			let  d11: number = this.rand.nextInt(this.rand.nextInt(120) + 8) as number;
			let  d13: number = (i3 * 16 + this.rand.nextInt(16)) as number;
			let  i15: number = 1;
			if(this.rand.nextInt(4) === 0) {
				this.func_870_a(i4, i5, b6, d9, d11, d13);
				i15 += this.rand.nextInt(4);
			}

			for(let  i16: number = 0; i16 < i15; ++i16) {
				let  f17: number = this.rand.nextFloat() * java.lang.Math.PI as number * 2.0;
				let  f18: number = (this.rand.nextFloat() - 0.5) * 2.0 / 8.0;
				let  f19: number = this.rand.nextFloat() * 2.0 + this.rand.nextFloat();
				this.releaseEntitySkin(i4, i5, b6, d9, d11, d13, f19, f17, f18, 0, 0, 1.0);
			}
		}

	}
}
