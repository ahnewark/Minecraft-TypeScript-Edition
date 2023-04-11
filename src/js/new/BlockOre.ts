import { int } from "../jree/index";
import { Block } from "./Block";
import { MaterialRegistry } from "./index";
import { Random } from "../java/util/Random";
import { ItemRegistry } from "./moved/ItemRegistry";
import { BlockRegistry} from './moved/BlockRegistry'

export  class BlockOre extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.rock);
	}

	public idDropped(i1: int, random2: Random | null):  int {
		return this.blockID === BlockRegistry.oreCoal.blockID ? ItemRegistry.coal.shiftedIndex : (this.blockID === BlockRegistry.oreDiamond.blockID ? ItemRegistry.diamond.shiftedIndex : (this.blockID === BlockRegistry.oreLapis.blockID ? ItemRegistry.dyePowder.shiftedIndex : this.blockID));
	}

	public quantityDropped(random1: Random| null):  int {
		return this.blockID === BlockRegistry.oreLapis.blockID ? 4 + random1.nextInt(5) : 1;
	}

	protected damageDropped(i1: int):  int {
		return this.blockID === BlockRegistry.oreLapis.blockID ? 4 : 0;
	}
}
