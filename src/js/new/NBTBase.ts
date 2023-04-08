


import { NBTTagString } from "./NBTTagString";
import { NBTTagShort } from "./NBTTagShort";
import { NBTTagLong } from "./NBTTagLong";
import { NBTTagList } from "./NBTTagList";
import { NBTTagInt } from "./NBTTagInt";
import { NBTTagFloat } from "./NBTTagFloat";
import { NBTTagEnd } from "./NBTTagEnd";
import { NBTTagDouble } from "./NBTTagDouble";
import { NBTTagCompound } from "./NBTTagCompound";
import { NBTTagByteArray } from "./NBTTagByteArray";
import { NBTTagByte } from "./NBTTagByte";
import { DataOutput } from "../java/io/DataOutput";
import { DataInput } from "../java/io/DataInput";

export abstract  class NBTBase {
	private key: string | null = null;

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

	public static readTag(dataInput0: DataInput):  NBTBase {
		let  b1: number = dataInput0.readByte();
		if(b1 === 0) {
			return new  NBTTagEnd();
		} else {
			let  nBTBase2: NBTBase = NBTBase.createTagOfType(b1);
			nBTBase2.key = dataInput0.readUTF();
			nBTBase2.readTagContents(dataInput0);
			return nBTBase2;
		}
	}

	public static writeTag(nBTBase0: NBTBase, dataOutput1: DataOutput):  void {
		dataOutput1.writeByte(nBTBase0.getType());
		if(nBTBase0.getType() !== 0) {
			dataOutput1.writeUTF(nBTBase0.getKey());
			nBTBase0.writeTagContents(dataOutput1);
		}
	}

	private static tagMap: [string, () => NBTBase][] = [
		['TAG_End', () => new NBTTagEnd()],
		['TAG_End', () => new NBTTagByte()],
		['TAG_End', () => new NBTTagShort()],
		['TAG_End', () => new NBTTagInt()],
		['TAG_End', () => new NBTTagLong()],
		['TAG_End', () => new NBTTagFloat()],
		['TAG_End', () => new NBTTagDouble()],
		['TAG_End', () => new NBTTagByteArray()],
		['TAG_End', () => new NBTTagString()],
		['TAG_End', () => new NBTTagList()],
		['TAG_End', () => new NBTTagCompound()]
	]

	public static createTagOfType(tagId: number):  NBTBase {
		if (this.tagMap.length >= tagId) {
			throw new Error(`Unrecognized NBT tag ID ${tagId}`)
		}
		return NBTBase.tagMap[tagId][1]();
	}

	public static getTagName(tagId: number):  string {
		return NBTBase.tagMap[tagId][0];
	}
}
