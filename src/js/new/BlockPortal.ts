import { int, float, byte, double } from "../jree/index";
import { World } from "./World";
import { IBlockAccess } from "./IBlockAccess";
import { Entity } from "./Entity";
import { BlockBreakable } from "./BlockBreakable";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./moved/MaterialRegistry";
import { BlockRegistry } from './moved/BlockRegistry'
import { Random } from "../java/util/Random";

export  class BlockPortal extends BlockBreakable {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.portal, false);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return null;
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  f5: float;
		let  f6: float;
		if(await iBlockAccess1.getBlockId(i2 - 1, i3, i4) !== this.blockID && await iBlockAccess1.getBlockId(i2 + 1, i3, i4) !== this.blockID) {
			f5 = 0.125;
			f6 = 0.5;
			this.setBlockBounds(0.5 - f5, 0.0, 0.5 - f6, 0.5 + f5, 1.0, 0.5 + f6);
		} else {
			f5 = 0.5;
			f6 = 0.125;
			this.setBlockBounds(0.5 - f5, 0.0, 0.5 - f6, 0.5 + f5, 1.0, 0.5 + f6);
		}

	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public async tryToCreatePortal(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  b5: byte = 0;
		let  b6: byte = 0;
		if(await world1.getBlockId(i2 - 1, i3, i4) === BlockRegistry.obsidian.blockID || await world1.getBlockId(i2 + 1, i3, i4) === BlockRegistry.obsidian.blockID) {
			b5 = 1;
		}

		if(await world1.getBlockId(i2, i3, i4 - 1) === BlockRegistry.obsidian.blockID || await world1.getBlockId(i2, i3, i4 + 1) === BlockRegistry.obsidian.blockID) {
			b6 = 1;
		}

		console.log(b5 + ", " + b6);
		if(b5 === b6) {
			return false;
		} else {
			if(await world1.getBlockId(i2 - b5, i3, i4 - b6) === 0) {
				i2 -= b5;
				i4 -= b6;
			}

			let  i7: int;
			let  i8: int;
			for(i7 = -1; i7 <= 2; ++i7) {
				for(i8 = -1; i8 <= 3; ++i8) {
					let  z9: boolean = i7 === -1 || i7 === 2 || i8 === -1 || i8 === 3;
					if(i7 !== -1 && i7 !== 2 || i8 !== -1 && i8 !== 3) {
						let  i10: int = await world1.getBlockId(i2 + b5 * i7, i3 + i8, i4 + b6 * i7);
						if(z9) {
							if(i10 !== BlockRegistry.obsidian.blockID) {
								return false;
							}
						} else if(i10 !== 0 && i10 !== BlockRegistry.fire.blockID) {
							return false;
						}
					}
				}
			}

			world1.field_1043_h = true;

			for(i7 = 0; i7 < 2; ++i7) {
				for(i8 = 0; i8 < 3; ++i8) {
					await world1.setBlockWithNotify(i2 + b5 * i7, i3 + i8, i4 + b6 * i7, BlockRegistry.portal.blockID);
				}
			}

			world1.field_1043_h = false;
			return true;
		}
	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  b6: byte = 0;
		let  b7: byte = 1;
		if(await world1.getBlockId(i2 - 1, i3, i4) === this.blockID || await world1.getBlockId(i2 + 1, i3, i4) === this.blockID) {
			b6 = 1;
			b7 = 0;
		}

		let  i8: int;
		for(i8 = i3; await world1.getBlockId(i2, i8 - 1, i4) === this.blockID; --i8) {
		}

		if(await world1.getBlockId(i2, i8 - 1, i4) !== BlockRegistry.obsidian.blockID) {
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		} else {
			let  i9: int;
			for(i9 = 1; i9 < 4 && await world1.getBlockId(i2, i8 + i9, i4) === this.blockID; ++i9) {
			}

			if(i9 === 3 && await world1.getBlockId(i2, i8 + i9, i4) === BlockRegistry.obsidian.blockID) {
				let  z10: boolean = await world1.getBlockId(i2 - 1, i3, i4) === this.blockID || await world1.getBlockId(i2 + 1, i3, i4) === this.blockID;
				let  z11: boolean = await world1.getBlockId(i2, i3, i4 - 1) === this.blockID || await world1.getBlockId(i2, i3, i4 + 1) === this.blockID;
				if(z10 && z11) {
					await world1.setBlockWithNotify(i2, i3, i4, 0);
				} else if(await ((await world1.getBlockId(i2 + b6, i3, i4 + b7)) !== BlockRegistry.obsidian.blockID || await world1.getBlockId(i2 - b6, i3, i4 - b7) !== this.blockID) && (await world1.getBlockId(i2 - b6, i3, i4 - b7) !== BlockRegistry.obsidian.blockID || await world1.getBlockId(i2 + b6, i3, i4 + b7) !== this.blockID)) {
					await world1.setBlockWithNotify(i2, i3, i4, 0);
				}
			} else {
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			}
		}
	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		return true;
	}

	public quantityDropped(random1: Random| null):  int {
		return 0;
	}

	public getRenderBlockPass():  int {
		return 1;
	}

	public async onEntityCollidedWithBlock(world1: World| null, i2: int, i3: int, i4: int, entity5: Entity| null):  Promise<void> {
		if(!world1.multiplayerWorld) {
			entity5.setInPortal();
		}
	}

	public async randomDisplayTick(world1: World| null, i2: int, i3: int, i4: int, random5: Random| null):  Promise<void> {
		if(random5.nextInt(100) === 0) {
			world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "portal.portal", 1.0, random5.nextFloat() * 0.4 + 0.8);
		}

		for(let  i6: int = 0; i6 < 4; ++i6) {
			let  d7: double = (i2 as float + random5.nextFloat()) as double;
			let  d9: double = (i3 as float + random5.nextFloat()) as double;
			let  d11: double = (i4 as float + random5.nextFloat()) as double;
			let  d13: double = 0.0;
			let  d15: double = 0.0;
			let  d17: double = 0.0;
			let  i19: int = random5.nextInt(2) * 2 - 1;
			d13 = (random5.nextFloat() as double - 0.5) * 0.5;
			d15 = (random5.nextFloat() as double - 0.5) * 0.5;
			d17 = (random5.nextFloat() as double - 0.5) * 0.5;
			if(await world1.getBlockId(i2 - 1, i3, i4) !== this.blockID && await world1.getBlockId(i2 + 1, i3, i4) !== this.blockID) {
				d7 = i2 as double + 0.5 + 0.25 * i19 as double;
				d13 = (random5.nextFloat() * 2.0 * i19 as float) as double;
			} else {
				d11 = i4 as double + 0.5 + 0.25 * i19 as double;
				d17 = (random5.nextFloat() * 2.0 * i19 as float) as double;
			}

			world1.spawnParticle("portal", d7, d9, d11, d13, d15, d17);
		}

	}
}
