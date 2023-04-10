
import { JavaObject, int, S, java } from "../jree/index";
import { Vec3D } from "./Vec3D";
import { EnumMovingObjectType } from "./EnumMovingObjectType";
import { Entity } from "./Entity";

export  class MovingObjectPosition extends JavaObject {
	public typeOfHit:  EnumMovingObjectType | null;
	public blockX:  int;
	public blockY:  int;
	public blockZ:  int;
	public sideHit:  int;
	public hitVec:  Vec3D | null;
	public entityHit:  Entity | null;

	public constructor(entity1: Entity);

	public constructor(i1: int, i2: int, i3: int, i4: int, vec3D5: Vec3D| null);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 1: {
				const [entity1] = args as [Entity];

                super();
                this.typeOfHit = EnumMovingObjectType.ENTITY;
                this.entityHit = entity1;
                this.hitVec = Vec3D.createVector(entity1.posX, entity1.posY, entity1.posZ);
	
				break;
			}

			case 5: {
				const [i1, i2, i3, i4, vec3D5] = args as [int, int, int, int, Vec3D];


                super();
                this.typeOfHit = EnumMovingObjectType.TILE;
                this.blockX = i1;
                this.blockY = i2;
                this.blockZ = i3;
                this.sideHit = i4;
                this.hitVec = Vec3D.createVector(vec3D5.xCoord, vec3D5.yCoord, vec3D5.zCoord);
	

				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}

}
