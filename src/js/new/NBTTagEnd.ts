


import { java, byte } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagEnd extends NBTBase {
	public async readTagContents(dataInput1: DataInput): Promise<void> {
	}

	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
	}

	public getType(): number {
		return 0;
	}

	public toString():  string {
		return "END";
	}
}
