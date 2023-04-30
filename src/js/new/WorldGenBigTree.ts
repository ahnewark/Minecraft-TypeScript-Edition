import { byte, java, int, double, float, long } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { Random } from "../jree/java/util/Random";
import { Block } from "./Block";

export class WorldGenBigTree extends WorldGenerator {
	protected static readonly axisConversionArray   = [2, 0, 0, 1, 2, 1];
	protected rnd: Random | undefined = new  Random();
	protected thisLevel: World | undefined;
	protected origin = [0,0,0];
	protected height: int = 0;
	protected trunkHeight: int;
	protected trunkHeightScale: double = 0.618;
	protected branchDensity: double = 1.0;
	protected branchSlope: double = 0.381;
	protected widthScale: double = 1.0;
	protected foliageDensity: double = 1.0;
	protected trunkWidth: int = 1;
	protected heightVariance: int = 12;
	protected foliageHeight: int = 4;
	protected foliageCoords: number[][] = [];

	protected async prepare(): Promise<void> {
		this.trunkHeight = Math.floor(this.height  * this.trunkHeightScale);
		if(this.trunkHeight >= this.height) {
			this.trunkHeight = this.height - 1;
		}

		let  clustersPerY: int = Math.floor(1.382 + java.lang.Math.pow(this.foliageDensity * this.height  / 13.0, 2.0));
		if(clustersPerY < 1) {
			clustersPerY = 1;
		}

	
		let  tempFoliageCoords: number[][] = [];
		// let  tempFoliageCoords: number[][] = new Array<Array<number>>(clustersPerY * this.height).fill(new Array<number>(4).fill(0));
		// // int[][] i2 = new int[i1 * this.field_878_e][4];

		let  y: int = this.origin[1] + this.height - this.foliageHeight;
		let  clusterCount: int = 1;
		let  trunkTop: int = this.origin[1] + this.trunkHeight;
		let  relativeY: int = y - this.origin[1];
		// tempFoliageCoords[0][0] = this.origin[0];
		// tempFoliageCoords[0][1] = y;
		// tempFoliageCoords[0][2] = this.origin[2];
		// tempFoliageCoords[0][3] = trunkTop;
		tempFoliageCoords.push([this.origin[0], y, this.origin[2], trunkTop])
		--y;

		while(true) {
			while(relativeY >= 0) {
				let  num: int = 0;
				let  shapefac: float = this.treeShape(relativeY);
				if(shapefac < 0.0) {
					--y;
					--relativeY;
				} else {
					for(let  originOffset: double = 0.5; num < clustersPerY; ++num) {
						let  radius: double = this.widthScale * (shapefac  * (this.rnd.nextFloat()  + 0.328));
						let  angle: double = this.rnd.nextFloat()  * 2.0 * 3.14159;
						let  x: int = Math.floor(radius * java.lang.Math.sin(angle) + this.origin[0] + originOffset);
						let  z: int = Math.floor(radius * java.lang.Math.cos(angle) + this.origin[2] + originOffset);
						let  checkStart =  [x, y, z];
						let  checkEnd =  [x, y + this.foliageHeight, z];
						if(await this.checkLine(checkStart, checkEnd) === -1) {
							let  checkBranchBase =  [this.origin[0], this.origin[1], this.origin[2]];
							let  distance: double = java.lang.Math.sqrt(java.lang.Math.pow(java.lang.Math.abs(this.origin[0] - checkStart[0]) , 2.0) + java.lang.Math.pow(java.lang.Math.abs(this.origin[2] - checkStart[2]) , 2.0));
							let  branchHeight: double = distance * this.branchSlope;
							if(checkStart[1] - branchHeight > trunkTop) {
								checkBranchBase[1] = trunkTop;
							} else {
								checkBranchBase[1] = Math.floor(checkStart[1] - branchHeight);
							}

							if(await this.checkLine(checkBranchBase, checkStart) === -1) {
								// tempFoliageCoords[clusterCount][0] = x;
								// tempFoliageCoords[clusterCount][1] = y;
								// tempFoliageCoords[clusterCount][2] = z;
								// tempFoliageCoords[clusterCount][3] = checkBranchBase[1];
								tempFoliageCoords.push([x, y, z, checkBranchBase[1]])
								++clusterCount;
							}
						}
					}

					--y;
					--relativeY;
				}
			}

			this.foliageCoords = [];
			//this.foliageCoords = tempFoliageCoords
			java.lang.System.arraycopy(tempFoliageCoords, 0, this.foliageCoords, 0, clusterCount);
			return;
		}
	}

