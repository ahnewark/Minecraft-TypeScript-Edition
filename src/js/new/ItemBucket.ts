
import { int, float, double, java } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EnumMovingObjectType } from "./EnumMovingObjectType";
import { EntityPlayer } from "./EntityPlayer";
import { EntityCow } from "./EntityCow";
import { Item } from "./Item";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";

export  class ItemBucket extends Item {
	private isFull:  int;

	public constructor(i1: int, i2: int) {
		super(i1);
		this.maxStackSize = 1;
		this.maxDamage = 64;
		this.isFull = i2;
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
		let  movingObjectPosition24: MovingObjectPosition = await world2.rayTraceBlocks_do(vec3D13, vec3D23, this.isFull === 0);
		if(movingObjectPosition24 === undefined) {
			return itemStack1;
		} else {
			if(movingObjectPosition24.typeOfHit === EnumMovingObjectType.TILE) {
				let  i25: int = movingObjectPosition24.blockX;
				let  i26: int = movingObjectPosition24.blockY;
				let  i27: int = movingObjectPosition24.blockZ;
				if(!world2.func_6466_a(entityPlayer3, i25, i26, i27)) {
					return itemStack1;
				}

				if(this.isFull === 0) {
					if(await world2.getBlockMaterial(i25, i26, i27) === MaterialRegistry.water && await world2.getBlockMetadata(i25, i26, i27) === 0) {
						await world2.setBlockWithNotify(i25, i26, i27, 0);
						return new  ItemStack(Item.bucketWater);
					}

					if(await world2.getBlockMaterial(i25, i26, i27) === MaterialRegistry.lava && await world2.getBlockMetadata(i25, i26, i27) === 0) {
						await world2.setBlockWithNotify(i25, i26, i27, 0);
						return new  ItemStack(Item.bucketLava);
					}
				} else {
					if(this.isFull < 0) {
						return new  ItemStack(Item.bucketEmpty);
					}

					if(movingObjectPosition24.sideHit === 0) {
						--i26;
					}

					if(movingObjectPosition24.sideHit === 1) {
						++i26;
					}

					if(movingObjectPosition24.sideHit === 2) {
						--i27;
					}

					if(movingObjectPosition24.sideHit === 3) {
						++i27;
					}

					if(movingObjectPosition24.sideHit === 4) {
						--i25;
					}

					if(movingObjectPosition24.sideHit === 5) {
						++i25;
					}

					if(await world2.isAirBlock(i25, i26, i27) || !(await world2.getBlockMaterial(i25, i26, i27)).isSolid()) {
						if(world2.worldProvider.isHellWorld && this.isFull === Block.waterStill.blockID) {
							world2.playSoundEffect(d7 + 0.5, d9 + 0.5, d11 + 0.5, "random.fizz", 0.5, 2.6 + (world2.rand.nextFloat() - world2.rand.nextFloat()) * 0.8);

							for(let  i28: int = 0; i28 < 8; ++i28) {
								world2.spawnParticle("largesmoke", i25 as double + java.lang.Math.random(), i26 as double + java.lang.Math.random(), i27 as double + java.lang.Math.random(), 0.0, 0.0, 0.0);
							}
						} else {
							await world2.setBlockAndMetadataWithNotify(i25, i26, i27, this.isFull, 0);
						}

						return new  ItemStack(Item.bucketEmpty);
					}
				}
			} else if(this.isFull === 0 && movingObjectPosition24.entityHit instanceof EntityCow) {
				return new  ItemStack(Item.bucketMilk);
			}

			return itemStack1;
		}
	}
}
