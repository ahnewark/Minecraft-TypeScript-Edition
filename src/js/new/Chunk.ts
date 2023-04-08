


import { java, long, S } from "jree";
import System from '../java/lang/System';
import { World } from "./World";
import { Block } from "./Block";
// TODO: Tile Entities
// import { TileEntity } from "./TileEntity";
import { NibbleArray } from "./NibbleArray";
import { MathHelper } from "./MathHelper";
import { EnumSkyBlock } from "./EnumSkyBlock";
// TODO: Entities
// import { Entity } from "./Entity";
import { ChunkPosition } from "./ChunkPosition";
// TODO: Tile Entities
// import { BlockContainer } from "./BlockContainer";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";

export class Chunk {
	public static isLit:  boolean;
	public blocks:  Int8Array;
	public isChunkLoaded:  boolean;
	public worldObj:  World;
	public data:  NibbleArray;
	public skylightMap:  NibbleArray;
	public blocklightMap:  NibbleArray;
	public heightMap:  Int8Array;
	public field_1532_i:  number;
	public readonly xPosition:  number;
	public readonly zPosition:  number;
    // TODO: Tile Entities
	// public chunkTileEntityMap:  java.util.Map | null;
    // TODO: Entities
	// public entities:  java.util.List[] | null;
	public isTerrainPopulated:  boolean;
	public isModified:  boolean;
	public neverSave:  boolean;
	public hasEntities:  boolean;
	public lastSaveTime:  long;

	public constructor(world1: World, i2: number, i3: number);

	public constructor(world1: World, b2: Int8Array, i3: number, i4: number);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 3: {
				const [world1, i2, i3] = args as [World, number, number];

                // TODO: Tile Entities
                // this.chunkTileEntityMap = new  java.util.HashMap();
                // TODO: Entities
                // this.entities = new   Array<java.util.List>(8);
                this.isTerrainPopulated = false;
                this.isModified = false;
                this.hasEntities = false;
                this.lastSaveTime = 0n;
                this.worldObj = world1;
                this.xPosition = i2;
                this.zPosition = i3;
                this.heightMap = new Int8Array(256);

                // TODO: Entities
                // for(let  i4: number = 0; i4 < this.entities.length; ++i4) {
                //     this.entities[i4] = new  java.util.ArrayList();
                // }

	

				break;
			}

