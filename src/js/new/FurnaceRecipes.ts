


import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { BlockRegistry } from "./index";
import { ItemRegistry } from "./moved/ItemRegistry";

export class FurnaceRecipes {
	private static readonly smeltingBase:  FurnaceRecipes | null = new  FurnaceRecipes();
	private smeltingList: { [id: number]: ItemStack};

	public static smelting():  FurnaceRecipes | null {
		return FurnaceRecipes.smeltingBase;
	}

	private constructor() {
		this.addSmelting(BlockRegistry.oreIron.blockID, new  ItemStack(ItemRegistry.ingotIron));
		this.addSmelting(BlockRegistry.oreGold.blockID, new  ItemStack(ItemRegistry.ingotGold));
		this.addSmelting(BlockRegistry.oreDiamond.blockID, new  ItemStack(ItemRegistry.diamond));
		this.addSmelting(BlockRegistry.sand.blockID, new  ItemStack(BlockRegistry.glass));
		this.addSmelting(ItemRegistry.porkRaw.shiftedIndex, new  ItemStack(ItemRegistry.porkCooked));
		this.addSmelting(ItemRegistry.fishRaw.shiftedIndex, new  ItemStack(ItemRegistry.fishCooked));
		this.addSmelting(BlockRegistry.cobblestone.blockID, new  ItemStack(BlockRegistry.stone));
		this.addSmelting(ItemRegistry.clay.shiftedIndex, new  ItemStack(ItemRegistry.brick));
		this.addSmelting(BlockRegistry.cactus.blockID, new  ItemStack(ItemRegistry.dyePowder, 1, 2));
		this.addSmelting(BlockRegistry.wood.blockID, new  ItemStack(ItemRegistry.coal, 1, 1));
	}

	public addSmelting(i1: int, itemStack2: ItemStack):  void {
		this.smeltingList[i1] = itemStack2;
	}

	public getSmeltingResult(i1: int):  ItemStack | null {
		return this.smeltingList[i1];
	}
}
