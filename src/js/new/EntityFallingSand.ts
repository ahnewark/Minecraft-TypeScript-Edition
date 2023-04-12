
import { int, double, byte, float, S, java } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { Entity } from "./Entity";

export  class EntityFallingSand extends Entity {
	public blockID:  int;
	public fallTime:  int = 0;

	public override get type(): string {
		return 'FallingSand';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, d2: double, d4: double, d6: double, i8: int);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				break;
			}
			case 5: {
				const [, d2, d4, d6, i8] = args as [World, double, double, double, int];
				this.blockID = i8;
				this.preventEntitySpawning = true;
				this.setSize(0.98, 0.98);
				this.yOffset = this.height / 2.0;
				this.setPosition(d2, d4, d6);
				this.motionX = 0.0;
				this.motionY = 0.0;
				this.motionZ = 0.0;
				this.entityWalks = false;
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
		if(this.blockID === 0) {
			await this.setEntityDead();
		} else {
			this.prevPosX = this.posX;
			this.prevPosY = this.posY;
			this.prevPosZ = this.posZ;
			++this.fallTime;
			this.motionY -= 0.04 as double;
			await this.moveEntity(this.motionX, this.motionY, this.motionZ);
			this.motionX *= 0.98 as double;
			this.motionY *= 0.98 as double;
			this.motionZ *= 0.98 as double;
			let  i1: int = MathHelper.floor_double(this.posX);
			let  i2: int = MathHelper.floor_double(this.posY);
			let  i3: int = MathHelper.floor_double(this.posZ);
			if(await this.worldObj.getBlockId(i1, i2, i3) === this.blockID) {
				await this.worldObj.setBlockWithNotify(i1, i2, i3, 0);
			}

			if(this.onGround) {
				this.motionX *= 0.7 as double;
				this.motionZ *= 0.7 as double;
				this.motionY *= -0.5;
				await this.setEntityDead();
				if((!await this.worldObj.canBlockBePlacedAt(this.blockID, i1, i2, i3, true) || !await this.worldObj.setBlockWithNotify(i1, i2, i3, this.blockID)) && !this.worldObj.multiplayerWorld) {
					await this.dropItem(this.blockID, 1);
				}
			} else if(this.fallTime > 100 && !this.worldObj.multiplayerWorld) {
				await this.dropItem(this.blockID, 1);
				await this.setEntityDead();
			}

		}
	}

	protected writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setByte("Tile", this.blockID as byte);
	}

	protected readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.blockID = nBTTagCompound1.getByte("Tile") & 255;
	}

	public getShadowSize():  float {
		return 0.0;
	}

	public func_465_i():  World | null {
		return this.worldObj;
	}
}
