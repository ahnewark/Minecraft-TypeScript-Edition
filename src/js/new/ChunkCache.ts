
import { int, float } from "../jree/index";
import { WorldChunkManager } from "./WorldChunkManager";
import { World } from "./World";
import { TileEntity } from "./TileEntity";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { Chunk } from "./Chunk";
import { Block } from "./Block";
import { MaterialRegistry } from "./index";

export  class ChunkCache implements IBlockAccess {
	private chunkX:  int;
	private chunkZ:  int;
	private chunkArray:  Chunk[][];
	private worldObj:  World | null;

	public static async Construct(world1: World| null, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int) {
		const _this = new ChunkCache();

		_this.worldObj = world1;
		_this.chunkX = i2 >> 4;
		_this.chunkZ = i4 >> 4;
		let  i8: int = i5 >> 4;
		let  i9: int = i7 >> 4;
		_this.chunkArray = [];

		for(let  i10: int = _this.chunkX; i10 <= i8; ++i10) {
			for(let  i11: int = _this.chunkZ; i11 <= i9; ++i11) {
				_this.chunkArray[i10 - _this.chunkX][i11 - _this.chunkZ] = await world1.getChunkFromChunkCoords(i10, i11);
			}
		}

		return _this;
	}

	public async getBlockId(i1: int, i2: int, i3: int):  Promise<int> {
		if(i2 < 0) {
			return 0;
		} else if(i2 >= 128) {
			return 0;
		} else {
			let  i4: int = (i1 >> 4) - this.chunkX;
			let  i5: int = (i3 >> 4) - this.chunkZ;
			let  chunk6: Chunk = this.chunkArray[i4][i5];
			return chunk6 === null ? 0 : chunk6.getBlockID(i1 & 15, i2, i3 & 15);
		}
	}

	public async getBlockTileEntity(i1: int, i2: int, i3: int):  Promise<TileEntity> {
		let  i4: int = (i1 >> 4) - this.chunkX;
		let  i5: int = (i3 >> 4) - this.chunkZ;
		return this.chunkArray[i4][i5].getChunkBlockTileEntity(i1 & 15, i2, i3 & 15);
	}

	public async getLightBrightness(i1: int, i2: int, i3: int):  Promise<float> {
		return this.worldObj.worldProvider.lightBrightnessTable[await this.func_4086_d(i1, i2, i3)];
	}

	public async func_4086_d(i1: int, i2: int, i3: int):  Promise<int> {
		return this.func_716_a(i1, i2, i3, true);
	}

	public async func_716_a(i1: int, i2: int, i3: int, z4: boolean):  Promise<int> {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			let  i5: int;
			let  i6: int;
			// if(z4) {
			// 	i5 = await this.getBlockId(i1, i2, i3);
			// 	if(i5 === Block.stairSingle.blockID || i5 === Block.tilledField.blockID) {
			// 		i6 = this.func_716_a(i1, i2 + 1, i3, false);
			// 		let  i7: int = this.func_716_a(i1 + 1, i2, i3, false);
			// 		let  i8: int = this.func_716_a(i1 - 1, i2, i3, false);
			// 		let  i9: int = this.func_716_a(i1, i2, i3 + 1, false);
			// 		let  i10: int = this.func_716_a(i1, i2, i3 - 1, false);
			// 		if(i7 > i6) {
			// 			i6 = i7;
			// 		}

			// 		if(i8 > i6) {
			// 			i6 = i8;
			// 		}

			// 		if(i9 > i6) {
			// 			i6 = i9;
			// 		}

			// 		if(i10 > i6) {
			// 			i6 = i10;
			// 		}

			// 		return i6;
			// 	}
			// }

			if(i2 < 0) {
				return 0;
			} else if(i2 >= 128) {
				i5 = 15 - this.worldObj.skylightSubtracted;
				if(i5 < 0) {
					i5 = 0;
				}

				return i5;
			} else {
				i5 = (i1 >> 4) - this.chunkX;
				i6 = (i3 >> 4) - this.chunkZ;
				return this.chunkArray[i5][i6].getBlockLightValue(i1 & 15, i2, i3 & 15, this.worldObj.skylightSubtracted);
			}
		} else {
			return 15;
		}
	}

	public async getBlockMetadata(i1: int, i2: int, i3: int): Promise<int> {
		if(i2 < 0) {
			return 0;
		} else if(i2 >= 128) {
			return 0;
		} else {
			let  i4: int = (i1 >> 4) - this.chunkX;
			let  i5: int = (i3 >> 4) - this.chunkZ;
			return this.chunkArray[i4][i5].getBlockMetadata(i1 & 15, i2, i3 & 15);
		}
	}

	public async getBlockMaterial(i1: int, i2: int, i3: int):  Promise<Material> {
		let  i4: int = await this.getBlockId(i1, i2, i3);
		return i4 === 0 ? MaterialRegistry.air : Block.blocksList[i4].blockMaterial;
	}

	public async isBlockOpaqueCube(i1: int, i2: int, i3: int):  Promise<boolean> {
		let  block4: Block = Block.blocksList[await this.getBlockId(i1, i2, i3)];
		return block4 === null ? false : block4.isOpaqueCube();
	}

	public getWorldChunkManager():  WorldChunkManager {
		return this.worldObj.getWorldChunkManager();
	}
}
