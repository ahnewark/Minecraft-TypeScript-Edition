


import { int, byte } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { BlockFluids } from "./BlockFluids";
import { Random } from "../java/util/Random";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";
import { Block } from "./Block";


export  class BlockFlowing extends BlockFluids {
	protected field_460_a: int = 0;
	protected field_459_b: boolean[] = new   Array<boolean>(4);
	protected field_461_c: number[] = new   Array<number>(4);

	public constructor(i1: int, material2: Material| undefined) {
		super(i1, material2);
	}

	private async func_20015_j(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await world1.getBlockMetadata(i2, i3, i4);
		await world1.setBlockAndMetadata(i2, i3, i4, this.blockID + 1, i5);
		world1.markBlocksDirty(i2, i3, i4, i2, i3, i4);
		world1.markBlockNeedsUpdate(i2, i3, i4);
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		let  i6: int = await this.func_290_h(world1, i2, i3, i4);
		let  b7: byte = 1;
		if(this.blockMaterial === MaterialRegistry.lava && !world1.worldProvider.isHellWorld) {
			b7 = 2;
		}

		let  z8: boolean = true;
		let  i10: int;
		if(i6 > 0) {
			let  b9: byte = -100;
			this.field_460_a = 0;
			let  i12: int = await this.func_296_f(world1, i2 - 1, i3, i4, b9);
			i12 = await this.func_296_f(world1, i2 + 1, i3, i4, i12);
			i12 = await this.func_296_f(world1, i2, i3, i4 - 1, i12);
			i12 = await this.func_296_f(world1, i2, i3, i4 + 1, i12);
			i10 = i12 + b7;
			if(i10 >= 8 || i12 < 0) {
				i10 = -1;
			}

			if(await this.func_290_h(world1, i2, i3 + 1, i4) >= 0) {
				let  i11: int = await this.func_290_h(world1, i2, i3 + 1, i4);
				if(i11 >= 8) {
					i10 = i11;
				} else {
					i10 = i11 + 8;
				}
			}

			if(this.field_460_a >= 2 && this.blockMaterial === MaterialRegistry.water) {
				if(await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
					i10 = 0;
				} else if(await world1.getBlockMaterial(i2, i3 - 1, i4) === this.blockMaterial && await world1.getBlockMetadata(i2, i3, i4) === 0) {
					i10 = 0;
				}
			}

			if(this.blockMaterial === MaterialRegistry.lava && i6 < 8 && i10 < 8 && i10 > i6 && random5.nextInt(4) !== 0) {
				i10 = i6;
				z8 = false;
			}

			if(i10 !== i6) {
				i6 = i10;
				if(i10 < 0) {
					await world1.setBlockWithNotify(i2, i3, i4, 0);
				} else {
					await world1.setBlockMetadataWithNotify(i2, i3, i4, i10);
					await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
					await world1.notifyBlocksOfNeighborChange(i2, i3, i4, this.blockID);
				}
			} else if(z8) {
				await this.func_20015_j(world1, i2, i3, i4);
			}
		} else {
			await this.func_20015_j(world1, i2, i3, i4);
		}

		if(this.func_298_m(world1, i2, i3 - 1, i4)) {
			if(i6 >= 8) {
				await world1.setBlockAndMetadataWithNotify(i2, i3 - 1, i4, this.blockID, i6);
			} else {
				await world1.setBlockAndMetadataWithNotify(i2, i3 - 1, i4, this.blockID, i6 + 8);
			}
		} else if(i6 >= 0 && (i6 === 0 || this.func_295_l(world1, i2, i3 - 1, i4))) {
			let  z13: boolean[] = await this.func_297_k(world1, i2, i3, i4);
			i10 = i6 + b7;
			if(i6 >= 8) {
				i10 = 1;
			}

			if(i10 >= 8) {
				return;
			}

			if(z13[0]) {
				await this.func_299_g(world1, i2 - 1, i3, i4, i10);
			}

			if(z13[1]) {
				await this.func_299_g(world1, i2 + 1, i3, i4, i10);
			}

			if(z13[2]) {
				await this.func_299_g(world1, i2, i3, i4 - 1, i10);
			}

			if(z13[3]) {
				await this.func_299_g(world1, i2, i3, i4 + 1, i10);
			}
		}

	}

