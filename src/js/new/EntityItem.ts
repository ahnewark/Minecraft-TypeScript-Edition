
import { int, float, java, double, byte, short, S } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { EntityPlayer } from "./EntityPlayer";
import { Entity } from "./Entity";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";
import { IEntityItem } from "./interfaces/IEntityItem";

export  class EntityItem extends Entity implements IEntityItem {
	public item:  ItemStack | undefined;
	private field_803_e:  int;
	public age:  int = 0;
	public delayBeforeCanPickup:  int;
	private health:  int = 5;
	public field_804_d:  float = (java.lang.Math.random() * java.lang.Math.PI * 2.0) as float;

	public override get type(): string {
		return 'Item';
	}

	public constructor(world1: World| undefined);

	public constructor(world1: World| undefined, d2: double, d4: double, d6: double, itemStack8: ItemStack| undefined);
    public constructor(...args: unknown[]) {
		const [world1] = args as [World];
		super(world1);

		switch (args.length) {
			case 1: {
				this.setSize(0.25, 0.25);
				this.yOffset = this.height / 2.0;
				break;
			}

			case 5: {
				const [, d2, d4, d6, itemStack8] = args as [World, double, double, double, ItemStack];
				this.setSize(0.25, 0.25);
				this.yOffset = this.height / 2.0;
				this.setPosition(d2, d4, d6);
				this.item = itemStack8;
				this.rotationYaw = (java.lang.Math.random() * 360.0) as float;
				this.motionX = ((java.lang.Math.random() * 0.2 as double - 0.1 as double) as float) as double;
				this.motionY = 0.2 as double;
				this.motionZ = ((java.lang.Math.random() * 0.2 as double - 0.1 as double) as float) as double;
				this.entityWalks = false;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	protected entityInit():  void {
	}

	public async onUpdate(): Promise<void> {
		await super.onUpdate();
		if(this.delayBeforeCanPickup > 0) {
			--this.delayBeforeCanPickup;
		}

		this.prevPosX = this.posX;
		this.prevPosY = this.posY;
		this.prevPosZ = this.posZ;
		this.motionY -= 0.04 as double;
		if(await this.worldObj.getBlockMaterial(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.posY), MathHelper.floor_double(this.posZ)) === MaterialRegistry.lava) {
			this.motionY = 0.2 as double;
			this.motionX = ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.2) as double;
			this.motionZ = ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.2) as double;
			this.worldObj.playSoundAtEntity(this, "random.fizz", 0.4, 2.0 + this.rand.nextFloat() * 0.4);
		}

		await this.func_466_g(this.posX, this.posY, this.posZ);
		await this.moveEntity(this.motionX, this.motionY, this.motionZ);
		let  f1: float = 0.98;
		if(this.onGround) {
			f1 = 0.58800006;
			let  i2: int = await this.worldObj.getBlockId(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.boundingBox.minY) - 1, MathHelper.floor_double(this.posZ));
			if(i2 > 0) {
				f1 = Block.blocksList[i2].slipperiness * 0.98;
			}
		}

		this.motionX *= f1 as double;
		this.motionY *= 0.98 as double;
		this.motionZ *= f1 as double;
		if(this.onGround) {
			this.motionY *= -0.5;
		}

		++this.field_803_e;
		++this.age;
		if(this.age >= 6000) {
			await this.setEntityDead();
		}

	}

	public async handleWaterMovement():  Promise<boolean> {
		return await this.worldObj.handleMaterialAcceleration(this.boundingBox, MaterialRegistry.water, this);
	}

	private async func_466_g(d1: double, d3: double, d5: double): Promise<boolean> {
		let  i7: int = MathHelper.floor_double(d1);
		let  i8: int = MathHelper.floor_double(d3);
		let  i9: int = MathHelper.floor_double(d5);
		let  d10: double = d1 - i7 as double;
		let  d12: double = d3 - i8 as double;
		let  d14: double = d5 - i9 as double;
		if(Block.opaqueCubeLookup[await this.worldObj.getBlockId(i7, i8, i9)]) {
			let  z16: boolean = !Block.opaqueCubeLookup[await this.worldObj.getBlockId(i7 - 1, i8, i9)];
			let  z17: boolean = !Block.opaqueCubeLookup[await this.worldObj.getBlockId(i7 + 1, i8, i9)];
			let  z18: boolean = !Block.opaqueCubeLookup[await this.worldObj.getBlockId(i7, i8 - 1, i9)];
			let  z19: boolean = !Block.opaqueCubeLookup[await this.worldObj.getBlockId(i7, i8 + 1, i9)];
			let  z20: boolean = !Block.opaqueCubeLookup[await this.worldObj.getBlockId(i7, i8, i9 - 1)];
			let  z21: boolean = !Block.opaqueCubeLookup[await this.worldObj.getBlockId(i7, i8, i9 + 1)];
			let  b22: byte = -1;
			let  d23: double = 9999.0;
			if(z16 && d10 < d23) {
				d23 = d10;
				b22 = 0;
			}

			if(z17 && 1.0 - d10 < d23) {
				d23 = 1.0 - d10;
				b22 = 1;
			}

			if(z18 && d12 < d23) {
				d23 = d12;
				b22 = 2;
			}

			if(z19 && 1.0 - d12 < d23) {
				d23 = 1.0 - d12;
				b22 = 3;
			}

			if(z20 && d14 < d23) {
				d23 = d14;
				b22 = 4;
			}

			if(z21 && 1.0 - d14 < d23) {
				d23 = 1.0 - d14;
				b22 = 5;
			}

			let  f25: float = this.rand.nextFloat() * 0.2 + 0.1;
			if(b22 === 0) {
				this.motionX = (-f25) as double;
			}

			if(b22 === 1) {
				this.motionX = f25 as double;
			}

			if(b22 === 2) {
				this.motionY = (-f25) as double;
			}

			if(b22 === 3) {
				this.motionY = f25 as double;
			}

			if(b22 === 4) {
				this.motionZ = (-f25) as double;
			}

			if(b22 === 5) {
				this.motionZ = f25 as double;
			}
		}

		return false;
	}

	protected async dealFireDamage(i1: int):  Promise<void> {
		await this.attackEntityFrom(undefined as Entity, i1);
	}

	public async attackEntityFrom(entity1: Entity| undefined, i2: int):  Promise<boolean> {
		this.setBeenAttacked();
		this.health -= i2;
		if(this.health <= 0) {
			await this.setEntityDead();
		}

		return false;
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		nBTTagCompound1.setShort("Health", (this.health as byte) as short);
		nBTTagCompound1.setShort("Age", this.age as short);
		nBTTagCompound1.setCompoundTag("Item", this.item.writeToNBT(new  NBTTagCompound()));
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		this.health = nBTTagCompound1.getShort("Health") & 255;
		this.age = nBTTagCompound1.getShort("Age");
		let  nBTTagCompound2: NBTTagCompound = nBTTagCompound1.getCompoundTag("Item");
		this.item = new  ItemStack(nBTTagCompound2);
	}

	public async onCollideWithPlayer(entityPlayer1: EntityPlayer| undefined):  Promise<void> {
		if(!this.worldObj.multiplayerWorld) {
			let  i2: int = this.item.stackSize;
			if(this.delayBeforeCanPickup === 0 && entityPlayer1.inventory.addItemStackToInventory(this.item)) {
				this.worldObj.playSoundAtEntity(this, "random.pop", 0.2, ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.7 + 1.0) * 2.0);
				entityPlayer1.onItemPickup(this, i2);
				await this.setEntityDead();
			}

		}
	}
}
