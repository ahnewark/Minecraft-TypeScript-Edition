
import { JavaObject, int, java } from "../jree/index";

export  class ChunkCoordIntPair extends JavaObject {
	public chunkXPos:  int;
	public chunkZPos:  int;

	public constructor(i1: int, i2: int) {
		super();
		this.chunkXPos = i1;
		this.chunkZPos = i2;
	}

	public hashCode():  int {
		return this.chunkXPos << 8 | this.chunkZPos;
	}

	public equals(object1: java.lang.Object| null):  boolean {
		let  chunkCoordIntPair2: ChunkCoordIntPair = object1 as ChunkCoordIntPair;
		return chunkCoordIntPair2.chunkXPos === this.chunkXPos && chunkCoordIntPair2.chunkZPos === this.chunkZPos;
	}
}
