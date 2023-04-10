import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTRegistry } from "./moved/NBTRegistry";
import { NBTBase } from "./NBTBase";

export  class NBTTagList extends NBTBase {
	private tagList: NBTBase[];
	private tagType: number;

	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		if(this.tagList.length > 0) {
			this.tagType = (this.tagList[0]).getType();
		} else {
			this.tagType = 1;
		}

		await dataOutput1.writeByte(this.tagType);
		await dataOutput1.writeInt(this.tagList.length);

		for(let  i2: number = 0; i2 < this.tagList.length; ++i2) {
			await this.tagList[i2].writeTagContents(dataOutput1);
		}

	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.tagType = await dataInput1.readByte();
		let  i2: number = await dataInput1.readInt();
		this.tagList = [];

		for(let  i3: number = 0; i3 < i2; ++i3) {
			let  nBTBase4: NBTBase = NBTRegistry.createTagOfType(this.tagType);
			await nBTBase4.readTagContents(dataInput1);
			this.tagList.push(nBTBase4);
		}

	}

	public getType(): number {
		return 9;
	}

	public toString():  string {
		return "" + this.tagList.length + " entries of type " + NBTRegistry.getTagName(this.tagType);
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
