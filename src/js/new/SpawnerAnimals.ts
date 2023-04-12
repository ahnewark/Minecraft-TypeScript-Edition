


import { JavaObject, java, int, byte, float, double } from "../jree/index";
import { World } from "./World";
import { MobSpawnerBase } from "./MobSpawnerBase";
import { MathHelper } from "./MathHelper";
import { EnumCreatureType } from "./EnumCreatureType";
import { EntitySpider } from "./EntitySpider";
import { EntitySkeleton } from "./EntitySkeleton";
import { EntitySheep } from "./EntitySheep";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { ChunkPosition } from "./ChunkPosition";
import { ChunkCoordIntPair } from "./ChunkCoordIntPair";
import { EntityList } from "./EntityList";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class SpawnerAnimals extends JavaObject {
	private static eligibleChunksForSpawning: Set<ChunkCoordIntPair> = new Set();

	protected static getRandomSpawningPointInChunk(world0: World| null, i1: int, i2: int):  ChunkPosition | null {
		let  i3: int = i1 + world0.rand.nextInt(16);
		let  i4: int = world0.rand.nextInt(128);
		let  i5: int = i2 + world0.rand.nextInt(16);
		return new  ChunkPosition(i3, i4, i5);
	}

	public static async performSpawning(world0: World| null, z1: boolean, z2: boolean):  Promise<int> {
		if(!z1 && !z2) {
			return 0;
		} else {
			SpawnerAnimals.eligibleChunksForSpawning = new Set();

			let  i3: int;
			let  i5: int;
			let  i6: int;
			for(i3 = 0; i3 < world0.playerEntities.length; ++i3) {
				let  entityPlayer4: EntityPlayer = world0.playerEntities[i3] as EntityPlayer;
				i5 = MathHelper.floor_double(entityPlayer4.posX / 16.0);
				i6 = MathHelper.floor_double(entityPlayer4.posZ / 16.0);
				let  b7: byte = 8;

				for(let  i8: int = -b7; i8 <= b7; ++i8) {
					for(let  i9: int = -b7; i9 <= b7; ++i9) {
						SpawnerAnimals.eligibleChunksForSpawning.add(new  ChunkCoordIntPair(i8 + i5, i9 + i6));
					}
				}
			}

			i3 = 0;
			let  enumCreatureType32: EnumCreatureType[] = EnumCreatureType.values();
			i5 = enumCreatureType32.length;

			label112:
			for(i6 = 0; i6 < i5; ++i6) {
				let  enumCreatureType33: EnumCreatureType = enumCreatureType32[i6];
				if((!enumCreatureType33.func_21168_d() || z2) && (enumCreatureType33.func_21168_d() || z1) && world0.countEntities(enumCreatureType33.getCreatureClass()) <= enumCreatureType33.getMaxNumberOfCreature() * SpawnerAnimals.eligibleChunksForSpawning.size / 256) {
					let eligibleChunks = SpawnerAnimals.eligibleChunksForSpawning;
					let index = 0;

					label109:
					while(true) {
						let class11: string[];
						let  i12: int;
						let  i14: int;
						let  i15: int;
						let  i16: int;
						do {
							do {
								let  chunkCoordIntPair35: ChunkCoordIntPair;
								do {
									do {
										if(index >= eligibleChunks.size) {
											continue label112;
										}

										chunkCoordIntPair35 = eligibleChunks[index];
										let  mobSpawnerBase10: MobSpawnerBase = world0.getWorldChunkManager().func_4074_a(chunkCoordIntPair35);
										class11 = mobSpawnerBase10.getEntitiesForType(enumCreatureType33);
									} while(class11 === null);
								} while(class11.length === 0);

								i12 = world0.rand.nextInt(class11.length);
								let  chunkPosition13: ChunkPosition = SpawnerAnimals.getRandomSpawningPointInChunk(world0, chunkCoordIntPair35.chunkXPos * 16, chunkCoordIntPair35.chunkZPos * 16);
								i14 = chunkPosition13.x;
								i15 = chunkPosition13.y;
								i16 = chunkPosition13.z;
							} while(await world0.isBlockOpaqueCube(i14, i15, i16));
						} while(await world0.getBlockMaterial(i14, i15, i16) !== enumCreatureType33.getCreatureMaterial());

						let  i17: int = 0;

						for(let  i18: int = 0; i18 < 3; ++i18) {
							let  i19: int = i14;
							let  i20: int = i15;
							let  i21: int = i16;
							let  b22: byte = 6;

							for(let  i23: int = 0; i23 < 4; ++i23) {
								i19 += world0.rand.nextInt(b22) - world0.rand.nextInt(b22);
								i20 += world0.rand.nextInt(1) - world0.rand.nextInt(1);
								i21 += world0.rand.nextInt(b22) - world0.rand.nextInt(b22);
								if(SpawnerAnimals.func_21203_a(enumCreatureType33, world0, i19, i20, i21)) {
									let  f24: float = i19 as float + 0.5;
									let  f25: float = i20 as float;
									let  f26: float = i21 as float + 0.5;
									if(world0.getClosestPlayer(f24 as double, f25 as double, f26 as double, 24.0) === null) {
										let  f27: float = f24 - world0.spawnX as float;
										let  f28: float = f25 - world0.spawnY as float;
										let  f29: float = f26 - world0.spawnZ as float;
										let  f30: float = f27 * f27 + f28 * f28 + f29 * f29;
										if(f30 >= 576.0) {
											let  entityLiving36: EntityLiving;
											try {
												entityLiving36 = EntityList.getEntityCtor(class11[i12])(world0) as EntityLiving;
											} catch (exception31) {
											if (exception31 instanceof java.lang.Exception) {
													console.error(exception31);
													console.trace();
													return i3;
												} else {
													throw exception31;
												}
											}

											entityLiving36.setLocationAndAngles(f24 as double, f25 as double, f26 as double, world0.rand.nextFloat() * 360.0, 0.0);
											if(entityLiving36.getCanSpawnHere()) {
												++i17;
												await world0.entityJoinedWorld(entityLiving36);
												await SpawnerAnimals.func_21204_a(entityLiving36, world0, f24, f25, f26);
												if(i17 >= entityLiving36.getMaxSpawnedInChunk()) {
													continue label109;
												}
											}

											i3 += i17;
										}
									}
								}
							}
						}
					}
				}
			}

			return i3;
		}
	}

	private static async func_21203_a(enumCreatureType0: EnumCreatureType| null, world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return enumCreatureType0.getCreatureMaterial() === MaterialRegistry.water ? (await world1.getBlockMaterial(i2, i3, i4)).getIsLiquid() && !await world1.isBlockOpaqueCube(i2, i3 + 1, i4) : await world1.isBlockOpaqueCube(i2, i3 - 1, i4) && !await world1.isBlockOpaqueCube(i2, i3, i4) && !(await world1.getBlockMaterial(i2, i3, i4)).getIsLiquid() && !await world1.isBlockOpaqueCube(i2, i3 + 1, i4);
	}

	private static async func_21204_a(entityLiving0: EntityLiving| null, world1: World| null, f2: float, f3: float, f4: float):  Promise<void> {
		if(entityLiving0 instanceof EntitySpider && world1.rand.nextInt(100) === 0) {
			let  entitySkeleton5: EntitySkeleton = new  EntitySkeleton(world1);
			entitySkeleton5.setLocationAndAngles(f2 as double, f3 as double, f4 as double, entityLiving0.rotationYaw, 0.0);
			await world1.entityJoinedWorld(entitySkeleton5);
			entitySkeleton5.mountEntity(entityLiving0);
		} else if(entityLiving0 instanceof EntitySheep) {
			(entityLiving0 as EntitySheep).setFleeceColor(EntitySheep.func_21070_a(world1.rand));
		}

	}
}
