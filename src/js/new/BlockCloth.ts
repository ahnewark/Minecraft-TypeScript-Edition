
import { Material } from "./Material";
import { Block } from "./Block";

export  class BlockCloth extends Block {
	public constructor() {
		super(35, 64, Material.cloth);
	}

	public getBlockTextureFromSideAndMetadata(i1: number, i2: number):  number {
		if(i2 === 0) {
			return this.blockIndexInTexture;
		} else {
			i2 = ~(i2 & 15);
			return 113 + ((i2 & 8) >> 3) + (i2 & 7) * 16;
		}
	}

	protected damageDropped(i1: number):  number {
		return i1;
	}

	public static func_21034_c(i0: number):  number {
		return ~i0 & 15;
	}

	public static func_21035_d(i0: number):  number {
		return ~i0 & 15;
	}
}
