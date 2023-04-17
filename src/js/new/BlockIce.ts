import { int } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { BlockBreakable } from "./BlockBreakable";
import { Block } from "./Block";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";



export  class BlockIce extends BlockBreakable {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.ice, false);
		this.slipperiness = 0.98;
		this.setTickOnLoad(true);
	}

	public getRenderBlockPass():  int {
		return 1;
	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, 1 - i5);
	}

	public async onBlockRemoval(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  material5: Material = await world1.getBlockMaterial(i2, i3 - 1, i4);
		if(material5.getIsSolid() || material5.getIsLiquid()) {
			await world1.setBlockWithNotify(i2, i3, i4, Block.waterStill.blockID);
		}

	}

	public quantityDropped(random1: Random| undefined):  int {
		return 0;
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(await world1.getSavedLightValue(EnumSkyBlock.Block, i2, i3, i4) > 11 - Block.lightOpacity[this.blockID]) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, Block.waterMoving.blockID);
		}

	}
}
