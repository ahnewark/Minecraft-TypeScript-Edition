


import { java, double, float, byte, int } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MathHelper } from "./MathHelper";
import { Entity } from "./Entity";
import { ChunkPosition } from "./ChunkPosition";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";
import { Block } from "./Block";

import { Block } from "./Block";

export  class Explosion {
	public field_12257_a:  boolean = false;
	private ExplosionRNG:  Random | null = new Random();
	private worldObj:  World | null;
	public explosionX:  double;
	public explosionY:  double;
	public explosionZ:  double;
	public exploder:  Entity | null;
	public explosionSize:  float;
	public destroyedBlockPositions: Set<ChunkPosition> = new Set();

	public constructor(world1: World| null, entity2: Entity| null, d3: double, d5: double, d7: double, f9: float) {
		this.worldObj = world1;
		this.exploder = entity2;
		this.explosionSize = f9;
		this.explosionX = d3;
		this.explosionY = d5;
		this.explosionZ = d7;
	}

	public async func_12248_a(): Promise<void> {
		let  f1: float = this.explosionSize;
		let  b2: byte = 16;

		let  i3: int;
		let  i4: int;
		let  i5: int;
		let  d15: double;
		let  d17: double;
		let  d19: double;
		for(i3 = 0; i3 < b2; ++i3) {
			for(i4 = 0; i4 < b2; ++i4) {
				for(i5 = 0; i5 < b2; ++i5) {
					if(i3 === 0 || i3 === b2 - 1 || i4 === 0 || i4 === b2 - 1 || i5 === 0 || i5 === b2 - 1) {
						let  d6: double = (i3 as float / (b2 as float - 1.0) * 2.0 - 1.0);
						let  d8: double = (i4 as float / (b2 as float - 1.0) * 2.0 - 1.0);
						let  d10: double = (i5 as float / (b2 as float - 1.0) * 2.0 - 1.0);
						let  d12: double = java.lang.Math.sqrt(d6 * d6 + d8 * d8 + d10 * d10);
						d6 /= d12;
						d8 /= d12;
						d10 /= d12;
						let  f14: float = this.explosionSize * (0.7 + this.worldObj.rand.nextFloat() * 0.6);
						d15 = this.explosionX;
						d17 = this.explosionY;
						d19 = this.explosionZ;

						for(let  f21: float = 0.3; f14 > 0.0; f14 -= f21 * 0.75) {
							let  i22: int = MathHelper.floor_double(d15);
							let  i23: int = MathHelper.floor_double(d17);
							let  i24: int = MathHelper.floor_double(d19);
							let  i25: int = await this.worldObj.getBlockId(i22, i23, i24);
							if(i25 > 0) {
								f14 -= (Block.blocksList[i25].getExplosionResistance(this.exploder) + 0.3) * f21;
							}

							if(f14 > 0.0) {
								this.destroyedBlockPositions.add(new  ChunkPosition(i22, i23, i24));
							}

							d15 += d6 * f21;
							d17 += d8 * f21;
							d19 += d10 * f21;
						}
					}
				}
			}
		}

		this.explosionSize *= 2.0;
		i3 = MathHelper.floor_double(this.explosionX - this.explosionSize - 1.0);
		i4 = MathHelper.floor_double(this.explosionX + this.explosionSize + 1.0);
		i5 = MathHelper.floor_double(this.explosionY - this.explosionSize - 1.0);
		let  i29: int = MathHelper.floor_double(this.explosionY + this.explosionSize + 1.0);
		let  i7: int = MathHelper.floor_double(this.explosionZ - this.explosionSize - 1.0);
		let  i30: int = MathHelper.floor_double(this.explosionZ + this.explosionSize + 1.0);
		let  list9 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this.exploder, AxisAlignedBB.getBoundingBoxFromPool(i3, i5, i7, i4, i29, i30));
		let  vec3D31: Vec3D = Vec3D.createVector(this.explosionX, this.explosionY, this.explosionZ);

