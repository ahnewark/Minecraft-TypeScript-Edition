


import { JavaObject, java, long, int, byte, double, short, float } from "../jree/index";
import { WorldGenLightStone2 } from "./WorldGenLightStone2";
import { WorldGenLightStone1 } from "./WorldGenLightStone1";
import { WorldGenHellLava } from "./WorldGenHellLava";
import { WorldGenFlowers } from "./WorldGenFlowers";
import { WorldGenFire } from "./WorldGenFire";
import { World } from "./World";
import { NoiseGeneratorOctaves } from "./NoiseGeneratorOctaves";
import { MapGenCavesHell } from "./MapGenCavesHell";
import { MapGenBase } from "./MapGenBase";
import { IProgressUpdate } from "./IProgressUpdate";
import { IChunkProvider } from "./IChunkProvider";
import { Chunk } from "./Chunk";
import { BlockSand } from "./BlockSand";
import { Random } from "../java/util/Random";
import { BlockRegistry } from "./index";

export  class ChunkProviderHell extends JavaObject implements IChunkProvider {
	private hellRNG:  Random | null;
	private field_4169_i:  NoiseGeneratorOctaves | null;
	private field_4168_j:  NoiseGeneratorOctaves | null;
	private field_4167_k:  NoiseGeneratorOctaves | null;
	private field_4166_l:  NoiseGeneratorOctaves | null;
	private field_4165_m:  NoiseGeneratorOctaves | null;
	public field_4177_a:  NoiseGeneratorOctaves | null;
	public field_4176_b:  NoiseGeneratorOctaves | null;
	private field_4164_n:  World | null;
	private field_4163_o:  Float64Array;
	private field_4162_p:  Float64Array = new  Float64Array(256);
	private field_4161_q:  Float64Array = new   Float64Array(256);
	private field_4160_r:  Float64Array = new   Float64Array(256);
	private field_4159_s:  MapGenBase | null = new  MapGenCavesHell();
	protected field_4175_c: Float64Array;
	protected field_4174_d: Float64Array;
	protected field_4173_e: Float64Array;
	protected field_4172_f: Float64Array;
	protected field_4171_g: Float64Array;

	public constructor(world1: World| null, j2: long) {
		super();
		this.field_4164_n = world1;
		this.hellRNG = new  Random(j2);
		this.field_4169_i = new  NoiseGeneratorOctaves(this.hellRNG, 16);
		this.field_4168_j = new  NoiseGeneratorOctaves(this.hellRNG, 16);
		this.field_4167_k = new  NoiseGeneratorOctaves(this.hellRNG, 8);
		this.field_4166_l = new  NoiseGeneratorOctaves(this.hellRNG, 4);
		this.field_4165_m = new  NoiseGeneratorOctaves(this.hellRNG, 4);
		this.field_4177_a = new  NoiseGeneratorOctaves(this.hellRNG, 10);
		this.field_4176_b = new  NoiseGeneratorOctaves(this.hellRNG, 16);
	}

