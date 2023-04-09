
import { java, S } from "../jree/index";


export class  EnumMovingObjectType extends java.lang.Enum<EnumMovingObjectType> {
   public static readonly TILE: EnumMovingObjectType = new class extends EnumMovingObjectType {}(S`TILE`, 0);
   public static readonly ENTITY: EnumMovingObjectType = new class extends EnumMovingObjectType {}(S`ENTITY`, 1);
}
