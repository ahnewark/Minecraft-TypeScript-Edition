


import { int, double, float, java, byte, short, S } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { NBTTagCompound } from "./NBTTagCompound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityItem } from "./EntityItem";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./index";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class EntityFish extends Entity {
	private tileX:  int;
	private tileY:  int;
	private tileZ:  int;
	private field_4092_g:  int;
	private field_4091_h:  boolean;
	public field_4098_a:  int;
	public angler:  EntityPlayer | null;
	private field_4090_i:  int;
	private field_4089_j:  int;
	private field_4088_k:  int;
	public field_4096_c:  Entity | null;
	private field_6388_l:  int;
	private field_6387_m:  double;
	private field_6386_n:  double;
	private field_6385_o:  double;
	private field_6384_p:  double;
	private field_6383_q:  double;
	private velocityX:  double;
	private velocityY:  double;
	private velocityZ:  double;

	public override get type(): string {
		return 'Fish';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, entityPlayer2: EntityPlayer| null);

	public constructor(world1: World| null, d2: double, d4: double, d6: double);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				this.tileX = -1;
				this.tileY = -1;
				this.tileZ = -1;
				this.field_4092_g = 0;
				this.field_4091_h = false;
				this.field_4098_a = 0;
				this.field_4089_j = 0;
				this.field_4088_k = 0;
				this.field_4096_c = null;
				this.setSize(0.25, 0.25);
				break;
			}

			case 2: {
				const [, entityPlayer2] = args as [World, EntityPlayer];
				this.tileX = -1;
				this.tileY = -1;
				this.tileZ = -1;
				this.field_4092_g = 0;
				this.field_4091_h = false;
				this.field_4098_a = 0;
				this.field_4089_j = 0;
				this.field_4088_k = 0;
				this.field_4096_c = null;
				this.angler = entityPlayer2;
				this.angler.fishEntity = this;
				this.setSize(0.25, 0.25);
				this.setLocationAndAngles(entityPlayer2.posX, entityPlayer2.posY + 1.62 - entityPlayer2.yOffset as double, entityPlayer2.posZ, entityPlayer2.rotationYaw, entityPlayer2.rotationPitch);
				this.posX -= (MathHelper.cos(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * 0.16) as double;
				this.posY -= 0.1 as double;
				this.posZ -= (MathHelper.sin(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * 0.16) as double;
				this.setPosition(this.posX, this.posY, this.posZ);
				this.yOffset = 0.0;
				let  f3: float = 0.4;
				this.motionX = (-MathHelper.sin(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f3) as double;
				this.motionZ = (MathHelper.cos(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f3) as double;
				this.motionY = (-MathHelper.sin(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f3) as double;
				this.func_4042_a(this.motionX, this.motionY, this.motionZ, 1.5, 1.0);
				break;
			}

			case 4: {
				const [, d2, d4, d6] = args as [World, double, double, double];
				this.setPosition(d2, d4, d6);
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

	public func_4042_a(d1: double, d3: double, d5: double, f7: float, f8: float):  void {
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
		this.field_4090_i = 0;
	}

	public setPositionAndRotation2(d1: double, d3: double, d5: double, f7: float, f8: float, i9: int):  void {
		this.field_6387_m = d1;
		this.field_6386_n = d3;
		this.field_6385_o = d5;
		this.field_6384_p = f7 as double;
		this.field_6383_q = f8 as double;
		this.field_6388_l = i9;
		this.motionX = this.velocityX;
		this.motionY = this.velocityY;
		this.motionZ = this.velocityZ;
	}

	public setVelocity(d1: double, d3: double, d5: double):  void {
		this.velocityX = this.motionX = d1;
		this.velocityY = this.motionY = d3;
		this.velocityZ = this.motionZ = d5;
	}

	public async onUpdate():  Promise<void> {
		await super.onUpdate();
		if(this.field_6388_l > 0) {
			let  d21: double = this.posX + (this.field_6387_m - this.posX) / this.field_6388_l as double;
			let  d22: double = this.posY + (this.field_6386_n - this.posY) / this.field_6388_l as double;
			let  d23: double = this.posZ + (this.field_6385_o - this.posZ) / this.field_6388_l as double;

			let  d7: double;
			for(d7 = this.field_6384_p - this.rotationYaw as double; d7 < -180.0; d7 += 360.0) {
			}

			while(d7 >= 180.0) {
				d7 -= 360.0;
			}

			this.rotationYaw = (this.rotationYaw as double + d7 / this.field_6388_l as double) as float;
			this.rotationPitch = (this.rotationPitch as double + (this.field_6383_q - this.rotationPitch as double) / this.field_6388_l as double) as float;
			--this.field_6388_l;
			this.setPosition(d21, d22, d23);
			this.setRotation(this.rotationYaw, this.rotationPitch);
		} else {
			if(!this.worldObj.multiplayerWorld) {
				let  itemStack1: ItemStack = this.angler.getCurrentEquippedItem();
				if(this.angler.isDead || !this.angler.isEntityAlive() || itemStack1 === null || itemStack1.getItem() !== ItemRegistry.fishingRod || this.getDistanceSqToEntity(this.angler) > 1024.0) {
					this.setEntityDead();
					this.angler.fishEntity = null;
					return;
				}

				if(this.field_4096_c !== null) {
					if(!this.field_4096_c.isDead) {
						this.posX = this.field_4096_c.posX;
						this.posY = this.field_4096_c.boundingBox.minY + this.field_4096_c.height as double * 0.8;
						this.posZ = this.field_4096_c.posZ;
						return;
					}

					this.field_4096_c = null;
				}
			}

			if(this.field_4098_a > 0) {
				--this.field_4098_a;
			}

			if(this.field_4091_h) {
				let  i19: int = await this.worldObj.getBlockId(this.tileX, this.tileY, this.tileZ);
				if(i19 === this.field_4092_g) {
					++this.field_4090_i;
					if(this.field_4090_i === 1200) {
						this.setEntityDead();
					}

					return;
				}

				this.field_4091_h = false;
				this.motionX *= (this.rand.nextFloat() * 0.2) as double;
				this.motionY *= (this.rand.nextFloat() * 0.2) as double;
				this.motionZ *= (this.rand.nextFloat() * 0.2) as double;
				this.field_4090_i = 0;
				this.field_4089_j = 0;
			} else {
				++this.field_4089_j;
			}

			let  vec3D20: Vec3D = Vec3D.createVector(this.posX, this.posY, this.posZ);
			let  vec3D2: Vec3D = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
			let  movingObjectPosition3: MovingObjectPosition = await this.worldObj.rayTraceBlocks(vec3D20, vec3D2);
			vec3D20 = Vec3D.createVector(this.posX, this.posY, this.posZ);
			vec3D2 = Vec3D.createVector(this.posX + this.motionX, this.posY + this.motionY, this.posZ + this.motionZ);
			if(movingObjectPosition3 !== null) {
				vec3D2 = Vec3D.createVector(movingObjectPosition3.hitVec.xCoord, movingObjectPosition3.hitVec.yCoord, movingObjectPosition3.hitVec.zCoord);
			}

			let  entity4: Entity = null;
			let  list5 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.addCoord(this.motionX, this.motionY, this.motionZ).expand(1.0, 1.0, 1.0));
			let  d6: double = 0.0;

			let  d13: double;
			for(let  i8: int = 0; i8 < list5.length; ++i8) {
				let  entity9: Entity = list5[i8] as Entity;
				if(entity9.canBeCollidedWith() && (entity9 !== this.angler || this.field_4089_j >= 5)) {
					let  f10: float = 0.3;
					let  axisAlignedBB11: AxisAlignedBB = entity9.boundingBox.expand(f10 as double, f10 as double, f10 as double);
					let  movingObjectPosition12: MovingObjectPosition = axisAlignedBB11.func_1169_a(vec3D20, vec3D2);
					if(movingObjectPosition12 !== null) {
						d13 = vec3D20.distanceTo(movingObjectPosition12.hitVec);
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
				if(movingObjectPosition3.entityHit !== null) {
					if(await movingObjectPosition3.entityHit.attackEntityFrom(this.angler, 0)) {
						this.field_4096_c = movingObjectPosition3.entityHit;
					}
				} else {
					this.field_4091_h = true;
				}
			}

			if(!this.field_4091_h) {
				this.moveEntity(this.motionX, this.motionY, this.motionZ);
				let  f24: float = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionZ * this.motionZ);
				this.rotationYaw = (java.lang.Math.atan2(this.motionX, this.motionZ) * 180.0 / java.lang.Math.PI as float as double) as float;

				for(this.rotationPitch = (java.lang.Math.atan2(this.motionY, f24 as double) * 180.0 / java.lang.Math.PI as float as double) as float; this.rotationPitch - this.prevRotationPitch < -180.0; this.prevRotationPitch -= 360.0) {
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
				let  f25: float = 0.92;
				if(this.onGround || this.isCollidedHorizontally) {
					f25 = 0.5;
				}

				let  b26: byte = 5;
				let  d27: double = 0.0;

				for(let  i28: int = 0; i28 < b26; ++i28) {
					let  d14: double = this.boundingBox.minY + (this.boundingBox.maxY - this.boundingBox.minY) * (i28 + 0) as double / b26 as double - 0.125 + 0.125;
					let  d16: double = this.boundingBox.minY + (this.boundingBox.maxY - this.boundingBox.minY) * (i28 + 1) as double / b26 as double - 0.125 + 0.125;
					let  axisAlignedBB18: AxisAlignedBB = AxisAlignedBB.getBoundingBoxFromPool(this.boundingBox.minX, d14, this.boundingBox.minZ, this.boundingBox.maxX, d16, this.boundingBox.maxZ);
					if(this.worldObj.isAABBInMaterial(axisAlignedBB18, MaterialRegistry.water)) {
						d27 += 1.0 / b26 as double;
					}
				}

				if(d27 > 0.0) {
					if(this.field_4088_k > 0) {
						--this.field_4088_k;
					} else if(this.rand.nextInt(500) === 0) {
						this.field_4088_k = this.rand.nextInt(30) + 10;
						this.motionY -= 0.2 as double;
						this.worldObj.playSoundAtEntity(this, "random.splash", 0.25, 1.0 + (this.rand.nextFloat() - this.rand.nextFloat()) * 0.4);
						let  f29: float = MathHelper.floor_double(this.boundingBox.minY) as float;

						let  f15: float;
						let  i30: int;
						let  f31: float;
						for(i30 = 0; i30 < 1.0 + this.width * 20.0; ++i30) {
							f15 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
							f31 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
							this.worldObj.spawnParticle("bubble", this.posX + f15 as double, (f29 + 1.0) as double, this.posZ + f31 as double, this.motionX, this.motionY - (this.rand.nextFloat() * 0.2) as double, this.motionZ);
						}

						for(i30 = 0; i30 < 1.0 + this.width * 20.0; ++i30) {
							f15 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
							f31 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
							this.worldObj.spawnParticle("splash", this.posX + f15 as double, (f29 + 1.0) as double, this.posZ + f31 as double, this.motionX, this.motionY, this.motionZ);
						}
					}
				}

				if(this.field_4088_k > 0) {
					this.motionY -= (this.rand.nextFloat() * this.rand.nextFloat() * this.rand.nextFloat()) as double * 0.2;
				}

				d13 = d27 * 2.0 - 1.0;
				this.motionY += 0.04 as double * d13;
				if(d27 > 0.0) {
					f25 = (f25 as double * 0.9) as float;
					this.motionY *= 0.8;
				}

				this.motionX *= f25 as double;
				this.motionY *= f25 as double;
				this.motionZ *= f25 as double;
				this.setPosition(this.posX, this.posY, this.posZ);
			}
		}
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setShort("xTile", this.tileX as short);
		nBTTagCompound1.setShort("yTile", this.tileY as short);
		nBTTagCompound1.setShort("zTile", this.tileZ as short);
		nBTTagCompound1.setByte("inTile", this.field_4092_g as byte);
		nBTTagCompound1.setByte("shake", this.field_4098_a as byte);
		nBTTagCompound1.setByte("inGround", (this.field_4091_h ? 1 : 0) as byte);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.tileX = nBTTagCompound1.getShort("xTile");
		this.tileY = nBTTagCompound1.getShort("yTile");
		this.tileZ = nBTTagCompound1.getShort("zTile");
		this.field_4092_g = nBTTagCompound1.getByte("inTile") & 255;
		this.field_4098_a = nBTTagCompound1.getByte("shake") & 255;
		this.field_4091_h = nBTTagCompound1.getByte("inGround") === 1;
	}

	public getShadowSize():  float {
		return 0.0;
	}

	public func_4043_i():  int {
		let  b1: byte = 0;
		if(this.field_4096_c !== null) {
			let  d2: double = this.angler.posX - this.posX;
			let  d4: double = this.angler.posY - this.posY;
			let  d6: double = this.angler.posZ - this.posZ;
			let  d8: double = MathHelper.sqrt_double(d2 * d2 + d4 * d4 + d6 * d6) as double;
			let  d10: double = 0.1;
			this.field_4096_c.motionX += d2 * d10;
			this.field_4096_c.motionY += d4 * d10 + MathHelper.sqrt_double(d8) as double * 0.08;
			this.field_4096_c.motionZ += d6 * d10;
			b1 = 3;
		} else if(this.field_4088_k > 0) {
			let  entityItem13: EntityItem = new  EntityItem(this.worldObj, this.posX, this.posY, this.posZ, new  ItemStack(ItemRegistry.fishRaw));
			let  d3: double = this.angler.posX - this.posX;
			let  d5: double = this.angler.posY - this.posY;
			let  d7: double = this.angler.posZ - this.posZ;
			let  d9: double = MathHelper.sqrt_double(d3 * d3 + d5 * d5 + d7 * d7) as double;
			let  d11: double = 0.1;
			entityItem13.motionX = d3 * d11;
			entityItem13.motionY = d5 * d11 + MathHelper.sqrt_double(d9) as double * 0.08;
			entityItem13.motionZ = d7 * d11;
			this.worldObj.entityJoinedWorld(entityItem13);
			b1 = 1;
		}

		if(this.field_4091_h) {
			b1 = 2;
		}

		this.setEntityDead();
		this.angler.fishEntity = null;
		return b1;
	}
}