		for(let  i11: int = 0; i11 < list9.length; ++i11) {
			let  entity33: Entity = list9[i11];
			let  d13: double = entity33.getDistance(this.explosionX, this.explosionY, this.explosionZ) / this.explosionSize;
			if(d13 <= 1.0) {
				d15 = entity33.posX - this.explosionX;
				d17 = entity33.posY - this.explosionY;
				d19 = entity33.posZ - this.explosionZ;
				let  d39: double = MathHelper.sqrt_double(d15 * d15 + d17 * d17 + d19 * d19);
				d15 /= d39;
				d17 /= d39;
				d19 /= d39;
				let  d40: double = await this.worldObj.func_675_a(vec3D31, entity33.boundingBox);
				let  d41: double = (1.0 - d13) * d40;
				await entity33.attackEntityFrom(this.exploder, ((d41 * d41 + d41) / 2.0 * 8.0 * this.explosionSize + 1.0) as int);
				entity33.motionX += d15 * d41;
				entity33.motionY += d17 * d41;
				entity33.motionZ += d19 * d41;
			}
		}

		this.explosionSize = f1;
		let  arrayList32: ChunkPosition[] = [...this.destroyedBlockPositions];
		if(this.field_12257_a) {
			for(let  i34: int = arrayList32.length - 1; i34 >= 0; --i34) {
				let  chunkPosition35: ChunkPosition = arrayList32[i34];
				let  i36: int = chunkPosition35.x;
				let  i37: int = chunkPosition35.y;
				let  i16: int = chunkPosition35.z;
				let  i38: int = await this.worldObj.getBlockId(i36, i37, i16);
				let  i18: int = await this.worldObj.getBlockId(i36, i37 - 1, i16);
				if(i38 === 0 && Block.opaqueCubeLookup[i18] && this.ExplosionRNG.nextInt(3) === 0) {
					await this.worldObj.setBlockWithNotify(i36, i37, i16, Block.fire.blockID);
				}
			}
		}

	}

	public async func_12247_b():  Promise<void> {
		this.worldObj.playSoundEffect(this.explosionX, this.explosionY, this.explosionZ, "random.explode", 4.0, (1.0 + (this.worldObj.rand.nextFloat() - this.worldObj.rand.nextFloat()) * 0.2) * 0.7);
		let  arrayList1: ChunkPosition[] = [...this.destroyedBlockPositions];

		for(let  i2: int = arrayList1.length - 1; i2 >= 0; --i2) {
			let  chunkPosition3: ChunkPosition = arrayList1[i2];
			let  i4: int = chunkPosition3.x;
			let  i5: int = chunkPosition3.y;
			let  i6: int = chunkPosition3.z;
			let  i7: int = await this.worldObj.getBlockId(i4, i5, i6);

			for(let  i8: int = 0; i8 < 1; ++i8) {
				let  d9: double = (i4 as float + this.worldObj.rand.nextFloat());
				let  d11: double = (i5 as float + this.worldObj.rand.nextFloat());
				let  d13: double = (i6 as float + this.worldObj.rand.nextFloat());
				let  d15: double = d9 - this.explosionX;
				let  d17: double = d11 - this.explosionY;
				let  d19: double = d13 - this.explosionZ;
				let  d21: double = MathHelper.sqrt_double(d15 * d15 + d17 * d17 + d19 * d19);
				d15 /= d21;
				d17 /= d21;
				d19 /= d21;
				let  d23: double = 0.5 / (d21 / this.explosionSize + 0.1);
				d23 *= (this.worldObj.rand.nextFloat() * this.worldObj.rand.nextFloat() + 0.3);
				d15 *= d23;
				d17 *= d23;
				d19 *= d23;
				this.worldObj.spawnParticle("explode", (d9 + this.explosionX * 1.0) / 2.0, (d11 + this.explosionY * 1.0) / 2.0, (d13 + this.explosionZ * 1.0) / 2.0, d15, d17, d19);
				this.worldObj.spawnParticle("smoke", d9, d11, d13, d15, d17, d19);
			}

			if(i7 > 0) {
				await Block.blocksList[i7].dropBlockAsItemWithChance(this.worldObj, i4, i5, i6, await this.worldObj.getBlockMetadata(i4, i5, i6), 0.3);
				await this.worldObj.setBlockWithNotify(i4, i5, i6, 0);
				await Block.blocksList[i7].onBlockDestroyedByExplosion(this.worldObj, i4, i5, i6);
			}
		}

	}
}
