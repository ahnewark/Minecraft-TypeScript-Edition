
import { JavaObject, int, float, java } from "../jree/index";
import { MathHelper } from "./MathHelper";

export  class PathPoint extends JavaObject {
	public readonly xCoord:  int;
	public readonly yCoord:  int;
	public readonly zCoord:  int;
	public readonly hash:  int;
	protected index: int = -1;
	protected totalPathDistance: float;
	protected distanceToNext: float;
	protected distanceToTarget: float;
	protected previous: PathPoint | null;
	public isFirst:  boolean = false;

	public constructor(i1: int, i2: int, i3: int) {
		super();
		this.xCoord = i1;
		this.yCoord = i2;
		this.zCoord = i3;
		this.hash = i1 | i2 << 10 | i3 << 20;
	}

	public distanceTo(pathPoint1: PathPoint| null):  float {
		let  f2: float = (pathPoint1.xCoord - this.xCoord) as float;
		let  f3: float = (pathPoint1.yCoord - this.yCoord) as float;
		let  f4: float = (pathPoint1.zCoord - this.zCoord) as float;
		return MathHelper.sqrt_float(f2 * f2 + f3 * f3 + f4 * f4);
	}

	public equals(object1: java.lang.Object| null):  boolean {
		return (object1 as PathPoint).hash === this.hash;
	}

	public hashCode():  int {
		return this.hash;
	}

	public isAssigned():  boolean {
		return this.index >= 0;
	}

	public toString(): string {
		return this.xCoord + ", " + this.yCoord + ", " + this.zCoord;
	}
}
