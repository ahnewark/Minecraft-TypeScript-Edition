
import { int, float, double } from "../jree/index";
import { World } from "./World";
import { Entity } from "./Entity";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class BlockSlowSand extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.sand);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		let  f5: float = 0.125;
		return AxisAlignedBB.getBoundingBoxFromPool(i2 as double, i3 as double, i4 as double, (i2 + 1) as double, ((i3 + 1) as float - f5) as double, (i4 + 1) as double);
	}

	public async onEntityCollidedWithBlock(world1: World| null, i2: int, i3: int, i4: int, entity5: Entity| null):  Promise<void> {
		entity5.motionX *= 0.4;
		entity5.motionZ *= 0.4;
	}
}
