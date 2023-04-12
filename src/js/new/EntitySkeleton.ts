
import { java, float, double, int } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { EntityMobs } from "./EntityMobs";
import { EntityArrow } from "./EntityArrow";
import { Entity } from "./Entity";
import { Item } from "./Item";

export  class EntitySkeleton extends EntityMobs {
	private static readonly defaultHeldItem:  ItemStack | null = new  ItemStack(Item.bow, 1);

	public override get type(): string {
		return 'Skeleton';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/skeleton.png";
	}

	protected getLivingSound(): string {
		return "mob.skeleton";
	}

	protected getHurtSound(): string {
		return "mob.skeletonhurt";
	}

	protected getDeathSound(): string {
		return "mob.skeletonhurt";
	}

	public async onLivingUpdate(): Promise<void> {
		if(this.worldObj.isDaytime()) {
			let  f1: float = await this.getEntityBrightness(1.0);
			if(f1 > 0.5 && await this.worldObj.canBlockSeeTheSky(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.posY), MathHelper.floor_double(this.posZ)) && this.rand.nextFloat() * 30.0 < (f1 - 0.4) * 2.0) {
				this.fire = 300;
			}
		}

		await super.onLivingUpdate();
	}

	protected async attackEntity(entity1: Entity| null, f2: float):  Promise<void> {
		if(f2 < 10.0) {
			let  d3: double = entity1.posX - this.posX;
			let  d5: double = entity1.posZ - this.posZ;
			if(this.attackTime === 0) {
				let  entityArrow7: EntityArrow = new  EntityArrow(this.worldObj, this);
				++entityArrow7.posY;
				let  d8: double = entity1.posY - 0.2 as double - entityArrow7.posY;
				let  f10: float = MathHelper.sqrt_double(d3 * d3 + d5 * d5) * 0.2;
				this.worldObj.playSoundAtEntity(this, "random.bow", 1.0, 1.0 / (this.rand.nextFloat() * 0.4 + 0.8));
				await this.worldObj.entityJoinedWorld(entityArrow7);
				entityArrow7.setArrowHeading(d3, d8 + f10 as double, d5, 0.6, 12.0);
				this.attackTime = 30;
			}

			this.rotationYaw = (java.lang.Math.atan2(d5, d3) * 180.0 / java.lang.Math.PI as float as double) as float - 90.0;
			this.hasAttacked = true;
		}

	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	protected getDropItemId():  int {
		return Item.arrow.shiftedIndex;
	}

	protected async func_21066_o():  Promise<void> {
		let  i1: int = this.rand.nextInt(3);

		let  i2: int;
		for(i2 = 0; i2 < i1; ++i2) {
			await this.dropItem(Item.arrow.shiftedIndex, 1);
		}

		i1 = this.rand.nextInt(3);

		for(i2 = 0; i2 < i1; ++i2) {
			await this.dropItem(Item.bone.shiftedIndex, 1);
		}

	}

	public getHeldItem():  ItemStack | null {
		return EntitySkeleton.defaultHeldItem;
	}
}
