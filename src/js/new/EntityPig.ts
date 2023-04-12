
import { byte, java, int } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityAnimals } from "./EntityAnimals";
import { Item } from "./Item";

export  class EntityPig extends EntityAnimals {
	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/pig.png";
		this.setSize(0.9, 0.9);
	}

	public override get type(): string {
		return 'Pig';
	}

	protected entityInit():  void {
		this.dataWatcher.addObject(16, 0, 'Byte');
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
		nBTTagCompound1.setBoolean("Saddle", this.func_21068_q());
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
		this.func_21069_a(nBTTagCompound1.getBoolean("Saddle"));
	}

	protected getLivingSound(): string {
		return "mob.pig";
	}

	protected getHurtSound(): string {
		return "mob.pig";
	}

	protected getDeathSound():  string {
		return "mob.pigdeath";
	}

	public async interact(entityPlayer1: EntityPlayer| null):  Promise<boolean> {
		if(!this.func_21068_q() || this.worldObj.multiplayerWorld || this.riddenByEntity !== null && this.riddenByEntity !== entityPlayer1) {
			return false;
		} else {
			entityPlayer1.mountEntity(this);
			return true;
		}
	}

	protected getDropItemId():  int {
		return Item.porkRaw.shiftedIndex;
	}

	public func_21068_q():  boolean {
		return (this.dataWatcher.getWatchableObjectByte(16) & 1) !== 0;
	}

	public func_21069_a(z1: boolean):  void {
		if(z1) {
			this.dataWatcher.updateObject(16, 1 as byte);
		} else {
			this.dataWatcher.updateObject(16, 0 as byte);
		}

	}
}
