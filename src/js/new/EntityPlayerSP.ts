import { int, float, java } from "../jree/index";
import { World } from "./World";
import { TileEntitySign } from "./TileEntitySign";
import { TileEntityFurnace } from "./TileEntityFurnace";
import { TileEntityDispenser } from "./TileEntityDispenser";
// import { Session } from "./Session";
import { NBTTagCompound } from "./NBTTagCompound";
// import { MovementInput } from "./MovementInput";
import { IInventory } from "./IInventory";
// import { GuiScreen } from "./GuiScreen";
// import { GuiFurnace } from "./GuiFurnace";
// import { GuiEditSign } from "./GuiEditSign";
// import { GuiDispenser } from "./GuiDispenser";
// import { GuiCrafting } from "./GuiCrafting";
// import { GuiChest } from "./GuiChest";
import { EntityPlayer } from "./EntityPlayer";
// import { EntityPickupFX } from "./EntityPickupFX";
import { EntityLiving } from "./EntityLiving";
import { Entity } from "./Entity";
// import { Minecraft } from "../client/Minecraft";

export  class EntityPlayerSP extends EntityPlayer {
	// public movementInput:  MovementInput | null;
	// protected mc:  Minecraft | null;
	public field_9373_b:  int = 20;
	private inPortal:  boolean = false;
	public timeInPortal:  float;
	public prevTimeInPortal:  float;

	public override get type(): string {
		return 'PlayerSP';
	}

	public constructor(/*minecraft1: Minecraft| null, */world2: World| null, /*session3: Session| null,*/ i4: int) {
		super(world2);
		// this.mc = minecraft1;
		this.dimension = i4;
		// if(session3 !== null && session3.username !== null && session3.username.length() > 0) {
		// 	this.skinUrl = "http://s3.amazonaws.com/MinecraftSkins/" + session3.username + ".png";
		// 	java.lang.System.out.println("Loading texture " + this.skinUrl);
		// }

		this.username = 'craftycodie';

		// this.username = session3.username;
	}

	public async updatePlayerActionState(): Promise<void> {
		super.updatePlayerActionState();
		// this.moveStrafing = this.movementInput.moveStrafe;
		// this.moveForward = this.movementInput.moveForward;
		// this.isJumping = this.movementInput.jump;
	}

	public async onLivingUpdate():  Promise<void> {
		this.prevTimeInPortal = this.timeInPortal;
		if(this.inPortal) {
			if(this.timeInPortal === 0.0) {
				// this.mc.sndManager.func_337_a("portal.trigger", 1.0, this.rand.nextFloat() * 0.4 + 0.8);
			}

			this.timeInPortal += 0.0125;
			if(this.timeInPortal >= 1.0) {
				this.timeInPortal = 1.0;
				this.field_9373_b = 10;
				// this.mc.sndManager.func_337_a("portal.travel", 1.0, this.rand.nextFloat() * 0.4 + 0.8);
				// this.mc.usePortal();
			}

			this.inPortal = false;
		} else {
			if(this.timeInPortal > 0.0) {
				this.timeInPortal -= 0.05;
			}

			if(this.timeInPortal < 0.0) {
				this.timeInPortal = 0.0;
			}
		}

		if(this.field_9373_b > 0) {
			--this.field_9373_b;
		}

		// this.movementInput.updatePlayerMoveState(this);
		// if(this.movementInput.sneak && this.ySize < 0.2) {
		// 	this.ySize = 0.2;
		// }

		super.onLivingUpdate();
	}

	public resetPlayerKeyState():  void {
		// this.movementInput.resetKeyState();
	}

	public handleKeyPress(i1: int, z2: boolean):  void {
		// this.movementInput.checkKeyForMovementInput(i1, z2);
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.writeEntityToNBT(nBTTagCompound1);
		nBTTagCompound1.setInteger("Score", this.score);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		super.readEntityFromNBT(nBTTagCompound1);
		this.score = nBTTagCompound1.getInteger("Score");
	}

	public func_20059_m():  void {
		super.func_20059_m();
		// this.mc.displayGuiScreen(null as GuiScreen);
	}

	public displayGUIEditSign(tileEntitySign1: TileEntitySign| null):  void {
		// this.mc.displayGuiScreen(new  GuiEditSign(tileEntitySign1));
	}

	public displayGUIChest(iInventory1: IInventory| null):  void {
		// this.mc.displayGuiScreen(new  GuiChest(this.inventory, iInventory1));
	}

	public displayWorkbenchGUI(i1: int, i2: int, i3: int):  void {
		// this.mc.displayGuiScreen(new  GuiCrafting(this.inventory, this.worldObj, i1, i2, i3));
	}

	public displayGUIFurnace(tileEntityFurnace1: TileEntityFurnace| null):  void {
		// this.mc.displayGuiScreen(new  GuiFurnace(this.inventory, tileEntityFurnace1));
	}

	public displayGUIDispenser(tileEntityDispenser1: TileEntityDispenser| null):  void {
		// this.mc.displayGuiScreen(new  GuiDispenser(this.inventory, tileEntityDispenser1));
	}

	public onItemPickup(entity1: Entity| null, i2: int):  void {
		// this.mc.effectRenderer.addEffect(new  EntityPickupFX(this.mc.theWorld, entity1, this, -0.5));
	}

	public getPlayerArmorValue():  int {
		return this.inventory.getTotalArmorValue();
	}

	public sendChatMessage(string1: java.lang.String| null):  void {
	}

	public func_6420_o():  void {
	}

	public isSneaking():  boolean {
		return false;
		// return this.movementInput.sneak;
	}

	public setInPortal():  void {
		if(this.field_9373_b > 0) {
			this.field_9373_b = 10;
		} else {
			this.inPortal = true;
		}
	}

	public setHealth(i1: int):  void {
		let  i2: int = this.health - i1;
		if(i2 <= 0) {
			this.health = i1;
		} else {
			this.field_9346_af = i2;
			this.prevHealth = this.health;
			this.field_9306_bj = this.field_9366_o;
			this.damageEntity(i2);
			this.hurtTime = this.maxHurtTime = 10;
		}

	}

	public respawnPlayer():  void {
		// this.mc.respawn();
	}
}
