


import { NBTTagString } from "../NBTTagString";
import { NBTTagShort } from "../NBTTagShort";
import { NBTTagLong } from "../NBTTagLong";
import { NBTTagList } from "../NBTTagList";
import { NBTTagInt } from "../NBTTagInt";
import { NBTTagFloat } from "../NBTTagFloat";
import { NBTTagEnd } from "../NBTTagEnd";
import { NBTTagDouble } from "../NBTTagDouble";
import { NBTTagCompound } from "../NBTTagCompound";
import { NBTTagByteArray } from "../NBTTagByteArray";
import { NBTTagByte } from "../NBTTagByte";
import { NBTBase } from "../NBTBase";
import { DataInput } from "../../java/io/DataInput";
import { DataOutput } from "../../java/io/DataOutput";

export class NBTRegistry {
	private static tagMap: [string, () => NBTBase][] = [
		['TAG_End', () => new NBTTagEnd()],
		['TAG_Byte', () => new NBTTagByte()],
		['TAG_Short', () => new NBTTagShort()],
		['TAG_Int', () => new NBTTagInt()],
		['TAG_Long', () => new NBTTagLong()],
		['TAG_Float', () => new NBTTagFloat()],
		['TAG_Double', () => new NBTTagDouble()],
		['TAG_Byte_Array', () => new NBTTagByteArray()],
		['TAG_String', () => new NBTTagString()],
		['TAG_List', () => new NBTTagList()],
		['TAG_Compound', () => new NBTTagCompound()]
	]

	public static async readTag(dataInput0: DataInput):  Promise<NBTBase> {
		let  b1: number = await dataInput0.readByte();
		if(b1 === 0) {
			return new  NBTTagEnd();
		} else {
			let  nBTBase2: NBTBase = NBTRegistry.createTagOfType(b1);
			nBTBase2.key = await dataInput0.readUTF();
			// console.debug('read tag', nBTBase2.getKey())
			await nBTBase2.readTagContents(dataInput0);
			return nBTBase2;
		}
	}

	public static async writeTag(nBTBase0: NBTBase, dataOutput1: DataOutput):  Promise<void> {
		await dataOutput1.writeByte(nBTBase0.getType());
		if(nBTBase0.getType() !== 0) {
			// console.debug('write tag ', nBTBase0.getKey());
			await dataOutput1.writeUTF(nBTBase0.getKey());
			await nBTBase0.writeTagContents(dataOutput1);
		}
	}

	public static createTagOfType(tagId: number):  NBTBase {
		if (NBTRegistry.tagMap.length <= tagId) {
			throw new Error(`Unrecognized NBT tag ID ${tagId}`)
		}
		return NBTRegistry.tagMap[tagId][1]();
	}

	public static getTagName(tagId: number):  string {
		return NBTRegistry.tagMap[tagId][0];
	}
}
