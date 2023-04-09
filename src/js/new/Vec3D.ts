


import { java, S } from "../jree/index";
import { MathHelper } from "./MathHelper";

export class Vec3D {
	private static vectorList:  Vec3D[];
	private static nextVector:  number = 0;
	public xCoord:  number;
	public yCoord:  number;
	public zCoord:  number;

	public static createVectorHelper(d0: number, d2: number, d4: number):  Vec3D {
		return new  Vec3D(d0, d2, d4);
	}

	public static initialize():  void {
		Vec3D.nextVector = 0;
	}

	public static createVector(d0: number, d2: number, d4: number):  Vec3D {
		if(Vec3D.nextVector >= Vec3D.vectorList.length) {
			Vec3D.vectorList.push(Vec3D.createVectorHelper(0.0, 0.0, 0.0));
		}

		return (Vec3D.vectorList[Vec3D.nextVector++]).setComponents(d0, d2, d4);
	}

	private constructor(d1: number, d3: number, d5: number) {
        if(d1 === -0.0) {
			d1 = 0.0;
		}

		if(d3 === -0.0) {
			d3 = 0.0;
		}

		if(d5 === -0.0) {
			d5 = 0.0;
		}

		this.xCoord = d1;
		this.yCoord = d3;
		this.zCoord = d5;
	}

	private setComponents(d1: number, d3: number, d5: number):  Vec3D {
		this.xCoord = d1;
		this.yCoord = d3;
		this.zCoord = d5;
		return this;
	}

	public subtract(vec3D1: Vec3D):  Vec3D {
		return Vec3D.createVector(vec3D1.xCoord - this.xCoord, vec3D1.yCoord - this.yCoord, vec3D1.zCoord - this.zCoord);
	}

	public normalize():  Vec3D {
		let  d1: number = MathHelper.sqrt_double(this.xCoord * this.xCoord + this.yCoord * this.yCoord + this.zCoord * this.zCoord) as number;
		return d1 < 1.0E-4 ? Vec3D.createVector(0.0, 0.0, 0.0) : Vec3D.createVector(this.xCoord / d1, this.yCoord / d1, this.zCoord / d1);
	}

	public crossProduct(vec3D1: Vec3D):  Vec3D {
		return Vec3D.createVector(this.yCoord * vec3D1.zCoord - this.zCoord * vec3D1.yCoord, this.zCoord * vec3D1.xCoord - this.xCoord * vec3D1.zCoord, this.xCoord * vec3D1.yCoord - this.yCoord * vec3D1.xCoord);
	}

	public addVector(d1: number, d3: number, d5: number):  Vec3D {
		return Vec3D.createVector(this.xCoord + d1, this.yCoord + d3, this.zCoord + d5);
	}

	public distanceTo(vec3D1: Vec3D):  number {
		let  d2: number = vec3D1.xCoord - this.xCoord;
		let  d4: number = vec3D1.yCoord - this.yCoord;
		let  d6: number = vec3D1.zCoord - this.zCoord;
		return MathHelper.sqrt_double(d2 * d2 + d4 * d4 + d6 * d6) as number;
	}

	public squareDistanceTo(vec3D1: Vec3D| null):  number;

	public squareDistanceTo(d1: number, d3: number, d5: number):  number;
public squareDistanceTo(...args: unknown[]):  number {
		switch (args.length) {
			case 1: {
				const [vec3D1] = args as [Vec3D];

                let  d2: number = vec3D1.xCoord - this.xCoord;
                let  d4: number = vec3D1.yCoord - this.yCoord;
                let  d6: number = vec3D1.zCoord - this.zCoord;
                return d2 * d2 + d4 * d4 + d6 * d6;
			}

			case 3: {
				const [d1, d3, d5] = args as [number, number, number];

                let  d7: number = d1 - this.xCoord;
                let  d9: number = d3 - this.yCoord;
                let  d11: number = d5 - this.zCoord;
                return d7 * d7 + d9 * d9 + d11 * d11;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public lengthVector():  number {
		return MathHelper.sqrt_double(this.xCoord * this.xCoord + this.yCoord * this.yCoord + this.zCoord * this.zCoord) as number;
	}

	public getIntermediateWithXValue(vec3D1: Vec3D, d2: number):  Vec3D | null {
		let  d4: number = vec3D1.xCoord - this.xCoord;
		let  d6: number = vec3D1.yCoord - this.yCoord;
		let  d8: number = vec3D1.zCoord - this.zCoord;
		if(d4 * d4 < 1.0000000116860974E-7) {
			return null;
		} else {
			let  d10: number = (d2 - this.xCoord) / d4;
			return d10 >= 0.0 && d10 <= 1.0 ? Vec3D.createVector(this.xCoord + d4 * d10, this.yCoord + d6 * d10, this.zCoord + d8 * d10) : null;
		}
	}

	public getIntermediateWithYValue(vec3D1: Vec3D, d2: number):  Vec3D | null {
		let  d4: number = vec3D1.xCoord - this.xCoord;
		let  d6: number = vec3D1.yCoord - this.yCoord;
		let  d8: number = vec3D1.zCoord - this.zCoord;
		if(d6 * d6 < 1.0000000116860974E-7) {
			return null;
		} else {
			let  d10: number = (d2 - this.yCoord) / d6;
			return d10 >= 0.0 && d10 <= 1.0 ? Vec3D.createVector(this.xCoord + d4 * d10, this.yCoord + d6 * d10, this.zCoord + d8 * d10) : null;
		}
	}

	public getIntermediateWithZValue(vec3D1: Vec3D, d2: number):  Vec3D | null {
		let  d4: number = vec3D1.xCoord - this.xCoord;
		let  d6: number = vec3D1.yCoord - this.yCoord;
		let  d8: number = vec3D1.zCoord - this.zCoord;
		if(d8 * d8 < 1.0000000116860974E-7) {
			return null;
		} else {
			let  d10: number = (d2 - this.zCoord) / d8;
			return d10 >= 0.0 && d10 <= 1.0 ? Vec3D.createVector(this.xCoord + d4 * d10, this.yCoord + d6 * d10, this.zCoord + d8 * d10) : null;
		}
	}

	public toString():  string {
		return "(" + this.xCoord + ", " + this.yCoord + ", " + this.zCoord + ")";
	}

	public rotateAroundX(f1: number):  void {
		let  f2: number = MathHelper.cos(f1);
		let  f3: number = MathHelper.sin(f1);
		let  d4: number = this.xCoord;
		let  d6: number = this.yCoord * f2 as number + this.zCoord * f3 as number;
		let  d8: number = this.zCoord * f2 as number - this.yCoord * f3 as number;
		this.xCoord = d4;
		this.yCoord = d6;
		this.zCoord = d8;
	}

	public rotateAroundY(f1: number):  void {
		let  f2: number = MathHelper.cos(f1);
		let  f3: number = MathHelper.sin(f1);
		let  d4: number = this.xCoord * f2 as number + this.zCoord * f3 as number;
		let  d6: number = this.yCoord;
		let  d8: number = this.zCoord * f2 as number - this.xCoord * f3 as number;
		this.xCoord = d4;
		this.yCoord = d6;
		this.zCoord = d8;
	}
}
