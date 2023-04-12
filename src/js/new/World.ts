


import { java, long, int, float, double, byte, S } from "../jree/index";
import { WorldProviderHell } from "./WorldProviderHell";
import { WorldProvider } from "./WorldProvider";
import { WorldChunkManager } from "./WorldChunkManager";
import { Vec3D } from "./Vec3D";
import { TileEntity } from "./TileEntity";
import { SpawnerAnimals } from "./SpawnerAnimals";
import { Pathfinder } from "./Pathfinder";
import { PathEntity } from "./PathEntity";
import { NextTickListEntry } from "./NextTickListEntry";
import { NBTTagCompound } from "./NBTTagCompound";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MinecraftException } from "./MinecraftException";
import { MetadataChunkBlock } from "./MetadataChunkBlock";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { IWorldAccess } from "./IWorldAccess";
import { IProgressUpdate } from "./IProgressUpdate";
import { IChunkProvider } from "./IChunkProvider";
import { Explosion } from "./Explosion";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityPlayer } from "./EntityPlayer";
import { Entity } from "./Entity";
import { CompressedStreamTools } from "./CompressedStreamTools";
import { ChunkProviderLoadOrGenerate } from "./ChunkProviderLoadOrGenerate";
import { ChunkCoordIntPair } from "./ChunkCoordIntPair";
import { ChunkCache } from "./ChunkCache";
import { Chunk } from "./Chunk";
import { BlockFluids } from "./BlockFluids";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { IBlockAccess } from "./IBlockAccess";
import { Random } from "../java/util/Random";
import { DataOutputStream } from "../java/io/DataOutputStream";
import { Block } from "./Block";

import { DataInputStream } from "../java/io/DataInputStream";
import { FileInputStream } from "../jree/java/io/FileInputStream";
import { FileOutputStream } from "../jree/java/io/FileOutputStream";
import { File } from "../jree/java/io/index";
import { JavaString } from "../jree/index";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";

export  class World implements IBlockAccess {
	public scheduledUpdatesAreImmediate:  boolean;
	private field_1051_z:  MetadataChunkBlock[];
	public loadedEntityList:  Entity[];
	private unloadedEntityList:  Entity[];
	private scheduledTickTreeSet:  Set<NextTickListEntry>;
	private scheduledTickSet:  Set<any>;
	public loadedTileEntityList:  TileEntity[];
	public playerEntities:  EntityPlayer[];
	public worldTime:  long;
	private field_1019_F:  long;
	public skylightSubtracted:  int;
	protected field_9437_g:  int;
	protected field_9436_h:  int;
	public field_1043_h:  boolean;
	private lockTimestamp:  long;
	protected autosavePeriod:  int;
	public difficultySetting:  int;
	public rand:  Random;
	public spawnX:  int;
	public spawnY:  int;
	public spawnZ:  int;
	public field_1033_r:  boolean;
	public worldProvider:  WorldProvider;
	protected worldAccesses:  IWorldAccess[];
	private chunkProvider:  IChunkProvider;
	public worldFile:  File;
	public savePath:  File;
	public randomSeed:  long;
	private nbtCompoundPlayer:  NBTTagCompound | null;
	public sizeOnDisk:  long;
	public field_9431_w: string;
	public field_9430_x:  boolean;
	private field_9428_I:  AxisAlignedBB[];
	private field_4204_J:  int;
	private field_21121_K:  boolean;
	private field_21120_L:  boolean;
	protected static field_9429_y:  int = 0;
	private field_9427_K:  Set<any>;
	private field_9426_L:  int;
	private field_1012_M:  Entity[];
	public multiplayerWorld:  boolean;

	public static async func_629_a(minecraftFolder: File, worldName: string):  Promise<NBTTagCompound | null> {
		let  savesFolder: File = new  File(minecraftFolder, new JavaString("saves"));
		let  worldFolder: File = new  File(savesFolder, new JavaString(worldName));
		if(!await worldFolder.exists()) {
			return null;
		} else {
			let  levelDatFile: File = new  File(worldFolder, new JavaString("level.dat"));
			if(await levelDatFile.exists()) {
				try {
					let  nBTTagCompound5: NBTTagCompound = await CompressedStreamTools.func_1138_a(await FileInputStream.Construct(levelDatFile));
					let  nBTTagCompound6: NBTTagCompound = nBTTagCompound5.getCompoundTag("Data");
					return nBTTagCompound6;
				} catch (exception7) {
					if (exception7 instanceof java.lang.Exception) {
						console.error(exception7)
					} else {
						throw exception7;
					}
				}
			}

			return null;
		}
	}

	public static async deleteWorld(file0: File, string1: string): Promise<void> {
		let  file2: File = new File(file0, new JavaString("saves"));
		let  file3: File = new File(file2, new JavaString(string1));
		if(await file3.exists()) {
			await World.deleteFiles(await file3.listFiles());
			await file3.delete();
		}
	}

	private static async deleteFiles(file0: File[]): Promise<void> {
		for(let  i1: int = 0; i1 < file0.length; ++i1) {
			if(await file0[i1].isDirectory()) {
				await World.deleteFiles(file0[i1].listFiles());
			}

			await file0[i1].delete();
		}

	}

	public getWorldChunkManager():  WorldChunkManager {
		return this.worldProvider.worldChunkMgr;
	}

