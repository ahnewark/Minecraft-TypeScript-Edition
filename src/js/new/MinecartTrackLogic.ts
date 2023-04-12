import { JavaObject, int, java, byte } from "../jree/index";
import { World } from "./World";
import { ChunkPosition } from "./ChunkPosition";
import { BlockMinecartTrack } from "./BlockMinecartTrack";

export class MinecartTrackLogic {
	private worldObj:  World | null;
	private trackX:  int;
	private trackY:  int;
	private trackZ:  int;
	private trackMetadata:  int;
	private connectedTracks:  ChunkPosition[] = [];
	protected minecartTrack:  BlockMinecartTrack | null;

	public static async Construct(blockMinecartTrack1: BlockMinecartTrack| null, world2: World| null, i3: int, i4: int, i5: int) {
		const _this = new MinecartTrackLogic();
		_this.minecartTrack = blockMinecartTrack1;
		_this.connectedTracks = [];
		_this.worldObj = world2;
		_this.trackX = i3;
		_this.trackY = i4;
		_this.trackZ = i5;
		_this.trackMetadata = await world2.getBlockMetadata(i3, i4, i5);
		_this.calculateConnectedTracks();
		return _this;
	}

	private calculateConnectedTracks():  void {
		this.connectedTracks = [];
		if(this.trackMetadata === 0) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ - 1));
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ + 1));
		} else if(this.trackMetadata === 1) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX - 1, this.trackY, this.trackZ));
			this.connectedTracks.push(new  ChunkPosition(this.trackX + 1, this.trackY, this.trackZ));
		} else if(this.trackMetadata === 2) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX - 1, this.trackY, this.trackZ));
			this.connectedTracks.push(new  ChunkPosition(this.trackX + 1, this.trackY + 1, this.trackZ));
		} else if(this.trackMetadata === 3) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX - 1, this.trackY + 1, this.trackZ));
			this.connectedTracks.push(new  ChunkPosition(this.trackX + 1, this.trackY, this.trackZ));
		} else if(this.trackMetadata === 4) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY + 1, this.trackZ - 1));
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ + 1));
		} else if(this.trackMetadata === 5) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ - 1));
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY + 1, this.trackZ + 1));
		} else if(this.trackMetadata === 6) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX + 1, this.trackY, this.trackZ));
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ + 1));
		} else if(this.trackMetadata === 7) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX - 1, this.trackY, this.trackZ));
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ + 1));
		} else if(this.trackMetadata === 8) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX - 1, this.trackY, this.trackZ));
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ - 1));
		} else if(this.trackMetadata === 9) {
			this.connectedTracks.push(new  ChunkPosition(this.trackX + 1, this.trackY, this.trackZ));
			this.connectedTracks.push(new  ChunkPosition(this.trackX, this.trackY, this.trackZ - 1));
		}

	}

	private async func_785_b():  Promise<void> {
		for(let  i1: int = 0; i1 < this.connectedTracks.length; ++i1) {
			let  minecartTrackLogic2: MinecartTrackLogic = await this.getMinecartTrackLogic(this.connectedTracks[i1] as ChunkPosition);
			if(minecartTrackLogic2 !== null && minecartTrackLogic2.isConnectedTo(this)) {
				this.connectedTracks[i1] = new  ChunkPosition(minecartTrackLogic2.trackX, minecartTrackLogic2.trackY, minecartTrackLogic2.trackZ);
			} else {
				this.connectedTracks.splice(i1--, 1);
			}
		}

	}

	private async isMinecartTrack(i1: int, i2: int, i3: int):  Promise<boolean> {
		return await this.worldObj.getBlockId(i1, i2, i3) === this.minecartTrack.blockID ? true : (await this.worldObj.getBlockId(i1, i2 + 1, i3) === this.minecartTrack.blockID ? true : await this.worldObj.getBlockId(i1, i2 - 1, i3) === this.minecartTrack.blockID);
	}

	private async getMinecartTrackLogic(chunkPosition1: ChunkPosition| null):  Promise<MinecartTrackLogic | null> {
		return (await this.worldObj.getBlockId(chunkPosition1.x, chunkPosition1.y, chunkPosition1.z)) === this.minecartTrack.blockID ?  await MinecartTrackLogic.Construct(this.minecartTrack, this.worldObj, chunkPosition1.x, chunkPosition1.y, chunkPosition1.z) : (await this.worldObj.getBlockId(chunkPosition1.x, chunkPosition1.y + 1, chunkPosition1.z) === this.minecartTrack.blockID ?  await MinecartTrackLogic.Construct(this.minecartTrack, this.worldObj, chunkPosition1.x, chunkPosition1.y + 1, chunkPosition1.z) : (await this.worldObj.getBlockId(chunkPosition1.x, chunkPosition1.y - 1, chunkPosition1.z) === this.minecartTrack.blockID ?  await MinecartTrackLogic.Construct(this.minecartTrack, this.worldObj, chunkPosition1.x, chunkPosition1.y - 1, chunkPosition1.z) : null));
	}

	private isConnectedTo(minecartTrackLogic1: MinecartTrackLogic| null):  boolean {
		for(let  i2: int = 0; i2 < this.connectedTracks.length; ++i2) {
			let  chunkPosition3: ChunkPosition = this.connectedTracks[i2] as ChunkPosition;
			if(chunkPosition3.x === minecartTrackLogic1.trackX && chunkPosition3.z === minecartTrackLogic1.trackZ) {
				return true;
			}
		}

		return false;
	}

	private func_794_b(i1: int, i2: int, i3: int):  boolean {
		for(let  i4: int = 0; i4 < this.connectedTracks.length; ++i4) {
			let  chunkPosition5: ChunkPosition = this.connectedTracks[i4] as ChunkPosition;
			if(chunkPosition5.x === i1 && chunkPosition5.z === i3) {
				return true;
			}
		}

		return false;
	}

	private getAdjacentTracks():  int {
		let  i1: int = 0;
		if(this.isMinecartTrack(this.trackX, this.trackY, this.trackZ - 1)) {
			++i1;
		}

		if(this.isMinecartTrack(this.trackX, this.trackY, this.trackZ + 1)) {
			++i1;
		}

		if(this.isMinecartTrack(this.trackX - 1, this.trackY, this.trackZ)) {
			++i1;
		}

		if(this.isMinecartTrack(this.trackX + 1, this.trackY, this.trackZ)) {
			++i1;
		}

		return i1;
	}

	private handleKeyPress(minecartTrackLogic1: MinecartTrackLogic| null):  boolean {
		if(this.isConnectedTo(minecartTrackLogic1)) {
			return true;
		} else if(this.connectedTracks.length === 2) {
			return false;
		} else if(this.connectedTracks.length === 0) {
			return true;
		} else {
			let  chunkPosition2: ChunkPosition = this.connectedTracks[0] as ChunkPosition;
			return minecartTrackLogic1.trackY === this.trackY && chunkPosition2.y === this.trackY ? true : true;
		}
	}

	private async func_788_d(minecartTrackLogic1: MinecartTrackLogic| null): Promise<void> {
		this.connectedTracks.push(new  ChunkPosition(minecartTrackLogic1.trackX, minecartTrackLogic1.trackY, minecartTrackLogic1.trackZ));
		let  z2: boolean = this.func_794_b(this.trackX, this.trackY, this.trackZ - 1);
		let  z3: boolean = this.func_794_b(this.trackX, this.trackY, this.trackZ + 1);
		let  z4: boolean = this.func_794_b(this.trackX - 1, this.trackY, this.trackZ);
		let  z5: boolean = this.func_794_b(this.trackX + 1, this.trackY, this.trackZ);
		let  b6: byte = -1;
		if(z2 || z3) {
			b6 = 0;
		}

		if(z4 || z5) {
			b6 = 1;
		}

		if(z3 && z5 && !z2 && !z4) {
			b6 = 6;
		}

		if(z3 && z4 && !z2 && !z5) {
			b6 = 7;
		}

		if(z2 && z4 && !z3 && !z5) {
			b6 = 8;
		}

		if(z2 && z5 && !z3 && !z4) {
			b6 = 9;
		}

		if(b6 === 0) {
			if(await this.worldObj.getBlockId(this.trackX, this.trackY + 1, this.trackZ - 1) === this.minecartTrack.blockID) {
				b6 = 4;
			}

			if(await this.worldObj.getBlockId(this.trackX, this.trackY + 1, this.trackZ + 1) === this.minecartTrack.blockID) {
				b6 = 5;
			}
		}

		if(b6 === 1) {
			if(await this.worldObj.getBlockId(this.trackX + 1, this.trackY + 1, this.trackZ) === this.minecartTrack.blockID) {
				b6 = 2;
			}

			if(await this.worldObj.getBlockId(this.trackX - 1, this.trackY + 1, this.trackZ) === this.minecartTrack.blockID) {
				b6 = 3;
			}
		}

		if(b6 < 0) {
			b6 = 0;
		}

		await this.worldObj.setBlockMetadataWithNotify(this.trackX, this.trackY, this.trackZ, b6);
	}

	private async func_786_c(i1: int, i2: int, i3: int):  Promise<boolean> {
		let  minecartTrackLogic4: MinecartTrackLogic = await this.getMinecartTrackLogic(new  ChunkPosition(i1, i2, i3));
		if(minecartTrackLogic4 === null) {
			return false;
		} else {
			await minecartTrackLogic4.func_785_b();
			return minecartTrackLogic4.handleKeyPress(this);
		}
	}

	public async func_792_a(z1: boolean): Promise<void> {
		let  z2: boolean = await this.func_786_c(this.trackX, this.trackY, this.trackZ - 1);
		let  z3: boolean = await this.func_786_c(this.trackX, this.trackY, this.trackZ + 1);
		let  z4: boolean = await this.func_786_c(this.trackX - 1, this.trackY, this.trackZ);
		let  z5: boolean = await this.func_786_c(this.trackX + 1, this.trackY, this.trackZ);
		let  b6: byte = -1;
		if((z2 || z3) && !z4 && !z5) {
			b6 = 0;
		}

		if((z4 || z5) && !z2 && !z3) {
			b6 = 1;
		}

		if(z3 && z5 && !z2 && !z4) {
			b6 = 6;
		}

		if(z3 && z4 && !z2 && !z5) {
			b6 = 7;
		}

		if(z2 && z4 && !z3 && !z5) {
			b6 = 8;
		}

		if(z2 && z5 && !z3 && !z4) {
			b6 = 9;
		}

		if(b6 === -1) {
			if(z2 || z3) {
				b6 = 0;
			}

			if(z4 || z5) {
				b6 = 1;
			}

			if(z1) {
				if(z3 && z5) {
					b6 = 6;
				}

				if(z4 && z3) {
					b6 = 7;
				}

				if(z5 && z2) {
					b6 = 9;
				}

				if(z2 && z4) {
					b6 = 8;
				}
			} else {
				if(z2 && z4) {
					b6 = 8;
				}

				if(z5 && z2) {
					b6 = 9;
				}

				if(z4 && z3) {
					b6 = 7;
				}

				if(z3 && z5) {
					b6 = 6;
				}
			}
		}

		if(b6 === 0) {
			if(await this.worldObj.getBlockId(this.trackX, this.trackY + 1, this.trackZ - 1) === this.minecartTrack.blockID) {
				b6 = 4;
			}

			if(await this.worldObj.getBlockId(this.trackX, this.trackY + 1, this.trackZ + 1) === this.minecartTrack.blockID) {
				b6 = 5;
			}
		}

		if(b6 === 1) {
			if(await this.worldObj.getBlockId(this.trackX + 1, this.trackY + 1, this.trackZ) === this.minecartTrack.blockID) {
				b6 = 2;
			}

			if(await this.worldObj.getBlockId(this.trackX - 1, this.trackY + 1, this.trackZ) === this.minecartTrack.blockID) {
				b6 = 3;
			}
		}

		if(b6 < 0) {
			b6 = 0;
		}

		this.trackMetadata = b6;
		this.calculateConnectedTracks();
		await this.worldObj.setBlockMetadataWithNotify(this.trackX, this.trackY, this.trackZ, b6);

		for(let  i7: int = 0; i7 < this.connectedTracks.length; ++i7) {
			let  minecartTrackLogic8: MinecartTrackLogic = await this.getMinecartTrackLogic(this.connectedTracks[i7] as ChunkPosition);
			if(minecartTrackLogic8 !== null) {
				await minecartTrackLogic8.func_785_b();
				if(minecartTrackLogic8.handleKeyPress(this)) {
					await minecartTrackLogic8.func_788_d(this);
				}
			}
		}

	}

	public static getNAdjacentTracks(minecartTrackLogic0: MinecartTrackLogic| null):  int {
		return minecartTrackLogic0.getAdjacentTracks();
	}
}
