
import { float, int, double, java } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { PathEntity } from "./PathEntity";
import { MathHelper } from "./MathHelper";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";

export  class EntityCreature extends EntityLiving {
	private pathToEntity:  PathEntity | null;
	protected playerToAttack:  Entity | null;
	protected hasAttacked:  boolean = false;

	public constructor(world1: World| null) {
		super(world1);
	}

	public get type(): string {
		return "Creature";
	}

	protected async updatePlayerActionState():  Promise<void> {
		this.hasAttacked = false;
		let  f1: float = 16.0;
		if(this.playerToAttack === null) {
			this.playerToAttack = await this.findPlayerToAttack();
			if(this.playerToAttack !== null) {
				this.pathToEntity = await this.worldObj.getPathToEntity(this, this.playerToAttack, f1);
			}
		} else if(!this.playerToAttack.isEntityAlive()) {
			this.playerToAttack = null;
		} else {
			let  f2: float = this.playerToAttack.getDistanceToEntity(this);
			if(this.canEntityBeSeen(this.playerToAttack)) {
				this.attackEntity(this.playerToAttack, f2);
			}
		}

		if(!this.hasAttacked && this.playerToAttack !== null && (this.pathToEntity === null || this.rand.nextInt(20) === 0)) {
			this.pathToEntity = await this.worldObj.getPathToEntity(this, this.playerToAttack, f1);
		} else if(this.pathToEntity === null && this.rand.nextInt(80) === 0 || this.rand.nextInt(80) === 0) {
			let  z21: boolean = false;
			let  i3: int = -1;
			let  i4: int = -1;
			let  i5: int = -1;
			let  f6: float = -99999.0;

			for(let  i7: int = 0; i7 < 10; ++i7) {
				let  i8: int = MathHelper.floor_double(this.posX + this.rand.nextInt(13) as double - 6.0);
				let  i9: int = MathHelper.floor_double(this.posY + this.rand.nextInt(7) as double - 3.0);
				let  i10: int = MathHelper.floor_double(this.posZ + this.rand.nextInt(13) as double - 6.0);
				let  f11: float = await this.getBlockPathWeight(i8, i9, i10);
				if(f11 > f6) {
					f6 = f11;
					i3 = i8;
					i4 = i9;
					i5 = i10;
					z21 = true;
				}
			}

			if(z21) {
				this.pathToEntity = await this.worldObj.getEntityPathToXYZ(this, i3, i4, i5, 10.0);
			}
		}

		let  i22: int = MathHelper.floor_double(this.boundingBox.minY);
		let  z23: boolean = await this.handleWaterMovement();
		let  z24: boolean = await this.handleLavaMovement();
		this.rotationPitch = 0.0;
		if(this.pathToEntity !== null && this.rand.nextInt(100) !== 0) {
			let  vec3D25: Vec3D = this.pathToEntity.getPosition(this);
			let  d26: double = (this.width * 2.0) as double;

			while(vec3D25 !== null && vec3D25.squareDistanceTo(this.posX, vec3D25.yCoord, this.posZ) < d26 * d26) {
				this.pathToEntity.incrementPathIndex();
				if(this.pathToEntity.isFinished()) {
					vec3D25 = null;
					this.pathToEntity = null;
				} else {
					vec3D25 = this.pathToEntity.getPosition(this);
				}
			}

			this.isJumping = false;
			if(vec3D25 !== null) {
				let  d27: double = vec3D25.xCoord - this.posX;
				let  d28: double = vec3D25.zCoord - this.posZ;
				let  d12: double = vec3D25.yCoord - i22 as double;
				let  f14: float = (java.lang.Math.atan2(d28, d27) * 180.0 / java.lang.Math.PI as float as double) as float - 90.0;
				let  f15: float = f14 - this.rotationYaw;

				for(this.moveForward = this.moveSpeed; f15 < -180.0; f15 += 360.0) {
				}

				while(f15 >= 180.0) {
					f15 -= 360.0;
				}

				if(f15 > 30.0) {
					f15 = 30.0;
				}

				if(f15 < -30.0) {
					f15 = -30.0;
				}

				this.rotationYaw += f15;
				if(this.hasAttacked && this.playerToAttack !== null) {
					let  d16: double = this.playerToAttack.posX - this.posX;
					let  d18: double = this.playerToAttack.posZ - this.posZ;
					let  f20: float = this.rotationYaw;
					this.rotationYaw = (java.lang.Math.atan2(d18, d16) * 180.0 / java.lang.Math.PI as float as double) as float - 90.0;
					f15 = (f20 - this.rotationYaw + 90.0) * java.lang.Math.PI as float / 180.0;
					this.moveStrafing = -MathHelper.sin(f15) * this.moveForward * 1.0;
					this.moveForward = MathHelper.cos(f15) * this.moveForward * 1.0;
				}

				if(d12 > 0.0) {
					this.isJumping = true;
				}
			}

			if(this.playerToAttack !== null) {
				this.faceEntity(this.playerToAttack, 30.0);
			}

			if(this.isCollidedHorizontally) {
				this.isJumping = true;
			}

			if(this.rand.nextFloat() < 0.8 && (z23 || z24)) {
				this.isJumping = true;
			}

		} else {
			await super.updatePlayerActionState();
			this.pathToEntity = null;
		}
	}

	protected attackEntity(entity1: Entity| null, f2: float):  void {
	}

	protected async getBlockPathWeight(i1: int, i2: int, i3: int):  Promise<float> {
		return 0.0;
	}

	protected async findPlayerToAttack():  Promise<Entity | null> {
		return null;
	}

	public async getCanSpawnHere():  Promise<boolean> {
		let  i1: int = MathHelper.floor_double(this.posX);
		let  i2: int = MathHelper.floor_double(this.boundingBox.minY);
		let  i3: int = MathHelper.floor_double(this.posZ);
		return await super.getCanSpawnHere() && await this.getBlockPathWeight(i1, i2, i3) >= 0.0;
	}
}
