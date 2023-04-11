


import { double, int, java } from "../jree/index";
import { WorldChunkManager } from "./WorldChunkManager";
import { MobSpawnerBase } from "./MobSpawnerBase";
import { ChunkCoordIntPair } from "./ChunkCoordIntPair";

export  class WorldChunkManagerHell extends WorldChunkManager {
	private field_4201_e:  MobSpawnerBase | null;
	private field_4200_f:  double;
	private field_4199_g:  double;

	public constructor(mobSpawnerBase1: MobSpawnerBase| null, d2: double, d4: double) {
		super();
		this.field_4201_e = mobSpawnerBase1;
		this.field_4200_f = d2;
		this.field_4199_g = d4;
	}

	public func_4074_a(chunkCoordIntPair1: ChunkCoordIntPair| null):  MobSpawnerBase | null {
		return this.field_4201_e;
	}

	public func_4073_a(i1: int, i2: int):  MobSpawnerBase | null {
		return this.field_4201_e;
	}

	public func_4072_b(i1: int, i2: int):  double {
		return this.field_4200_f;
	}

	public func_4069_a(i1: int, i2: int, i3: int, i4: int):  MobSpawnerBase[] | null {
		this.field_4195_d = this.loadBlockGeneratorData(this.field_4195_d, i1, i2, i3, i4);
		return this.field_4195_d;
	}

	public getTemperatures(d1: Float64Array, i2: int, i3: int, i4: int, i5: int):  Float64Array {
		if(d1 === null || d1.length < i4 * i5) {
			d1 = new  Float64Array(i4 * i5);
		}

		d1.fill(this.field_4200_f, 0, i4 * i5);
		return d1;
	}

	public loadBlockGeneratorData(mobSpawnerBase1: MobSpawnerBase[]| null, i2: int, i3: int, i4: int, i5: int):  MobSpawnerBase[] | null {
		if(mobSpawnerBase1 === null || mobSpawnerBase1.length < i4 * i5) {
			mobSpawnerBase1 = new   Array<MobSpawnerBase>(i4 * i5);
			this.temperature = new  Float64Array(i4 * i5);
			this.humidity = new  Float64Array(i4 * i5);
		}

		mobSpawnerBase1.fill(this.field_4201_e, 0, i4 * i5);
		this.humidity.fill(this.field_4199_g, 0, i4 * i5);
		this.temperature.fill(this.field_4200_f, 0, i4 * i5);
		return mobSpawnerBase1;
	}
}
