import { int, float, double } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { IBlockAccess } from "./IBlockAccess";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityItem } from "./EntityItem";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./index";
import { ItemRegistry } from "./moved/ItemRegistry";
import { Random } from "../java/util/Random";

export  class BlockSnow extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.snow);
		this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.125, 1.0);
		this.setTickOnLoad(true);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return null;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  i5: int = await world1.getBlockId(i2, i3 - 1, i4);
		return i5 !== 0 && Block.blocksList[i5].isOpaqueCube() ? (await world1.getBlockMaterial(i2, i3 - 1, i4)).getIsSolid() : false;
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await this.func_314_h(world1, i2, i3, i4);
	}

	private async func_314_h(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		if(!this.canPlaceBlockAt(world1, i2, i3, i4)) {
			this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
			return false;
		} else {
			return true;
		}
	}

	public async harvestBlock(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  i6: int = ItemRegistry.snowball.shiftedIndex;
		let  f7: float = 0.7;
		let  d8: double = (world1.rand.nextFloat() * f7) as double + (1.0 - f7) as double * 0.5;
		let  d10: double = (world1.rand.nextFloat() * f7) as double + (1.0 - f7) as double * 0.5;
		let  d12: double = (world1.rand.nextFloat() * f7) as double + (1.0 - f7) as double * 0.5;
		let  entityItem14: EntityItem = new  EntityItem(world1, i2 as double + d8, i3 as double + d10, i4 as double + d12, new  ItemStack(i6, 1, 0));
		entityItem14.delayBeforeCanPickup = 10;
		world1.entityJoinedWorld(entityItem14);
		world1.setBlockWithNotify(i2, i3, i4, 0);
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return ItemRegistry.snowball.shiftedIndex;
	}

	public quantityDropped(random1: Random| null):  int {
		return 0;
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(await world1.getSavedLightValue(EnumSkyBlock.Block, i2, i3, i4) > 11) {
			this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		let  material6: Material = await iBlockAccess1.getBlockMaterial(i2, i3, i4);
		return i5 === 1 ? true : (material6 === this.blockMaterial ? false : await super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, i5));
	}
}
