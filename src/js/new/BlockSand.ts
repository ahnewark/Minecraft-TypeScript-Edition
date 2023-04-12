


import { int, java, byte, double, float } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { EntityFallingSand } from "./EntityFallingSand";
import { Block } from "./Block";

import { BlockRegistry, } from "./static/BlockRegistry";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";

export  class BlockSand extends Block {
	public static fallInstantly:  boolean = false;

	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.sand);
	}

	public async onBlockAdded(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		await this.tryToFall(world1, i2, i3, i4);
	}

	private async tryToFall(world1: World| undefined, i2: int, i3: int, i4: int): Promise<void> {
		if(await BlockSand.canFallBelow(world1, i2, i3 - 1, i4) && i3 >= 0) {
			let  b8: byte = 32;
			if(!BlockSand.fallInstantly && world1.checkChunksExist(i2 - b8, i3 - b8, i4 - b8, i2 + b8, i3 + b8, i4 + b8)) {
				let  entityFallingSand9: EntityFallingSand = new  EntityFallingSand(world1, (i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double, this.blockID);
				await world1.entityJoinedWorld(entityFallingSand9);
			} else {
				await world1.setBlockWithNotify(i2, i3, i4, 0);

				while(await BlockSand.canFallBelow(world1, i2, i3 - 1, i4) && i3 > 0) {
					--i3;
				}

				if(i3 > 0) {
					await world1.setBlockWithNotify(i2, i3, i4, this.blockID);
				}
			}
		}

	}

	public tickRate():  int {
		return 3;
	}

	public static async canFallBelow(world0: World| undefined, i1: int, i2: int, i3: int):  Promise<boolean> {
		let  i4: int = await world0.getBlockId(i1, i2, i3);
		if(i4 === 0) {
			return true;
		} else if(i4 === Block.fire.blockID) {
			return true;
		} else {
			let  material5: Material = Block.blocksList[i4].blockMaterial;
			return material5 === MaterialRegistry.water ? true : material5 === MaterialRegistry.lava;
		}
	}
}
