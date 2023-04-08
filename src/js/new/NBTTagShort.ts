


import { short, java, S } from "jree";
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


	public writeTagContents(dataOutput1: DataOutput): void {
		dataOutput1.writeShort(this.shortValue);
	}

	public readTagContents(dataInput1: DataInput): void {
		this.shortValue = dataInput1.readShort();
	}

	public getType(): number {
		return 2;
	}

	public toString():  string {
		return "" + this.shortValue;
	}
}
