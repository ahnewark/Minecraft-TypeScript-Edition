import { JavaObject, int, double, float, java, byte, short } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { StepSound } from "./StepSound";
import { NBTTagList } from "./NBTTagList";
import { NBTTagFloat } from "./NBTTagFloat";
import { NBTTagDouble } from "./NBTTagDouble";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
// import { EntityPlayer } from "./EntityPlayer";
import { EntityList } from "./EntityList";
// import { EntityItem } from "./EntityItem";
import { DataWatcher } from "./DataWatcher";
import { BlockFluids } from "./BlockFluids";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Random } from "../java/util/Random";
import { Block } from "./Block";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { IEntity } from "./interfaces/IEntity";
import { IEntityPlayer } from "./interfaces/IEntityPlayer";
import { IEntityItem } from "./interfaces/IEntityItem";

export abstract  class Entity extends JavaObject implements IEntity {
	// circular dep crudeness.
	public static entityItemCtor: (world: World, a2: number, a3: number, a4: number, itemStack: ItemStack) => IEntityItem;

	private static nextEntityID:  int = 0;
	public entityId:  int = Entity.nextEntityID++;
	public renderDistanceWeight:  double = 1.0;
	public preventEntitySpawning:  boolean = false;
	public riddenByEntity:  Entity | undefined;
	public ridingEntity:  Entity | undefined;
	public worldObj:  World | undefined;
	public prevPosX:  double;
	public prevPosY:  double;
	public prevPosZ:  double;
	public posX:  double;
	public posY:  double;
	public posZ:  double;
	public motionX:  double;
	public motionY:  double;
	public motionZ:  double;
	public rotationYaw:  float;
	public rotationPitch:  float;
	public prevRotationYaw:  float;
	public prevRotationPitch:  float;
	public readonly boundingBox:  AxisAlignedBB | undefined = AxisAlignedBB.getBoundingBox(0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
	public onGround:  boolean = false;
	public isCollidedHorizontally:  boolean;
	public isCollidedVertically:  boolean;
	public isCollided:  boolean = false;
	public beenAttacked:  boolean = false;
	public field_9293_aM:  boolean = true;
	public isDead:  boolean = false;
	public yOffset:  float = 0.0;
	public width:  float = 0.6;
	public height:  float = 1.8;
	public prevDistanceWalkedModified:  float = 0.0;
	public distanceWalkedModified:  float = 0.0;
	protected entityWalks:  boolean = true;
	protected fallDistance:  float = 0.0;
	private nextStepDistance:  int = 1;
	public lastTickPosX:  double;
	public lastTickPosY:  double;
	public lastTickPosZ:  double;
	public ySize:  float = 0.0;
	public stepHeight:  float = 0.0;
	public noClip:  boolean = false;
	public entityCollisionReduction:  float = 0.0;
	public unusedEntityBoolean:  boolean = false;
	protected rand:  Random= new Random();
	public ticksExisted:  int = 0;
	public fireResistance:  int = 1;
	public fire:  int = 0;
	protected maxAir:  int = 300;
	protected inWater:  boolean = false;
	public field_9306_bj:  int = 0;
	public air:  int = 300;
	private field_862_c:  boolean = true;
	public skinUrl: string | undefined;
	public cloakUrl: string | undefined;
	protected isImmuneToFire:  boolean = false;
	protected dataWatcher:  DataWatcher | undefined = new  DataWatcher();
	private entityRiderPitchDelta:  double;
	private entityRiderYawDelta:  double;
	public addedToChunk:  boolean = false;
	public chunkCoordX:  int;
	public chunkCoordY:  int;
	public chunkCoordZ:  int;
	public serverPosX:  int;
	public serverPosY:  int;
	public serverPosZ:  int;

	public abstract get type(): string;

	public constructor(world1: World) {
		super();
		this.worldObj = world1;
		this.setPosition(0.0, 0.0, 0.0);
		this.dataWatcher.addObject(0, 0, 'Byte');
		this.entityInit();
	}

	protected abstract entityInit():  void;

	public getDataWatcher():  DataWatcher | undefined {
		return this.dataWatcher;
	}

	public equals(object1: java.lang.Object| undefined):  boolean {
		return object1 instanceof Entity ? (object1 as Entity).entityId === this.entityId : false;
	}

	public hashCode():  int {
		return this.entityId;
	}

	protected async preparePlayerToSpawn(): Promise<void> {
		if(this.worldObj !== undefined) {
			while(this.posY > 0.0) {
				this.setPosition(this.posX, this.posY, this.posZ);
				if (await (await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox)).length === 0) {
					break;
				}

				++this.posY;
			}

			this.motionX = this.motionY = this.motionZ = 0.0;
			this.rotationPitch = 0.0;
		}
	}

