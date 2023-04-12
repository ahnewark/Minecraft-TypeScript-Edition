


import { int, java, double, float } from "../jree/index";
import { World } from "./World";
import { EntityTNTPrimed } from "./EntityTNTPrimed";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";

export  class BlockTNT extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.tnt);
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 0 ? this.blockIndexInTexture + 2 : (i1 === 1 ? this.blockIndexInTexture + 1 : this.blockIndexInTexture);
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(i5 > 0 && Block.blocksList[i5].canProvidePower() && await world1.isBlockIndirectlyGettingPowered(i2, i3, i4)) {
			await this.onBlockDestroyedByPlayer(world1, i2, i3, i4, 0);
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

	}

	public quantityDropped(random1: Random| null):  int {
		return 0;
	}

	public async onBlockDestroyedByExplosion(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  entityTNTPrimed5: EntityTNTPrimed = new  EntityTNTPrimed(world1, (i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double);
		entityTNTPrimed5.fuse = world1.rand.nextInt(entityTNTPrimed5.fuse / 4) + entityTNTPrimed5.fuse / 8;
		await world1.entityJoinedWorld(entityTNTPrimed5);
	}

	public async onBlockDestroyedByPlayer(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(!world1.multiplayerWorld) {
			let  entityTNTPrimed6: EntityTNTPrimed = new  EntityTNTPrimed(world1, (i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double);
			await world1.entityJoinedWorld(entityTNTPrimed6);
			world1.playSoundAtEntity(entityTNTPrimed6, "random.fuse", 1.0, 1.0);
		}
	}
}