	protected async crossection(x: int, y: int, z: int, radius: float, direction: byte, material: int): Promise<void> {
		let  rad: int = Math.floor(radius  + 0.618);
		let  secidx1: byte = WorldGenBigTree.axisConversionArray[direction];
		let  secidx2: byte = WorldGenBigTree.axisConversionArray[direction + 3];
		let  center =  [x, y, z];
		let  position =  [0, 0, 0];
		let  offset1: int = -rad;
		let  offset2: int = -rad;

		label32:
		for(position[direction] = center[direction]; offset1 <= rad; ++offset1) {
			position[secidx1] = center[secidx1] + offset1;
			offset2 = -rad;

			while(true) {
				while(true) {
					if(offset2 > rad) {
						continue label32;
					}

					let  thisdistance: double = java.lang.Math.sqrt(java.lang.Math.pow(java.lang.Math.abs(offset1)  + 0.5, 2.0) + java.lang.Math.pow(java.lang.Math.abs(offset2)  + 0.5, 2.0));
					if(thisdistance > radius) {
						++offset2;
					} else {
						position[secidx2] = center[secidx2] + offset2;
						let  thisMat: int = await this.thisLevel.getBlockId(position[0], position[1], position[2]);
						if(thisMat !== 0 && thisMat !== Block.leaves.blockID) {
							++offset2;
						} else {
							await this.thisLevel.setBlock(position[0], position[1], position[2], material);
							++offset2;
						}
					}
				}
			}
		}

	}

	protected treeShape(y: int): float {
		if(y < (this.height) * 0.3) {
			return -1.618;
		} else {
			let  radius: float = this.height / 2.0;
			let  adjacent: float = this.height / 2.0 - y;
			let  distance: float;
			if(adjacent === 0.0) {
				distance = radius;
			} else if(java.lang.Math.abs(adjacent) >= radius) {
				distance = 0.0;
			} else {
				distance = java.lang.Math.sqrt(java.lang.Math.pow(java.lang.Math.abs(radius), 2.0) - java.lang.Math.pow(java.lang.Math.abs(adjacent), 2.0));
			}

			distance *= 0.5;
			return distance;
		}
	}

	protected foliageShape(y: int): float {
		return y >= 0 && y < this.foliageHeight ? (y !== 0 && y !== this.foliageHeight - 1 ? 3.0 : 2.0) : -1.0;
	}

	protected async foliageCluster(x: int, y: int, z: int): Promise<void> {
		let  cury: int = y;

		for(let  topy: int = y + this.foliageHeight; cury < topy; ++cury) {
			let  radius: float = this.foliageShape(cury - y);
			await this.crossection(x, cury, z, radius, 1 as byte, Block.leaves.blockID);
		}

	}

	protected async limb(start: number[], end: number[], material: int): Promise<void> {
		let  delta =  [0, 0, 0];
		let  idx: byte = 0;

		let  primidx: byte;
		for(primidx = 0; idx < 3; ++idx) {
			delta[idx] = end[idx] - start[idx];
			if(java.lang.Math.abs(delta[idx]) > java.lang.Math.abs(delta[primidx])) {
				primidx = idx;
			}
		}

		if(delta[primidx] !== 0) {
			let  secidx1: byte = WorldGenBigTree.axisConversionArray[primidx];
			let  secidx2: byte = WorldGenBigTree.axisConversionArray[primidx + 3];
			let  primsign: byte;
			if(delta[primidx] > 0) {
				primsign = 1;
			} else {
				primsign = -1;
			}

			let  secfac1: double = delta[secidx1] / delta[primidx];
			let  secfac2: double = delta[secidx2] / delta[primidx];
			let  coordinate =  [0, 0, 0];
			let  primoffset: int = 0;

			// console.error("this function is broken.")
			for(let  endoffset: int = delta[primidx] + primsign; primoffset !== endoffset; primoffset += primsign) {
				coordinate[primidx] = MathHelper.floor_double((start[primidx] + primoffset) + 0.5);
				coordinate[secidx1] = MathHelper.floor_double(start[secidx1] + primoffset * secfac1 + 0.5);
				coordinate[secidx2] = MathHelper.floor_double(start[secidx2] + primoffset * secfac2 + 0.5);
				await this.thisLevel.setBlock(coordinate[0], coordinate[1], coordinate[2], material);
			}

		}
	}

	protected async makeFoliage(): Promise<void> {
		let  idx: int = 0;
		for(let  finish: int = this.foliageCoords.length; idx < finish; ++idx) {
			let  x: int = this.foliageCoords[idx][0];
			let  y: int = this.foliageCoords[idx][1];
			let  z: int = this.foliageCoords[idx][2];
			await this.foliageCluster(x, y, z);
		}

	}

	protected trimBranches(localY: int): boolean {
		return localY >= this.height * 0.2;
	}