	public async setEntityDead():  Promise<void> {
		this.isDead = true;
	}

	protected setSize(f1: float, f2: float):  void {
		this.width = f1;
		this.height = f2;
	}

	protected setRotation(f1: float, f2: float):  void {
		this.rotationYaw = f1;
		this.rotationPitch = f2;
	}

	public setPosition(d1: double, d3: double, d5: double):  void {
		this.posX = d1;
		this.posY = d3;
		this.posZ = d5;
		let  f7: float = this.width / 2.0;
		let  f8: float = this.height;
		this.boundingBox.setBounds(d1 - f7 as double, d3 - this.yOffset as double + this.ySize as double, d5 - f7 as double, d1 + f7 as double, d3 - this.yOffset as double + this.ySize as double + f8 as double, d5 + f7 as double);
	}

	public func_346_d(f1: float, f2: float):  void {
		let  f3: float = this.rotationPitch;
		let  f4: float = this.rotationYaw;
		this.rotationYaw = (this.rotationYaw as double + f1 as double * 0.15) as float;
		this.rotationPitch = (this.rotationPitch as double - f2 as double * 0.15) as float;
		if(this.rotationPitch < -90.0) {
			this.rotationPitch = -90.0;
		}

		if(this.rotationPitch > 90.0) {
			this.rotationPitch = 90.0;
		}

		this.prevRotationPitch += this.rotationPitch - f3;
		this.prevRotationYaw += this.rotationYaw - f4;
	}

	public async onUpdate():  Promise<void> {
		await this.onEntityUpdate();
	}

	public async onEntityUpdate():  Promise<void> {
		if(this.ridingEntity !== undefined && this.ridingEntity.isDead) {
			this.ridingEntity = undefined;
		}

		++this.ticksExisted;
		this.prevDistanceWalkedModified = this.distanceWalkedModified;
		this.prevPosX = this.posX;
		this.prevPosY = this.posY;
		this.prevPosZ = this.posZ;
		this.prevRotationPitch = this.rotationPitch;
		this.prevRotationYaw = this.rotationYaw;
		if(await this.handleWaterMovement()) {
			if(!this.inWater && !this.field_862_c) {
				let  f1: float = MathHelper.sqrt_double(this.motionX * this.motionX * 0.2 as double + this.motionY * this.motionY + this.motionZ * this.motionZ * 0.2 as double) * 0.2;
				if(f1 > 1.0) {
					f1 = 1.0;
				}

				this.worldObj.playSoundAtEntity(this, "random.splash", f1, 1.0 + (this.rand.nextFloat() - this.rand.nextFloat()) * 0.4);
				let  f2: float = MathHelper.floor_double(this.boundingBox.minY) as float;

				let  i3: int;
				let  f4: float;
				let  f5: float;
				for(i3 = 0; i3 < 1.0 + this.width * 20.0; ++i3) {
					f4 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
					f5 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
					this.worldObj.spawnParticle("bubble", this.posX + f4 as double, (f2 + 1.0) as double, this.posZ + f5 as double, this.motionX, this.motionY - (this.rand.nextFloat() * 0.2) as double, this.motionZ);
				}

				for(i3 = 0; i3 < 1.0 + this.width * 20.0; ++i3) {
					f4 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
					f5 = (this.rand.nextFloat() * 2.0 - 1.0) * this.width;
					this.worldObj.spawnParticle("splash", this.posX + f4 as double, (f2 + 1.0) as double, this.posZ + f5 as double, this.motionX, this.motionY, this.motionZ);
				}
			}

			this.fallDistance = 0.0;
			this.inWater = true;
			this.fire = 0;
		} else {
			this.inWater = false;
		}

		if(this.worldObj.multiplayerWorld) {
			this.fire = 0;
		} else if(this.fire > 0) {
			if(this.isImmuneToFire) {
				this.fire -= 4;
				if(this.fire < 0) {
					this.fire = 0;
				}
			} else {
				if(this.fire % 20 === 0) {
					await this.attackEntityFrom(undefined as Entity, 1);
				}

				--this.fire;
			}
		}

		if(await this.handleLavaMovement()) {
			await this.setOnFireFromLava();
		}

		if(this.posY < -64.0) {
			await this.kill();
		}

		if(!this.worldObj.multiplayerWorld) {
			this.func_21059_b(0, this.fire > 0);
			this.func_21059_b(2, this.ridingEntity !== undefined);
		}

		this.field_862_c = false;
	}

	protected async setOnFireFromLava():  Promise<void> {
		if(!this.isImmuneToFire) {
			await this.attackEntityFrom(undefined as Entity, 4);
			this.fire = 600;
		}

	}

	protected async kill():  Promise<void> {
		await this.setEntityDead();
	}

