
import { int, float, double, java } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EnumMovingObjectType } from "./EnumMovingObjectType";
import { EntityPlayer } from "./EntityPlayer";
import { EntityBoat } from "./EntityBoat";

export  class ItemBoat extends Item {
	public constructor(i1: int) {
		super(i1);
		this.maxStackSize = 1;
	}

	public async onItemRightClick(itemStack1: ItemStack| undefined, world2: World| undefined, entityPlayer3: EntityPlayer| undefined):  Promise<ItemStack | undefined> {
		let  f4: float = 1.0;
		let  f5: float = entityPlayer3.prevRotationPitch + (entityPlayer3.rotationPitch - entityPlayer3.prevRotationPitch) * f4;
		let  f6: float = entityPlayer3.prevRotationYaw + (entityPlayer3.rotationYaw - entityPlayer3.prevRotationYaw) * f4;
		let  d7: double = entityPlayer3.prevPosX + (entityPlayer3.posX - entityPlayer3.prevPosX) * f4 as double;
		let  d9: double = entityPlayer3.prevPosY + (entityPlayer3.posY - entityPlayer3.prevPosY) * f4 as double + 1.62 - entityPlayer3.yOffset as double;
		let  d11: double = entityPlayer3.prevPosZ + (entityPlayer3.posZ - entityPlayer3.prevPosZ) * f4 as double;
		let  vec3D13: Vec3D = Vec3D.createVector(d7, d9, d11);
		let  f14: float = MathHelper.cos(-f6 * 0.017453292 - java.lang.Math.PI as float);
		let  f15: float = MathHelper.sin(-f6 * 0.017453292 - java.lang.Math.PI as float);
		let  f16: float = -MathHelper.cos(-f5 * 0.017453292);
		let  f17: float = MathHelper.sin(-f5 * 0.017453292);
		let  f18: float = f15 * f16;
		let  f20: float = f14 * f16;
		let  d21: double = 5.0;
		let  vec3D23: Vec3D = vec3D13.addVector(f18 as double * d21, f17 as double * d21, f20 as double * d21);
		let  movingObjectPosition24: MovingObjectPosition = await world2.rayTraceBlocks_do(vec3D13, vec3D23, true);
		if(movingObjectPosition24 === undefined) {
			return itemStack1;
		} else {
			if(movingObjectPosition24.typeOfHit === EnumMovingObjectType.TILE) {
				let  i25: int = movingObjectPosition24.blockX;
				let  i26: int = movingObjectPosition24.blockY;
				let  i27: int = movingObjectPosition24.blockZ;
				if(!world2.multiplayerWorld) {
					await world2.entityJoinedWorld(new  EntityBoat(world2, (i25 as float + 0.5) as double, (i26 as float + 1.5) as double, (i27 as float + 0.5) as double));
				}

				--itemStack1.stackSize;
			}

			return itemStack1;
		}
	}
}
