


import { byte, int, float, java, double } from "../jree/index";
import { World } from "./World";
import { TileEntitySign } from "./TileEntitySign";
import { TileEntityFurnace } from "./TileEntityFurnace";
import { TileEntityDispenser } from "./TileEntityDispenser";
import { NBTTagList } from "./NBTTagList";
import { NBTTagCompound } from "./NBTTagCompound";
import { MathHelper } from "./MathHelper";
import { Material } from "./Material";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { InventoryPlayer } from "./InventoryPlayer";
import { IInventory } from "./IInventory";
import { EntityMobs } from "./EntityMobs";
import { EntityLiving } from "./EntityLiving";
import { EntityItem } from "./EntityItem";
import { EntityFish } from "./EntityFish";
import { EntityArrow } from "./EntityArrow";
import { Entity } from "./Entity";
import { CraftingInventoryPlayerCB } from "./CraftingInventoryPlayerCB";
import { CraftingInventoryCB } from "./CraftingInventoryCB";

export abstract  class EntityPlayer extends EntityLiving {
	public inventory:  InventoryPlayer | null = new  InventoryPlayer(this);
	public field_20069_g:  CraftingInventoryCB | null;
	public craftingInventory:  CraftingInventoryCB | null;
	public field_9371_f:  byte = 0;
	public score:  int = 0;
	public field_775_e:  float;
	public field_774_f:  float;
	public isSwinging:  boolean = false;
	public swingProgressInt:  int = 0;
	public username:  java.lang.String | null;
	public dimension:  int;
	public field_20067_q:  java.lang.String | null;
	public field_20066_r:  double;
	public field_20065_s:  double;
	public field_20064_t:  double;
	public field_20063_u:  double;
	public field_20062_v:  double;
	public field_20061_w:  double;
	private damageRemainder:  int = 0;
	public fishEntity:  EntityFish | null = null;

	public constructor(world1: World| null) {
		super(world1);
		this.field_20069_g = new  CraftingInventoryPlayerCB(this.inventory, !world1.multiplayerWorld);
		this.craftingInventory = this.field_20069_g;
		this.yOffset = 1.62;
		this.setLocationAndAngles(world1.spawnX as double + 0.5, (world1.spawnY + 1) as double, world1.spawnZ as double + 0.5, 0.0, 0.0);
		this.health = 20;
		this.field_9351_C = "humanoid";
		this.field_9353_B = 180.0;
		this.fireResistance = 20;
		this.texture = "/mob/char.png";
	}

	public onUpdate():  void {
		super.onUpdate();
		if(!this.worldObj.multiplayerWorld && this.craftingInventory !== null && !this.craftingInventory.func_20120_b(this)) {
			this.func_20059_m();
			this.craftingInventory = this.field_20069_g;
		}

		this.field_20066_r = this.field_20063_u;
		this.field_20065_s = this.field_20062_v;
		this.field_20064_t = this.field_20061_w;
		let  d1: double = this.posX - this.field_20063_u;
		let  d3: double = this.posY - this.field_20062_v;
		let  d5: double = this.posZ - this.field_20061_w;
		let  d7: double = 10.0;
		if(d1 > d7) {
			this.field_20066_r = this.field_20063_u = this.posX;
		}

		if(d5 > d7) {
			this.field_20064_t = this.field_20061_w = this.posZ;
		}

		if(d3 > d7) {
			this.field_20065_s = this.field_20062_v = this.posY;
		}

		if(d1 < -d7) {
			this.field_20066_r = this.field_20063_u = this.posX;
		}

		if(d5 < -d7) {
			this.field_20064_t = this.field_20061_w = this.posZ;
		}

		if(d3 < -d7) {
			this.field_20065_s = this.field_20062_v = this.posY;
		}

		this.field_20063_u += d1 * 0.25;
		this.field_20061_w += d5 * 0.25;
		this.field_20062_v += d3 * 0.25;
	}

	protected func_20059_m():  void {
		this.craftingInventory = this.field_20069_g;
	}

	public updateCloak():  void {
		this.field_20067_q = "http://s3.amazonaws.com/MinecraftCloaks/" + this.username + ".png";
		this.cloakUrl = this.field_20067_q;
	}

	public updateRidden():  void {
		super.updateRidden();
		this.field_775_e = this.field_774_f;
		this.field_774_f = 0.0;
	}

	public preparePlayerToSpawn():  void {
		this.yOffset = 1.62;
		this.setSize(0.6, 1.8);
		super.preparePlayerToSpawn();
		this.health = 20;
		this.deathTime = 0;
	}

	protected updatePlayerActionState():  void {
		if(this.isSwinging) {
			++this.swingProgressInt;
			if(this.swingProgressInt === 8) {
				this.swingProgressInt = 0;
				this.isSwinging = false;
			}
		} else {
			this.swingProgressInt = 0;
		}

		this.swingProgress = this.swingProgressInt as float / 8.0;
	}

