import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { Entity } from "./Entity";
import { Random } from "../jree/java/util/Random";
import { Block } from "./Block";

export  class Teleporter {
	private field_4232_a:  Random | null = new Random();

	public async func_4107_a(world1: World| null, entity2: Entity| null):  Promise<void> {
		if(!await this.func_4106_b(world1, entity2)) {
			await this.func_4108_c(world1, entity2);
			await this.func_4106_b(world1, entity2);
		}
	}

	public async func_4106_b(world1: World| null, entity2: Entity| null):  Promise<boolean> {
		let  s3: number = 128;
		let  d4: number = -1.0;
		let  i6: number = 0;
		let  i7: number = 0;
		let  i8: number = 0;
		let  i9: number = MathHelper.floor_double(entity2.posX);
		let  i10: number = MathHelper.floor_double(entity2.posZ);

		let  d18: number;
		for(let  i11: number = i9 - s3; i11 <= i9 + s3; ++i11) {
			let  d12: number = i11 as number + 0.5 - entity2.posX;

			for(let  i14: number = i10 - s3; i14 <= i10 + s3; ++i14) {
				let  d15: number = i14 as number + 0.5 - entity2.posZ;

				for(let  i17: number = 127; i17 >= 0; --i17) {
					if(await world1.getBlockId(i11, i17, i14) === Block.portal.blockID) {
						while(await world1.getBlockId(i11, i17 - 1, i14) === Block.portal.blockID) {
							--i17;
						}

						d18 = i17 as number + 0.5 - entity2.posY;
						let  d20: number = d12 * d12 + d18 * d18 + d15 * d15;
						if(d4 < 0.0 || d20 < d4) {
							d4 = d20;
							i6 = i11;
							i7 = i17;
							i8 = i14;
						}
					}
				}
			}
		}

		if(d4 >= 0.0) {
			let  d22: number = i6 as number + 0.5;
			let  d16: number = i7 as number + 0.5;
			d18 = i8 as number + 0.5;
			if(await world1.getBlockId(i6 - 1, i7, i8) === Block.portal.blockID) {
				d22 -= 0.5;
			}

			if(await world1.getBlockId(i6 + 1, i7, i8) === Block.portal.blockID) {
				d22 += 0.5;
			}

			if(await world1.getBlockId(i6, i7, i8 - 1) === Block.portal.blockID) {
				d18 -= 0.5;
			}

			if(await world1.getBlockId(i6, i7, i8 + 1) === Block.portal.blockID) {
				d18 += 0.5;
			}

			console.log("Teleporting to " + d22 + ", " + d16 + ", " + d18);
			entity2.setLocationAndAngles(d22, d16, d18, entity2.rotationYaw, 0.0);
			entity2.motionX = entity2.motionY = entity2.motionZ = 0.0;
			return true;
		} else {
			return false;
		}
	}

