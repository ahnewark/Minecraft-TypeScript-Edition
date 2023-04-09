import { DataOutput } from "../java/io/DataOutput";
import { DataInput } from "../java/io/DataInput";

export abstract  class NBTBase {
	public key: string | null = null;

	public abstract writeTagContents(dataOutput1: DataOutput):  void;

	public abstract readTagContents(dataInput1: DataInput):  void;

	public abstract getType(): number;

	public getKey():  string {
		return this.key === null ? "" : this.key;
	}

	public setKey(string1: string):  NBTBase {
		this.key = string1;
		return this;
	}
}
