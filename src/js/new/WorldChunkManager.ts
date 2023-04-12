


import { java, int, double, S } from "../jree/index";
import { World } from "./World";
import { NoiseGeneratorOctaves2 } from "./NoiseGeneratorOctaves2";
import { Random } from "../java/util/Random";
import { ChunkCoordIntPair } from "./ChunkCoordIntPair";
import { MobSpawnerBase } from "./MobSpawnerBase";

export class WorldChunkManager {
	private field_4194_e:  NoiseGeneratorOctaves2;
	private field_4193_f:  NoiseGeneratorOctaves2;
	private field_4192_g:  NoiseGeneratorOctaves2;
	public temperature:  Float64Array = new Float64Array(16*16);
	public humidity:  Float64Array = new Float64Array(16*16);
	public field_4196_c:  Float64Array;
	
    public field_4195_d:  MobSpawnerBase[];

	public constructor();

	public constructor(world1: World);
    
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				break;
			}

			case 1: {
				const [world1] = args as [World];

                this.field_4194_e = new  NoiseGeneratorOctaves2(new  Random(world1.randomSeed * 9871n), 4);
                this.field_4193_f = new  NoiseGeneratorOctaves2(new  Random(world1.randomSeed * 39811n), 4);
                this.field_4192_g = new  NoiseGeneratorOctaves2(new  Random(world1.randomSeed * 543321n), 2);
	
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public func_4074_a(chunkCoordIntPair1: ChunkCoordIntPair):  MobSpawnerBase  {
		return this.func_4073_a(chunkCoordIntPair1.chunkXPos, chunkCoordIntPair1.chunkZPos);
	}

	public func_4073_a(i1: int, i2: int):  MobSpawnerBase {
		return this.func_4069_a(i1, i2, 1, 1)[0];
	}

	public func_4072_b(i1: int, i2: int):  double {
		this.temperature = this.field_4194_e.func_4112_a(this.temperature, i1 as double, i2 as double, 1, 1, 0.02500000037252903, 0.02500000037252903, 0.5);
		return this.temperature[0];
	}

	public func_4069_a(i1: int, i2: int, i3: int, i4: int):  MobSpawnerBase[] {
		this.field_4195_d = this.loadBlockGeneratorData(this.field_4195_d, i1, i2, i3, i4);
		return this.field_4195_d;
	}

	public getTemperatures(d1: Float64Array, i2: int, i3: int, i4: int, i5: int):  Float64Array {
		if(d1 === undefined || d1.length < i4 * i5) {
			d1 = new   Float64Array(i4 * i5);
		}

		d1 = this.field_4194_e.func_4112_a(d1, i2 as double, i3 as double, i4, i4, 0.02500000037252903, 0.02500000037252903, 0.25);
		this.field_4196_c = this.field_4192_g.func_4112_a(this.field_4196_c, i2 as double, i3 as double, i4, i4, 0.25, 0.25, 0.5882352941176471);
		let  i6: int = 0;

		for(let  i7: int = 0; i7 < i4; ++i7) {
			for(let  i8: int = 0; i8 < i5; ++i8) {
				let  d9: double = this.field_4196_c[i6] * 1.1 + 0.5;
				let  d11: double = 0.01;
				let  d13: double = 1.0 - d11;
				let  d15: double = (d1[i6] * 0.15 + 0.7) * d13 + d9 * d11;
				d15 = 1.0 - (1.0 - d15) * (1.0 - d15);
				if(d15 < 0.0) {
					d15 = 0.0;
				}

				if(d15 > 1.0) {
					d15 = 1.0;
				}

				d1[i6] = d15;
				++i6;
			}
		}

		return d1;
	}

	public loadBlockGeneratorData(mobSpawnerBase1: MobSpawnerBase[], i2: int, i3: int, i4: int, i5: int):  MobSpawnerBase[] {
		if(!mobSpawnerBase1|| mobSpawnerBase1.length < i4 * i5) {
			mobSpawnerBase1 = new   Array<MobSpawnerBase>(i4 * i5);
		}

		this.temperature = this.field_4194_e.func_4112_a(this.temperature, i2 as double, i3 as double, i4, i4, 0.02500000037252903, 0.02500000037252903, 0.25);
		this.humidity = this.field_4193_f.func_4112_a(this.humidity, i2 as double, i3 as double, i4, i4, 0.05 as double, 0.05 as double, 0.3333333333333333);
		this.field_4196_c = this.field_4192_g.func_4112_a(this.field_4196_c, i2 as double, i3 as double, i4, i4, 0.25, 0.25, 0.5882352941176471);
		let  i6: int = 0;

		for(let  i7: int = 0; i7 < i4; ++i7) {
			for(let  i8: int = 0; i8 < i5; ++i8) {
				let  d9: double = this.field_4196_c[i6] * 1.1 + 0.5;
				let  d11: double = 0.01;
				let  d13: double = 1.0 - d11;
				let  d15: double = (this.temperature[i6] * 0.15 + 0.7) * d13 + d9 * d11;
				d11 = 0.002;
				d13 = 1.0 - d11;
				let  d17: double = (this.humidity[i6] * 0.15 + 0.5) * d13 + d9 * d11;
				d15 = 1.0 - (1.0 - d15) * (1.0 - d15);
				if(d15 < 0.0) {
					d15 = 0.0;
				}

				if(d17 < 0.0) {
					d17 = 0.0;
				}

				if(d15 > 1.0) {
					d15 = 1.0;
				}

				if(d17 > 1.0) {
					d17 = 1.0;
				}

				this.temperature[i6] = d15;
				this.humidity[i6] = d17;
				mobSpawnerBase1[i6++] = MobSpawnerBase.getBiomeFromLookup(d15, d17);
			}
		}

		return mobSpawnerBase1;
	}
}
