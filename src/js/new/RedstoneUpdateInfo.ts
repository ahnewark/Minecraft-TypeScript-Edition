
import { int, long } from "../jree/index";

export class RedstoneUpdateInfo {
	public x: int;
	public y: int;
	public z: int;
	public updateTime: long;

	public constructor(i1: int, i2: int, i3: int, j4: long) {
		this.x = i1;
		this.y = i2;
		this.z = i3;
		this.updateTime = j4;
	}
}
