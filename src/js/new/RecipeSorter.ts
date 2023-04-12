import { java, int, JavaObject } from "../jree/index";
import { ShapelessRecipes } from "./ShapelessRecipes";
import { ShapedRecipes } from "./ShapedRecipes";
import { IRecipe } from "./IRecipe";
import { CraftingManager } from "./CraftingManager";

export class RecipeSorter extends JavaObject implements java.util.Comparator<IRecipe> {
	protected readonly craftingManager:  CraftingManager | null;

	public constructor(craftingManager1: CraftingManager| null) {
		super();
		this.craftingManager = craftingManager1;
	}

	public compareRecipes(iRecipe1: IRecipe| null, iRecipe2: IRecipe| null):  int {
		return iRecipe1 instanceof ShapelessRecipes && iRecipe2 instanceof ShapedRecipes ? 1 : (iRecipe2 instanceof ShapelessRecipes && iRecipe1 instanceof ShapedRecipes ? -1 : (iRecipe2.getRecipeSize() < iRecipe1.getRecipeSize() ? -1 : (iRecipe2.getRecipeSize() > iRecipe1.getRecipeSize() ? 1 : 0)));
	}

	public compare(object1: java.lang.Object| null, object2: java.lang.Object| null):  int {
		return this.compareRecipes(object1 as IRecipe, object2 as IRecipe);
	}
}