	public func_4059_a(i1: int, i2: int, b3: Int8Array):  void {
		let  b4: byte = 4;
		let  b5: byte = 32;
		let  i6: int = b4 + 1;
		let  b7: byte = 17;
		let  i8: int = b4 + 1;
		this.field_4163_o = this.func_4057_a(this.field_4163_o, i1 * b4, 0, i2 * b4, i6, b7, i8);

		for(let  i9: int = 0; i9 < b4; ++i9) {
			for(let  i10: int = 0; i10 < b4; ++i10) {
				for(let  i11: int = 0; i11 < 16; ++i11) {
					let  d12: double = 0.125;
					let  d14: double = this.field_4163_o[((i9 + 0) * i8 + i10 + 0) * b7 + i11 + 0];
					let  d16: double = this.field_4163_o[((i9 + 0) * i8 + i10 + 1) * b7 + i11 + 0];
					let  d18: double = this.field_4163_o[((i9 + 1) * i8 + i10 + 0) * b7 + i11 + 0];
					let  d20: double = this.field_4163_o[((i9 + 1) * i8 + i10 + 1) * b7 + i11 + 0];
					let  d22: double = (this.field_4163_o[((i9 + 0) * i8 + i10 + 0) * b7 + i11 + 1] - d14) * d12;
					let  d24: double = (this.field_4163_o[((i9 + 0) * i8 + i10 + 1) * b7 + i11 + 1] - d16) * d12;
					let  d26: double = (this.field_4163_o[((i9 + 1) * i8 + i10 + 0) * b7 + i11 + 1] - d18) * d12;
					let  d28: double = (this.field_4163_o[((i9 + 1) * i8 + i10 + 1) * b7 + i11 + 1] - d20) * d12;

					for(let  i30: int = 0; i30 < 8; ++i30) {
						let  d31: double = 0.25;
						let  d33: double = d14;
						let  d35: double = d16;
						let  d37: double = (d18 - d14) * d31;
						let  d39: double = (d20 - d16) * d31;

						for(let  i41: int = 0; i41 < 4; ++i41) {
							let  i42: int = i41 + i9 * 4 << 11 | 0 + i10 * 4 << 7 | i11 * 8 + i30;
							let  s43: short = 128;
							let  d44: double = 0.25;
							let  d46: double = d33;
							let  d48: double = (d35 - d33) * d44;

							for(let  i50: int = 0; i50 < 4; ++i50) {
								let  i51: int = 0;
								if(i11 * 8 + i30 < b5) {
									i51 = BlockRegistry.lavaMoving.blockID;
								}

								if(d46 > 0.0) {
									i51 = BlockRegistry.bloodStone.blockID;
								}

								b3[i42] = i51 as byte;
								i42 += s43;
								d46 += d48;
							}

							d33 += d37;
							d35 += d39;
						}

						d14 += d22;
						d16 += d24;
						d18 += d26;
						d20 += d28;
					}
				}
			}
		}

	}

	public func_4058_b(i1: int, i2: int, b3: Int8Array):  void {
		let  b4: byte = 64;
		let  d5: double = 8.0 / 256;
		this.field_4162_p = this.field_4166_l.generateNoiseOctaves(this.field_4162_p, (i1 * 16) as double, (i2 * 16) as double, 0.0, 16, 16, 1, d5, d5, 1.0);
		this.field_4161_q = this.field_4166_l.generateNoiseOctaves(this.field_4161_q, (i2 * 16) as double, 109.0134, (i1 * 16) as double, 16, 1, 16, d5, 1.0, d5);
		this.field_4160_r = this.field_4165_m.generateNoiseOctaves(this.field_4160_r, (i1 * 16) as double, (i2 * 16) as double, 0.0, 16, 16, 1, d5 * 2.0, d5 * 2.0, d5 * 2.0);

		for(let  i7: int = 0; i7 < 16; ++i7) {
			for(let  i8: int = 0; i8 < 16; ++i8) {
				let  z9: boolean = this.field_4162_p[i7 + i8 * 16] + this.hellRNG.nextDouble() * 0.2 > 0.0;
				let  z10: boolean = this.field_4161_q[i7 + i8 * 16] + this.hellRNG.nextDouble() * 0.2 > 0.0;
				let  i11: int = (this.field_4160_r[i7 + i8 * 16] / 3.0 + 3.0 + this.hellRNG.nextDouble() * 0.25) as int;
				let  i12: int = -1;
				let  b13: byte = BlockRegistry.bloodStone.blockID as byte;
				let  b14: byte = BlockRegistry.bloodStone.blockID as byte;

				for(let  i15: int = 127; i15 >= 0; --i15) {
					let  i16: int = (i7 * 16 + i8) * 128 + i15;
					if(i15 >= 127 - this.hellRNG.nextInt(5)) {
						b3[i16] = BlockRegistry.bedrock.blockID as byte;
					} else if(i15 <= 0 + this.hellRNG.nextInt(5)) {
						b3[i16] = BlockRegistry.bedrock.blockID as byte;
					} else {
						let  b17: byte = b3[i16];
						if(b17 === 0) {
							i12 = -1;
						} else if(b17 === BlockRegistry.bloodStone.blockID) {
							if(i12 === -1) {
								if(i11 <= 0) {
									b13 = 0;
									b14 = BlockRegistry.bloodStone.blockID as byte;
								} else if(i15 >= b4 - 4 && i15 <= b4 + 1) {
									b13 = BlockRegistry.bloodStone.blockID as byte;
									b14 = BlockRegistry.bloodStone.blockID as byte;
									if(z10) {
										b13 = BlockRegistry.gravel.blockID as byte;
									}

									if(z10) {
										b14 = BlockRegistry.bloodStone.blockID as byte;
									}

									if(z9) {
										b13 = BlockRegistry.slowSand.blockID as byte;
									}

									if(z9) {
										b14 = BlockRegistry.slowSand.blockID as byte;
									}
								}

								if(i15 < b4 && b13 === 0) {
									b13 = BlockRegistry.lavaMoving.blockID as byte;
								}

								i12 = i11;
								if(i15 >= b4 - 1) {
									b3[i16] = b13;
								} else {
									b3[i16] = b14;
								}
							} else if(i12 > 0) {
								--i12;
								b3[i16] = b14;
							}
						}
					}
				}
			}
		}

	}

