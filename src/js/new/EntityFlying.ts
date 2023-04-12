import { float, double, int } from "../jree/index";
import { World } from "./World";
import { MathHelper } from "./MathHelper";
import { EntityLiving } from "./EntityLiving";
import { Block, } from "./Block";


export  class EntityFlying extends EntityLiving {
	public constructor(world1: World| null) {
		super(world1);
	}

	public override get type(): string {
		return 'Flying';
	}

	protected async fall(f1: float):  Promise<void> {
	}

	public async moveEntityWithHeading(f1: float, f2: float):  Promise<void> {
		if(await this.handleWaterMovement()) {
			this.moveFlying(f1, f2, 0.02);
			await this.moveEntity(this.motionX, this.motionY, this.motionZ);
			this.motionX *= 0.8 as double;
			this.motionY *= 0.8 as double;
			this.motionZ *= 0.8 as double;
		} else if(await this.handleLavaMovement()) {
			this.moveFlying(f1, f2, 0.02);
			await this.moveEntity(this.motionX, this.motionY, this.motionZ);
			this.motionX *= 0.5;
			this.motionY *= 0.5;
			this.motionZ *= 0.5;
		} else {
			let  f3: float = 0.91;
			if(this.onGround) {
				f3 = 0.54600006;
				let  i4: int = await this.worldObj.getBlockId(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.boundingBox.minY) - 1, MathHelper.floor_double(this.posZ));
				if(i4 > 0) {
					f3 = Block.blocksList[i4].slipperiness * 0.91;
				}
			}

			let  f8: float = 0.16277136 / (f3 * f3 * f3);
			this.moveFlying(f1, f2, this.onGround ? 0.1 * f8 : 0.02);
			f3 = 0.91;
			if(this.onGround) {
				f3 = 0.54600006;
				let  i5: int = await this.worldObj.getBlockId(MathHelper.floor_double(this.posX), MathHelper.floor_double(this.boundingBox.minY) - 1, MathHelper.floor_double(this.posZ));
				if(i5 > 0) {
					f3 = Block.blocksList[i5].slipperiness * 0.91;
				}
			}

			await this.moveEntity(this.motionX, this.motionY, this.motionZ);
			this.motionX *= f3 as double;
			this.motionY *= f3 as double;
			this.motionZ *= f3 as double;
		}

		this.field_705_Q = this.field_704_R;
		let  d10: double = this.posX - this.prevPosX;
		let  d9: double = this.posZ - this.prevPosZ;
		let  f7: float = MathHelper.sqrt_double(d10 * d10 + d9 * d9) * 4.0;
		if(f7 > 1.0) {
			f7 = 1.0;
		}

		this.field_704_R += (f7 - this.field_704_R) * 0.4;
		this.field_703_S += this.field_704_R;
	}

	public async isOnLadder():  Promise<boolean> {
		return false;
	}
}
