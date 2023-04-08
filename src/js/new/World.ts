


import { JavaObject, java, long, int, float, double, byte, S } from "jree";
// import { WorldProviderHell } from "./WorldProviderHell";
import { WorldProvider } from "./WorldProvider";
import { WorldChunkManager } from "./WorldChunkManager";
import { Vec3D } from "./Vec3D";
// import { TileEntity } from "./TileEntity";
// import { SpawnerAnimals } from "./SpawnerAnimals";
// import { Pathfinder } from "./Pathfinder";
// import { PathEntity } from "./PathEntity";
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
// import { Explosion } from "./Explosion";
import { EnumSkyBlock } from "./EnumSkyBlock";
// import { EntityPlayer } from "./EntityPlayer";
// import { Entity } from "./Entity";
import { CompressedStreamTools } from "./CompressedStreamTools";
import { ChunkProviderLoadOrGenerate } from "./ChunkProviderLoadOrGenerate";
import { ChunkCoordIntPair } from "./ChunkCoordIntPair";
import { ChunkCache } from "./ChunkCache";
import { Chunk } from "./Chunk";
// import { BlockFluids } from "./BlockFluids";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { IBlockAccess } from "./IBlockAccess";
import { Random } from "../java/util/Random";
import SaveFile from "../application/SaveFile";
import { SaveFileInputStream } from "../application/SaveFileInputStream";
import { SaveFileOutputStream } from "../application/SaveFileOutputStream";
import { DataOutputStream } from "../java/io/DataOutputStream";
import { Block } from "./Block";
import { DataInputStream } from "../java/io/DataInputStream";




export  class World extends JavaObject implements IBlockAccess {
	public scheduledUpdatesAreImmediate:  boolean;
	private field_1051_z:  MetadataChunkBlock[];
	public loadedEntityList:  [];
	private unloadedEntityList:  [];
	private scheduledTickTreeSet:  [];
	private scheduledTickSet:  Set<any>;
	public loadedTileEntityList:  [];
	public playerEntities:  [];
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
	public readonly worldProvider:  WorldProvider;
	protected worldAccesses:  IWorldAccess[];
	private chunkProvider:  IChunkProvider;
	public worldFile:  SaveFile;
	public savePath:  SaveFile;
	public randomSeed:  long;
	private nbtCompoundPlayer:  NBTTagCompound | null;
	public sizeOnDisk:  long;
	public readonly field_9431_w: string;
	public field_9430_x:  boolean;
	private field_9428_I:  AxisAlignedBB[];
	private field_4204_J:  int;
	private field_21121_K:  boolean;
	private field_21120_L:  boolean;
	protected static field_9429_y:  int = 0;
	private field_9427_K:  Set<any>;
	private field_9426_L:  int;
	private field_1012_M:  [];
	public multiplayerWorld:  boolean;

