import { int, double, float, java, byte, S } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { Entity } from "./Entity";

export  class EntityTNTPrimed extends Entity {
	public fuse:  int;

	public override get type(): string {
		return 'TNTPrimed';
	}

	public constructor(world1: World| undefined);

	public constructor(world1: World| undefined, d2: double, d4: double, d6: double);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {

				this.fuse = 0;
				this.preventEntitySpawning = true;
				this.setSize(0.98, 0.98);
				this.yOffset = this.height / 2.0;
				break;
			}

			case 4: {
				const [, d2, d4, d6] = args as [World, double, double, double];
				this.setPosition(d2, d4, d6);
				let  f8: float = (java.lang.Math.random() * java.lang.Math.PI as float as double * 2.0) as float;
				this.motionX = (-MathHelper.sin(f8 * java.lang.Math.PI as float / 180.0) * 0.02) as double;
				this.motionY = 0.2 as double;
				this.motionZ = (-MathHelper.cos(f8 * java.lang.Math.PI as float / 180.0) * 0.02) as double;
				this.entityWalks = false;
				this.fuse = 80;
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

	public canBeCollidedWith():  boolean {
		return !this.isDead;
	}

	public async onUpdate():  Promise<void> {
		this.prevPosX = this.posX;
		this.prevPosY = this.posY;
		this.prevPosZ = this.posZ;
		this.motionY -= 0.04 as double;
		await this.moveEntity(this.motionX, this.motionY, this.motionZ);
		this.motionX *= 0.98 as double;
		this.motionY *= 0.98 as double;
		this.motionZ *= 0.98 as double;
		if(this.onGround) {
			this.motionX *= 0.7 as double;
			this.motionZ *= 0.7 as double;
			this.motionY *= -0.5;
		}

		if(this.fuse-- <= 0) {
			await this.setEntityDead();
			await this.explode();
		} else {
			this.worldObj.spawnParticle("smoke", this.posX, this.posY + 0.5, this.posZ, 0.0, 0.0, 0.0);
		}

	}

	private async explode():  Promise<void> {
		let  f1: float = 4.0;
		await this.worldObj.createExplosion(undefined as Entity, this.posX, this.posY, this.posZ, f1);
	}

	protected writeEntityToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		nBTTagCompound1.setByte("Fuse", this.fuse as byte);
	}

	protected readEntityFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		this.fuse = nBTTagCompound1.getByte("Fuse");
	}

	public getShadowSize():  float {
		return 0.0;
	}
}
