


import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagList extends NBTBase {
	private tagList: NBTBase[];
	private tagType: number;

	public writeTagContents(dataOutput1: DataOutput): void {
		if(this.tagList.length > 0) {
			this.tagType = (this.tagList[0]).getType();
		} else {
			this.tagType = 1;
		}

		dataOutput1.writeByte(this.tagType);
		dataOutput1.writeInt(this.tagList.length);

		for(let  i2: number = 0; i2 < this.tagList.length; ++i2) {
			this.tagList[i2].writeTagContents(dataOutput1);
		}

	}

	public readTagContents(dataInput1: DataInput): void {
		this.tagType = dataInput1.readByte();
		let  i2: number = dataInput1.readInt();
		this.tagList = [];

		for(let  i3: number = 0; i3 < i2; ++i3) {
			let  nBTBase4: NBTBase = NBTBase.createTagOfType(this.tagType);
			nBTBase4.readTagContents(dataInput1);
			this.tagList.push(nBTBase4);
		}

	}

	public getType(): number {
		return 9;
	}

	public toString():  string {
		return "" + this.tagList.length + " entries of type " + NBTBase.getTagName(this.tagType);
	}

	public setTag(nBTBase1: NBTBase):  void {
		this.tagType = nBTBase1.getType();
		this.tagList.push(nBTBase1);
	}

	public tagAt(i1: number):  NBTBase {
		return this.tagList[i1] as NBTBase;
	}

	public tagCount():  number {
		return this.tagList.length;
	}
}
