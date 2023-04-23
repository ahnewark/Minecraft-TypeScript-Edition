import { int, double, byte, java } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Entity } from "./Entity";
import { ColorizerFoliage } from "./ColorizerFoliage";
import { BlockLeavesBase } from "./BlockLeavesBase";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { BlockRegistry } from './static/BlockRegistry';
import { Random } from "../java/util/Random";
import { Block } from "./Block";

export  class BlockLeaves extends BlockLeavesBase {
	private baseIndexInPNG:  int;
	protected adjacentTreeBlocks: number[];

	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.leaves, false);
		this.baseIndexInPNG = i2;
		this.setTickOnLoad(true);
	}

	public async colorMultiplier(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int):  Promise<int> {
		let  i5: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
		if((i5 & 1) === 1) {
			return ColorizerFoliage.func_21175_a();
		} else if((i5 & 2) === 2) {
			return ColorizerFoliage.func_21174_b();
		} else {
			iBlockAccess1.getWorldChunkManager().func_4069_a(i2, i4, 1, 1);
			let  d6: double = iBlockAccess1.getWorldChunkManager().temperature[0];
			let  d8: double = iBlockAccess1.getWorldChunkManager().humidity[0];
			return ColorizerFoliage.func_4146_a(d6, d8);
		}
	}

	public async onBlockRemoval(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		let  b5: byte = 1;
		let  i6: int = b5 + 1;
		if(world1.checkChunksExist(i2 - i6, i3 - i6, i4 - i6, i2 + i6, i3 + i6, i4 + i6)) {
			for(let  i7: int = -b5; i7 <= b5; ++i7) {
				for(let  i8: int = -b5; i8 <= b5; ++i8) {
					for(let  i9: int = -b5; i9 <= b5; ++i9) {
						let  i10: int = await world1.getBlockId(i2 + i7, i3 + i8, i4 + i9);
						if(i10 === Block.leaves.blockID) {
							let  i11: int = await world1.getBlockMetadata(i2 + i7, i3 + i8, i4 + i9);
							await world1.setBlockMetadata(i2 + i7, i3 + i8, i4 + i9, i11 | 4);
						}
					}
				}
			}
		}

	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		if(!world1.multiplayerWorld) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			if((i6 & 4) !== 0) {
				let  b7: byte = 4;
				let  i8: int = b7 + 1;
				let  b9: byte = 32;
				let  i10: int = b9 * b9;
				let  i11: int = b9 / 2;
				if(this.adjacentTreeBlocks === undefined) {
					this.adjacentTreeBlocks = new   Array<number>(b9 * b9 * b9).fill(0);
				}

				let  i12: int;
				if(world1.checkChunksExist(i2 - i8, i3 - i8, i4 - i8, i2 + i8, i3 + i8, i4 + i8)) {
					i12 = -b7;

					label111:
					while(true) {
						let  i13: int;
						let  i14: int;
						let  i15: int;
						if(i12 > b7) {
							i12 = 1;

							while(true) {
								if(i12 > 4) {
									break label111;
								}

								for(i13 = -b7; i13 <= b7; ++i13) {
									for(i14 = -b7; i14 <= b7; ++i14) {
										for(i15 = -b7; i15 <= b7; ++i15) {
											if(this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11) * b9 + i15 + i11] === i12 - 1) {
												if(this.adjacentTreeBlocks[(i13 + i11 - 1) * i10 + (i14 + i11) * b9 + i15 + i11] === -2) {
													this.adjacentTreeBlocks[(i13 + i11 - 1) * i10 + (i14 + i11) * b9 + i15 + i11] = i12;
												}

												if(this.adjacentTreeBlocks[(i13 + i11 + 1) * i10 + (i14 + i11) * b9 + i15 + i11] === -2) {
													this.adjacentTreeBlocks[(i13 + i11 + 1) * i10 + (i14 + i11) * b9 + i15 + i11] = i12;
												}

												if(this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11 - 1) * b9 + i15 + i11] === -2) {
													this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11 - 1) * b9 + i15 + i11] = i12;
												}

												if(this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11 + 1) * b9 + i15 + i11] === -2) {
													this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11 + 1) * b9 + i15 + i11] = i12;
												}

												if(this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11) * b9 + (i15 + i11 - 1)] === -2) {
													this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11) * b9 + (i15 + i11 - 1)] = i12;
												}

												if(this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11) * b9 + i15 + i11 + 1] === -2) {
													this.adjacentTreeBlocks[(i13 + i11) * i10 + (i14 + i11) * b9 + i15 + i11 + 1] = i12;
												}
											}
										}
									}
								}

								++i12;
							}
						}

						for(i13 = -b7; i13 <= b7; ++i13) {
							for(i14 = -b7; i14 <= b7; ++i14) {
								i15 = await world1.getBlockId(i2 + i12, i3 + i13, i4 + i14);
								if(i15 === Block.wood.blockID) {
									this.adjacentTreeBlocks[(i12 + i11) * i10 + (i13 + i11) * b9 + i14 + i11] = 0;
								} else if(i15 === Block.leaves.blockID) {
									this.adjacentTreeBlocks[(i12 + i11) * i10 + (i13 + i11) * b9 + i14 + i11] = -2;
								} else {
									this.adjacentTreeBlocks[(i12 + i11) * i10 + (i13 + i11) * b9 + i14 + i11] = -1;
								}
							}
						}

						++i12;
					}
				}

				i12 = this.adjacentTreeBlocks[i11 * i10 + i11 * b9 + i11];
				if(i12 >= 0) {
					await world1.setBlockMetadataWithNotify(i2, i3, i4, i6 & -5);
				} else {
					await this.removeLeaves(world1, i2, i3, i4);
				}
			}

		}
	}

	private async removeLeaves(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
		await world1.setBlockWithNotify(i2, i3, i4, 0);
	}

	public quantityDropped(random1: Random| undefined):  int {
		return random1.nextInt(16) === 0 ? 1 : 0;
	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return Block.sapling.blockID;
	}

	public isOpaqueCube():  boolean {
		return !this.graphicsLevel;
	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return (i2 & 3) === 1 ? this.blockIndexInTexture + 80 : this.blockIndexInTexture;
	}

	public setGraphicsLevel(z1: boolean):  void {
		this.graphicsLevel = z1;
		this.blockIndexInTexture = this.baseIndexInPNG + (z1 ? 0 : 1);
	}

	public async onEntityWalking(world1: World| undefined, i2: int, i3: int, i4: int, entity5: Entity| undefined):  Promise<void> {
		await super.onEntityWalking(world1, i2, i3, i4, entity5);
	}
}
