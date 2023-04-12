


import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Block } from "./Block";
import { Item } from "./Item";

export class FurnaceRecipes {
	public static smeltingBase:  FurnaceRecipes;
	private smeltingList: { [id: number]: ItemStack} = {};

	public static smelting():  FurnaceRecipes | null {
		return FurnaceRecipes.smeltingBase;
	}

	public constructor() {
		this.addSmelting(Block.oreIron.blockID, new  ItemStack(Item.ingotIron));
		this.addSmelting(Block.oreGold.blockID, new  ItemStack(Item.ingotGold));
		this.addSmelting(Block.oreDiamond.blockID, new  ItemStack(Item.diamond));
		this.addSmelting(Block.sand.blockID, new  ItemStack(Block.glass));
		this.addSmelting(Item.porkRaw.shiftedIndex, new  ItemStack(Item.porkCooked));
		this.addSmelting(Item.fishRaw.shiftedIndex, new  ItemStack(Item.fishCooked));
		this.addSmelting(Block.cobblestone.blockID, new  ItemStack(Block.stone));
		this.addSmelting(Item.clay.shiftedIndex, new  ItemStack(Item.brick));
		this.addSmelting(Block.cactus.blockID, new  ItemStack(Item.dyePowder, 1, 2));
		this.addSmelting(Block.wood.blockID, new  ItemStack(Item.coal, 1, 1));
	}

	public addSmelting(i1: int, itemStack2: ItemStack):  void {
		this.smeltingList[i1] = itemStack2;
	}

	public getSmeltingResult(i1: int):  ItemStack | null {
		return this.smeltingList[i1];
	}
}