	public onLivingUpdate():  void {
		if(this.worldObj.difficultySetting === 0 && this.health < 20 && this.ticksExisted % 20 * 12 === 0) {
			this.heal(1);
		}

		this.inventory.decrementAnimations();
		this.field_775_e = this.field_774_f;
		super.onLivingUpdate();
		let  f1: float = MathHelper.sqrt_double(this.motionX * this.motionX + this.motionZ * this.motionZ);
		let  f2: float = java.lang.Math.atan(-this.motionY * 0.2 as double) as float * 15.0;
		if(f1 > 0.1) {
			f1 = 0.1;
		}

		if(!this.onGround || this.health <= 0) {
			f1 = 0.0;
		}

		if(this.onGround || this.health <= 0) {
			f2 = 0.0;
		}

		this.field_774_f += (f1 - this.field_774_f) * 0.4;
		this.field_9328_R += (f2 - this.field_9328_R) * 0.8;
		if(this.health > 0) {
			let  list3: java.util.List = this.worldObj.getEntitiesWithinAABBExcludingEntity(this, this.boundingBox.expand(1.0, 0.0, 1.0));
			if(list3 !== null) {
				for(let  i4: int = 0; i4 < list3.size(); ++i4) {
					let  entity5: Entity = list3.get(i4) as Entity;
					if(!entity5.isDead) {
						this.func_451_h(entity5);
					}
				}
			}
		}

	}

	private func_451_h(entity1: Entity| null):  void {
		entity1.onCollideWithPlayer(this);
	}

	public getScore():  int {
		return this.score;
	}

	public onDeath(entity1: Entity| null):  void {
		super.onDeath(entity1);
		this.setSize(0.2, 0.2);
		this.setPosition(this.posX, this.posY, this.posZ);
		this.motionY = 0.1 as double;
		if(this.username.equals("Notch")) {
			this.dropPlayerItemWithRandomChoice(new  ItemStack(Item.appleRed, 1), true);
		}

		this.inventory.dropAllItems();
		if(entity1 !== null) {
			this.motionX = (-MathHelper.cos((this.attackedAtYaw + this.rotationYaw) * java.lang.Math.PI as float / 180.0) * 0.1) as double;
			this.motionZ = (-MathHelper.sin((this.attackedAtYaw + this.rotationYaw) * java.lang.Math.PI as float / 180.0) * 0.1) as double;
		} else {
			this.motionX = this.motionZ = 0.0;
		}

		this.yOffset = 0.1;
	}

	public addToPlayerScore(entity1: Entity| null, i2: int):  void {
		this.score += i2;
	}

	public func_20060_w():  void {
		this.dropPlayerItemWithRandomChoice(this.inventory.decrStackSize(this.inventory.currentItem, 1), false);
	}

	public dropPlayerItem(itemStack1: ItemStack| null):  void {
		this.dropPlayerItemWithRandomChoice(itemStack1, false);
	}

