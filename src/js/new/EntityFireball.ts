import { int, double, java, float, short, byte, S } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { NBTTagCompound } from "./NBTTagCompound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MathHelper } from "./MathHelper";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";

export  class EntityFireball extends Entity {
	private field_9402_e:  int = -1;
	private field_9401_f:  int = -1;
	private field_9400_g:  int = -1;
	private field_9399_h:  int = 0;
	private field_9398_i:  boolean = false;
	public field_9406_a:  int = 0;
	private field_9397_j:  EntityLiving | null;
	private field_9396_k:  int;
	private field_9395_l:  int = 0;
	public field_9405_b:  double;
	public field_9404_c:  double;
	public field_9403_d:  double;

	public override get type(): string {
		return 'Fireball';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, entityLiving2: EntityLiving| null, d3: double, d5: double, d7: double);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				this.setSize(1.0, 1.0);
				break;
			}

			case 5: {
				let [, entityLiving2, d3, d5, d7] = args as [World, EntityLiving, double, double, double];
				this.field_9397_j = entityLiving2;
				this.setSize(1.0, 1.0);
				this.setLocationAndAngles(entityLiving2.posX, entityLiving2.posY, entityLiving2.posZ, entityLiving2.rotationYaw, entityLiving2.rotationPitch);
				this.setPosition(this.posX, this.posY, this.posZ);
				this.yOffset = 0.0;
				this.motionX = this.motionY = this.motionZ = 0.0;
				d3 += this.rand.nextGaussian() * 0.4;
				d5 += this.rand.nextGaussian() * 0.4;
				d7 += this.rand.nextGaussian() * 0.4;
				let  d9: double = MathHelper.sqrt_double(d3 * d3 + d5 * d5 + d7 * d7) as double;
				this.field_9405_b = d3 / d9 * 0.1;
				this.field_9404_c = d5 / d9 * 0.1;
				this.field_9403_d = d7 / d9 * 0.1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	protected entityInit():  void {
	}

	public isInRangeToRenderDist(d1: double):  boolean {
		let  d3: double = this.boundingBox.getAverageEdgeLength() * 4.0;
		d3 *= 64.0;
		return d1 < d3 * d3;
	}

	public async onUpdate():  Promise<void> {
		await super.onUpdate();
		this.fire = 10;
		if(this.field_9406_a > 0) {
			--this.field_9406_a;
		}

		if(this.field_9398_i) {
			let  i1: int = await this.worldObj.getBlockId(this.field_9402_e, this.field_9401_f, this.field_9400_g);
			if(i1 === this.field_9399_h) {
				++this.field_9396_k;
				if(this.field_9396_k === 1200) {
					this.setEntityDead();
				}

				return;
			}

			this.field_9398_i = false;
			this.motionX *= (this.rand.nextFloat() * 0.2) as double;
			this.motionY *= (this.rand.nextFloat() * 0.2) as double;
			this.motionZ *= (this.rand.nextFloat() * 0.2) as double;
			this.field_9396_k = 0;
			this.field_9395_l = 0;
		} else {
			++this.field_9395_l;
		}

		let  vec3D15: Vec3D = Vec3D.createVector(this.posX, this.posY, this.posZ);
		let  vec3D2: Vec3D = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
		let  movingObjectPosition3: MovingObjectPosition = await this.worldObj.rayTraceBlocks(vec3D15, vec3D2);
		vec3D15 = Vec3D.createVector(this.posX, this.posY, this.posZ);
		vec3D2 = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
		if(movingObjectPosition3 !== null) {
			vec3D2 = Vec3D.createVector(movingObjectPosition3.hitVec.xCoord, movingObjectPosition3.hitVec.yCoord, movingObjectPosition3.hitVec.zCoord);
		}

		let  entity4: Entity = null;
		let  list5 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.addCoord(this.motionX, this.motionY, this.motionZ).expand(1.0, 1.0, 1.0));
		let  d6: double = 0.0;

		for(let  i8: int = 0; i8 < list5.length; ++i8) {
			let  entity9: Entity = list5[i8];
			if(entity9.canBeCollidedWith() && (entity9 !== this.field_9397_j || this.field_9395_l >= 25)) {
				let  f10: float = 0.3;
				let  axisAlignedBB11: AxisAlignedBB = entity9.boundingBox.expand(f10 as double, f10 as double, f10 as double);
				let  movingObjectPosition12: MovingObjectPosition = axisAlignedBB11.func_1169_a(vec3D15, vec3D2);
				if(movingObjectPosition12 !== null) {
					let  d13: double = vec3D15.distanceTo(movingObjectPosition12.hitVec);
					if(d13 < d6 || d6 === 0.0) {
						entity4 = entity9;
						d6 = d13;
					}
				}
			}
		}

		if(entity4 !== null) {
			movingObjectPosition3 = new  MovingObjectPosition(entity4);
		}

		if(movingObjectPosition3 !== null) {
			if(movingObjectPosition3.entityHit !== null && await movingObjectPosition3.entityHit.attackEntityFrom(this.field_9397_j, 0)) {
				;
			}

			this.worldObj.newExplosion(null as Entity, this.posX, this.posY, this.posZ, 1.0, true);
			this.setEntityDead();
		}

		this.posX += this.motionX;
		this.posY += this.motionY;
		this.posZ += this.motionZ;
		let  f16: float = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionZ * this.motionZ);
		this.rotationYaw = (java.lang.Math.atan2(this.motionX, this.motionZ) * 180.0 / java.lang.Math.PI as float as double) as float;

		for(this.rotationPitch = (java.lang.Math.atan2(this.motionY, f16 as double) * 180.0 / java.lang.Math.PI as float as double) as float; this.rotationPitch - this.prevRotationPitch < -180.0; this.prevRotationPitch -= 360.0) {
		}

		while(this.rotationPitch - this.prevRotationPitch >= 180.0) {
			this.prevRotationPitch += 360.0;
		}

		while(this.rotationYaw - this.prevRotationYaw < -180.0) {
			this.prevRotationYaw -= 360.0;
		}

		while(this.rotationYaw - this.prevRotationYaw >= 180.0) {
			this.prevRotationYaw += 360.0;
		}

		this.rotationPitch = this.prevRotationPitch + (this.rotationPitch - this.prevRotationPitch) * 0.2;
		this.rotationYaw = this.prevRotationYaw + (this.rotationYaw - this.prevRotationYaw) * 0.2;
		let  f17: float = 0.95;
		if(await this.handleWaterMovement()) {
			for(let  i18: int = 0; i18 < 4; ++i18) {
				let  f19: float = 0.25;
				this.worldObj.spawnParticle("bubble", this.posX - this.motionX * f19 as double, this.posY - this.motionY * f19 as double, this.posZ - this.motionZ * f19 as double, this.motionX, this.motionY, this.motionZ);
			}

			f17 = 0.8;
		}

		this.motionX += this.field_9405_b;
		this.motionY += this.field_9404_c;
		this.motionZ += this.field_9403_d;
		this.motionX *= f17 as double;
		this.motionY *= f17 as double;
		this.motionZ *= f17 as double;
		this.worldObj.spawnParticle("smoke", this.posX, this.posY + 0.5, this.posZ, 0.0, 0.0, 0.0);
		this.setPosition(this.posX, this.posY, this.posZ);
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setShort("xTile", this.field_9402_e as short);
		nBTTagCompound1.setShort("yTile", this.field_9401_f as short);
		nBTTagCompound1.setShort("zTile", this.field_9400_g as short);
		nBTTagCompound1.setByte("inTile", this.field_9399_h as byte);
		nBTTagCompound1.setByte("shake", this.field_9406_a as byte);
		nBTTagCompound1.setByte("inGround", (this.field_9398_i ? 1 : 0) as byte);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.field_9402_e = nBTTagCompound1.getShort("xTile");
		this.field_9401_f = nBTTagCompound1.getShort("yTile");
		this.field_9400_g = nBTTagCompound1.getShort("zTile");
		this.field_9399_h = nBTTagCompound1.getByte("inTile") & 255;
		this.field_9406_a = nBTTagCompound1.getByte("shake") & 255;
		this.field_9398_i = nBTTagCompound1.getByte("inGround") === 1;
	}

	public canBeCollidedWith():  boolean {
		return true;
	}

	public getCollisionBorderSize():  float {
		return 1.0;
	}

	public async attackEntityFrom(entity1: Entity| null, i2: int):  Promise<boolean> {
		this.setBeenAttacked();
		if(entity1 !== null) {
			let  vec3D3: Vec3D = entity1.getLookVec();
			if(vec3D3 !== null) {
				this.motionX = vec3D3.xCoord;
				this.motionY = vec3D3.yCoord;
				this.motionZ = vec3D3.zCoord;
				this.field_9405_b = this.motionX * 0.1;
				this.field_9404_c = this.motionY * 0.1;
				this.field_9403_d = this.motionZ * 0.1;
			}

			return true;
		} else {
			return false;
		}
	}

	public getShadowSize():  float {
		return 0.0;
	}
}
