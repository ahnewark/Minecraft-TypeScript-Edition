
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { CraftingInventoryCB } from "./CraftingInventoryCB";

export interface ICrafting {
	 func_20159_a(craftingInventoryCB1: CraftingInventoryCB| undefined, i2: int, itemStack3: ItemStack| undefined): void;

	 func_20158_a(craftingInventoryCB1: CraftingInventoryCB| undefined, i2: int, i3: int): void;
}
