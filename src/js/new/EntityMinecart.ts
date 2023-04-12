


import { int, double, java, float, short, byte, S } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";
import { EntityLiving } from "./EntityLiving";
import { EntityItem } from "./EntityItem";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Item } from "./Item";
import { Block } from "./Block";




export  class EntityMinecart extends Entity implements IInventory {
	private cargoItems:  ItemStack[] | null;
	public field_20910_a:  int;
	public field_20911_b:  int;
	public field_20912_c:  int;
	private field_856_i:  boolean;
	public minecartType:  int;
	public fuel:  int;
	public pushX:  double;
	public pushZ:  double;
	private static readonly field_855_j:  number[][][] =  [[[0, 0, -1], [0, 0, 1]], [[-1, 0, 0], [1, 0, 0]], [[-1, -1, 0], [1, 0, 0]], [[-1, 0, 0], [1, -1, 0]], [[0, 0, -1], [0, -1, 1]], [[0, -1, -1], [0, 0, 1]], [[0, 0, 1], [1, 0, 0]], [[0, 0, 1], [-1, 0, 0]], [[0, 0, -1], [-1, 0, 0]], [[0, 0, -1], [1, 0, 0]]];
	private field_9415_k:  int;
	private field_9414_l:  double;
	private field_9413_m:  double;
	private field_9412_n:  double;
	private field_9411_o:  double;
	private field_9410_p:  double;
	private field_9409_q:  double;
	private field_9408_r:  double;
	private field_9407_s:  double;

