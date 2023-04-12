


import { java, byte, int, double } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { ItemStack } from "./ItemStack";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityLiving } from "./EntityLiving";
import { EntityItem } from "./EntityItem";
import { EntityAnimals } from "./EntityAnimals";
import { Entity } from "./Entity";
import { Random } from "../java/util/Random";
import { Block } from "./Block";

export  class EntitySheep extends EntityAnimals {
	public static readonly field_21075_a = [[1.0, 1.0, 1.0], [0.95, 0.7, 0.2], [0.9, 0.5, 0.85], [0.6, 0.7, 0.95], [0.9, 0.9, 0.2], [0.5, 0.8, 0.1], [0.95, 0.7, 0.8], [0.3, 0.3, 0.3], [0.6, 0.6, 0.6], [0.3, 0.6, 0.7], [0.7, 0.4, 0.9], [0.2, 0.4, 0.8], [0.5, 0.4, 0.3], [0.4, 0.5, 0.2], [0.8, 0.3, 0.3], [0.1, 0.1, 0.1]];

	public override get type(): string {
		return 'Sheep';
	}

	public constructor(world1: World| undefined) {
		super(world1);
		this.texture = "/mob/sheep.png";
		this.setSize(0.9, 1.3);
	}

	protected entityInit():  void {
		super.entityInit();
		this.dataWatcher.addObject(16, 0, 'Byte');
	}

	public async attackEntityFrom(entity1: Entity| undefined, i2: int): Promise<boolean> {
		if(!this.worldObj.multiplayerWorld && !this.func_21072_p() && entity1 instanceof EntityLiving) {
			this.setSheared(true);
			let  i3: int = 1 + this.rand.nextInt(3);

			for(let  i4: int = 0; i4 < i3; ++i4) {
				let  entityItem5: EntityItem = await this.entityDropItem(new  ItemStack(Block.cloth.blockID, 1, this.getFleeceColor()), 1.0);
				entityItem5.motionY += (this.rand.nextFloat() * 0.05) as double;
				entityItem5.motionX += ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.1) as double;
				entityItem5.motionZ += ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.1) as double;
			}
		}

		return await super.attackEntityFrom(entity1, i2);
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		super.writeEntityToNBT(nBTTagCompound1);
		nBTTagCompound1.setBoolean("Sheared", this.func_21072_p());
		nBTTagCompound1.setByte("Color", this.getFleeceColor() as byte);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		super.readEntityFromNBT(nBTTagCompound1);
		this.setSheared(nBTTagCompound1.getBoolean("Sheared"));
		this.setFleeceColor(nBTTagCompound1.getByte("Color"));
	}

	protected getLivingSound(): string {
		return "mob.sheep";
	}

	protected getHurtSound(): string {
		return "mob.sheep";
	}

	protected getDeathSound(): string {
		return "mob.sheep";
	}

	public getFleeceColor():  int {
		return this.dataWatcher.getWatchableObjectByte(16) & 15;
	}

	public setFleeceColor(i1: int):  void {
		let  b2: byte = this.dataWatcher.getWatchableObjectByte(16);
		this.dataWatcher.updateObject(16, (b2 & 240 | i1 & 15) as byte);
	}

	public func_21072_p():  boolean {
		return (this.dataWatcher.getWatchableObjectByte(16) & 16) !== 0;
	}

	public setSheared(z1: boolean):  void {
		let  b2: byte = this.dataWatcher.getWatchableObjectByte(16);
		if(z1) {
			this.dataWatcher.updateObject(16, (b2 | 16) as byte);
		} else {
			this.dataWatcher.updateObject(16, (b2 & -17) as byte);
		}

	}

	public static func_21070_a(random0: Random | undefined):  int {
		let  i1: int = random0.nextInt(100);
		return i1 < 5 ? 15 : (i1 < 10 ? 7 : (i1 < 15 ? 8 : 0));
	}
}
