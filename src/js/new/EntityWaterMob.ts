
import { int } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { EntityCreature } from "./EntityCreature";

export  class EntityWaterMob extends EntityCreature {
	public constructor(world1: World| null) {
		super(world1);
	}

	public override get type(): string {
		return 'WaterMob';
	}

	public canBreatheUnderwater():  boolean {
		return true;
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	public async getCanSpawnHere():  Promise<boolean> {
		return await this.worldObj.checkIfAABBIsClear(this.boundingBox);
	}

	public func_421_b():  int {
		return 120;
	}
}
