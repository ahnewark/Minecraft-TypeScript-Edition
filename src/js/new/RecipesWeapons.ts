import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Item } from "./Item";
import { Block } from "./Block";
import { CraftingManager } from "./CraftingManager";

export  class RecipesWeapons extends JavaObject {
	private recipePatterns:  string[][] | undefined =  [["X", "X", "#"]];
	private recipeItems:  any[][] | undefined =  [[Block.planks, Block.cobblestone, Item.ingotIron, Item.diamond, Item.ingotGold], [Item.swordWood, Item.swordStone, Item.swordSteel, Item.swordDiamond, Item.swordGold]];

	public addRecipes(craftingManager1: CraftingManager| undefined):  void {
		for(let  i2: int = 0; i2 < this.recipeItems[0].length; ++i2) {
			let  object3: any = this.recipeItems[0][i2];

			for(let  i4: int = 0; i4 < this.recipeItems.length - 1; ++i4) {
				let  item5: Item = this.recipeItems[i4 + 1][i2] as Item;
				craftingManager1.addRecipe(new  ItemStack(item5),  [this.recipePatterns[i4], '#', Item.stick, 'X', object3]);
			}
		}

		craftingManager1.addRecipe(new  ItemStack(Item.bow, 1),  [" #X", "# X", " #X", 'X', Item.silk, '#', Item.stick]);
		craftingManager1.addRecipe(new  ItemStack(Item.arrow, 4),  ["X", "#", "Y", 'Y', Item.feather, 'X', Item.flint, '#', Item.stick]);
	}
}
