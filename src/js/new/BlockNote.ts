
import { int, float, java, double } from "../jree/index";
import { World } from "./World";
import { TileEntityNote } from "./TileEntityNote";
import { TileEntity } from "./TileEntity";
import { EntityPlayer } from "./EntityPlayer";
import { BlockContainer } from "./BlockContainer";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";


export  class BlockNote extends BlockContainer {
	public constructor(i1: int) {
		super(i1, 74, MaterialRegistry.wood);
	}

	public getBlockTextureFromSide(i1: int):  int {
		return this.blockIndexInTexture;
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int): Promise<void> {
		if(i5 > 0 && Block.blocksList[i5].canProvidePower()) {
			let  z6: boolean = await world1.isBlockGettingPowered(i2, i3, i4);
			let  tileEntityNote7: TileEntityNote = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityNote;
			if(tileEntityNote7.previousRedstoneState !== z6) {
				if(z6) {
					await tileEntityNote7.triggerNote(world1, i2, i3, i4);
				}

				tileEntityNote7.previousRedstoneState = z6;
			}
		}

	}

	public async blockActivated(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<boolean> {
		if(world1.multiplayerWorld) {
			return true;
		} else {
			let  tileEntityNote6: TileEntityNote = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityNote;
			await tileEntityNote6.changePitch();
			await tileEntityNote6.triggerNote(world1, i2, i3, i4);
			return true;
		}
	}

	public async onBlockClicked(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<void> {
		if(!world1.multiplayerWorld) {
			let  tileEntityNote6: TileEntityNote = await world1.getBlockTileEntity(i2, i3, i4) as TileEntityNote;
			await tileEntityNote6.triggerNote(world1, i2, i3, i4);
		}
	}

	protected getBlockEntity():  TileEntity | undefined {
		return new  TileEntityNote();
	}

	public playBlock(world1: World| undefined, i2: int, i3: int, i4: int, i5: int, i6: int):  void {
		let  f7: float = java.lang.Math.pow(2.0, (i6 - 12) as double / 12.0) as float;
		let  string8: string = "harp";
		if(i5 === 1) {
			string8 = "bd";
		}

		if(i5 === 2) {
			string8 = "snare";
		}

		if(i5 === 3) {
			string8 = "hat";
		}

		if(i5 === 4) {
			string8 = "bassattack";
		}

		world1.playSoundEffect(i2 as double + 0.5, i3 as double + 0.5, i4 as double + 0.5, "note." + string8, 3.0, f7);
		world1.spawnParticle("note", i2 as double + 0.5, i3 as double + 1.2, i4 as double + 0.5, i6 as double / 24.0, 0.0, 0.0);
	}
}