			case 4: {
				const [world1, b2, i3, i4] = args as [World, Int8Array, number, number];

                this.isTerrainPopulated = false;
                this.isModified = false;
                this.hasEntities = false;
                this.lastSaveTime = 0n;
                this.worldObj = world1;
                this.xPosition = i3;
                this.zPosition = i4;
                this.heightMap = new Int8Array(256);

                this.blocks = b2;
                this.data = new  NibbleArray(b2.length);
                this.skylightMap = new  NibbleArray(b2.length);
                this.blocklightMap = new  NibbleArray(b2.length);

				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public isAtLocation(i1: number, i2: number):  boolean {
		return i1 === this.xPosition && i2 === this.zPosition;
	}

	public getHeightValue(i1: number, i2: number):  number {
		return this.heightMap[i2 << 4 | i1] & 255;
	}

	public func_1014_a():  void {
	}

	public generateHeightMap():  void {
		let  i1: number = 127;

		for(let  i2: number = 0; i2 < 16; ++i2) {
			for(let  i3: number = 0; i3 < 16; ++i3) {
				let  i4: number = 127;

				for(let  i5: number = i2 << 11 | i3 << 7; i4 > 0 && Block.lightOpacity[this.blocks[i5 + i4 - 1]] === 0; --i4) {
				}

				this.heightMap[i3 << 4 | i2] = i4 as number;
				if(i4 < i1) {
					i1 = i4;
				}
			}
		}

		this.field_1532_i = i1;
		this.isModified = true;
	}

	public func_1024_c():  void {
		let  i1: number = 127;

		let  i2: number;
		let  i3: number;
		for(i2 = 0; i2 < 16; ++i2) {
			for(i3 = 0; i3 < 16; ++i3) {
				let  i4: number = 127;

				let  i5: number;
				for(i5 = i2 << 11 | i3 << 7; i4 > 0 && Block.lightOpacity[this.blocks[i5 + i4 - 1]] === 0; --i4) {
				}

				this.heightMap[i3 << 4 | i2] = i4 as number;
				if(i4 < i1) {
					i1 = i4;
				}

				if(!this.worldObj.worldProvider.field_6478_e) {
					let  i6: number = 15;
					let  i7: number = 127;

					do {
						i6 -= Block.lightOpacity[this.blocks[i5 + i7]];
						if(i6 > 0) {
							this.skylightMap.setNibble(i2, i7, i3, i6);
						}

						--i7;
					} while(i7 > 0 && i6 > 0);
				}
			}
		}

		this.field_1532_i = i1;

		for(i2 = 0; i2 < 16; ++i2) {
			for(i3 = 0; i3 < 16; ++i3) {
				this.func_996_c(i2, i3);
			}
		}

		this.isModified = true;
	}

	public func_4143_d():  void {
		let  b1: number = 32;

		for(let  i2: number = 0; i2 < 16; ++i2) {
			for(let  i3: number = 0; i3 < 16; ++i3) {
				let  i4: number = i2 << 11 | i3 << 7;

				let  i5: number;
				let  i6: number;
				for(i5 = 0; i5 < 128; ++i5) {
					i6 = Block.lightValue[this.blocks[i4 + i5]];
					if(i6 > 0) {
						this.blocklightMap.setNibble(i2, i5, i3, i6);
					}
				}

				i5 = 15;

				for(i6 = b1 - 2; i6 < 128 && i5 > 0; this.blocklightMap.setNibble(i2, i6, i3, i5)) {
					++i6;
					let  b7: number = this.blocks[i4 + i6];
					let  i8: number = Block.lightOpacity[b7];
					let  i9: number = Block.lightValue[b7];
					if(i8 === 0) {
						i8 = 1;
					}

					i5 -= i8;
					if(i9 > i5) {
						i5 = i9;
					}

					if(i5 < 0) {
						i5 = 0;
					}
				}
			}
		}

		this.worldObj.func_616_a(EnumSkyBlock.Block, this.xPosition * 16, b1 - 1, this.zPosition * 16, this.xPosition * 16 + 16, b1 + 1, this.zPosition * 16 + 16);
		this.isModified = true;
	}

	private func_996_c(i1: number, i2: number):  void {
		let  i3: number = this.getHeightValue(i1, i2);
		let  i4: number = this.xPosition * 16 + i1;
		let  i5: number = this.zPosition * 16 + i2;
		this.func_1020_f(i4 - 1, i5, i3);
		this.func_1020_f(i4 + 1, i5, i3);
		this.func_1020_f(i4, i5 - 1, i3);
		this.func_1020_f(i4, i5 + 1, i3);
	}

	private func_1020_f(i1: number, i2: number, i3: number):  void {
		let  i4: number = this.worldObj.getHeightValue(i1, i2);
		if(i4 > i3) {
			this.worldObj.func_616_a(EnumSkyBlock.Sky, i1, i3, i2, i1, i4, i2);
			this.isModified = true;
		} else if(i4 < i3) {
			this.worldObj.func_616_a(EnumSkyBlock.Sky, i1, i4, i2, i1, i3, i2);
			this.isModified = true;
		}

	}

	private func_1003_g(i1: number, i2: number, i3: number):  void {
		let  i4: number = this.heightMap[i3 << 4 | i1] & 255;
		let  i5: number = i4;
		if(i2 > i4) {
			i5 = i2;
		}

		for(let  i6: number = i1 << 11 | i3 << 7; i5 > 0 && Block.lightOpacity[this.blocks[i6 + i5 - 1]] === 0; --i5) {
		}

		if(i5 !== i4) {
			this.worldObj.markBlocksDirtyVertical(i1, i3, i5, i4);
			this.heightMap[i3 << 4 | i1] = i5 as number;
			let  i7: number;
			let  i8: number;
			let  i9: number;
			if(i5 < this.field_1532_i) {
				this.field_1532_i = i5;
			} else {
				i7 = 127;

				for(i8 = 0; i8 < 16; ++i8) {
					for(i9 = 0; i9 < 16; ++i9) {
						if((this.heightMap[i9 << 4 | i8] & 255) < i7) {
							i7 = this.heightMap[i9 << 4 | i8] & 255;
						}
					}
				}

				this.field_1532_i = i7;
			}

			i7 = this.xPosition * 16 + i1;
			i8 = this.zPosition * 16 + i3;
			if(i5 < i4) {
				for(i9 = i5; i9 < i4; ++i9) {
					this.skylightMap.setNibble(i1, i9, i3, 15);
				}
			} else {
				this.worldObj.func_616_a(EnumSkyBlock.Sky, i7, i4, i8, i7, i5, i8);

				for(i9 = i4; i9 < i5; ++i9) {
					this.skylightMap.setNibble(i1, i9, i3, 0);
				}
			}

			i9 = 15;

			let  i10: number;
			for(i10 = i5; i5 > 0 && i9 > 0; this.skylightMap.setNibble(i1, i5, i3, i9)) {
				--i5;
				let  i11: number = Block.lightOpacity[this.getBlockID(i1, i5, i3)];
				if(i11 === 0) {
					i11 = 1;
				}

				i9 -= i11;
				if(i9 < 0) {
					i9 = 0;
				}
			}

			while(i5 > 0 && Block.lightOpacity[this.getBlockID(i1, i5 - 1, i3)] === 0) {
				--i5;
			}

			if(i5 !== i10) {
				this.worldObj.func_616_a(EnumSkyBlock.Sky, i7 - 1, i5, i8 - 1, i7 + 1, i10, i8 + 1);
			}

			this.isModified = true;
		}
	}

	public getBlockID(i1: number, i2: number, i3: number):  number {
		return this.blocks[i1 << 11 | i3 << 7 | i2];
	}

	public setBlockIDWithMetadata(i1: number, i2: number, i3: number, i4: number, i5: number):  boolean {
		let  b6: number = i4 as number;
		let  i7: number = this.heightMap[i3 << 4 | i1] & 255;
		let  i8: number = this.blocks[i1 << 11 | i3 << 7 | i2] & 255;
		if(i8 === i4 && this.data.getNibble(i1, i2, i3) === i5) {
			return false;
		} else {
			let  i9: number = this.xPosition * 16 + i1;
			let  i10: number = this.zPosition * 16 + i3;
			this.blocks[i1 << 11 | i3 << 7 | i2] = b6;
			if(i8 !== 0 && !this.worldObj.multiplayerWorld) {
				Block.blocksList[i8].onBlockRemoval(this.worldObj, i9, i2, i10);
			}

			this.data.setNibble(i1, i2, i3, i5);
			if(!this.worldObj.worldProvider.field_6478_e) {
				if(Block.lightOpacity[b6] !== 0) {
					if(i2 >= i7) {
						this.func_1003_g(i1, i2 + 1, i3);
					}
				} else if(i2 === i7 - 1) {
					this.func_1003_g(i1, i2, i3);
				}

				this.worldObj.func_616_a(EnumSkyBlock.Sky, i9, i2, i10, i9, i2, i10);
			}

			this.worldObj.func_616_a(EnumSkyBlock.Block, i9, i2, i10, i9, i2, i10);
			this.func_996_c(i1, i3);
			this.data.setNibble(i1, i2, i3, i5);
			if(i4 !== 0) {
			    Block.blocksList[i4].onBlockAdded(this.worldObj, i9, i2, i10);
			}

			this.isModified = true;
			return true;
		}
	}

	public setBlockID(i1: number, i2: number, i3: number, i4: number):  boolean {
		let  b5: number = i4 as number;
		let  i6: number = this.heightMap[i3 << 4 | i1] & 255;
		let  i7: number = this.blocks[i1 << 11 | i3 << 7 | i2] & 255;
		if(i7 === i4) {
			return false;
		} else {
			let  i8: number = this.xPosition * 16 + i1;
			let  i9: number = this.zPosition * 16 + i3;
			this.blocks[i1 << 11 | i3 << 7 | i2] = b5;
			if(i7 !== 0) {
				Block.blocksList[i7].onBlockRemoval(this.worldObj, i8, i2, i9);
			}

			this.data.setNibble(i1, i2, i3, 0);
			if(Block.lightOpacity[b5] !== 0) {
				if(i2 >= i6) {
					this.func_1003_g(i1, i2 + 1, i3);
				}
			} else if(i2 === i6 - 1) {
				this.func_1003_g(i1, i2, i3);
			}

			this.worldObj.func_616_a(EnumSkyBlock.Sky, i8, i2, i9, i8, i2, i9);
			this.worldObj.func_616_a(EnumSkyBlock.Block, i8, i2, i9, i8, i2, i9);
			this.func_996_c(i1, i3);
			if(i4 !== 0 && !this.worldObj.multiplayerWorld) {
				Block.blocksList[i4].onBlockAdded(this.worldObj, i8, i2, i9);
			}

			this.isModified = true;
			return true;
		}
	}

	public getBlockMetadata(i1: number, i2: number, i3: number):  number {
		return this.data.getNibble(i1, i2, i3);
	}

	public setBlockMetadata(i1: number, i2: number, i3: number, i4: number):  void {
		this.isModified = true;
		this.data.setNibble(i1, i2, i3, i4);
	}

	public getSavedLightValue(enumSkyBlock1: EnumSkyBlock| null, i2: number, i3: number, i4: number):  number {
		return enumSkyBlock1 === EnumSkyBlock.Sky ? this.skylightMap.getNibble(i2, i3, i4) : (enumSkyBlock1 === EnumSkyBlock.Block ? this.blocklightMap.getNibble(i2, i3, i4) : 0);
	}

	public setLightValue(enumSkyBlock1: EnumSkyBlock| null, i2: number, i3: number, i4: number, i5: number):  void {
		this.isModified = true;
		if(enumSkyBlock1 === EnumSkyBlock.Sky) {
			this.skylightMap.setNibble(i2, i3, i4, i5);
		} else {
			if(enumSkyBlock1 !== EnumSkyBlock.Block) {
				return;
			}

			this.blocklightMap.setNibble(i2, i3, i4, i5);
		}

	}

	public getBlockLightValue(i1: number, i2: number, i3: number, i4: number):  number {
		let  i5: number = this.skylightMap.getNibble(i1, i2, i3);
		if(i5 > 0) {
			Chunk.isLit = true;
		}

		i5 -= i4;
		let  i6: number = this.blocklightMap.getNibble(i1, i2, i3);
		if(i6 > i5) {
			i5 = i6;
		}

		return i5;
	}

    // TODO: ENtities
	// public addEntity(entity1: Entity| null):  void {
	// 	this.hasEntities = true;
	// 	let  i2: number = MathHelper.floor_double(entity1.posX / 16.0);
	// 	let  i3: number = MathHelper.floor_double(entity1.posZ / 16.0);
	// 	if(i2 !== this.xPosition || i3 !== this.zPosition) {
	// 		java.lang.System.out.println("Wrong location! " + entity1);
	// 		java.lang.Thread.dumpStack();
	// 	}

	// 	let  i4: number = MathHelper.floor_double(entity1.posY / 16.0);
	// 	if(i4 < 0) {
	// 		i4 = 0;
	// 	}

	// 	if(i4 >= this.entities.length) {
	// 		i4 = this.entities.length - 1;
	// 	}

	// 	entity1.addedToChunk = true;
	// 	entity1.chunkCoordX = this.xPosition;
	// 	entity1.chunkCoordY = i4;
	// 	entity1.chunkCoordZ = this.zPosition;
	// 	this.entities[i4].add(entity1);
	// }

	// public func_1015_b(entity1: Entity| null):  void {
	// 	this.func_1016_a(entity1, entity1.chunkCoordY);
	// }

	// public func_1016_a(entity1: Entity| null, i2: number):  void {
	// 	if(i2 < 0) {
	// 		i2 = 0;
	// 	}

	// 	if(i2 >= this.entities.length) {
	// 		i2 = this.entities.length - 1;
	// 	}

	// 	this.entities[i2].remove(entity1);
	// }

	public canBlockSeeTheSky(i1: number, i2: number, i3: number):  boolean {
		return i2 >= (this.heightMap[i3 << 4 | i1] & 255);
	}

    // TODO: Tile Entities
	// public getChunkBlockTileEntity(i1: number, i2: number, i3: number):  TileEntity | null {
	// 	let  chunkPosition4: ChunkPosition = new  ChunkPosition(i1, i2, i3);
	// 	let  tileEntity5: TileEntity = this.chunkTileEntityMap.get(chunkPosition4) as TileEntity;
	// 	if(tileEntity5 === null) {
	// 		let  i6: number = this.getBlockID(i1, i2, i3);
	// 		if(!EnumSkyBlock.Block.isBlockContainer[i6]) {
	// 			return null;
	// 		}

	// 		let  blockContainer7: BlockContainer = EnumSkyBlock.Block.blocksList[i6] as BlockContainer;
	// 		blockContainer7.onBlockAdded(this.worldObj, this.xPosition * 16 + i1, i2, this.zPosition * 16 + i3);
	// 		tileEntity5 = this.chunkTileEntityMap.get(chunkPosition4) as TileEntity;
	// 	}

	// 	return tileEntity5;
	// }

	// public func_1001_a(tileEntity1: TileEntity| null):  void {
	// 	let  i2: number = tileEntity1.xCoord - this.xPosition * 16;
	// 	let  i3: number = tileEntity1.yCoord;
	// 	let  i4: number = tileEntity1.zCoord - this.zPosition * 16;
	// 	this.setChunkBlockTileEntity(i2, i3, i4, tileEntity1);
	// }

	// public setChunkBlockTileEntity(i1: number, i2: number, i3: number, tileEntity4: TileEntity| null):  void {
	// 	let  chunkPosition5: ChunkPosition = new  ChunkPosition(i1, i2, i3);
	// 	tileEntity4.worldObj = this.worldObj;
	// 	tileEntity4.xCoord = this.xPosition * 16 + i1;
	// 	tileEntity4.yCoord = i2;
	// 	tileEntity4.zCoord = this.zPosition * 16 + i3;
	// 	if(this.getBlockID(i1, i2, i3) !== 0 && EnumSkyBlock.Block.blocksList[this.getBlockID(i1, i2, i3)] instanceof BlockContainer) {
	// 		if(this.isChunkLoaded) {
	// 			if(this.chunkTileEntityMap.get(chunkPosition5) !== null) {
	// 				this.worldObj.loadedTileEntityList.remove(this.chunkTileEntityMap.get(chunkPosition5));
	// 			}

	// 			this.worldObj.loadedTileEntityList.add(tileEntity4);
	// 		}

	// 		this.chunkTileEntityMap.put(chunkPosition5, tileEntity4);
	// 	} else {
	// 		java.lang.System.out.println("Attempted to place a tile entity where there was no entity tile!");
	// 	}
	// }

	// public removeChunkBlockTileEntity(i1: number, i2: number, i3: number):  void {
	// 	let  chunkPosition4: ChunkPosition = new  ChunkPosition(i1, i2, i3);
	// 	if(this.isChunkLoaded) {
	// 		this.worldObj.loadedTileEntityList.remove(this.chunkTileEntityMap.remove(chunkPosition4));
	// 	}

	// }

	public onChunkLoad():  void {
		this.isChunkLoaded = true;

        // TODO: Tile Entities
		// this.worldObj.loadedTileEntityList.addAll(this.chunkTileEntityMap.values());

        // TODO: Entities
		// for(let  i1: number = 0; i1 < this.entities.length; ++i1) {
		// 	this.worldObj.func_636_a(this.entities[i1]);
		// }

	}

	public onChunkUnload():  void {
		this.isChunkLoaded = false;

        // TODO: Tile Entities
		// this.worldObj.loadedTileEntityList.removeAll(this.chunkTileEntityMap.values());

        // TODO: Entities
		// for(let  i1: number = 0; i1 < this.entities.length; ++i1) {
		// 	this.worldObj.func_632_b(this.entities[i1]);
		// }

	}

	public setChunkModified():  void {
		this.isModified = true;
	}

    // TODO: Entities
	// public getEntitiesWithinAABBForEntity(entity1: Entity| null, axisAlignedBB2: AxisAlignedBB| null, list3: java.util.List| null):  void {
	// 	let  i4: number = MathHelper.floor_double((axisAlignedBB2.minY - 2.0) / 16.0);
	// 	let  i5: number = MathHelper.floor_double((axisAlignedBB2.maxY + 2.0) / 16.0);
	// 	if(i4 < 0) {
	// 		i4 = 0;
	// 	}

	// 	if(i5 >= this.entities.length) {
	// 		i5 = this.entities.length - 1;
	// 	}

	// 	for(let  i6: number = i4; i6 <= i5; ++i6) {
	// 		let  list7: java.util.List = this.entities[i6];

	// 		for(let  i8: number = 0; i8 < list7.size(); ++i8) {
	// 			let  entity9: Entity = list7.get(i8) as Entity;
	// 			if(entity9 !== entity1 && entity9.boundingBox.intersectsWith(axisAlignedBB2)) {
	// 				list3.add(entity9);
	// 			}
	// 		}
	// 	}

	// }

	// public getEntitiesOfTypeWithinAAAB(class1: java.lang.Class| null, axisAlignedBB2: AxisAlignedBB| null, list3: java.util.List| null):  void {
	// 	let  i4: number = MathHelper.floor_double((axisAlignedBB2.minY - 2.0) / 16.0);
	// 	let  i5: number = MathHelper.floor_double((axisAlignedBB2.maxY + 2.0) / 16.0);
	// 	if(i4 < 0) {
	// 		i4 = 0;
	// 	}

	// 	if(i5 >= this.entities.length) {
	// 		i5 = this.entities.length - 1;
	// 	}

	// 	for(let  i6: number = i4; i6 <= i5; ++i6) {
	// 		let  list7: java.util.List = this.entities[i6];

	// 		for(let  i8: number = 0; i8 < list7.size(); ++i8) {
	// 			let  entity9: Entity = list7.get(i8) as Entity;
	// 			if(class1.isAssignableFrom(entity9.getClass()) && entity9.boundingBox.intersectsWith(axisAlignedBB2)) {
	// 				list3.add(entity9);
	// 			}
	// 		}
	// 	}

	// }

	public needsSaving(z1: boolean):  boolean {
		if(this.neverSave) {
			return false;
		} else {
			if(z1) {
				if(this.hasEntities && this.worldObj.worldTime !== this.lastSaveTime) {
					return true;
				}
			} else if(this.hasEntities && this.worldObj.worldTime >= this.lastSaveTime + 600n) {
				return true;
			}

			return this.isModified;
		}
	}

	public setChunkData(b1: Int8Array, i2: number, i3: number, i4: number, i5: number, i6: number, i7: number, i8: number):  number {
		let  i9: number;
		let  i10: number;
		let  i11: number;
		let  i12: number;
		for(i9 = i2; i9 < i5; ++i9) {
			for(i10 = i4; i10 < i7; ++i10) {
				i11 = i9 << 11 | i10 << 7 | i3;
				i12 = i6 - i3;
				System.arraycopy(b1, i8, this.blocks, i11, i12);
				i8 += i12;
			}
		}

		this.generateHeightMap();

		for(i9 = i2; i9 < i5; ++i9) {
			for(i10 = i4; i10 < i7; ++i10) {
				i11 = (i9 << 11 | i10 << 7 | i3) >> 1;
				i12 = (i6 - i3) / 2;
				System.arraycopy(b1, i8, this.data.data, i11, i12);
				i8 += i12;
			}
		}

		for(i9 = i2; i9 < i5; ++i9) {
			for(i10 = i4; i10 < i7; ++i10) {
				i11 = (i9 << 11 | i10 << 7 | i3) >> 1;
				i12 = (i6 - i3) / 2;
				System.arraycopy(b1, i8, this.blocklightMap.data, i11, i12);
				i8 += i12;
			}
		}

		for(i9 = i2; i9 < i5; ++i9) {
			for(i10 = i4; i10 < i7; ++i10) {
				i11 = (i9 << 11 | i10 << 7 | i3) >> 1;
				i12 = (i6 - i3) / 2;
				System.arraycopy(b1, i8, this.skylightMap.data, i11, i12);
				i8 += i12;
			}
		}

		return i8;
	}

	public func_997_a(j1: long):  Random {
		return new  Random(this.worldObj.randomSeed + BigInt(this.xPosition * this.xPosition * 4987142) + BigInt(this.xPosition * 5947611) + BigInt(this.zPosition * this.zPosition) * 4392871n + (this.zPosition * 389711) as long ^ j1);
	}

	public func_21167_h():  boolean {
		return false;
	}
}
