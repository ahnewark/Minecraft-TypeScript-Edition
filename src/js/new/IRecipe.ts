
import { ItemStack } from "./ItemStack";
import { InventoryCrafting } from "./InventoryCrafting";
import { JavaObject } from "../jree/index";

export abstract class IRecipe extends JavaObject {
	 public abstract func_21135_a(inventoryCrafting1: InventoryCrafting| undefined): boolean;

	 public abstract func_21136_b(inventoryCrafting1: InventoryCrafting| undefined): ItemStack;

	 public abstract getRecipeSize(): number;
}