	public async provideChunk(i1: int, i2: int):  Promise<Chunk | null> {
		this.hellRNG.setSeed(BigInt(i1) * 341873128712n + BigInt(i2) * 132897987541n);
		let  b3: Int8Array = new  Int8Array(32768);
		this.func_4059_a(i1, i2, b3);
		this.func_4058_b(i1, i2, b3);
		this.field_4159_s.func_867_a(this, this.field_4164_n, i1, i2, b3);
		let  chunk4: Chunk = new  Chunk(this.field_4164_n, b3, i1, i2);
		return chunk4;
	}

	private func_4057_a(d1: Float64Array, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int):  Float64Array {
		if(d1 === null) {
			d1 = new Float64Array(i5 * i6 * i7);
		}

		let  d8: double = 684.412;
		let  d10: double = 2053.236;
		this.field_4172_f = this.field_4177_a.generateNoiseOctaves(this.field_4172_f, i2 as double, i3 as double, i4 as double, i5, 1, i7, 1.0, 0.0, 1.0);
		this.field_4171_g = this.field_4176_b.generateNoiseOctaves(this.field_4171_g, i2 as double, i3 as double, i4 as double, i5, 1, i7, 100.0, 0.0, 100.0);
		this.field_4175_c = this.field_4167_k.generateNoiseOctaves(this.field_4175_c, i2 as double, i3 as double, i4 as double, i5, i6, i7, d8 / 80.0, d10 / 60.0, d8 / 80.0);
		this.field_4174_d = this.field_4169_i.generateNoiseOctaves(this.field_4174_d, i2 as double, i3 as double, i4 as double, i5, i6, i7, d8, d10, d8);
		this.field_4173_e = this.field_4168_j.generateNoiseOctaves(this.field_4173_e, i2 as double, i3 as double, i4 as double, i5, i6, i7, d8, d10, d8);
		let  i12: int = 0;
		let  i13: int = 0;
		let  d14 = new Float64Array(i6);

		let  i15: int;
		for(i15 = 0; i15 < i6; ++i15) {
			d14[i15] = java.lang.Math.cos(i15 as double * java.lang.Math.PI * 6.0 / i6 as double) * 2.0;
			let  d16: double = i15 as double;
			if(i15 > i6 / 2) {
				d16 = (i6 - 1 - i15) as double;
			}

			if(d16 < 4.0) {
				d16 = 4.0 - d16;
				d14[i15] -= d16 * d16 * d16 * 10.0;
			}
		}

		for(i15 = 0; i15 < i5; ++i15) {
			for(let  i36: int = 0; i36 < i7; ++i36) {
				let  d17: double = (this.field_4172_f[i13] + 256.0) / 512.0;
				if(d17 > 1.0) {
					d17 = 1.0;
				}

				let  d19: double = 0.0;
				let  d21: double = this.field_4171_g[i13] / 8000.0;
				if(d21 < 0.0) {
					d21 = -d21;
				}

				d21 = d21 * 3.0 - 3.0;
				if(d21 < 0.0) {
					d21 /= 2.0;
					if(d21 < -1.0) {
						d21 = -1.0;
					}

					d21 /= 1.4;
					d21 /= 2.0;
					d17 = 0.0;
				} else {
					if(d21 > 1.0) {
						d21 = 1.0;
					}

					d21 /= 6.0;
				}

				d17 += 0.5;
				d21 = d21 * i6 as double / 16.0;
				++i13;

				for(let  i23: int = 0; i23 < i6; ++i23) {
					let  d24: double = 0.0;
					let  d26: double = d14[i23];
					let  d28: double = this.field_4174_d[i12] / 512.0;
					let  d30: double = this.field_4173_e[i12] / 512.0;
					let  d32: double = (this.field_4175_c[i12] / 10.0 + 1.0) / 2.0;
					if(d32 < 0.0) {
						d24 = d28;
					} else if(d32 > 1.0) {
						d24 = d30;
					} else {
						d24 = d28 + (d30 - d28) * d32;
					}

					d24 -= d26;
					let  d34: double;
					if(i23 > i6 - 4) {
						d34 = ((i23 - (i6 - 4)) as float / 3.0) as double;
						d24 = d24 * (1.0 - d34) + -10.0 * d34;
					}

					if(i23 < d19) {
						d34 = (d19 - i23 as double) / 4.0;
						if(d34 < 0.0) {
							d34 = 0.0;
						}

						if(d34 > 1.0) {
							d34 = 1.0;
						}

						d24 = d24 * (1.0 - d34) + -10.0 * d34;
					}

					d1[i12] = d24;
					++i12;
				}
			}
		}

		return d1;
	}

