


import { byte, java, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagByte extends NBTBase {
	public byteValue: number;

	public constructor();

	public constructor(b1: number);

    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [b1] = args as [byte];
				super();
				this.byteValue = b1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		await dataOutput1.writeByte(this.byteValue);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.byteValue = await dataInput1.readByte();
	}

	public getType(): number {
		return 1;
	}

	public toString():  string {
		return "" + this.byteValue;
	}
}