	public static async Construct(file1: File, string2: string): Promise<World> ;
	public static async Construct(world1: World, worldProvider2: WorldProvider): Promise<World> ;
	public static async Construct(string1: string, worldProvider2: WorldProvider, j3: long): Promise<World> ;
	public static async Construct(file1: File, string2: string, j3: long): Promise<World> ;
	public static async Construct(file1: File, string2: string, j3: long, worldProvider5: WorldProvider | null): Promise<World> ;
    public static async Construct(...args: unknown[]): Promise<World> {
		const _this = new World();
		switch (args.length) {
			case 2: {
				if (args[0] instanceof File) {
					const [file1, string2] = args as [File, java.lang.String];
					// Set to 3 args and fall through to case 3.
					args = [file1, string2, (new  Random()).nextLong()]
				} else {
					const [world1, worldProvider2] = args as [World, WorldProvider];
					_this.scheduledUpdatesAreImmediate = false;
					_this.field_1051_z = [];
					_this.loadedEntityList = [];
					_this.unloadedEntityList = [];
					_this.scheduledTickTreeSet = new Set();
					_this.scheduledTickSet = new Set();
					_this.loadedTileEntityList = [];
					_this.playerEntities = [];
					_this.worldTime = 0n;
					_this.field_1019_F = 16777215n;
					_this.skylightSubtracted = 0;
					_this.field_9437_g = (new Random()).nextInt();
					_this.field_9436_h = 1013904223;
					_this.field_1043_h = false;
					_this.lockTimestamp = java.lang.System.currentTimeMillis();
					_this.autosavePeriod = 40;
					_this.rand = new  Random();
					_this.field_1033_r = false;
					_this.worldAccesses = [];
					_this.randomSeed = 0n;
					_this.sizeOnDisk = 0n;
					_this.field_9428_I = [];
					_this.field_4204_J = 0;
					_this.field_21121_K = true;
					_this.field_21120_L = true;
					_this.field_9427_K = new  Set();
					_this.field_9426_L = _this.rand.nextInt(12000);
					_this.field_1012_M = [];
					_this.multiplayerWorld = false;
					_this.lockTimestamp = world1.lockTimestamp;
					_this.worldFile = world1.worldFile;
					_this.savePath = world1.savePath;
					_this.field_9431_w = world1.field_9431_w;
					_this.randomSeed = world1.randomSeed;
					_this.worldTime = world1.worldTime;
					_this.spawnX = world1.spawnX;
					_this.spawnY = world1.spawnY;
					_this.spawnZ = world1.spawnZ;
					_this.sizeOnDisk = world1.sizeOnDisk;
					_this.worldProvider = worldProvider2;
					worldProvider2.registerWorld(_this);
					_this.chunkProvider = await _this.getChunkProvider(_this.savePath);
					_this.calculateInitialSkylight();
					break;
				}
			}

			case 3: {
				if (args[0] instanceof File) {
					const [file1, string2, j3] = args as [File, string, long];
					// set to 4 args and fall though to case 4.
					args = [file1, string2, j3, null]
				} else  {
					const [string1, worldProvider2, j3] = args as [string, WorldProvider, long];
					_this.scheduledUpdatesAreImmediate = false;
					_this.field_1051_z = [];
					_this.loadedEntityList = [];
					_this.unloadedEntityList = [];
					_this.scheduledTickTreeSet = new Set();
					_this.scheduledTickSet = new Set();
					_this.loadedTileEntityList = [];
					_this.playerEntities = [];
					_this.worldTime = 0n;
					_this.field_1019_F = 16777215n;
					_this.skylightSubtracted = 0;
					_this.field_9437_g = (new Random()).nextInt();
					_this.field_9436_h = 1013904223;
					_this.field_1043_h = false;
					_this.lockTimestamp = java.lang.System.currentTimeMillis();
					_this.autosavePeriod = 40;
					_this.rand = new Random();
					_this.field_1033_r = false;
					_this.worldAccesses = [];
					_this.randomSeed = 0n;
					_this.sizeOnDisk = 0n;
					_this.field_9428_I = [];
					_this.field_4204_J = 0;
					_this.field_21121_K = true;
					_this.field_21120_L = true;
					_this.field_9427_K = new Set();
					_this.field_9426_L = _this.rand.nextInt(12000);
					_this.field_1012_M = [];
					_this.multiplayerWorld = false;
					_this.field_9431_w = string1;
					_this.randomSeed = j3;
					_this.worldProvider = worldProvider2;
					worldProvider2.registerWorld(_this);
					_this.chunkProvider = await _this.getChunkProvider(_this.savePath);
					_this.calculateInitialSkylight();
					break;
				}
			}

			case 4: {
				const [file1, string2, j3, worldProvider5] = args as [File, string, long, WorldProvider | null];
				_this.scheduledUpdatesAreImmediate = false;
				_this.field_1051_z = [];
				_this.loadedEntityList = [];
				_this.unloadedEntityList = [];
				_this.scheduledTickTreeSet = new Set();
				_this.scheduledTickSet = new Set();
				_this.loadedTileEntityList = [];
				_this.playerEntities = [];
				_this.worldTime = 0n;
				_this.field_1019_F = 16777215n;
				_this.skylightSubtracted = 0;
				_this.field_9437_g = (new  Random()).nextInt();
				_this.field_9436_h = 1013904223;
				_this.field_1043_h = false;
				_this.lockTimestamp = java.lang.System.currentTimeMillis();
				_this.autosavePeriod = 40;
				_this.rand = new  Random();
				_this.field_1033_r = false;
				_this.worldAccesses = [];
				_this.randomSeed = 0n;
				_this.sizeOnDisk = 0n;
				_this.field_9428_I = [];
				_this.field_4204_J = 0;
				_this.field_21121_K = true;
				_this.field_21120_L = true;
				_this.field_9427_K = new  Set();
				_this.field_9426_L = _this.rand.nextInt(12000);
				_this.field_1012_M = [];
				_this.multiplayerWorld = false;
				_this.worldFile = file1;
				_this.field_9431_w = string2;
				await file1.mkdirs();
				_this.savePath = new  File(file1, new JavaString(string2));
				await _this.savePath.mkdirs();

				try {
					let  file6: File = new File(_this.savePath, new JavaString("session.lock"));
					let  dataOutputStream7: DataOutputStream = new DataOutputStream(await FileOutputStream.Construct(file6));

					try {
						await dataOutputStream7.writeLong(_this.lockTimestamp);
					} finally {
						dataOutputStream7.close();
					}
				} catch (iOException16) {
					if (iOException16 instanceof java.io.IOException) {
						console.error(iOException16)
						throw new  java.lang.RuntimeException("Failed to check session lock, aborting");
					} else {
						throw iOException16;
					}
				}

				let  object17: java.lang.Object = new  WorldProvider();
				let  file18: File = new File(_this.savePath, new JavaString("level.dat"));
				_this.field_1033_r = !await file18.exists();
				if (await file18.exists()) {
					try {
						let  nBTTagCompound8: NBTTagCompound = await CompressedStreamTools.func_1138_a(await FileInputStream.Construct(file18));
						let  nBTTagCompound9: NBTTagCompound = nBTTagCompound8.getCompoundTag("Data");
						_this.randomSeed = nBTTagCompound9.getLong("RandomSeed");
						_this.spawnX = nBTTagCompound9.getInteger("SpawnX");
						_this.spawnY = nBTTagCompound9.getInteger("SpawnY");
						_this.spawnZ = nBTTagCompound9.getInteger("SpawnZ");
						_this.worldTime = nBTTagCompound9.getLong("Time");
						_this.sizeOnDisk = nBTTagCompound9.getLong("SizeOnDisk");
						if(nBTTagCompound9.hasKey("Player")) {
							_this.nbtCompoundPlayer = nBTTagCompound9.getCompoundTag("Player");
							let  i10: int = _this.nbtCompoundPlayer.getInteger("Dimension");
							if(i10 === -1) {
								object17 = new  WorldProviderHell();
							}
						}
					} catch (exception14) {
						if (exception14 instanceof java.lang.Exception) {
							console.error(exception14)
						} else {
							throw exception14;
						}
					}
				}

				if(worldProvider5 !== null) {
					object17 = worldProvider5;
				}

				let  z19: boolean = false;
				if(_this.randomSeed === 0n) {
					_this.randomSeed = j3;
					z19 = true;
				}

				_this.worldProvider = object17 as WorldProvider;
				_this.worldProvider.registerWorld(_this);
				_this.chunkProvider = await _this.getChunkProvider(_this.savePath);
				if(z19) {
					_this.field_9430_x = true;
					_this.spawnX = 0;
					_this.spawnY = 64;

					for(_this.spawnZ = 0; !await _this.worldProvider.canCoordinateBeSpawn(_this.spawnX, _this.spawnZ); _this.spawnZ += _this.rand.nextInt(64) - _this.rand.nextInt(64)) {
						_this.spawnX += _this.rand.nextInt(64) - _this.rand.nextInt(64);
					}

					_this.field_9430_x = false;
				}

				_this.calculateInitialSkylight();
			
				break;
			}
			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
		return _this;
	}


	protected async getChunkProvider(file1: File):  Promise<IChunkProvider> {
		return new  ChunkProviderLoadOrGenerate(this, await this.worldProvider.getChunkLoader(file1), this.worldProvider.getChunkProvider());
	}

	public async setSpawnLocation():  Promise<void> {
		if(this.spawnY <= 0) {
			this.spawnY = 64;
		}

		while(await this.getFirstUncoveredBlock(this.spawnX, this.spawnZ) === 0) {
			this.spawnX += this.rand.nextInt(8) - this.rand.nextInt(8);
			this.spawnZ += this.rand.nextInt(8) - this.rand.nextInt(8);
		}

	}

	public async getFirstUncoveredBlock(i1: int, i2: int):  Promise<int> {
		let  i3: int;
		for(i3 = 63; !await this.isAirBlock(i1, i3 + 1, i2); ++i3) {
		}

		return await this.getBlockId(i1, i3, i2);
	}

	public func_6464_c():  void {
	}

	public async func_608_a(entityPlayer1: EntityPlayer| null):  Promise<void> {
		try {
			if(this.nbtCompoundPlayer !== null) {
				entityPlayer1.readFromNBT(this.nbtCompoundPlayer);
				this.nbtCompoundPlayer = null;
			}

			if(this.chunkProvider instanceof ChunkProviderLoadOrGenerate) {
				let  chunkProviderLoadOrGenerate2: ChunkProviderLoadOrGenerate = this.chunkProvider as ChunkProviderLoadOrGenerate;
				let  i3: int = MathHelper.floor_float((entityPlayer1.posX as int) as float) >> 4;
				let  i4: int = MathHelper.floor_float((entityPlayer1.posZ as int) as float) >> 4;
				chunkProviderLoadOrGenerate2.func_21110_c(i3, i4);
			}

			await this.entityJoinedWorld(entityPlayer1);
		} catch (exception5) {
			if (exception5 instanceof java.lang.Exception) {
				console.error(exception5)
			} else {
				throw exception5;
			}
		}
	}

	public async saveWorld(z1: boolean, iProgressUpdate2: IProgressUpdate | null):  Promise<void> {
		if(this.chunkProvider.func_536_b()) {
			if(iProgressUpdate2) {
				iProgressUpdate2.func_594_b("Saving level");
			}

			await this.saveLevel();
			if(iProgressUpdate2) {
				iProgressUpdate2.displayLoadingString("Saving chunks");
			}

			await this.chunkProvider.saveChunks(z1, iProgressUpdate2);
		}
	}

	private async saveLevel():  Promise<void> {
		await this.checkSessionLock();
		let  nBTTagCompound1: NBTTagCompound = new  NBTTagCompound();
		nBTTagCompound1.setLong("RandomSeed", this.randomSeed);
		nBTTagCompound1.setInteger("SpawnX", this.spawnX);
		nBTTagCompound1.setInteger("SpawnY", this.spawnY);
		nBTTagCompound1.setInteger("SpawnZ", this.spawnZ);
		nBTTagCompound1.setLong("Time", this.worldTime);
		nBTTagCompound1.setLong("SizeOnDisk", this.sizeOnDisk);
		nBTTagCompound1.setLong("LastPlayed", java.lang.System.currentTimeMillis());
		let  entityPlayer2: EntityPlayer = null;
		if(this.playerEntities.length > 0) {
			entityPlayer2 = this.playerEntities[0];
		}

		let  nBTTagCompound3: NBTTagCompound;
		if(entityPlayer2 !== null) {
			nBTTagCompound3 = new  NBTTagCompound();
			entityPlayer2.writeToNBT(nBTTagCompound3);
			nBTTagCompound1.setCompoundTag("Player", nBTTagCompound3);
		}

		nBTTagCompound3 = new  NBTTagCompound();
		nBTTagCompound3.setTag("Data", nBTTagCompound1);

		try {
			let  file4: File = new File(this.savePath, new JavaString("level.dat_new"));
			let  file5: File = new File(this.savePath, new JavaString("level.dat_old"));
			let  file6: File = new File(this.savePath, new JavaString("level.dat"));
			await CompressedStreamTools.writeGzippedCompoundToOutputStream(nBTTagCompound3, await FileOutputStream.Construct(file4));
			if(await file5.exists()) {
				await file5.delete();
			}

			await file6.renameTo(file5);
			if(await file6.exists()) {
				await file6.delete();
			}

			await file4.renameTo(file6);
			if(await file4.exists()) {
				await file4.delete();
			}
		} catch (exception7) {
			if (exception7 instanceof java.lang.Exception) {
				console.error(exception7);
			} else {
				throw exception7;
			}
		}

	}

	public async func_650_a(i1: int): Promise<boolean> {
		if(!this.chunkProvider.func_536_b()) {
			return true;
		} else {
			if(i1 === 0) {
				await this.saveLevel();
			}

			return await this.chunkProvider.saveChunks(false, null);
		}
	}

	public async getBlockId(i1: int, i2: int, i3: int):  Promise<int> {
		return i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000 ? (i2 < 0 ? 0 : (i2 >= 128 ? 0 : (await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4)).getBlockID(i1 & 15, i2, i3 & 15))) : 0;
	}

	public async isAirBlock(i1: int, i2: int, i3: int):  Promise<boolean> {
		return await this.getBlockId(i1, i2, i3) === 0;
	}

	public blockExists(i1: int, i2: int, i3: int):  boolean {
		return i2 >= 0 && i2 < 128 ? this.chunkExists(i1 >> 4, i3 >> 4) : false;
	}

	public doChunksNearChunkExist(i1: int, i2: int, i3: int, i4: int):  boolean {
		return this.checkChunksExist(i1 - i4, i2 - i4, i3 - i4, i1 + i4, i2 + i4, i3 + i4);
	}

	public checkChunksExist(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int):  boolean {
		if(i5 >= 0 && i2 < 128) {
			i1 >>= 4;
			i2 >>= 4;
			i3 >>= 4;
			i4 >>= 4;
			i5 >>= 4;
			i6 >>= 4;

			for(let  i7: int = i1; i7 <= i4; ++i7) {
				for(let  i8: int = i3; i8 <= i6; ++i8) {
					if(!this.chunkExists(i7, i8)) {
						return false;
					}
				}
			}

			return true;
		} else {
			return false;
		}
	}

	private chunkExists(i1: int, i2: int):  boolean {
		return this.chunkProvider.chunkExists(i1, i2);
	}

	public getChunkFromBlockCoords(i1: int, i2: int):  Promise<Chunk> {
		return this.getChunkFromChunkCoords(i1 >> 4, i2 >> 4);
	}

	public getChunkFromChunkCoords(i1: int, i2: int):  Promise<Chunk> {
		return this.chunkProvider.provideChunk(i1, i2);
	}

