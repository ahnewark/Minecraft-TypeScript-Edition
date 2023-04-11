
import { JavaObject, java, float, int, double, byte, S } from "../jree/index";
import { PathPoint } from "./PathPoint";
import { PathEntity } from "./PathEntity";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { MCHashTable } from "./MCHashTable";
import { IBlockAccess } from "./IBlockAccess";
import { Entity } from "./Entity";
import { Path } from "./Path";
import { MaterialRegistry } from "./index";

export  class Pathfinder extends JavaObject {
	private worldMap:  IBlockAccess | null;
	private path:  Path = new Path();
	private pointMap:  MCHashTable | null = new  MCHashTable();
	private pathOptions:  PathPoint[] | null = new   Array<PathPoint>(32);

	public constructor(iBlockAccess1: IBlockAccess| null) {
		super();
		this.worldMap = iBlockAccess1;
	}

	public async createEntityPathTo(entity1: Entity| null, entity2: Entity| null, f3: float):  Promise<PathEntity | null>;

	public async createEntityPathTo(entity1: Entity| null, i2: int, i3: int, i4: int, f5: float):  Promise<PathEntity | null>;
	public async createEntityPathTo(entity1: Entity| null, d2: double, d4: double, d6: double, f8: float):  Promise<PathEntity | null>;
	public async createEntityPathTo(...args: unknown[]):  Promise<PathEntity | null> {
		switch (args.length) {
			case 3: {
				const [entity1, entity2, f3] = args as [Entity, Entity, float];
				return this.createEntityPathTo(entity1, entity2.posX, entity2.boundingBox.minY, entity2.posZ, f3);
			}

			case 5: {
				const [entity1, i2, i3, i4, f5] = args as [Entity, int, int, int, float];
				return this.createEntityPathTo(entity1, (i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double, f5);
			}

			case 5: {
				const [entity1, d2, d4, d6, f8] = args as [Entity, double, double, double, float];
				this.path.clearPath();
				this.pointMap.clearMap();
				let  pathPoint9: PathPoint = this.openPoint(MathHelper.floor_double(entity1.boundingBox.minX), MathHelper.floor_double(entity1.boundingBox.minY), MathHelper.floor_double(entity1.boundingBox.minZ));
				let  pathPoint10: PathPoint = this.openPoint(MathHelper.floor_double(d2 - (entity1.width / 2.0) as double), MathHelper.floor_double(d4), MathHelper.floor_double(d6 - (entity1.width / 2.0) as double));
				let  pathPoint11: PathPoint = new  PathPoint(MathHelper.floor_float(entity1.width + 1.0), MathHelper.floor_float(entity1.height + 1.0), MathHelper.floor_float(entity1.width + 1.0));
				let  pathEntity12: PathEntity = await this.addToPath(entity1, pathPoint9, pathPoint10, pathPoint11, f8);
				return pathEntity12;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	private async addToPath(entity1: Entity| null, pathPoint2: PathPoint| null, pathPoint3: PathPoint| null, pathPoint4: PathPoint| null, f5: float):  Promise<PathEntity | null> {
		pathPoint2.totalPathDistance = 0.0;
		pathPoint2.distanceToNext = pathPoint2.distanceTo(pathPoint3);
		pathPoint2.distanceToTarget = pathPoint2.distanceToNext;
		this.path.clearPath();
		this.path.addPoint(pathPoint2);
		let  pathPoint6: PathPoint = pathPoint2;

		while(!this.path.isPathEmpty()) {
			let  pathPoint7: PathPoint = this.path.dequeue();
			if(pathPoint7.hash === pathPoint3.hash) {
				return this.createEntityPath(pathPoint2, pathPoint3);
			}

			if(pathPoint7.distanceTo(pathPoint3) < pathPoint6.distanceTo(pathPoint3)) {
				pathPoint6 = pathPoint7;
			}

			pathPoint7.isFirst = true;
			let  i8: int = await this.findPathOptions(entity1, pathPoint7, pathPoint4, pathPoint3, f5);

			for(let  i9: int = 0; i9 < i8; ++i9) {
				let  pathPoint10: PathPoint = this.pathOptions[i9];
				let  f11: float = pathPoint7.totalPathDistance + pathPoint7.distanceTo(pathPoint10);
				if(!pathPoint10.isAssigned() || f11 < pathPoint10.totalPathDistance) {
					pathPoint10.previous = pathPoint7;
					pathPoint10.totalPathDistance = f11;
					pathPoint10.distanceToNext = pathPoint10.distanceTo(pathPoint3);
					if(pathPoint10.isAssigned()) {
						this.path.changeDistance(pathPoint10, pathPoint10.totalPathDistance + pathPoint10.distanceToNext);
					} else {
						pathPoint10.distanceToTarget = pathPoint10.totalPathDistance + pathPoint10.distanceToNext;
						this.path.addPoint(pathPoint10);
					}
				}
			}
		}

		if(pathPoint6 === pathPoint2) {
			return null;
		} else {
			return this.createEntityPath(pathPoint2, pathPoint6);
		}
	}

	private async findPathOptions(entity1: Entity| null, pathPoint2: PathPoint| null, pathPoint3: PathPoint| null, pathPoint4: PathPoint| null, f5: float):  Promise<int> {
		let  i6: int = 0;
		let  b7: byte = 0;
		if(await this.getVerticalOffset(entity1, pathPoint2.xCoord, pathPoint2.yCoord + 1, pathPoint2.zCoord, pathPoint3) > 0) {
			b7 = 1;
		}

		let  pathPoint8: PathPoint = await this.getSafePoint(entity1, pathPoint2.xCoord, pathPoint2.yCoord, pathPoint2.zCoord + 1, pathPoint3, b7);
		let  pathPoint9: PathPoint = await this.getSafePoint(entity1, pathPoint2.xCoord - 1, pathPoint2.yCoord, pathPoint2.zCoord, pathPoint3, b7);
		let  pathPoint10: PathPoint = await this.getSafePoint(entity1, pathPoint2.xCoord + 1, pathPoint2.yCoord, pathPoint2.zCoord, pathPoint3, b7);
		let  pathPoint11: PathPoint = await this.getSafePoint(entity1, pathPoint2.xCoord, pathPoint2.yCoord, pathPoint2.zCoord - 1, pathPoint3, b7);
		if(pathPoint8 !== null && !pathPoint8.isFirst && pathPoint8.distanceTo(pathPoint4) < f5) {
			this.pathOptions[i6++] = pathPoint8;
		}

		if(pathPoint9 !== null && !pathPoint9.isFirst && pathPoint9.distanceTo(pathPoint4) < f5) {
			this.pathOptions[i6++] = pathPoint9;
		}

		if(pathPoint10 !== null && !pathPoint10.isFirst && pathPoint10.distanceTo(pathPoint4) < f5) {
			this.pathOptions[i6++] = pathPoint10;
		}

		if(pathPoint11 !== null && !pathPoint11.isFirst && pathPoint11.distanceTo(pathPoint4) < f5) {
			this.pathOptions[i6++] = pathPoint11;
		}

		return i6;
	}

	private async getSafePoint(entity1: Entity| null, i2: int, i3: int, i4: int, pathPoint5: PathPoint| null, i6: int): Promise<PathPoint | null> {
		let  pathPoint7: PathPoint = null;
		if(await this.getVerticalOffset(entity1, i2, i3, i4, pathPoint5) > 0) {
			pathPoint7 = this.openPoint(i2, i3, i4);
		}

		if(pathPoint7 === null && await this.getVerticalOffset(entity1, i2, i3 + i6, i4, pathPoint5) > 0) {
			pathPoint7 = this.openPoint(i2, i3 + i6, i4);
			i3 += i6;
		}

		if(pathPoint7 !== null) {
			let  i8: int = 0;

			let  i10: int;
			for(let  z9: boolean = false; i3 > 0 && (i10 = await this.getVerticalOffset(entity1, i2, i3 - 1, i4, pathPoint5)) > 0; --i3) {
				if(i10 < 0) {
					return null;
				}

				++i8;
				if(i8 >= 4) {
					return null;
				}
			}

			if(i3 > 0) {
				pathPoint7 = this.openPoint(i2, i3, i4);
			}
		}

		return pathPoint7;
	}

	private openPoint(i1: int, i2: int, i3: int):  PathPoint | null {
		let  i4: int = i1 | i2 << 10 | i3 << 20;
		let  pathPoint5: PathPoint = this.pointMap.lookup(i4) as PathPoint;
		if(pathPoint5 === null) {
			pathPoint5 = new  PathPoint(i1, i2, i3);
			this.pointMap.addKey(i4, pathPoint5);
		}

		return pathPoint5;
	}

	private async getVerticalOffset(entity1: Entity| null, i2: int, i3: int, i4: int, pathPoint5: PathPoint| null): Promise<int> {
		for(let  i6: int = i2; i6 < i2 + pathPoint5.xCoord; ++i6) {
			for(let  i7: int = i3; i7 < i3 + pathPoint5.yCoord; ++i7) {
				for(let  i8: int = i4; i8 < i4 + pathPoint5.zCoord; ++i8) {
					let  material9: Material = await this.worldMap.getBlockMaterial(i2, i3, i4);
					if(material9.getIsSolid()) {
						return 0;
					}

					if(material9 === MaterialRegistry.water || material9 === MaterialRegistry.lava) {
						return -1;
					}
				}
			}
		}

		return 1;
	}

	private createEntityPath(pathPoint1: PathPoint| null, pathPoint2: PathPoint| null):  PathEntity | null {
		let  i3: int = 1;

		let  pathPoint4: PathPoint;
		for(pathPoint4 = pathPoint2; pathPoint4.previous !== null; pathPoint4 = pathPoint4.previous) {
			++i3;
		}

		let  pathPoint5: PathPoint[] = new   Array<PathPoint>(i3);
		pathPoint4 = pathPoint2;
		--i3;

		for(pathPoint5[i3] = pathPoint2; pathPoint4.previous !== null; pathPoint5[i3] = pathPoint4) {
			pathPoint4 = pathPoint4.previous;
			--i3;
		}

		return new  PathEntity(pathPoint5);
	}
}
