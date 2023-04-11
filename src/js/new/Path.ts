
import { JavaObject, int, java, float } from "../jree/index";
import { PathPoint } from "./PathPoint";

export  class Path extends JavaObject {
	private pathPoints:  PathPoint[] | null = new   Array<PathPoint>(1024);
	private count:  int = 0;

	public addPoint(pathPoint1: PathPoint| null):  PathPoint | null {
		if(pathPoint1.index >= 0) {
			throw new  java.lang.IllegalStateException("OW KNOWS!");
		} else {
			if(this.count === this.pathPoints.length) {
				let  pathPoint2: PathPoint[] = new   Array<PathPoint>(this.count << 1);
				java.lang.System.arraycopy(this.pathPoints, 0, pathPoint2, 0, this.count);
				this.pathPoints = pathPoint2;
			}

			this.pathPoints[this.count] = pathPoint1;
			pathPoint1.index = this.count;
			this.sortBack(this.count++);
			return pathPoint1;
		}
	}

	public clearPath():  void {
		this.count = 0;
	}

	public dequeue():  PathPoint | null {
		let  pathPoint1: PathPoint = this.pathPoints[0];
		this.pathPoints[0] = this.pathPoints[--this.count];
		this.pathPoints[this.count] = null;
		if(this.count > 0) {
			this.sortForward(0);
		}

		pathPoint1.index = -1;
		return pathPoint1;
	}

	public changeDistance(pathPoint1: PathPoint| null, f2: float):  void {
		let  f3: float = pathPoint1.distanceToTarget;
		pathPoint1.distanceToTarget = f2;
		if(f2 < f3) {
			this.sortBack(pathPoint1.index);
		} else {
			this.sortForward(pathPoint1.index);
		}

	}

	private sortBack(i1: int):  void {
		let  pathPoint2: PathPoint = this.pathPoints[i1];

		let  i4: int;
		for(let  f3: float = pathPoint2.distanceToTarget; i1 > 0; i1 = i4) {
			i4 = i1 - 1 >> 1;
			let  pathPoint5: PathPoint = this.pathPoints[i4];
			if(f3 >= pathPoint5.distanceToTarget) {
				break;
			}

			this.pathPoints[i1] = pathPoint5;
			pathPoint5.index = i1;
		}

		this.pathPoints[i1] = pathPoint2;
		pathPoint2.index = i1;
	}

	private sortForward(i1: int):  void {
		let  pathPoint2: PathPoint = this.pathPoints[i1];
		let  f3: float = pathPoint2.distanceToTarget;

		while(true) {
			let  i4: int = 1 + (i1 << 1);
			let  i5: int = i4 + 1;
			if(i4 >= this.count) {
				break;
			}

			let  pathPoint6: PathPoint = this.pathPoints[i4];
			let  f7: float = pathPoint6.distanceToTarget;
			let  pathPoint8: PathPoint;
			let  f9: float;
			if(i5 >= this.count) {
				pathPoint8 = null;
				f9 = 0x7f800000
			} else {
				pathPoint8 = this.pathPoints[i5];
				f9 = pathPoint8.distanceToTarget;
			}

			if(f7 < f9) {
				if(f7 >= f3) {
					break;
				}

				this.pathPoints[i1] = pathPoint6;
				pathPoint6.index = i1;
				i1 = i4;
			} else {
				if(f9 >= f3) {
					break;
				}

				this.pathPoints[i1] = pathPoint8;
				pathPoint8.index = i1;
				i1 = i5;
			}
		}

		this.pathPoints[i1] = pathPoint2;
		pathPoint2.index = i1;
	}

	public isPathEmpty():  boolean {
		return this.count === 0;
	}
}