	public chunkExists(i1: int, i2: int):  boolean {
		return true;
	}

	public async populate(iChunkProvider1: IChunkProvider| null, i2: int, i3: int):  Promise<void> {
		BlockSand.fallInstantly = true;
		let  i4: int = i2 * 16;
		let  i5: int = i3 * 16;

		let  i6: int;
		let  i7: int;
		let  i8: int;
		let  i9: int;
		for(i6 = 0; i6 < 8; ++i6) {
			i7 = i4 + this.hellRNG.nextInt(16) + 8;
			i8 = this.hellRNG.nextInt(120) + 4;
			i9 = i5 + this.hellRNG.nextInt(16) + 8;
			await (new  WorldGenHellLava(BlockRegistry.lavaStill.blockID)).generate(this.field_4164_n, this.hellRNG, i7, i8, i9);
		}

		i6 = this.hellRNG.nextInt(this.hellRNG.nextInt(10) + 1) + 1;

		let  i10: int;
		for(i7 = 0; i7 < i6; ++i7) {
			i8 = i4 + this.hellRNG.nextInt(16) + 8;
			i9 = this.hellRNG.nextInt(120) + 4;
			i10 = i5 + this.hellRNG.nextInt(16) + 8;
			await (new  WorldGenFire()).generate(this.field_4164_n, this.hellRNG, i8, i9, i10);
		}

		i6 = this.hellRNG.nextInt(this.hellRNG.nextInt(10) + 1);

		for(i7 = 0; i7 < i6; ++i7) {
			i8 = i4 + this.hellRNG.nextInt(16) + 8;
			i9 = this.hellRNG.nextInt(120) + 4;
			i10 = i5 + this.hellRNG.nextInt(16) + 8;
			await (new  WorldGenLightStone1()).generate(this.field_4164_n, this.hellRNG, i8, i9, i10);
		}

		for(i7 = 0; i7 < 10; ++i7) {
			i8 = i4 + this.hellRNG.nextInt(16) + 8;
			i9 = this.hellRNG.nextInt(128);
			i10 = i5 + this.hellRNG.nextInt(16) + 8;
			(new  WorldGenLightStone2()).generate(this.field_4164_n, this.hellRNG, i8, i9, i10);
		}

		if(this.hellRNG.nextInt(1) === 0) {
			i7 = i4 + this.hellRNG.nextInt(16) + 8;
			i8 = this.hellRNG.nextInt(128);
			i9 = i5 + this.hellRNG.nextInt(16) + 8;
			(new  WorldGenFlowers(BlockRegistry.mushroomBrown.blockID)).generate(this.field_4164_n, this.hellRNG, i7, i8, i9);
		}

		if(this.hellRNG.nextInt(1) === 0) {
			i7 = i4 + this.hellRNG.nextInt(16) + 8;
			i8 = this.hellRNG.nextInt(128);
			i9 = i5 + this.hellRNG.nextInt(16) + 8;
			await (new  WorldGenFlowers(BlockRegistry.mushroomRed.blockID)).generate(this.field_4164_n, this.hellRNG, i7, i8, i9);
		}

		BlockSand.fallInstantly = false;
	}

	public async saveChunks(z1: boolean, iProgressUpdate2: IProgressUpdate| null):  Promise<boolean> {
		return true;
	}

	public func_532_a():  boolean {
		return false;
	}

	public func_536_b():  boolean {
		return true;
	}

	public toString():  string {
		return "HellRandomLevelSource";
	}
}
