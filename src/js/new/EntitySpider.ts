
import { double, float, java, int } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { EntityMobs } from "./EntityMobs";
import { Entity } from "./Entity";
import { Item } from "./Item";

export  class EntitySpider extends EntityMobs {
	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/spider.png";
		this.setSize(1.4, 0.9);
		this.moveSpeed = 0.8;
	}

	public override get type(): string {
		return 'Spider';
	}

	public getMountedYOffset():  double {
		return this.height as double * 0.75 - 0.5;
	}

	protected async findPlayerToAttack():  Promise<Entity | null> {
		let  f1: float = await this.getEntityBrightness(1.0);
		if(f1 < 0.5) {
			let  d2: double = 16.0;
			return this.worldObj.getClosestPlayerToEntity(this, d2);
		} else {
			return null;
		}
	}

	protected getLivingSound(): string {
		return "mob.spider";
	}

	protected getHurtSound(): string {
		return "mob.spider";
	}

	protected getDeathSound(): string {
		return "mob.spiderdeath";
	}

	protected async attackEntity(entity1: Entity| null, f2: float):  Promise<void> {
		let  f3: float = await this.getEntityBrightness(1.0);
		if(f3 > 0.5 && this.rand.nextInt(100) === 0) {
			this.playerToAttack = null;
		} else {
			if(f2 > 2.0 && f2 < 6.0 && this.rand.nextInt(10) === 0) {
				if(this.onGround) {
					let  d4: double = entity1.posX - this.posX;
					let  d6: double = entity1.posZ - this.posZ;
					let  f8: float = MathHelper.sqrt_double(d4 * d4 + d6 * d6);
					this.motionX = d4 / f8 as double * 0.5 * 0.8 as double + this.motionX * 0.2 as double;
					this.motionZ = d6 / f8 as double * 0.5 * 0.8 as double + this.motionZ * 0.2 as double;
					this.motionY = 0.4 as double;
				}
			} else {
				await super.attackEntity(entity1, f2);
			}

		}
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	protected getDropItemId():  int {
		return Item.silk.shiftedIndex;
	}

	public async isOnLadder():  Promise<boolean> {
		return this.isCollidedHorizontally;
	}
}
