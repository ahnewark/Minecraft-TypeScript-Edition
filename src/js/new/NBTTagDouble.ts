


import { double, java, byte, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagDouble extends NBTBase {
	public doubleValue:  double;

	public constructor();

	public constructor(d1: double);

    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [d1] = args as [double];
				super();
				this.doubleValue = d1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public writeTagContents(dataOutput1: DataOutput): void {
		dataOutput1.writeDouble(this.doubleValue);
	}

	public readTagContents(dataInput1: DataInput): void {
		this.doubleValue = dataInput1.readDouble();
	}

	public getType(): number {
		return 6;
	}

	public toString():  string {
		return "" + this.doubleValue;
	}
}
