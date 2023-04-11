import { float, int, double, java } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { EntityAnimals } from "./EntityAnimals";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class EntityChicken extends EntityAnimals {
	public field_753_a:  boolean = false;
	public field_752_b:  float = 0.0;
	public field_758_c:  float = 0.0;
	public field_757_d:  float;
	public field_756_e:  float;
	public field_755_h:  float = 1.0;
	public timeUntilNextEgg:  int;

	public override get type(): string {
		return 'Chicken';
	}

	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/chicken.png";
		this.setSize(0.3, 0.4);
		this.health = 4;
		this.timeUntilNextEgg = this.rand.nextInt(6000) + 6000;
	}

	public async onLivingUpdate():  Promise<void> {
		await super.onLivingUpdate();
		this.field_756_e = this.field_752_b;
		this.field_757_d = this.field_758_c;
		this.field_758_c = (this.field_758_c as double + (this.onGround ? -1 : 4) as double * 0.3) as float;
		if(this.field_758_c < 0.0) {
			this.field_758_c = 0.0;
		}

		if(this.field_758_c > 1.0) {
			this.field_758_c = 1.0;
		}

		if(!this.onGround && this.field_755_h < 1.0) {
			this.field_755_h = 1.0;
		}

		this.field_755_h = (this.field_755_h as double * 0.9) as float;
		if(!this.onGround && this.motionY < 0.0) {
			this.motionY *= 0.6;
		}

		this.field_752_b += this.field_755_h * 2.0;
		if(!this.worldObj.multiplayerWorld && --this.timeUntilNextEgg <= 0) {
			this.worldObj.playSoundAtEntity(this, "mob.chickenplop", 1.0, (this.rand.nextFloat() - this.rand.nextFloat()) * 0.2 + 1.0);
			this.dropItem(ItemRegistry.egg.shiftedIndex, 1);
			this.timeUntilNextEgg = this.rand.nextInt(6000) + 6000;
		}

	}

	protected async fall(f1: float):  Promise<void> {
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	protected getLivingSound():  string {
		return "mob.chicken";
	}

	protected getHurtSound(): string {
		return "mob.chickenhurt";
	}

	protected getDeathSound(): string {
		return "mob.chickenhurt";
	}

	protected getDropItemId():  int {
		return ItemRegistry.feather.shiftedIndex;
	}
}
