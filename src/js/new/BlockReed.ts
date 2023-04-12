


import { int, float } from "../jree/index";
import { World } from "./World";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { BlockRegistry } from "./moved/BlockRegistry";
import { Random } from "../java/util/Random";
import { ItemRegistry } from "./moved/ItemRegistry";

export  class BlockReed extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, MaterialRegistry.plants);
		this.blockIndexInTexture = i2;
		let  f3: float = 0.375;
		this.setBlockBounds(0.5 - f3, 0.0, 0.5 - f3, 0.5 + f3, 1.0, 0.5 + f3);
		this.setTickOnLoad(true);
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(await world1.isAirBlock(i2, i3 + 1, i4)) {
			let  i6: int;
			for(i6 = 1; await world1.getBlockId(i2, i3 - i6, i4) === this.blockID; ++i6) {
			}

			if(i6 < 3) {
				let  i7: int = await world1.getBlockMetadata(i2, i3, i4);
				if(i7 === 15) {
					await world1.setBlockWithNotify(i2, i3 + 1, i4, this.blockID);
					await world1.setBlockMetadataWithNotify(i2, i3, i4, 0);
				} else {
					await world1.setBlockMetadataWithNotify(i2, i3, i4, i7 + 1);
				}
			}
		}

	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  i5: int = await world1.getBlockId(i2, i3 - 1, i4);
		return i5 === this.blockID ? true : (i5 !== BlockRegistry.grass.blockID && i5 !== BlockRegistry.dirt.blockID ? false : (await world1.getBlockMaterial(i2 - 1, i3 - 1, i4) === MaterialRegistry.water ? true : (await world1.getBlockMaterial(i2 + 1, i3 - 1, i4) === MaterialRegistry.water ? true : (await world1.getBlockMaterial(i2, i3 - 1, i4 - 1) === MaterialRegistry.water ? true : await world1.getBlockMaterial(i2, i3 - 1, i4 + 1) === MaterialRegistry.water))));
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await this.checkBlockCoordValid(world1, i2, i3, i4);
	}

	protected async checkBlockCoordValid(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(!this.canBlockStay(world1, i2, i3, i4)) {
			this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

	}

	public async canBlockStay(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await this.canPlaceBlockAt(world1, i2, i3, i4);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return null;
	}

	public idDropped(i1: int, random2: Random| null):  int {
		return ItemRegistry.reed.shiftedIndex;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 1;
	}
}
