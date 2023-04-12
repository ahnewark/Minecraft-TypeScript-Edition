import { int, java, double, float } from "../jree/index";
import { World } from "./World";
import { Item } from "./Item";
import { Block } from "./Block";
import { EntityPlayer } from "./EntityPlayer";
import { Entity } from "./Entity";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";
import { Item } from "./Item";

export  class BlockRedstoneOre extends Block {
	private field_468_a:  boolean;

	public constructor(i1: int, i2: int, z3: boolean) {
		super(i1, i2, MaterialRegistry.rock);
		if(z3) {
			this.setTickOnLoad(true);
		}

		this.field_468_a = z3;
	}

	public tickRate():  int {
		return 30;
	}

	public async onBlockClicked(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<void> {
		await this.func_320_h(world1, i2, i3, i4);
		await super.onBlockClicked(world1, i2, i3, i4, entityPlayer5);
	}

	public async onEntityWalking(world1: World| undefined, i2: int, i3: int, i4: int, entity5: Entity| undefined):  Promise<void> {
		await this.func_320_h(world1, i2, i3, i4);
		await super.onEntityWalking(world1, i2, i3, i4, entity5);
	}

	public async blockActivated(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<boolean> {
		await this.func_320_h(world1, i2, i3, i4);
		return super.blockActivated(world1, i2, i3, i4, entityPlayer5);
	}

	private async func_320_h(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await this.func_319_i(world1, i2, i3, i4);
		if(this.blockID === Block.oreRedstone.blockID) {
			await world1.setBlockWithNotify(i2, i3, i4, Block.oreRedstoneGlowing.blockID);
		}

	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(this.blockID === Block.oreRedstoneGlowing.blockID) {
			await world1.setBlockWithNotify(i2, i3, i4, Block.oreRedstone.blockID);
		}

	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return Item.redstone.shiftedIndex;
	}

	public quantityDropped(random1: Random| undefined):  int {
		return 4 + random1.nextInt(2);
	}

	public async randomDisplayTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(this.field_468_a) {
			await this.func_319_i(world1, i2, i3, i4);
		}

	}

	private async func_319_i(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  random5: Random = world1.rand;
		let  d6: double = 0.0625;

		for(let  i8: int = 0; i8 < 6; ++i8) {
			let  d9: double = (i2 as float + random5.nextFloat()) as double;
			let  d11: double = (i3 as float + random5.nextFloat()) as double;
			let  d13: double = (i4 as float + random5.nextFloat()) as double;
			if(i8 === 0 && !await world1.isBlockOpaqueCube(i2, i3 + 1, i4)) {
				d11 = (i3 + 1) as double + d6;
			}

			if(i8 === 1 && !await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
				d11 = (i3 + 0) as double - d6;
			}

			if(i8 === 2 && !await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
				d13 = (i4 + 1) as double + d6;
			}

			if(i8 === 3 && !await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
				d13 = (i4 + 0) as double - d6;
			}

			if(i8 === 4 && !await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
				d9 = (i2 + 1) as double + d6;
			}

			if(i8 === 5 && !await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
				d9 = (i2 + 0) as double - d6;
			}

			if(d9 < i2 || d9 > (i2 + 1) || d11 < 0.0 || d11 > (i3 + 1) || d13 < i4 || d13 > (i4 + 1)) {
				world1.spawnParticle("reddust", d9, d11, d13, 0.0, 0.0, 0.0);
			}
		}

	}
}
