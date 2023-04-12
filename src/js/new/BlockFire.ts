


import { int, byte, double, float } from "../jree/index";
import { World } from "./World";
import { IBlockAccess } from "./IBlockAccess";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";
import { Random } from "../java/util/Random";

export  class BlockFire extends Block {
	private chanceToEncourageFire:  number[] = new   Array<number>(256);
	private abilityToCatchFire:  number[] = new   Array<number>(256);

	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.fire);
		this.setBurnRate(Block.planks.blockID, 5, 20);
		this.setBurnRate(Block.wood.blockID, 5, 5);
		this.setBurnRate(Block.leaves.blockID, 30, 60);
		this.setBurnRate(Block.bookShelf.blockID, 30, 20);
		this.setBurnRate(Block.tnt.blockID, 15, 100);
		this.setBurnRate(Block.cloth.blockID, 30, 60);
		this.setTickOnLoad(true);
	}

	private setBurnRate(i1: int, i2: int, i3: int):  void {
		this.chanceToEncourageFire[i1] = i2;
		this.abilityToCatchFire[i1] = i3;
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return null;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 3;
	}

	public quantityDropped(random1: Random | null):  int {
		return 0;
	}

	public tickRate():  int {
		return 10;
	}

	public async updateTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		let  z6: boolean = await world1.getBlockId(i2, i3 - 1, i4) === Block.bloodStone.blockID;
		let  i7: int = await world1.getBlockMetadata(i2, i3, i4);
		if(i7 < 15) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, i7 + 1);
			await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
		}

		if(!z6 && !this.func_263_h(world1, i2, i3, i4)) {
			if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4) || i7 > 3) {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			}

		} else if(!z6 && !this.canBlockCatchFire(world1, i2, i3 - 1, i4) && i7 === 15 && random5.nextInt(4) === 0) {
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		} else {
			if(i7 % 2 === 0 && i7 > 2) {
				await this.tryToCatchBlockOnFire(world1, i2 + 1, i3, i4, 300, random5);
				await this.tryToCatchBlockOnFire(world1, i2 - 1, i3, i4, 300, random5);
				await this.tryToCatchBlockOnFire(world1, i2, i3 - 1, i4, 250, random5);
				await this.tryToCatchBlockOnFire(world1, i2, i3 + 1, i4, 250, random5);
				await this.tryToCatchBlockOnFire(world1, i2, i3, i4 - 1, 300, random5);
				await this.tryToCatchBlockOnFire(world1, i2, i3, i4 + 1, 300, random5);

				for(let  i8: int = i2 - 1; i8 <= i2 + 1; ++i8) {
					for(let  i9: int = i4 - 1; i9 <= i4 + 1; ++i9) {
						for(let  i10: int = i3 - 1; i10 <= i3 + 4; ++i10) {
							if(i8 !== i2 || i10 !== i3 || i9 !== i4) {
								let  i11: int = 100;
								if(i10 > i3 + 1) {
									i11 += (i10 - (i3 + 1)) * 100;
								}

								let  i12: int = await this.getChanceOfNeighborsEncouragingFire(world1, i8, i10, i9);
								if(i12 > 0 && random5.nextInt(i11) <= i12) {
									await world1.setBlockWithNotify(i8, i10, i9, this.blockID);
								}
							}
						}
					}
				}
			}

		}
	}

	private async tryToCatchBlockOnFire(world1: World| null, i2: int, i3: int, i4: int, i5: int, random6: Random| null):  Promise<void> {
		let  i7: int = this.abilityToCatchFire[await world1.getBlockId(i2, i3, i4)];
		if(random6.nextInt(i5) < i7) {
			let  z8: boolean = await world1.getBlockId(i2, i3, i4) === Block.tnt.blockID;
			if(random6.nextInt(2) === 0) {
				await world1.setBlockWithNotify(i2, i3, i4, this.blockID);
			} else {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			}

			if(z8) {
				await Block.tnt.onBlockDestroyedByPlayer(world1, i2, i3, i4, 0);
			}
		}

	}

	private async func_263_h(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await this.canBlockCatchFire(world1, i2 + 1, i3, i4) ? true : (await this.canBlockCatchFire(world1, i2 - 1, i3, i4) ? true : (await this.canBlockCatchFire(world1, i2, i3 - 1, i4) ? true : (await this.canBlockCatchFire(world1, i2, i3 + 1, i4) ? true : (await this.canBlockCatchFire(world1, i2, i3, i4 - 1) ? true : await this.canBlockCatchFire(world1, i2, i3, i4 + 1)))));
	}

	private async getChanceOfNeighborsEncouragingFire(world1: World| null, i2: int, i3: int, i4: int):  Promise<int> {
		let  b5: byte = 0;
		if(!await world1.isAirBlock(i2, i3, i4)) {
			return 0;
		} else {
			let  i6: int = await this.getChanceToEncourageFire(world1, i2 + 1, i3, i4, b5);
			i6 = await this.getChanceToEncourageFire(world1, i2 - 1, i3, i4, i6);
			i6 = await this.getChanceToEncourageFire(world1, i2, i3 - 1, i4, i6);
			i6 = await this.getChanceToEncourageFire(world1, i2, i3 + 1, i4, i6);
			i6 = await this.getChanceToEncourageFire(world1, i2, i3, i4 - 1, i6);
			i6 = await this.getChanceToEncourageFire(world1, i2, i3, i4 + 1, i6);
			return i6;
		}
	}

	public isCollidable():  boolean {
		return false;
	}

	public async canBlockCatchFire(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return this.chanceToEncourageFire[await iBlockAccess1.getBlockId(i2, i3, i4)] > 0;
	}

	public async getChanceToEncourageFire(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<int> {
		let  i6: int = this.chanceToEncourageFire[await world1.getBlockId(i2, i3, i4)];
		return i6 > i5 ? i6 : i5;
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.isBlockOpaqueCube(i2, i3 - 1, i4) || await this.func_263_h(world1, i2, i3, i4);
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4) && !await this.func_263_h(world1, i2, i3, i4)) {
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(await world1.getBlockId(i2, i3 - 1, i4) !== Block.obsidian.blockID || !Block.portal.tryToCreatePortal(world1, i2, i3, i4)) {
			if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4) && !await this.func_263_h(world1, i2, i3, i4)) {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			} else {
				await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
			}
		}
	}

	public async randomDisplayTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(random5.nextInt(24) === 0) {
			world1.playSoundEffect((i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double, "fire.fire", 1.0 + random5.nextFloat(), random5.nextFloat() * 0.7 + 0.3);
		}

		let  i6: int;
		let  f7: float;
		let  f8: float;
		let  f9: float;
		if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4) && !await Block.fire.canBlockCatchFire(world1, i2, i3 - 1, i4)) {
			if(await Block.fire.canBlockCatchFire(world1, i2 - 1, i3, i4)) {
				for(i6 = 0; i6 < 2; ++i6) {
					f7 = i2 as float + random5.nextFloat() * 0.1;
					f8 = i3 as float + random5.nextFloat();
					f9 = i4 as float + random5.nextFloat();
					world1.spawnParticle("largesmoke", f7 as double, f8 as double, f9 as double, 0.0, 0.0, 0.0);
				}
			}

			if(await Block.fire.canBlockCatchFire(world1, i2 + 1, i3, i4)) {
				for(i6 = 0; i6 < 2; ++i6) {
					f7 = (i2 + 1) as float - random5.nextFloat() * 0.1;
					f8 = i3 as float + random5.nextFloat();
					f9 = i4 as float + random5.nextFloat();
					world1.spawnParticle("largesmoke", f7 as double, f8 as double, f9 as double, 0.0, 0.0, 0.0);
				}
			}

			if(await Block.fire.canBlockCatchFire(world1, i2, i3, i4 - 1)) {
				for(i6 = 0; i6 < 2; ++i6) {
					f7 = i2 as float + random5.nextFloat();
					f8 = i3 as float + random5.nextFloat();
					f9 = i4 as float + random5.nextFloat() * 0.1;
					world1.spawnParticle("largesmoke", f7 as double, f8 as double, f9 as double, 0.0, 0.0, 0.0);
				}
			}

			if(await Block.fire.canBlockCatchFire(world1, i2, i3, i4 + 1)) {
				for(i6 = 0; i6 < 2; ++i6) {
					f7 = i2 as float + random5.nextFloat();
					f8 = i3 as float + random5.nextFloat();
					f9 = (i4 + 1) as float - random5.nextFloat() * 0.1;
					world1.spawnParticle("largesmoke", f7 as double, f8 as double, f9 as double, 0.0, 0.0, 0.0);
				}
			}

			if(await Block.fire.canBlockCatchFire(world1, i2, i3 + 1, i4)) {
				for(i6 = 0; i6 < 2; ++i6) {
					f7 = i2 as float + random5.nextFloat();
					f8 = (i3 + 1) as float - random5.nextFloat() * 0.1;
					f9 = i4 as float + random5.nextFloat();
					world1.spawnParticle("largesmoke", f7 as double, f8 as double, f9 as double, 0.0, 0.0, 0.0);
				}
			}
		} else {
			for(i6 = 0; i6 < 3; ++i6) {
				f7 = i2 as float + random5.nextFloat();
				f8 = i3 as float + random5.nextFloat() * 0.5 + 0.5;
				f9 = i4 as float + random5.nextFloat();
				world1.spawnParticle("largesmoke", f7 as double, f8 as double, f9 as double, 0.0, 0.0, 0.0);
			}
		}

	}
}
