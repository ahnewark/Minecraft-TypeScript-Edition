


import { int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Block } from "./Block";
import { Random } from "../jree/java/util/Random";

export  class WorldGenHellLava extends WorldGenerator {
	private field_4158_a:  int;

	public constructor(i1: int) {
		super();
		this.field_4158_a = i1;
	}

	public async generate(world1: World| undefined, random2: Random | undefined, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(await world1.getBlockId(i3, i4 + 1, i5) !== Block.bloodStone.blockID) {
			return false;
		} else if(await world1.getBlockId(i3, i4, i5) !== 0 && await world1.getBlockId(i3, i4, i5) !== Block.bloodStone.blockID) {
			return false;
		} else {
			let  i6: int = 0;
			if(await world1.getBlockId(i3 - 1, i4, i5) === Block.bloodStone.blockID) {
				++i6;
			}

			if(await world1.getBlockId(i3 + 1, i4, i5) === Block.bloodStone.blockID) {
				++i6;
			}

			if(await world1.getBlockId(i3, i4, i5 - 1) === Block.bloodStone.blockID) {
				++i6;
			}

			if(await world1.getBlockId(i3, i4, i5 + 1) === Block.bloodStone.blockID) {
				++i6;
			}

			if(await world1.getBlockId(i3, i4 - 1, i5) === Block.bloodStone.blockID) {
				++i6;
			}

			let  i7: int = 0;
			if(await world1.isAirBlock(i3 - 1, i4, i5)) {
				++i7;
			}

			if(await world1.isAirBlock(i3 + 1, i4, i5)) {
				++i7;
			}

			if(await world1.isAirBlock(i3, i4, i5 - 1)) {
				++i7;
			}

			if(await world1.isAirBlock(i3, i4, i5 + 1)) {
				++i7;
			}

			if(await world1.isAirBlock(i3, i4 - 1, i5)) {
				++i7;
			}

			if(i6 === 4 && i7 === 1) {
				await world1.setBlockWithNotify(i3, i4, i5, this.field_4158_a);
				world1.scheduledUpdatesAreImmediate = true;
				await Block.blocksList[this.field_4158_a].updateTick(world1, i3, i4, i5, random2);
				world1.scheduledUpdatesAreImmediate = false;
			}

			return true;
		}
	}
}
