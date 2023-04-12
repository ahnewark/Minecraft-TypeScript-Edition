
import { java, int } from "../jree/index";
import { TileEntity } from "./TileEntity";
import { NBTTagCompound } from "./NBTTagCompound";

export class TileEntitySign extends TileEntity {
	public signText:  string[] =  ["", "", "", ""];
	public lineBeingEdited:  int = -1;

	public get name() {
		return 'Sign'
	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		super.writeToNBT(nBTTagCompound1);
		nBTTagCompound1.setString("Text1", this.signText[0]);
		nBTTagCompound1.setString("Text2", this.signText[1]);
		nBTTagCompound1.setString("Text3", this.signText[2]);
		nBTTagCompound1.setString("Text4", this.signText[3]);
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		super.readFromNBT(nBTTagCompound1);

		for(let  i2: int = 0; i2 < 4; ++i2) {
			this.signText[i2] = nBTTagCompound1.getString("Text" + (i2 + 1));
			if(this.signText[i2].length > 15) {
				this.signText[i2] = this.signText[i2].substring(0, 15);
			}
		}

	}
}
