


import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Random } from "../java/util/Random";
import { Block } from "./Block";
import { Block } from "./Block";

export  class WorldGenLiquids extends WorldGenerator {
	private liquidBlockId:  number;

	public constructor(i1: number) {
		super();
		this.liquidBlockId = i1;
	}

	public async generate(world1: World, random2: Random, i3: number, i4: number, i5: number):  Promise<boolean> {
		if(await world1.getBlockId(i3, i4 + 1, i5) !== Block.stone.blockID) {
			return false;
		} else if(await world1.getBlockId(i3, i4 - 1, i5) !== Block.stone.blockID) {
			return false;
		} else if(await world1.getBlockId(i3, i4, i5) !== 0 && await world1.getBlockId(i3, i4, i5) !== Block.stone.blockID) {
			return false;
		} else {
			let  i6: number = 0;
			if(await world1.getBlockId(i3 - 1, i4, i5) === Block.stone.blockID) {
				++i6;
			}

			if(await world1.getBlockId(i3 + 1, i4, i5) === Block.stone.blockID) {
				++i6;
			}

			if(await world1.getBlockId(i3, i4, i5 - 1) === Block.stone.blockID) {
				++i6;
			}

			if(await world1.getBlockId(i3, i4, i5 + 1) === Block.stone.blockID) {
				++i6;
			}

			let  i7: number = 0;
			if(world1.isAirBlock(i3 - 1, i4, i5)) {
				++i7;
			}

			if(world1.isAirBlock(i3 + 1, i4, i5)) {
				++i7;
			}

			if(world1.isAirBlock(i3, i4, i5 - 1)) {
				++i7;
			}

			if(world1.isAirBlock(i3, i4, i5 + 1)) {
				++i7;
			}

			if(i6 === 3 && i7 === 1) {
				await world1.setBlockWithNotify(i3, i4, i5, this.liquidBlockId);
				world1.scheduledUpdatesAreImmediate = true;
				await Block.blocksList[this.liquidBlockId].updateTick(world1, i3, i4, i5, random2);
				world1.scheduledUpdatesAreImmediate = false;
			}

			return true;
		}
	}
}
