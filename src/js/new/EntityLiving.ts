


import { int, float, java, double, byte, short } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { StepSound } from "./StepSound";
import { NBTTagCompound } from "./NBTTagCompound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { BlockRegistry } from "./moved/BlockRegistry";
import { EntityPlayer } from "./EntityPlayer";
import { Entity } from "./Entity";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { Block } from "./Block";

export  class EntityLiving extends Entity {
	public field_9366_o:  int = 20;
	public field_9365_p:  float;
	public field_9363_r:  float;
	public renderYawOffset:  float = 0.0;
	public prevRenderYawOffset:  float = 0.0;
	protected field_9362_u:  float;
	protected field_9361_v:  float;
	protected field_9360_w:  float;
	protected field_9359_x:  float;
	protected field_9358_y:  boolean = true;
	protected texture:  string = "/mob/char.png";
	protected unusedEntityLivingBoolean:  boolean = true;
	protected field_9353_B:  float = 0.0;
	protected field_9351_C:  string | null = null;
	protected field_9349_D:  float = 1.0;
	protected scoreValue:  int = 0;
	protected field_9345_F:  float = 0.0;
	public field_9343_G:  boolean = false;
	public prevSwingProgress:  float;
	public swingProgress:  float;
	public health:  int = 10;
	public prevHealth:  int;
	private field_4121_a:  int;
	public hurtTime:  int;
	public maxHurtTime:  int;
	public attackedAtYaw:  float = 0.0;
	public deathTime:  int = 0;
	public attackTime:  int = 0;
	public field_9329_Q:  float;
	public field_9328_R:  float;
	protected field_9327_S:  boolean = false;
	public field_9326_T:  int = -1;
	public field_9325_U:  float = (java.lang.Math.random() * 0.9 as double + 0.1 as double) as float;
	public field_705_Q:  float;
	public field_704_R:  float;
	public field_703_S:  float;
	protected field_9324_Y:  int;
	protected field_9323_Z:  double;
	protected field_9356_aa:  double;
	protected field_9354_ab:  double;
	protected field_9352_ac:  double;
	protected field_9350_ad:  double;
	protected field_9348_ae: float = 0.0;
	protected field_9346_af:  int = 0;
	protected field_9344_ag:  int = 0;
	protected moveStrafing:  float;
	protected moveForward:  float;
	protected randomYawVelocity:  float;
	protected isJumping:  boolean = false;
	protected defaultPitch:  float = 0.0;
	protected moveSpeed:  float = 0.7;
	private field_4120_b:  Entity | null;
	private field_4127_c:  int = 0;

	public override get type(): string {
		return 'Living';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.preventEntitySpawning = true;
		this.field_9363_r = (java.lang.Math.random() + 1.0) as float * 0.01;
		this.setPosition(this.posX, this.posY, this.posZ);
		this.field_9365_p = java.lang.Math.random() as float * 12398.0;
		this.rotationYaw = (java.lang.Math.random() * java.lang.Math.PI as float as double * 2.0) as float;
		this.stepHeight = 0.5;
	}

	protected entityInit():  void {
	}

	public canEntityBeSeen(entity1: Entity| null):  boolean {
		return this.worldObj.rayTraceBlocks(Vec3D.createVector(this.posX, this.posY + this.getEyeHeight() as double, this.posZ), Vec3D.createVector(entity1.posX, entity1.posY + entity1.getEyeHeight() as double, entity1.posZ)) === null;
	}

	public getEntityTexture():  string {
		return this.texture;
	}

	public canBeCollidedWith():  boolean {
		return !this.isDead;
	}

	public canBePushed():  boolean {
		return !this.isDead;
	}

	public getEyeHeight():  float {
		return this.height * 0.85;
	}

	public func_421_b():  int {
		return 80;
	}