	public async setBlockAndMetadata(i1: int, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return false;
			} else {
				let  chunk6: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				return chunk6.setBlockIDWithMetadata(i1 & 15, i2, i3 & 15, i4, i5);
			}
		} else {
			return false;
		}
	}

	public async setBlock(i1: int, i2: int, i3: int, i4: int):  Promise<boolean> {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return false;
			} else {
				let  chunk5: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				return chunk5.setBlockID(i1 & 15, i2, i3 & 15, i4);
			}
		} else {
			return false;
		}
	}

	public async getBlockMaterial(i1: int, i2: int, i3: int):  Promise<Material> {
		let  i4: int = await this.getBlockId(i1, i2, i3);
		return i4 === 0 ? MaterialRegistry.air : Block.blocksList[i4].blockMaterial;
	}

	public async getBlockMetadata(i1: int, i2: int, i3: int):  Promise<int> {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return 0;
			} else if(i2 >= 128) {
				return 0;
			} else {
				let  chunk4: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				return chunk4.getBlockMetadata(i1, i2, i3);
			}
		} else {
			return 0;
		}
	}

	public async setBlockMetadataWithNotify(i1: int, i2: int, i3: int, i4: int):  Promise<void> {
		if(await this.setBlockMetadata(i1, i2, i3, i4)) {
			await this.notifyBlockChange(i1, i2, i3, await this.getBlockId(i1, i2, i3));
		}

	}

	public async setBlockMetadata(i1: int, i2: int, i3: int, i4: int):  Promise<boolean> {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return false;
			} else {
				let  chunk5: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				chunk5.setBlockMetadata(i1, i2, i3, i4);
				return true;
			}
		} else {
			return false;
		}
	}

	public async setBlockWithNotify(i1: int, i2: int, i3: int, i4: int):  Promise<boolean> {
		if(await this.setBlock(i1, i2, i3, i4)) {
			await this.notifyBlockChange(i1, i2, i3, i4);
			return true;
		} else {
			return false;
		}
	}

	public async setBlockAndMetadataWithNotify(i1: int, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		if(this.setBlockAndMetadata(i1, i2, i3, i4, i5)) {
			await this.notifyBlockChange(i1, i2, i3, i4);
			return true;
		} else {
			return false;
		}
	}

	public markBlockNeedsUpdate(i1: int, i2: int, i3: int):  void {
		for(let  i4: int = 0; i4 < this.worldAccesses.length; ++i4) {
			(this.worldAccesses[i4] as IWorldAccess).func_934_a(i1, i2, i3);
		}

	}

	protected async notifyBlockChange(i1: int, i2: int, i3: int, i4: int): Promise<void> {
		this.markBlockNeedsUpdate(i1, i2, i3);
		await this.notifyBlocksOfNeighborChange(i1, i2, i3, i4);
	}

	public markBlocksDirtyVertical(i1: int, i2: int, i3: int, i4: int):  void {
		if(i3 > i4) {
			let  i5: int = i4;
			i4 = i3;
			i3 = i5;
		}

		this.markBlocksDirty(i1, i3, i2, i1, i4, i2);
	}

	public markBlockAsNeedsUpdate(i1: int, i2: int, i3: int):  void {
		for(let  i4: int = 0; i4 < this.worldAccesses.length; ++i4) {
			(this.worldAccesses[i4] as IWorldAccess).markBlockRangeNeedsUpdate(i1, i2, i3, i1, i2, i3);
		}

	}

	public markBlocksDirty(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int):  void {
		for(let  i7: int = 0; i7 < this.worldAccesses.length; ++i7) {
			(this.worldAccesses[i7] as IWorldAccess).markBlockRangeNeedsUpdate(i1, i2, i3, i4, i5, i6);
		}

	}

	public async notifyBlocksOfNeighborChange(i1: int, i2: int, i3: int, i4: int):  Promise<void> {
		await this.notifyBlockOfNeighborChange(i1 - 1, i2, i3, i4);
		await this.notifyBlockOfNeighborChange(i1 + 1, i2, i3, i4);
		await this.notifyBlockOfNeighborChange(i1, i2 - 1, i3, i4);
		await this.notifyBlockOfNeighborChange(i1, i2 + 1, i3, i4);
		await this.notifyBlockOfNeighborChange(i1, i2, i3 - 1, i4);
		await this.notifyBlockOfNeighborChange(i1, i2, i3 + 1, i4);
	}

	private async notifyBlockOfNeighborChange(i1: int, i2: int, i3: int, i4: int):  Promise<void> {
		if(!this.field_1043_h && !this.multiplayerWorld) {
			let  block5: Block = Block.blocksList[await this.getBlockId(i1, i2, i3)];
			if(block5 !== null) {
				await block5.onNeighborBlockChange(this, i1, i2, i3, i4);
			}

		}
	}

	public async canBlockSeeTheSky(i1: int, i2: int, i3: int):  Promise<boolean> {
		return (await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4)).canBlockSeeTheSky(i1 & 15, i2, i3 & 15);
	}

	public async getBlockLightValue(i1: int, i2: int, i3: int):  Promise<int> {
		return this.getBlockLightValue_do(i1, i2, i3, true);
	}

	public async getBlockLightValue_do(i1: int, i2: int, i3: int, z4: boolean):  Promise<int> {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			let  i5: int;
			if(z4) {
				i5 = await this.getBlockId(i1, i2, i3);
				if(i5 === Block.stairSingle.blockID || i5 === Block.tilledField.blockID) {
					let  i6: int = await this.getBlockLightValue_do(i1, i2 + 1, i3, false);
					let  i7: int = await this.getBlockLightValue_do(i1 + 1, i2, i3, false);
					let  i8: int = await this.getBlockLightValue_do(i1 - 1, i2, i3, false);
					let  i9: int = await this.getBlockLightValue_do(i1, i2, i3 + 1, false);
					let  i10: int = await this.getBlockLightValue_do(i1, i2, i3 - 1, false);
					if(i7 > i6) {
						i6 = i7;
					}

					if(i8 > i6) {
						i6 = i8;
					}

					if(i9 > i6) {
						i6 = i9;
					}

					if(i10 > i6) {
						i6 = i10;
					}

					return i6;
				}
			}

			if(i2 < 0) {
				return 0;
			} else if(i2 >= 128) {
				i5 = 15 - this.skylightSubtracted;
				if(i5 < 0) {
					i5 = 0;
				}

				return i5;
			} else {
				let  chunk11: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				return chunk11.getBlockLightValue(i1, i2, i3, this.skylightSubtracted);
			}
		} else {
			return 15;
		}
	}

	public async canExistingBlockSeeTheSky(i1: int, i2: int, i3: int):  Promise<boolean> {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return true;
			} else if(!this.chunkExists(i1 >> 4, i3 >> 4)) {
				return false;
			} else {
				let  chunk4: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				return chunk4.canBlockSeeTheSky(i1, i2, i3);
			}
		} else {
			return false;
		}
	}

	public async getHeightValue(i1: int, i2: int):  Promise<int> {
		if(i1 >= -32000000 && i2 >= -32000000 && i1 < 32000000 && i2 <= 32000000) {
			if(!this.chunkExists(i1 >> 4, i2 >> 4)) {
				return 0;
			} else {
				let  chunk3: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i2 >> 4);
				return chunk3.getHeightValue(i1 & 15, i2 & 15);
			}
		} else {
			return 0;
		}
	}

	public async neighborLightPropagationChanged(enumSkyBlock1: EnumSkyBlock, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(!this.worldProvider.field_6478_e || enumSkyBlock1 !== EnumSkyBlock.Sky) {
			if(this.blockExists(i2, i3, i4)) {
				if(enumSkyBlock1 === EnumSkyBlock.Sky) {
					if(await this.canExistingBlockSeeTheSky(i2, i3, i4)) {
						i5 = 15;
					}
				} else if(enumSkyBlock1 === EnumSkyBlock.Block) {
					let  i6: int = await this.getBlockId(i2, i3, i4);
					if(Block.lightValue[i6] > i5) {
						i5 = Block.lightValue[i6];
					}
				}

				if(await this.getSavedLightValue(enumSkyBlock1, i2, i3, i4) !== i5) {
					await this.func_616_a(enumSkyBlock1, i2, i3, i4, i2, i3, i4);
				}

			}
		}
	}

	public async getSavedLightValue(enumSkyBlock1: EnumSkyBlock, i2: int, i3: int, i4: int):  Promise<int> {
		if(i3 >= 0 && i3 < 128 && i2 >= -32000000 && i4 >= -32000000 && i2 < 32000000 && i4 <= 32000000) {
			let  i5: int = i2 >> 4;
			let  i6: int = i4 >> 4;
			if(!this.chunkExists(i5, i6)) {
				return 0;
			} else {
				let  chunk7: Chunk = await this.getChunkFromChunkCoords(i5, i6);
				return await chunk7.getSavedLightValue(enumSkyBlock1, i2 & 15, i3, i4 & 15);
			}
		} else {
			return enumSkyBlock1.field_1722_c;
		}
	}

	public async setLightValue(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(i2 >= -32000000 && i4 >= -32000000 && i2 < 32000000 && i4 <= 32000000) {
			if(i3 >= 0) {
				if(i3 < 128) {
					if(this.chunkExists(i2 >> 4, i4 >> 4)) {
						let  chunk6: Chunk = await this.getChunkFromChunkCoords(i2 >> 4, i4 >> 4);
						chunk6.setLightValue(enumSkyBlock1, i2 & 15, i3, i4 & 15, i5);

						for(let  i7: int = 0; i7 < this.worldAccesses.length; ++i7) {
							(this.worldAccesses[i7] as IWorldAccess).func_934_a(i2, i3, i4);
						}

					}
				}
			}
		}
	}

	public async getLightBrightness(i1: int, i2: int, i3: int):  Promise<float> {
		return this.worldProvider.lightBrightnessTable[await this.getBlockLightValue(i1, i2, i3)];
	}

	public isDaytime():  boolean {
		return this.skylightSubtracted < 4;
	}

	public async rayTraceBlocks(vec3D1: Vec3D, vec3D2: Vec3D):  Promise<MovingObjectPosition | null> {
		return await this.rayTraceBlocks_do(vec3D1, vec3D2, false);
	}

	public async rayTraceBlocks_do(vec3D1: Vec3D, vec3D2: Vec3D, z3: boolean):  Promise<MovingObjectPosition | null> {
		if(!isNaN(vec3D1.xCoord) && !isNaN(vec3D1.yCoord) && !isNaN(vec3D1.zCoord)) {
			if(!isNaN(vec3D2.xCoord) && !isNaN(vec3D2.yCoord) && !isNaN(vec3D2.zCoord)) {
				let  i4: int = MathHelper.floor_double(vec3D2.xCoord);
				let  i5: int = MathHelper.floor_double(vec3D2.yCoord);
				let  i6: int = MathHelper.floor_double(vec3D2.zCoord);
				let  i7: int = MathHelper.floor_double(vec3D1.xCoord);
				let  i8: int = MathHelper.floor_double(vec3D1.yCoord);
				let  i9: int = MathHelper.floor_double(vec3D1.zCoord);
				let  i10: int = 200;

				while(i10-- >= 0) {
					if(isNaN(vec3D1.xCoord) || isNaN(vec3D1.yCoord) || isNaN(vec3D1.zCoord)) {
						return null;
					}

					if(i7 === i4 && i8 === i5 && i9 === i6) {
						return null;
					}

					let  d11: double = 999.0;
					let  d13: double = 999.0;
					let  d15: double = 999.0;
					if(i4 > i7) {
						d11 = i7 as double + 1.0;
					}

					if(i4 < i7) {
						d11 = i7 as double + 0.0;
					}

					if(i5 > i8) {
						d13 = i8 as double + 1.0;
					}

					if(i5 < i8) {
						d13 = i8 as double + 0.0;
					}

					if(i6 > i9) {
						d15 = i9 as double + 1.0;
					}

					if(i6 < i9) {
						d15 = i9 as double + 0.0;
					}

					let  d17: double = 999.0;
					let  d19: double = 999.0;
					let  d21: double = 999.0;
					let  d23: double = vec3D2.xCoord - vec3D1.xCoord;
					let  d25: double = vec3D2.yCoord - vec3D1.yCoord;
					let  d27: double = vec3D2.zCoord - vec3D1.zCoord;
					if(d11 !== 999.0) {
						d17 = (d11 - vec3D1.xCoord) / d23;
					}

					if(d13 !== 999.0) {
						d19 = (d13 - vec3D1.yCoord) / d25;
					}

					if(d15 !== 999.0) {
						d21 = (d15 - vec3D1.zCoord) / d27;
					}

					let  z29: boolean = false;
					let  b35: byte;
					if(d17 < d19 && d17 < d21) {
						if(i4 > i7) {
							b35 = 4;
						} else {
							b35 = 5;
						}

						vec3D1.xCoord = d11;
						vec3D1.yCoord += d25 * d17;
						vec3D1.zCoord += d27 * d17;
					} else if(d19 < d21) {
						if(i5 > i8) {
							b35 = 0;
						} else {
							b35 = 1;
						}

						vec3D1.xCoord += d23 * d19;
						vec3D1.yCoord = d13;
						vec3D1.zCoord += d27 * d19;
					} else {
						if(i6 > i9) {
							b35 = 2;
						} else {
							b35 = 3;
						}

						vec3D1.xCoord += d23 * d21;
						vec3D1.yCoord += d25 * d21;
						vec3D1.zCoord = d15;
					}

					let  vec3D30: Vec3D = Vec3D.createVector(vec3D1.xCoord, vec3D1.yCoord, vec3D1.zCoord);
					i7 = (vec3D30.xCoord = MathHelper.floor_double(vec3D1.xCoord) as double) as int;
					if(b35 === 5) {
						--i7;
						++vec3D30.xCoord;
					}

					i8 = (vec3D30.yCoord = MathHelper.floor_double(vec3D1.yCoord) as double) as int;
					if(b35 === 1) {
						--i8;
						++vec3D30.yCoord;
					}

					i9 = (vec3D30.zCoord = MathHelper.floor_double(vec3D1.zCoord) as double) as int;
					if(b35 === 3) {
						--i9;
						++vec3D30.zCoord;
					}

					let  i31: int = await this.getBlockId(i7, i8, i9);
					let  i32: int = await this.getBlockMetadata(i7, i8, i9);
					let  block33: Block = Block.blocksList[i31];
					if(i31 > 0 && block33.canCollideCheck(i32, z3)) {
						let  movingObjectPosition34: MovingObjectPosition | null = await block33.collisionRayTrace(this, i7, i8, i9, vec3D1, vec3D2);
						if(movingObjectPosition34 !== null) {
							return movingObjectPosition34;
						}
					}
				}

				return null;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	public playSoundAtEntity(entity1: Entity| null, string2: string, f3: float, f4: float):  void {
		for(let  i5: int = 0; i5 < this.worldAccesses.length; ++i5) {
			this.worldAccesses[i5].playSound(string2, entity1.posX, entity1.posY - entity1.yOffset as double, entity1.posZ, f3, f4);
		}

	}

	public playSoundEffect(d1: double, d3: double, d5: double, string7: string, f8: float, f9: float):  void {
		for(let  i10: int = 0; i10 < this.worldAccesses.length; ++i10) {
			this.worldAccesses[i10].playSound(string7, d1, d3, d5, f8, f9);
		}

	}

	public playRecord(string1: string, i2: int, i3: int, i4: int):  void {
		for(let  i5: int = 0; i5 < this.worldAccesses.length; ++i5) {
			this.worldAccesses[i5].playRecord(string1, i2, i3, i4);
		}

	}

	public spawnParticle(string1: string, d2: double, d4: double, d6: double, d8: double, d10: double, d12: double):  void {
		for(let  i14: int = 0; i14 < this.worldAccesses.length; ++i14) {
			(this.worldAccesses[i14] as IWorldAccess).spawnParticle(string1, d2, d4, d6, d8, d10, d12);
		}
	}

	public async entityJoinedWorld(entity1: Entity| null): Promise<boolean> {
		let  i2: int = MathHelper.floor_double(entity1.posX / 16.0);
		let  i3: int = MathHelper.floor_double(entity1.posZ / 16.0);
		let  z4: boolean = false;
		if(entity1 instanceof EntityPlayer) {
			z4 = true;
		}

		if(!z4 && !this.chunkExists(i2, i3)) {
			return false;
		} else {
			if(entity1 instanceof EntityPlayer) {
				let  entityPlayer5: EntityPlayer = entity1 as EntityPlayer;
				this.playerEntities.push(entityPlayer5);
				console.log("Player count: " + this.playerEntities.length);
			}

			(await this.getChunkFromChunkCoords(i2, i3)).addEntity(entity1);
			this.loadedEntityList.push(entity1);
			this.obtainEntitySkin(entity1);
			return true;
		}
	}

	protected obtainEntitySkin(entity1: Entity| null):  void {
		for(let  i2: int = 0; i2 < this.worldAccesses.length; ++i2) {
			this.worldAccesses[i2].obtainEntitySkin(entity1);
		}

	}

	protected releaseEntitySkin(entity1: Entity| null):  void {
		for(let  i2: int = 0; i2 < this.worldAccesses.length; ++i2) {
			this.worldAccesses[i2].releaseEntitySkin(entity1);
		}

	}

	public async setEntityDead(entity1: Entity| null):  Promise<void> {
		if(entity1.riddenByEntity !== null) {
			entity1.riddenByEntity.mountEntity(null as Entity);
		}

		if(entity1.ridingEntity !== null) {
			entity1.mountEntity(null as Entity);
		}

		await entity1.setEntityDead();
		if(entity1 instanceof EntityPlayer) {
			this.playerEntities = this.playerEntities.filter(entity => entity != entity1);
		}

	}

	public addWorldAccess(iWorldAccess1: IWorldAccess):  void {
		this.worldAccesses.push(iWorldAccess1);
	}

	public removeWorldAccess(iWorldAccess1: IWorldAccess):  void {
		this.worldAccesses = this.worldAccesses.filter(access => access != iWorldAccess1);
	}

	public async getCollidingBoundingBoxes(entity1: Entity | null, axisAlignedBB2: AxisAlignedBB| null):  Promise<AxisAlignedBB[]> {
		this.field_9428_I = [];
		let  i3: int = MathHelper.floor_double(axisAlignedBB2.minX);
		let  i4: int = MathHelper.floor_double(axisAlignedBB2.maxX + 1.0);
		let  i5: int = MathHelper.floor_double(axisAlignedBB2.minY);
		let  i6: int = MathHelper.floor_double(axisAlignedBB2.maxY + 1.0);
		let  i7: int = MathHelper.floor_double(axisAlignedBB2.minZ);
		let  i8: int = MathHelper.floor_double(axisAlignedBB2.maxZ + 1.0);

		for(let  i9: int = i3; i9 < i4; ++i9) {
			for(let  i10: int = i7; i10 < i8; ++i10) {
				if(this.blockExists(i9, 64, i10)) {
					for(let  i11: int = i5 - 1; i11 < i6; ++i11) {
						let  block12: Block = Block.blocksList[await this.getBlockId(i9, i11, i10)];
						if(block12 !== null) {
							await block12.getCollidingBoundingBoxes(this, i9, i11, i10, axisAlignedBB2, this.field_9428_I);
						}
					}
				}
			}
		}

		let  d14: double = 0.25;
		let  list15 = await this.getEntitiesWithinAABBExcludingEntity(entity1, axisAlignedBB2.expand(d14, d14, d14));

		for(let  i16: int = 0; i16 < list15.length; ++i16) {
			let  axisAlignedBB13: AxisAlignedBB = (list15[i16] as Entity).getBoundingBox();
			if(axisAlignedBB13 !== null && axisAlignedBB13.intersectsWith(axisAlignedBB2)) {
				this.field_9428_I.push(axisAlignedBB13);
			}

			axisAlignedBB13 = entity1.func_383_b_(list15[i16] as Entity);
			if(axisAlignedBB13 !== null && axisAlignedBB13.intersectsWith(axisAlignedBB2)) {
				this.field_9428_I.push(axisAlignedBB13);
			}
		}

		return this.field_9428_I;
	}

	public calculateSkylightSubtracted(f1: float):  int {
		let  f2: float = this.getCelestialAngle(f1);
		let  f3: float = 1.0 - (MathHelper.cos(f2 * java.lang.Math.PI as float * 2.0) * 2.0 + 0.5);
		if(f3 < 0.0) {
			f3 = 0.0;
		}

		if(f3 > 1.0) {
			f3 = 1.0;
		}

		return (f3 * 11.0) as int;
	}

	public func_4079_a(entity1: Entity| null, f2: float):  Vec3D | null {
		let  f3: float = this.getCelestialAngle(f2);
		let  f4: float = MathHelper.cos(f3 * java.lang.Math.PI as float * 2.0) * 2.0 + 0.5;
		if(f4 < 0.0) {
			f4 = 0.0;
		}

		if(f4 > 1.0) {
			f4 = 1.0;
		}

		let  i5: int = MathHelper.floor_double(entity1.posX);
		let  i6: int = MathHelper.floor_double(entity1.posZ);
		let  f7: float = this.getWorldChunkManager().func_4072_b(i5, i6) as float;
		let  i8: int = this.getWorldChunkManager().func_4073_a(i5, i6).getSkyColorByTemp(f7);
		let  f9: float = (i8 >> 16 & 255) as float / 255.0;
		let  f10: float = (i8 >> 8 & 255) as float / 255.0;
		let  f11: float = (i8 & 255) as float / 255.0;
		f9 *= f4;
		f10 *= f4;
		f11 *= f4;
		return Vec3D.createVector(f9 as double, f10 as double, f11 as double);
	}

	public getCelestialAngle(f1: float):  float {
		return this.worldProvider.calculateCelestialAngle(this.worldTime, f1);
	}

	public func_628_d(f1: float):  Vec3D | null {
		let  f2: float = this.getCelestialAngle(f1);
		let  f3: float = MathHelper.cos(f2 * java.lang.Math.PI as float * 2.0) * 2.0 + 0.5;
		if(f3 < 0.0) {
			f3 = 0.0;
		}

		if(f3 > 1.0) {
			f3 = 1.0;
		}

		let  f4: float = Number(this.field_1019_F >> 16n & 255n) / 255.0;
		let  f5: float = Number(this.field_1019_F >> 8n & 255n) / 255.0;
		let  f6: float = Number(this.field_1019_F & 255n) / 255.0;
		f4 *= f3 * 0.9 + 0.1;
		f5 *= f3 * 0.9 + 0.1;
		f6 *= f3 * 0.85 + 0.15;
		return Vec3D.createVector(f4 as double, f5 as double, f6 as double);
	}

	public func_4082_d(f1: float):  Vec3D | null {
		let  f2: float = this.getCelestialAngle(f1);
		return this.worldProvider.func_4096_a(f2, f1);
	}

	public async findTopSolidBlock(i1: int, i2: int):  Promise<int> {
		let  chunk3: Chunk = await this.getChunkFromBlockCoords(i1, i2);

		let  i4: int;
		for(i4 = 127; (await this.getBlockMaterial(i1, i4, i2)).getIsSolid() && i4 > 0; --i4) {
		}

		i1 &= 15;

		for(i2 &= 15; i4 > 0; --i4) {
			let  i5: int = chunk3.getBlockID(i1, i4, i2);
			if(i5 !== 0 && (Block.blocksList[i5].blockMaterial.getIsSolid() || Block.blocksList[i5].blockMaterial.getIsLiquid())) {
				return i4 + 1;
			}
		}

		return -1;
	}

	public async func_696_e(i1: int, i2: int):  Promise<int> {
		return (await this.getChunkFromBlockCoords(i1, i2)).getHeightValue(i1 & 15, i2 & 15);
	}

	public func_679_f(f1: float):  float {
		let  f2: float = this.getCelestialAngle(f1);
		let  f3: float = 1.0 - (MathHelper.cos(f2 * java.lang.Math.PI as float * 2.0) * 2.0 + 0.75);
		if(f3 < 0.0) {
			f3 = 0.0;
		}

		if(f3 > 1.0) {
			f3 = 1.0;
		}

		return f3 * f3 * 0.5;
	}

	public async scheduleBlockUpdate(i1: int, i2: int, i3: int, i4: int):  Promise<void> {
		let  nextTickListEntry5: NextTickListEntry = new  NextTickListEntry(i1, i2, i3, i4);
		let  b6: byte = 8;
		if(this.scheduledUpdatesAreImmediate) {
			if(this.checkChunksExist(nextTickListEntry5.xCoord - b6, nextTickListEntry5.yCoord - b6, nextTickListEntry5.zCoord - b6, nextTickListEntry5.xCoord + b6, nextTickListEntry5.yCoord + b6, nextTickListEntry5.zCoord + b6)) {
				let  i7: int = await this.getBlockId(nextTickListEntry5.xCoord, nextTickListEntry5.yCoord, nextTickListEntry5.zCoord);
				if(i7 === nextTickListEntry5.blockID && i7 > 0) {
					await Block.blocksList[i7].updateTick(this, nextTickListEntry5.xCoord, nextTickListEntry5.yCoord, nextTickListEntry5.zCoord, this.rand);
				}
			}

		} else {
			if(this.checkChunksExist(i1 - b6, i2 - b6, i3 - b6, i1 + b6, i2 + b6, i3 + b6)) {
				if(i4 > 0) {
					nextTickListEntry5.setScheduledTime(BigInt(Block.blocksList[i4].tickRate()) + this.worldTime);
				}

				if(!this.scheduledTickSet.has(nextTickListEntry5)) {
					this.scheduledTickSet.add(nextTickListEntry5);
					this.scheduledTickTreeSet.add(nextTickListEntry5);
				}
			}

		}
	}

	public async func_633_c():  Promise<void> {
		this.loadedEntityList = this.loadedEntityList.filter(loadedEntity => !this.unloadedEntityList.includes(loadedEntity))

		let  i1: int;
		let  entity2: Entity;
		let  i3: int;
		let  i4: int;
		for(i1 = 0; i1 < this.unloadedEntityList.length; ++i1) {
			entity2 = this.unloadedEntityList[i1];
			i3 = entity2.chunkCoordX;
			i4 = entity2.chunkCoordZ;
			if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
				(await this.getChunkFromChunkCoords(i3, i4)).func_1015_b(entity2);
			}
		}

		for(i1 = 0; i1 < this.unloadedEntityList.length; ++i1) {
			this.releaseEntitySkin(this.unloadedEntityList[i1]);
		}

		this.unloadedEntityList = [];

		for(i1 = 0; i1 < this.loadedEntityList.length; ++i1) {
			entity2 = this.loadedEntityList[i1];
			if(entity2.ridingEntity !== null) {
				if(!entity2.ridingEntity.isDead && entity2.ridingEntity.riddenByEntity === entity2) {
					continue;
				}

				entity2.ridingEntity.riddenByEntity = null;
				entity2.ridingEntity = null;
			}

			if(!entity2.isDead) {
				await this.updateEntity(entity2);
			}

			if(entity2.isDead) {
				i3 = entity2.chunkCoordX;
				i4 = entity2.chunkCoordZ;
				if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
					(await this.getChunkFromChunkCoords(i3, i4)).func_1015_b(entity2);
				}

				this.loadedEntityList.splice(i1--, 1);
				this.releaseEntitySkin(entity2);
			}
		}

		for(i1 = 0; i1 < this.loadedTileEntityList.length; ++i1) {
			let  tileEntity5: TileEntity = this.loadedTileEntityList[i1] as TileEntity;
			tileEntity5.updateEntity();
		}

	}

	public async updateEntity(entity1: Entity| null):  Promise<void> {
		await this.updateEntityWithOptionalForce(entity1, true);
	}

	public async updateEntityWithOptionalForce(entity1: Entity| null, z2: boolean):  Promise<void> {
		let  i3: int = MathHelper.floor_double(entity1.posX);
		let  i4: int = MathHelper.floor_double(entity1.posZ);
		let  b5: byte = 32;
		if(!z2 || this.checkChunksExist(i3 - b5, 0, i4 - b5, i3 + b5, 128, i4 + b5)) {
			entity1.lastTickPosX = entity1.posX;
			entity1.lastTickPosY = entity1.posY;
			entity1.lastTickPosZ = entity1.posZ;
			entity1.prevRotationYaw = entity1.rotationYaw;
			entity1.prevRotationPitch = entity1.rotationPitch;
			if(z2 && entity1.addedToChunk) {
				if(entity1.ridingEntity !== null) {
					await entity1.updateRidden();
				} else {
					await entity1.onUpdate();
				}
			}

			if(isNaN(entity1.posX) || entity1.posX == 0x7ff0000000000000 || entity1.posX == 0xfff0000000000000) {
				entity1.posX = entity1.lastTickPosX;
			}

			if(isNaN(entity1.posY) || entity1.posY == 0x7ff0000000000000 || entity1.posY == 0xfff0000000000000) {
				entity1.posY = entity1.lastTickPosY;
			}

			if(isNaN(entity1.posZ) || entity1.posZ == 0x7ff0000000000000 || entity1.posZ == 0xfff0000000000000) {
				entity1.posZ = entity1.lastTickPosZ;
			}

			if(isNaN(entity1.rotationPitch) || entity1.rotationPitch == 0x7ff0000000000000 || entity1.rotationPitch == 0xfff0000000000000) {
				entity1.rotationPitch = entity1.prevRotationPitch;
			}

			if(isNaN(entity1.rotationYaw) || entity1.rotationYaw == 0x7ff0000000000000 || entity1.rotationYaw == 0xfff0000000000000) {
				entity1.rotationYaw = entity1.prevRotationYaw;
			}

			let  i6: int = MathHelper.floor_double(entity1.posX / 16.0);
			let  i7: int = MathHelper.floor_double(entity1.posY / 16.0);
			let  i8: int = MathHelper.floor_double(entity1.posZ / 16.0);
			if(!entity1.addedToChunk || entity1.chunkCoordX !== i6 || entity1.chunkCoordY !== i7 || entity1.chunkCoordZ !== i8) {
				if(entity1.addedToChunk && this.chunkExists(entity1.chunkCoordX, entity1.chunkCoordZ)) {
					(await this.getChunkFromChunkCoords(entity1.chunkCoordX, entity1.chunkCoordZ)).func_1016_a(entity1, entity1.chunkCoordY);
				}

				if(this.chunkExists(i6, i8)) {
					entity1.addedToChunk = true;
					(await this.getChunkFromChunkCoords(i6, i8)).addEntity(entity1);
				} else {
					entity1.addedToChunk = false;
				}
			}

			if(z2 && entity1.addedToChunk && entity1.riddenByEntity !== null) {
				if(!entity1.riddenByEntity.isDead && entity1.riddenByEntity.ridingEntity === entity1) {
					await this.updateEntity(entity1.riddenByEntity);
				} else {
					entity1.riddenByEntity.ridingEntity = null;
					entity1.riddenByEntity = null;
				}
			}

		}
	}

	public async checkIfAABBIsClear(axisAlignedBB1: AxisAlignedBB| null):  Promise<boolean> {
		let  list2 = await this.getEntitiesWithinAABBExcludingEntity(null as Entity, axisAlignedBB1);

		for(let  i3: int = 0; i3 < list2.length; ++i3) {
			let  entity4: Entity = list2[i3];
			if(!entity4.isDead && entity4.preventEntitySpawning) {
				return false;
			}
		}

		return true;
	}

	public async getIsAnyLiquid(axisAlignedBB1: AxisAlignedBB):  Promise<boolean> {
		let  i2: int = MathHelper.floor_double(axisAlignedBB1.minX);
		let  i3: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
		let  i4: int = MathHelper.floor_double(axisAlignedBB1.minY);
		let  i5: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
		let  i6: int = MathHelper.floor_double(axisAlignedBB1.minZ);
		let  i7: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);
		if(axisAlignedBB1.minX < 0.0) {
			--i2;
		}

		if(axisAlignedBB1.minY < 0.0) {
			--i4;
		}

		if(axisAlignedBB1.minZ < 0.0) {
			--i6;
		}

		for(let  i8: int = i2; i8 < i3; ++i8) {
			for(let  i9: int = i4; i9 < i5; ++i9) {
				for(let  i10: int = i6; i10 < i7; ++i10) {
					let  block11: Block = Block.blocksList[await this.getBlockId(i8, i9, i10)];
					if(block11 !== null && block11.blockMaterial.getIsLiquid()) {
						return true;
					}
				}
			}
		}

		return false;
	}

	public async isBoundingBoxBurning(axisAlignedBB1: AxisAlignedBB):  Promise<boolean> {
		let  i2: int = MathHelper.floor_double(axisAlignedBB1.minX);
		let  i3: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
		let  i4: int = MathHelper.floor_double(axisAlignedBB1.minY);
		let  i5: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
		let  i6: int = MathHelper.floor_double(axisAlignedBB1.minZ);
		let  i7: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);
		if(this.checkChunksExist(i2, i4, i6, i3, i5, i7)) {
			for(let  i8: int = i2; i8 < i3; ++i8) {
				for(let  i9: int = i4; i9 < i5; ++i9) {
					for(let  i10: int = i6; i10 < i7; ++i10) {
						let  i11: int = await this.getBlockId(i8, i9, i10);
						if(i11 === Block.fire.blockID || i11 === Block.lavaStill.blockID || i11 === Block.lavaMoving.blockID) {
							return true;
						}
					}
				}
			}
		}

		return false;
	}

	public async handleMaterialAcceleration(axisAlignedBB1: AxisAlignedBB| null, material2: Material| null, entity3: Entity| null):  Promise<boolean> {
		let  i4: int = MathHelper.floor_double(axisAlignedBB1.minX);
		let  i5: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
		let  i6: int = MathHelper.floor_double(axisAlignedBB1.minY);
		let  i7: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
		let  i8: int = MathHelper.floor_double(axisAlignedBB1.minZ);
		let  i9: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);
		if(!this.checkChunksExist(i4, i6, i8, i5, i7, i9)) {
			return false;
		} else {
			let  z10: boolean = false;
			let  vec3D11: Vec3D = Vec3D.createVector(0.0, 0.0, 0.0);

			for(let  i12: int = i4; i12 < i5; ++i12) {
				for(let  i13: int = i6; i13 < i7; ++i13) {
					for(let  i14: int = i8; i14 < i9; ++i14) {
						let  block15: Block = Block.blocksList[await this.getBlockId(i12, i13, i14)];
						if(block15 !== null && block15.blockMaterial === material2) {
							let  d16: double = ((i13 + 1) as float - BlockFluids.setFluidHeight(await this.getBlockMetadata(i12, i13, i14))) as double;
							if(i7 as double >= d16) {
								z10 = true;
								block15.velocityToAddToEntity(this, i12, i13, i14, entity3, vec3D11);
							}
						}
					}
				}
			}

			if(vec3D11.lengthVector() > 0.0) {
				vec3D11 = vec3D11.normalize();
				let  d18: double = 0.004;
				entity3.motionX += vec3D11.xCoord * d18;
				entity3.motionY += vec3D11.yCoord * d18;
				entity3.motionZ += vec3D11.zCoord * d18;
			}

			return z10;
		}
	}

	public async isMaterialInBB(axisAlignedBB1: AxisAlignedBB, material2: Material):  Promise<boolean> {
		let  i3: int = MathHelper.floor_double(axisAlignedBB1.minX);
		let  i4: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
		let  i5: int = MathHelper.floor_double(axisAlignedBB1.minY);
		let  i6: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
		let  i7: int = MathHelper.floor_double(axisAlignedBB1.minZ);
		let  i8: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);

		for(let  i9: int = i3; i9 < i4; ++i9) {
			for(let  i10: int = i5; i10 < i6; ++i10) {
				for(let  i11: int = i7; i11 < i8; ++i11) {
					let  block12: Block = Block.blocksList[await this.getBlockId(i9, i10, i11)];
					if(block12 !== null && block12.blockMaterial === material2) {
						return true;
					}
				}
			}
		}

		return false;
	}

	public async isAABBInMaterial(axisAlignedBB1: AxisAlignedBB, material2: Material):  Promise<boolean> {
		let  i3: int = MathHelper.floor_double(axisAlignedBB1.minX);
		let  i4: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
		let  i5: int = MathHelper.floor_double(axisAlignedBB1.minY);
		let  i6: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
		let  i7: int = MathHelper.floor_double(axisAlignedBB1.minZ);
		let  i8: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);

		for(let  i9: int = i3; i9 < i4; ++i9) {
			for(let  i10: int = i5; i10 < i6; ++i10) {
				for(let  i11: int = i7; i11 < i8; ++i11) {
					let  block12: Block = Block.blocksList[await this.getBlockId(i9, i10, i11)];
					if(block12 !== null && block12.blockMaterial === material2) {
						let  i13: int = await this.getBlockMetadata(i9, i10, i11);
						let  d14: double = (i10 + 1) as double;
						if(i13 < 8) {
							d14 = (i10 + 1) as double - i13 as double / 8.0;
						}

						if(d14 >= axisAlignedBB1.minY) {
							return true;
						}
					}
				}
			}
		}

		return false;
	}

	public async createExplosion(entity1: Entity| null, d2: double, d4: double, d6: double, f8: float):  Promise<Explosion | null> {
		return this.newExplosion(entity1, d2, d4, d6, f8, false);
	}

	public async newExplosion(entity1: Entity| null, d2: double, d4: double, d6: double, f8: float, z9: boolean):  Promise<Explosion | null> {
		let  explosion10: Explosion = new  Explosion(this, entity1, d2, d4, d6, f8);
		explosion10.field_12257_a = z9;
		await explosion10.func_12248_a();
		await explosion10.func_12247_b();
		return explosion10;
	}

	public async func_675_a(vec3D1: Vec3D, axisAlignedBB2: AxisAlignedBB):  Promise<float> {
		let  d3: double = 1.0 / ((axisAlignedBB2.maxX - axisAlignedBB2.minX) * 2.0 + 1.0);
		let  d5: double = 1.0 / ((axisAlignedBB2.maxY - axisAlignedBB2.minY) * 2.0 + 1.0);
		let  d7: double = 1.0 / ((axisAlignedBB2.maxZ - axisAlignedBB2.minZ) * 2.0 + 1.0);
		let  i9: int = 0;
		let  i10: int = 0;

		for(let  f11: float = 0.0; f11 <= 1.0; f11 = (f11 as double + d3) as float) {
			for(let  f12: float = 0.0; f12 <= 1.0; f12 = (f12 as double + d5) as float) {
				for(let  f13: float = 0.0; f13 <= 1.0; f13 = (f13 as double + d7) as float) {
					let  d14: double = axisAlignedBB2.minX + (axisAlignedBB2.maxX - axisAlignedBB2.minX) * f11 as double;
					let  d16: double = axisAlignedBB2.minY + (axisAlignedBB2.maxY - axisAlignedBB2.minY) * f12 as double;
					let  d18: double = axisAlignedBB2.minZ + (axisAlignedBB2.maxZ - axisAlignedBB2.minZ) * f13 as double;
					if(await this.rayTraceBlocks(Vec3D.createVector(d14, d16, d18), vec3D1) === null) {
						++i9;
					}

					++i10;
				}
			}
		}

		return i9 as float / i10 as float;
	}

	public async onBlockHit(i1: int, i2: int, i3: int, i4: int):  Promise<void> {
		if(i4 === 0) {
			--i2;
		}

		if(i4 === 1) {
			++i2;
		}

		if(i4 === 2) {
			--i3;
		}

		if(i4 === 3) {
			++i3;
		}

		if(i4 === 4) {
			--i1;
		}

		if(i4 === 5) {
			++i1;
		}

		if(await this.getBlockId(i1, i2, i3) === Block.fire.blockID) {
			this.playSoundEffect((i1 as float + 0.5) as double, (i2 as float + 0.5) as double, (i3 as float + 0.5) as double, "random.fizz", 0.5, 2.6 + (this.rand.nextFloat() - this.rand.nextFloat()) * 0.8);
			await this.setBlockWithNotify(i1, i2, i3, 0);
		}

	}

	public func_4085_a(class1: string):  Entity | null {
		return null;
	}

	public func_687_d():  string {
		return "All: " + this.loadedEntityList.length;
	}

	public func_21119_g(): string {
		return this.chunkProvider.toString();
	}

	public async getBlockTileEntity(i1: int, i2: int, i3: int):  Promise<TileEntity | null> {
		let  chunk4: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
		return chunk4 !== null ? await chunk4.getChunkBlockTileEntity(i1 & 15, i2, i3 & 15) : null;
	}

	public async setBlockTileEntity(i1: int, i2: int, i3: int, tileEntity4: TileEntity| null):  Promise<void> {
		let  chunk5: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
		if(chunk5 !== null) {
			chunk5.setChunkBlockTileEntity(i1 & 15, i2, i3 & 15, tileEntity4);
		}

	}

	public async removeBlockTileEntity(i1: int, i2: int, i3: int): Promise<void> {
		let  chunk4: Chunk = await this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
		if(chunk4 !== null) {
			chunk4.removeChunkBlockTileEntity(i1 & 15, i2, i3 & 15);
		}
	}

	public async isBlockOpaqueCube(i1: int, i2: int, i3: int):  Promise<boolean> {
		let  block4: Block = Block.blocksList[await this.getBlockId(i1, i2, i3)];
		return block4 === null ? false : block4.isOpaqueCube();
	}

	public async func_651_a(iProgressUpdate1: IProgressUpdate): Promise<void> {
		await this.saveWorld(true, iProgressUpdate1);
	}

	public async func_6465_g(): Promise<boolean> {
		if(this.field_4204_J >= 50) {
			return false;
		} else {
			++this.field_4204_J;

			let  z2: boolean;
			try {
				let  i1: int = 500;

				while(this.field_1051_z.length > 0) {
					--i1;
					if(i1 <= 0) {
						z2 = true;
						return z2;
					}

					await (this.field_1051_z.pop() as MetadataChunkBlock).func_4127_a(this);
				}

				z2 = false;
			} finally {
				--this.field_4204_J;
			}

			return z2;
		}
	}

	public async func_616_a(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int):  Promise<void> {
		await this.func_627_a(enumSkyBlock1, i2, i3, i4, i5, i6, i7, true);
	}

	public async func_627_a(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int, z8: boolean):  Promise<void> {
		if(!this.worldProvider.field_6478_e || enumSkyBlock1 !== EnumSkyBlock.Sky) {
			++World.field_9429_y;
			if(World.field_9429_y === 50) {
				--World.field_9429_y;
			} else {
				let  i9: int = (i5 + i2) / 2;
				let  i10: int = (i7 + i4) / 2;
				if(!this.blockExists(i9, 64, i10)) {
					--World.field_9429_y;
				} else if(!(await this.getChunkFromBlockCoords(i9, i10)).func_21167_h()) {
					let  i11: int = this.field_1051_z.length;
					let  i12: int;
					if(z8) {
						i12 = 5;
						if(i12 > i11) {
							i12 = i11;
						}

						for(let  i13: int = 0; i13 < i12; ++i13) {
							let  metadataChunkBlock14: MetadataChunkBlock = this.field_1051_z[this.field_1051_z.length - i13 - 1] as MetadataChunkBlock;
							if(metadataChunkBlock14.field_1299_a === enumSkyBlock1 && metadataChunkBlock14.func_866_a(i2, i3, i4, i5, i6, i7)) {
								--World.field_9429_y;
								return;
							}
						}
					}

					this.field_1051_z.push(new  MetadataChunkBlock(enumSkyBlock1, i2, i3, i4, i5, i6, i7));
					i12 = 1000000;
					if(this.field_1051_z.length > 1000000) {
						console.log("More than " + i12 + " updates, aborting lighting updates");
						this.field_1051_z = [];
					}

					--World.field_9429_y;
				}
			}
		}
	}

	public calculateInitialSkylight():  void {
		let  i1: int = this.calculateSkylightSubtracted(1.0);
		if(i1 !== this.skylightSubtracted) {
			this.skylightSubtracted = i1;
		}

	}

	public func_21114_a(z1: boolean, z2: boolean):  void {
		this.field_21121_K = z1;
		this.field_21120_L = z2;
	}

	public async tick():  Promise<void> {
		await SpawnerAnimals.performSpawning(this, this.field_21121_K, this.field_21120_L);
		this.chunkProvider.func_532_a();
		let  i1: int = this.calculateSkylightSubtracted(1.0);
		if(i1 !== this.skylightSubtracted) {
			this.skylightSubtracted = i1;

			for(let  i2: int = 0; i2 < this.worldAccesses.length; ++i2) {
				(this.worldAccesses[i2] as IWorldAccess).updateAllRenderers();
			}
		}

		++this.worldTime;
		if(this.worldTime % BigInt(this.autosavePeriod) === 0n) {
			await this.saveWorld(false, null);
		}

		await this.TickUpdates(false);
		await this.func_4080_j();
	}

	protected async func_4080_j():  Promise<void> {
		this.field_9427_K.clear();

		let  i3: int;
		let  i4: int;
		let  i6: int;
		let  i7: int;
		for(let  i1: int = 0; i1 < this.playerEntities.length; ++i1) {
			let  entityPlayer2: EntityPlayer = this.playerEntities[i1] as EntityPlayer;
			i3 = MathHelper.floor_double(entityPlayer2.posX / 16.0);
			i4 = MathHelper.floor_double(entityPlayer2.posZ / 16.0);
			let  b5: byte = 9;

			for(i6 = -b5; i6 <= b5; ++i6) {
				for(i7 = -b5; i7 <= b5; ++i7) {
					this.field_9427_K.add(new  ChunkCoordIntPair(i6 + i3, i7 + i4));
				}
			}
		}

		if(this.field_9426_L > 0) {
			--this.field_9426_L;
		}

		this.field_9427_K.forEach(async chunkCoordIntPair => {
			let  chunkCoordIntPair13: ChunkCoordIntPair = chunkCoordIntPair;
			i3 = chunkCoordIntPair13.chunkXPos * 16;
			i4 = chunkCoordIntPair13.chunkZPos * 16;
			let  chunk14: Chunk = await this.getChunkFromChunkCoords(chunkCoordIntPair13.chunkXPos, chunkCoordIntPair13.chunkZPos);
			let  i8: int;
			let  i9: int;
			let  i10: int;
			if(this.field_9426_L === 0) {
				this.field_9437_g = this.field_9437_g * 3 + this.field_9436_h;
				i6 = this.field_9437_g >> 2;
				i7 = i6 & 15;
				i8 = i6 >> 8 & 15;
				i9 = i6 >> 16 & 127;
				i10 = chunk14.getBlockID(i7, i9, i8);
				i7 += i3;
				i8 += i4;
				if(i10 === 0 && await this.getBlockLightValue(i7, i9, i8) <= this.rand.nextInt(8) && await this.getSavedLightValue(EnumSkyBlock.Sky, i7, i9, i8) <= 0) {
					let  entityPlayer11: EntityPlayer = this.getClosestPlayer(i7 as double + 0.5, i9 as double + 0.5, i8 as double + 0.5, 8.0);
					if(entityPlayer11 !== null && entityPlayer11.getDistanceSq(i7 as double + 0.5, i9 as double + 0.5, i8 as double + 0.5) > 4.0) {
						this.playSoundEffect(i7 as double + 0.5, i9 as double + 0.5, i8 as double + 0.5, "ambient.cave.cave", 0.7, 0.8 + this.rand.nextFloat() * 0.2);
						this.field_9426_L = this.rand.nextInt(12000) + 6000;
					}
				}
			}

			for(i6 = 0; i6 < 80; ++i6) {
				this.field_9437_g = this.field_9437_g * 3 + this.field_9436_h;
				i7 = this.field_9437_g >> 2;
				i8 = i7 & 15;
				i9 = i7 >> 8 & 15;
				i10 = i7 >> 16 & 127;
				let  b15: byte = chunk14.blocks[i8 << 11 | i9 << 7 | i10];
				if(Block.tickOnLoad[b15]) {
					await Block.blocksList[b15].updateTick(this, i8 + i3, i10, i9 + i4, this.rand);
				}
			}
		})
	}

	public async TickUpdates(z1: boolean):  Promise<boolean> {
		let  i2: int = this.scheduledTickTreeSet.size;
		if(i2 !== this.scheduledTickSet.size) {
			throw new  java.lang.IllegalStateException("TickNextTick list out of synch");
		} else {
			if(i2 > 1000) {
				i2 = 1000;
			}

			for(let  i3: int = 0; i3 < i2; ++i3) {
				let  nextTickListEntry4: NextTickListEntry = this.scheduledTickTreeSet.entries[0] as NextTickListEntry;
				if(!z1 && nextTickListEntry4.scheduledTime > this.worldTime) {
					break;
				}

				this.scheduledTickTreeSet.delete(nextTickListEntry4);
				this.scheduledTickSet.delete(nextTickListEntry4);
				let  b5: byte = 8;
				if(this.checkChunksExist(nextTickListEntry4.xCoord - b5, nextTickListEntry4.yCoord - b5, nextTickListEntry4.zCoord - b5, nextTickListEntry4.xCoord + b5, nextTickListEntry4.yCoord + b5, nextTickListEntry4.zCoord + b5)) {
					let  i6: int = await this.getBlockId(nextTickListEntry4.xCoord, nextTickListEntry4.yCoord, nextTickListEntry4.zCoord);
					if(i6 === nextTickListEntry4.blockID && i6 > 0) {
						await Block.blocksList[i6].updateTick(this, nextTickListEntry4.xCoord, nextTickListEntry4.yCoord, nextTickListEntry4.zCoord, this.rand);
					}
				}
			}

			return this.scheduledTickTreeSet.size !== 0;
		}
	}

	public async randomDisplayUpdates(i1: int, i2: int, i3: int): Promise<void> {
		let  b4: byte = 16;
		let  random5: Random = new Random();

		for(let  i6: int = 0; i6 < 1000; ++i6) {
			let  i7: int = i1 + this.rand.nextInt(b4) - this.rand.nextInt(b4);
			let  i8: int = i2 + this.rand.nextInt(b4) - this.rand.nextInt(b4);
			let  i9: int = i3 + this.rand.nextInt(b4) - this.rand.nextInt(b4);
			let  i10: int = await this.getBlockId(i7, i8, i9);
			if(i10 > 0) {
				Block.blocksList[i10].randomDisplayTick(this, i7, i8, i9, random5);
			}
		}

	}

	public async getEntitiesWithinAABBExcludingEntity(entity1: Entity| null, axisAlignedBB2: AxisAlignedBB| null):  Promise<Entity[]> {
		this.field_1012_M = [];
		let  i3: int = MathHelper.floor_double((axisAlignedBB2.minX - 2.0) / 16.0);
		let  i4: int = MathHelper.floor_double((axisAlignedBB2.maxX + 2.0) / 16.0);
		let  i5: int = MathHelper.floor_double((axisAlignedBB2.minZ - 2.0) / 16.0);
		let  i6: int = MathHelper.floor_double((axisAlignedBB2.maxZ + 2.0) / 16.0);

		for(let  i7: int = i3; i7 <= i4; ++i7) {
			for(let  i8: int = i5; i8 <= i6; ++i8) {
				if(this.chunkExists(i7, i8)) {
					(await this.getChunkFromChunkCoords(i7, i8)).getEntitiesWithinAABBForEntity(entity1, axisAlignedBB2, this.field_1012_M);
				}
			}
		}

		return this.field_1012_M;
	}

	public async getEntitiesWithinAABB(class1: string, axisAlignedBB2: AxisAlignedBB| null): Promise<Entity[]> {
		let  i3: int = MathHelper.floor_double((axisAlignedBB2.minX - 2.0) / 16.0);
		let  i4: int = MathHelper.floor_double((axisAlignedBB2.maxX + 2.0) / 16.0);
		let  i5: int = MathHelper.floor_double((axisAlignedBB2.minZ - 2.0) / 16.0);
		let  i6: int = MathHelper.floor_double((axisAlignedBB2.maxZ + 2.0) / 16.0);
		let  arrayList7: Entity[] = [];

		for(let  i8: int = i3; i8 <= i4; ++i8) {
			for(let  i9: int = i5; i9 <= i6; ++i9) {
				if(this.chunkExists(i8, i9)) {
					(await this.getChunkFromChunkCoords(i8, i9)).getEntitiesOfTypeWithinAAAB(class1, axisAlignedBB2, arrayList7);
				}
			}
		}

		return arrayList7;
	}

	public getLoadedEntityList(): Entity[] {
		return this.loadedEntityList;
	}

	public async func_698_b(i1: int, i2: int, i3: int, tileEntity4: TileEntity| null):  Promise<void> {
		if(this.blockExists(i1, i2, i3)) {
			(await this.getChunkFromBlockCoords(i1, i3)).setChunkModified();
		}

		for(let  i5: int = 0; i5 < this.worldAccesses.length; ++i5) {
			(this.worldAccesses[i5] as IWorldAccess).doNothingWithTileEntity(i1, i2, i3, tileEntity4);
		}

	}

	public countEntities(class1: string):  int {
		let  i2: int = 0;

		for(let  i3: int = 0; i3 < this.loadedEntityList.length; ++i3) {
			let  entity4: Entity = this.loadedEntityList[i3] as Entity;
			switch (class1) {
				case 'monster':
				case 'creature':
				case 'waterCreature':
				default:
					console.error('World.countEntities is not yet implemented!');
			}
			// if(class1.isAssignableFrom(entity4.getClass())) {
			// 	++i2;
			// }
		}

		return i2;
	}

	public func_636_a(list1: Entity[]):  void {
		this.loadedEntityList = [...this.loadedEntityList, ...list1];

		for(let  i2: int = 0; i2 < list1.length; ++i2) {
			this.obtainEntitySkin(list1[i2]);
		}

	}

	public func_632_b(list1: Entity[]):  void {
		this.unloadedEntityList = [...this.unloadedEntityList, ...list1];
	}

	public func_656_j():  void {
		while(this.chunkProvider.func_532_a()) {
		}

	}

	public async canBlockBePlacedAt(i1: int, i2: int, i3: int, i4: int, z5: boolean):  Promise<boolean> {
		let  i6: int = await this.getBlockId(i2, i3, i4);
		let  block7: Block = Block.blocksList[i6];
		let  block8: Block = Block.blocksList[i1];
		let  axisAlignedBB9: AxisAlignedBB | null = await block8.getCollisionBoundingBoxFromPool(this, i2, i3, i4);
		if(z5) {
			axisAlignedBB9 = null;
		}

		return axisAlignedBB9 !== null && !this.checkIfAABBIsClear(axisAlignedBB9) ? false : (block7 !== Block.waterStill && block7 !== Block.waterMoving && block7 !== Block.lavaStill && block7 !== Block.lavaMoving && block7 !== Block.fire && block7 !== Block.snow ? i1 > 0 && block7 === null && block8.canPlaceBlockAt(this, i2, i3, i4) : true);
	}

	public async getPathToEntity(entity1: Entity| null, entity2: Entity| null, f3: float):  Promise<PathEntity | null> {
		let  i4: int = MathHelper.floor_double(entity1.posX);
		let  i5: int = MathHelper.floor_double(entity1.posY);
		let  i6: int = MathHelper.floor_double(entity1.posZ);
		let  i7: int = (f3 + 16.0) as int;
		let  i8: int = i4 - i7;
		let  i9: int = i5 - i7;
		let  i10: int = i6 - i7;
		let  i11: int = i4 + i7;
		let  i12: int = i5 + i7;
		let  i13: int = i6 + i7;
		let  chunkCache14: ChunkCache = await ChunkCache.Construct(this, i8, i9, i10, i11, i12, i13);
		return await (new  Pathfinder(chunkCache14)).createEntityPathTo(entity1, entity2, f3);
	}

	public async getEntityPathToXYZ(entity1: Entity| null, i2: int, i3: int, i4: int, f5: float):  Promise<PathEntity | null> {
		let  i6: int = MathHelper.floor_double(entity1.posX);
		let  i7: int = MathHelper.floor_double(entity1.posY);
		let  i8: int = MathHelper.floor_double(entity1.posZ);
		let  i9: int = (f5 + 8.0) as int;
		let  i10: int = i6 - i9;
		let  i11: int = i7 - i9;
		let  i12: int = i8 - i9;
		let  i13: int = i6 + i9;
		let  i14: int = i7 + i9;
		let  i15: int = i8 + i9;
		let  chunkCache16: ChunkCache = await ChunkCache.Construct(this, i10, i11, i12, i13, i14, i15);
		return await (new  Pathfinder(chunkCache16)).createEntityPathTo(entity1, i2, i3, i4, f5);
	}

	public async isBlockProvidingPowerTo(i1: int, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  i5: int = await this.getBlockId(i1, i2, i3);
		return i5 === 0 ? false : Block.blocksList[i5].isIndirectlyPoweringTo(this, i1, i2, i3, i4);
	}

	public async isBlockGettingPowered(i1: int, i2: int, i3: int):  Promise<boolean> {
		return this.isBlockProvidingPowerTo(i1, i2 - 1, i3, 0) ? true : (this.isBlockProvidingPowerTo(i1, i2 + 1, i3, 1) ? true : (this.isBlockProvidingPowerTo(i1, i2, i3 - 1, 2) ? true : (this.isBlockProvidingPowerTo(i1, i2, i3 + 1, 3) ? true : (this.isBlockProvidingPowerTo(i1 - 1, i2, i3, 4) ? true : this.isBlockProvidingPowerTo(i1 + 1, i2, i3, 5)))));
	}

	public async isBlockIndirectlyProvidingPowerTo(i1: int, i2: int, i3: int, i4: int):  Promise<boolean> {
		if(this.isBlockOpaqueCube(i1, i2, i3)) {
			return this.isBlockGettingPowered(i1, i2, i3);
		} else {
			let  i5: int = await this.getBlockId(i1, i2, i3);
			return i5 === 0 ? false : Block.blocksList[i5].isPoweringTo(this, i1, i2, i3, i4);
		}
	}

	public async isBlockIndirectlyGettingPowered(i1: int, i2: int, i3: int):  Promise<boolean> {
		return this.isBlockIndirectlyProvidingPowerTo(i1, i2 - 1, i3, 0) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1, i2 + 1, i3, 1) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1, i2, i3 - 1, 2) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1, i2, i3 + 1, 3) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1 - 1, i2, i3, 4) ? true : this.isBlockIndirectlyProvidingPowerTo(i1 + 1, i2, i3, 5)))));
	}

	public getClosestPlayerToEntity(entity1: Entity| null, d2: double):  EntityPlayer | null {
		return this.getClosestPlayer(entity1.posX, entity1.posY, entity1.posZ, d2);
	}

	public getClosestPlayer(d1: double, d3: double, d5: double, d7: double):  EntityPlayer | null {
		let  d9: double = -1.0;
		let  entityPlayer11: EntityPlayer = null;

		for(let  i12: int = 0; i12 < this.playerEntities.length; ++i12) {
			let  entityPlayer13: EntityPlayer = this.playerEntities[i12];
			let  d14: double = entityPlayer13.getDistanceSq(d1, d3, d5);
			if((d7 < 0.0 || d14 < d7 * d7) && (d9 === -1.0 || d14 < d9)) {
				d9 = d14;
				entityPlayer11 = entityPlayer13;
			}
		}

		return entityPlayer11;
	}

	public async setChunkData(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int, b7: Int8Array):  Promise<void> {
		let  i8: int = i1 >> 4;
		let  i9: int = i3 >> 4;
		let  i10: int = i1 + i4 - 1 >> 4;
		let  i11: int = i3 + i6 - 1 >> 4;
		let  i12: int = 0;
		let  i13: int = i2;
		let  i14: int = i2 + i5;
		if(i2 < 0) {
			i13 = 0;
		}

		if(i14 > 128) {
			i14 = 128;
		}

		for(let  i15: int = i8; i15 <= i10; ++i15) {
			let  i16: int = i1 - i15 * 16;
			let  i17: int = i1 + i4 - i15 * 16;
			if(i16 < 0) {
				i16 = 0;
			}

			if(i17 > 16) {
				i17 = 16;
			}

			for(let  i18: int = i9; i18 <= i11; ++i18) {
				let  i19: int = i3 - i18 * 16;
				let  i20: int = i3 + i6 - i18 * 16;
				if(i19 < 0) {
					i19 = 0;
				}

				if(i20 > 16) {
					i20 = 16;
				}

				i12 = (await this.getChunkFromChunkCoords(i15, i18)).setChunkData(b7, i16, i13, i19, i17, i14, i20, i12);
				this.markBlocksDirty(i15 * 16 + i16, i13, i18 * 16 + i19, i15 * 16 + i17, i14, i18 * 16 + i20);
			}
		}

	}

	public sendQuittingDisconnectingPacket():  void {
	}

	public async checkSessionLock():  Promise<void> {
		// console.error('World.checkSessionLock() is not yet implemented.')
		try {
			let  file1: File = new  File(this.savePath, new JavaString("session.lock"));
			let  dataInputStream2: DataInputStream = new  DataInputStream(await FileInputStream.Construct(file1));

			try {
				if(await dataInputStream2.readLong() !== this.lockTimestamp) {
					throw new  MinecraftException("The save is being accessed from another location, aborting");
				}
			} finally {
				dataInputStream2.close();
			}

		} catch (iOException7) {
			if (iOException7 instanceof java.io.IOException) {
				throw new  MinecraftException("Failed to check session lock, aborting");
			} else {
				throw iOException7;
			}
		}
	}

	public setWorldTime(j1: long):  void {
		this.worldTime = j1;
	}

	public async func_705_f(entity1: Entity| null):  Promise<void> {
		let  i2: int = MathHelper.floor_double(entity1.posX / 16.0);
		let  i3: int = MathHelper.floor_double(entity1.posZ / 16.0);
		let  b4: byte = 2;

		for(let  i5: int = i2 - b4; i5 <= i2 + b4; ++i5) {
			for(let  i6: int = i3 - b4; i6 <= i3 + b4; ++i6) {
				await this.getChunkFromChunkCoords(i5, i6);
			}
		}

		if(!this.loadedEntityList.includes(entity1)) {
			this.loadedEntityList.push(entity1);
		}

	}

	public func_6466_a(entityPlayer1: EntityPlayer| null, i2: int, i3: int, i4: int):  boolean {
		return true;
	}

	public func_9425_a(entity1: Entity| null, b2: byte):  void {
	}

	public async updateEntityList():  Promise<void> {
		this.loadedEntityList = this.loadedEntityList.filter(loadedEntity => !this.unloadedEntityList.includes(loadedEntity));

		let  i1: int;
		let  entity2: Entity;
		let  i3: int;
		let  i4: int;
		for(i1 = 0; i1 < this.unloadedEntityList.length; ++i1) {
			entity2 = this.unloadedEntityList[i1];
			i3 = entity2.chunkCoordX;
			i4 = entity2.chunkCoordZ;
			if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
				(await this.getChunkFromChunkCoords(i3, i4)).func_1015_b(entity2);
			}
		}

		for(i1 = 0; i1 < this.unloadedEntityList.length; ++i1) {
			this.releaseEntitySkin(this.unloadedEntityList[i1]);
		}

		this.unloadedEntityList = [];

		for(i1 = 0; i1 < this.loadedEntityList.length; ++i1) {
			entity2 = this.loadedEntityList[i1];
			if(entity2.ridingEntity !== null) {
				if(!entity2.ridingEntity.isDead && entity2.ridingEntity.riddenByEntity === entity2) {
					continue;
				}

				entity2.ridingEntity.riddenByEntity = null;
				entity2.ridingEntity = null;
			}

			if(entity2.isDead) {
				i3 = entity2.chunkCoordX;
				i4 = entity2.chunkCoordZ;
				if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
					(await this.getChunkFromChunkCoords(i3, i4)).func_1015_b(entity2);
				}

				this.loadedEntityList.splice(i1--, 1);
				this.releaseEntitySkin(entity2);
			}
		}

	}

	public func_21118_q():  IChunkProvider | null {
		return this.chunkProvider;
	}

	public async playNoteAt(i1: int, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  i6: int = await this.getBlockId(i1, i2, i3);
		if(i6 > 0) {
			Block.blocksList[i6].playBlock(this, i1, i2, i3, i4, i5);
		}

	}
}
