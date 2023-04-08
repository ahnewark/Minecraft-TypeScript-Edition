


import { Vec3D } from "./Vec3D";
import { MovingObjectPosition } from "./MovingObjectPosition";

export  class AxisAlignedBB {
	private static boundingBoxes: AxisAlignedBB[];
	private static numBoundingBoxesInUse:  number = 0;
	public minX:  number;
	public minY:  number;
	public minZ:  number;
	public maxX:  number;
	public maxY:  number;
	public maxZ:  number;

	public static getBoundingBox(d0: number, d2: number, d4: number, d6: number, d8: number, d10: number):  AxisAlignedBB {
		return new  AxisAlignedBB(d0, d2, d4, d6, d8, d10);
	}

	public static clearBoundingBoxPool():  void {
		AxisAlignedBB.numBoundingBoxesInUse = 0;
	}

	public static getBoundingBoxFromPool(d0: number, d2: number, d4: number, d6: number, d8: number, d10: number):  AxisAlignedBB {
		if(AxisAlignedBB.numBoundingBoxesInUse >= AxisAlignedBB.boundingBoxes.length) {
			AxisAlignedBB.boundingBoxes.push(AxisAlignedBB.getBoundingBox(0.0, 0.0, 0.0, 0.0, 0.0, 0.0));
		}

		return AxisAlignedBB.boundingBoxes[AxisAlignedBB.numBoundingBoxesInUse++].setBounds(d0, d2, d4, d6, d8, d10);
	}

	private constructor(d1: number, d3: number, d5: number, d7: number, d9: number, d11: number) {
        this.minX = d1;
		this.minY = d3;
		this.minZ = d5;
		this.maxX = d7;
		this.maxY = d9;
		this.maxZ = d11;
	}

	public setBounds(d1: number, d3: number, d5: number, d7: number, d9: number, d11: number):  AxisAlignedBB {
		this.minX = d1;
		this.minY = d3;
		this.minZ = d5;
		this.maxX = d7;
		this.maxY = d9;
		this.maxZ = d11;
		return this;
	}

	public addCoord(d1: number, d3: number, d5: number):  AxisAlignedBB {
		let  d7: number = this.minX;
		let  d9: number = this.minY;
		let  d11: number = this.minZ;
		let  d13: number = this.maxX;
		let  d15: number = this.maxY;
		let  d17: number = this.maxZ;
		if(d1 < 0.0) {
			d7 += d1;
		}

		if(d1 > 0.0) {
			d13 += d1;
		}

		if(d3 < 0.0) {
			d9 += d3;
		}

		if(d3 > 0.0) {
			d15 += d3;
		}

		if(d5 < 0.0) {
			d11 += d5;
		}

		if(d5 > 0.0) {
			d17 += d5;
		}

		return AxisAlignedBB.getBoundingBoxFromPool(d7, d9, d11, d13, d15, d17);
	}

	public expand(d1: number, d3: number, d5: number):  AxisAlignedBB | null {
		let  d7: number = this.minX - d1;
		let  d9: number = this.minY - d3;
		let  d11: number = this.minZ - d5;
		let  d13: number = this.maxX + d1;
		let  d15: number = this.maxY + d3;
		let  d17: number = this.maxZ + d5;
		return AxisAlignedBB.getBoundingBoxFromPool(d7, d9, d11, d13, d15, d17);
	}

	public getOffsetBoundingBox(d1: number, d3: number, d5: number):  AxisAlignedBB {
		return AxisAlignedBB.getBoundingBoxFromPool(this.minX + d1, this.minY + d3, this.minZ + d5, this.maxX + d1, this.maxY + d3, this.maxZ + d5);
	}

	public calculateXOffset(axisAlignedBB1: AxisAlignedBB, d2: number):  number {
		if(axisAlignedBB1.maxY > this.minY && axisAlignedBB1.minY < this.maxY) {
			if(axisAlignedBB1.maxZ > this.minZ && axisAlignedBB1.minZ < this.maxZ) {
				let  d4: number;
				if(d2 > 0.0 && axisAlignedBB1.maxX <= this.minX) {
					d4 = this.minX - axisAlignedBB1.maxX;
					if(d4 < d2) {
						d2 = d4;
					}
				}

				if(d2 < 0.0 && axisAlignedBB1.minX >= this.maxX) {
					d4 = this.maxX - axisAlignedBB1.minX;
					if(d4 > d2) {
						d2 = d4;
					}
				}

				return d2;
			} else {
				return d2;
			}
		} else {
			return d2;
		}
	}

