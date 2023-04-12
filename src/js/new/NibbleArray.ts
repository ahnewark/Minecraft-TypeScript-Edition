
import { java, S } from "../jree/index";

export  class NibbleArray {
	public readonly data:  Int8Array;

	public constructor(i1: number);

	public constructor(b1: Int8Array);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 1: {
				if (typeof args[0] === 'number') {
					const [i1] = args as [number];
					this.data = new Int8Array(i1 >> 1);
					break;
				} else {
					const [b1] = args as [Int8Array];
					this.data = b1;
					break;
				}
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public getNibble(i1: number, i2: number, i3: number):  number {
		let  i4: number = i1 << 11 | i3 << 7 | i2;
		let  i5: number = i4 >> 1;
		let  i6: number = i4 & 1;
		return i6 === 0 ? this.data[i5] & 15 : this.data[i5] >> 4 & 15;
	}

	public setNibble(i1: number, i2: number, i3: number, i4: number):  void {
		let  i5: number = i1 << 11 | i3 << 7 | i2;
		let  i6: number = i5 >> 1;
		let  i7: number = i5 & 1;
		if(i7 === 0) {
			this.data[i6] = (this.data[i6] & 240 | i4 & 15);
		} else {
			this.data[i6] = (this.data[i6] & 15 | (i4 & 15) << 4);
		}

	}

	public isValid():  boolean {
		return this.data !== undefined;
	}
}