	private async func_299_g(world1: World| undefined, i2: int, i3: int, i4: int, i5: int): Promise<void> {
		if(this.func_298_m(world1, i2, i3, i4)) {
			let  i6: int = await world1.getBlockId(i2, i3, i4);
			if(i6 > 0) {
				if(this.blockMaterial === MaterialRegistry.lava) {
					this.func_292_i(world1, i2, i3, i4);
				} else {
					await Block.blocksList[i6].dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
				}
			}

			await world1.setBlockAndMetadataWithNotify(i2, i3, i4, this.blockID, i5);
		}

	}

	private async func_300_a(world1: World| undefined, i2: int, i3: int, i4: int, i5: int, i6: int):  Promise<int> {
		let  i7: int = 1000;

		for(let  i8: int = 0; i8 < 4; ++i8) {
			if((i8 !== 0 || i6 !== 1) && (i8 !== 1 || i6 !== 0) && (i8 !== 2 || i6 !== 3) && (i8 !== 3 || i6 !== 2)) {
				let  i9: int = i2;
				let  i11: int = i4;
				if(i8 === 0) {
					i9 = i2 - 1;
				}

				if(i8 === 1) {
					++i9;
				}

				if(i8 === 2) {
					i11 = i4 - 1;
				}

				if(i8 === 3) {
					++i11;
				}

				if(!this.func_295_l(world1, i9, i3, i11) && (await world1.getBlockMaterial(i9, i3, i11) !== this.blockMaterial || await world1.getBlockMetadata(i9, i3, i11) !== 0)) {
					if(!this.func_295_l(world1, i9, i3 - 1, i11)) {
						return i5;
					}

					if(i5 < 4) {
						let  i12: int = await this.func_300_a(world1, i9, i3, i11, i5 + 1, i8);
						if(i12 < i7) {
							i7 = i12;
						}
					}
				}
			}
		}

		return i7;
	}

	private async func_297_k(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean[]> {
		let  i5: int;
		let  i6: int;
		for(i5 = 0; i5 < 4; ++i5) {
			this.field_461_c[i5] = 1000;
			i6 = i2;
			let  i8: int = i4;
			if(i5 === 0) {
				i6 = i2 - 1;
			}

			if(i5 === 1) {
				++i6;
			}

			if(i5 === 2) {
				i8 = i4 - 1;
			}

			if(i5 === 3) {
				++i8;
			}

			if(!this.func_295_l(world1, i6, i3, i8) && (await world1.getBlockMaterial(i6, i3, i8) !== this.blockMaterial || await world1.getBlockMetadata(i6, i3, i8) !== 0)) {
				if(!this.func_295_l(world1, i6, i3 - 1, i8)) {
					this.field_461_c[i5] = 0;
				} else {
					this.field_461_c[i5] = await this.func_300_a(world1, i6, i3, i8, 1, i5);
				}
			}
		}

		i5 = this.field_461_c[0];

		for(i6 = 1; i6 < 4; ++i6) {
			if(this.field_461_c[i6] < i5) {
				i5 = this.field_461_c[i6];
			}
		}

		for(i6 = 0; i6 < 4; ++i6) {
			this.field_459_b[i6] = this.field_461_c[i6] === i5;
		}

		return this.field_459_b;
	}

	private async func_295_l(world1: World| undefined, i2: int, i3: int, i4: int): Promise<boolean> {
		// let  i5: int = await world1.getBlockId(i2, i3, i4);
		// if(i5 !== Block.doorWood.blockID && i5 !== Block.doorSteel.blockID && i5 !== Block.signPost.blockID && i5 !== Block.ladder.blockID && i5 !== Block.reed.blockID) {
		// 	if(i5 === 0) {
		// 		return false;
		// 	} else {
		// 		let  material6: Material = Block.blocksList[i5].blockMaterial;
		// 		return material6.isSolid();
		// 	}
		// } else {
			return true;
		// }
	}

	protected async func_296_f(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<int> {
		let  i6: int = await this.func_290_h(world1, i2, i3, i4);
		if(i6 < 0) {
			return i5;
		} else {
			if(i6 === 0) {
				++this.field_460_a;
			}

			if(i6 >= 8) {
				i6 = 0;
			}

			return i5 >= 0 && i6 >= i5 ? i5 : i6;
		}
	}

	private async func_298_m(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		let  material5: Material = await world1.getBlockMaterial(i2, i3, i4);
		return material5 === this.blockMaterial ? false : (material5 === MaterialRegistry.lava ? false : !await this.func_295_l(world1, i2, i3, i4));
	}

	public async onBlockAdded(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await super.onBlockAdded(world1, i2, i3, i4);
		if(await world1.getBlockId(i2, i3, i4) === this.blockID) {
			await world1.scheduleBlockUpdate(i2, i3, i4, this.blockID);
		}

	}
}
