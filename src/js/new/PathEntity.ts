
import { JavaObject, int, double } from "../jree/index";
import { Vec3D } from "./Vec3D";
import { PathPoint } from "./PathPoint";
import { Entity } from "./Entity";

export  class PathEntity extends JavaObject {
	private readonly points:  PathPoint[] | null;
	public readonly pathLength:  int;
	private pathIndex:  int;

	public constructor(pathPoint1: PathPoint[]| null) {
		super();
		this.points = pathPoint1;
		this.pathLength = pathPoint1.length;
	}

	public incrementPathIndex():  void {
		++this.pathIndex;
	}

	public isFinished():  boolean {
		return this.pathIndex >= this.points.length;
	}

	public getPosition(entity1: Entity| null):  Vec3D | null {
		let  d2: double = this.points[this.pathIndex].xCoord as double + ((entity1.width + 1.0) as int) as double * 0.5;
		let  d4: double = this.points[this.pathIndex].yCoord as double;
		let  d6: double = this.points[this.pathIndex].zCoord as double + ((entity1.width + 1.0) as int) as double * 0.5;
		return Vec3D.createVector(d2, d4, d6);
	}
}
