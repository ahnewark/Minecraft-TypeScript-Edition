import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Item } from "./Item";
import { Block } from "./Block";
import { CraftingManager } from "./CraftingManager";




export  class RecipesTools extends JavaObject {
	private recipePatterns:  string[][] | undefined =  [["XXX", " # ", " # "], ["X", "#", "#"], ["XX", "X#", " #"], ["XX", " #", " #"]];
	private recipeItems:  any[][] | undefined =  [[Block.planks, Block.cobblestone, Item.ingotIron, Item.diamond, Item.ingotGold], [Item.pickaxeWood, Item.pickaxeStone, Item.pickaxeSteel, Item.pickaxeDiamond, Item.pickaxeGold], [Item.shovelWood, Item.shovelStone, Item.shovelSteel, Item.shovelDiamond, Item.shovelGold], [Item.axeWood, Item.axeStone, Item.axeSteel, Item.axeDiamond, Item.axeGold], [Item.hoeWood, Item.hoeStone, Item.hoeSteel, Item.hoeDiamond, Item.hoeGold]];

	public addRecipes(craftingManager1: CraftingManager| undefined):  void {
		for(let  i2: int = 0; i2 < this.recipeItems[0].length; ++i2) {
			let  object3: java.lang.Object = this.recipeItems[0][i2];

			for(let  i4: int = 0; i4 < this.recipeItems.length - 1; ++i4) {
				let  item5: Item = this.recipeItems[i4 + 1][i2] as Item;
				craftingManager1.addRecipe(new  ItemStack(item5),  [this.recipePatterns[i4], '#', Item.stick, 'X', object3]);
			}
		}

	}
}
