


import { java, byte } from "jree";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagEnd extends NBTBase {
	public readTagContents(dataInput1: DataInput): void {
	}

	public writeTagContents(dataOutput1: DataOutput): void {
	}

	public getType(): number {
		return 0;
	}

	public toString():  string {
		return "END";
	}
}
