


import { java, int, double } from "../jree/index";
import { World } from "./World";
import { TileEntitySign } from "./TileEntitySign";
// import { TileEntityNote } from "./TileEntityNote";
// import { TileEntityMobSpawner } from "./TileEntityMobSpawner";
import { TileEntityFurnace } from "./TileEntityFurnace";
// import { TileEntityDispenser } from "./TileEntityDispenser";
// import { TileEntityChest } from "./TileEntityChest";
import { NBTTagCompound } from "./NBTTagCompound";
import { Block } from "./Block";
import { TileEntityDispenser } from "./TileEntityDispenser";

// CHANGES:
// - The nameToClass / classToName maps have been changed due to the lack of Java Class types.
// - a name getter has been added in place of the class to name map.
export abstract class TileEntity {
	private static nameToClassMap: { [name: string]: () => TileEntity } = {}
	public worldObj:  World | null;
	public xCoord:  int;
	public yCoord:  int;
	public zCoord:  int;

	public abstract get name(): string;

	private static addMapping(name: string, construct: () => TileEntity):  void {
		TileEntity.nameToClassMap[name] = construct;
		// if (TileEntity.classToNameMap.containsKey(string1)) {
		// 	throw new  java.lang.IllegalArgumentException("Duplicate id: " + string1);
		// } else {
		// 	TileEntity.nameToClassMap.put(string1, class0);
		// 	TileEntity.classToNameMap.put(class0, string1);
		// }
	}

	public readFromNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		this.xCoord = nBTTagCompound1.getInteger("x");
		this.yCoord = nBTTagCompound1.getInteger("y");
		this.zCoord = nBTTagCompound1.getInteger("z");
	}

	public writeToNBT(nBTTagCompound1: NBTTagCompound| null):  void {
		nBTTagCompound1.setString("id", this.name);
		nBTTagCompound1.setInteger("x", this.xCoord);
		nBTTagCompound1.setInteger("y", this.yCoord);
		nBTTagCompound1.setInteger("z", this.zCoord);
	}

	public updateEntity():  void {
	}

	public static createAndLoadEntity(nBTTagCompound0: NBTTagCompound| null):  TileEntity | null {
		let  tileEntity1: TileEntity = null;

		try {
			let makeTileEntity = TileEntity.nameToClassMap[nBTTagCompound0.getString("id")];
			if(makeTileEntity) {
				tileEntity1 = makeTileEntity();
			}
		} catch (exception3) {
			if (exception3 instanceof java.lang.Exception) {
				console.error(exception3);
			} else {
				throw exception3;
			}
		}

		if(tileEntity1 !== null) {
			tileEntity1.readFromNBT(nBTTagCompound0);
		} else {
			console.log("Skipping TileEntity with id " + nBTTagCompound0.getString("id"));
		}

		return tileEntity1;
	}

	public async getBlockMetadata():  Promise<int> {
		return await this.worldObj.getBlockMetadata(this.xCoord, this.yCoord, this.zCoord);
	}

	public async onInventoryChanged(): Promise<void> {
		if(this.worldObj !== null) {
			await this.worldObj.func_698_b(this.xCoord, this.yCoord, this.zCoord, this);
		}
	}

	public getDistanceFrom(d1: double, d3: double, d5: double):  double {
		let  d7: double = this.xCoord as double + 0.5 - d1;
		let  d9: double = this.yCoord as double + 0.5 - d3;
		let  d11: double = this.zCoord as double + 0.5 - d5;
		return d7 * d7 + d9 * d9 + d11 * d11;
	}

	public async getBlockType():  Promise<Block | undefined> {
		return Block.blocksList[await this.worldObj.getBlockId(this.xCoord, this.yCoord, this.zCoord)];
	}

	static {
		TileEntity.addMapping("Furnace", () => { return new TileEntityFurnace() });
		// TileEntity.addMapping(TileEntityChest.class, "Chest");
		TileEntity.addMapping("Trap", () => { return new TileEntityDispenser() });
		TileEntity.addMapping("Sign", () => { return new TileEntitySign() });
		// TileEntity.addMapping(TileEntityMobSpawner.class, "MobSpawner");
		// TileEntity.addMapping(TileEntityNote.class, "Music");
	}
}
