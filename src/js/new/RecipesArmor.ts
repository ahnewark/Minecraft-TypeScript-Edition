
import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Item } from "./Item";
import { Block } from "./Block";
import { CraftingManager } from "./CraftingManager";

export  class RecipesArmor extends JavaObject {
	private recipePatterns:  string[][] =  [["XXX", "X X"], ["X X", "XXX", "XXX"], ["XXX", "X X", "X X"], ["X X", "X X"]];
	private recipeItems:  any[][] | undefined =  [[Item.leather, Block.fire, Item.ingotIron, Item.diamond, Item.ingotGold], [Item.helmetLeather, Item.helmetChain, Item.helmetSteel, Item.helmetDiamond, Item.helmetGold], [Item.plateLeather, Item.plateChain, Item.plateSteel, Item.plateDiamond, Item.plateGold], [Item.legsLeather, Item.legsChain, Item.legsSteel, Item.legsDiamond, Item.legsGold], [Item.bootsLeather, Item.bootsChain, Item.bootsSteel, Item.bootsDiamond, Item.bootsGold]];

	public addRecipes(craftingManager1: CraftingManager| undefined):  void {
		for(let  i2: int = 0; i2 < this.recipeItems[0].length; ++i2) {
			let  object3: java.lang.Object = this.recipeItems[0][i2];

			for(let  i4: int = 0; i4 < this.recipeItems.length - 1; ++i4) {
				let  item5: Item = this.recipeItems[i4 + 1][i2] as Item;
				craftingManager1.addRecipe(new  ItemStack(item5),  [this.recipePatterns[i4], 'X', object3]);
			}
		}

	}
}