	public calculateYOffset(axisAlignedBB1: AxisAlignedBB, d2: number):  number {
		if(axisAlignedBB1.maxX > this.minX && axisAlignedBB1.minX < this.maxX) {
			if(axisAlignedBB1.maxZ > this.minZ && axisAlignedBB1.minZ < this.maxZ) {
				let  d4: number;
				if(d2 > 0.0 && axisAlignedBB1.maxY <= this.minY) {
					d4 = this.minY - axisAlignedBB1.maxY;
					if(d4 < d2) {
						d2 = d4;
					}
				}

				if(d2 < 0.0 && axisAlignedBB1.minY >= this.maxY) {
					d4 = this.maxY - axisAlignedBB1.minY;
					if(d4 > d2) {
						d2 = d4;
					}
				}

				return d2;
			} else {
				return d2;
			}
		} else {
			return d2;
		}
	}

	public calculateZOffset(axisAlignedBB1: AxisAlignedBB, d2: number):  number {
		if(axisAlignedBB1.maxX > this.minX && axisAlignedBB1.minX < this.maxX) {
			if(axisAlignedBB1.maxY > this.minY && axisAlignedBB1.minY < this.maxY) {
				let  d4: number;
				if(d2 > 0.0 && axisAlignedBB1.maxZ <= this.minZ) {
					d4 = this.minZ - axisAlignedBB1.maxZ;
					if(d4 < d2) {
						d2 = d4;
					}
				}

				if(d2 < 0.0 && axisAlignedBB1.minZ >= this.maxZ) {
					d4 = this.maxZ - axisAlignedBB1.minZ;
					if(d4 > d2) {
						d2 = d4;
					}
				}

				return d2;
			} else {
				return d2;
			}
		} else {
			return d2;
		}
	}

	public intersectsWith(axisAlignedBB1: AxisAlignedBB):  boolean {
		return axisAlignedBB1.maxX > this.minX && axisAlignedBB1.minX < this.maxX ? (axisAlignedBB1.maxY > this.minY && axisAlignedBB1.minY < this.maxY ? axisAlignedBB1.maxZ > this.minZ && axisAlignedBB1.minZ < this.maxZ : false) : false;
	}

	public offset(d1: number, d3: number, d5: number):  AxisAlignedBB | null {
		this.minX += d1;
		this.minY += d3;
		this.minZ += d5;
		this.maxX += d1;
		this.maxY += d3;
		this.maxZ += d5;
		return this;
	}

	public isVecInside(vec3D1: Vec3D):  boolean {
		return vec3D1.xCoord > this.minX && vec3D1.xCoord < this.maxX ? (vec3D1.yCoord > this.minY && vec3D1.yCoord < this.maxY ? vec3D1.zCoord > this.minZ && vec3D1.zCoord < this.maxZ : false) : false;
	}

	public getAverageEdgeLength():  number {
		let  d1: number = this.maxX - this.minX;
		let  d3: number = this.maxY - this.minY;
		let  d5: number = this.maxZ - this.minZ;
		return (d1 + d3 + d5) / 3.0;
	}

	public copy():  AxisAlignedBB | null {
		return AxisAlignedBB.getBoundingBoxFromPool(this.minX, this.minY, this.minZ, this.maxX, this.maxY, this.maxZ);
	}

