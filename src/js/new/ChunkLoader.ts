


import { java } from "../jree/index";
import { World } from "./World";
import { TileEntity } from "./TileEntity";
import { NibbleArray } from "./NibbleArray";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { IChunkLoader } from "./IChunkLoader";
import { EntityList } from "./EntityList";
import { Entity } from "./Entity";
import { CompressedStreamTools } from "./CompressedStreamTools";
import { Chunk } from "./Chunk";
import { File, FileInputStream, FileOutputStream } from "../jree/java/io/index";
import { JavaString } from "../jree/index";

export  class ChunkLoader implements IChunkLoader {
	private saveDir:  File;
	private createIfNecessary:  boolean;

	public constructor(file1: File, z2: boolean) {
		this.saveDir = file1;
		this.createIfNecessary = z2;
	}

	private async chunkFileForXZ(i1: number, i2: number):  Promise<File | undefined> {
		let  string3: string = "c." + java.lang.Integer.toString(i1, 36) + "." + java.lang.Integer.toString(i2, 36) + ".dat";
		let  string4: string= '' + java.lang.Integer.toString(i1 & 63, 36);
		let  string5: string= '' + java.lang.Integer.toString(i2 & 63, 36);
		let  file6: File = new File(this.saveDir, new JavaString(string4));
		if(!await file6.exists()) {
			if(!this.createIfNecessary) {
				return undefined;
			}

			await file6.mkdir();
		}

		file6 = new File(file6, new JavaString(string5));
		if(!await file6.exists()) {
			if(!this.createIfNecessary) {
				return undefined;
			}

			await file6.mkdir();
		}

		file6 = new  File(file6, new JavaString(string3));
		return !await file6.exists() && !this.createIfNecessary ? undefined : file6;
	}

	public async loadChunk(world1: World, i2: number, i3: number):  Promise<Chunk | undefined> {
		let  file4: File | undefined = await this.chunkFileForXZ(i2, i3);
		if(file4 !== undefined && await file4.exists()) {
			try {
				let  fileInputStream5: java.io.FileInputStream = await FileInputStream.Construct(file4);
				let  nBTTagCompound6: NBTTagCompound = await CompressedStreamTools.func_1138_a(fileInputStream5);
				if(!nBTTagCompound6.hasKey("Level")) {
					console.log("Chunk file at " + i2 + "," + i3 + " is missing level data, skipping");
					return undefined;
				}

				if(!nBTTagCompound6.getCompoundTag("Level").hasKey("Blocks")) {
					console.log("Chunk file at " + i2 + "," + i3 + " is missing block data, skipping");
					return undefined;
				}

				let  chunk7: Chunk = await ChunkLoader.loadChunkIntoWorldFromCompound(world1, nBTTagCompound6.getCompoundTag("Level"));
				if(!chunk7.isAtLocation(i2, i3)) {
					console.log("Chunk file at " + i2 + "," + i3 + " is in the wrong location; relocating. (Expected " + i2 + ", " + i3 + ", got " + chunk7.xPosition + ", " + chunk7.zPosition + ")");
					nBTTagCompound6.setInteger("xPos", i2);
					nBTTagCompound6.setInteger("zPos", i3);
					chunk7 = await ChunkLoader.loadChunkIntoWorldFromCompound(world1, nBTTagCompound6.getCompoundTag("Level"));
				}

				return chunk7;
			} catch (exception8) {
				if (exception8 instanceof java.lang.Exception) {
					console.error(exception8);
					console.trace();
				} else {
					throw exception8;
				}
			}
		}

		return undefined;
	}

	public async saveChunk(world1: World, chunk2: Chunk):  Promise<void> {
		await world1.checkSessionLock();
		let file3: File | undefined = await this.chunkFileForXZ(chunk2.xPosition, chunk2.zPosition);
		if(file3 != undefined && await file3.exists()) {
			world1.sizeOnDisk -= await file3.length();
		}

		try {
			// if(file3 && await file3.exists()) {
			// 	await file3.delete();
			// }

			let  file4: File= new File(file3.getParentFile(), new JavaString("tmp_chunk.dat"));
			//let  file4: File= new File(this.saveDir, new JavaString("tmp_chunk.dat"));
			let  fileOutputStream5: java.io.FileOutputStream = await FileOutputStream.Construct(file3);
			let  nBTTagCompound6: NBTTagCompound = new  NBTTagCompound();
			let  nBTTagCompound7: NBTTagCompound = new  NBTTagCompound();
			nBTTagCompound6.setTag("Level", nBTTagCompound7);
			await this.storeChunkInCompound(chunk2, world1, nBTTagCompound7);
			await CompressedStreamTools.writeGzippedCompoundToOutputStream(nBTTagCompound6, fileOutputStream5);
			await fileOutputStream5.close();

			if (file3) {
				await file4.renameTo(file3);
				world1.sizeOnDisk += await file3.length();
			}
		} catch (exception8) {
			if (exception8 instanceof java.lang.Exception) {
				console.error(exception8);
			} else {
				throw exception8;
			}
		}

	}

