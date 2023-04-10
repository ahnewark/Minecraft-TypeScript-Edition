


import { long, java, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagLong extends NBTBase {
	public longValue:  long;

	public constructor();

	public constructor(j1: long);

    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [j1] = args as [long];
				super();
				this.longValue = j1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		await dataOutput1.writeLong(this.longValue);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.longValue = await dataInput1.readLong();
	}

	public getType(): number {
		return 4;
	}

	public toString():  string {
		return "" + this.longValue;
	}
}
