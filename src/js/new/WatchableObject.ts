import { JavaObject, int } from "../jree/index";

export  class WatchableObject extends JavaObject {
	private readonly objectType:  int;
	private readonly dataValueId:  int;
	private watchedObject:  any;
	private isWatching:  boolean;

	public constructor(i1: int, i2: int, object3: any) {
		super();
		this.dataValueId = i2;
		this.watchedObject = object3;
		this.objectType = i1;
		this.isWatching = true;
	}

	public getDataValueId():  int {
		return this.dataValueId;
	}

	public setObject(object1: any):  void {
		this.watchedObject = object1;
	}

	public getObject():  any {
		return this.watchedObject;
	}

	public getObjectType():  int {
		return this.objectType;
	}

	public setWatching(z1: boolean):  void {
		this.isWatching = z1;
	}
}