	public static func_629_a(file0: SaveFile, string1: string):  NBTTagCompound | null {
		let  file2: SaveFile = new  SaveFile(file0, "saves");
		let  file3: SaveFile = new  SaveFile(file2, string1);
		if(!file3.exists()) {
			return null;
		} else {
			let  file4: SaveFile = new  SaveFile(file3, "level.dat");
			if(file4.exists()) {
				try {
					let  nBTTagCompound5: NBTTagCompound = CompressedStreamTools.func_1138_a(new SaveFileInputStream(file4));
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

	public static deleteWorld(file0: SaveFile, string1: string):  void {
		let  file2: SaveFile = new SaveFile(file0, "saves");
		let  file3: SaveFile = new SaveFile(file2, string1);
		if(file3.exists()) {
			World.deleteFiles(file3.listFiles());
			file3.delete();
		}
	}

	private static deleteFiles(file0: SaveFile[]):  void {
		for(let  i1: int = 0; i1 < file0.length; ++i1) {
			if(file0[i1].isDirectory()) {
				World.deleteFiles(file0[i1].listFiles());
			}

			file0[i1].delete();
		}

	}

	public getWorldChunkManager():  WorldChunkManager {
		return this.worldProvider.worldChunkMgr;
	}

	public constructor(file1: SaveFile, string2: string);

	public constructor(world1: World| null, worldProvider2: WorldProvider);

	public constructor(string1: string, worldProvider2: WorldProvider, j3: long);

	public constructor(file1: SaveFile, string2: string, j3: long);

	public constructor(file1: SaveFile, string2: string, j3: long, worldProvider5: WorldProvider| null);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 2: {
				const [file1, string2] = args as [java.io.File, java.lang.String];


		this(file1, string2, (new  Random()).nextLong());
	

				break;
			}

			case 2: {
				const [world1, worldProvider2] = args as [World, WorldProvider];


		super();
		this.scheduledUpdatesAreImmediate = false;
		this.field_1051_z = [];
		this.loadedEntityList = [];
		this.unloadedEntityList = [];
		this.scheduledTickTreeSet = new  java.util.TreeSet();
		this.scheduledTickSet = new Set();
		this.loadedTileEntityList = [];
		this.playerEntities = [];
		this.worldTime = 0n;
		this.field_1019_F = 16777215n;
		this.skylightSubtracted = 0;
		this.field_9437_g = (new Random()).nextInt();
		this.field_9436_h = 1013904223;
		this.field_1043_h = false;
		this.lockTimestamp = java.lang.System.currentTimeMillis();
		this.autosavePeriod = 40;
		this.rand = new  Random();
		this.field_1033_r = false;
		this.worldAccesses = [];
		this.randomSeed = 0n;
		this.sizeOnDisk = 0n;
		this.field_9428_I = [];
		this.field_4204_J = 0;
		this.field_21121_K = true;
		this.field_21120_L = true;
		this.field_9427_K = new  Set();
		this.field_9426_L = this.rand.nextInt(12000);
		this.field_1012_M = [];
		this.multiplayerWorld = false;
		this.lockTimestamp = world1.lockTimestamp;
		this.worldFile = world1.worldFile;
		this.savePath = world1.savePath;
		this.field_9431_w = world1.field_9431_w;
		this.randomSeed = world1.randomSeed;
		this.worldTime = world1.worldTime;
		this.spawnX = world1.spawnX;
		this.spawnY = world1.spawnY;
		this.spawnZ = world1.spawnZ;
		this.sizeOnDisk = world1.sizeOnDisk;
		this.worldProvider = worldProvider2;
		worldProvider2.registerWorld(this);
		this.chunkProvider = this.getChunkProvider(this.savePath);
		this.calculateInitialSkylight();
	

				break;
			}

			case 3: {
				const [string1, worldProvider2, j3] = args as [string, WorldProvider, long];


		super();
this.scheduledUpdatesAreImmediate = false;
		this.field_1051_z = [];
		this.loadedEntityList = [];
		this.unloadedEntityList = [];
		this.scheduledTickTreeSet = new  java.util.TreeSet();
		this.scheduledTickSet = new Set();
		this.loadedTileEntityList = [];
		this.playerEntities = [];
		this.worldTime = 0n;
		this.field_1019_F = 16777215n;
		this.skylightSubtracted = 0;
		this.field_9437_g = (new Random()).nextInt();
		this.field_9436_h = 1013904223;
		this.field_1043_h = false;
		this.lockTimestamp = java.lang.System.currentTimeMillis();
		this.autosavePeriod = 40;
		this.rand = new Random();
		this.field_1033_r = false;
		this.worldAccesses = [];
		this.randomSeed = 0n;
		this.sizeOnDisk = 0n;
		this.field_9428_I = [];
		this.field_4204_J = 0;
		this.field_21121_K = true;
		this.field_21120_L = true;
		this.field_9427_K = new Set();
		this.field_9426_L = this.rand.nextInt(12000);
		this.field_1012_M = [];
		this.multiplayerWorld = false;
		this.field_9431_w = string1;
		this.randomSeed = j3;
		this.worldProvider = worldProvider2;
		worldProvider2.registerWorld(this);
		this.chunkProvider = this.getChunkProvider(this.savePath);
		this.calculateInitialSkylight();
	

				break;
			}

			case 3: {
				const [file1, string2, j3] = args as [java.io.File, java.lang.String, long];


				this(file1, string2, j3, null as WorldProvider);
	

				break;
			}

			case 4: {
				const [file1, string2, j3, worldProvider5] = args as [SaveFile, string, long, WorldProvider];


				super();
				this.scheduledUpdatesAreImmediate = false;
				this.field_1051_z = [];
				this.loadedEntityList = [];
				this.unloadedEntityList = [];
				this.scheduledTickTreeSet = new  java.util.TreeSet();
				this.scheduledTickSet = new Set();
				this.loadedTileEntityList = [];
				this.playerEntities = [];
				this.worldTime = 0n;
				this.field_1019_F = 16777215n;
				this.skylightSubtracted = 0;
				this.field_9437_g = (new  Random()).nextInt();
				this.field_9436_h = 1013904223;
				this.field_1043_h = false;
				this.lockTimestamp = java.lang.System.currentTimeMillis();
				this.autosavePeriod = 40;
				this.rand = new  Random();
				this.field_1033_r = false;
				this.worldAccesses = [];
				this.randomSeed = 0n;
				this.sizeOnDisk = 0n;
				this.field_9428_I = [];
				this.field_4204_J = 0;
				this.field_21121_K = true;
				this.field_21120_L = true;
				this.field_9427_K = new  Set();
				this.field_9426_L = this.rand.nextInt(12000);
				this.field_1012_M = [];
				this.multiplayerWorld = false;
				this.worldFile = file1;
				this.field_9431_w = string2;
				file1.mkdirs();
				this.savePath = new  SaveFile(file1, string2);
				this.savePath.mkdirs();

				try {
					let  file6: SaveFile = new SaveFile(this.savePath, "session.lock");
					let  dataOutputStream7: DataOutputStream = new DataOutputStream(new  SaveFileOutputStream(file6));

					try {
						dataOutputStream7.writeLong(this.lockTimestamp);
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
				let  file18: SaveFile = new SaveFile(this.savePath, "level.dat");
				this.field_1033_r = !file18.exists();
				if(file18.exists()) {
					try {
						let  nBTTagCompound8: NBTTagCompound = CompressedStreamTools.func_1138_a(new SaveFileInputStream(file18));
						let  nBTTagCompound9: NBTTagCompound = nBTTagCompound8.getCompoundTag("Data");
						this.randomSeed = nBTTagCompound9.getLong("RandomSeed");
						this.spawnX = nBTTagCompound9.getInteger("SpawnX");
						this.spawnY = nBTTagCompound9.getInteger("SpawnY");
						this.spawnZ = nBTTagCompound9.getInteger("SpawnZ");
						this.worldTime = nBTTagCompound9.getLong("Time");
						this.sizeOnDisk = nBTTagCompound9.getLong("SizeOnDisk");
						if(nBTTagCompound9.hasKey("Player")) {
							this.nbtCompoundPlayer = nBTTagCompound9.getCompoundTag("Player");
							let  i10: int = this.nbtCompoundPlayer.getInteger("Dimension");
							// TODO: Nether
							// if(i10 === -1) {
							// 	object17 = new  WorldProviderHell();
							// }
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
				if(this.randomSeed === 0n) {
					this.randomSeed = j3;
					z19 = true;
				}

				this.worldProvider = object17 as WorldProvider;
				this.worldProvider.registerWorld(this);
				this.chunkProvider = this.getChunkProvider(this.savePath);
				if(z19) {
					this.field_9430_x = true;
					this.spawnX = 0;
					this.spawnY = 64;

					for(this.spawnZ = 0; !this.worldProvider.canCoordinateBeSpawn(this.spawnX, this.spawnZ); this.spawnZ += this.rand.nextInt(64) - this.rand.nextInt(64)) {
						this.spawnX += this.rand.nextInt(64) - this.rand.nextInt(64);
					}

					this.field_9430_x = false;
				}

				this.calculateInitialSkylight();
			
				break;
			}
			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	protected getChunkProvider(file1: SaveFile):  IChunkProvider {
		return new  ChunkProviderLoadOrGenerate(this, this.worldProvider.getChunkLoader(file1), this.worldProvider.getChunkProvider());
	}

	public setSpawnLocation():  void {
		if(this.spawnY <= 0) {
			this.spawnY = 64;
		}

		while(this.getFirstUncoveredBlock(this.spawnX, this.spawnZ) === 0) {
			this.spawnX += this.rand.nextInt(8) - this.rand.nextInt(8);
			this.spawnZ += this.rand.nextInt(8) - this.rand.nextInt(8);
		}

	}

	public getFirstUncoveredBlock(i1: int, i2: int):  int {
		let  i3: int;
		for(i3 = 63; !this.isAirBlock(i1, i3 + 1, i2); ++i3) {
		}

		return this.getBlockId(i1, i3, i2);
	}

	public func_6464_c():  void {
	}

	// TODO: Entities
	// public func_608_a(entityPlayer1: EntityPlayer| null):  void {
	// 	try {
	// 		if(this.nbtCompoundPlayer !== null) {
	// 			entityPlayer1.readFromNBT(this.nbtCompoundPlayer);
	// 			this.nbtCompoundPlayer = null;
	// 		}

	// 		if(this.chunkProvider instanceof ChunkProviderLoadOrGenerate) {
	// 			let  chunkProviderLoadOrGenerate2: ChunkProviderLoadOrGenerate = this.chunkProvider as ChunkProviderLoadOrGenerate;
	// 			let  i3: int = MathHelper.floor_float((entityPlayer1.posX as int) as float) >> 4;
	// 			let  i4: int = MathHelper.floor_float((entityPlayer1.posZ as int) as float) >> 4;
	// 			chunkProviderLoadOrGenerate2.func_21110_c(i3, i4);
	// 		}

	// 		this.entityJoinedWorld(entityPlayer1);
	// 	} catch (exception5) {
	// 		if (exception5 instanceof java.lang.Exception) {
	// 			console.error(exception5)
	// 		} else {
	// 			throw exception5;
	// 		}
	// 	}
	// }

	public saveWorld(z1: boolean, iProgressUpdate2: IProgressUpdate | null):  void {
		if(this.chunkProvider.func_536_b()) {
			if(iProgressUpdate2 !== null) {
				iProgressUpdate2.func_594_b("Saving level");
			}

			this.saveLevel();
			if(iProgressUpdate2 !== null) {
				iProgressUpdate2.displayLoadingString("Saving chunks");
			}

			this.chunkProvider.saveChunks(z1, iProgressUpdate2);
		}
	}

	private saveLevel():  void {
		this.checkSessionLock();
		let  nBTTagCompound1: NBTTagCompound = new  NBTTagCompound();
		nBTTagCompound1.setLong("RandomSeed", this.randomSeed);
		nBTTagCompound1.setInteger("SpawnX", this.spawnX);
		nBTTagCompound1.setInteger("SpawnY", this.spawnY);
		nBTTagCompound1.setInteger("SpawnZ", this.spawnZ);
		nBTTagCompound1.setLong("Time", this.worldTime);
		nBTTagCompound1.setLong("SizeOnDisk", this.sizeOnDisk);
		nBTTagCompound1.setLong("LastPlayed", java.lang.System.currentTimeMillis());
		// let  entityPlayer2: EntityPlayer = null;
		// if(this.playerEntities.size() > 0) {
		// 	entityPlayer2 = this.playerEntities.get(0) as EntityPlayer;
		// }

		let  nBTTagCompound3: NBTTagCompound;
		// if(entityPlayer2 !== null) {
		// 	nBTTagCompound3 = new  NBTTagCompound();
		// 	entityPlayer2.writeToNBT(nBTTagCompound3);
		// 	nBTTagCompound1.setCompoundTag("Player", nBTTagCompound3);
		// }

		nBTTagCompound3 = new  NBTTagCompound();
		nBTTagCompound3.setTag("Data", nBTTagCompound1);

		try {
			let  file4: SaveFile = new SaveFile(this.savePath, "level.dat_new");
			let  file5: SaveFile = new SaveFile(this.savePath, "level.dat_old");
			let  file6: SaveFile = new SaveFile(this.savePath, "level.dat");
			CompressedStreamTools.writeGzippedCompoundToOutputStream(nBTTagCompound3, new SaveFileOutputStream(file4));
			if(file5.exists()) {
				file5.delete();
			}

			file6.renameTo(file5);
			if(file6.exists()) {
				file6.delete();
			}

			file4.renameTo(file6);
			if(file4.exists()) {
				file4.delete();
			}
		} catch (exception7) {
			if (exception7 instanceof java.lang.Exception) {
				console.error(exception7);
			} else {
				throw exception7;
			}
		}

	}

	public func_650_a(i1: int):  boolean {
		if(!this.chunkProvider.func_536_b()) {
			return true;
		} else {
			if(i1 === 0) {
				this.saveLevel();
			}

			return this.chunkProvider.saveChunks(false, null);
		}
	}

	public getBlockId(i1: int, i2: int, i3: int):  int {
		return i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000 ? (i2 < 0 ? 0 : (i2 >= 128 ? 0 : this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4).getBlockID(i1 & 15, i2, i3 & 15))) : 0;
	}

	public isAirBlock(i1: int, i2: int, i3: int):  boolean {
		return this.getBlockId(i1, i2, i3) === 0;
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

	public getChunkFromBlockCoords(i1: int, i2: int):  Chunk {
		return this.getChunkFromChunkCoords(i1 >> 4, i2 >> 4);
	}

	public getChunkFromChunkCoords(i1: int, i2: int):  Chunk {
		return this.chunkProvider.provideChunk(i1, i2);
	}

	public setBlockAndMetadata(i1: int, i2: int, i3: int, i4: int, i5: int):  boolean {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return false;
			} else {
				let  chunk6: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				return chunk6.setBlockIDWithMetadata(i1 & 15, i2, i3 & 15, i4, i5);
			}
		} else {
			return false;
		}
	}

	public setBlock(i1: int, i2: int, i3: int, i4: int):  boolean {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return false;
			} else {
				let  chunk5: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				return chunk5.setBlockID(i1 & 15, i2, i3 & 15, i4);
			}
		} else {
			return false;
		}
	}

	public getBlockMaterial(i1: int, i2: int, i3: int):  Material {
		let  i4: int = this.getBlockId(i1, i2, i3);
		return i4 === 0 ? Material.air : Block.blocksList[i4].blockMaterial;
	}

	public getBlockMetadata(i1: int, i2: int, i3: int):  int {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return 0;
			} else if(i2 >= 128) {
				return 0;
			} else {
				let  chunk4: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				return chunk4.getBlockMetadata(i1, i2, i3);
			}
		} else {
			return 0;
		}
	}

	public setBlockMetadataWithNotify(i1: int, i2: int, i3: int, i4: int):  void {
		if(this.setBlockMetadata(i1, i2, i3, i4)) {
			this.notifyBlockChange(i1, i2, i3, this.getBlockId(i1, i2, i3));
		}

	}

	public setBlockMetadata(i1: int, i2: int, i3: int, i4: int):  boolean {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return false;
			} else {
				let  chunk5: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				chunk5.setBlockMetadata(i1, i2, i3, i4);
				return true;
			}
		} else {
			return false;
		}
	}

	public setBlockWithNotify(i1: int, i2: int, i3: int, i4: int):  boolean {
		if(this.setBlock(i1, i2, i3, i4)) {
			this.notifyBlockChange(i1, i2, i3, i4);
			return true;
		} else {
			return false;
		}
	}

	public setBlockAndMetadataWithNotify(i1: int, i2: int, i3: int, i4: int, i5: int):  boolean {
		if(this.setBlockAndMetadata(i1, i2, i3, i4, i5)) {
			this.notifyBlockChange(i1, i2, i3, i4);
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

	protected notifyBlockChange(i1: int, i2: int, i3: int, i4: int):  void {
		this.markBlockNeedsUpdate(i1, i2, i3);
		this.notifyBlocksOfNeighborChange(i1, i2, i3, i4);
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

	public notifyBlocksOfNeighborChange(i1: int, i2: int, i3: int, i4: int):  void {
		this.notifyBlockOfNeighborChange(i1 - 1, i2, i3, i4);
		this.notifyBlockOfNeighborChange(i1 + 1, i2, i3, i4);
		this.notifyBlockOfNeighborChange(i1, i2 - 1, i3, i4);
		this.notifyBlockOfNeighborChange(i1, i2 + 1, i3, i4);
		this.notifyBlockOfNeighborChange(i1, i2, i3 - 1, i4);
		this.notifyBlockOfNeighborChange(i1, i2, i3 + 1, i4);
	}

	private notifyBlockOfNeighborChange(i1: int, i2: int, i3: int, i4: int):  void {
		if(!this.field_1043_h && !this.multiplayerWorld) {
			let  block5: Block = Block.blocksList[this.getBlockId(i1, i2, i3)];
			if(block5 !== null) {
				block5.onNeighborBlockChange(this, i1, i2, i3, i4);
			}

		}
	}

	public canBlockSeeTheSky(i1: int, i2: int, i3: int):  boolean {
		return this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4).canBlockSeeTheSky(i1 & 15, i2, i3 & 15);
	}

	public getBlockLightValue(i1: int, i2: int, i3: int):  int {
		return this.getBlockLightValue_do(i1, i2, i3, true);
	}

	public getBlockLightValue_do(i1: int, i2: int, i3: int, z4: boolean):  int {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			let  i5: int;
			if(z4) {
				i5 = this.getBlockId(i1, i2, i3);
				// if(i5 === Block.stairSingle.blockID || i5 === Block.tilledField.blockID) {
				// 	let  i6: int = this.getBlockLightValue_do(i1, i2 + 1, i3, false);
				// 	let  i7: int = this.getBlockLightValue_do(i1 + 1, i2, i3, false);
				// 	let  i8: int = this.getBlockLightValue_do(i1 - 1, i2, i3, false);
				// 	let  i9: int = this.getBlockLightValue_do(i1, i2, i3 + 1, false);
				// 	let  i10: int = this.getBlockLightValue_do(i1, i2, i3 - 1, false);
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
				i5 = 15 - this.skylightSubtracted;
				if(i5 < 0) {
					i5 = 0;
				}

				return i5;
			} else {
				let  chunk11: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				return chunk11.getBlockLightValue(i1, i2, i3, this.skylightSubtracted);
			}
		} else {
			return 15;
		}
	}

	public canExistingBlockSeeTheSky(i1: int, i2: int, i3: int):  boolean {
		if(i1 >= -32000000 && i3 >= -32000000 && i1 < 32000000 && i3 <= 32000000) {
			if(i2 < 0) {
				return false;
			} else if(i2 >= 128) {
				return true;
			} else if(!this.chunkExists(i1 >> 4, i3 >> 4)) {
				return false;
			} else {
				let  chunk4: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
				i1 &= 15;
				i3 &= 15;
				return chunk4.canBlockSeeTheSky(i1, i2, i3);
			}
		} else {
			return false;
		}
	}

	public getHeightValue(i1: int, i2: int):  int {
		if(i1 >= -32000000 && i2 >= -32000000 && i1 < 32000000 && i2 <= 32000000) {
			if(!this.chunkExists(i1 >> 4, i2 >> 4)) {
				return 0;
			} else {
				let  chunk3: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i2 >> 4);
				return chunk3.getHeightValue(i1 & 15, i2 & 15);
			}
		} else {
			return 0;
		}
	}

	public neighborLightPropagationChanged(enumSkyBlock1: EnumSkyBlock, i2: int, i3: int, i4: int, i5: int):  void {
		if(!this.worldProvider.field_6478_e || enumSkyBlock1 !== EnumSkyBlock.Sky) {
			if(this.blockExists(i2, i3, i4)) {
				if(enumSkyBlock1 === EnumSkyBlock.Sky) {
					if(this.canExistingBlockSeeTheSky(i2, i3, i4)) {
						i5 = 15;
					}
				} else if(enumSkyBlock1 === EnumSkyBlock.Block) {
					let  i6: int = this.getBlockId(i2, i3, i4);
					if(Block.lightValue[i6] > i5) {
						i5 = Block.lightValue[i6];
					}
				}

				if(this.getSavedLightValue(enumSkyBlock1, i2, i3, i4) !== i5) {
					this.func_616_a(enumSkyBlock1, i2, i3, i4, i2, i3, i4);
				}

			}
		}
	}

	public getSavedLightValue(enumSkyBlock1: EnumSkyBlock, i2: int, i3: int, i4: int):  int {
		if(i3 >= 0 && i3 < 128 && i2 >= -32000000 && i4 >= -32000000 && i2 < 32000000 && i4 <= 32000000) {
			let  i5: int = i2 >> 4;
			let  i6: int = i4 >> 4;
			if(!this.chunkExists(i5, i6)) {
				return 0;
			} else {
				let  chunk7: Chunk = this.getChunkFromChunkCoords(i5, i6);
				return chunk7.getSavedLightValue(enumSkyBlock1, i2 & 15, i3, i4 & 15);
			}
		} else {
			return enumSkyBlock1.field_1722_c;
		}
	}

	public setLightValue(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int):  void {
		if(i2 >= -32000000 && i4 >= -32000000 && i2 < 32000000 && i4 <= 32000000) {
			if(i3 >= 0) {
				if(i3 < 128) {
					if(this.chunkExists(i2 >> 4, i4 >> 4)) {
						let  chunk6: Chunk = this.getChunkFromChunkCoords(i2 >> 4, i4 >> 4);
						chunk6.setLightValue(enumSkyBlock1, i2 & 15, i3, i4 & 15, i5);

						for(let  i7: int = 0; i7 < this.worldAccesses.length; ++i7) {
							(this.worldAccesses[i7] as IWorldAccess).func_934_a(i2, i3, i4);
						}

					}
				}
			}
		}
	}

	public getLightBrightness(i1: int, i2: int, i3: int):  float {
		return this.worldProvider.lightBrightnessTable[this.getBlockLightValue(i1, i2, i3)];
	}

	public isDaytime():  boolean {
		return this.skylightSubtracted < 4;
	}

	public rayTraceBlocks(vec3D1: Vec3D, vec3D2: Vec3D):  MovingObjectPosition | null {
		return this.rayTraceBlocks_do(vec3D1, vec3D2, false);
	}

	public rayTraceBlocks_do(vec3D1: Vec3D, vec3D2: Vec3D, z3: boolean):  MovingObjectPosition | null {
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

					let  i31: int = this.getBlockId(i7, i8, i9);
					let  i32: int = this.getBlockMetadata(i7, i8, i9);
					let  block33: Block = Block.blocksList[i31];
					if(i31 > 0 && block33.canCollideCheck(i32, z3)) {
						let  movingObjectPosition34: MovingObjectPosition | null = block33.collisionRayTrace(this, i7, i8, i9, vec3D1, vec3D2);
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

	// TODO: Entities
	// public playSoundAtEntity(entity1: Entity| null, string2: java.lang.String| null, f3: float, f4: float):  void {
	// 	for(let  i5: int = 0; i5 < this.worldAccesses.size(); ++i5) {
	// 		(this.worldAccesses.get(i5) as IWorldAccess).playSound(string2, entity1.posX, entity1.posY - entity1.yOffset as double, entity1.posZ, f3, f4);
	// 	}

	// }

	// public playSoundEffect(d1: double, d3: double, d5: double, string7: java.lang.String| null, f8: float, f9: float):  void {
	// 	for(let  i10: int = 0; i10 < this.worldAccesses.size(); ++i10) {
	// 		(this.worldAccesses.get(i10) as IWorldAccess).playSound(string7, d1, d3, d5, f8, f9);
	// 	}

	// }

	// public playRecord(string1: java.lang.String| null, i2: int, i3: int, i4: int):  void {
	// 	for(let  i5: int = 0; i5 < this.worldAccesses.size(); ++i5) {
	// 		(this.worldAccesses.get(i5) as IWorldAccess).playRecord(string1, i2, i3, i4);
	// 	}

	// }

	// public spawnParticle(string1: java.lang.String| null, d2: double, d4: double, d6: double, d8: double, d10: double, d12: double):  void {
	// 	for(let  i14: int = 0; i14 < this.worldAccesses.size(); ++i14) {
	// 		(this.worldAccesses.get(i14) as IWorldAccess).spawnParticle(string1, d2, d4, d6, d8, d10, d12);
	// 	}

	// }

	// public entityJoinedWorld(entity1: Entity| null):  boolean {
	// 	let  i2: int = MathHelper.floor_double(entity1.posX / 16.0);
	// 	let  i3: int = MathHelper.floor_double(entity1.posZ / 16.0);
	// 	let  z4: boolean = false;
	// 	if(entity1 instanceof EntityPlayer) {
	// 		z4 = true;
	// 	}

	// 	if(!z4 && !this.chunkExists(i2, i3)) {
	// 		return false;
	// 	} else {
	// 		if(entity1 instanceof EntityPlayer) {
	// 			let  entityPlayer5: EntityPlayer = entity1 as EntityPlayer;
	// 			this.playerEntities.add(entityPlayer5);
	// 			java.lang.System.out.println("Player count: " + this.playerEntities.size());
	// 		}

	// 		this.getChunkFromChunkCoords(i2, i3).addEntity(entity1);
	// 		this.loadedEntityList.add(entity1);
	// 		this.obtainEntitySkin(entity1);
	// 		return true;
	// 	}
	// }

	// protected obtainEntitySkin(entity1: Entity| null):  void {
	// 	for(let  i2: int = 0; i2 < this.worldAccesses.size(); ++i2) {
	// 		(this.worldAccesses.get(i2) as IWorldAccess).obtainEntitySkin(entity1);
	// 	}

	// }

	// protected releaseEntitySkin(entity1: Entity| null):  void {
	// 	for(let  i2: int = 0; i2 < this.worldAccesses.size(); ++i2) {
	// 		(this.worldAccesses.get(i2) as IWorldAccess).releaseEntitySkin(entity1);
	// 	}

	// }

	// public setEntityDead(entity1: Entity| null):  void {
	// 	if(entity1.riddenByEntity !== null) {
	// 		entity1.riddenByEntity.mountEntity(null as Entity);
	// 	}

	// 	if(entity1.ridingEntity !== null) {
	// 		entity1.mountEntity(null as Entity);
	// 	}

	// 	entity1.setEntityDead();
	// 	if(entity1 instanceof EntityPlayer) {
	// 		this.playerEntities.remove(entity1 as EntityPlayer);
	// 	}

	// }

	public addWorldAccess(iWorldAccess1: IWorldAccess):  void {
		this.worldAccesses.push(iWorldAccess1);
	}

	public removeWorldAccess(iWorldAccess1: IWorldAccess):  void {
		this.worldAccesses = this.worldAccesses.filter(access => access != iWorldAccess1);
	}

	// public getCollidingBoundingBoxes(entity1: Entity| null, axisAlignedBB2: AxisAlignedBB| null):  java.util.List | null {
	// 	this.field_9428_I.clear();
	// 	let  i3: int = MathHelper.floor_double(axisAlignedBB2.minX);
	// 	let  i4: int = MathHelper.floor_double(axisAlignedBB2.maxX + 1.0);
	// 	let  i5: int = MathHelper.floor_double(axisAlignedBB2.minY);
	// 	let  i6: int = MathHelper.floor_double(axisAlignedBB2.maxY + 1.0);
	// 	let  i7: int = MathHelper.floor_double(axisAlignedBB2.minZ);
	// 	let  i8: int = MathHelper.floor_double(axisAlignedBB2.maxZ + 1.0);

	// 	for(let  i9: int = i3; i9 < i4; ++i9) {
	// 		for(let  i10: int = i7; i10 < i8; ++i10) {
	// 			if(this.blockExists(i9, 64, i10)) {
	// 				for(let  i11: int = i5 - 1; i11 < i6; ++i11) {
	// 					let  block12: EnumSkyBlock.Block = EnumSkyBlock.Block.blocksList[this.getBlockId(i9, i11, i10)];
	// 					if(block12 !== null) {
	// 						block12.getCollidingBoundingBoxes(this, i9, i11, i10, axisAlignedBB2, this.field_9428_I);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}

	// 	let  d14: double = 0.25;
	// 	let  list15: java.util.List = this.getEntitiesWithinAABBExcludingEntity(entity1, axisAlignedBB2.expand(d14, d14, d14));

	// 	for(let  i16: int = 0; i16 < list15.size(); ++i16) {
	// 		let  axisAlignedBB13: AxisAlignedBB = (list15.get(i16) as Entity).getBoundingBox();
	// 		if(axisAlignedBB13 !== null && axisAlignedBB13.intersectsWith(axisAlignedBB2)) {
	// 			this.field_9428_I.add(axisAlignedBB13);
	// 		}

	// 		axisAlignedBB13 = entity1.func_383_b_(list15.get(i16) as Entity);
	// 		if(axisAlignedBB13 !== null && axisAlignedBB13.intersectsWith(axisAlignedBB2)) {
	// 			this.field_9428_I.add(axisAlignedBB13);
	// 		}
	// 	}

	// 	return this.field_9428_I;
	// }

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

	// public func_4079_a(entity1: Entity| null, f2: float):  Vec3D | null {
	// 	let  f3: float = this.getCelestialAngle(f2);
	// 	let  f4: float = MathHelper.cos(f3 * java.lang.Math.PI as float * 2.0) * 2.0 + 0.5;
	// 	if(f4 < 0.0) {
	// 		f4 = 0.0;
	// 	}

	// 	if(f4 > 1.0) {
	// 		f4 = 1.0;
	// 	}

	// 	let  i5: int = MathHelper.floor_double(entity1.posX);
	// 	let  i6: int = MathHelper.floor_double(entity1.posZ);
	// 	let  f7: float = this.getWorldChunkManager().func_4072_b(i5, i6) as float;
	// 	let  i8: int = this.getWorldChunkManager().func_4073_a(i5, i6).getSkyColorByTemp(f7);
	// 	let  f9: float = (i8 >> 16 & 255) as float / 255.0;
	// 	let  f10: float = (i8 >> 8 & 255) as float / 255.0;
	// 	let  f11: float = (i8 & 255) as float / 255.0;
	// 	f9 *= f4;
	// 	f10 *= f4;
	// 	f11 *= f4;
	// 	return Vec3D.createVector(f9 as double, f10 as double, f11 as double);
	// }

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

	public findTopSolidBlock(i1: int, i2: int):  int {
		let  chunk3: Chunk = this.getChunkFromBlockCoords(i1, i2);

		let  i4: int;
		for(i4 = 127; this.getBlockMaterial(i1, i4, i2).getIsSolid() && i4 > 0; --i4) {
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

	public func_696_e(i1: int, i2: int):  int {
		return this.getChunkFromBlockCoords(i1, i2).getHeightValue(i1 & 15, i2 & 15);
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

	public scheduleBlockUpdate(i1: int, i2: int, i3: int, i4: int):  void {
		let  nextTickListEntry5: NextTickListEntry = new  NextTickListEntry(i1, i2, i3, i4);
		let  b6: byte = 8;
		if(this.scheduledUpdatesAreImmediate) {
			if(this.checkChunksExist(nextTickListEntry5.xCoord - b6, nextTickListEntry5.yCoord - b6, nextTickListEntry5.zCoord - b6, nextTickListEntry5.xCoord + b6, nextTickListEntry5.yCoord + b6, nextTickListEntry5.zCoord + b6)) {
				let  i7: int = this.getBlockId(nextTickListEntry5.xCoord, nextTickListEntry5.yCoord, nextTickListEntry5.zCoord);
				if(i7 === nextTickListEntry5.blockID && i7 > 0) {
					Block.blocksList[i7].updateTick(this, nextTickListEntry5.xCoord, nextTickListEntry5.yCoord, nextTickListEntry5.zCoord, this.rand);
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

	// public func_633_c():  void {
	// 	this.loadedEntityList.removeAll(this.unloadedEntityList);

	// 	let  i1: int;
	// 	let  entity2: Entity;
	// 	let  i3: int;
	// 	let  i4: int;
	// 	for(i1 = 0; i1 < this.unloadedEntityList.size(); ++i1) {
	// 		entity2 = this.unloadedEntityList.get(i1) as Entity;
	// 		i3 = entity2.chunkCoordX;
	// 		i4 = entity2.chunkCoordZ;
	// 		if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
	// 			this.getChunkFromChunkCoords(i3, i4).func_1015_b(entity2);
	// 		}
	// 	}

	// 	for(i1 = 0; i1 < this.unloadedEntityList.size(); ++i1) {
	// 		this.releaseEntitySkin(this.unloadedEntityList.get(i1) as Entity);
	// 	}

	// 	this.unloadedEntityList.clear();

	// 	for(i1 = 0; i1 < this.loadedEntityList.size(); ++i1) {
	// 		entity2 = this.loadedEntityList.get(i1) as Entity;
	// 		if(entity2.ridingEntity !== null) {
	// 			if(!entity2.ridingEntity.isDead && entity2.ridingEntity.riddenByEntity === entity2) {
	// 				continue;
	// 			}

	// 			entity2.ridingEntity.riddenByEntity = null;
	// 			entity2.ridingEntity = null;
	// 		}

	// 		if(!entity2.isDead) {
	// 			this.updateEntity(entity2);
	// 		}

	// 		if(entity2.isDead) {
	// 			i3 = entity2.chunkCoordX;
	// 			i4 = entity2.chunkCoordZ;
	// 			if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
	// 				this.getChunkFromChunkCoords(i3, i4).func_1015_b(entity2);
	// 			}

	// 			this.loadedEntityList.remove(i1--);
	// 			this.releaseEntitySkin(entity2);
	// 		}
	// 	}

	// 	for(i1 = 0; i1 < this.loadedTileEntityList.size(); ++i1) {
	// 		let  tileEntity5: TileEntity = this.loadedTileEntityList.get(i1) as TileEntity;
	// 		tileEntity5.updateEntity();
	// 	}

	// }

	// public updateEntity(entity1: Entity| null):  void {
	// 	this.updateEntityWithOptionalForce(entity1, true);
	// }

	// public updateEntityWithOptionalForce(entity1: Entity| null, z2: boolean):  void {
	// 	let  i3: int = MathHelper.floor_double(entity1.posX);
	// 	let  i4: int = MathHelper.floor_double(entity1.posZ);
	// 	let  b5: byte = 32;
	// 	if(!z2 || this.checkChunksExist(i3 - b5, 0, i4 - b5, i3 + b5, 128, i4 + b5)) {
	// 		entity1.lastTickPosX = entity1.posX;
	// 		entity1.lastTickPosY = entity1.posY;
	// 		entity1.lastTickPosZ = entity1.posZ;
	// 		entity1.prevRotationYaw = entity1.rotationYaw;
	// 		entity1.prevRotationPitch = entity1.rotationPitch;
	// 		if(z2 && entity1.addedToChunk) {
	// 			if(entity1.ridingEntity !== null) {
	// 				entity1.updateRidden();
	// 			} else {
	// 				entity1.onUpdate();
	// 			}
	// 		}

	// 		if(java.lang.Double.isNaN(entity1.posX) || java.lang.Double.isInfinite(entity1.posX)) {
	// 			entity1.posX = entity1.lastTickPosX;
	// 		}

	// 		if(java.lang.Double.isNaN(entity1.posY) || java.lang.Double.isInfinite(entity1.posY)) {
	// 			entity1.posY = entity1.lastTickPosY;
	// 		}

	// 		if(java.lang.Double.isNaN(entity1.posZ) || java.lang.Double.isInfinite(entity1.posZ)) {
	// 			entity1.posZ = entity1.lastTickPosZ;
	// 		}

	// 		if(java.lang.Double.isNaN(entity1.rotationPitch as double) || java.lang.Double.isInfinite(entity1.rotationPitch as double)) {
	// 			entity1.rotationPitch = entity1.prevRotationPitch;
	// 		}

	// 		if(java.lang.Double.isNaN(entity1.rotationYaw as double) || java.lang.Double.isInfinite(entity1.rotationYaw as double)) {
	// 			entity1.rotationYaw = entity1.prevRotationYaw;
	// 		}

	// 		let  i6: int = MathHelper.floor_double(entity1.posX / 16.0);
	// 		let  i7: int = MathHelper.floor_double(entity1.posY / 16.0);
	// 		let  i8: int = MathHelper.floor_double(entity1.posZ / 16.0);
	// 		if(!entity1.addedToChunk || entity1.chunkCoordX !== i6 || entity1.chunkCoordY !== i7 || entity1.chunkCoordZ !== i8) {
	// 			if(entity1.addedToChunk && this.chunkExists(entity1.chunkCoordX, entity1.chunkCoordZ)) {
	// 				this.getChunkFromChunkCoords(entity1.chunkCoordX, entity1.chunkCoordZ).func_1016_a(entity1, entity1.chunkCoordY);
	// 			}

	// 			if(this.chunkExists(i6, i8)) {
	// 				entity1.addedToChunk = true;
	// 				this.getChunkFromChunkCoords(i6, i8).addEntity(entity1);
	// 			} else {
	// 				entity1.addedToChunk = false;
	// 			}
	// 		}

	// 		if(z2 && entity1.addedToChunk && entity1.riddenByEntity !== null) {
	// 			if(!entity1.riddenByEntity.isDead && entity1.riddenByEntity.ridingEntity === entity1) {
	// 				this.updateEntity(entity1.riddenByEntity);
	// 			} else {
	// 				entity1.riddenByEntity.ridingEntity = null;
	// 				entity1.riddenByEntity = null;
	// 			}
	// 		}

	// 	}
	// }

	// public checkIfAABBIsClear(axisAlignedBB1: AxisAlignedBB| null):  boolean {
	// 	let  list2: java.util.List = this.getEntitiesWithinAABBExcludingEntity(null as Entity, axisAlignedBB1);

	// 	for(let  i3: int = 0; i3 < list2.size(); ++i3) {
	// 		let  entity4: Entity = list2.get(i3) as Entity;
	// 		if(!entity4.isDead && entity4.preventEntitySpawning) {
	// 			return false;
	// 		}
	// 	}

	// 	return true;
	// }

	public getIsAnyLiquid(axisAlignedBB1: AxisAlignedBB):  boolean {
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
					let  block11: Block = Block.blocksList[this.getBlockId(i8, i9, i10)];
					if(block11 !== null && block11.blockMaterial.getIsLiquid()) {
						return true;
					}
				}
			}
		}

		return false;
	}

	// public isBoundingBoxBurning(axisAlignedBB1: AxisAlignedBB):  boolean {
	// 	let  i2: int = MathHelper.floor_double(axisAlignedBB1.minX);
	// 	let  i3: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
	// 	let  i4: int = MathHelper.floor_double(axisAlignedBB1.minY);
	// 	let  i5: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
	// 	let  i6: int = MathHelper.floor_double(axisAlignedBB1.minZ);
	// 	let  i7: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);
	// 	if(this.checkChunksExist(i2, i4, i6, i3, i5, i7)) {
	// 		for(let  i8: int = i2; i8 < i3; ++i8) {
	// 			for(let  i9: int = i4; i9 < i5; ++i9) {
	// 				for(let  i10: int = i6; i10 < i7; ++i10) {
	// 					let  i11: int = this.getBlockId(i8, i9, i10);
	// 					if(i11 === Block.fire.blockID || i11 === Block.lavaStill.blockID || i11 === Block.lavaMoving.blockID) {
	// 						return true;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return false;
	// }

	// public handleMaterialAcceleration(axisAlignedBB1: AxisAlignedBB| null, material2: Material| null, entity3: Entity| null):  boolean {
	// 	let  i4: int = MathHelper.floor_double(axisAlignedBB1.minX);
	// 	let  i5: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
	// 	let  i6: int = MathHelper.floor_double(axisAlignedBB1.minY);
	// 	let  i7: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
	// 	let  i8: int = MathHelper.floor_double(axisAlignedBB1.minZ);
	// 	let  i9: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);
	// 	if(!this.checkChunksExist(i4, i6, i8, i5, i7, i9)) {
	// 		return false;
	// 	} else {
	// 		let  z10: boolean = false;
	// 		let  vec3D11: Vec3D = Vec3D.createVector(0.0, 0.0, 0.0);

	// 		for(let  i12: int = i4; i12 < i5; ++i12) {
	// 			for(let  i13: int = i6; i13 < i7; ++i13) {
	// 				for(let  i14: int = i8; i14 < i9; ++i14) {
	// 					let  block15: EnumSkyBlock.Block = EnumSkyBlock.Block.blocksList[this.getBlockId(i12, i13, i14)];
	// 					if(block15 !== null && block15.blockMaterial === material2) {
	// 						let  d16: double = ((i13 + 1) as float - BlockFluids.setFluidHeight(this.getBlockMetadata(i12, i13, i14))) as double;
	// 						if(i7 as double >= d16) {
	// 							z10 = true;
	// 							block15.velocityToAddToEntity(this, i12, i13, i14, entity3, vec3D11);
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}

	// 		if(vec3D11.lengthVector() > 0.0) {
	// 			vec3D11 = vec3D11.normalize();
	// 			let  d18: double = 0.004;
	// 			entity3.motionX += vec3D11.xCoord * d18;
	// 			entity3.motionY += vec3D11.yCoord * d18;
	// 			entity3.motionZ += vec3D11.zCoord * d18;
	// 		}

	// 		return z10;
	// 	}
	// }

	public isMaterialInBB(axisAlignedBB1: AxisAlignedBB, material2: Material):  boolean {
		let  i3: int = MathHelper.floor_double(axisAlignedBB1.minX);
		let  i4: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
		let  i5: int = MathHelper.floor_double(axisAlignedBB1.minY);
		let  i6: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
		let  i7: int = MathHelper.floor_double(axisAlignedBB1.minZ);
		let  i8: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);

		for(let  i9: int = i3; i9 < i4; ++i9) {
			for(let  i10: int = i5; i10 < i6; ++i10) {
				for(let  i11: int = i7; i11 < i8; ++i11) {
					let  block12: Block = Block.blocksList[this.getBlockId(i9, i10, i11)];
					if(block12 !== null && block12.blockMaterial === material2) {
						return true;
					}
				}
			}
		}

		return false;
	}

	public isAABBInMaterial(axisAlignedBB1: AxisAlignedBB, material2: Material):  boolean {
		let  i3: int = MathHelper.floor_double(axisAlignedBB1.minX);
		let  i4: int = MathHelper.floor_double(axisAlignedBB1.maxX + 1.0);
		let  i5: int = MathHelper.floor_double(axisAlignedBB1.minY);
		let  i6: int = MathHelper.floor_double(axisAlignedBB1.maxY + 1.0);
		let  i7: int = MathHelper.floor_double(axisAlignedBB1.minZ);
		let  i8: int = MathHelper.floor_double(axisAlignedBB1.maxZ + 1.0);

		for(let  i9: int = i3; i9 < i4; ++i9) {
			for(let  i10: int = i5; i10 < i6; ++i10) {
				for(let  i11: int = i7; i11 < i8; ++i11) {
					let  block12: Block = Block.blocksList[this.getBlockId(i9, i10, i11)];
					if(block12 !== null && block12.blockMaterial === material2) {
						let  i13: int = this.getBlockMetadata(i9, i10, i11);
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

	// public createExplosion(entity1: Entity| null, d2: double, d4: double, d6: double, f8: float):  Explosion | null {
	// 	return this.newExplosion(entity1, d2, d4, d6, f8, false);
	// }

	// public newExplosion(entity1: Entity| null, d2: double, d4: double, d6: double, f8: float, z9: boolean):  Explosion | null {
	// 	let  explosion10: Explosion = new  Explosion(this, entity1, d2, d4, d6, f8);
	// 	explosion10.field_12257_a = z9;
	// 	explosion10.func_12248_a();
	// 	explosion10.func_12247_b();
	// 	return explosion10;
	// }

	public func_675_a(vec3D1: Vec3D, axisAlignedBB2: AxisAlignedBB):  float {
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
					if(this.rayTraceBlocks(Vec3D.createVector(d14, d16, d18), vec3D1) === null) {
						++i9;
					}

					++i10;
				}
			}
		}

		return i9 as float / i10 as float;
	}

	public onBlockHit(i1: int, i2: int, i3: int, i4: int):  void {
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

		// if(this.getBlockId(i1, i2, i3) === EnumSkyBlock.Block.fire.blockID) {
		// 	this.playSoundEffect((i1 as float + 0.5) as double, (i2 as float + 0.5) as double, (i3 as float + 0.5) as double, "random.fizz", 0.5, 2.6 + (this.rand.nextFloat() - this.rand.nextFloat()) * 0.8);
		// 	this.setBlockWithNotify(i1, i2, i3, 0);
		// }

	}

	// public func_4085_a(class1: java.lang.Class| null):  Entity | null {
	// 	return null;
	// }

	// public func_687_d():  java.lang.String | null {
	// 	return "All: " + this.loadedEntityList.size();
	// }

	public func_21119_g(): string {
		return this.chunkProvider.toString();
	}

	// public getBlockTileEntity(i1: int, i2: int, i3: int):  TileEntity | null {
	// 	let  chunk4: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
	// 	return chunk4 !== null ? chunk4.getChunkBlockTileEntity(i1 & 15, i2, i3 & 15) : null;
	// }

	// public setBlockTileEntity(i1: int, i2: int, i3: int, tileEntity4: TileEntity| null):  void {
	// 	let  chunk5: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
	// 	if(chunk5 !== null) {
	// 		chunk5.setChunkBlockTileEntity(i1 & 15, i2, i3 & 15, tileEntity4);
	// 	}

	// }

	// public removeBlockTileEntity(i1: int, i2: int, i3: int):  void {
	// 	let  chunk4: Chunk = this.getChunkFromChunkCoords(i1 >> 4, i3 >> 4);
	// 	if(chunk4 !== null) {
	// 		chunk4.removeChunkBlockTileEntity(i1 & 15, i2, i3 & 15);
	// 	}

	// }

	public isBlockOpaqueCube(i1: int, i2: int, i3: int):  boolean {
		let  block4: Block = Block.blocksList[this.getBlockId(i1, i2, i3)];
		return block4 === null ? false : block4.isOpaqueCube();
	}

	public func_651_a(iProgressUpdate1: IProgressUpdate):  void {
		this.saveWorld(true, iProgressUpdate1);
	}

	public func_6465_g():  boolean {
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

					(this.field_1051_z.pop() as MetadataChunkBlock).func_4127_a(this);
				}

				z2 = false;
			} finally {
				--this.field_4204_J;
			}

			return z2;
		}
	}

	public func_616_a(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int):  void {
		this.func_627_a(enumSkyBlock1, i2, i3, i4, i5, i6, i7, true);
	}

	public func_627_a(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int, z8: boolean):  void {
		if(!this.worldProvider.field_6478_e || enumSkyBlock1 !== EnumSkyBlock.Sky) {
			++World.field_9429_y;
			if(World.field_9429_y === 50) {
				--World.field_9429_y;
			} else {
				let  i9: int = (i5 + i2) / 2;
				let  i10: int = (i7 + i4) / 2;
				if(!this.blockExists(i9, 64, i10)) {
					--World.field_9429_y;
				} else if(!this.getChunkFromBlockCoords(i9, i10).func_21167_h()) {
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
						java.lang.System.out.println("More than " + i12 + " updates, aborting lighting updates");
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

	public tick():  void {
		// SpawnerAnimals.performSpawning(this, this.field_21121_K, this.field_21120_L);
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
			this.saveWorld(false, null);
		}

		this.TickUpdates(false);
		this.func_4080_j();
	}

	protected func_4080_j():  void {
		this.field_9427_K.clear();

		let  i3: int;
		let  i4: int;
		let  i6: int;
		let  i7: int;
		for(let  i1: int = 0; i1 < this.playerEntities.size(); ++i1) {
			let  entityPlayer2: EntityPlayer = this.playerEntities.get(i1) as EntityPlayer;
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

		let  iterator12: java.util.Iterator = this.field_9427_K.iterator();

		while(iterator12.hasNext()) {
			let  chunkCoordIntPair13: ChunkCoordIntPair = iterator12.next() as ChunkCoordIntPair;
			i3 = chunkCoordIntPair13.chunkXPos * 16;
			i4 = chunkCoordIntPair13.chunkZPos * 16;
			let  chunk14: Chunk = this.getChunkFromChunkCoords(chunkCoordIntPair13.chunkXPos, chunkCoordIntPair13.chunkZPos);
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
				if(i10 === 0 && this.getBlockLightValue(i7, i9, i8) <= this.rand.nextInt(8) && this.getSavedLightValue(EnumSkyBlock.Sky, i7, i9, i8) <= 0) {
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
					Block.blocksList[b15].updateTick(this, i8 + i3, i10, i9 + i4, this.rand);
				}
			}
		}

	}

	public TickUpdates(z1: boolean):  boolean {
		let  i2: int = this.scheduledTickTreeSet.size;
		if(i2 !== this.scheduledTickSet.size) {
			throw new  java.lang.IllegalStateException("TickNextTick list out of synch");
		} else {
			if(i2 > 1000) {
				i2 = 1000;
			}

			for(let  i3: int = 0; i3 < i2; ++i3) {
				let  nextTickListEntry4: NextTickListEntry = this.scheduledTickTreeSet.first() as NextTickListEntry;
				if(!z1 && nextTickListEntry4.scheduledTime > this.worldTime) {
					break;
				}

				this.scheduledTickTreeSet.remove(nextTickListEntry4);
				this.scheduledTickSet.remove(nextTickListEntry4);
				let  b5: byte = 8;
				if(this.checkChunksExist(nextTickListEntry4.xCoord - b5, nextTickListEntry4.yCoord - b5, nextTickListEntry4.zCoord - b5, nextTickListEntry4.xCoord + b5, nextTickListEntry4.yCoord + b5, nextTickListEntry4.zCoord + b5)) {
					let  i6: int = this.getBlockId(nextTickListEntry4.xCoord, nextTickListEntry4.yCoord, nextTickListEntry4.zCoord);
					if(i6 === nextTickListEntry4.blockID && i6 > 0) {
						Block.blocksList[i6].updateTick(this, nextTickListEntry4.xCoord, nextTickListEntry4.yCoord, nextTickListEntry4.zCoord, this.rand);
					}
				}
			}

			return this.scheduledTickTreeSet.length !== 0;
		}
	}

	public randomDisplayUpdates(i1: int, i2: int, i3: int):  void {
		let  b4: byte = 16;
		let  random5: Random = new Random();

		for(let  i6: int = 0; i6 < 1000; ++i6) {
			let  i7: int = i1 + this.rand.nextInt(b4) - this.rand.nextInt(b4);
			let  i8: int = i2 + this.rand.nextInt(b4) - this.rand.nextInt(b4);
			let  i9: int = i3 + this.rand.nextInt(b4) - this.rand.nextInt(b4);
			let  i10: int = this.getBlockId(i7, i8, i9);
			if(i10 > 0) {
				Block.blocksList[i10].randomDisplayTick(this, i7, i8, i9, random5);
			}
		}

	}

	// TODO: Entities
	// public getEntitiesWithinAABBExcludingEntity(entity1: Entity| null, axisAlignedBB2: AxisAlignedBB| null):  java.util.List | null {
	// 	this.field_1012_M.clear();
	// 	let  i3: int = MathHelper.floor_double((axisAlignedBB2.minX - 2.0) / 16.0);
	// 	let  i4: int = MathHelper.floor_double((axisAlignedBB2.maxX + 2.0) / 16.0);
	// 	let  i5: int = MathHelper.floor_double((axisAlignedBB2.minZ - 2.0) / 16.0);
	// 	let  i6: int = MathHelper.floor_double((axisAlignedBB2.maxZ + 2.0) / 16.0);

	// 	for(let  i7: int = i3; i7 <= i4; ++i7) {
	// 		for(let  i8: int = i5; i8 <= i6; ++i8) {
	// 			if(this.chunkExists(i7, i8)) {
	// 				this.getChunkFromChunkCoords(i7, i8).getEntitiesWithinAABBForEntity(entity1, axisAlignedBB2, this.field_1012_M);
	// 			}
	// 		}
	// 	}

	// 	return this.field_1012_M;
	// }

	// public getEntitiesWithinAABB(class1: java.lang.Class| null, axisAlignedBB2: AxisAlignedBB| null):  java.util.List | null {
	// 	let  i3: int = MathHelper.floor_double((axisAlignedBB2.minX - 2.0) / 16.0);
	// 	let  i4: int = MathHelper.floor_double((axisAlignedBB2.maxX + 2.0) / 16.0);
	// 	let  i5: int = MathHelper.floor_double((axisAlignedBB2.minZ - 2.0) / 16.0);
	// 	let  i6: int = MathHelper.floor_double((axisAlignedBB2.maxZ + 2.0) / 16.0);
	// 	let  arrayList7: java.util.ArrayList = new  java.util.ArrayList();

	// 	for(let  i8: int = i3; i8 <= i4; ++i8) {
	// 		for(let  i9: int = i5; i9 <= i6; ++i9) {
	// 			if(this.chunkExists(i8, i9)) {
	// 				this.getChunkFromChunkCoords(i8, i9).getEntitiesOfTypeWithinAAAB(class1, axisAlignedBB2, arrayList7);
	// 			}
	// 		}
	// 	}

	// 	return arrayList7;
	// }

	// public getLoadedEntityList():  java.util.List | null {
	// 	return this.loadedEntityList;
	// }

	// public func_698_b(i1: int, i2: int, i3: int, tileEntity4: TileEntity| null):  void {
	// 	if(this.blockExists(i1, i2, i3)) {
	// 		this.getChunkFromBlockCoords(i1, i3).setChunkModified();
	// 	}

	// 	for(let  i5: int = 0; i5 < this.worldAccesses.size(); ++i5) {
	// 		(this.worldAccesses.get(i5) as IWorldAccess).doNothingWithTileEntity(i1, i2, i3, tileEntity4);
	// 	}

	// }

	// public countEntities(class1: java.lang.Class| null):  int {
	// 	let  i2: int = 0;

	// 	for(let  i3: int = 0; i3 < this.loadedEntityList.size(); ++i3) {
	// 		let  entity4: Entity = this.loadedEntityList.get(i3) as Entity;
	// 		if(class1.isAssignableFrom(entity4.getClass())) {
	// 			++i2;
	// 		}
	// 	}

	// 	return i2;
	// }

	// public func_636_a(list1: java.util.List| null):  void {
	// 	this.loadedEntityList.addAll(list1);

	// 	for(let  i2: int = 0; i2 < list1.size(); ++i2) {
	// 		this.obtainEntitySkin(list1.get(i2) as Entity);
	// 	}

	// }

	// public func_632_b(list1: java.util.List| null):  void {
	// 	this.unloadedEntityList.addAll(list1);
	// }

	public func_656_j():  void {
		while(this.chunkProvider.func_532_a()) {
		}

	}

	public canBlockBePlacedAt(i1: int, i2: int, i3: int, i4: int, z5: boolean):  boolean {
		let  i6: int = this.getBlockId(i2, i3, i4);
		let  block7: Block = Block.blocksList[i6];
		let  block8: Block = Block.blocksList[i1];
		let  axisAlignedBB9: AxisAlignedBB | null = block8.getCollisionBoundingBoxFromPool(this, i2, i3, i4);
		if(z5) {
			axisAlignedBB9 = null;
		}

		// TODO: Fix
		return true;
		//return axisAlignedBB9 !== null && !this.checkIfAABBIsClear(axisAlignedBB9) ? false : (block7 !== Block.waterStill && block7 !== Block.waterMoving && block7 !== Block.lavaStill && block7 !== Block.lavaMoving && block7 !== Block.fire && block7 !== Block.snow ? i1 > 0 && block7 === null && block8.canPlaceBlockAt(this, i2, i3, i4) : true);
	}

	// public getPathToEntity(entity1: Entity| null, entity2: Entity| null, f3: float):  PathEntity | null {
	// 	let  i4: int = MathHelper.floor_double(entity1.posX);
	// 	let  i5: int = MathHelper.floor_double(entity1.posY);
	// 	let  i6: int = MathHelper.floor_double(entity1.posZ);
	// 	let  i7: int = (f3 + 16.0) as int;
	// 	let  i8: int = i4 - i7;
	// 	let  i9: int = i5 - i7;
	// 	let  i10: int = i6 - i7;
	// 	let  i11: int = i4 + i7;
	// 	let  i12: int = i5 + i7;
	// 	let  i13: int = i6 + i7;
	// 	let  chunkCache14: ChunkCache = new  ChunkCache(this, i8, i9, i10, i11, i12, i13);
	// 	return (new  Pathfinder(chunkCache14)).createEntityPathTo(entity1, entity2, f3);
	// }

	// public getEntityPathToXYZ(entity1: Entity| null, i2: int, i3: int, i4: int, f5: float):  PathEntity | null {
	// 	let  i6: int = MathHelper.floor_double(entity1.posX);
	// 	let  i7: int = MathHelper.floor_double(entity1.posY);
	// 	let  i8: int = MathHelper.floor_double(entity1.posZ);
	// 	let  i9: int = (f5 + 8.0) as int;
	// 	let  i10: int = i6 - i9;
	// 	let  i11: int = i7 - i9;
	// 	let  i12: int = i8 - i9;
	// 	let  i13: int = i6 + i9;
	// 	let  i14: int = i7 + i9;
	// 	let  i15: int = i8 + i9;
	// 	let  chunkCache16: ChunkCache = new  ChunkCache(this, i10, i11, i12, i13, i14, i15);
	// 	return (new  Pathfinder(chunkCache16)).createEntityPathTo(entity1, i2, i3, i4, f5);
	// }

	public isBlockProvidingPowerTo(i1: int, i2: int, i3: int, i4: int):  boolean {
		let  i5: int = this.getBlockId(i1, i2, i3);
		return i5 === 0 ? false : Block.blocksList[i5].isIndirectlyPoweringTo(this, i1, i2, i3, i4);
	}

	public isBlockGettingPowered(i1: int, i2: int, i3: int):  boolean {
		return this.isBlockProvidingPowerTo(i1, i2 - 1, i3, 0) ? true : (this.isBlockProvidingPowerTo(i1, i2 + 1, i3, 1) ? true : (this.isBlockProvidingPowerTo(i1, i2, i3 - 1, 2) ? true : (this.isBlockProvidingPowerTo(i1, i2, i3 + 1, 3) ? true : (this.isBlockProvidingPowerTo(i1 - 1, i2, i3, 4) ? true : this.isBlockProvidingPowerTo(i1 + 1, i2, i3, 5)))));
	}

	public isBlockIndirectlyProvidingPowerTo(i1: int, i2: int, i3: int, i4: int):  boolean {
		if(this.isBlockOpaqueCube(i1, i2, i3)) {
			return this.isBlockGettingPowered(i1, i2, i3);
		} else {
			let  i5: int = this.getBlockId(i1, i2, i3);
			return i5 === 0 ? false : Block.blocksList[i5].isPoweringTo(this, i1, i2, i3, i4);
		}
	}

	public isBlockIndirectlyGettingPowered(i1: int, i2: int, i3: int):  boolean {
		return this.isBlockIndirectlyProvidingPowerTo(i1, i2 - 1, i3, 0) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1, i2 + 1, i3, 1) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1, i2, i3 - 1, 2) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1, i2, i3 + 1, 3) ? true : (this.isBlockIndirectlyProvidingPowerTo(i1 - 1, i2, i3, 4) ? true : this.isBlockIndirectlyProvidingPowerTo(i1 + 1, i2, i3, 5)))));
	}

	// public getClosestPlayerToEntity(entity1: Entity| null, d2: double):  EntityPlayer | null {
	// 	return this.getClosestPlayer(entity1.posX, entity1.posY, entity1.posZ, d2);
	// }

	// public getClosestPlayer(d1: double, d3: double, d5: double, d7: double):  EntityPlayer | null {
	// 	let  d9: double = -1.0;
	// 	let  entityPlayer11: EntityPlayer = null;

	// 	for(let  i12: int = 0; i12 < this.playerEntities.size(); ++i12) {
	// 		let  entityPlayer13: EntityPlayer = this.playerEntities.get(i12) as EntityPlayer;
	// 		let  d14: double = entityPlayer13.getDistanceSq(d1, d3, d5);
	// 		if((d7 < 0.0 || d14 < d7 * d7) && (d9 === -1.0 || d14 < d9)) {
	// 			d9 = d14;
	// 			entityPlayer11 = entityPlayer13;
	// 		}
	// 	}

	// 	return entityPlayer11;
	// }

	public setChunkData(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int, b7: Int8Array):  void {
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

				i12 = this.getChunkFromChunkCoords(i15, i18).setChunkData(b7, i16, i13, i19, i17, i14, i20, i12);
				this.markBlocksDirty(i15 * 16 + i16, i13, i18 * 16 + i19, i15 * 16 + i17, i14, i18 * 16 + i20);
			}
		}

	}

	public sendQuittingDisconnectingPacket():  void {
	}

	public checkSessionLock():  void {
		try {
			let  file1: SaveFile = new  SaveFile(this.savePath, "session.lock");
			let  dataInputStream2: DataInputStream = new  DataInputStream(new SaveFileInputStream(file1));

			try {
				if(dataInputStream2.readLong() !== this.lockTimestamp) {
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

	// public func_705_f(entity1: Entity| null):  void {
	// 	let  i2: int = MathHelper.floor_double(entity1.posX / 16.0);
	// 	let  i3: int = MathHelper.floor_double(entity1.posZ / 16.0);
	// 	let  b4: byte = 2;

	// 	for(let  i5: int = i2 - b4; i5 <= i2 + b4; ++i5) {
	// 		for(let  i6: int = i3 - b4; i6 <= i3 + b4; ++i6) {
	// 			this.getChunkFromChunkCoords(i5, i6);
	// 		}
	// 	}

	// 	if(!this.loadedEntityList.contains(entity1)) {
	// 		this.loadedEntityList.add(entity1);
	// 	}

	// }

	// public func_6466_a(entityPlayer1: EntityPlayer| null, i2: int, i3: int, i4: int):  boolean {
	// 	return true;
	// }

	// public func_9425_a(entity1: Entity| null, b2: byte):  void {
	// }

	// public updateEntityList():  void {
	// 	this.loadedEntityList.removeAll(this.unloadedEntityList);

	// 	let  i1: int;
	// 	let  entity2: Entity;
	// 	let  i3: int;
	// 	let  i4: int;
	// 	for(i1 = 0; i1 < this.unloadedEntityList.size(); ++i1) {
	// 		entity2 = this.unloadedEntityList.get(i1) as Entity;
	// 		i3 = entity2.chunkCoordX;
	// 		i4 = entity2.chunkCoordZ;
	// 		if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
	// 			this.getChunkFromChunkCoords(i3, i4).func_1015_b(entity2);
	// 		}
	// 	}

	// 	for(i1 = 0; i1 < this.unloadedEntityList.size(); ++i1) {
	// 		this.releaseEntitySkin(this.unloadedEntityList.get(i1) as Entity);
	// 	}

	// 	this.unloadedEntityList.clear();

	// 	for(i1 = 0; i1 < this.loadedEntityList.size(); ++i1) {
	// 		entity2 = this.loadedEntityList.get(i1) as Entity;
	// 		if(entity2.ridingEntity !== null) {
	// 			if(!entity2.ridingEntity.isDead && entity2.ridingEntity.riddenByEntity === entity2) {
	// 				continue;
	// 			}

	// 			entity2.ridingEntity.riddenByEntity = null;
	// 			entity2.ridingEntity = null;
	// 		}

	// 		if(entity2.isDead) {
	// 			i3 = entity2.chunkCoordX;
	// 			i4 = entity2.chunkCoordZ;
	// 			if(entity2.addedToChunk && this.chunkExists(i3, i4)) {
	// 				this.getChunkFromChunkCoords(i3, i4).func_1015_b(entity2);
	// 			}

	// 			this.loadedEntityList.remove(i1--);
	// 			this.releaseEntitySkin(entity2);
	// 		}
	// 	}

	// }

	public func_21118_q():  IChunkProvider | null {
		return this.chunkProvider;
	}

	public playNoteAt(i1: int, i2: int, i3: int, i4: int, i5: int):  void {
		let  i6: int = this.getBlockId(i1, i2, i3);
		if(i6 > 0) {
			Block.blocksList[i6].playBlock(this, i1, i2, i3, i4, i5);
		}

	}
}