	public override get type(): string {
		return 'Minecart';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, d2: double, d4: double, d6: double, i8: int);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);
		switch (args.length) {
			case 1: {
				this.cargoItems = new   Array<ItemStack>(36);
				this.field_20910_a = 0;
				this.field_20911_b = 0;
				this.field_20912_c = 1;
				this.field_856_i = false;
				this.preventEntitySpawning = true;
				this.setSize(0.98, 0.7);
				this.yOffset = this.height / 2.0;
				this.entityWalks = false;
				break;
			}

			case 5: {
				const [, d2, d4, d6, i8] = args as [World, double, double, double, int];
				this.setPosition(d2, d4 + this.yOffset as double, d6);
				this.motionX = 0.0;
				this.motionY = 0.0;
				this.motionZ = 0.0;
				this.prevPosX = d2;
				this.prevPosY = d4;
				this.prevPosZ = d6;
				this.minecartType = i8;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	protected entityInit():  void {
	}

	public func_383_b_(entity1: Entity| null):  AxisAlignedBB | null {
		return entity1.boundingBox;
	}

	public getBoundingBox():  AxisAlignedBB | null {
		return null;
	}

	public canBePushed():  boolean {
		return true;
	}

	public getMountedYOffset():  double {
		return this.height as double * 0.0 - 0.3 as double;
	}

	public async attackEntityFrom(entity1: Entity| null, i2: int):  Promise<boolean> {
		if(!this.worldObj.multiplayerWorld && !this.isDead) {
			this.field_20912_c = -this.field_20912_c;
			this.field_20911_b = 10;
			this.setBeenAttacked();
			this.field_20910_a += i2 * 10;
			if(this.field_20910_a > 40) {
				await this.dropItemWithOffset(Item.minecartEmpty.shiftedIndex, 1, 0.0);
				if(this.minecartType === 1) {
					await this.dropItemWithOffset(Block.crate.blockID, 1, 0.0);
				} else if(this.minecartType === 2) {
					await this.dropItemWithOffset(Block.stoneOvenIdle.blockID, 1, 0.0);
				}

				await this.setEntityDead();
			}

			return true;
		} else {
			return true;
		}
	}

	public performHurtAnimation():  void {
		console.log("Animating hurt");
		this.field_20912_c = -this.field_20912_c;
		this.field_20911_b = 10;
		this.field_20910_a += this.field_20910_a * 10;
	}

	public canBeCollidedWith():  boolean {
		return !this.isDead;
	}

	public async setEntityDead():  Promise<void> {
		for(let  i1: int = 0; i1 < this.getSizeInventory(); ++i1) {
			let  itemStack2: ItemStack = this.getStackInSlot(i1);
			if(itemStack2 !== null) {
				let  f3: float = this.rand.nextFloat() * 0.8 + 0.1;
				let  f4: float = this.rand.nextFloat() * 0.8 + 0.1;
				let  f5: float = this.rand.nextFloat() * 0.8 + 0.1;

				while(itemStack2.stackSize > 0) {
					let  i6: int = this.rand.nextInt(21) + 10;
					if(i6 > itemStack2.stackSize) {
						i6 = itemStack2.stackSize;
					}

					itemStack2.stackSize -= i6;
					let  entityItem7: EntityItem = new  EntityItem(this.worldObj, this.posX + f3 as double, this.posY + f4 as double, this.posZ + f5 as double, new  ItemStack(itemStack2.itemID, i6, itemStack2.getItemDamage()));
					let  f8: float = 0.05;
					entityItem7.motionX = (this.rand.nextGaussian() as float * f8) as double;
					entityItem7.motionY = (this.rand.nextGaussian() as float * f8 + 0.2) as double;
					entityItem7.motionZ = (this.rand.nextGaussian() as float * f8) as double;
					await this.worldObj.entityJoinedWorld(entityItem7);
				}
			}
		}

		await super.setEntityDead();
	}

	public async onUpdate(): Promise<void> {
		if(this.field_20911_b > 0) {
			--this.field_20911_b;
		}

		if(this.field_20910_a > 0) {
			--this.field_20910_a;
		}

		let  d7: double;
		if(this.worldObj.multiplayerWorld && this.field_9415_k > 0) {
			if(this.field_9415_k > 0) {
				let  d41: double = this.posX + (this.field_9414_l - this.posX) / this.field_9415_k as double;
				let  d42: double = this.posY + (this.field_9413_m - this.posY) / this.field_9415_k as double;
				let  d5: double = this.posZ + (this.field_9412_n - this.posZ) / this.field_9415_k as double;

				for(d7 = this.field_9411_o - this.rotationYaw as double; d7 < -180.0; d7 += 360.0) {
				}

				while(d7 >= 180.0) {
					d7 -= 360.0;
				}

				this.rotationYaw = (this.rotationYaw as double + d7 / this.field_9415_k as double) as float;
				this.rotationPitch = (this.rotationPitch as double + (this.field_9410_p - this.rotationPitch as double) / this.field_9415_k as double) as float;
				--this.field_9415_k;
				this.setPosition(d41, d42, d5);
				this.setRotation(this.rotationYaw, this.rotationPitch);
			} else {
				this.setPosition(this.posX, this.posY, this.posZ);
				this.setRotation(this.rotationYaw, this.rotationPitch);
			}

		} else {
			this.prevPosX = this.posX;
			this.prevPosY = this.posY;
			this.prevPosZ = this.posZ;
			this.motionY -= 0.04 as double;
			let  i1: int = MathHelper.floor_double(this.posX);
			let  i2: int = MathHelper.floor_double(this.posY);
			let  i3: int = MathHelper.floor_double(this.posZ);
			if(await this.worldObj.getBlockId(i1, i2 - 1, i3) === Block.minecartTrack.blockID) {
				--i2;
			}

			let  d4: double = 0.4;
			let  z6: boolean = false;
			d7 = 2.0 / 256;
			if(await this.worldObj.getBlockId(i1, i2, i3) === Block.minecartTrack.blockID) {
				let  vec3D9: Vec3D = await this.func_514_g(this.posX, this.posY, this.posZ);
				let  i10: int = await this.worldObj.getBlockMetadata(i1, i2, i3);
				this.posY = i2 as double;
				if(i10 >= 2 && i10 <= 5) {
					this.posY = (i2 + 1) as double;
				}

				if(i10 === 2) {
					this.motionX -= d7;
				}

				if(i10 === 3) {
					this.motionX += d7;
				}

				if(i10 === 4) {
					this.motionZ += d7;
				}

				if(i10 === 5) {
					this.motionZ -= d7;
				}

				let  i11 = EntityMinecart.field_855_j[i10];
				let  d12: double = (i11[1][0] - i11[0][0]) as double;
				let  d14: double = (i11[1][2] - i11[0][2]) as double;
				let  d16: double = java.lang.Math.sqrt(d12 * d12 + d14 * d14);
				let  d18: double = this.motionX * d12 + this.motionZ * d14;
				if(d18 < 0.0) {
					d12 = -d12;
					d14 = -d14;
				}

				let  d20: double = java.lang.Math.sqrt(this.motionX * this.motionX + this.motionZ * this.motionZ);
				this.motionX = d20 * d12 / d16;
				this.motionZ = d20 * d14 / d16;
				let  d22: double = 0.0;
				let  d24: double = i1 as double + 0.5 + i11[0][0] as double * 0.5;
				let  d26: double = i3 as double + 0.5 + i11[0][2] as double * 0.5;
				let  d28: double = i1 as double + 0.5 + i11[1][0] as double * 0.5;
				let  d30: double = i3 as double + 0.5 + i11[1][2] as double * 0.5;
				d12 = d28 - d24;
				d14 = d30 - d26;
				let  d32: double;
				let  d34: double;
				let  d36: double;
				if(d12 === 0.0) {
					this.posX = i1 as double + 0.5;
					d22 = this.posZ - i3 as double;
				} else if(d14 === 0.0) {
					this.posZ = i3 as double + 0.5;
					d22 = this.posX - i1 as double;
				} else {
					d32 = this.posX - d24;
					d34 = this.posZ - d26;
					d36 = (d32 * d12 + d34 * d14) * 2.0;
					d22 = d36;
				}

				this.posX = d24 + d12 * d22;
				this.posZ = d26 + d14 * d22;
				this.setPosition(this.posX, this.posY + this.yOffset as double, this.posZ);
				d32 = this.motionX;
				d34 = this.motionZ;
				if(this.riddenByEntity !== null) {
					d32 *= 0.75;
					d34 *= 0.75;
				}

				if(d32 < -d4) {
					d32 = -d4;
				}

				if(d32 > d4) {
					d32 = d4;
				}

				if(d34 < -d4) {
					d34 = -d4;
				}

				if(d34 > d4) {
					d34 = d4;
				}

				await this.moveEntity(d32, 0.0, d34);
				if(i11[0][1] !== 0 && MathHelper.floor_double(this.posX) - i1 === i11[0][0] && MathHelper.floor_double(this.posZ) - i3 === i11[0][2]) {
					this.setPosition(this.posX, this.posY + i11[0][1] as double, this.posZ);
				} else if(i11[1][1] !== 0 && MathHelper.floor_double(this.posX) - i1 === i11[1][0] && MathHelper.floor_double(this.posZ) - i3 === i11[1][2]) {
					this.setPosition(this.posX, this.posY + i11[1][1] as double, this.posZ);
				}

				if(this.riddenByEntity !== null) {
					this.motionX *= 0.997 as double;
					this.motionY *= 0.0;
					this.motionZ *= 0.997 as double;
				} else {
					if(this.minecartType === 2) {
						d36 = MathHelper.sqrt_double(this.pushX * this.pushX + this.pushZ * this.pushZ) as double;
						if(d36 > 0.01) {
							z6 = true;
							this.pushX /= d36;
							this.pushZ /= d36;
							let  d38: double = 0.04;
							this.motionX *= 0.8 as double;
							this.motionY *= 0.0;
							this.motionZ *= 0.8 as double;
							this.motionX += this.pushX * d38;
							this.motionZ += this.pushZ * d38;
						} else {
							this.motionX *= 0.9 as double;
							this.motionY *= 0.0;
							this.motionZ *= 0.9 as double;
						}
					}

					this.motionX *= 0.96 as double;
					this.motionY *= 0.0;
					this.motionZ *= 0.96 as double;
				}

				let  vec3D46: Vec3D = await this.func_514_g(this.posX, this.posY, this.posZ);
				if(vec3D46 !== null && vec3D9 !== null) {
					let  d37: double = (vec3D9.yCoord - vec3D46.yCoord) * 0.05;
					d20 = java.lang.Math.sqrt(this.motionX * this.motionX + this.motionZ * this.motionZ);
					if(d20 > 0.0) {
						this.motionX = this.motionX / d20 * (d20 + d37);
						this.motionZ = this.motionZ / d20 * (d20 + d37);
					}

					this.setPosition(this.posX, vec3D46.yCoord, this.posZ);
				}

				let  i47: int = MathHelper.floor_double(this.posX);
				let  i48: int = MathHelper.floor_double(this.posZ);
				if(i47 !== i1 || i48 !== i3) {
					d20 = java.lang.Math.sqrt(this.motionX * this.motionX + this.motionZ * this.motionZ);
					this.motionX = d20 * (i47 - i1) as double;
					this.motionZ = d20 * (i48 - i3) as double;
				}

				if(this.minecartType === 2) {
					let  d39: double = MathHelper.sqrt_double(this.pushX * this.pushX + this.pushZ * this.pushZ) as double;
					if(d39 > 0.01 && this.motionX * this.motionX + this.motionZ * this.motionZ > 0.001) {
						this.pushX /= d39;
						this.pushZ /= d39;
						if(this.pushX * this.motionX + this.pushZ * this.motionZ < 0.0) {
							this.pushX = 0.0;
							this.pushZ = 0.0;
						} else {
							this.pushX = this.motionX;
							this.pushZ = this.motionZ;
						}
					}
				}
			} else {
				if(this.motionX < -d4) {
					this.motionX = -d4;
				}

				if(this.motionX > d4) {
					this.motionX = d4;
				}

				if(this.motionZ < -d4) {
					this.motionZ = -d4;
				}

				if(this.motionZ > d4) {
					this.motionZ = d4;
				}

				if(this.onGround) {
					this.motionX *= 0.5;
					this.motionY *= 0.5;
					this.motionZ *= 0.5;
				}

				await this.moveEntity(this.motionX, this.motionY, this.motionZ);
				if(!this.onGround) {
					this.motionX *= 0.95 as double;
					this.motionY *= 0.95 as double;
					this.motionZ *= 0.95 as double;
				}
			}

			this.rotationPitch = 0.0;
			let  d43: double = this.prevPosX - this.posX;
			let  d44: double = this.prevPosZ - this.posZ;
			if(d43 * d43 + d44 * d44 > 0.001) {
				this.rotationYaw = (java.lang.Math.atan2(d44, d43) * 180.0 / java.lang.Math.PI) as float;
				if(this.field_856_i) {
					this.rotationYaw += 180.0;
				}
			}

			let  d13: double;
			for(d13 = (this.rotationYaw - this.prevRotationYaw) as double; d13 >= 180.0; d13 -= 360.0) {
			}

			while(d13 < -180.0) {
				d13 += 360.0;
			}

			if(d13 < -170.0 || d13 >= 170.0) {
				this.rotationYaw += 180.0;
				this.field_856_i = !this.field_856_i;
			}

			this.setRotation(this.rotationYaw, this.rotationPitch);
			let  list15 = await this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.expand(0.2 as double, 0.0, 0.2 as double));
			if(list15 !== null && list15.length > 0) {
				for(let  i45: int = 0; i45 < list15.length; ++i45) {
					let  entity17: Entity = list15[i45] as Entity;
					if(entity17 !== this.riddenByEntity && entity17.canBePushed() && entity17 instanceof EntityMinecart) {
						entity17.applyEntityCollision(this);
					}
				}
			}

			if(this.riddenByEntity !== null && this.riddenByEntity.isDead) {
				this.riddenByEntity = null;
			}

			if(z6 && this.rand.nextInt(4) === 0) {
				--this.fuel;
				if(this.fuel < 0) {
					this.pushX = this.pushZ = 0.0;
				}

				this.worldObj.spawnParticle("largesmoke", this.posX, this.posY + 0.8, this.posZ, 0.0, 0.0, 0.0);
			}

		}
	}

	public async func_515_a(d1: double, d3: double, d5: double, d7: double):  Promise<Vec3D | null> {
		let  i9: int = MathHelper.floor_double(d1);
		let  i10: int = MathHelper.floor_double(d3);
		let  i11: int = MathHelper.floor_double(d5);
		if(await this.worldObj.getBlockId(i9, i10 - 1, i11) === Block.minecartTrack.blockID) {
			--i10;
		}

		if(await this.worldObj.getBlockId(i9, i10, i11) === Block.minecartTrack.blockID) {
			let  i12: int = await this.worldObj.getBlockMetadata(i9, i10, i11);
			d3 = i10 as double;
			if(i12 >= 2 && i12 <= 5) {
				d3 = (i10 + 1) as double;
			}

			let  i13 = EntityMinecart.field_855_j[i12];
			let  d14: double = (i13[1][0] - i13[0][0]) as double;
			let  d16: double = (i13[1][2] - i13[0][2]) as double;
			let  d18: double = java.lang.Math.sqrt(d14 * d14 + d16 * d16);
			d14 /= d18;
			d16 /= d18;
			d1 += d14 * d7;
			d5 += d16 * d7;
			if(i13[0][1] !== 0 && MathHelper.floor_double(d1) - i9 === i13[0][0] && MathHelper.floor_double(d5) - i11 === i13[0][2]) {
				d3 += i13[0][1] as double;
			} else if(i13[1][1] !== 0 && MathHelper.floor_double(d1) - i9 === i13[1][0] && MathHelper.floor_double(d5) - i11 === i13[1][2]) {
				d3 += i13[1][1] as double;
			}

			return await this.func_514_g(d1, d3, d5);
		} else {
			return null;
		}
	}

	public async func_514_g(d1: double, d3: double, d5: double):  Promise<Vec3D | null> {
		let  i7: int = MathHelper.floor_double(d1);
		let  i8: int = MathHelper.floor_double(d3);
		let  i9: int = MathHelper.floor_double(d5);
		if(await this.worldObj.getBlockId(i7, i8 - 1, i9) === Block.minecartTrack.blockID) {
			--i8;
		}

		if(await this.worldObj.getBlockId(i7, i8, i9) === Block.minecartTrack.blockID) {
			let  i10 = await this.worldObj.getBlockMetadata(i7, i8, i9);
			d3 = i8;
			if(i10 >= 2 && i10 <= 5) {
				d3 = (i8 + 1) as double;
			}

			let  i11 = EntityMinecart.field_855_j[i10];
			let  d12: double = 0.0;
			let  d14: double = i7 as double + 0.5 + i11[0][0] as double * 0.5;
			let  d16: double = i8 as double + 0.5 + i11[0][1] as double * 0.5;
			let  d18: double = i9 as double + 0.5 + i11[0][2] as double * 0.5;
			let  d20: double = i7 as double + 0.5 + i11[1][0] as double * 0.5;
			let  d22: double = i8 as double + 0.5 + i11[1][1] as double * 0.5;
			let  d24: double = i9 as double + 0.5 + i11[1][2] as double * 0.5;
			let  d26: double = d20 - d14;
			let  d28: double = (d22 - d16) * 2.0;
			let  d30: double = d24 - d18;
			if(d26 === 0.0) {
				d1 = i7 as double + 0.5;
				d12 = d5 - i9 as double;
			} else if(d30 === 0.0) {
				d5 = i9 as double + 0.5;
				d12 = d1 - i7 as double;
			} else {
				let  d32: double = d1 - d14;
				let  d34: double = d5 - d18;
				let  d36: double = (d32 * d26 + d34 * d30) * 2.0;
				d12 = d36;
			}

			d1 = d14 + d26 * d12;
			d3 = d16 + d28 * d12;
			d5 = d18 + d30 * d12;
			if(d28 < 0.0) {
				++d3;
			}

			if(d28 > 0.0) {
				d3 += 0.5;
			}

			return Vec3D.createVector(d1, d3, d5);
		} else {
			return null;
		}
	}

	protected writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setInteger("Type", this.minecartType);
		if(this.minecartType === 2) {
			nBTTagCompound1.setDouble("PushX", this.pushX);
			nBTTagCompound1.setDouble("PushZ", this.pushZ);
			nBTTagCompound1.setShort("Fuel", this.fuel as short);
		} else if(this.minecartType === 1) {
			let  nBTTagList2: NBTTagList = new  NBTTagList();

			for(let  i3: int = 0; i3 < this.cargoItems.length; ++i3) {
				if(this.cargoItems[i3] !== null) {
					let  nBTTagCompound4: NBTTagCompound = new  NBTTagCompound();
					nBTTagCompound4.setByte("Slot", i3 as byte);
					this.cargoItems[i3].writeToNBT(nBTTagCompound4);
					nBTTagList2.setTag(nBTTagCompound4);
				}
			}

			nBTTagCompound1.setTag("Items", nBTTagList2);
		}

	}

	protected readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.minecartType = nBTTagCompound1.getInteger("Type");
		if(this.minecartType === 2) {
			this.pushX = nBTTagCompound1.getDouble("PushX");
			this.pushZ = nBTTagCompound1.getDouble("PushZ");
			this.fuel = nBTTagCompound1.getShort("Fuel");
		} else if(this.minecartType === 1) {
			let  nBTTagList2: NBTTagList = nBTTagCompound1.getTagList("Items");
			this.cargoItems = new   Array<ItemStack>(this.getSizeInventory());

			for(let  i3: int = 0; i3 < nBTTagList2.tagCount(); ++i3) {
				let  nBTTagCompound4: NBTTagCompound = nBTTagList2.tagAt(i3) as NBTTagCompound;
				let  i5: int = nBTTagCompound4.getByte("Slot") & 255;
				if(i5 >= 0 && i5 < this.cargoItems.length) {
					this.cargoItems[i5] = new  ItemStack(nBTTagCompound4);
				}
			}
		}

	}

	public getShadowSize():  float {
		return 0.0;
	}

	public applyEntityCollision(entity1: Entity| null):  void {
		if(!this.worldObj.multiplayerWorld) {
			if(entity1 !== this.riddenByEntity) {
				if(entity1 instanceof EntityLiving && !(entity1 instanceof EntityPlayer) && this.minecartType === 0 && this.motionX * this.motionX + this.motionZ * this.motionZ > 0.01 && this.riddenByEntity === null && entity1.ridingEntity === null) {
					entity1.mountEntity(this);
				}

				let  d2: double = entity1.posX - this.posX;
				let  d4: double = entity1.posZ - this.posZ;
				let  d6: double = d2 * d2 + d4 * d4;
				if(d6 >= 9.999999747378752E-5) {
					d6 = MathHelper.sqrt_double(d6) as double;
					d2 /= d6;
					d4 /= d6;
					let  d8: double = 1.0 / d6;
					if(d8 > 1.0) {
						d8 = 1.0;
					}

					d2 *= d8;
					d4 *= d8;
					d2 *= 0.1 as double;
					d4 *= 0.1 as double;
					d2 *= (1.0 - this.entityCollisionReduction) as double;
					d4 *= (1.0 - this.entityCollisionReduction) as double;
					d2 *= 0.5;
					d4 *= 0.5;
					if(entity1 instanceof EntityMinecart) {
						let  d10: double = entity1.motionX + this.motionX;
						let  d12: double = entity1.motionZ + this.motionZ;
						if((entity1 as EntityMinecart).minecartType === 2 && this.minecartType !== 2) {
							this.motionX *= 0.2 as double;
							this.motionZ *= 0.2 as double;
							this.addVelocity(entity1.motionX - d2, 0.0, entity1.motionZ - d4);
							entity1.motionX *= 0.7 as double;
							entity1.motionZ *= 0.7 as double;
						} else if((entity1 as EntityMinecart).minecartType !== 2 && this.minecartType === 2) {
							entity1.motionX *= 0.2 as double;
							entity1.motionZ *= 0.2 as double;
							entity1.addVelocity(this.motionX + d2, 0.0, this.motionZ + d4);
							this.motionX *= 0.7 as double;
							this.motionZ *= 0.7 as double;
						} else {
							d10 /= 2.0;
							d12 /= 2.0;
							this.motionX *= 0.2 as double;
							this.motionZ *= 0.2 as double;
							this.addVelocity(d10 - d2, 0.0, d12 - d4);
							entity1.motionX *= 0.2 as double;
							entity1.motionZ *= 0.2 as double;
							entity1.addVelocity(d10 + d2, 0.0, d12 + d4);
						}
					} else {
						this.addVelocity(-d2, 0.0, -d4);
						entity1.addVelocity(d2 / 4.0, 0.0, d4 / 4.0);
					}
				}

			}
		}
	}

	public getSizeInventory():  int {
		return 27;
	}

	public getStackInSlot(i1: int):  ItemStack | null {
		return this.cargoItems[i1];
	}

	public async decrStackSize(i1: int, i2: int):  Promise<ItemStack | null> {
		if(this.cargoItems[i1] !== null) {
			let  itemStack3: ItemStack;
			if(this.cargoItems[i1].stackSize <= i2) {
				itemStack3 = this.cargoItems[i1];
				this.cargoItems[i1] = null;
				return itemStack3;
			} else {
				itemStack3 = this.cargoItems[i1].splitStack(i2);
				if(this.cargoItems[i1].stackSize === 0) {
					this.cargoItems[i1] = null;
				}

				return itemStack3;
			}
		} else {
			return null;
		}
	}

	public async setInventorySlotContents(i1: int, itemStack2: ItemStack| null):  Promise<void> {
		this.cargoItems[i1] = itemStack2;
		if(itemStack2 !== null && itemStack2.stackSize > this.getInventoryStackLimit()) {
			itemStack2.stackSize = this.getInventoryStackLimit();
		}

	}

	public getInvName(): string {
		return "Minecart";
	}

	public getInventoryStackLimit():  int {
		return 64;
	}

	public onInventoryChanged():  void {
	}

	public async interact(entityPlayer1: EntityPlayer| null):  Promise<boolean> {
		if(this.minecartType === 0) {
			if(this.riddenByEntity !== null && this.riddenByEntity instanceof EntityPlayer && this.riddenByEntity !== entityPlayer1) {
				return true;
			}

			if(!this.worldObj.multiplayerWorld) {
				entityPlayer1.mountEntity(this);
			}
		} else if(this.minecartType === 1) {
			if(!this.worldObj.multiplayerWorld) {
				entityPlayer1.displayGUIChest(this);
			}
		} else if(this.minecartType === 2) {
			let  itemStack2: ItemStack = entityPlayer1.inventory.getCurrentItem();
			if(itemStack2 !== null && itemStack2.itemID === Item.coal.shiftedIndex) {
				if(--itemStack2.stackSize === 0) {
					await entityPlayer1.inventory.setInventorySlotContents(entityPlayer1.inventory.currentItem, null as ItemStack);
				}

				this.fuel += 1200;
			}

			this.pushX = this.posX - entityPlayer1.posX;
			this.pushZ = this.posZ - entityPlayer1.posZ;
		}

		return true;
	}

	public setPositionAndRotation2(d1: double, d3: double, d5: double, f7: float, f8: float, i9: int):  void {
		this.field_9414_l = d1;
		this.field_9413_m = d3;
		this.field_9412_n = d5;
		this.field_9411_o = f7 as double;
		this.field_9410_p = f8 as double;
		this.field_9415_k = i9 + 2;
		this.motionX = this.field_9409_q;
		this.motionY = this.field_9408_r;
		this.motionZ = this.field_9407_s;
	}

	public setVelocity(d1: double, d3: double, d5: double):  void {
		this.field_9409_q = this.motionX = d1;
		this.field_9408_r = this.motionY = d3;
		this.field_9407_s = this.motionZ = d5;
	}

	public async canInteractWith(entityPlayer1: EntityPlayer| null):  Promise<boolean> {
		return this.isDead ? false : entityPlayer1.getDistanceSqToEntity(this) <= 64.0;
	}
}