	public async storeChunkInCompound(chunk1: Chunk, world2: World, nBTTagCompound3: NBTTagCompound): Promise<void> {
		await world2.checkSessionLock();
		nBTTagCompound3.setInteger("xPos", chunk1.xPosition);
		nBTTagCompound3.setInteger("zPos", chunk1.zPosition);
		nBTTagCompound3.setLong("LastUpdate", world2.worldTime);
		nBTTagCompound3.setByteArray("Blocks", chunk1.blocks);
		nBTTagCompound3.setByteArray("Data", chunk1.data.data);
		nBTTagCompound3.setByteArray("SkyLight", chunk1.skylightMap.data);
		nBTTagCompound3.setByteArray("BlockLight", chunk1.blocklightMap.data);
		nBTTagCompound3.setByteArray("HeightMap", chunk1.heightMap);
		nBTTagCompound3.setBoolean("TerrainPopulated", chunk1.isTerrainPopulated);
		chunk1.hasEntities = false;

		let  nBTTagList4: NBTTagList = new  NBTTagList();

		let  nBTTagCompound8: NBTTagCompound;
		for(let  i5: number = 0; i5 < chunk1.entities.length; ++i5) {
			chunk1.entities[i5].forEach(entity7 => {
				chunk1.hasEntities = true;
				nBTTagCompound8 = new  NBTTagCompound();
				if(entity7.addEntityID(nBTTagCompound8)) {
					nBTTagList4.setTag(nBTTagCompound8);
				}
			})
		}

		nBTTagCompound3.setTag("Entities", nBTTagList4);
		let  nBTTagList9: NBTTagList = new  NBTTagList();

		const tileEntities = Array.from(chunk1.chunkTileEntityMap.values());

		tileEntities.forEach(tileEntity10 => {
			nBTTagCompound8 = new  NBTTagCompound();
			tileEntity10.writeToNBT(nBTTagCompound8);
			nBTTagList9.setTag(nBTTagCompound8);
		})

		nBTTagCompound3.setTag("TileEntities", nBTTagList9);
	}

	public static async loadChunkIntoWorldFromCompound(world0: World| undefined, nBTTagCompound1: NBTTagCompound): Promise<Chunk> {
		let  i2: number = nBTTagCompound1.getInteger("xPos");
		let  i3: number = nBTTagCompound1.getInteger("zPos");
		let  chunk4: Chunk = new  Chunk(world0, i2, i3);
		chunk4.blocks = nBTTagCompound1.getByteArray("Blocks");
		chunk4.data = new  NibbleArray(nBTTagCompound1.getByteArray("Data"));
		chunk4.skylightMap = new  NibbleArray(nBTTagCompound1.getByteArray("SkyLight"));
		chunk4.blocklightMap = new  NibbleArray(nBTTagCompound1.getByteArray("BlockLight"));
		chunk4.heightMap = nBTTagCompound1.getByteArray("HeightMap");
		chunk4.isTerrainPopulated = nBTTagCompound1.getBoolean("TerrainPopulated");
		if(!chunk4.data.isValid()) {
			chunk4.data = new  NibbleArray(chunk4.blocks.length);
		}

		if(chunk4.heightMap === undefined || !chunk4.skylightMap.isValid()) {
			chunk4.heightMap = new Int8Array(256);
			chunk4.skylightMap = new  NibbleArray(chunk4.blocks.length);
			await chunk4.func_1024_c();
		}

		if(!chunk4.blocklightMap.isValid()) {
			chunk4.blocklightMap = new  NibbleArray(chunk4.blocks.length);
			chunk4.func_1014_a();
		}

		let  nBTTagList5: NBTTagList = nBTTagCompound1.getTagList("Entities");
		if(nBTTagList5 !== undefined) {
			for(let  i6: number = 0; i6 < nBTTagList5.tagCount(); ++i6) {
				let  nBTTagCompound7: NBTTagCompound = nBTTagList5.tagAt(i6) as NBTTagCompound;
				let  entity8: Entity = EntityList.createEntityFromNBT(nBTTagCompound7, world0);
				chunk4.hasEntities = true;
				if(entity8 !== undefined) {
					chunk4.addEntity(entity8);
				}
			}
		}

		let  nBTTagList10: NBTTagList = nBTTagCompound1.getTagList("TileEntities");
		if(nBTTagList10 !== undefined) {
			for(let  i11: number = 0; i11 < nBTTagList10.tagCount(); ++i11) {
				let  nBTTagCompound12: NBTTagCompound = nBTTagList10.tagAt(i11) as NBTTagCompound;
				let  tileEntity9: TileEntity = TileEntity.createAndLoadEntity(nBTTagCompound12);
				if(tileEntity9 !== undefined) {
					chunk4.func_1001_a(tileEntity9);
				}
			}
		}

		return chunk4;
	}

	public func_814_a():  void {
	}

	public async saveExtraData():  Promise<void> {
	}

	public async saveExtraChunkData(world1: World| undefined, chunk2: Chunk| undefined):  Promise<void> {
	}
}
