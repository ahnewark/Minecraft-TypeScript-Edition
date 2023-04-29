import { int, java } from "../jree/index";
import { TileEntityMobSpawner } from "./TileEntityMobSpawner";
import { TileEntity } from "./TileEntity";
import { BlockContainer } from "./BlockContainer";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../jree/java/util/Random";

export  class BlockMobSpawner extends BlockContainer {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.rock);
	}

	protected getBlockEntity():  TileEntity | undefined {
		return new  TileEntityMobSpawner();
	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return 0;
	}

	public quantityDropped(random1: Random| undefined):  int {
		return 0;
	}

	public isOpaqueCube():  boolean {
		return false;
	}
}
