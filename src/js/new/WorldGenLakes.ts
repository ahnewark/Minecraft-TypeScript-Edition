import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Material } from "./Material";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Random } from "../jree/java/util/Random";
import { Block } from "./Block";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class WorldGenLakes extends WorldGenerator {
	private field_15235_a:  number;

	public constructor(i1: number) {
		super();
		this.field_15235_a = i1;
	}

	public async generate(world1: World, random2: Random, i3: number, i4: number, i5: number):  Promise<boolean> {
		i3 -= 8;

		for(i5 -= 8; i4 > 0 && await world1.isAirBlock(i3, i4, i5); --i4) {
		}

		i4 -= 4;
		let  z6: boolean[] = new   Array<boolean>(2048);
		let  i7: number = Math.floor(random2.nextInt(4) + 4);

		let  i8: number;
		for(i8 = 0; i8 < i7; ++i8) {
			let  d9: number = random2.nextDouble() * 6.0 + 3.0;
			let  d11: number = random2.nextDouble() * 4.0 + 2.0;
			let  d13: number = random2.nextDouble() * 6.0 + 3.0;
			let  d15: number = random2.nextDouble() * (16.0 - d9 - 2.0) + 1.0 + d9 / 2.0;
			let  d17: number = random2.nextDouble() * (8.0 - d11 - 4.0) + 2.0 + d11 / 2.0;
			let  d19: number = random2.nextDouble() * (16.0 - d13 - 2.0) + 1.0 + d13 / 2.0;

			for(let  i21: number = 1; i21 < 15; ++i21) {
				for(let  i22: number = 1; i22 < 15; ++i22) {
					for(let  i23: number = 1; i23 < 7; ++i23) {
						let  d24: number = (i21 as number - d15) / (d9 / 2.0);
						let  d26: number = (i23 as number - d17) / (d11 / 2.0);
						let  d28: number = (i22 as number - d19) / (d13 / 2.0);
						let  d30: number = d24 * d24 + d26 * d26 + d28 * d28;
						if(d30 < 1.0) {
							z6[(i21 * 16 + i22) * 8 + i23] = true;
						}
					}
				}
			}
		}

		let  i10: number;
		let  i32: number;
		let  z33: boolean;
		for(i8 = 0; i8 < 16; ++i8) {
			for(i32 = 0; i32 < 16; ++i32) {
				for(i10 = 0; i10 < 8; ++i10) {
					z33 = !z6[(i8 * 16 + i32) * 8 + i10] && (i8 < 15 && z6[((i8 + 1) * 16 + i32) * 8 + i10] || i8 > 0 && z6[((i8 - 1) * 16 + i32) * 8 + i10] || i32 < 15 && z6[(i8 * 16 + i32 + 1) * 8 + i10] || i32 > 0 && z6[(i8 * 16 + (i32 - 1)) * 8 + i10] || i10 < 7 && z6[(i8 * 16 + i32) * 8 + i10 + 1] || i10 > 0 && z6[(i8 * 16 + i32) * 8 + (i10 - 1)]);
					if(z33) {
						let  material12: Material = await world1.getBlockMaterial(i3 + i8, i4 + i10, i5 + i32);
						if(i10 >= 4 && material12.getIsLiquid()) {
							return false;
						}

						if(i10 < 4 && !material12.isSolid() && await world1.getBlockId(i3 + i8, i4 + i10, i5 + i32) !== this.field_15235_a) {
							return false;
						}
					}
				}
			}
		}

		for(i8 = 0; i8 < 16; ++i8) {
			for(i32 = 0; i32 < 16; ++i32) {
				for(i10 = 0; i10 < 8; ++i10) {
					if(z6[(i8 * 16 + i32) * 8 + i10]) {
						await world1.setBlock(i3 + i8, i4 + i10, i5 + i32, i10 >= 4 ? 0 : this.field_15235_a);
					}
				}
			}
		}

		for(i8 = 0; i8 < 16; ++i8) {
			for(i32 = 0; i32 < 16; ++i32) {
				for(i10 = 4; i10 < 8; ++i10) {
					if(z6[(i8 * 16 + i32) * 8 + i10] && await world1.getBlockId(i3 + i8, i4 + i10 - 1, i5 + i32) === Block.dirt.blockID && await world1.getSavedLightValue(EnumSkyBlock.Sky, i3 + i8, i4 + i10, i5 + i32) > 0) {
						await world1.setBlock(i3 + i8, i4 + i10 - 1, i5 + i32, Block.grass.blockID);
					}
				}
			}
		}

		if(Block.blocksList[this.field_15235_a].blockMaterial === MaterialRegistry.lava) {
			for(i8 = 0; i8 < 16; ++i8) {
				for(i32 = 0; i32 < 16; ++i32) {
					for(i10 = 0; i10 < 8; ++i10) {
						z33 = !z6[(i8 * 16 + i32) * 8 + i10] && (i8 < 15 && z6[((i8 + 1) * 16 + i32) * 8 + i10] || i8 > 0 && z6[((i8 - 1) * 16 + i32) * 8 + i10] || i32 < 15 && z6[(i8 * 16 + i32 + 1) * 8 + i10] || i32 > 0 && z6[(i8 * 16 + (i32 - 1)) * 8 + i10] || i10 < 7 && z6[(i8 * 16 + i32) * 8 + i10 + 1] || i10 > 0 && z6[(i8 * 16 + i32) * 8 + (i10 - 1)]);
						if(z33 && (i10 < 4 || random2.nextInt(2) !== 0) && (await world1.getBlockMaterial(i3 + i8, i4 + i10, i5 + i32)).isSolid()) {
							await world1.setBlock(i3 + i8, i4 + i10, i5 + i32, Block.stone.blockID);
						}
					}
				}
			}
		}

		return true;
	}
}
