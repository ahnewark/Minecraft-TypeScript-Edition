import { int, double, float, java } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MathHelper } from "./MathHelper";
import { Item } from "./Item";
import { IMobs } from "./IMobs";
import { EntityLiving } from "./EntityLiving";
import { EntityFlying } from "./EntityFlying";
import { EntityFireball } from "./EntityFireball";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Item } from "./Item";

export  class EntityGhast extends EntityFlying implements IMobs {
	public courseChangeCooldown:  int = 0;
	public waypointX:  double;
	public waypointY:  double;
	public waypointZ:  double;
	private targetedEntity:  Entity | null = null;
	private aggroCooldown:  int = 0;
	public prevAttackCounter:  int = 0;
	public attackCounter:  int = 0;

	public override get type(): string {
		return 'Ghast';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/ghast.png";
		this.setSize(4.0, 4.0);
		this.isImmuneToFire = true;
	}

	protected async updatePlayerActionState():  Promise<void> {
		if(this.worldObj.difficultySetting === 0) {
			await this.setEntityDead();
		}

		this.prevAttackCounter = this.attackCounter;
		let  d1: double = this.waypointX - this.posX;
		let  d3: double = this.waypointY - this.posY;
		let  d5: double = this.waypointZ - this.posZ;
		let  d7: double = MathHelper.sqrt_double(d1 * d1 + d3 * d3 + d5 * d5) as double;
		if(d7 < 1.0 || d7 > 60.0) {
			this.waypointX = this.posX + ((this.rand.nextFloat() * 2.0 - 1.0) * 16.0) as double;
			this.waypointY = this.posY + ((this.rand.nextFloat() * 2.0 - 1.0) * 16.0) as double;
			this.waypointZ = this.posZ + ((this.rand.nextFloat() * 2.0 - 1.0) * 16.0) as double;
		}

		if(this.courseChangeCooldown-- <= 0) {
			this.courseChangeCooldown += this.rand.nextInt(5) + 2;
			if(await this.isCourseTraversable(this.waypointX, this.waypointY, this.waypointZ, d7)) {
				this.motionX += d1 / d7 * 0.1;
				this.motionY += d3 / d7 * 0.1;
				this.motionZ += d5 / d7 * 0.1;
			} else {
				this.waypointX = this.posX;
				this.waypointY = this.posY;
				this.waypointZ = this.posZ;
			}
		}

		if(this.targetedEntity !== null && this.targetedEntity.isDead) {
			this.targetedEntity = null;
		}

		if(this.targetedEntity === null || this.aggroCooldown-- <= 0) {
			this.targetedEntity = this.worldObj.getClosestPlayerToEntity(this, 100.0);
			if(this.targetedEntity !== null) {
				this.aggroCooldown = 20;
			}
		}

		let  d9: double = 64.0;
		if(this.targetedEntity !== null && this.targetedEntity.getDistanceSqToEntity(this) < d9 * d9) {
			let  d11: double = this.targetedEntity.posX - this.posX;
			let  d13: double = this.targetedEntity.boundingBox.minY + (this.targetedEntity.height / 2.0) as double - (this.posY + (this.height / 2.0) as double);
			let  d15: double = this.targetedEntity.posZ - this.posZ;
			this.renderYawOffset = this.rotationYaw = -(java.lang.Math.atan2(d11, d15) as float) * 180.0 / java.lang.Math.PI as float;
			if(this.canEntityBeSeen(this.targetedEntity)) {
				if(this.attackCounter === 10) {
					this.worldObj.playSoundAtEntity(this, "mob.ghast.charge", this.getSoundVolume(), (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
				}

				++this.attackCounter;
				if(this.attackCounter === 20) {
					this.worldObj.playSoundAtEntity(this, "mob.ghast.fireball", this.getSoundVolume(), (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
					let  entityFireball17: EntityFireball = new  EntityFireball(this.worldObj, this, d11, d13, d15);
					let  d18: double = 4.0;
					let  vec3D20: Vec3D = this.getLook(1.0);
					entityFireball17.posX = this.posX + vec3D20.xCoord * d18;
					entityFireball17.posY = this.posY + (this.height / 2.0) as double + 0.5;
					entityFireball17.posZ = this.posZ + vec3D20.zCoord * d18;
					await this.worldObj.entityJoinedWorld(entityFireball17);
					this.attackCounter = -40;
				}
			} else if(this.attackCounter > 0) {
				--this.attackCounter;
			}
		} else {
			this.renderYawOffset = this.rotationYaw = -(java.lang.Math.atan2(this.motionX, this.motionZ) as float) * 180.0 / java.lang.Math.PI as float;
			if(this.attackCounter > 0) {
				--this.attackCounter;
			}
		}

		this.texture = this.attackCounter > 10 ? "/mob/ghast_fire.png" : "/mob/ghast.png";
	}

	private async isCourseTraversable(d1: double, d3: double, d5: double, d7: double):  Promise<boolean> {
		let  d9: double = (this.waypointX - this.posX) / d7;
		let  d11: double = (this.waypointY - this.posY) / d7;
		let  d13: double = (this.waypointZ - this.posZ) / d7;
		let  axisAlignedBB15: AxisAlignedBB = this.boundingBox.copy();

		for(let  i16: int = 1; i16 < d7; ++i16) {
			axisAlignedBB15.offset(d9, d11, d13);
			if((await this.worldObj.getCollidingBoundingBoxes(this, axisAlignedBB15)).length > 0) {
				return false;
			}
		}

		return true;
	}

	protected getLivingSound():  string {
		return "mob.ghast.moan";
	}

	protected getHurtSound(): string {
		return "mob.ghast.scream";
	}

	protected getDeathSound(): string{
		return "mob.ghast.death";
	}

	protected getDropItemId():  int {
		return Item.gunpowder.shiftedIndex;
	}

	protected getSoundVolume():  float {
		return 10.0;
	}

	public async getCanSpawnHere():  Promise<boolean> {
		return this.rand.nextInt(20) === 0 && await super.getCanSpawnHere() && this.worldObj.difficultySetting > 0;
	}

	public getMaxSpawnedInChunk():  int {
		return 1;
	}
}
