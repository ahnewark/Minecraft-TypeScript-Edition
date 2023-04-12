import { FurnaceRecipes } from "../FurnaceRecipes";

export class FurnaceRecipesRegistry {
    static {
        FurnaceRecipes.smeltingBase = new FurnaceRecipes();
    }
}