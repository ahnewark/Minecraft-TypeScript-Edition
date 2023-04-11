
import { int, byte, java, float } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { Item } from "./Item";
import { EntitySkeleton } from "./EntitySkeleton";
import { EntityMobs } from "./EntityMobs";
import { Entity } from "./Entity";
import { ItemRegistry } from "./moved/ItemRegistry";




export  class EntityCreeper extends EntityMobs {
	protected timeSinceIgnited: int;
	protected lastActiveTime: int;

	public override get type(): string {
		return 'Creeper';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/creeper.png";
	}

	protected entityInit():  void {
		super.entityInit();
		this.dataWatcher.addObject(16, -1, 'Byte');
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	public async onUpdate():  Promise<void> {
		this.lastActiveTime = this.timeSinceIgnited;
		if(this.worldObj.multiplayerWorld) {
			let  i1: int = this.func_21091_q();
			if(i1 > 0 && this.timeSinceIgnited === 0) {
				this.worldObj.playSoundAtEntity(this, "random.fuse", 1.0, 0.5);
			}

			this.timeSinceIgnited += i1;
			if(this.timeSinceIgnited < 0) {
				this.timeSinceIgnited = 0;
			}

			if(this.timeSinceIgnited >= 30) {
				this.timeSinceIgnited = 30;
			}
		}

		await super.onUpdate();
	}

	protected getHurtSound():  string {
		return "mob.creeper";
	}

	protected getDeathSound(): string {
		return "mob.creeperdeath";
	}

	public onDeath(entity1: Entity| null):  void {
		super.onDeath(entity1);
		if(entity1 instanceof EntitySkeleton) {
			this.dropItem(ItemRegistry.record13.shiftedIndex + this.rand.nextInt(2), 1);
		}

	}

	protected async attackEntity(entity1: Entity| null, f2: float):  Promise<void> {
		let  i3: int = this.func_21091_q();
		if(i3 <= 0 && f2 < 3.0 || i3 > 0 && f2 < 7.0) {
			if(this.timeSinceIgnited === 0) {
				this.worldObj.playSoundAtEntity(this, "random.fuse", 1.0, 0.5);
			}

			this.func_21090_e(1);
			++this.timeSinceIgnited;
			if(this.timeSinceIgnited >= 30) {
				this.worldObj.createExplosion(this, this.posX, this.posY, this.posZ, 3.0);
				this.setEntityDead();
			}

			this.hasAttacked = true;
		} else {
			this.func_21090_e(-1);
			--this.timeSinceIgnited;
			if(this.timeSinceIgnited < 0) {
				this.timeSinceIgnited = 0;
			}
		}

	}

	public func_440_b(f1: float):  float {
		return (this.lastActiveTime + (this.timeSinceIgnited - this.lastActiveTime) * f1) / 28.0;
	}

	protected getDropItemId():  int {
		return ItemRegistry.gunpowder.shiftedIndex;
	}

	private func_21091_q():  int {
		return this.dataWatcher.getWatchableObjectByte(16);
	}

	private func_21090_e(i1: int):  void {
		this.dataWatcher.updateObject(16, i1 as byte);
	}
}
