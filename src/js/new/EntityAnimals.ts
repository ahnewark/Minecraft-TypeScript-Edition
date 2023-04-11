
import { float, int } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { EntityCreature } from "./EntityCreature";
import { BlockRegistry } from "./moved/BlockRegistry";

export abstract  class EntityAnimals extends EntityCreature {
	public constructor(world1: World| null) {
		super(world1);
	}

	protected async getBlockPathWeight(i1: int, i2: int, i3: int):  Promise<float> {
		return await this.worldObj.getBlockId(i1, i2 - 1, i3) === BlockRegistry.grass.blockID ? 10.0 : await this.worldObj.getLightBrightness(i1, i2, i3) - 0.5;
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	public async getCanSpawnHere():  Promise<boolean> {
		let  i1: int = MathHelper.floor_double(this.posX);
		let  i2: int = MathHelper.floor_double(this.boundingBox.minY);
		let  i3: int = MathHelper.floor_double(this.posZ);
		return await this.worldObj.getBlockId(i1, i2 - 1, i3) === BlockRegistry.grass.blockID && await this.worldObj.getBlockLightValue(i1, i2, i3) > 8 && await super.getCanSpawnHere();
	}

	public func_421_b():  int {
		return 120;
	}
}
