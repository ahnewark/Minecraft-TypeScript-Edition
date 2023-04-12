import { float, int } from "../jree/index";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { EntityMobs } from "./EntityMobs";
import { Item } from "./Item";

export  class EntityZombie extends EntityMobs {
	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/zombie.png";
		this.moveSpeed = 0.5;
		this.attackStrength = 5;
	}

	public override get type(): string {
		return 'Zombie';
	}

	public async onLivingUpdate():  Promise<void> {
		if(this.worldObj.isDaytime()) {
			let  f1: float = await this.getEntityBrightness(1.0);
			if(f1 > 0.5 && await this.worldObj.canBlockSeeTheSky(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.posY), MathHelper.floor_double(this.posZ)) && this.rand.nextFloat() * 30.0 < (f1 - 0.4) * 2.0) {
				this.fire = 300;
			}
		}

		await super.onLivingUpdate();
	}

	protected getLivingSound(): string {
		return "mob.zombie";
	}

	protected getHurtSound(): string {
		return "mob.zombiehurt";
	}

	protected getDeathSound(): string {
		return "mob.zombiedeath";
	}

	protected getDropItemId():  int {
		return Item.feather.shiftedIndex;
	}
}
