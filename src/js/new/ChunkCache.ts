
import { JavaObject, int, float } from "jree";
import { WorldChunkManager } from "./WorldChunkManager";
import { World } from "./World";
// import { TileEntity } from "./TileEntity";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { Chunk } from "./Chunk";
import { Block } from "./Block";

export  class ChunkCache implements IBlockAccess {
	private chunkX:  int;
	private chunkZ:  int;
	private chunkArray:  Chunk[][];
	private worldObj:  World | null;

	public constructor(world1: World| null, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int) {
		this.worldObj = world1;
		this.chunkX = i2 >> 4;
		this.chunkZ = i4 >> 4;
		let  i8: int = i5 >> 4;
		let  i9: int = i7 >> 4;
		this.chunkArray = [];

		for(let  i10: int = this.chunkX; i10 <= i8; ++i10) {
			for(let  i11: int = this.chunkZ; i11 <= i9; ++i11) {
				this.chunkArray[i10 - this.chunkX][i11 - this.chunkZ] = world1.getChunkFromChunkCoords(i10, i11);
			}
		}

	}

	public getBlockId(i1: int, i2: int, i3: int):  int {
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

	// TODO: Tile Entities
	// public getBlockTileEntity(i1: int, i2: int, i3: int):  TileEntity | null {
	// 	let  i4: int = (i1 >> 4) - this.chunkX;
	// 	let  i5: int = (i3 >> 4) - this.chunkZ;
	// 	return this.chunkArray[i4][i5].getChunkBlockTileEntity(i1 & 15, i2, i3 & 15);
	// }

	public getLightBrightness(i1: int, i2: int, i3: int):  float {
		return this.worldObj.worldProvider.lightBrightnessTable[this.func_4086_d(i1, i2, i3)];
	}

	public func_4086_d(i1: int, i2: int, i3: int):  int {
		return this.func_716_a(i1, i2, i3, true);
	}

	public func_716_a(i1: int, i2: int, i3: int, z4: boolean):  int {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			let  i5: int;
			let  i6: int;
			if(z4) {
				i5 = this.getBlockId(i1, i2, i3);
				// if(i5 === EnumSkyBlock.Block.stairSingle.blockID || i5 === EnumSkyBlock.Block.tilledField.blockID) {
				// 	i6 = this.func_716_a(i1, i2 + 1, i3, false);
				// 	let  i7: int = this.func_716_a(i1 + 1, i2, i3, false);
				// 	let  i8: int = this.func_716_a(i1 - 1, i2, i3, false);
				// 	let  i9: int = this.func_716_a(i1, i2, i3 + 1, false);
				// 	let  i10: int = this.func_716_a(i1, i2, i3 - 1, false);
				// 	if(i7 > i6) {
				// 		i6 = i7;
				// 	}

				// 	if(i8 > i6) {
				// 		i6 = i8;
				// 	}

				// 	if(i9 > i6) {
				// 		i6 = i9;
				// 	}

				// 	if(i10 > i6) {
				// 		i6 = i10;
				// 	}

				// 	return i6;
				// }
			}

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

	public getBlockMetadata(i1: int, i2: int, i3: int):  int {
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

	public getBlockMaterial(i1: int, i2: int, i3: int):  Material {
		let  i4: int = this.getBlockId(i1, i2, i3);
		return i4 === 0 ? Material.air : Block.blocksList[i4].blockMaterial;
	}

	public isBlockOpaqueCube(i1: int, i2: int, i3: int):  boolean {
		let  block4: Block = Block.blocksList[this.getBlockId(i1, i2, i3)];
		return block4 === null ? false : block4.isOpaqueCube();
	}

	public getWorldChunkManager():  WorldChunkManager {
		return this.worldObj.getWorldChunkManager();
	}
}
