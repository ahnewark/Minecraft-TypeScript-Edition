import { int, short, java } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityZombie } from "./EntityZombie";
import { EntityPlayer } from "./EntityPlayer";
import { Entity } from "./Entity";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class EntityPigZombie extends EntityZombie {
	private angerLevel:  int = 0;
	private randomSoundDelay:  int = 0;
	private static readonly defaultHeldItem:  ItemStack | null = new  ItemStack(ItemRegistry.swordGold, 1);

	public override get type(): string {
		return 'PigZombie';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/pigzombie.png";
		this.moveSpeed = 0.5;
		this.attackStrength = 5;
		this.isImmuneToFire = true;
	}

	public async onUpdate(): Promise<void> {
		this.moveSpeed = this.playerToAttack !== null ? 0.95 : 0.5;
		if(this.randomSoundDelay > 0 && --this.randomSoundDelay === 0) {
			this.worldObj.playSoundAtEntity(this, "mob.zombiepig.zpigangry", this.getSoundVolume() * 2.0, ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0) * 1.8);
		}

		await super.onUpdate();
	}

	public async getCanSpawnHere(): Promise<boolean> {
		return this.worldObj.difficultySetting > 0 && await this.worldObj.checkIfAABBIsClear(this.boundingBox) && (await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox)).length === 0 && !await this.worldObj.getIsAnyLiquid(this.boundingBox);
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
		nBTTagCompound1.setShort("Anger", this.angerLevel as short);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
		this.angerLevel = nBTTagCompound1.getShort("Anger");
	}

	protected async findPlayerToAttack():  Promise<Entity | null> {
		return this.angerLevel === 0 ? null : await super.findPlayerToAttack();
	}

	public async onLivingUpdate():  Promise<void> {
		super.onLivingUpdate();
	}

	public async attackEntityFrom(entity1: Entity| null, i2: int):  Promise<boolean> {
		if(entity1 instanceof EntityPlayer) {
			let  list3 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.expand(32.0, 32.0, 32.0));

			for(let  i4: int = 0; i4 < list3.length; ++i4) {
				let  entity5: Entity = list3[i4] as Entity;
				if(entity5 instanceof EntityPigZombie) {
					let  entityPigZombie6: EntityPigZombie = entity5 as EntityPigZombie;
					entityPigZombie6.becomeAngryAt(entity1);
				}
			}

			this.becomeAngryAt(entity1);
		}

		return super.attackEntityFrom(entity1, i2);
	}

	private becomeAngryAt(entity1: Entity| null):  void {
		this.playerToAttack = entity1;
		this.angerLevel = 400 + this.rand.nextInt(400);
		this.randomSoundDelay = this.rand.nextInt(40);
	}

	protected getLivingSound(): string {
		return "mob.zombiepig.zpig";
	}

	protected getHurtSound(): string {
		return "mob.zombiepig.zpighurt";
	}

	protected getDeathSound(): string {
		return "mob.zombiepig.zpigdeath";
	}

	protected getDropItemId():  int {
		return ItemRegistry.porkCooked.shiftedIndex;
	}

	public getHeldItem():  ItemStack | null {
		return EntityPigZombie.defaultHeldItem;
	}
}
