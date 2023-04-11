import { int, double, java, byte } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { Entity } from "./Entity";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { BlockRegistry } from "./moved/BlockRegistry";
import { Random } from "../java/util/Random";

export  class BlockSoil extends Block {
	public constructor(i1: int) {
		super(i1, MaterialRegistry.ground);
		this.blockIndexInTexture = 87;
		this.setTickOnLoad(true);
		this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.9375, 1.0);
		this.setLightOpacity(255);
	}

	public getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  AxisAlignedBB | null {
		return AxisAlignedBB.getBoundingBoxFromPool((i2 + 0) as double, (i3 + 0) as double, (i4 + 0) as double, (i2 + 1) as double, (i3 + 1) as double, (i4 + 1) as double);
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return i1 === 1 && i2 > 0 ? this.blockIndexInTexture - 1 : (i1 === 1 ? this.blockIndexInTexture : 2);
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(random5.nextInt(5) === 0) {
			if(await this.isWaterNearby(world1, i2, i3, i4)) {
				await world1.setBlockMetadataWithNotify(i2, i3, i4, 7);
			} else {
				let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
				if(i6 > 0) {
					await world1.setBlockMetadataWithNotify(i2, i3, i4, i6 - 1);
				} else if(!this.isCropsNearby(world1, i2, i3, i4)) {
					await world1.setBlockWithNotify(i2, i3, i4, BlockRegistry.dirt.blockID);
				}
			}
		}

	}

	public async onEntityWalking(world1: World| null, i2: int, i3: int, i4: int, entity5: Entity| null):  Promise<void> {
		if(world1.rand.nextInt(4) === 0) {
			await world1.setBlockWithNotify(i2, i3, i4, BlockRegistry.dirt.blockID);
		}

	}

	private async isCropsNearby(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  b5: byte = 0;

		for(let  i6: int = i2 - b5; i6 <= i2 + b5; ++i6) {
			for(let  i7: int = i4 - b5; i7 <= i4 + b5; ++i7) {
				if(await world1.getBlockId(i6, i3 + 1, i7) === BlockRegistry.crops.blockID) {
					return true;
				}
			}
		}

		return false;
	}

	private async isWaterNearby(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		for(let  i5: int = i2 - 4; i5 <= i2 + 4; ++i5) {
			for(let  i6: int = i3; i6 <= i3 + 1; ++i6) {
				for(let  i7: int = i4 - 4; i7 <= i4 + 4; ++i7) {
					if(await world1.getBlockMaterial(i5, i6, i7) === MaterialRegistry.water) {
						return true;
					}
				}
			}
		}

		return false;
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		super.onNeighborBlockChange(world1, i2, i3, i4, i5);
		let  material6: Material = await world1.getBlockMaterial(i2, i3 + 1, i4);
		if(material6.isSolid()) {
			world1.setBlockWithNotify(i2, i3, i4, BlockRegistry.dirt.blockID);
		}

	}

	public idDropped(i1: int, random2: Random| null):  int {
		return BlockRegistry.dirt.idDropped(0, random2);
	}
}
