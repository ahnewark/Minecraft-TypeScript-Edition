


import { int, double, float, java, short, byte, S } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { NBTTagCompound } from "./NBTTagCompound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Item } from "./Item";

export  class EntitySnowball extends Entity {
	private xTileSnowball:  int = -1;
	private yTileSnowball:  int = -1;
	private zTileSnowball:  int = -1;
	private inTileSnowball:  int = 0;
	private inGroundSnowball:  boolean = false;
	public shakeSnowball:  int = 0;
	private field_811_g:  EntityLiving | null;
	private field_810_h:  int;
	private field_809_i:  int = 0;

	public override get type(): string {
		return 'Snowball';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, entityLiving2: EntityLiving| null);

	public constructor(world1: World| null, d2: double, d4: double, d6: double);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				this.setSize(0.25, 0.25);
				break;
			}

			case 2: {
				const [, entityLiving2] = args as [World, EntityLiving];
				this.field_811_g = entityLiving2;
				this.setSize(0.25, 0.25);
				this.setLocationAndAngles(entityLiving2.posX, entityLiving2.posY + entityLiving2.getEyeHeight() as double, entityLiving2.posZ, entityLiving2.rotationYaw, entityLiving2.rotationPitch);
				this.posX -= (MathHelper.cos(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * 0.16) as double;
				this.posY -= 0.1 as double;
				this.posZ -= (MathHelper.sin(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * 0.16) as double;
				this.setPosition(this.posX, this.posY, this.posZ);
				this.yOffset = 0.0;
				let  f3: float = 0.4;
				this.motionX = (-MathHelper.sin(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f3) as double;
				this.motionZ = (MathHelper.cos(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f3) as double;
				this.motionY = (-MathHelper.sin(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f3) as double;
				this.func_467_a(this.motionX, this.motionY, this.motionZ, 1.5, 1.0);

				break;
			}

			case 4: {
				const [, d2, d4, d6] = args as [World, double, double, double];
				super(world1);
				this.field_810_h = 0;
				this.setSize(0.25, 0.25);
				this.setPosition(d2, d4, d6);
				this.yOffset = 0.0;
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

	public func_467_a(d1: double, d3: double, d5: double, f7: float, f8: float):  void {
		let  f9: float = MathHelper.sqrt_double(d1 * d1 + d3 * d3 + d5 * d5);
		d1 /= f9 as double;
		d3 /= f9 as double;
		d5 /= f9 as double;
		d1 += this.rand.nextGaussian() * 0.0075 as double * f8 as double;
		d3 += this.rand.nextGaussian() * 0.0075 as double * f8 as double;
		d5 += this.rand.nextGaussian() * 0.0075 as double * f8 as double;
		d1 *= f7 as double;
		d3 *= f7 as double;
		d5 *= f7 as double;
		this.motionX = d1;
		this.motionY = d3;
		this.motionZ = d5;
		let  f10: float = MathHelper.sqrt_double(d1 * d1 + d5 * d5);
		this.prevRotationYaw = this.rotationYaw = (java.lang.Math.atan2(d1, d5) * 180.0 / java.lang.Math.PI as float as double) as float;
		this.prevRotationPitch = this.rotationPitch = (java.lang.Math.atan2(d3, f10 as double) * 180.0 / java.lang.Math.PI as float as double) as float;
		this.field_810_h = 0;
	}

	public setVelocity(d1: double, d3: double, d5: double):  void {
		this.motionX = d1;
		this.motionY = d3;
		this.motionZ = d5;
		if(this.prevRotationPitch === 0.0 && this.prevRotationYaw === 0.0) {
			let  f7: float = MathHelper.sqrt_double(d1 * d1 + d5 * d5);
			this.prevRotationYaw = this.rotationYaw = (java.lang.Math.atan2(d1, d5) * 180.0 / java.lang.Math.PI as float as double) as float;
			this.prevRotationPitch = this.rotationPitch = (java.lang.Math.atan2(d3, f7 as double) * 180.0 / java.lang.Math.PI as float as double) as float;
		}

	}

	public async onUpdate():  Promise<void> {
		this.lastTickPosX = this.posX;
		this.lastTickPosY = this.posY;
		this.lastTickPosZ = this.posZ;
		await super.onUpdate();
		if(this.shakeSnowball > 0) {
			--this.shakeSnowball;
		}

		if(this.inGroundSnowball) {
			let  i1: int = await this.worldObj.getBlockId(this.xTileSnowball, this.yTileSnowball, this.zTileSnowball);
			if(i1 === this.inTileSnowball) {
				++this.field_810_h;
				if(this.field_810_h === 1200) {
					await this.setEntityDead();
				}

				return;
			}

			this.inGroundSnowball = false;
			this.motionX *= (this.rand.nextFloat() * 0.2) as double;
			this.motionY *= (this.rand.nextFloat() * 0.2) as double;
			this.motionZ *= (this.rand.nextFloat() * 0.2) as double;
			this.field_810_h = 0;
			this.field_809_i = 0;
		} else {
			++this.field_809_i;
		}

		let  vec3D15: Vec3D = Vec3D.createVector(this.posX, this.posY, this.posZ);
		let  vec3D2: Vec3D = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
		let  movingObjectPosition3: MovingObjectPosition = await this.worldObj.rayTraceBlocks(vec3D15, vec3D2);
		vec3D15 = Vec3D.createVector(this.posX, this.posY, this.posZ);
		vec3D2 = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
		if(movingObjectPosition3 !== null) {
			vec3D2 = Vec3D.createVector(movingObjectPosition3.hitVec.xCoord, movingObjectPosition3.hitVec.yCoord, movingObjectPosition3.hitVec.zCoord);
		}

		if(!this.worldObj.multiplayerWorld) {
			let  entity4: Entity = null;
			let  list5 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.addCoord(this.motionX, this.motionY, this.motionZ).expand(1.0, 1.0, 1.0));
			let  d6: double = 0.0;

			for(let  i8: int = 0; i8 < list5.length; ++i8) {
				let  entity9: Entity = list5[i8];
				if(entity9.canBeCollidedWith() && (entity9 !== this.field_811_g || this.field_809_i >= 5)) {
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
		}

		if(movingObjectPosition3 !== null) {
			if(movingObjectPosition3.entityHit !== null && await movingObjectPosition3.entityHit.attackEntityFrom(this.field_811_g, 0)) {
				;
			}

			for(let  i16: int = 0; i16 < 8; ++i16) {
				this.worldObj.spawnParticle("snowballpoof", this.posX, this.posY, this.posZ, 0.0, 0.0, 0.0);
			}

			await this.setEntityDead();
		}

		this.posX += this.motionX;
		this.posY += this.motionY;
		this.posZ += this.motionZ;
		let  f17: float = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionZ * this.motionZ);
		this.rotationYaw = (java.lang.Math.atan2(this.motionX, this.motionZ) * 180.0 / java.lang.Math.PI as float as double) as float;

		for(this.rotationPitch = (java.lang.Math.atan2(this.motionY, f17 as double) * 180.0 / java.lang.Math.PI as float as double) as float; this.rotationPitch - this.prevRotationPitch < -180.0; this.prevRotationPitch -= 360.0) {
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
		let  f18: float = 0.99;
		let  f19: float = 0.03;
		if(await this.handleWaterMovement()) {
			for(let  i7: int = 0; i7 < 4; ++i7) {
				let  f20: float = 0.25;
				this.worldObj.spawnParticle("bubble", this.posX - this.motionX * f20 as double, this.posY - this.motionY * f20 as double, this.posZ - this.motionZ * f20 as double, this.motionX, this.motionY, this.motionZ);
			}

			f18 = 0.8;
		}

		this.motionX *= f18 as double;
		this.motionY *= f18 as double;
		this.motionZ *= f18 as double;
		this.motionY -= f19 as double;
		this.setPosition(this.posX, this.posY, this.posZ);
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setShort("xTile", this.xTileSnowball as short);
		nBTTagCompound1.setShort("yTile", this.yTileSnowball as short);
		nBTTagCompound1.setShort("zTile", this.zTileSnowball as short);
		nBTTagCompound1.setByte("inTile", this.inTileSnowball as byte);
		nBTTagCompound1.setByte("shake", this.shakeSnowball as byte);
		nBTTagCompound1.setByte("inGround", (this.inGroundSnowball ? 1 : 0) as byte);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.xTileSnowball = nBTTagCompound1.getShort("xTile");
		this.yTileSnowball = nBTTagCompound1.getShort("yTile");
		this.zTileSnowball = nBTTagCompound1.getShort("zTile");
		this.inTileSnowball = nBTTagCompound1.getByte("inTile") & 255;
		this.shakeSnowball = nBTTagCompound1.getByte("shake") & 255;
		this.inGroundSnowball = nBTTagCompound1.getByte("inGround") === 1;
	}

	public async onCollideWithPlayer(entityPlayer1: EntityPlayer| null):  Promise<void> {
		if(this.inGroundSnowball && this.field_811_g === entityPlayer1 && this.shakeSnowball <= 0 && entityPlayer1.inventory.addItemStackToInventory(new  ItemStack(Item.arrow, 1))) {
			this.worldObj.playSoundAtEntity(this, "random.pop", 0.2, ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.7 + 1.0) * 2.0);
			entityPlayer1.onItemPickup(this, 1);
			await this.setEntityDead();
		}

	}

	public getShadowSize():  float {
		return 0.0;
	}
}
