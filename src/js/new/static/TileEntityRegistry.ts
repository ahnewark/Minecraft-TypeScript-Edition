import { TileEntity } from "../TileEntity";

import { TileEntitySign } from "../TileEntitySign";
import { TileEntityNote } from "../TileEntityNote";
import { TileEntityMobSpawner } from "../TileEntityMobSpawner";
import { TileEntityFurnace } from "../TileEntityFurnace";
import { TileEntityDispenser } from "../TileEntityDispenser";
import { TileEntityChest } from "../TileEntityChest";

export class TileEntityRegistry {
    static {
		TileEntity.addMapping("Furnace", () => { return new TileEntityFurnace() });
		TileEntity.addMapping("Chest", () => { return new TileEntityChest() });
		TileEntity.addMapping("Trap", () => { return new TileEntityDispenser() });
		TileEntity.addMapping("Sign", () => { return new TileEntitySign() });
		TileEntity.addMapping("MobSpawner", () => { return new TileEntityMobSpawner() });
		TileEntity.addMapping("Music", () => { return new TileEntityNote() });
	}
}