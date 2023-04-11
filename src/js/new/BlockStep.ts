import { int, java } from "../jree/index";
import { World } from "./World";
import { IBlockAccess } from "./IBlockAccess";
import { Block } from "./Block";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { BlockRegistry } from './moved/BlockRegistry'
import { Random } from "../java/util/Random";

export  class BlockStep extends Block {
	private blockType:  boolean;

	public constructor(i1: int, z2: boolean) {
		super(i1, 6, MaterialRegistry.rock);
		this.blockType = z2;
		if(!z2) {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.5, 1.0);
		}

		this.setLightOpacity(255);
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 <= 1 ? 6 : 5;
	}

	public isOpaqueCube():  boolean {
		return this.blockType;
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(this === BlockRegistry.stairSingle) {
			;
		}
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(this !== BlockRegistry.stairSingle) {
			super.onBlockAdded(world1, i2, i3, i4);
		}

		let  i5: int = await world1.getBlockId(i2, i3 - 1, i4);
		if(i5 === BlockRegistry.stairSingle.blockID) {
			world1.setBlockWithNotify(i2, i3, i4, 0);
			world1.setBlockWithNotify(i2, i3 - 1, i4, BlockRegistry.stairDouble.blockID);
		}

	}

	public idDropped(i1: int, random2: Random | null):  int {
		return BlockRegistry.stairSingle.blockID;
	}

	public renderAsNormalBlock():  boolean {
		return this.blockType;
	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(this !== BlockRegistry.stairSingle) {
			await super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, i5);
		}

		return i5 === 1 ? true : (!await super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, i5) ? false : (i5 === 0 ? true : await iBlockAccess1.getBlockId(i2, i3, i4) !== this.blockID));
	}
}
