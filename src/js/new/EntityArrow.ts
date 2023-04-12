


import { int, double, float, java, short, byte, S } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { NBTTagCompound } from "./NBTTagCompound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Item } from "./Item";

export  class EntityArrow extends Entity {
	private xTile:  int = -1;
	private yTile:  int = -1;
	private zTile:  int = -1;
	private inTile:  int = 0;
	private inGround:  boolean = false;
	public arrowShake:  int = 0;
	public field_682_g:  EntityLiving | null;
	private field_681_h:  int;
	private field_680_i:  int = 0;

	public override get type(): string {
		return 'Arrow';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, entityLiving2: EntityLiving| null);

	public constructor(world1: World| null, d2: double, d4: double, d6: double);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				this.setSize(0.5, 0.5);
				break;
			}

			case 2: {
				const [, entityLiving2] = args as [World, EntityLiving];
				this.field_682_g = entityLiving2;
				this.setSize(0.5, 0.5);
				this.setLocationAndAngles(entityLiving2.posX, entityLiving2.posY + entityLiving2.getEyeHeight() as double, entityLiving2.posZ, entityLiving2.rotationYaw, entityLiving2.rotationPitch);
				this.posX -= (MathHelper.cos(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * 0.16) as double;
				this.posY -= 0.1 as double;
				this.posZ -= (MathHelper.sin(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * 0.16) as double;
				this.setPosition(this.posX, this.posY, this.posZ);
				this.yOffset = 0.0;
				this.motionX = (-MathHelper.sin(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float)) as double;
				this.motionZ = (MathHelper.cos(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float)) as double;
				this.motionY = (-MathHelper.sin(this.rotationPitch / 180.0 * java.lang.Math.PI as float)) as double;
				this.setArrowHeading(this.motionX, this.motionY, this.motionZ, 1.5, 1.0);
				break;
			}

			case 4: {
				const [, d2, d4, d6] = args as [World, double, double, double];
				this.setSize(0.5, 0.5);
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

	public setArrowHeading(d1: double, d3: double, d5: double, f7: float, f8: float):  void {
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
		this.field_681_h = 0;
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
		await super.onUpdate();
		if(this.prevRotationPitch === 0.0 && this.prevRotationYaw === 0.0) {
			let  f1: float = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionZ * this.motionZ);
			this.prevRotationYaw = this.rotationYaw = (java.lang.Math.atan2(this.motionX, this.motionZ) * 180.0 / java.lang.Math.PI as float as double) as float;
			this.prevRotationPitch = this.rotationPitch = (java.lang.Math.atan2(this.motionY, f1 as double) * 180.0 / java.lang.Math.PI as float as double) as float;
		}

		if(this.arrowShake > 0) {
			--this.arrowShake;
		}

		if(this.inGround) {
			let  i15: int = await this.worldObj.getBlockId(this.xTile, this.yTile, this.zTile);
			if(i15 === this.inTile) {
				++this.field_681_h;
				if(this.field_681_h === 1200) {
					await this.setEntityDead();
				}

				return;
			}

			this.inGround = false;
			this.motionX *= (this.rand.nextFloat() * 0.2) as double;
			this.motionY *= (this.rand.nextFloat() * 0.2) as double;
			this.motionZ *= (this.rand.nextFloat() * 0.2) as double;
			this.field_681_h = 0;
			this.field_680_i = 0;
		} else {
			++this.field_680_i;
		}

		let  vec3D16: Vec3D = Vec3D.createVector(this.posX, this.posY, this.posZ);
		let  vec3D2: Vec3D = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
		let  movingObjectPosition3: MovingObjectPosition = await this.worldObj.rayTraceBlocks(vec3D16, vec3D2);
		vec3D16 = Vec3D.createVector(this.posX, this.posY, this.posZ);
		vec3D2 = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
		if(movingObjectPosition3 !== null) {
			vec3D2 = Vec3D.createVector(movingObjectPosition3.hitVec.xCoord, movingObjectPosition3.hitVec.yCoord, movingObjectPosition3.hitVec.zCoord);
		}

		let  entity4: Entity = null;
		let  list5 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.addCoord(this.motionX, this.motionY, this.motionZ).expand(1.0, 1.0, 1.0));
		let  d6: double = 0.0;

		let  f10: float;
		for(let  i8: int = 0; i8 < list5.length; ++i8) {
			let  entity9: Entity = list5[i8] as Entity;
			if(entity9.canBeCollidedWith() && (entity9 !== this.field_682_g || this.field_680_i >= 5)) {
				f10 = 0.3;
				let  axisAlignedBB11: AxisAlignedBB = entity9.boundingBox.expand(f10 as double, f10 as double, f10 as double);
				let  movingObjectPosition12: MovingObjectPosition = axisAlignedBB11.func_1169_a(vec3D16, vec3D2);
				if(movingObjectPosition12 !== null) {
					let  d13: double = vec3D16.distanceTo(movingObjectPosition12.hitVec);
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

		let  f17: float;
		if(movingObjectPosition3 !== null) {
			if(movingObjectPosition3.entityHit !== null) {
				if(await movingObjectPosition3.entityHit.attackEntityFrom(this.field_682_g, 4)) {
					this.worldObj.playSoundAtEntity(this, "random.drr", 1.0, 1.2 / (this.rand.nextFloat() * 0.2 + 0.9));
					await this.setEntityDead();
				} else {
					this.motionX *= -0.10000000149011612;
					this.motionY *= -0.10000000149011612;
					this.motionZ *= -0.10000000149011612;
					this.rotationYaw += 180.0;
					this.prevRotationYaw += 180.0;
					this.field_680_i = 0;
				}
			} else {
				this.xTile = movingObjectPosition3.blockX;
				this.yTile = movingObjectPosition3.blockY;
				this.zTile = movingObjectPosition3.blockZ;
				this.inTile = await this.worldObj.getBlockId(this.xTile, this.yTile, this.zTile);
				this.motionX = ((movingObjectPosition3.hitVec.xCoord - this.posX) as float) as double;
				this.motionY = ((movingObjectPosition3.hitVec.yCoord - this.posY) as float) as double;
				this.motionZ = ((movingObjectPosition3.hitVec.zCoord - this.posZ) as float) as double;
				f17 = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionY * this.motionY + this.motionZ * this.motionZ);
				this.posX -= this.motionX / f17 as double * 0.05 as double;
				this.posY -= this.motionY / f17 as double * 0.05 as double;
				this.posZ -= this.motionZ / f17 as double * 0.05 as double;
				this.worldObj.playSoundAtEntity(this, "random.drr", 1.0, 1.2 / (this.rand.nextFloat() * 0.2 + 0.9));
				this.inGround = true;
				this.arrowShake = 7;
			}
		}

		this.posX += this.motionX;
		this.posY += this.motionY;
		this.posZ += this.motionZ;
		f17 = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionZ * this.motionZ);
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
		f10 = 0.03;
		if(this.handleWaterMovement()) {
			for(let  i19: int = 0; i19 < 4; ++i19) {
				let  f20: float = 0.25;
				this.worldObj.spawnParticle("bubble", this.posX - this.motionX * f20 as double, this.posY - this.motionY * f20 as double, this.posZ - this.motionZ * f20 as double, this.motionX, this.motionY, this.motionZ);
			}

			f18 = 0.8;
		}

		this.motionX *= f18 as double;
		this.motionY *= f18 as double;
		this.motionZ *= f18 as double;
		this.motionY -= f10 as double;
		this.setPosition(this.posX, this.posY, this.posZ);
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setShort("xTile", this.xTile as short);
		nBTTagCompound1.setShort("yTile", this.yTile as short);
		nBTTagCompound1.setShort("zTile", this.zTile as short);
		nBTTagCompound1.setByte("inTile", this.inTile as byte);
		nBTTagCompound1.setByte("shake", this.arrowShake as byte);
		nBTTagCompound1.setByte("inGround", (this.inGround ? 1 : 0) as byte);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.xTile = nBTTagCompound1.getShort("xTile");
		this.yTile = nBTTagCompound1.getShort("yTile");
		this.zTile = nBTTagCompound1.getShort("zTile");
		this.inTile = nBTTagCompound1.getByte("inTile") & 255;
		this.arrowShake = nBTTagCompound1.getByte("shake") & 255;
		this.inGround = nBTTagCompound1.getByte("inGround") === 1;
	}

	public async onCollideWithPlayer(entityPlayer1: EntityPlayer):  Promise<void> {
		if(!this.worldObj.multiplayerWorld) {
			if(this.inGround && this.field_682_g === entityPlayer1 && this.arrowShake <= 0 && entityPlayer1.inventory.addItemStackToInventory(new  ItemStack(Item.arrow, 1))) {
				this.worldObj.playSoundAtEntity(this, "random.pop", 0.2, ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.7 + 1.0) * 2.0);
				entityPlayer1.onItemPickup(this, 1);
				await this.setEntityDead();
			}

		}
	}

	public getShadowSize():  float {
		return 0.0;
	}
}
