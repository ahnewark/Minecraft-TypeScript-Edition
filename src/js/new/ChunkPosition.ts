
import { JavaObject, java } from "jree";

export  class ChunkPosition extends JavaObject {
	public readonly x:  number;
	public readonly y:  number;
	public readonly z:  number;

	public constructor(i1: number, i2: number, i3: number) {
		super();
        this.x = i1;
		this.y = i2;
		this.z = i3;
	}

	public equals(object1: java.lang.Object| null):  boolean {
		if(!(object1 instanceof ChunkPosition)) {
			return false;
		} else {
			let  chunkPosition2: ChunkPosition = object1 as ChunkPosition;
			return chunkPosition2.x === this.x && chunkPosition2.y === this.y && chunkPosition2.z === this.z;
		}
	}

	public hashCode():  number {
		return this.x * 8976890 + this.y * 981131 + this.z;
	}
}