	protected async makeTrunk(): Promise<void> {
		let  x: int = this.origin[0];
		let  startY: int = this.origin[1];
		let  topY: int = this.origin[1] + this.trunkHeight;
		let  z: int = this.origin[2];
		let  startCoord =  [x, startY, z];
		let  endCoord =  [x, topY, z];
		await this.limb(startCoord, endCoord, 17);
		if(this.trunkWidth === 2) {
			++startCoord[0];
			++endCoord[0];
			await this.limb(startCoord, endCoord, 17);
			++startCoord[2];
			++endCoord[2];
			await this.limb(startCoord, endCoord, 17);
			startCoord[0] += -1;
			endCoord[0] += -1;
			await this.limb(startCoord, endCoord, 17);
		}

	}

	protected async makeBranches(): Promise<void> {
		let  idx: int = 0;
		let  finish: int = this.foliageCoords.length;

		for(let  baseCoord =  [this.origin[0], this.origin[1], this.origin[2]]; idx < finish; ++idx) {
			let  coordValues = this.foliageCoords[idx];
			let  endCoord =  [coordValues[0], coordValues[1], coordValues[2]];
			baseCoord[1] = coordValues[3];
			let  localY: int = baseCoord[1] - this.origin[1];
			if(this.trimBranches(localY)) {
				await this.limb(baseCoord, endCoord, Block.wood.blockID);
			}
		}

	}

	protected async checkLine(start: number[], end: number[]): Promise<int> {
		let  delta =  [0, 0, 0];
		let  idx: byte = 0;

		let  primidx: byte;
		for(primidx = 0; idx < 3; ++idx) {
			delta[idx] = end[idx] - start[idx];
			if(java.lang.Math.abs(delta[idx]) > java.lang.Math.abs(delta[primidx])) {
				primidx = idx;
			}
		}

		if(delta[primidx] === 0) {
			return -1;
		} else {
			let  secidx1: byte = WorldGenBigTree.axisConversionArray[primidx];
			let  secidx2: byte = WorldGenBigTree.axisConversionArray[primidx + 3];
			let  primsign: byte;
			if(delta[primidx] > 0) {
				primsign = 1;
			} else {
				primsign = -1;
			}

			let  secfac1 = delta[secidx1] / delta[primidx];
			let  secfac2: double = delta[secidx2]  / delta[primidx] ;
			let  coordinate =  [0, 0, 0];
			let  primoffset: int = 0;

			let  endoffset: int;
			for(endoffset = delta[primidx] + primsign; primoffset !== endoffset; primoffset += primsign) {
				coordinate[primidx] = start[primidx] + primoffset;
				coordinate[secidx1] = Math.floor(start[secidx1]  + primoffset  * secfac1);
				coordinate[secidx2] = Math.floor(start[secidx2]  + primoffset  * secfac2);
				let  thisMat: int = await this.thisLevel.getBlockId(coordinate[0], coordinate[1], coordinate[2]);
				if(thisMat !== 0 && thisMat !== 18) {
					break;
				}
			}

			return primoffset === endoffset ? -1 : java.lang.Math.abs(primoffset);
		}
	}

	protected async checkLocation(): Promise<boolean> {
		let  startPosition =  [this.origin[0], this.origin[1], this.origin[2]];
		let  endPosition =  [this.origin[0], this.origin[1] + this.height - 1, this.origin[2]];
		let  tile: int = await this.thisLevel.getBlockId(this.origin[0], this.origin[1] - 1, this.origin[2]);
		if(tile !== Block.dirt.blockID && tile !== Block.grass.blockID) {
			return false;
		} else {
			let  allowedHeight: int = await this.checkLine(startPosition, endPosition);
			if(allowedHeight === -1) {
				return true;
			} else if(allowedHeight < 6) {
				return false;
			} else {
				this.height = allowedHeight;
				return true;
			}
		}
	}

	public init(heightInit: double, widthInit: double, foliageDensityInit: double):  void {
		this.heightVariance = Math.floor(heightInit * 12.0);
		if(heightInit > 0.5) {
			this.foliageHeight = 5;
		}

		this.widthScale = widthInit;
		this.foliageDensity = foliageDensityInit;
	}

	public async generate(world1: World| undefined, random2: Random| undefined, x: int, y: int, z: int):  Promise<boolean> {
		this.thisLevel = world1;
		let  seed: long = random2.nextLong();
		this.rnd.setSeed(seed);
		this.origin[0] = x;
		this.origin[1] = y;
		this.origin[2] = z;
		if(this.height === 0) {
			this.height = 5 + this.rnd.nextInt(this.heightVariance);
		}

		if(!await this.checkLocation()) {
			return false;
		} else {
			await this.prepare();
			await this.makeFoliage();
			await this.makeTrunk();
			await this.makeBranches();
			return true;
		}
	}
}
