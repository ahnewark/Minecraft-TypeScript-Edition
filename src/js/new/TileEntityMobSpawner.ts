
import { int, java, double, float, byte, short } from "../jree/index";
import { TileEntity } from "./TileEntity";
import { NBTTagCompound } from "./NBTTagCompound";
import { EntityLiving } from "./EntityLiving";
import { EntityList } from "./EntityList";
import { AxisAlignedBB } from "./AxisAlignedBB";

export  class TileEntityMobSpawner extends TileEntity {
	public delay:  int = -1;
	private mobID = "Pig";
	public yaw:  double;
	public yaw2:  double = 0.0;

	public constructor() {
		super();
		this.delay = 20;
	}

	public get name(): string {
		return 'MobSpawner';
	}

	public getMobID():  string {
		return this.mobID;
	}

	public setMobID(string1: string):  void {
		this.mobID = string1;
	}

	public anyPlayerInRange():  boolean {
		return this.worldObj.getClosestPlayer(this.xCoord as double + 0.5, this.yCoord as double + 0.5, this.zCoord as double + 0.5, 16.0) !== null;
	}

	public async updateEntity(): Promise<void> {
		this.yaw2 = this.yaw;
		if(this.anyPlayerInRange()) {
			let  d1: double = (this.xCoord as float + this.worldObj.rand.nextFloat()) as double;
			let  d3: double = (this.yCoord as float + this.worldObj.rand.nextFloat()) as double;
			let  d5: double = (this.zCoord as float + this.worldObj.rand.nextFloat()) as double;
			this.worldObj.spawnParticle("smoke", d1, d3, d5, 0.0, 0.0, 0.0);
			this.worldObj.spawnParticle("flame", d1, d3, d5, 0.0, 0.0, 0.0);

			for(this.yaw += (1000.0 / (this.delay as float + 200.0)) as double; this.yaw > 360.0; this.yaw2 -= 360.0) {
				this.yaw -= 360.0;
			}

			if(this.delay === -1) {
				this.updateDelay();
			}

			if(this.delay > 0) {
				--this.delay;
			} else {
				let  b7: byte = 4;

				for(let  i8: int = 0; i8 < b7; ++i8) {
					let  entityLiving9: EntityLiving = (EntityList.createEntityInWorld(this.mobID, this.worldObj) as EntityLiving) as EntityLiving;
					if(entityLiving9 === null) {
						return;
					}

					let  i10: int = (await this.worldObj.getEntitiesWithinAABB(entityLiving9.type, AxisAlignedBB.getBoundingBoxFromPool(this.xCoord as double, this.yCoord as double, this.zCoord as double, (this.xCoord + 1) as double, (this.yCoord + 1) as double, (this.zCoord + 1) as double).expand(8.0, 4.0, 8.0))).length;
					if(i10 >= 6) {
						this.updateDelay();
						return;
					}

					if(entityLiving9 !== null) {
						let  d11: double = this.xCoord as double + (this.worldObj.rand.nextDouble() - this.worldObj.rand.nextDouble()) * 4.0;
						let  d13: double = (this.yCoord + this.worldObj.rand.nextInt(3) - 1) as double;
						let  d15: double = this.zCoord as double + (this.worldObj.rand.nextDouble() - this.worldObj.rand.nextDouble()) * 4.0;
						entityLiving9.setLocationAndAngles(d11, d13, d15, this.worldObj.rand.nextFloat() * 360.0, 0.0);
						if(await entityLiving9.getCanSpawnHere()) {
							await this.worldObj.entityJoinedWorld(entityLiving9);

							for(let  i17: int = 0; i17 < 20; ++i17) {
								d1 = this.xCoord as double + 0.5 + (this.worldObj.rand.nextFloat() as double - 0.5) * 2.0;
								d3 = this.yCoord as double + 0.5 + (this.worldObj.rand.nextFloat() as double - 0.5) * 2.0;
								d5 = this.zCoord as double + 0.5 + (this.worldObj.rand.nextFloat() as double - 0.5) * 2.0;
								this.worldObj.spawnParticle("smoke", d1, d3, d5, 0.0, 0.0, 0.0);
								this.worldObj.spawnParticle("flame", d1, d3, d5, 0.0, 0.0, 0.0);
							}

							entityLiving9.spawnExplosionParticle();
							this.updateDelay();
						}
					}
				}

				super.updateEntity();
			}
		}
	}

	private updateDelay():  void {
		this.delay = 200 + this.worldObj.rand.nextInt(600);
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readFromNBT(nBTTagCompound1);
		this.mobID = nBTTagCompound1.getString("EntityId");
		this.delay = nBTTagCompound1.getShort("Delay");
	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeToNBT(nBTTagCompound1);
		nBTTagCompound1.setString("EntityId", this.mobID);
		nBTTagCompound1.setShort("Delay", this.delay as short);
	}
}
