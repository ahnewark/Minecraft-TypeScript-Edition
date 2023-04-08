
import { int, java, double, float } from "jree";
// import { TileEntity } from "./TileEntity";
// import { Entity } from "./Entity";

export interface IWorldAccess {
	 func_934_a(i1: int, i2: int, i3: int): void;
	 markBlockRangeNeedsUpdate(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int): void;
	 playSound(string1: java.lang.String| null, d2: double, d4: double, d6: double, f8: float, f9: float): void;
	 spawnParticle(string1: java.lang.String| null, d2: double, d4: double, d6: double, d8: double, d10: double, d12: double): void;
	//  obtainEntitySkin(entity1: Entity| null): void;
	//  releaseEntitySkin(entity1: Entity| null): void;
	 updateAllRenderers(): void;
	 playRecord(string1: java.lang.String| null, i2: int, i3: int, i4: int): void;
	//  doNothingWithTileEntity(i1: int, i2: int, i3: int, tileEntity4: TileEntity| null): void;
}
