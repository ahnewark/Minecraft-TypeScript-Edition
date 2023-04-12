import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Item } from "./Item";
import { Block } from "./Block";
import { CraftingManager } from "./CraftingManager";




export  class RecipesFood extends JavaObject {
	public addRecipes(craftingManager1: CraftingManager| undefined):  void {
		craftingManager1.addRecipe(new  ItemStack(Item.bowlSoup),  ["Y", "X", "#", 'X', Block.mushroomBrown, 'Y', Block.mushroomRed, '#', Item.bowlEmpty]);
		craftingManager1.addRecipe(new  ItemStack(Item.bowlSoup),  ["Y", "X", "#", 'X', Block.mushroomRed, 'Y', Block.mushroomBrown, '#', Item.bowlEmpty]);
	}
}
