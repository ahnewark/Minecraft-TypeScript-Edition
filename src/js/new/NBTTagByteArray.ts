


import { java, int, byte, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagByteArray extends NBTBase {
	public byteArray:  Int8Array;

	public constructor();

	public constructor(b1: Int8Array);

    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [b1] = args as [Int8Array];
				super();
				this.byteArray = b1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		await dataOutput1.writeInt(this.byteArray.length);
		await dataOutput1.write(this.byteArray);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		let  i2: int = await dataInput1.readInt();
		this.byteArray = new Int8Array(i2);
		await dataInput1.readFully(this.byteArray);
	}

	public getType(): number {
		return 7;
	}

	public toString():  string {
		return "[" + this.byteArray.length + " bytes]";
	}
}
