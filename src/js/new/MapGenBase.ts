


import { java, long } from "jree";
import { World } from "./World";
import { IChunkProvider } from "./IChunkProvider";
import { Random } from "../java/util/Random";

export  class MapGenBase {
	protected field_1306_a:  number = 8;
	protected rand:  Random = new Random();

	public func_867_a(iChunkProvider1: IChunkProvider, world2: World, i3: number, i4: number, b5: Int8Array):  void {
		let  i6: number = this.field_1306_a;
		this.rand.setSeed(world2.randomSeed);
		let  j7: long = this.rand.nextLong() / 2n * 2n + 1n;
		let  j9: long = this.rand.nextLong() / 2n * 2n + 1n;

		for(let  i11: number = i3 - i6; i11 <= i3 + i6; ++i11) {
			for(let  i12: number = i4 - i6; i12 <= i4 + i6; ++i12) {
				this.rand.setSeed(BigInt(i11) * j7 + BigInt(i12) * j9 ^ world2.randomSeed);
				this.func_868_a(world2, i11, i12, i3, i4, b5);
			}
		}

	}

	protected func_868_a(world1: World| null, i2: number, i3: number, i4: number, i5: number, b6: Int8Array):  void {
	}
}
