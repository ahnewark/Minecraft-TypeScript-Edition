import { int } from "../jree/index";
import { World } from "./World";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";
import { Item } from "./Item";

export  class BlockSnowBlock extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.builtSnow);
		this.setTickOnLoad(true);
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return Item.snowball.shiftedIndex;
	}

	public quantityDropped(random1: Random| null):  int {
		return 4;
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(await world1.getSavedLightValue(EnumSkyBlock.Block, i2, i3, i4) > 11) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

	}
}