	public dropPlayerItemWithRandomChoice(itemStack1: ItemStack| null, z2: boolean):  void {
		if(itemStack1 !== null) {
			let  entityItem3: EntityItem = new  EntityItem(this.worldObj, this.posX, this.posY - 0.3 as double + this.getEyeHeight() as double, this.posZ, itemStack1);
			entityItem3.delayBeforeCanPickup = 40;
			let  f4: float = 0.1;
			let  f5: float;
			if(z2) {
				f5 = this.rand.nextFloat() * 0.5;
				let  f6: float = this.rand.nextFloat() * java.lang.Math.PI as float * 2.0;
				entityItem3.motionX = (-MathHelper.sin(f6) * f5) as double;
				entityItem3.motionZ = (MathHelper.cos(f6) * f5) as double;
				entityItem3.motionY = 0.2 as double;
			} else {
				f4 = 0.3;
				entityItem3.motionX = (-MathHelper.sin(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f4) as double;
				entityItem3.motionZ = (MathHelper.cos(this.rotationYaw / 180.0 * java.lang.Math.PI as float) * MathHelper.cos(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f4) as double;
				entityItem3.motionY = (-MathHelper.sin(this.rotationPitch / 180.0 * java.lang.Math.PI as float) * f4 + 0.1) as double;
				f4 = 0.02;
				f5 = this.rand.nextFloat() * java.lang.Math.PI as float * 2.0;
				f4 *= this.rand.nextFloat();
				entityItem3.motionX += java.lang.Math.cos(f5 as double) * f4 as double;
				entityItem3.motionY += ((this.rand.nextFloat() - this.rand.nextFloat()) * 0.1) as double;
				entityItem3.motionZ += java.lang.Math.sin(f5 as double) * f4 as double;
			}

			this.joinEntityItemWithWorld(entityItem3);
		}
	}

	protected joinEntityItemWithWorld(entityItem1: EntityItem| null):  void {
		this.worldObj.entityJoinedWorld(entityItem1);
	}

	public getCurrentPlayerStrVsBlock(block1: EnumSkyBlock.Block| null):  float {
		let  f2: float = this.inventory.getStrVsBlock(block1);
		if(this.isInsideOfMaterial(Material.water)) {
			f2 /= 5.0;
		}

		if(!this.onGround) {
			f2 /= 5.0;
		}

		return f2;
	}

	public canHarvestBlock(block1: EnumSkyBlock.Block| null):  boolean {
		return this.inventory.canHarvestBlock(block1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
		let  nBTTagList2: NBTTagList = nBTTagCompound1.getTagList("Inventory");
		this.inventory.readFromNBT(nBTTagList2);
		this.dimension = nBTTagCompound1.getInteger("Dimension");
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
		nBTTagCompound1.setTag("Inventory", this.inventory.writeToNBT(new  NBTTagList()));
		nBTTagCompound1.setInteger("Dimension", this.dimension);
	}

	public displayGUIChest(iInventory1: IInventory| null):  void {
	}

	public displayWorkbenchGUI(i1: int, i2: int, i3: int):  void {
	}

	public onItemPickup(entity1: Entity| null, i2: int):  void {
	}

	public getEyeHeight():  float {
		return 0.12;
	}

	public attackEntityFrom(entity1: Entity| null, i2: int):  boolean {
		this.field_9344_ag = 0;
		if(this.health <= 0) {
			return false;
		} else {
			if(entity1 instanceof EntityMobs || entity1 instanceof EntityArrow) {
				if(this.worldObj.difficultySetting === 0) {
					i2 = 0;
				}

				if(this.worldObj.difficultySetting === 1) {
					i2 = i2 / 3 + 1;
				}

				if(this.worldObj.difficultySetting === 3) {
					i2 = i2 * 3 / 2;
				}
			}

			return i2 === 0 ? false : super.attackEntityFrom(entity1, i2);
		}
	}

	protected damageEntity(i1: int):  void {
		let  i2: int = 25 - this.inventory.getTotalArmorValue();
		let  i3: int = i1 * i2 + this.damageRemainder;
		this.inventory.damageArmor(i1);
		i1 = i3 / 25;
		this.damageRemainder = i3 % 25;
		super.damageEntity(i1);
	}

	public displayGUIFurnace(tileEntityFurnace1: TileEntityFurnace| null):  void {
	}

	public displayGUIDispenser(tileEntityDispenser1: TileEntityDispenser| null):  void {
	}

	public displayGUIEditSign(tileEntitySign1: TileEntitySign| null):  void {
	}

	public useCurrentItemOnEntity(entity1: Entity| null):  void {
		if(!entity1.interact(this)) {
			let  itemStack2: ItemStack = this.getCurrentEquippedItem();
			if(itemStack2 !== null && entity1 instanceof EntityLiving) {
				itemStack2.useItemOnEntity(entity1 as EntityLiving);
				if(itemStack2.stackSize <= 0) {
					itemStack2.func_1097_a(this);
					this.destroyCurrentEquippedItem();
				}
			}

		}
	}

	public getCurrentEquippedItem():  ItemStack | null {
		return this.inventory.getCurrentItem();
	}

	public destroyCurrentEquippedItem():  void {
		this.inventory.setInventorySlotContents(this.inventory.currentItem, null as ItemStack);
	}

	public getYOffset():  double {
		return (this.yOffset - 0.5) as double;
	}

	public swingItem():  void {
		this.swingProgressInt = -1;
		this.isSwinging = true;
	}

	public attackTargetEntityWithCurrentItem(entity1: Entity| null):  void {
		let  i2: int = this.inventory.getDamageVsEntity(entity1);
		if(i2 > 0) {
			entity1.attackEntityFrom(this, i2);
			let  itemStack3: ItemStack = this.getCurrentEquippedItem();
			if(itemStack3 !== null && entity1 instanceof EntityLiving) {
				itemStack3.hitEntity(entity1 as EntityLiving);
				if(itemStack3.stackSize <= 0) {
					itemStack3.func_1097_a(this);
					this.destroyCurrentEquippedItem();
				}
			}
		}

	}

	public respawnPlayer():  void {
	}

	public onItemStackChanged(itemStack1: ItemStack| null):  void {
	}

	public setEntityDead():  void {
		super.setEntityDead();
		this.field_20069_g.onCraftGuiClosed(this);
		if(this.craftingInventory !== null) {
			this.craftingInventory.onCraftGuiClosed(this);
		}

	}
}