	public func_1169_a(vec3D1: Vec3D, vec3D2: Vec3D):  MovingObjectPosition | null {
		let  vec3D3: Vec3D | null = vec3D1.getIntermediateWithXValue(vec3D2, this.minX);
		let  vec3D4: Vec3D | null = vec3D1.getIntermediateWithXValue(vec3D2, this.maxX);
		let  vec3D5: Vec3D | null = vec3D1.getIntermediateWithYValue(vec3D2, this.minY);
		let  vec3D6: Vec3D | null = vec3D1.getIntermediateWithYValue(vec3D2, this.maxY);
		let  vec3D7: Vec3D | null = vec3D1.getIntermediateWithZValue(vec3D2, this.minZ);
		let  vec3D8: Vec3D | null= vec3D1.getIntermediateWithZValue(vec3D2, this.maxZ);
		if(!this.isVecInYZ(vec3D3)) {
			vec3D3 = null;
		}

		if(!this.isVecInYZ(vec3D4)) {
			vec3D4 = null;
		}

		if(!this.isVecInXZ(vec3D5)) {
			vec3D5 = null;
		}

		if(!this.isVecInXZ(vec3D6)) {
			vec3D6 = null;
		}

		if(!this.isVecInXY(vec3D7)) {
			vec3D7 = null;
		}

		if(!this.isVecInXY(vec3D8)) {
			vec3D8 = null;
		}

		let  vec3D9: Vec3D | null = null;
		if(vec3D3 !== null && (vec3D9 === null || vec3D1.squareDistanceTo(vec3D3) < vec3D1.squareDistanceTo(vec3D9))) {
			vec3D9 = vec3D3;
		}

		if(vec3D4 !== null && (vec3D9 === null || vec3D1.squareDistanceTo(vec3D4) < vec3D1.squareDistanceTo(vec3D9))) {
			vec3D9 = vec3D4;
		}

		if(vec3D5 !== null && (vec3D9 === null || vec3D1.squareDistanceTo(vec3D5) < vec3D1.squareDistanceTo(vec3D9))) {
			vec3D9 = vec3D5;
		}

		if(vec3D6 !== null && (vec3D9 === null || vec3D1.squareDistanceTo(vec3D6) < vec3D1.squareDistanceTo(vec3D9))) {
			vec3D9 = vec3D6;
		}

		if(vec3D7 !== null && (vec3D9 === null || vec3D1.squareDistanceTo(vec3D7) < vec3D1.squareDistanceTo(vec3D9))) {
			vec3D9 = vec3D7;
		}

		if(vec3D8 !== null && (vec3D9 === null || vec3D1.squareDistanceTo(vec3D8) < vec3D1.squareDistanceTo(vec3D9))) {
			vec3D9 = vec3D8;
		}

		if(vec3D9 === null) {
			return null;
		} else {
			let  b10: number = -1;
			if(vec3D9 === vec3D3) {
				b10 = 4;
			}

			if(vec3D9 === vec3D4) {
				b10 = 5;
			}

			if(vec3D9 === vec3D5) {
				b10 = 0;
			}

			if(vec3D9 === vec3D6) {
				b10 = 1;
			}

			if(vec3D9 === vec3D7) {
				b10 = 2;
			}

			if(vec3D9 === vec3D8) {
				b10 = 3;
			}

			return new  MovingObjectPosition(0, 0, 0, b10, vec3D9);
		}
	}

	private isVecInYZ(vec3D1: Vec3D| null):  boolean {
		return vec3D1 === null ? false : vec3D1.yCoord >= this.minY && vec3D1.yCoord <= this.maxY && vec3D1.zCoord >= this.minZ && vec3D1.zCoord <= this.maxZ;
	}

	private isVecInXZ(vec3D1: Vec3D| null):  boolean {
		return vec3D1 === null ? false : vec3D1.xCoord >= this.minX && vec3D1.xCoord <= this.maxX && vec3D1.zCoord >= this.minZ && vec3D1.zCoord <= this.maxZ;
	}

	private isVecInXY(vec3D1: Vec3D| null):  boolean {
		return vec3D1 === null ? false : vec3D1.xCoord >= this.minX && vec3D1.xCoord <= this.maxX && vec3D1.yCoord >= this.minY && vec3D1.yCoord <= this.maxY;
	}

	public setBB(axisAlignedBB1: AxisAlignedBB):  void {
		this.minX = axisAlignedBB1.minX;
		this.minY = axisAlignedBB1.minY;
		this.minZ = axisAlignedBB1.minZ;
		this.maxX = axisAlignedBB1.maxX;
		this.maxY = axisAlignedBB1.maxY;
		this.maxZ = axisAlignedBB1.maxZ;
	}

	public toString(): string {
		return "box[" + this.minX + ", " + this.minY + ", " + this.minZ + " -> " + this.maxX + ", " + this.maxY + ", " + this.maxZ + "]";
	}
}
