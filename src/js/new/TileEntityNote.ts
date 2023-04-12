import { byte, int } from "../jree/index";
import { World } from "./World";
import { TileEntity } from "./TileEntity";
import { NBTTagCompound } from "./NBTTagCompound";
import { Material } from "./Material";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class TileEntityNote extends TileEntity {
	public note:  byte = 0;
	public previousRedstoneState:  boolean = false;

	public get name(): string {
		return 'Music';
	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeToNBT(nBTTagCompound1);
		nBTTagCompound1.setByte("note", this.note);
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readFromNBT(nBTTagCompound1);
		this.note = nBTTagCompound1.getByte("note");
		if(this.note < 0) {
			this.note = 0;
		}

		if(this.note > 24) {
			this.note = 24;
		}

	}

	public async changePitch():  Promise<void> {
		this.note = ((this.note + 1) % 25) as byte;
		await this.onInventoryChanged();
	}

	public async triggerNote(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(await world1.getBlockMaterial(i2, i3 + 1, i4) === MaterialRegistry.air) {
			let  material5: Material = await world1.getBlockMaterial(i2, i3 - 1, i4);
			let  b6: byte = 0;
			if(material5 === MaterialRegistry.rock) {
				b6 = 1;
			}

			if(material5 === MaterialRegistry.sand) {
				b6 = 2;
			}

			if(material5 === MaterialRegistry.glass) {
				b6 = 3;
			}

			if(material5 === MaterialRegistry.wood) {
				b6 = 4;
			}

			await world1.playNoteAt(i2, i3, i4, b6, this.note);
		}
	}
}
