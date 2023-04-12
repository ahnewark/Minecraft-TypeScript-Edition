import { float, double, int, java, long, JavaString } from "../jree/index";
import { WorldProvider } from "./WorldProvider";
import { WorldChunkManagerHell } from "./WorldChunkManagerHell";
import { Vec3D } from "./Vec3D";
import { IChunkProvider } from "./IChunkProvider";
import { IChunkLoader } from "./IChunkLoader";
import { ChunkProviderHell } from "./ChunkProviderHell";
import { ChunkLoader } from "./ChunkLoader";
import { Block } from "./Block";
import { File } from "../jree/java/io/index";

import { MobSpawnerBase } from "./MobSpawnerBase";

export  class WorldProviderHell extends WorldProvider {
	public registerWorldChunkManager():  void {
		this.worldChunkMgr = new  WorldChunkManagerHell(MobSpawnerBase.hell, 1.0, 0.0);
		this.field_4220_c = true;
		this.isHellWorld = true;
		this.field_6478_e = true;
		this.worldType = -1;
	}

	public func_4096_a(f1: float, f2: float):  Vec3D | undefined {
		return Vec3D.createVector(0.2 as double, 0.03 as double, 0.03 as double);
	}

	protected generateLightBrightnessTable():  void {
		let  f1: float = 0.1;

		for(let  i2: int = 0; i2 <= 15; ++i2) {
			let  f3: float = 1.0 - i2 as float / 15.0;
			this.lightBrightnessTable[i2] = (1.0 - f3) / (f3 * 3.0 + 1.0) * (1.0 - f1) + f1;
		}
	}

	public getChunkProvider():  IChunkProvider | undefined {
		return new  ChunkProviderHell(this.worldObj, this.worldObj.randomSeed);
	}

	public async getChunkLoader(file1: java.io.File| undefined):  Promise<IChunkLoader | undefined> {
		let  file2: java.io.File = new File(file1, new JavaString("DIM-1"));
		await file2.mkdirs();
		return new  ChunkLoader(file2, true);
	}

	public async canCoordinateBeSpawn(i1: int, i2: int):  Promise<boolean> {
		let  i3: int = await this.worldObj.getFirstUncoveredBlock(i1, i2);
		return i3 === Block.bedrock.blockID ? false : (i3 === 0 ? false : Block.opaqueCubeLookup[i3]);
	}

	public calculateCelestialAngle(j1: long, f3: float):  float {
		return 0.5;
	}

	public canRespawnHere():  boolean {
		return false;
	}
}
