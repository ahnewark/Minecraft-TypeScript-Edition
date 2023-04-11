
import { int, S, java } from "../jree/index";
import { World } from "./World";
import { TileEntity } from "./TileEntity";
import { Material } from "./Material";
import { Block } from "./Block";

export abstract  class BlockContainer extends Block {
	protected constructor(i1: int, material2: Material| null);
	protected constructor(i1: int, i2: int, material3: Material| null);
    protected constructor(...args: unknown[]) {
		switch (args.length) {
			case 2: {
				const [i1, material2] = args as [int, Material];
				super(i1, material2);
				Block.isBlockContainer[i1] = true;
				break;
			}

			case 3: {
				const [i1, i2, material3] = args as [int, int, Material];
				super(i1, i2, material3);
				Block.isBlockContainer[i1] = true;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		await super.onBlockAdded(world1, i2, i3, i4);
		await world1.setBlockTileEntity(i2, i3, i4, this.getBlockEntity());
	}

	public async onBlockRemoval(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		await super.onBlockRemoval(world1, i2, i3, i4);
		await world1.removeBlockTileEntity(i2, i3, i4);
	}

	protected abstract getBlockEntity():  TileEntity | null;
}