	public async isOffsetPositionInLiquid(d1: double, d3: double, d5: double):  Promise<boolean> {
		let  axisAlignedBB7: AxisAlignedBB = this.boundingBox.getOffsetBoundingBox(d1, d3, d5);
		let  list8 = await this.worldObj.getCollidingBoundingBoxes(this, axisAlignedBB7);
		return list8.length > 0 ? false : !await this.worldObj.getIsAnyLiquid(axisAlignedBB7);
	}

	public async moveEntity(d1: double, d3: double, d5: double): Promise<void> {
		if(this.noClip) {
			this.boundingBox.offset(d1, d3, d5);
			this.posX = (this.boundingBox.minX + this.boundingBox.maxX) / 2.0;
			this.posY = this.boundingBox.minY + this.yOffset as double - this.ySize as double;
			this.posZ = (this.boundingBox.minZ + this.boundingBox.maxZ) / 2.0;
		} else {
			let  d7: double = this.posX;
			let  d9: double = this.posZ;
			let  d11: double = d1;
			let  d13: double = d3;
			let  d15: double = d5;
			let  axisAlignedBB17: AxisAlignedBB = this.boundingBox.copy();
			let  z18: boolean = this.onGround && this.isSneaking();
			if(z18) {
				let  d19: double;
				for(d19 = 0.05; d1 !== 0.0 && (await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox.getOffsetBoundingBox(d1, -1.0, 0.0))).length === 0; d11 = d1) {
					if(d1 < d19 && d1 >= -d19) {
						d1 = 0.0;
					} else if(d1 > 0.0) {
						d1 -= d19;
					} else {
						d1 += d19;
					}
				}

				for(; d5 !== 0.0 && (await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox.getOffsetBoundingBox(0.0, -1.0, d5))).length === 0; d15 = d5) {
					if(d5 < d19 && d5 >= -d19) {
						d5 = 0.0;
					} else if(d5 > 0.0) {
						d5 -= d19;
					} else {
						d5 += d19;
					}
				}
			}