	public async func_4108_c(world1: World| null, entity2: Entity| null):  Promise<boolean> {
		let  b3: number = 16;
		let  d4: number = -1.0;
		let  i6: number = MathHelper.floor_double(entity2.posX);
		let  i7: number = MathHelper.floor_double(entity2.posY);
		let  i8: number = MathHelper.floor_double(entity2.posZ);
		let  i9: number = i6;
		let  i10: number = i7;
		let  i11: number = i8;
		let  i12: number = 0;
		let  i13: number = this.field_4232_a.nextInt(4);

		let  i14: number;
		let  d15: number;
		let  i17: number;
		let  d18: number;
		let  i20: number;
		let  i21: number;
		let  i22: number;
		let  i23: number;
		let  i24: number;
		let  i25: number;
		let  i26: number;
		let  i27: number;
		let  i28: number;
		let  d32: number;
		let  d33: number;
		for(i14 = i6 - b3; i14 <= i6 + b3; ++i14) {
			d15 = i14 as number + 0.5 - entity2.posX;

			for(i17 = i8 - b3; i17 <= i8 + b3; ++i17) {
				d18 = i17 as number + 0.5 - entity2.posZ;

				label293:
				for(i20 = 127; i20 >= 0; --i20) {
					if(await world1.isAirBlock(i14, i20, i17)) {
						while(i20 > 0 && await world1.isAirBlock(i14, i20 - 1, i17)) {
							--i20;
						}

						for(i21 = i13; i21 < i13 + 4; ++i21) {
							i22 = i21 % 2;
							i23 = 1 - i22;
							if(i21 % 4 >= 2) {
								i22 = -i22;
								i23 = -i23;
							}

							for(i24 = 0; i24 < 3; ++i24) {
								for(i25 = 0; i25 < 4; ++i25) {
									for(i26 = -1; i26 < 4; ++i26) {
										i27 = i14 + (i25 - 1) * i22 + i24 * i23;
										i28 = i20 + i26;
										let  i29: number = i17 + (i25 - 1) * i23 - i24 * i22;
										if(i26 < 0 && !(await world1.getBlockMaterial(i27, i28, i29)).isSolid() || i26 >= 0 && !await world1.isAirBlock(i27, i28, i29)) {
											continue label293;
										}
									}
								}
							}

							d32 = i20 as number + 0.5 - entity2.posY;
							d33 = d15 * d15 + d32 * d32 + d18 * d18;
							if(d4 < 0.0 || d33 < d4) {
								d4 = d33;
								i9 = i14;
								i10 = i20;
								i11 = i17;
								i12 = i21 % 4;
							}
						}
					}
				}
			}
		}

		if(d4 < 0.0) {
			for(i14 = i6 - b3; i14 <= i6 + b3; ++i14) {
				d15 = i14 as number + 0.5 - entity2.posX;

				for(i17 = i8 - b3; i17 <= i8 + b3; ++i17) {
					d18 = i17 as number + 0.5 - entity2.posZ;

					label231:
					for(i20 = 127; i20 >= 0; --i20) {
						if(await world1.isAirBlock(i14, i20, i17)) {
							while(await world1.isAirBlock(i14, i20 - 1, i17)) {
								--i20;
							}

							for(i21 = i13; i21 < i13 + 2; ++i21) {
								i22 = i21 % 2;
								i23 = 1 - i22;

								for(i24 = 0; i24 < 4; ++i24) {
									for(i25 = -1; i25 < 4; ++i25) {
										i26 = i14 + (i24 - 1) * i22;
										i27 = i20 + i25;
										i28 = i17 + (i24 - 1) * i23;
										if(i25 < 0 && !(await world1.getBlockMaterial(i26, i27, i28)).isSolid() || i25 >= 0 && !await world1.isAirBlock(i26, i27, i28)) {
											continue label231;
										}
									}
								}

								d32 = i20 as number + 0.5 - entity2.posY;
								d33 = d15 * d15 + d32 * d32 + d18 * d18;
								if(d4 < 0.0 || d33 < d4) {
									d4 = d33;
									i9 = i14;
									i10 = i20;
									i11 = i17;
									i12 = i21 % 2;
								}
							}
						}
					}
				}
			}
		}

		let  i30: number = i9;
		let  i16: number = i10;
		i17 = i11;
		let  i31: number = i12 % 2;
		let  i19: number = 1 - i31;
		if(i12 % 4 >= 2) {
			i31 = -i31;
			i19 = -i19;
		}

		let  z34: boolean;
		if(d4 < 0.0) {
			if(i10 < 70) {
				i10 = 70;
			}

			if(i10 > 118) {
				i10 = 118;
			}

			i16 = i10;

			for(i20 = -1; i20 <= 1; ++i20) {
				for(i21 = 1; i21 < 3; ++i21) {
					for(i22 = -1; i22 < 3; ++i22) {
						i23 = i30 + (i21 - 1) * i31 + i20 * i19;
						i24 = i16 + i22;
						i25 = i17 + (i21 - 1) * i19 - i20 * i31;
						z34 = i22 < 0;
						await world1.setBlockWithNotify(i23, i24, i25, z34 ? Block.obsidian.blockID : 0);
					}
				}
			}
		}

		for(i20 = 0; i20 < 4; ++i20) {
			world1.field_1043_h = true;

			for(i21 = 0; i21 < 4; ++i21) {
				for(i22 = -1; i22 < 4; ++i22) {
					i23 = i30 + (i21 - 1) * i31;
					i24 = i16 + i22;
					i25 = i17 + (i21 - 1) * i19;
					z34 = i21 === 0 || i21 === 3 || i22 === -1 || i22 === 3;
					await world1.setBlockWithNotify(i23, i24, i25, z34 ? Block.obsidian.blockID : Block.portal.blockID);
				}
			}

			world1.field_1043_h = false;

			for(i21 = 0; i21 < 4; ++i21) {
				for(i22 = -1; i22 < 4; ++i22) {
					i23 = i30 + (i21 - 1) * i31;
					i24 = i16 + i22;
					i25 = i17 + (i21 - 1) * i19;
					await world1.notifyBlocksOfNeighborChange(i23, i24, i25, await world1.getBlockId(i23, i24, i25));
				}
			}
		}

		return true;
	}
}
