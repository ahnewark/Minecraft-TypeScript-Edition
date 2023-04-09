
import { JavaObject, int, java, byte } from "../jree/index";
import { World } from "./World";
import { Chunk } from "./Chunk";
import { Block } from "./Block";
import { EnumSkyBlock } from "./EnumSkyBlock";




export  class MetadataChunkBlock extends JavaObject {
	public readonly field_1299_a:  EnumSkyBlock | null;
	public field_1298_b:  int;
	public field_1304_c:  int;
	public field_1303_d:  int;
	public field_1302_e:  int;
	public field_1301_f:  int;
	public field_1300_g:  int;

	public constructor(enumSkyBlock1: EnumSkyBlock| null, i2: int, i3: int, i4: int, i5: int, i6: int, i7: int) {
		super();
		this.field_1299_a = enumSkyBlock1;
		this.field_1298_b = i2;
		this.field_1304_c = i3;
		this.field_1303_d = i4;
		this.field_1302_e = i5;
		this.field_1301_f = i6;
		this.field_1300_g = i7;
	}

	public async func_4127_a(world1: World| null):  Promise<void> {
		let  i2: int = this.field_1302_e - this.field_1298_b + 1;
		let  i3: int = this.field_1301_f - this.field_1304_c + 1;
		let  i4: int = this.field_1300_g - this.field_1303_d + 1;
		let  i5: int = i2 * i3 * i4;
		if(i5 > 32768) {
			console.log("Light too large, skipping!");
		} else {
			let  i6: int = 0;
			let  i7: int = 0;
			let  z8: boolean = false;
			let  z9: boolean = false;

			for(let  i10: int = this.field_1298_b; i10 <= this.field_1302_e; ++i10) {
				for(let  i11: int = this.field_1303_d; i11 <= this.field_1300_g; ++i11) {
					let  i12: int = i10 >> 4;
					let  i13: int = i11 >> 4;
					let  z14: boolean = false;
					if(z8 && i12 === i6 && i13 === i7) {
						z14 = z9;
					} else {
						z14 = world1.doChunksNearChunkExist(i10, 0, i11, 1);
						if(z14) {
							let  chunk15: Chunk = await world1.getChunkFromChunkCoords(i10 >> 4, i11 >> 4);
							if(chunk15.func_21167_h()) {
								z14 = false;
							}
						}

						z9 = z14;
						i6 = i12;
						i7 = i13;
					}

					if(z14) {
						if(this.field_1304_c < 0) {
							this.field_1304_c = 0;
						}

						if(this.field_1301_f >= 128) {
							this.field_1301_f = 127;
						}

						for(let  i27: int = this.field_1304_c; i27 <= this.field_1301_f; ++i27) {
							let  i16: int = await world1.getSavedLightValue(this.field_1299_a, i10, i27, i11);
							let  z17: boolean = false;
							let  i18: int = await world1.getBlockId(i10, i27, i11);
							let  i19: int = Block.lightOpacity[i18];
							if(i19 === 0) {
								i19 = 1;
							}

							let  i20: int = 0;
							if(this.field_1299_a === EnumSkyBlock.Sky) {
								if(world1.canExistingBlockSeeTheSky(i10, i27, i11)) {
									i20 = 15;
								}
							} else if(this.field_1299_a === EnumSkyBlock.Block) {
								i20 = Block.lightValue[i18];
							}

							let  i21: int;
							let  i28: int;
							if(i19 >= 15 && i20 === 0) {
								i28 = 0;
							} else {
								i21 = await world1.getSavedLightValue(this.field_1299_a, i10 - 1, i27, i11);
								let  i22: int = await world1.getSavedLightValue(this.field_1299_a, i10 + 1, i27, i11);
								let  i23: int = await world1.getSavedLightValue(this.field_1299_a, i10, i27 - 1, i11);
								let  i24: int = await world1.getSavedLightValue(this.field_1299_a, i10, i27 + 1, i11);
								let  i25: int = await world1.getSavedLightValue(this.field_1299_a, i10, i27, i11 - 1);
								let  i26: int = await world1.getSavedLightValue(this.field_1299_a, i10, i27, i11 + 1);
								i28 = i21;
								if(i22 > i21) {
									i28 = i22;
								}

								if(i23 > i28) {
									i28 = i23;
								}

								if(i24 > i28) {
									i28 = i24;
								}

								if(i25 > i28) {
									i28 = i25;
								}

								if(i26 > i28) {
									i28 = i26;
								}

								i28 -= i19;
								if(i28 < 0) {
									i28 = 0;
								}

								if(i20 > i28) {
									i28 = i20;
								}
							}

							if(i16 !== i28) {
								world1.setLightValue(this.field_1299_a, i10, i27, i11, i28);
								i21 = i28 - 1;
								if(i21 < 0) {
									i21 = 0;
								}

								world1.neighborLightPropagationChanged(this.field_1299_a, i10 - 1, i27, i11, i21);
								world1.neighborLightPropagationChanged(this.field_1299_a, i10, i27 - 1, i11, i21);
								world1.neighborLightPropagationChanged(this.field_1299_a, i10, i27, i11 - 1, i21);
								if(i10 + 1 >= this.field_1302_e) {
									world1.neighborLightPropagationChanged(this.field_1299_a, i10 + 1, i27, i11, i21);
								}

								if(i27 + 1 >= this.field_1301_f) {
									world1.neighborLightPropagationChanged(this.field_1299_a, i10, i27 + 1, i11, i21);
								}

								if(i11 + 1 >= this.field_1300_g) {
									world1.neighborLightPropagationChanged(this.field_1299_a, i10, i27, i11 + 1, i21);
								}
							}
						}
					}
				}
			}

		}
	}

	public func_866_a(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int):  boolean {
		if(i1 >= this.field_1298_b && i2 >= this.field_1304_c && i3 >= this.field_1303_d && i4 <= this.field_1302_e && i5 <= this.field_1301_f && i6 <= this.field_1300_g) {
			return true;
		} else {
			let  b7: byte = 1;
			if(i1 >= this.field_1298_b - b7 && i2 >= this.field_1304_c - b7 && i3 >= this.field_1303_d - b7 && i4 <= this.field_1302_e + b7 && i5 <= this.field_1301_f + b7 && i6 <= this.field_1300_g + b7) {
				let  i8: int = this.field_1302_e - this.field_1298_b;
				let  i9: int = this.field_1301_f - this.field_1304_c;
				let  i10: int = this.field_1300_g - this.field_1303_d;
				if(i1 > this.field_1298_b) {
					i1 = this.field_1298_b;
				}

				if(i2 > this.field_1304_c) {
					i2 = this.field_1304_c;
				}

				if(i3 > this.field_1303_d) {
					i3 = this.field_1303_d;
				}

				if(i4 < this.field_1302_e) {
					i4 = this.field_1302_e;
				}

				if(i5 < this.field_1301_f) {
					i5 = this.field_1301_f;
				}

				if(i6 < this.field_1300_g) {
					i6 = this.field_1300_g;
				}

				let  i11: int = i4 - i1;
				let  i12: int = i5 - i2;
				let  i13: int = i6 - i3;
				let  i14: int = i8 * i9 * i10;
				let  i15: int = i11 * i12 * i13;
				if(i15 - i14 <= 2) {
					this.field_1298_b = i1;
					this.field_1304_c = i2;
					this.field_1303_d = i3;
					this.field_1302_e = i4;
					this.field_1301_f = i5;
					this.field_1300_g = i6;
					return true;
				}
			}

			return false;
		}
	}
}