			let  list35 = await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox.addCoord(d1, d3, d5));

			for(let  i20: int = 0; i20 < list35.length; ++i20) {
				d3 = (list35[i20] as AxisAlignedBB).calculateYOffset(this.boundingBox, d3);
			}

			this.boundingBox.offset(0.0, d3, 0.0);
			if(!this.field_9293_aM && d13 !== d3) {
				d5 = 0.0;
				d3 = 0.0;
				d1 = 0.0;
			}

			let  z36: boolean = this.onGround || d13 !== d3 && d13 < 0.0;

			let  i21: int;
			for(i21 = 0; i21 < list35.length; ++i21) {
				d1 = (list35[i21] as AxisAlignedBB).calculateXOffset(this.boundingBox, d1);
			}

			this.boundingBox.offset(d1, 0.0, 0.0);
			if(!this.field_9293_aM && d11 !== d1) {
				d5 = 0.0;
				d3 = 0.0;
				d1 = 0.0;
			}

			for(i21 = 0; i21 < list35.length; ++i21) {
				d5 = (list35[i21] as AxisAlignedBB).calculateZOffset(this.boundingBox, d5);
			}

			this.boundingBox.offset(0.0, 0.0, d5);
			if(!this.field_9293_aM && d15 !== d5) {
				d5 = 0.0;
				d3 = 0.0;
				d1 = 0.0;
			}

			let  d23: double;
			let  i28: int;
			let  d37: double;
			if(this.stepHeight > 0.0 && z36 && this.ySize < 0.05 && (d11 !== d1 || d15 !== d5)) {
				d37 = d1;
				d23 = d3;
				let  d25: double = d5;
				d1 = d11;
				d3 = this.stepHeight as double;
				d5 = d15;
				let  axisAlignedBB27: AxisAlignedBB = this.boundingBox.copy();
				this.boundingBox.setBB(axisAlignedBB17);
				list35 = await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox.addCoord(d11, d3, d15));

				for(i28 = 0; i28 < list35.length; ++i28) {
					d3 = (list35[i28] as AxisAlignedBB).calculateYOffset(this.boundingBox, d3);
				}

				this.boundingBox.offset(0.0, d3, 0.0);
				if(!this.field_9293_aM && d13 !== d3) {
					d5 = 0.0;
					d3 = 0.0;
					d1 = 0.0;
				}

				for(i28 = 0; i28 < list35.length; ++i28) {
					d1 = (list35[i28] as AxisAlignedBB).calculateXOffset(this.boundingBox, d1);
				}

				this.boundingBox.offset(d1, 0.0, 0.0);
				if(!this.field_9293_aM && d11 !== d1) {
					d5 = 0.0;
					d3 = 0.0;
					d1 = 0.0;
				}

				for(i28 = 0; i28 < list35.length; ++i28) {
					d5 = (list35[i28] as AxisAlignedBB).calculateZOffset(this.boundingBox, d5);
				}

				this.boundingBox.offset(0.0, 0.0, d5);
				if(!this.field_9293_aM && d15 !== d5) {
					d5 = 0.0;
					d3 = 0.0;
					d1 = 0.0;
				}

				if(d37 * d37 + d25 * d25 >= d1 * d1 + d5 * d5) {
					d1 = d37;
					d3 = d23;
					d5 = d25;
					this.boundingBox.setBB(axisAlignedBB27);
				} else {
					this.ySize = (this.ySize as double + 0.5) as float;
				}
			}

			this.posX = (this.boundingBox.minX + this.boundingBox.maxX) / 2.0;
			this.posY = this.boundingBox.minY + this.yOffset as double - this.ySize as double;
			this.posZ = (this.boundingBox.minZ + this.boundingBox.maxZ) / 2.0;
			this.isCollidedHorizontally = d11 !== d1 || d15 !== d5;
			this.isCollidedVertically = d13 !== d3;
			this.onGround = d13 !== d3 && d13 < 0.0;
			this.isCollided = this.isCollidedHorizontally || this.isCollidedVertically;
			this.updateFallState(d3, this.onGround);
			if(d11 !== d1) {
				this.motionX = 0.0;
			}

			if(d13 !== d3) {
				this.motionY = 0.0;
			}

			if(d15 !== d5) {
				this.motionZ = 0.0;
			}

			d37 = this.posX - d7;
			d23 = this.posZ - d9;
			let  i26: int;
			let  i38: int;
			let  i40: int;
			if(this.entityWalks && !z18) {
				this.distanceWalkedModified = (this.distanceWalkedModified as double + MathHelper.sqrt_double(d37 * d37 + d23 * d23) as double * 0.6) as float;
				i38 = MathHelper.floor_double(this.posX);
				i26 = MathHelper.floor_double(this.posY - 0.2 as double - this.yOffset as double);
				i40 = MathHelper.floor_double(this.posZ);
				i28 = await this.worldObj.getBlockId(i38, i26, i40);
				if(this.distanceWalkedModified > this.nextStepDistance && i28 > 0) {
					++this.nextStepDistance;
					let  stepSound29: StepSound = Block.blocksList[i28].stepSound;
					if(await this.worldObj.getBlockId(i38, i26 + 1, i40) === Block.snow.blockID) {
						stepSound29 = Block.snow.stepSound;
						this.worldObj.playSoundAtEntity(this, stepSound29.func_1145_d(), stepSound29.func_1147_b() * 0.15, stepSound29.func_1144_c());
					} else if(!Block.blocksList[i28].blockMaterial.getIsLiquid()) {
						this.worldObj.playSoundAtEntity(this, stepSound29.func_1145_d(), stepSound29.func_1147_b() * 0.15, stepSound29.func_1144_c());
					}

					await Block.blocksList[i28].onEntityWalking(this.worldObj, i38, i26, i40, this);
				}
			}

			i38 = MathHelper.floor_double(this.boundingBox.minX);
			i26 = MathHelper.floor_double(this.boundingBox.minY);
			i40 = MathHelper.floor_double(this.boundingBox.minZ);
			i28 = MathHelper.floor_double(this.boundingBox.maxX);
			let  i41: int = MathHelper.floor_double(this.boundingBox.maxY);
			let  i30: int = MathHelper.floor_double(this.boundingBox.maxZ);
			if(this.worldObj.checkChunksExist(i38, i26, i40, i28, i41, i30)) {
				for(let  i31: int = i38; i31 <= i28; ++i31) {
					for(let  i32: int = i26; i32 <= i41; ++i32) {
						for(let  i33: int = i40; i33 <= i30; ++i33) {
							let  i34: int = await this.worldObj.getBlockId(i31, i32, i33);
							if(i34 > 0) {
								await Block.blocksList[i34].onEntityCollidedWithBlock(this.worldObj, i31, i32, i33, this);
							}
						}
					}
				}
			}

			this.ySize *= 0.4;
			let  z39: boolean = await this.handleWaterMovement();
			if(await this.worldObj.isBoundingBoxBurning(this.boundingBox)) {
				await this.dealFireDamage(1);
				if(!z39) {
					++this.fire;
					if(this.fire === 0) {
						this.fire = 300;
					}
				}
			} else if(this.fire <= 0) {
				this.fire = -this.fireResistance;
			}

			if(z39 && this.fire > 0) {
				this.worldObj.playSoundAtEntity(this, "random.fizz", 0.7, 1.6 + (this.rand.nextFloat() - this.rand.nextFloat()) * 0.4);
				this.fire = -this.fireResistance;
			}

		}
	}

	protected updateFallState(d1: double, z3: boolean):  void {
		if(z3) {
			if(this.fallDistance > 0.0) {
				this.fall(this.fallDistance);
				this.fallDistance = 0.0;
			}
		} else if(d1 < 0.0) {
			this.fallDistance = (this.fallDistance as double - d1) as float;
		}

	}

	public getBoundingBox():  AxisAlignedBB | undefined {
		return undefined;
	}

	protected async dealFireDamage(i1: int):  Promise<void> {
		if(!this.isImmuneToFire) {
			await this.attackEntityFrom(undefined as Entity, i1);
		}

	}

	protected fall(f1: float):  void {
	}

	public async handleWaterMovement():  Promise<boolean> {
		return await this.worldObj.handleMaterialAcceleration(this.boundingBox.expand(0.0, -0.4000000059604645, 0.0), MaterialRegistry.water, this);
	}

	public async isInsideOfMaterial(material1: Material| undefined):  Promise<boolean> {
		let  d2: double = this.posY + this.getEyeHeight() as double;
		let  i4: int = MathHelper.floor_double(this.posX);
		let  i5: int = MathHelper.floor_float(MathHelper.floor_double(d2) as float);
		let  i6: int = MathHelper.floor_double(this.posZ);
		let  i7: int = await this.worldObj.getBlockId(i4, i5, i6);
		if(i7 !== 0 && Block.blocksList[i7].blockMaterial === material1) {
			let  f8: float = BlockFluids.setFluidHeight(await this.worldObj.getBlockMetadata(i4, i5, i6)) - 0.11111111;
			let  f9: float = (i5 + 1) as float - f8;
			return d2 < f9;
		} else {
			return false;
		}
	}

	public getEyeHeight():  float {
		return 0.0;
	}

	public async handleLavaMovement():  Promise<boolean> {
		return await this.worldObj.isMaterialInBB(this.boundingBox.expand(-0.10000000149011612, -0.4000000059604645, -0.10000000149011612), MaterialRegistry.lava);
	}

	public moveFlying(f1: float, f2: float, f3: float):  void {
		let  f4: float = MathHelper.sqrt_float(f1 * f1 + f2 * f2);
		if(f4 >= 0.01) {
			if(f4 < 1.0) {
				f4 = 1.0;
			}

			f4 = f3 / f4;
			f1 *= f4;
			f2 *= f4;
			let  f5: float = MathHelper.sin(this.rotationYaw * java.lang.Math.PI as float / 180.0);
			let  f6: float = MathHelper.cos(this.rotationYaw * java.lang.Math.PI as float / 180.0);
			this.motionX += (f1 * f6 - f2 * f5) as double;
			this.motionZ += (f2 * f6 + f1 * f5) as double;
		}
	}

	public async getEntityBrightness(f1: float): Promise<float> {
		let  i2: int = MathHelper.floor_double(this.posX);
		let  d3: double = (this.boundingBox.maxY - this.boundingBox.minY) * 0.66;
		let  i5: int = MathHelper.floor_double(this.posY - this.yOffset as double + d3);
		let  i6: int = MathHelper.floor_double(this.posZ);
		return await this.worldObj.checkChunksExist(MathHelper.floor_double(this.boundingBox.minX), MathHelper.floor_double(this.boundingBox.minY), MathHelper.floor_double(this.boundingBox.minZ), MathHelper.floor_double(this.boundingBox.maxX), MathHelper.floor_double(this.boundingBox.maxY), MathHelper.floor_double(this.boundingBox.maxZ)) ? this.worldObj.getLightBrightness(i2, i5, i6) : 0.0;
	}

	public setWorld(world1: World| undefined):  void {
		this.worldObj = world1;
	}

	public setPositionAndRotation(d1: double, d3: double, d5: double, f7: float, f8: float):  void {
		this.prevPosX = this.posX = d1;
		this.prevPosY = this.posY = d3;
		this.prevPosZ = this.posZ = d5;
		this.prevRotationYaw = this.rotationYaw = f7;
		this.prevRotationPitch = this.rotationPitch = f8;
		this.ySize = 0.0;
		let  d9: double = (this.prevRotationYaw - f7) as double;
		if(d9 < -180.0) {
			this.prevRotationYaw += 360.0;
		}

		if(d9 >= 180.0) {
			this.prevRotationYaw -= 360.0;
		}

		this.setPosition(this.posX, this.posY, this.posZ);
		this.setRotation(f7, f8);
	}

	public setLocationAndAngles(d1: double, d3: double, d5: double, f7: float, f8: float):  void {
		this.lastTickPosX = this.prevPosX = this.posX = d1;
		this.lastTickPosY = this.prevPosY = this.posY = d3 + this.yOffset as double;
		this.lastTickPosZ = this.prevPosZ = this.posZ = d5;
		this.rotationYaw = f7;
		this.rotationPitch = f8;
		this.setPosition(this.posX, this.posY, this.posZ);
	}

	public getDistanceToEntity(entity1: Entity| undefined):  float {
		let  f2: float = (this.posX - entity1.posX) as float;
		let  f3: float = (this.posY - entity1.posY) as float;
		let  f4: float = (this.posZ - entity1.posZ) as float;
		return MathHelper.sqrt_float(f2 * f2 + f3 * f3 + f4 * f4);
	}

	public getDistanceSq(d1: double, d3: double, d5: double):  double {
		let  d7: double = this.posX - d1;
		let  d9: double = this.posY - d3;
		let  d11: double = this.posZ - d5;
		return d7 * d7 + d9 * d9 + d11 * d11;
	}

	public getDistance(d1: double, d3: double, d5: double):  double {
		let  d7: double = this.posX - d1;
		let  d9: double = this.posY - d3;
		let  d11: double = this.posZ - d5;
		return MathHelper.sqrt_double(d7 * d7 + d9 * d9 + d11 * d11) as double;
	}

	public getDistanceSqToEntity(entity1: Entity| undefined):  double {
		let  d2: double = this.posX - entity1.posX;
		let  d4: double = this.posY - entity1.posY;
		let  d6: double = this.posZ - entity1.posZ;
		return d2 * d2 + d4 * d4 + d6 * d6;
	}

	public async onCollideWithPlayer(entityPlayer1: IEntityPlayer| undefined):  Promise<void> {
	}

	public applyEntityCollision(entity1: Entity| undefined):  void {
		if(entity1.riddenByEntity !== this && entity1.ridingEntity !== this) {
			let  d2: double = entity1.posX - this.posX;
			let  d4: double = entity1.posZ - this.posZ;
			let  d6: double = MathHelper.abs_max(d2, d4);
			if(d6 >= 0.01) {
				d6 = MathHelper.sqrt_double(d6) as double;
				d2 /= d6;
				d4 /= d6;
				let  d8: double = 1.0 / d6;
				if(d8 > 1.0) {
					d8 = 1.0;
				}

				d2 *= d8;
				d4 *= d8;
				d2 *= 0.05 as double;
				d4 *= 0.05 as double;
				d2 *= (1.0 - this.entityCollisionReduction) as double;
				d4 *= (1.0 - this.entityCollisionReduction) as double;
				this.addVelocity(-d2, 0.0, -d4);
				entity1.addVelocity(d2, 0.0, d4);
			}

		}
	}

	public addVelocity(d1: double, d3: double, d5: double):  void {
		this.motionX += d1;
		this.motionY += d3;
		this.motionZ += d5;
	}

	protected setBeenAttacked():  void {
		this.beenAttacked = true;
	}

	public async attackEntityFrom(entity1: Entity| undefined, i2: int):  Promise<boolean> {
		this.setBeenAttacked();
		return false;
	}

	public canBeCollidedWith():  boolean {
		return false;
	}

	public canBePushed():  boolean {
		return false;
	}

	public addToPlayerScore(entity1: Entity| undefined, i2: int):  void {
	}

	public isInRangeToRenderVec3D(vec3D1: Vec3D| undefined):  boolean {
		let  d2: double = this.posX - vec3D1.xCoord;
		let  d4: double = this.posY - vec3D1.yCoord;
		let  d6: double = this.posZ - vec3D1.zCoord;
		let  d8: double = d2 * d2 + d4 * d4 + d6 * d6;
		return this.isInRangeToRenderDist(d8);
	}

	public isInRangeToRenderDist(d1: double):  boolean {
		let  d3: double = this.boundingBox.getAverageEdgeLength();
		d3 *= 64.0 * this.renderDistanceWeight;
		return d1 < d3 * d3;
	}

	public getEntityTexture():  string {
		return '';
	}

	public addEntityID(nBTTagCompound1: NBTTagCompound| undefined):  boolean {
		let  string2 = this.getEntityString();
		if(!this.isDead && string2 !== undefined) {
			nBTTagCompound1.setString("id", string2);
			this.writeToNBT(nBTTagCompound1);
			return true;
		} else {
			return false;
		}
	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		nBTTagCompound1.setTag("Pos", this.newDoubleNBTList( [this.posX, this.posY, this.posZ]));
		nBTTagCompound1.setTag("Motion", this.newDoubleNBTList( [this.motionX, this.motionY, this.motionZ]));
		nBTTagCompound1.setTag("Rotation", this.func_377_a( [this.rotationYaw, this.rotationPitch]));
		nBTTagCompound1.setFloat("FallDistance", this.fallDistance);
		nBTTagCompound1.setShort("Fire", this.fire as short);
		nBTTagCompound1.setShort("Air", this.air as short);
		nBTTagCompound1.setBoolean("OnGround", this.onGround);
		this.writeEntityToNBT(nBTTagCompound1);
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		let  nBTTagList2: NBTTagList = nBTTagCompound1.getTagList("Pos");
		let  nBTTagList3: NBTTagList = nBTTagCompound1.getTagList("Motion");
		let  nBTTagList4: NBTTagList = nBTTagCompound1.getTagList("Rotation");
		this.setPosition(0.0, 0.0, 0.0);
		this.motionX = (nBTTagList3.tagAt(0) as NBTTagDouble).doubleValue;
		this.motionY = (nBTTagList3.tagAt(1) as NBTTagDouble).doubleValue;
		this.motionZ = (nBTTagList3.tagAt(2) as NBTTagDouble).doubleValue;
		this.prevPosX = this.lastTickPosX = this.posX = (nBTTagList2.tagAt(0) as NBTTagDouble).doubleValue;
		this.prevPosY = this.lastTickPosY = this.posY = (nBTTagList2.tagAt(1) as NBTTagDouble).doubleValue;
		this.prevPosZ = this.lastTickPosZ = this.posZ = (nBTTagList2.tagAt(2) as NBTTagDouble).doubleValue;
		this.prevRotationYaw = this.rotationYaw = (nBTTagList4.tagAt(0) as NBTTagFloat).floatValue;
		this.prevRotationPitch = this.rotationPitch = (nBTTagList4.tagAt(1) as NBTTagFloat).floatValue;
		this.fallDistance = nBTTagCompound1.getFloat("FallDistance");
		this.fire = nBTTagCompound1.getShort("Fire");
		this.air = nBTTagCompound1.getShort("Air");
		this.onGround = nBTTagCompound1.getBoolean("OnGround");
		this.setPosition(this.posX, this.posY, this.posZ);
		this.readEntityFromNBT(nBTTagCompound1);
	}

	protected getEntityString(): string {
		return EntityList.getEntityString(this);
	}

	protected abstract readEntityFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void;

	protected abstract writeEntityToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void;

	protected newDoubleNBTList(d1: double[]):  NBTTagList | undefined {
		let  nBTTagList2: NBTTagList = new  NBTTagList();
		let  d3 = d1;
		let  i4: int = d1.length;

		for(let  i5: int = 0; i5 < i4; ++i5) {
			let  d6: double = d3[i5];
			nBTTagList2.setTag(new  NBTTagDouble(d6));
		}

		return nBTTagList2;
	}

	protected func_377_a(f1: float[]):  NBTTagList | undefined {
		let  nBTTagList2: NBTTagList = new  NBTTagList();
		let  f3 = f1;
		let  i4: int = f1.length;

		for(let  i5: int = 0; i5 < i4; ++i5) {
			let  f6: float = f3[i5];
			nBTTagList2.setTag(new  NBTTagFloat(f6));
		}

		return nBTTagList2;
	}

	public getShadowSize():  float {
		return this.height / 2.0;
	}

	public async dropItem(i1: int, i2: int):  Promise<IEntityItem | undefined> {
		return await this.dropItemWithOffset(i1, i2, 0.0);
	}

	public async dropItemWithOffset(i1: int, i2: int, f3: float):  Promise<IEntityItem | undefined> {
		return await this.entityDropItem(new  ItemStack(i1, i2, 0), f3);
	}

	public async entityDropItem(itemStack1: ItemStack| undefined, f2: float):  Promise<IEntityItem | undefined> {

		let  entityItem3 = Entity.entityItemCtor(this.worldObj, this.posX, this.posY + f2 as double, this.posZ, itemStack1);
		//let  entityItem3: EntityItem = new  EntityItem(this.worldObj, this.posX, this.posY + f2 as double, this.posZ, itemStack1);
		entityItem3.delayBeforeCanPickup = 10;
		await this.worldObj.entityJoinedWorld(entityItem3 as any);
		return entityItem3;
	}

	public isEntityAlive():  boolean {
		return !this.isDead;
	}

	public async func_345_I():  Promise<boolean> {
		let  i1: int = MathHelper.floor_double(this.posX);
		let  i2: int = MathHelper.floor_double(this.posY + this.getEyeHeight() as double);
		let  i3: int = MathHelper.floor_double(this.posZ);
		return await this.worldObj.isBlockOpaqueCube(i1, i2, i3);
	}

	public async interact(entityPlayer1: IEntityPlayer| undefined):  Promise<boolean> {
		return false;
	}

	public func_383_b_(entity1: Entity| undefined):  AxisAlignedBB | undefined {
		return undefined;
	}

	public async updateRidden():  Promise<void> {
		if(this.ridingEntity.isDead) {
			this.ridingEntity = undefined;
		} else {
			this.motionX = 0.0;
			this.motionY = 0.0;
			this.motionZ = 0.0;
			await this.onUpdate();
			this.ridingEntity.updateRiderPosition();
			this.entityRiderYawDelta += (this.ridingEntity.rotationYaw - this.ridingEntity.prevRotationYaw) as double;

			for(this.entityRiderPitchDelta += (this.ridingEntity.rotationPitch - this.ridingEntity.prevRotationPitch) as double; this.entityRiderYawDelta >= 180.0; this.entityRiderYawDelta -= 360.0) {
			}

			while(this.entityRiderYawDelta < -180.0) {
				this.entityRiderYawDelta += 360.0;
			}

			while(this.entityRiderPitchDelta >= 180.0) {
				this.entityRiderPitchDelta -= 360.0;
			}

			while(this.entityRiderPitchDelta < -180.0) {
				this.entityRiderPitchDelta += 360.0;
			}

			let  d1: double = this.entityRiderYawDelta * 0.5;
			let  d3: double = this.entityRiderPitchDelta * 0.5;
			let  f5: float = 10.0;
			if(d1 > f5) {
				d1 = f5;
			}

			if(d1 < (-f5)) {
				d1 = (-f5);
			}

			if(d3 > f5) {
				d3 = f5;
			}

			if(d3 < (-f5)) {
				d3 = (-f5);
			}

			this.entityRiderYawDelta -= d1;
			this.entityRiderPitchDelta -= d3;
			this.rotationYaw = (this.rotationYaw as double + d1) as float;
			this.rotationPitch = (this.rotationPitch as double + d3) as float;
		}
	}

	public updateRiderPosition():  void {
		this.riddenByEntity.setPosition(this.posX, this.posY + this.getMountedYOffset() + this.riddenByEntity.getYOffset(), this.posZ);
	}

	public getYOffset():  double {
		return this.yOffset as double;
	}

	public getMountedYOffset():  double {
		return this.height as double * 0.75;
	}

	public mountEntity(entity1: Entity| undefined):  void {
		this.entityRiderPitchDelta = 0.0;
		this.entityRiderYawDelta = 0.0;
		if(entity1 === undefined) {
			if(this.ridingEntity !== undefined) {
				this.setLocationAndAngles(this.ridingEntity.posX, this.ridingEntity.boundingBox.minY + this.ridingEntity.height as double, this.ridingEntity.posZ, this.rotationYaw, this.rotationPitch);
				this.ridingEntity.riddenByEntity = undefined;
			}

			this.ridingEntity = undefined;
		} else if(this.ridingEntity === entity1) {
			this.ridingEntity.riddenByEntity = undefined;
			this.ridingEntity = undefined;
			this.setLocationAndAngles(entity1.posX, entity1.boundingBox.minY + entity1.height as double, entity1.posZ, this.rotationYaw, this.rotationPitch);
		} else {
			if(this.ridingEntity !== undefined) {
				this.ridingEntity.riddenByEntity = undefined;
			}

			if(entity1.riddenByEntity !== undefined) {
				entity1.riddenByEntity.ridingEntity = undefined;
			}

			this.ridingEntity = entity1;
			entity1.riddenByEntity = this;
		}
	}

	public setPositionAndRotation2(d1: double, d3: double, d5: double, f7: float, f8: float, i9: int):  void {
		this.setPosition(d1, d3, d5);
		this.setRotation(f7, f8);
	}

	public getCollisionBorderSize():  float {
		return 0.1;
	}

	public getLookVec():  Vec3D | undefined {
		return undefined;
	}

	public setInPortal():  void {
	}

	public setVelocity(d1: double, d3: double, d5: double):  void {
		this.motionX = d1;
		this.motionY = d3;
		this.motionZ = d5;
	}

	public handleHealthUpdate(b1: byte):  void {
	}

	public performHurtAnimation():  void {
	}

	public updateCloak():  void {
	}

	public func_20045_c(i1: int, i2: int, i3: int):  void {
	}

	public func_21062_U():  boolean {
		return this.fire > 0 || this.func_21060_d(0);
	}

	public func_21063_V():  boolean {
		return this.ridingEntity !== undefined || this.func_21060_d(2);
	}

	public isSneaking():  boolean {
		return this.func_21060_d(1);
	}

	protected func_21060_d(i1: int):  boolean {
		return (this.dataWatcher.getWatchableObjectByte(0) & 1 << i1) !== 0;
	}

	protected func_21059_b(i1: int, z2: boolean):  void {
		let  b3: byte = this.dataWatcher.getWatchableObjectByte(0);
		if(z2) {
			this.dataWatcher.updateObject(0, (b3 | 1 << i1) as byte);
		} else {
			this.dataWatcher.updateObject(0, (b3 & ~(1 << i1)) as byte);
		}

	}
}
