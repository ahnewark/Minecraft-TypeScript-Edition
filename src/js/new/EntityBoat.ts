


import { int, double, float, byte, java, S } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { Material } from "./Material";
import { Item } from "./Item";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityPlayer } from "./EntityPlayer";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { BlockRegistry } from "./moved/BlockRegistry";
import { ItemRegistry } from "./moved/ItemRegistry";
import { MaterialRegistry } from "./moved/MaterialRegistry";

export  class EntityBoat extends Entity {
	public field_807_a:  int;
	public field_806_b:  int;
	public field_808_c:  int;
	private field_9394_d:  int;
	private field_9393_e:  double;
	private field_9392_f:  double;
	private field_9391_g:  double;
	private field_9390_h:  double;
	private field_9389_i:  double;
	private field_9388_j:  double;
	private field_9387_k:  double;
	private field_9386_l:  double;

	public override get type(): string {
		return 'Boat';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, d2: double, d4: double, d6: double);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				this.field_807_a = 0;
				this.field_806_b = 0;
				this.field_808_c = 1;
				this.preventEntitySpawning = true;
				this.setSize(1.5, 0.6);
				this.yOffset = this.height / 2.0;
				this.entityWalks = false;
				break;
			}

			case 4: {
				const [, d2, d4, d6] = args as [World, double, double, double];
				this.setPosition(d2, d4 + this.yOffset as double, d6);
				this.motionX = 0.0;
				this.motionY = 0.0;
				this.motionZ = 0.0;
				this.prevPosX = d2;
				this.prevPosY = d4;
				this.prevPosZ = d6;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	protected entityInit():  void {
	}

	public func_383_b_(entity1: Entity| null):  AxisAlignedBB | null {
		return entity1.boundingBox;
	}

	public getBoundingBox():  AxisAlignedBB | null {
		return this.boundingBox;
	}

	public canBePushed():  boolean {
		return true;
	}

	public getMountedYOffset():  double {
		return this.height as double * 0.0 - 0.3 as double;
	}

	public async attackEntityFrom(entity1: Entity| null, i2: int): Promise<boolean> {
		if(!this.worldObj.multiplayerWorld && !this.isDead) {
			this.field_808_c = -this.field_808_c;
			this.field_806_b = 10;
			this.field_807_a += i2 * 10;
			this.setBeenAttacked();
			if(this.field_807_a > 40) {
				let  i3: int;
				for(i3 = 0; i3 < 3; ++i3) {
					this.dropItemWithOffset(BlockRegistry.planks.blockID, 1, 0.0);
				}

				for(i3 = 0; i3 < 2; ++i3) {
					this.dropItemWithOffset(ItemRegistry.stick.shiftedIndex, 1, 0.0);
				}

				this.setEntityDead();
			}

			return true;
		} else {
			return true;
		}
	}

	public performHurtAnimation():  void {
		this.field_808_c = -this.field_808_c;
		this.field_806_b = 10;
		this.field_807_a += this.field_807_a * 10;
	}

	public canBeCollidedWith():  boolean {
		return !this.isDead;
	}

	public setPositionAndRotation2(d1: double, d3: double, d5: double, f7: float, f8: float, i9: int):  void {
		this.field_9393_e = d1;
		this.field_9392_f = d3;
		this.field_9391_g = d5;
		this.field_9390_h = f7 as double;
		this.field_9389_i = f8 as double;
		this.field_9394_d = i9 + 4;
		this.motionX = this.field_9388_j;
		this.motionY = this.field_9387_k;
		this.motionZ = this.field_9386_l;
	}

	public setVelocity(d1: double, d3: double, d5: double):  void {
		this.field_9388_j = this.motionX = d1;
		this.field_9387_k = this.motionY = d3;
		this.field_9386_l = this.motionZ = d5;
	}

	public async onUpdate():  Promise<void> {
		await super.onUpdate();
		if(this.field_806_b > 0) {
			--this.field_806_b;
		}

		if(this.field_807_a > 0) {
			--this.field_807_a;
		}

		this.prevPosX = this.posX;
		this.prevPosY = this.posY;
		this.prevPosZ = this.posZ;
		let  b1: byte = 5;
		let  d2: double = 0.0;

		for(let  i4: int = 0; i4 < b1; ++i4) {
			let  d5: double = this.boundingBox.minY + (this.boundingBox.maxY - this.boundingBox.minY) * (i4 + 0) as double / b1 as double - 0.125;
			let  d7: double = this.boundingBox.minY + (this.boundingBox.maxY - this.boundingBox.minY) * (i4 + 1) as double / b1 as double - 0.125;
			let  axisAlignedBB9: AxisAlignedBB = AxisAlignedBB.getBoundingBoxFromPool(this.boundingBox.minX, d5, this.boundingBox.minZ, this.boundingBox.maxX, d7, this.boundingBox.maxZ);
			if(await this.worldObj.isAABBInMaterial(axisAlignedBB9, MaterialRegistry.water)) {
				d2 += 1.0 / b1 as double;
			}
		}

		let  d6: double;
		let  d8: double;
		let  d10: double;
		let  d23: double;
		if(this.worldObj.multiplayerWorld) {
			if(this.field_9394_d > 0) {
				d23 = this.posX + (this.field_9393_e - this.posX) / this.field_9394_d as double;
				d6 = this.posY + (this.field_9392_f - this.posY) / this.field_9394_d as double;
				d8 = this.posZ + (this.field_9391_g - this.posZ) / this.field_9394_d as double;

				for(d10 = this.field_9390_h - this.rotationYaw as double; d10 < -180.0; d10 += 360.0) {
				}

				while(d10 >= 180.0) {
					d10 -= 360.0;
				}

				this.rotationYaw = (this.rotationYaw as double + d10 / this.field_9394_d as double) as float;
				this.rotationPitch = (this.rotationPitch as double + (this.field_9389_i - this.rotationPitch as double) / this.field_9394_d as double) as float;
				--this.field_9394_d;
				this.setPosition(d23, d6, d8);
				this.setRotation(this.rotationYaw, this.rotationPitch);
			} else {
				d23 = this.posX + this.motionX;
				d6 = this.posY + this.motionY;
				d8 = this.posZ + this.motionZ;
				this.setPosition(d23, d6, d8);
				if(this.onGround) {
					this.motionX *= 0.5;
					this.motionY *= 0.5;
					this.motionZ *= 0.5;
				}

				this.motionX *= 0.99 as double;
				this.motionY *= 0.95 as double;
				this.motionZ *= 0.99 as double;
			}

		} else {
			d23 = d2 * 2.0 - 1.0;
			this.motionY += 0.04 as double * d23;
			if(this.riddenByEntity !== null) {
				this.motionX += this.riddenByEntity.motionX * 0.2;
				this.motionZ += this.riddenByEntity.motionZ * 0.2;
			}

			d6 = 0.4;
			if(this.motionX < -d6) {
				this.motionX = -d6;
			}

			if(this.motionX > d6) {
				this.motionX = d6;
			}

			if(this.motionZ < -d6) {
				this.motionZ = -d6;
			}

			if(this.motionZ > d6) {
				this.motionZ = d6;
			}

			if(this.onGround) {
				this.motionX *= 0.5;
				this.motionY *= 0.5;
				this.motionZ *= 0.5;
			}

			await this.moveEntity(this.motionX, this.motionY, this.motionZ);
			d8 = java.lang.Math.sqrt(this.motionX * this.motionX + this.motionZ * this.motionZ);
			let  d12: double;
			if(d8 > 0.15) {
				d10 = java.lang.Math.cos(this.rotationYaw as double * java.lang.Math.PI / 180.0);
				d12 = java.lang.Math.sin(this.rotationYaw as double * java.lang.Math.PI / 180.0);

				for(let  i14: int = 0; i14 < 1.0 + d8 * 60.0; ++i14) {
					let  d15: double = (this.rand.nextFloat() * 2.0 - 1.0) as double;
					let  d17: double = (this.rand.nextInt(2) * 2 - 1) as double * 0.7;
					let  d19: double;
					let  d21: double;
					if(this.rand.nextBoolean()) {
						d19 = this.posX - d10 * d15 * 0.8 + d12 * d17;
						d21 = this.posZ - d12 * d15 * 0.8 - d10 * d17;
						this.worldObj.spawnParticle("splash", d19, this.posY - 0.125, d21, this.motionX, this.motionY, this.motionZ);
					} else {
						d19 = this.posX + d10 + d12 * d15 * 0.7;
						d21 = this.posZ + d12 - d10 * d15 * 0.7;
						this.worldObj.spawnParticle("splash", d19, this.posY - 0.125, d21, this.motionX, this.motionY, this.motionZ);
					}
				}
			}

			if(this.isCollidedHorizontally && d8 > 0.15) {
				if(!this.worldObj.multiplayerWorld) {
					this.setEntityDead();

					let  i24: int;
					for(i24 = 0; i24 < 3; ++i24) {
						this.dropItemWithOffset(BlockRegistry.planks.blockID, 1, 0.0);
					}

					for(i24 = 0; i24 < 2; ++i24) {
						this.dropItemWithOffset(ItemRegistry.stick.shiftedIndex, 1, 0.0);
					}
				}
			} else {
				this.motionX *= 0.99 as double;
				this.motionY *= 0.95 as double;
				this.motionZ *= 0.99 as double;
			}

			this.rotationPitch = 0.0;
			d10 = this.rotationYaw as double;
			d12 = this.prevPosX - this.posX;
			let  d25: double = this.prevPosZ - this.posZ;
			if(d12 * d12 + d25 * d25 > 0.001) {
				d10 = ((java.lang.Math.atan2(d25, d12) * 180.0 / java.lang.Math.PI) as float) as double;
			}

			let  d16: double;
			for(d16 = d10 - this.rotationYaw as double; d16 >= 180.0; d16 -= 360.0) {
			}

			while(d16 < -180.0) {
				d16 += 360.0;
			}

			if(d16 > 20.0) {
				d16 = 20.0;
			}

			if(d16 < -20.0) {
				d16 = -20.0;
			}

			this.rotationYaw = (this.rotationYaw as double + d16) as float;
			this.setRotation(this.rotationYaw, this.rotationPitch);
			let  list18 = this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.expand(0.2 as double, 0.0, 0.2 as double));
			if(list18 !== null && (await list18).length > 0) {
				for(let  i26: int = 0; i26 < (await list18).length; ++i26) {
					let  entity20: Entity = list18[i26];
					if(entity20 !== this.riddenByEntity && entity20.canBePushed() && entity20 instanceof EntityBoat) {
						entity20.applyEntityCollision(this);
					}
				}
			}

			if(this.riddenByEntity !== null && this.riddenByEntity.isDead) {
				this.riddenByEntity = null;
			}

		}
	}

	public updateRiderPosition():  void {
		if(this.riddenByEntity !== null) {
			let  d1: double = java.lang.Math.cos(this.rotationYaw as double * java.lang.Math.PI / 180.0) * 0.4;
			let  d3: double = java.lang.Math.sin(this.rotationYaw as double * java.lang.Math.PI / 180.0) * 0.4;
			this.riddenByEntity.setPosition(this.posX + d1, this.posY + this.getMountedYOffset() + this.riddenByEntity.getYOffset(), this.posZ + d3);
		}
	}

	protected writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
	}

	protected readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
	}

	public getShadowSize():  float {
		return 0.0;
	}

	public interact(entityPlayer1: EntityPlayer| null):  boolean {
		if(this.riddenByEntity !== null && this.riddenByEntity instanceof EntityPlayer && this.riddenByEntity !== entityPlayer1) {
			return true;
		} else {
			if(!this.worldObj.multiplayerWorld) {
				entityPlayer1.mountEntity(this);
			}

			return true;
		}
	}
}
