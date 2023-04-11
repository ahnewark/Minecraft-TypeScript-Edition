
import { int, float, double } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityPlayer } from "./EntityPlayer";
import { EntityCreature } from "./EntityCreature";
import { Entity } from "./Entity";
import { IMobs } from "./IMobs";

export  class EntityMobs extends EntityCreature implements IMobs {
	protected attackStrength:  int = 2;

	public override get type(): string {
		return 'Mobs';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.health = 20;
	}

	public async onLivingUpdate(): Promise<void> {
		let  f1: float = await this.getEntityBrightness(1.0);
		if(f1 > 0.5) {
			this.field_9344_ag += 2;
		}

		super.onLivingUpdate();
	}

	public async onUpdate():  Promise<void> {
		super.onUpdate();
		if(this.worldObj.difficultySetting === 0) {
			this.setEntityDead();
		}
	}

	protected async findPlayerToAttack():  Promise<Entity | null> {
		let  entityPlayer1: EntityPlayer = this.worldObj.getClosestPlayerToEntity(this, 16.0);
		return entityPlayer1 !== null && this.canEntityBeSeen(entityPlayer1) ? entityPlayer1 : null;
	}

	public async attackEntityFrom(entity1: Entity| null, i2: int):  Promise<boolean> {
		if(await super.attackEntityFrom(entity1, i2)) {
			if(this.riddenByEntity !== entity1 && this.ridingEntity !== entity1) {
				if(entity1 !== this) {
					this.playerToAttack = entity1;
				}

				return true;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	protected async attackEntity(entity1: Entity| null, f2: float):  Promise<void> {
		if(f2 < 2.5 && entity1.boundingBox.maxY > this.boundingBox.minY && entity1.boundingBox.minY < this.boundingBox.maxY) {
			this.attackTime = 20;
			await entity1.attackEntityFrom(this, this.attackStrength);
		}

	}

	protected async getBlockPathWeight(i1: int, i2: int, i3: int): Promise<float> {
		return 0.5 - await this.worldObj.getLightBrightness(i1, i2, i3);
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
		if(await this.worldObj.getSavedLightValue(EnumSkyBlock.Sky, i1, i2, i3) > this.rand.nextInt(32)) {
			return false;
		} else {
			let  i4: int = await this.worldObj.getBlockLightValue(i1, i2, i3);
			return i4 <= this.rand.nextInt(8) && await super.getCanSpawnHere();
		}
	}
}
