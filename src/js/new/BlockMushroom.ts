
import { int, float } from "../jree/index";
import { World } from "./World";
import { BlockFlower } from "./BlockFlower";
import { Block } from "./Block";


export  class BlockMushroom extends BlockFlower {
	public constructor(i1: int, i2: int) {
		super(i1, i2);
		let  f3: float = 0.2;
		this.setBlockBounds(0.5 - f3, 0.0, 0.5 - f3, 0.5 + f3, f3 * 2.0, 0.5 + f3);
	}

	protected canThisPlantGrowOnThisBlockID(i1: int):  boolean {
		return Block.opaqueCubeLookup[i1];
	}

	public async canBlockStay(world1: World| null, i2: int, i3: int, i4: int): Promise<boolean> {
		return await world1.getBlockLightValue(i2, i3, i4) <= 13 && this.canThisPlantGrowOnThisBlockID(await world1.getBlockId(i2, i3 - 1, i4));
	}
}
