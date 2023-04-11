import { float, java, int, double } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { ItemStack } from "./ItemStack";
import { EntityWaterMob } from "./EntityWaterMob";
import { EntityPlayer } from "./EntityPlayer";
import { ItemRegistry } from "./moved/ItemRegistry";
import { MaterialRegistry } from "./index";

export  class EntitySquid extends EntityWaterMob {
	public override get type(): string {
		return 'Squid';
	}

	public field_21089_a:  float = 0.0;
	public field_21088_b:  float = 0.0;
	public field_21087_c:  float = 0.0;
	public field_21086_f:  float = 0.0;
	public field_21085_g:  float = 0.0;
	public field_21084_h:  float = 0.0;
	public field_21083_i:  float = 0.0;
	public field_21082_j:  float = 0.0;
	private field_21081_k:  float = 0.0;
	private field_21080_l:  float = 0.0;
	private field_21079_m:  float = 0.0;
	private field_21078_n:  float = 0.0;
	private field_21077_o:  float = 0.0;
	private field_21076_p:  float = 0.0;

	public constructor(world1: World| null) {
		super(world1);
		this.texture = "/mob/squid.png";
		this.setSize(0.95, 0.95);
		this.field_21080_l = 1.0 / (this.rand.nextFloat() + 1.0) * 0.2;
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	protected getLivingSound(): string {
		return null;
	}

	protected getHurtSound(): string {
		return null;
	}

	protected getDeathSound(): string {
		return null;
	}

	protected getSoundVolume():  float {
		return 0.4;
	}

	protected getDropItemId():  int {
		return 0;
	}

	protected func_21066_o():  void {
		let  i1: int = this.rand.nextInt(3) + 1;

		for(let  i2: int = 0; i2 < i1; ++i2) {
			this.entityDropItem(new  ItemStack(ItemRegistry.dyePowder, 1, 0), 0.0);
		}

	}

	public interact(entityPlayer1: EntityPlayer| null):  boolean {
		let  itemStack2: ItemStack = entityPlayer1.inventory.getCurrentItem();
		if(itemStack2 !== null && itemStack2.itemID === ItemRegistry.bucketEmpty.shiftedIndex) {
			entityPlayer1.inventory.setInventorySlotContents(entityPlayer1.inventory.currentItem, new  ItemStack(ItemRegistry.bucketMilk));
			return true;
		} else {
			return false;
		}
	}

	public async handleWaterMovement():  Promise<boolean> {
		return await this.worldObj.handleMaterialAcceleration(this.boundingBox.expand(0.0, -0.6000000238418579, 0.0), MaterialRegistry.water, this);
	}

	public async onLivingUpdate():  Promise<void> {
		await super.onLivingUpdate();
		this.field_21088_b = this.field_21089_a;
		this.field_21086_f = this.field_21087_c;
		this.field_21084_h = this.field_21085_g;
		this.field_21082_j = this.field_21083_i;
		this.field_21085_g += this.field_21080_l;
		if(this.field_21085_g > 6.2831855) {
			this.field_21085_g -= 6.2831855;
			if(this.rand.nextInt(10) === 0) {
				this.field_21080_l = 1.0 / (this.rand.nextFloat() + 1.0) * 0.2;
			}
		}

		if(this.handleWaterMovement()) {
			let  f1: float;
			if(this.field_21085_g < java.lang.Math.PI) {
				f1 = this.field_21085_g / java.lang.Math.PI as float;
				this.field_21083_i = MathHelper.sin(f1 * f1 * java.lang.Math.PI as float) * java.lang.Math.PI as float * 0.25;
				if(f1 as double > 0.75) {
					this.field_21081_k = 1.0;
					this.field_21079_m = 1.0;
				} else {
					this.field_21079_m *= 0.8;
				}
			} else {
				this.field_21083_i = 0.0;
				this.field_21081_k *= 0.9;
				this.field_21079_m *= 0.99;
			}

			if(!this.field_9343_G) {
				this.motionX = (this.field_21078_n * this.field_21081_k) as double;
				this.motionY = (this.field_21077_o * this.field_21081_k) as double;
				this.motionZ = (this.field_21076_p * this.field_21081_k) as double;
			}

			f1 = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionZ * this.motionZ);
			this.renderYawOffset += (-(java.lang.Math.atan2(this.motionX, this.motionZ) as float) * 180.0 / java.lang.Math.PI as float - this.renderYawOffset) * 0.1;
			this.rotationYaw = this.renderYawOffset;
			this.field_21087_c += java.lang.Math.PI as float * this.field_21079_m * 1.5;
			this.field_21089_a += (-(java.lang.Math.atan2(f1 as double, this.motionY) as float) * 180.0 / java.lang.Math.PI as float - this.field_21089_a) * 0.1;
		} else {
			this.field_21083_i = MathHelper.abs(MathHelper.sin(this.field_21085_g)) * java.lang.Math.PI as float * 0.25;
			if(!this.field_9343_G) {
				this.motionX = 0.0;
				this.motionY -= 0.08;
				this.motionY *= 0.98 as double;
				this.motionZ = 0.0;
			}

			this.field_21089_a = (this.field_21089_a as double + (-90.0 - this.field_21089_a) as double * 0.02) as float;
		}

	}

	public async moveEntityWithHeading(f1: float, f2: float):  Promise<void> {
		await this.moveEntity(this.motionX, this.motionY, this.motionZ);
	}

	protected async updatePlayerActionState():  Promise<void> {
		if(this.rand.nextInt(50) === 0 || !this.inWater || this.field_21078_n === 0.0 && this.field_21077_o === 0.0 && this.field_21076_p === 0.0) {
			let  f1: float = this.rand.nextFloat() * java.lang.Math.PI as float * 2.0;
			this.field_21078_n = MathHelper.cos(f1) * 0.2;
			this.field_21077_o = -0.1 + this.rand.nextFloat() * 0.2;
			this.field_21076_p = MathHelper.sin(f1) * 0.2;
		}

	}
}
