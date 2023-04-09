


import { int, java, long, S } from "../jree/index";
import { World } from "./World";
// import { TileEntity } from "./TileEntity";
import { EnumSkyBlock } from "./EnumSkyBlock";
// import { Entity } from "./Entity";
import { Chunk } from "./Chunk";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";




export  class EmptyChunk extends Chunk {
	public constructor(world1: World| null, i2: int, i3: int);

	public constructor(world1: World| null, b2: Int8Array, i3: int, i4: int);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 3: {
				const [world1, i2, i3] = args as [World, int, int];


		super(world1, i2, i3);
		this.neverSave = true;
	

				break;
			}

			case 4: {
				const [world1, b2, i3, i4] = args as [World, Int8Array, int, int];


		super(world1, b2, i3, i4);
		this.neverSave = true;
	

				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public isAtLocation(i1: int, i2: int):  boolean {
		return i1 === this.xPosition && i2 === this.zPosition;
	}

	public getHeightValue(i1: int, i2: int):  int {
		return 0;
	}

	public func_1014_a():  void {
	}

	public generateHeightMap():  void {
	}

	public func_1024_c():  void {
	}

	public func_4143_d():  void {
	}

	public getBlockID(i1: int, i2: int, i3: int):  int {
		return 0;
	}

	public setBlockIDWithMetadata(i1: int, i2: int, i3: int, i4: int, i5: int):  boolean {
		return true;
	}

	public setBlockID(i1: int, i2: int, i3: int, i4: int):  boolean {
		return true;
	}

	public getBlockMetadata(i1: int, i2: int, i3: int):  int {
		return 0;
	}

	public setBlockMetadata(i1: int, i2: int, i3: int, i4: int):  void {
	}

	public getSavedLightValue(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int):  int {
		return 0;
	}

	public setLightValue(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int):  void {
	}

	public getBlockLightValue(i1: int, i2: int, i3: int, i4: int):  int {
		return 0;
	}

	// public addEntity(entity1: Entity| null):  void {
	// }

	// public func_1015_b(entity1: Entity| null):  void {
	// }

	// public func_1016_a(entity1: Entity| null, i2: int):  void {
	// }

	public canBlockSeeTheSky(i1: int, i2: int, i3: int):  boolean {
		return false;
	}

	// public getChunkBlockTileEntity(i1: int, i2: int, i3: int):  TileEntity | null {
	// 	return null;
	// }

	// public func_1001_a(tileEntity1: TileEntity| null):  void {
	// }

	// public setChunkBlockTileEntity(i1: int, i2: int, i3: int, tileEntity4: TileEntity| null):  void {
	// }

	public removeChunkBlockTileEntity(i1: int, i2: int, i3: int):  void {
	}

	public onChunkLoad():  void {
	}

	public onChunkUnload():  void {
	}

	public setChunkModified():  void {
	}

	// public getEntitiesWithinAABBForEntity(entity1: Entity| null, axisAlignedBB2: AxisAlignedBB| null, list3: java.util.List| null):  void {
	// }

	// public getEntitiesOfTypeWithinAAAB(class1: java.lang.Class| null, axisAlignedBB2: AxisAlignedBB| null, list3: java.util.List| null):  void {
	// }

	public needsSaving(z1: boolean):  boolean {
		return false;
	}

	public setChunkData(b1: Int8Array, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int, i8: int):  int {
		let  i9: int = i5 - i2;
		let  i10: int = i6 - i3;
		let  i11: int = i7 - i4;
		let  i12: int = i9 * i10 * i11;
		return i12 + i12 / 2 * 3;
	}

	public func_997_a(j1: long): Random {
		return new  Random(this.worldObj.randomSeed + BigInt(this.xPosition * this.xPosition * 4987142) + BigInt(this.xPosition * 5947611) + BigInt(this.zPosition * this.zPosition)* 4392871n + (this.zPosition * 389711) ^ j1);
	}

	public func_21167_h():  boolean {
		return true;
	}
}