	public async onEntityUpdate():  Promise<void> {
		this.prevSwingProgress = this.swingProgress;
		await super.onEntityUpdate();
		if(this.rand.nextInt(1000) < this.field_4121_a++) {
			this.field_4121_a = -this.func_421_b();
			let  string1 = this.getLivingSound();
			if(string1 !== null) {
				this.worldObj.playSoundAtEntity(this, string1, this.getSoundVolume(), (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
			}
		}

		if(this.isEntityAlive() && await this.func_345_I()) {
			await this.attackEntityFrom(null as Entity, 1);
		}

		if(this.isImmuneToFire || this.worldObj.multiplayerWorld) {
			this.fire = 0;
		}

		let  i8: int;
		if(this.isEntityAlive() && await this.isInsideOfMaterial(MaterialRegistry.water) && !this.canBreatheUnderwater()) {
			--this.air;
			if(this.air === -20) {
				this.air = 0;

				for(i8 = 0; i8 < 8; ++i8) {
					let  f2: float = this.rand.nextFloat() - this.rand.nextFloat();
					let  f3: float = this.rand.nextFloat() - this.rand.nextFloat();
					let  f4: float = this.rand.nextFloat() - this.rand.nextFloat();
					this.worldObj.spawnParticle("bubble", this.posX + f2 as double, this.posY + f3 as double, this.posZ + f4 as double, this.motionX, this.motionY, this.motionZ);
				}

				await this.attackEntityFrom(null as Entity, 2);
			}

			this.fire = 0;
		} else {
			this.air = this.maxAir;
		}

		this.field_9329_Q = this.field_9328_R;
		if(this.attackTime > 0) {
			--this.attackTime;
		}

		if(this.hurtTime > 0) {
			--this.hurtTime;
		}

		if(this.field_9306_bj > 0) {
			--this.field_9306_bj;
		}

		if(this.health <= 0) {
			++this.deathTime;
			if(this.deathTime > 20) {
				this.func_6392_F();
				this.setEntityDead();

				for(i8 = 0; i8 < 20; ++i8) {
					let  d9: double = this.rand.nextGaussian() * 0.02;
					let  d10: double = this.rand.nextGaussian() * 0.02;
					let  d6: double = this.rand.nextGaussian() * 0.02;
					this.worldObj.spawnParticle("explode", this.posX + (this.rand.nextFloat() * this.width * 2.0) as double - this.width as double, this.posY + (this.rand.nextFloat() * this.height) as double, this.posZ + (this.rand.nextFloat() * this.width * 2.0) as double - this.width as double, d9, d10, d6);
				}
			}
		}

		this.field_9359_x = this.field_9360_w;
		this.prevRenderYawOffset = this.renderYawOffset;
		this.prevRotationYaw = this.rotationYaw;
		this.prevRotationPitch = this.rotationPitch;
	}

	public spawnExplosionParticle():  void {
		for(let  i1: int = 0; i1 < 20; ++i1) {
			let  d2: double = this.rand.nextGaussian() * 0.02;
			let  d4: double = this.rand.nextGaussian() * 0.02;
			let  d6: double = this.rand.nextGaussian() * 0.02;
			let  d8: double = 10.0;
			this.worldObj.spawnParticle("explode", this.posX + (this.rand.nextFloat() * this.width * 2.0) as double - this.width as double - d2 * d8, this.posY + (this.rand.nextFloat() * this.height) as double - d4 * d8, this.posZ + (this.rand.nextFloat() * this.width * 2.0) as double - this.width as double - d6 * d8, d2, d4, d6);
		}

	}

	public updateRidden():  void {
		super.updateRidden();
		this.field_9362_u = this.field_9361_v;
		this.field_9361_v = 0.0;
	}

	public setPositionAndRotation2(d1: double, d3: double, d5: double, f7: float, f8: float, i9: int):  void {
		this.yOffset = 0.0;
		this.field_9323_Z = d1;
		this.field_9356_aa = d3;
		this.field_9354_ab = d5;
		this.field_9352_ac = f7 as double;
		this.field_9350_ad = f8 as double;
		this.field_9324_Y = i9;
	}

	public async onUpdate():  Promise<void> {
		await super.onUpdate();
		await this.onLivingUpdate();
		let  d1: double = this.posX - this.prevPosX;
		let  d3: double = this.posZ - this.prevPosZ;
		let  f5: float = MathHelper.sqrt_double(d1 * d1 + d3 * d3);
		let  f6: float = this.renderYawOffset;
		let  f7: float = 0.0;
		this.field_9362_u = this.field_9361_v;
		let  f8: float = 0.0;
		if(f5 > 0.05) {
			f8 = 1.0;
			f7 = f5 * 3.0;
			f6 = java.lang.Math.atan2(d3, d1) as float * 180.0 / java.lang.Math.PI as float - 90.0;
		}

		if(this.swingProgress > 0.0) {
			f6 = this.rotationYaw;
		}

		if(!this.onGround) {
			f8 = 0.0;
		}

		this.field_9361_v += (f8 - this.field_9361_v) * 0.3;

		let  f9: float;
		for(f9 = f6 - this.renderYawOffset; f9 < -180.0; f9 += 360.0) {
		}

		while(f9 >= 180.0) {
			f9 -= 360.0;
		}

		this.renderYawOffset += f9 * 0.3;

		let  f10: float;
		for(f10 = this.rotationYaw - this.renderYawOffset; f10 < -180.0; f10 += 360.0) {
		}

		while(f10 >= 180.0) {
			f10 -= 360.0;
		}

		let  z11: boolean = f10 < -90.0 || f10 >= 90.0;
		if(f10 < -75.0) {
			f10 = -75.0;
		}

		if(f10 >= 75.0) {
			f10 = 75.0;
		}

		this.renderYawOffset = this.rotationYaw - f10;
		if(f10 * f10 > 2500.0) {
			this.renderYawOffset += f10 * 0.2;
		}

		if(z11) {
			f7 *= -1.0;
		}

		while(this.rotationYaw - this.prevRotationYaw < -180.0) {
			this.prevRotationYaw -= 360.0;
		}

		while(this.rotationYaw - this.prevRotationYaw >= 180.0) {
			this.prevRotationYaw += 360.0;
		}

		while(this.renderYawOffset - this.prevRenderYawOffset < -180.0) {
			this.prevRenderYawOffset -= 360.0;
		}

		while(this.renderYawOffset - this.prevRenderYawOffset >= 180.0) {
			this.prevRenderYawOffset += 360.0;
		}

		while(this.rotationPitch - this.prevRotationPitch < -180.0) {
			this.prevRotationPitch -= 360.0;
		}

		while(this.rotationPitch - this.prevRotationPitch >= 180.0) {
			this.prevRotationPitch += 360.0;
		}

		this.field_9360_w += f7;
	}

	protected setSize(f1: float, f2: float):  void {
		super.setSize(f1, f2);
	}

	public heal(i1: int):  void {
		if(this.health > 0) {
			this.health += i1;
			if(this.health > 20) {
				this.health = 20;
			}

			this.field_9306_bj = this.field_9366_o / 2;
		}
	}

	public async attackEntityFrom(entity1: Entity| null, i2: int):  Promise<boolean> {
		if(this.worldObj.multiplayerWorld) {
			return false;
		} else {
			this.field_9344_ag = 0;
			if(this.health <= 0) {
				return false;
			} else {
				this.field_704_R = 1.5;
				let  z3: boolean = true;
				if(this.field_9306_bj > this.field_9366_o / 2.0) {
					if(i2 <= this.field_9346_af) {
						return false;
					}

					this.damageEntity(i2 - this.field_9346_af);
					this.field_9346_af = i2;
					z3 = false;
				} else {
					this.field_9346_af = i2;
					this.prevHealth = this.health;
					this.field_9306_bj = this.field_9366_o;
					this.damageEntity(i2);
					this.hurtTime = this.maxHurtTime = 10;
				}

				this.attackedAtYaw = 0.0;
				if(z3) {
					this.worldObj.func_9425_a(this, 2 as byte);
					this.setBeenAttacked();
					if(entity1 !== null) {
						let  d4: double = entity1.posX - this.posX;

						let  d6: double;
						for(d6 = entity1.posZ - this.posZ; d4 * d4 + d6 * d6 < 1.0E-4; d6 = (java.lang.Math.random() - java.lang.Math.random()) * 0.01) {
							d4 = (java.lang.Math.random() - java.lang.Math.random()) * 0.01;
						}

						this.attackedAtYaw = (java.lang.Math.atan2(d6, d4) * 180.0 / java.lang.Math.PI as float as double) as float - this.rotationYaw;
						this.knockBack(entity1, i2, d4, d6);
					} else {
						this.attackedAtYaw = ((java.lang.Math.random() * 2.0) as int * 180) as float;
					}
				}

				if(this.health <= 0) {
					if(z3) {
						this.worldObj.playSoundAtEntity(this, this.getDeathSound(), this.getSoundVolume(), (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
					}

					this.onDeath(entity1);
				} else if(z3) {
					this.worldObj.playSoundAtEntity(this, this.getHurtSound(), this.getSoundVolume(), (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
				}

				return true;
			}
		}
	}

	public performHurtAnimation():  void {
		this.hurtTime = this.maxHurtTime = 10;
		this.attackedAtYaw = 0.0;
	}

	protected damageEntity(i1: int):  void {
		this.health -= i1;
	}

	protected getSoundVolume():  float {
		return 1.0;
	}

	protected getLivingSound():  string {
		return null;
	}

	protected getHurtSound():  string {
		return "random.hurt";
	}

	protected getDeathSound():  string {
		return "random.hurt";
	}

	public knockBack(entity1: Entity| null, i2: int, d3: double, d5: double):  void {
		let  f7: float = MathHelper.sqrt_double(d3 * d3 + d5 * d5);
		let  f8: float = 0.4;
		this.motionX /= 2.0;
		this.motionY /= 2.0;
		this.motionZ /= 2.0;
		this.motionX -= d3 / f7 as double * f8 as double;
		this.motionY += 0.4 as double;
		this.motionZ -= d5 / f7 as double * f8 as double;
		if(this.motionY > 0.4) {
			this.motionY = 0.4 as double;
		}

	}

	public onDeath(entity1: Entity| null):  void {
		if(this.scoreValue > 0 && entity1 !== null) {
			entity1.addToPlayerScore(this, this.scoreValue);
		}

		this.field_9327_S = true;
		if(!this.worldObj.multiplayerWorld) {
			this.func_21066_o();
		}

		this.worldObj.func_9425_a(this, 3 as byte);
	}

	protected func_21066_o():  void {
		let  i1: int = this.getDropItemId();
		if(i1 > 0) {
			let  i2: int = this.rand.nextInt(3);

			for(let  i3: int = 0; i3 < i2; ++i3) {
				this.dropItem(i1, 1);
			}
		}

	}

	protected getDropItemId():  int {
		return 0;
	}

	protected async fall(f1: float):  Promise<void> {
		let  i2: int = java.lang.Math.ceil((f1 - 3.0) as double) as int;
		if(i2 > 0) {
			await this.attackEntityFrom(null as Entity, i2);
			let  i3: int = await this.worldObj.getBlockId(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.posY - 0.2 as double - this.yOffset as double), MathHelper.floor_double(this.posZ));
			if(i3 > 0) {
				let  stepSound4: StepSound = Block.blocksList[i3].stepSound;
				this.worldObj.playSoundAtEntity(this, stepSound4.func_1145_d(), stepSound4.func_1147_b() * 0.5, stepSound4.func_1144_c() * 0.75);
			}
		}

	}

	public async moveEntityWithHeading(f1: float, f2: float):  Promise<void> {
		let  d3: double;
		if(this.handleWaterMovement()) {
			d3 = this.posY;
			this.moveFlying(f1, f2, 0.02);
			this.moveEntity(this.motionX, this.motionY, this.motionZ);
			this.motionX *= 0.8 as double;
			this.motionY *= 0.8 as double;
			this.motionZ *= 0.8 as double;
			this.motionY -= 0.02;
			if(this.isCollidedHorizontally && this.isOffsetPositionInLiquid(this.motionX, this.motionY + 0.6 as double - this.posY + d3, this.motionZ)) {
				this.motionY = 0.3 as double;
			}
		} else if(this.handleLavaMovement()) {
			d3 = this.posY;
			this.moveFlying(f1, f2, 0.02);
			this.moveEntity(this.motionX, this.motionY, this.motionZ);
			this.motionX *= 0.5;
			this.motionY *= 0.5;
			this.motionZ *= 0.5;
			this.motionY -= 0.02;
			if(this.isCollidedHorizontally && this.isOffsetPositionInLiquid(this.motionX, this.motionY + 0.6 as double - this.posY + d3, this.motionZ)) {
				this.motionY = 0.3 as double;
			}
		} else {
			let  f8: float = 0.91;
			if(this.onGround) {
				f8 = 0.54600006;
				let  i4: int = await this.worldObj.getBlockId(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.boundingBox.minY) - 1, MathHelper.floor_double(this.posZ));
				if(i4 > 0) {
					f8 = Block.blocksList[i4].slipperiness * 0.91;
				}
			}

			let  f9: float = 0.16277136 / (f8 * f8 * f8);
			this.moveFlying(f1, f2, this.onGround ? 0.1 * f9 : 0.02);
			f8 = 0.91;
			if(this.onGround) {
				f8 = 0.54600006;
				let  i5: int = await this.worldObj.getBlockId(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.boundingBox.minY) - 1, MathHelper.floor_double(this.posZ));
				if(i5 > 0) {
					f8 = Block.blocksList[i5].slipperiness * 0.91;
				}
			}

			if(await this.isOnLadder()) {
				this.fallDistance = 0.0;
				if(this.motionY < -0.15) {
					this.motionY = -0.15;
				}
			}

			this.moveEntity(this.motionX, this.motionY, this.motionZ);
			if(this.isCollidedHorizontally && await this.isOnLadder()) {
				this.motionY = 0.2;
			}

			this.motionY -= 0.08;
			this.motionY *= 0.98 as double;
			this.motionX *= f8 as double;
			this.motionZ *= f8 as double;
		}

		this.field_705_Q = this.field_704_R;
		d3 = this.posX - this.prevPosX;
		let  d10: double = this.posZ - this.prevPosZ;
		let  f7: float = MathHelper.sqrt_double(d3 * d3 + d10 * d10) * 4.0;
		if(f7 > 1.0) {
			f7 = 1.0;
		}

		this.field_704_R += (f7 - this.field_704_R) * 0.4;
		this.field_703_S += this.field_704_R;
	}

	public async isOnLadder(): Promise<boolean> {
		let  i1: int = MathHelper.floor_double(this.posX);
		let  i2: int = MathHelper.floor_double(this.boundingBox.minY);
		let  i3: int = MathHelper.floor_double(this.posZ);
		return await this.worldObj.getBlockId(i1, i2, i3) === BlockRegistry.ladder.blockID || await this.worldObj.getBlockId(i1, i2 + 1, i3) === BlockRegistry.ladder.blockID;
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setShort("Health", this.health as short);
		nBTTagCompound1.setShort("HurtTime", this.hurtTime as short);
		nBTTagCompound1.setShort("DeathTime", this.deathTime as short);
		nBTTagCompound1.setShort("AttackTime", this.attackTime as short);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.health = nBTTagCompound1.getShort("Health");
		if(!nBTTagCompound1.hasKey("Health")) {
			this.health = 10;
		}

		this.hurtTime = nBTTagCompound1.getShort("HurtTime");
		this.deathTime = nBTTagCompound1.getShort("DeathTime");
		this.attackTime = nBTTagCompound1.getShort("AttackTime");
	}

	public isEntityAlive():  boolean {
		return !this.isDead && this.health > 0;
	}

	public canBreatheUnderwater():  boolean {
		return false;
	}

	public async onLivingUpdate():  Promise<void> {
		if(this.field_9324_Y > 0) {
			let  d1: double = this.posX + (this.field_9323_Z - this.posX) / this.field_9324_Y as double;
			let  d3: double = this.posY + (this.field_9356_aa - this.posY) / this.field_9324_Y as double;
			let  d5: double = this.posZ + (this.field_9354_ab - this.posZ) / this.field_9324_Y as double;

			let  d7: double;
			for(d7 = this.field_9352_ac - this.rotationYaw as double; d7 < -180.0; d7 += 360.0) {
			}

			while(d7 >= 180.0) {
				d7 -= 360.0;
			}

			this.rotationYaw = (this.rotationYaw as double + d7 / this.field_9324_Y as double) as float;
			this.rotationPitch = (this.rotationPitch as double + (this.field_9350_ad - this.rotationPitch as double) / this.field_9324_Y as double) as float;
			--this.field_9324_Y;
			this.setPosition(d1, d3, d5);
			this.setRotation(this.rotationYaw, this.rotationPitch);
		}

		if(this.health <= 0) {
			this.isJumping = false;
			this.moveStrafing = 0.0;
			this.moveForward = 0.0;
			this.randomYawVelocity = 0.0;
		} else if(!this.field_9343_G) {
			await this.updatePlayerActionState();
		}

		let  z9: boolean = await this.handleWaterMovement();
		let  z2: boolean = await this.handleLavaMovement();
		if(this.isJumping) {
			if(z9) {
				this.motionY += 0.04 as double;
			} else if(z2) {
				this.motionY += 0.04 as double;
			} else if(this.onGround) {
				this.jump();
			}
		}

		this.moveStrafing *= 0.98;
		this.moveForward *= 0.98;
		this.randomYawVelocity *= 0.9;
		await this.moveEntityWithHeading(this.moveStrafing, this.moveForward);
		let  list10 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.expand(0.2 as double, 0.0, 0.2 as double));
		if(list10 !== null && list10.length > 0) {
			for(let  i4: int = 0; i4 < list10.length; ++i4) {
				let  entity11: Entity = list10[i4] as Entity;
				if(entity11.canBePushed()) {
					entity11.applyEntityCollision(this);
				}
			}
		}

	}

	protected jump():  void {
		this.motionY = 0.42 as double;
	}

	protected async updatePlayerActionState(): Promise<void> {
		++this.field_9344_ag;
		let  entityPlayer1: EntityPlayer = this.worldObj.getClosestPlayerToEntity(this, -1.0);
		if(entityPlayer1 !== null) {
			let  d2: double = entityPlayer1.posX - this.posX;
			let  d4: double = entityPlayer1.posY - this.posY;
			let  d6: double = entityPlayer1.posZ - this.posZ;
			let  d8: double = d2 * d2 + d4 * d4 + d6 * d6;
			if(d8 > 16384.0) {
				this.setEntityDead();
			}

			if(this.field_9344_ag > 600 && this.rand.nextInt(800) === 0) {
				if(d8 < 1024.0) {
					this.field_9344_ag = 0;
				} else {
					this.setEntityDead();
				}
			}
		}

		this.moveStrafing = 0.0;
		this.moveForward = 0.0;
		let  f10: float = 8.0;
		if(this.rand.nextFloat() < 0.02) {
			entityPlayer1 = this.worldObj.getClosestPlayerToEntity(this, f10 as double);
			if(entityPlayer1 !== null) {
				this.field_4120_b = entityPlayer1;
				this.field_4127_c = 10 + this.rand.nextInt(20);
			} else {
				this.randomYawVelocity = (this.rand.nextFloat() - 0.5) * 20.0;
			}
		}

		if(this.field_4120_b !== null) {
			this.faceEntity(this.field_4120_b, 10.0);
			if(this.field_4127_c-- <= 0 || this.field_4120_b.isDead || this.field_4120_b.getDistanceSqToEntity(this) > (f10 * f10)) {
				this.field_4120_b = null;
			}
		} else {
			if(this.rand.nextFloat() < 0.05) {
				this.randomYawVelocity = (this.rand.nextFloat() - 0.5) * 20.0;
			}

			this.rotationYaw += this.randomYawVelocity;
			this.rotationPitch = this.defaultPitch;
		}

		let  z3: boolean = await this.handleWaterMovement();
		let  z11: boolean = await this.handleLavaMovement();
		if(z3 || z11) {
			this.isJumping = this.rand.nextFloat() < 0.8;
		}

	}

	public faceEntity(entity1: Entity| null, f2: float):  void {
		let  d3: double = entity1.posX - this.posX;
		let  d7: double = entity1.posZ - this.posZ;
		let  d5: double;
		if(entity1 instanceof EntityLiving) {
			let  entityLiving9: EntityLiving = entity1 as EntityLiving;
			d5 = entityLiving9.posY + entityLiving9.getEyeHeight() as double - (this.posY + this.getEyeHeight() as double);
		} else {
			d5 = (entity1.boundingBox.minY + entity1.boundingBox.maxY) / 2.0 - (this.posY + this.getEyeHeight() as double);
		}

		let  d13: double = MathHelper.sqrt_double(d3 * d3 + d7 * d7) as double;
		let  f11: float = (java.lang.Math.atan2(d7, d3) * 180.0 / java.lang.Math.PI as float as double) as float - 90.0;
		let  f12: float = (java.lang.Math.atan2(d5, d13) * 180.0 / java.lang.Math.PI as float as double) as float;
		this.rotationPitch = -this.updateRotation(this.rotationPitch, f12, f2);
		this.rotationYaw = this.updateRotation(this.rotationYaw, f11, f2);
	}

	private updateRotation(f1: float, f2: float, f3: float):  float {
		let  f4: float;
		for(f4 = f2 - f1; f4 < -180.0; f4 += 360.0) {
		}

		while(f4 >= 180.0) {
			f4 -= 360.0;
		}

		if(f4 > f3) {
			f4 = f3;
		}

		if(f4 < -f3) {
			f4 = -f3;
		}

		return f1 + f4;
	}

	public func_6392_F():  void {
	}

	public async getCanSpawnHere():  Promise<boolean> {
		return this.worldObj.checkIfAABBIsClear(this.boundingBox) && (await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox)).length === 0 && !await this.worldObj.getIsAnyLiquid(this.boundingBox);
	}

	protected async kill():  Promise<void> {
		await this.attackEntityFrom(null as Entity, 4);
	}

	public getSwingProgress(f1: float):  float {
		let  f2: float = this.swingProgress - this.prevSwingProgress;
		if(f2 < 0.0) {
			++f2;
		}

		return this.prevSwingProgress + f2 * f1;
	}

	public getPosition(f1: float):  Vec3D | null {
		if(f1 === 1.0) {
			return Vec3D.createVector(this.posX, this.posY, this.posZ);
		} else {
			let  d2: double = this.prevPosX + (this.posX - this.prevPosX) * f1 as double;
			let  d4: double = this.prevPosY + (this.posY - this.prevPosY) * f1 as double;
			let  d6: double = this.prevPosZ + (this.posZ - this.prevPosZ) * f1 as double;
			return Vec3D.createVector(d2, d4, d6);
		}
	}

	public getLookVec():  Vec3D | null {
		return this.getLook(1.0);
	}

	public getLook(f1: float):  Vec3D | null {
		let  f2: float;
		let  f3: float;
		let  f4: float;
		let  f5: float;
		if(f1 === 1.0) {
			f2 = MathHelper.cos(-this.rotationYaw * 0.017453292 - java.lang.Math.PI as float);
			f3 = MathHelper.sin(-this.rotationYaw * 0.017453292 - java.lang.Math.PI as float);
			f4 = -MathHelper.cos(-this.rotationPitch * 0.017453292);
			f5 = MathHelper.sin(-this.rotationPitch * 0.017453292);
			return Vec3D.createVector((f3 * f4) as double, f5 as double, (f2 * f4) as double);
		} else {
			f2 = this.prevRotationPitch + (this.rotationPitch - this.prevRotationPitch) * f1;
			f3 = this.prevRotationYaw + (this.rotationYaw - this.prevRotationYaw) * f1;
			f4 = MathHelper.cos(-f3 * 0.017453292 - java.lang.Math.PI as float);
			f5 = MathHelper.sin(-f3 * 0.017453292 - java.lang.Math.PI as float);
			let  f6: float = -MathHelper.cos(-f2 * 0.017453292);
			let  f7: float = MathHelper.sin(-f2 * 0.017453292);
			return Vec3D.createVector((f5 * f6) as double, f7 as double, (f4 * f6) as double);
		}
	}

	public async rayTrace(d1: double, f3: float):  Promise<MovingObjectPosition | null> {
		let  vec3D4: Vec3D = this.getPosition(f3);
		let  vec3D5: Vec3D = this.getLook(f3);
		let  vec3D6: Vec3D = vec3D4.addVector(vec3D5.xCoord * d1, vec3D5.yCoord * d1, vec3D5.zCoord * d1);
		return await this.worldObj.rayTraceBlocks(vec3D4, vec3D6);
	}

	public getMaxSpawnedInChunk():  int {
		return 4;
	}

	public getHeldItem():  ItemStack | null {
		return null;
	}

	public async handleHealthUpdate(b1: byte):  Promise<void> {
		if(b1 === 2) {
			this.field_704_R = 1.5;
			this.field_9306_bj = this.field_9366_o;
			this.hurtTime = this.maxHurtTime = 10;
			this.attackedAtYaw = 0.0;
			this.worldObj.playSoundAtEntity(this, this.getHurtSound(), this.getSoundVolume(), (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
			await this.attackEntityFrom(null as Entity, 0);
		} else if(b1 === 3) {
			this.worldObj.playSoundAtEntity(this, this.getDeathSound(), this.getSoundVolume(), (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
			this.health = 0;
			this.onDeath(null as Entity);
		} else {
			super.handleHealthUpdate(b1);
		}

	}
}
