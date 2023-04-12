


import { JavaObject, int, float, java, long, double } from "../jree/index";
import { WorldProviderHell } from "./WorldProviderHell";
import { WorldChunkManager } from "./WorldChunkManager";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MathHelper } from "./MathHelper";
import { IChunkProvider } from "./IChunkProvider";
import { IChunkLoader } from "./IChunkLoader";
import { ChunkProviderGenerate } from "./ChunkProviderGenerate";
import { ChunkLoader } from "./ChunkLoader";
import { File } from "../jree/java/io/index";
import { Block } from "./Block";

export  class WorldProvider extends JavaObject {
	public worldObj:  World;
	public worldChunkMgr:  WorldChunkManager;
	public field_4220_c:  boolean = false;
	public isHellWorld:  boolean = false;
	public field_6478_e:  boolean = false;
	public lightBrightnessTable:  Float64Array = new   Float64Array(16);
	public worldType:  int = 0;
	private field_4217_f:  Float64Array = new   Float64Array(4);

	public registerWorld(world1: World):  void {
		this.worldObj = world1;
		this.registerWorldChunkManager();
		this.generateLightBrightnessTable();
	}

	protected generateLightBrightnessTable():  void {
		let  f1: float = 0.05;

		for(let  i2: int = 0; i2 <= 15; ++i2) {
			let  f3: float = 1.0 - i2 as float / 15.0;
			this.lightBrightnessTable[i2] = (1.0 - f3) / (f3 * 3.0 + 1.0) * (1.0 - f1) + f1;
		}

	}

	protected registerWorldChunkManager():  void {
		this.worldChunkMgr = new  WorldChunkManager(this.worldObj);
	}

	public getChunkProvider():  IChunkProvider {
		return new  ChunkProviderGenerate(this.worldObj, this.worldObj.randomSeed);
	}

	public async getChunkLoader(file1: File):  Promise<IChunkLoader> {
		return new  ChunkLoader(file1, true);
	}

	public async canCoordinateBeSpawn(i1: int, i2: int):  Promise<boolean> {
		// return true;
		let  i3: int = await this.worldObj.getFirstUncoveredBlock(i1, i2);
		// // TODO: Fix
		return i3 === Block.sand.blockID;
		// return i3 === Block.stone.blockID;

	}

	public calculateCelestialAngle(j1: long, f3: float):  float {
		let  i4: int = (Number(j1) % 24000) as int;
		let  f5: float = (i4 as float + f3) / 24000.0 - 0.25;
		if(f5 < 0.0) {
			++f5;
		}

		if(f5 > 1.0) {
			--f5;
		}

		let  f6: float = f5;
		f5 = 1.0 - ((java.lang.Math.cos(f5 as double * java.lang.Math.PI) + 1.0) / 2.0) as float;
		f5 = f6 + (f5 - f6) / 3.0;
		return f5;
	}

	public func_4097_b(f1: float, f2: float):  Float64Array | undefined {
		let  f3: float = 0.4;
		let  f4: float = MathHelper.cos(f1 * java.lang.Math.PI as float * 2.0) - 0.0;
		let  f5: float = -0.0;
		if(f4 >= f5 - f3 && f4 <= f5 + f3) {
			let  f6: float = (f4 - f5) / f3 * 0.5 + 0.5;
			let  f7: float = 1.0 - (1.0 - MathHelper.sin(f6 * java.lang.Math.PI as float)) * 0.99;
			f7 *= f7;
			this.field_4217_f[0] = f6 * 0.3 + 0.7;
			this.field_4217_f[1] = f6 * f6 * 0.7 + 0.2;
			this.field_4217_f[2] = f6 * f6 * 0.0 + 0.2;
			this.field_4217_f[3] = f7;
			return this.field_4217_f;
		} else {
			return undefined;
		}
	}

	public func_4096_a(f1: float, f2: float):  Vec3D | undefined {
		let  f3: float = MathHelper.cos(f1 * java.lang.Math.PI as float * 2.0) * 2.0 + 0.5;
		if(f3 < 0.0) {
			f3 = 0.0;
		}

		if(f3 > 1.0) {
			f3 = 1.0;
		}

		let  f4: float = 0.7529412;
		let  f5: float = 0.84705883;
		let  f6: float = 1.0;
		f4 *= f3 * 0.94 + 0.06;
		f5 *= f3 * 0.94 + 0.06;
		f6 *= f3 * 0.91 + 0.09;
		return Vec3D.createVector(f4 as double, f5 as double, f6 as double);
	}

	public canRespawnHere():  boolean {
		return true;
	}

	public static func_4101_a(i0: int):  WorldProvider | undefined {
		return (i0 === 0 ? new  WorldProvider() : (i0 === -1 ? new  WorldProviderHell() : undefined)) as WorldProvider;
	}
}
