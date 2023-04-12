
import { float, int, java, double } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { Item } from "./Item";
import { IMobs } from "./IMobs";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { Chunk } from "./Chunk";
import { Item } from "./Item";

export  class EntitySlime extends EntityLiving implements IMobs {
	public field_768_a:  float;
	public field_767_b:  float;
	private field_769_d:  int = 0;
	public slimeSize:  int = 1;

	public override get type(): string {
		return 'Slime';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/slime.png";
		this.slimeSize = 1 << this.rand.nextInt(3);
		this.yOffset = 0.0;
		this.field_769_d = this.rand.nextInt(20) + 10;
		this.setSlimeSize(this.slimeSize);
	}

	public setSlimeSize(i1: int):  void {
		this.slimeSize = i1;
		this.setSize(0.6 * i1 as float, 0.6 * i1 as float);
		this.health = i1 * i1;
		this.setPosition(this.posX, this.posY, this.posZ);
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
		nBTTagCompound1.setInteger("Size", this.slimeSize - 1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
		this.slimeSize = nBTTagCompound1.getInteger("Size") + 1;
	}

	public async onUpdate():  Promise<void> {
		this.field_767_b = this.field_768_a;
		let  z1: boolean = this.onGround;
		await super.onUpdate();
		if(this.onGround && !z1) {
			for(let  i2: int = 0; i2 < this.slimeSize * 8; ++i2) {
				let  f3: float = this.rand.nextFloat() * java.lang.Math.PI as float * 2.0;
				let  f4: float = this.rand.nextFloat() * 0.5 + 0.5;
				let  f5: float = MathHelper.sin(f3) * this.slimeSize as float * 0.5 * f4;
				let  f6: float = MathHelper.cos(f3) * this.slimeSize as float * 0.5 * f4;
				this.worldObj.spawnParticle("slime", this.posX + f5 as double, this.boundingBox.minY, this.posZ + f6 as double, 0.0, 0.0, 0.0);
			}

			if(this.slimeSize > 2) {
				this.worldObj.playSoundAtEntity(this, "mob.slime", this.getSoundVolume(), ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0) / 0.8);
			}

			this.field_768_a = -0.5;
		}

		this.field_768_a *= 0.6;
	}

	protected async updatePlayerActionState():  Promise<void> {
		let  entityPlayer1: EntityPlayer = this.worldObj.getClosestPlayerToEntity(this, 16.0);
		if(entityPlayer1 !== null) {
			this.faceEntity(entityPlayer1, 10.0);
		}

		if(this.onGround && this.field_769_d-- <= 0) {
			this.field_769_d = this.rand.nextInt(20) + 10;
			if(entityPlayer1 !== null) {
				this.field_769_d /= 3;
			}

			this.isJumping = true;
			if(this.slimeSize > 1) {
				this.worldObj.playSoundAtEntity(this, "mob.slime", this.getSoundVolume(), ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0) * 0.8);
			}

			this.field_768_a = 1.0;
			this.moveStrafing = 1.0 - this.rand.nextFloat() * 2.0;
			this.moveForward = (1 * this.slimeSize) as float;
		} else {
			this.isJumping = false;
			if(this.onGround) {
				this.moveStrafing = this.moveForward = 0.0;
			}
		}

	}

	public async setEntityDead():  Promise<void> {
		if(this.slimeSize > 1 && this.health === 0) {
			for(let  i1: int = 0; i1 < 4; ++i1) {
				let  f2: float = ((i1 % 2) as float - 0.5) * this.slimeSize as float / 4.0;
				let  f3: float = ((i1 / 2) as float - 0.5) * this.slimeSize as float / 4.0;
				let  entitySlime4: EntitySlime = new  EntitySlime(this.worldObj);
				entitySlime4.setSlimeSize(this.slimeSize / 2);
				entitySlime4.setLocationAndAngles(this.posX + f2 as double, this.posY + 0.5, this.posZ + f3 as double, this.rand.nextFloat() * 360.0, 0.0);
				await this.worldObj.entityJoinedWorld(entitySlime4);
			}
		}

		await super.setEntityDead();
	}

	public async onCollideWithPlayer(entityPlayer1: EntityPlayer| null):  Promise<void> {
		if(this.slimeSize > 1 && this.canEntityBeSeen(entityPlayer1) && this.getDistanceToEntity(entityPlayer1) < 0.6 * this.slimeSize && await entityPlayer1.attackEntityFrom(this, this.slimeSize)) {
			this.worldObj.playSoundAtEntity(this, "mob.slimeattack", 1.0, (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
		}

	}

	protected getHurtSound():  string {
		return "mob.slime";
	}

	protected getDeathSound():  string {
		return "mob.slime";
	}

	protected getDropItemId():  int {
		return this.slimeSize === 1 ? Item.slimeBall.shiftedIndex : 0;
	}

	public async getCanSpawnHere():  Promise<boolean> {
		let  chunk1: Chunk = await this.worldObj.getChunkFromBlockCoords(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.posZ));
		return (this.slimeSize === 1 || this.worldObj.difficultySetting > 0) && this.rand.nextInt(10) === 0 && chunk1.func_997_a(987234911n).nextInt(10) === 0 && this.posY < 16.0;
	}

	protected getSoundVolume():  float {
		return 0.6;
	}
}
