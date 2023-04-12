import { JavaObject, java, int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Item } from "./Item";
import { Block } from "./Block";
import { CraftingManager } from "./CraftingManager";
import { BlockCloth } from "./BlockCloth";




export  class RecipesDyes extends JavaObject {
	public addRecipes(craftingManager1: CraftingManager| undefined):  void {
		for(let  i2: int = 0; i2 < 16; ++i2) {
			craftingManager1.addShapelessRecipe(new  ItemStack(Block.cloth, 1, BlockCloth.func_21035_d(i2)),  [new  ItemStack(Item.dyePowder, 1, i2), new  ItemStack(Item.itemsList[Block.cloth.blockID], 1, 0)]);
		}

		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 11),  [Block.plantYellow]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 1),  [Block.plantRed]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 3, 15),  [Item.bone]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 9),  [new  ItemStack(Item.dyePowder, 1, 1), new  ItemStack(Item.dyePowder, 1, 15)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 14),  [new  ItemStack(Item.dyePowder, 1, 1), new  ItemStack(Item.dyePowder, 1, 11)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 10),  [new  ItemStack(Item.dyePowder, 1, 2), new  ItemStack(Item.dyePowder, 1, 15)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 8),  [new  ItemStack(Item.dyePowder, 1, 0), new  ItemStack(Item.dyePowder, 1, 15)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 7),  [new  ItemStack(Item.dyePowder, 1, 8), new  ItemStack(Item.dyePowder, 1, 15)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 3, 7),  [new  ItemStack(Item.dyePowder, 1, 0), new  ItemStack(Item.dyePowder, 1, 15), new  ItemStack(Item.dyePowder, 1, 15)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 12),  [new  ItemStack(Item.dyePowder, 1, 4), new  ItemStack(Item.dyePowder, 1, 15)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 6),  [new  ItemStack(Item.dyePowder, 1, 4), new  ItemStack(Item.dyePowder, 1, 2)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 5),  [new  ItemStack(Item.dyePowder, 1, 4), new  ItemStack(Item.dyePowder, 1, 1)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 2, 13),  [new  ItemStack(Item.dyePowder, 1, 5), new  ItemStack(Item.dyePowder, 1, 9)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 3, 13),  [new  ItemStack(Item.dyePowder, 1, 4), new  ItemStack(Item.dyePowder, 1, 1), new  ItemStack(Item.dyePowder, 1, 9)]);
		craftingManager1.addShapelessRecipe(new  ItemStack(Item.dyePowder, 4, 13),  [new  ItemStack(Item.dyePowder, 1, 4), new  ItemStack(Item.dyePowder, 1, 1), new  ItemStack(Item.dyePowder, 1, 1), new  ItemStack(Item.dyePowder, 1, 15)]);
	}
}
