


import { int, java, float, double, byte, S } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EnumArt } from "./EnumArt";
import { EntityItem } from "./EntityItem";
import { Entity } from "./Entity";
import { ItemRegistry } from "./moved/ItemRegistry";




export  class EntityPainting extends Entity {
	private field_695_c:  int;
	public direction:  int;
	public xPosition:  int;
	public yPosition:  int;
	public zPosition:  int;
	public art:  EnumArt | null;

	public override get type(): string {
		return 'Painting';
	}

	public constructor(world1: World| null);

	public constructor(world1: World| null, i2: int, i3: int, i4: int, i5: int);

	public constructor(world1: World| null, i2: int, i3: int, i4: int, i5: int, string6: string);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				this.field_695_c = 0;
				this.direction = 0;
				this.yOffset = 0.0;
				this.setSize(0.5, 0.5);
	

				break;
			}

			case 5: {
				const [, i2, i3, i4, i5] = args as [World, int, int, int, int];


				this.xPosition = i2;
				this.yPosition = i3;
				this.zPosition = i4;
				let  arrayList6: EnumArt[] = [];
				let  enumArt7: EnumArt[] = EnumArt.values();
				let  i8: int = enumArt7.length;

				for(let  i9: int = 0; i9 < i8; ++i9) {
					let  enumArt10: EnumArt = enumArt7[i9];
					this.art = enumArt10;
					this.func_412_b(i5);
					if(this.func_410_i()) {
						arrayList6.push(enumArt10);
					}
				}

				if(arrayList6.length > 0) {
					this.art = arrayList6[this.rand.nextInt(arrayList6.length)];
				}

				this.func_412_b(i5);
	

				break;
			}

			case 6: {
				const [, i2, i3, i4, i5, string6] = args as [World, int, int, int, int, string];
				this.xPosition = i2;
				this.yPosition = i3;
				this.zPosition = i4;
				let  enumArt7: EnumArt[] = EnumArt.values();
				let  i8: int = enumArt7.length;

				for(let  i9: int = 0; i9 < i8; ++i9) {
					let  enumArt10: EnumArt = enumArt7[i9];
					if(enumArt10.title === string6) {
						this.art = enumArt10;
						break;
					}
				}

				this.func_412_b(i5);
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	protected entityInit():  void {
	}

	public func_412_b(i1: int):  void {
		this.direction = i1;
		this.prevRotationYaw = this.rotationYaw = (i1 * 90) as float;
		let  f2: float = this.art.sizeX as float;
		let  f3: float = this.art.sizeY as float;
		let  f4: float = this.art.sizeX as float;
		if(i1 !== 0 && i1 !== 2) {
			f2 = 0.5;
		} else {
			f4 = 0.5;
		}

		f2 /= 32.0;
		f3 /= 32.0;
		f4 /= 32.0;
		let  f5: float = this.xPosition as float + 0.5;
		let  f6: float = this.yPosition as float + 0.5;
		let  f7: float = this.zPosition as float + 0.5;
		let  f8: float = 0.5625;
		if(i1 === 0) {
			f7 -= f8;
		}

		if(i1 === 1) {
			f5 -= f8;
		}

		if(i1 === 2) {
			f7 += f8;
		}

		if(i1 === 3) {
			f5 += f8;
		}

		if(i1 === 0) {
			f5 -= this.func_411_c(this.art.sizeX);
		}

		if(i1 === 1) {
			f7 += this.func_411_c(this.art.sizeX);
		}

		if(i1 === 2) {
			f5 += this.func_411_c(this.art.sizeX);
		}

		if(i1 === 3) {
			f7 -= this.func_411_c(this.art.sizeX);
		}

		f6 += this.func_411_c(this.art.sizeY);
		this.setPosition(f5 as double, f6 as double, f7 as double);
		let  f9: float = -0.00625;
		this.boundingBox.setBounds((f5 - f2 - f9) as double, (f6 - f3 - f9) as double, (f7 - f4 - f9) as double, (f5 + f2 + f9) as double, (f6 + f3 + f9) as double, (f7 + f4 + f9) as double);
	}

	private func_411_c(i1: int):  float {
		return i1 === 32 ? 0.5 : (i1 === 64 ? 0.5 : 0.0);
	}

	public async onUpdate():  Promise<void> {
		if(this.field_695_c++ === 100 && !this.worldObj.multiplayerWorld) {
			this.field_695_c = 0;
			if(!await this.func_410_i()) {
				this.setEntityDead();
				await this.worldObj.entityJoinedWorld(new  EntityItem(this.worldObj, this.posX, this.posY, this.posZ, new  ItemStack(ItemRegistry.painting)));
			}
		}

	}

	public async func_410_i():  Promise<boolean> {
		if((await this.worldObj.getCollidingBoundingBoxes(this, this.boundingBox)).length > 0) {
			return false;
		} else {
			let  i1: int = this.art.sizeX / 16;
			let  i2: int = this.art.sizeY / 16;
			let  i3: int = this.xPosition;
			let  i4: int = this.yPosition;
			let  i5: int = this.zPosition;
			if(this.direction === 0) {
				i3 = MathHelper.floor_double(this.posX - (this.art.sizeX as float / 32.0) as double);
			}

			if(this.direction === 1) {
				i5 = MathHelper.floor_double(this.posZ - (this.art.sizeX as float / 32.0) as double);
			}

			if(this.direction === 2) {
				i3 = MathHelper.floor_double(this.posX - (this.art.sizeX as float / 32.0) as double);
			}

			if(this.direction === 3) {
				i5 = MathHelper.floor_double(this.posZ - (this.art.sizeX as float / 32.0) as double);
			}

			i4 = MathHelper.floor_double(this.posY - (this.art.sizeY as float / 32.0) as double);

			let  i7: int;
			for(let  i6: int = 0; i6 < i1; ++i6) {
				for(i7 = 0; i7 < i2; ++i7) {
					let  material8: Material;
					if(this.direction !== 0 && this.direction !== 2) {
						material8 = await this.worldObj.getBlockMaterial(this.xPosition, i4 + i7, i5 + i6);
					} else {
						material8 = await this.worldObj.getBlockMaterial(i3 + i6, i4 + i7, this.zPosition);
					}

					if(!material8.isSolid()) {
						return false;
					}
				}
			}

			let  list9 = this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox);

			for(i7 = 0; i7 < (await list9).length; ++i7) {
				if(list9[i7] instanceof EntityPainting) {
					return false;
				}
			}

			return true;
		}
	}

	public canBeCollidedWith():  boolean {
		return true;
	}

	public async attackEntityFrom(entity1: Entity| null, i2: int):  Promise<boolean> {
		if(!this.isDead && !this.worldObj.multiplayerWorld) {
			this.setEntityDead();
			this.setBeenAttacked();
			await this.worldObj.entityJoinedWorld(new  EntityItem(this.worldObj, this.posX, this.posY, this.posZ, new  ItemStack(ItemRegistry.painting)));
		}

		return true;
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setByte("Dir", this.direction as byte);
		nBTTagCompound1.setString("Motive", this.art.title);
		nBTTagCompound1.setInteger("TileX", this.xPosition);
		nBTTagCompound1.setInteger("TileY", this.yPosition);
		nBTTagCompound1.setInteger("TileZ", this.zPosition);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.direction = nBTTagCompound1.getByte("Dir");
		this.xPosition = nBTTagCompound1.getInteger("TileX");
		this.yPosition = nBTTagCompound1.getInteger("TileY");
		this.zPosition = nBTTagCompound1.getInteger("TileZ");
		let  string2 = nBTTagCompound1.getString("Motive");
		let  enumArt3: EnumArt[] = EnumArt.values();
		let  i4: int = enumArt3.length;

		for(let  i5: int = 0; i5 < i4; ++i5) {
			let  enumArt6: EnumArt = enumArt3[i5];
			if(enumArt6.title === string2) {
				this.art = enumArt6;
			}
		}

		if(this.art === null) {
			this.art = EnumArt.Kebab;
		}

		this.func_412_b(this.direction);
	}
}
