


import { short, java, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagShort extends NBTBase {
	public shortValue:  short;

	public constructor();

	public constructor(s1: short);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [s1] = args as [short];
				super();
				this.shortValue = s1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		await dataOutput1.writeShort(this.shortValue);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.shortValue = await dataInput1.readShort();
	}

	public getType(): number {
		return 2;
	}

	public toString():  string {
		return "" + this.shortValue;
	}
}
