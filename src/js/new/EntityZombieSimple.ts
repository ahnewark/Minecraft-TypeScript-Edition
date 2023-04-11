
import { float, int } from "../jree/index";
import { World } from "./World";
import { IMobs } from "./IMobs";
import { EntityMobs } from "./EntityMobs";
import { EntityLiving } from "./EntityLiving";
import { EntityCreature } from "./EntityCreature";
import { Entity } from "./Entity";

export  class EntityZombieSimple extends EntityMobs {
	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/zombie.png";
		this.moveSpeed = 0.5;
		this.attackStrength = 50;
		this.health *= 10;
		this.yOffset *= 6.0;
		this.setSize(this.width * 6.0, this.height * 6.0);
	}

	public override get type(): string {
		return 'ZombieSimple';
	}

	protected async getBlockPathWeight(i1: int, i2: int, i3: int):  Promise<float> {
		return await this.worldObj.getLightBrightness(i1, i2, i3) - 0.5;
	}
}
