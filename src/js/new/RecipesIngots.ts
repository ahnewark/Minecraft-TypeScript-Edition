import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Item } from "./Item";
import { Block } from "./Block";
import { CraftingManager } from "./CraftingManager";
import { Block } from "./Block";


export  class RecipesIngots extends JavaObject {
	private recipeItems: any[][] | null =  [[Block.blockGold, new  ItemStack(Item.ingotGold, 9)], [Block.blockSteel, new  ItemStack(Item.ingotIron, 9)], [Block.blockDiamond, new  ItemStack(Item.diamond, 9)], [Block.blockLapis, new  ItemStack(Item.dyePowder, 9, 4)]];

	public addRecipes(craftingManager1: CraftingManager| null):  void {
		for(let  i2: int = 0; i2 < this.recipeItems.length; ++i2) {
			let  block3: Block = this.recipeItems[i2][0] as Block;
			let  itemStack4: ItemStack = this.recipeItems[i2][1] as ItemStack;
			craftingManager1.addRecipe(new  ItemStack(block3),  ["###", "###", "###", '#', itemStack4]);
			craftingManager1.addRecipe(itemStack4,  ["#", '#', block3]);
		}

	}
}
