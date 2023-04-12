import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Block } from "./Block";
import { CraftingManager } from "./CraftingManager";

export  class RecipesCrafting extends JavaObject {
	public addRecipes(craftingManager1: CraftingManager| undefined):  void {
		craftingManager1.addRecipe(new  ItemStack(Block.crate),  ["###", "# #", "###", '#', Block.planks]);
		craftingManager1.addRecipe(new  ItemStack(Block.stoneOvenIdle),  ["###", "# #", "###", '#', Block.cobblestone]);
		craftingManager1.addRecipe(new  ItemStack(Block.workbench),  ["##", "##", '#', Block.planks]);
		craftingManager1.addRecipe(new  ItemStack(Block.sandStone),  ["##", "##", '#', Block.sand]);
	}
}
