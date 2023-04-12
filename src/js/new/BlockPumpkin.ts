import { int, double } from "../jree/index";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { EntityLiving } from "./EntityLiving";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";

export  class BlockPumpkin extends Block {
	private blockType:  boolean;

	public constructor(i1: int, i2: int, z3: boolean) {
		super(i1, MaterialRegistry.pumpkin);
		this.blockIndexInTexture = i2;
		this.setTickOnLoad(true);
		this.blockType = z3;
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		if(i1 === 1) {
			return this.blockIndexInTexture;
		} else if(i1 === 0) {
			return this.blockIndexInTexture;
		} else {
			let  i3: int = this.blockIndexInTexture + 1 + 16;
			if(this.blockType) {
				++i3;
			}

			return i2 === 0 && i1 === 2 ? i3 : (i2 === 1 && i1 === 5 ? i3 : (i2 === 2 && i1 === 3 ? i3 : (i2 === 3 && i1 === 4 ? i3 : this.blockIndexInTexture + 16)));
		}
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 1 ? this.blockIndexInTexture : (i1 === 0 ? this.blockIndexInTexture : (i1 === 3 ? this.blockIndexInTexture + 1 + 16 : this.blockIndexInTexture + 16));
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int): Promise<void> {
		await super.onBlockAdded(world1, i2, i3, i4);
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  i5: int = await world1.getBlockId(i2, i3, i4);
		return (i5 === 0 || Block.blocksList[i5].blockMaterial.getIsLiquid()) && await world1.isBlockOpaqueCube(i2, i3 - 1, i4);
	}

	public async onBlockPlacedBy(world1: World| null, i2: int, i3: int, i4: int, entityLiving5: EntityLiving| null):  Promise<void> {
		let  i6: int = MathHelper.floor_double((entityLiving5.rotationYaw * 4.0 / 360.0) as double + 0.5) & 3;
		await world1.setBlockMetadataWithNotify(i2, i3, i4, i6);
	}
}
