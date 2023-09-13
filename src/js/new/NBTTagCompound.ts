


import { java, byte, short, int, long, float, double } from "../jree/index";
import { NBTTagString } from "./NBTTagString";
import { NBTTagShort } from "./NBTTagShort";
import { NBTTagLong } from "./NBTTagLong";
import { NBTTagList } from "./NBTTagList";
import { NBTTagInt } from "./NBTTagInt";
import { NBTTagFloat } from "./NBTTagFloat";
import { NBTTagDouble } from "./NBTTagDouble";
import { NBTTagByteArray } from "./NBTTagByteArray";
import { NBTTagByte } from "./NBTTagByte";
import { NBTBase } from "./NBTBase";
import { DataOutput } from "../java/io/DataOutput";
import { DataInput } from "../java/io/DataInput";
import { NBTRegistry } from "./static/NBTRegistry";

export  class NBTTagCompound extends NBTBase {
	private tagMap: Map<string, NBTBase> = new Map();

	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		for (let [, value] of this.tagMap.entries()) {
			await NBTRegistry.writeTag(value, dataOutput1);
		}

		await dataOutput1.writeByte(0);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.tagMap = new Map();

		let  nBTBase2: NBTBase;
		while((nBTBase2 = (await NBTRegistry.readTag(dataInput1))).getType() !== 0) {
			this.tagMap.set(nBTBase2.getKey(), nBTBase2);
		}

	}

	public getType(): number {
		return 10;
	}

	public setTag(string1: string, nBTBase2: NBTBase):  void {
		this.tagMap.set(string1, nBTBase2.setKey(string1));
	}

	public setByte(string1: string, b2: number):  void {
		this.tagMap.set(string1, (new  NBTTagByte(b2)).setKey(string1));
	}

	public setShort(string1: string, s2: short):  void {
		this.tagMap.set(string1, (new  NBTTagShort(s2)).setKey(string1));
	}

	public setInteger(string1: string, i2: int):  void {
		this.tagMap.set(string1, (new  NBTTagInt(i2)).setKey(string1));
	}

	public setLong(string1: string, j2: long):  void {
		this.tagMap.set(string1, (new  NBTTagLong(j2)).setKey(string1));
	}

	public setFloat(string1: string, f2: float):  void {
		this.tagMap.set(string1, (new  NBTTagFloat(f2)).setKey(string1));
	}

	public setDouble(string1: string, d2: double):  void {
		this.tagMap.set(string1, (new  NBTTagDouble(d2)).setKey(string1));
	}

	public setString(string1: string, string2: string):  void {
		this.tagMap.set(string1, (new  NBTTagString(string2)).setKey(string1));
	}

	public setByteArray(string1: string, b2: Int8Array):  void {
		this.tagMap.set(string1, (new  NBTTagByteArray(b2)).setKey(string1));
	}

	public setCompoundTag(string1: string, nBTTagCompound2: NBTTagCompound):  void {
		this.tagMap.set(string1, nBTTagCompound2.setKey(string1));
	}

	public setBoolean(string1: string, z2: boolean):  void {
		this.setByte(string1, (z2 ? 1 : 0));
	}

	public hasKey(string1: string):  boolean {
		return this.tagMap.has(string1);
	}

	public getByte(string1: string): number {
		return !this.tagMap.has(string1) ? 0 : (this.tagMap.get(string1) as NBTTagByte).byteValue;
	}

	public getShort(string1: string):  short {
		return !this.tagMap.has(string1) ? 0 : (this.tagMap.get(string1) as NBTTagShort).shortValue;
	}

	public getInteger(string1: string):  int {
		return !this.tagMap.has(string1) ? 0 : (this.tagMap.get(string1) as NBTTagInt).intValue;
	}

	public getLong(string1: string):  long {
		console.log('getting long' + string1, !this.tagMap.has(string1) ? 0n : (this.tagMap.get(string1) as NBTTagLong).longValue)
		return !this.tagMap.has(string1) ? 0n : (this.tagMap.get(string1) as NBTTagLong).longValue;
	}

	public getFloat(string1: string):  float {
		return !this.tagMap.has(string1) ? 0.0 : (this.tagMap.get(string1) as NBTTagFloat).floatValue;
	}

	public getDouble(string1: string):  double {
		return !this.tagMap.has(string1) ? 0.0 : (this.tagMap.get(string1) as NBTTagDouble).doubleValue;
	}

	public getString(string1: string):  string{
		return !this.tagMap.has(string1) ? "" : (this.tagMap.get(string1) as NBTTagString).stringValue;
	}

	public getByteArray(string1: string):  Int8Array {
		return !this.tagMap.has(string1) ? new  Int8Array(0) : (this.tagMap.get(string1) as NBTTagByteArray).byteArray;
	}

	public getCompoundTag(string1: string):  NBTTagCompound {
		return !this.tagMap.has(string1) ? new  NBTTagCompound() : this.tagMap.get(string1) as NBTTagCompound;
	}

	public getTagList(string1: string):  NBTTagList {
		return !this.tagMap.has(string1) ? new  NBTTagList() : this.tagMap.get(string1) as NBTTagList;
	}

	public getBoolean(string1: string):  boolean {
		return this.getByte(string1) !== 0;
	}

	public toString():  string {
		return "" + this.tagMap.size + " entries";
	}
}
