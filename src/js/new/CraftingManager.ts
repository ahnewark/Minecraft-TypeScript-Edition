import { JavaObject, java, int } from "../jree/index";
import { ShapelessRecipes } from "./ShapelessRecipes";
import { ShapedRecipes } from "./ShapedRecipes";
import { RecipesWeapons } from "./RecipesWeapons";
import { RecipesTools } from "./RecipesTools";
import { RecipesIngots } from "./RecipesIngots";
import { RecipesFood } from "./RecipesFood";
import { RecipesDyes } from "./RecipesDyes";
import { RecipesCrafting } from "./RecipesCrafting";
import { RecipesArmor } from "./RecipesArmor";
import { RecipeSorter } from "./RecipeSorter";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { InventoryCrafting } from "./InventoryCrafting";
import { IRecipe } from "./IRecipe";
import { Block } from "./Block";
import { List } from "../jree/java/util/List";
import { ArrayList } from "../jree/java/util/ArrayList";

export  class CraftingManager extends JavaObject {
	public static instance:  CraftingManager;
	private recipes: List<IRecipe> = new ArrayList<IRecipe>();

	public static getInstance():  CraftingManager | null {
		return CraftingManager.instance;
	}

	public constructor() {
		super();
		(new  RecipesTools()).addRecipes(this);
		(new  RecipesWeapons()).addRecipes(this);
		(new  RecipesIngots()).addRecipes(this);
		(new  RecipesFood()).addRecipes(this);
		(new  RecipesCrafting()).addRecipes(this);
		(new  RecipesArmor()).addRecipes(this);
		(new  RecipesDyes()).addRecipes(this);
		this.addRecipe(new  ItemStack(Item.paper, 3),  ["###", '#', Item.reed]);
		this.addRecipe(new  ItemStack(Item.book, 1),  ["#", "#", "#", '#', Item.paper]);
		this.addRecipe(new  ItemStack(Block.fence, 2),  ["###", "###", '#', Item.stick]);
		this.addRecipe(new  ItemStack(Block.jukebox, 1),  ["###", "#X#", "###", '#', Block.planks, 'X', Item.diamond]);
		this.addRecipe(new  ItemStack(Block.musicBlock, 1),  ["###", "#X#", "###", '#', Block.planks, 'X', Item.redstone]);
		this.addRecipe(new  ItemStack(Block.bookShelf, 1),  ["###", "XXX", "###", '#', Block.planks, 'X', Item.book]);
		this.addRecipe(new  ItemStack(Block.blockSnow, 1),  ["##", "##", '#', Item.snowball]);
		this.addRecipe(new  ItemStack(Block.blockClay, 1),  ["##", "##", '#', Item.clay]);
		this.addRecipe(new  ItemStack(Block.brick, 1),  ["##", "##", '#', Item.brick]);
		this.addRecipe(new  ItemStack(Block.lightStone, 1),  ["###", "###", "###", '#', Item.lightStoneDust]);
		this.addRecipe(new  ItemStack(Block.cloth, 1),  ["###", "###", "###", '#', Item.silk]);
		this.addRecipe(new  ItemStack(Block.tnt, 1),  ["X#X", "#X#", "X#X", 'X', Item.gunpowder, '#', Block.sand]);
		this.addRecipe(new  ItemStack(Block.stairSingle, 3),  ["###", '#', Block.cobblestone]);
		this.addRecipe(new  ItemStack(Block.ladder, 1),  ["# #", "###", "# #", '#', Item.stick]);
		this.addRecipe(new  ItemStack(Item.doorWood, 1),  ["##", "##", "##", '#', Block.planks]);
		this.addRecipe(new  ItemStack(Item.doorSteel, 1),  ["##", "##", "##", '#', Item.ingotIron]);
		this.addRecipe(new  ItemStack(Item.sign, 1),  ["###", "###", " X ", '#', Block.planks, 'X', Item.stick]);
		this.addRecipe(new  ItemStack(Item.cake, 1),  ["AAA", "BEB", "CCC", 'A', Item.bucketMilk, 'B', Item.sugar, 'C', Item.wheat, 'E', Item.egg]);
		this.addRecipe(new  ItemStack(Item.sugar, 1),  ["#", '#', Item.reed]);
		this.addRecipe(new  ItemStack(Block.planks, 4),  ["#", '#', Block.wood]);
		this.addRecipe(new  ItemStack(Item.stick, 4),  ["#", "#", '#', Block.planks]);
		this.addRecipe(new  ItemStack(Block.torchWood, 4),  ["X", "#", 'X', Item.coal, '#', Item.stick]);
		this.addRecipe(new  ItemStack(Block.torchWood, 4),  ["X", "#", 'X', new  ItemStack(Item.coal, 1, 1), '#', Item.stick]);
		this.addRecipe(new  ItemStack(Item.bowlEmpty, 4),  ["# #", " # ", '#', Block.planks]);
		this.addRecipe(new  ItemStack(Block.minecartTrack, 16),  ["X X", "X#X", "X X", 'X', Item.ingotIron, '#', Item.stick]);
		this.addRecipe(new  ItemStack(Item.minecartEmpty, 1),  ["# #", "###", '#', Item.ingotIron]);
		this.addRecipe(new  ItemStack(Block.pumpkinLantern, 1),  ["A", "B", 'A', Block.pumpkin, 'B', Block.torchWood]);
		this.addRecipe(new  ItemStack(Item.minecartCrate, 1),  ["A", "B", 'A', Block.crate, 'B', Item.minecartEmpty]);
		this.addRecipe(new  ItemStack(Item.minecartPowered, 1),  ["A", "B", 'A', Block.stoneOvenIdle, 'B', Item.minecartEmpty]);
		this.addRecipe(new  ItemStack(Item.boat, 1),  ["# #", "###", '#', Block.planks]);
		this.addRecipe(new  ItemStack(Item.bucketEmpty, 1),  ["# #", " # ", '#', Item.ingotIron]);
		this.addRecipe(new  ItemStack(Item.flintAndSteel, 1),  ["A ", " B", 'A', Item.ingotIron, 'B', Item.flint]);
		this.addRecipe(new  ItemStack(Item.bread, 1),  ["###", '#', Item.wheat]);
		this.addRecipe(new  ItemStack(Block.stairCompactPlanks, 4),  ["#  ", "## ", "###", '#', Block.planks]);
		this.addRecipe(new  ItemStack(Item.fishingRod, 1),  ["  #", " #X", "# X", '#', Item.stick, 'X', Item.silk]);
		this.addRecipe(new  ItemStack(Block.stairCompactCobblestone, 4),  ["#  ", "## ", "###", '#', Block.cobblestone]);
		this.addRecipe(new  ItemStack(Item.painting, 1),  ["###", "#X#", "###", '#', Item.stick, 'X', Block.cloth]);
		this.addRecipe(new  ItemStack(Item.appleGold, 1),  ["###", "#X#", "###", '#', Block.blockGold, 'X', Item.appleRed]);
		this.addRecipe(new  ItemStack(Block.lever, 1),  ["X", "#", '#', Block.cobblestone, 'X', Item.stick]);
		this.addRecipe(new  ItemStack(Block.torchRedstoneActive, 1),  ["X", "#", '#', Item.stick, 'X', Item.redstone]);
		this.addRecipe(new  ItemStack(Item.pocketSundial, 1),  [" # ", "#X#", " # ", '#', Item.ingotGold, 'X', Item.redstone]);
		this.addRecipe(new  ItemStack(Item.compass, 1),  [" # ", "#X#", " # ", '#', Item.ingotIron, 'X', Item.redstone]);
		this.addRecipe(new  ItemStack(Block.button, 1),  ["#", "#", '#', Block.stone]);
		this.addRecipe(new  ItemStack(Block.pressurePlateStone, 1),  ["###", '#', Block.stone]);
		this.addRecipe(new  ItemStack(Block.pressurePlatePlanks, 1),  ["###", '#', Block.planks]);
		this.addRecipe(new  ItemStack(Block.dispenser, 1),  ["###", "#X#", "#R#", '#', Block.cobblestone, 'X', Item.bow, 'R', Item.redstone]);
		//java.util.Collections.sort<IRecipe>(this.recipes, new  RecipeSorter(this));
		console.log(this.recipes.size() + " recipes");
	}

	public addRecipe(result: ItemStack| null, object2: (string | Block | Item | ItemStack)[],): void {
		let i = 0;
		let width = 0;
		let height = 0;
		let craftingString: string[] = [];
		let itemMap: { [itemCode: string]: ItemStack } = {};
		
		while (true) {
			const element = object2[i];

			if (typeof element === 'string') 
			{
				craftingString.push(element);
			}
			
			i++;

			if (typeof object2[i + 1] !== 'string') {
				// STUFF COMIGN UP
				break;
			}

		}

		for (; i < object2.length; i += 2) {
			const character = object2[i] as string;
			const item = object2[i + 1] as (Item | ItemStack | Block);
			let itemStack: ItemStack;
			if (item instanceof Block)
				itemStack = new ItemStack(item, 1, -1);
			else if (item instanceof Item)
				itemStack = new ItemStack(item);
			else
				itemStack = item;

			// console.log(itemStack);
			itemMap[character] = itemStack;
		}

		// console.log(itemMap);

		craftingString.forEach(line => {
			if (line.length > width)
				width = line.length;
		})

		height = craftingString.length;

		const recipeItems: ItemStack[] = new Array(width * height);
		recipeItems.fill(null);

		craftingString.forEach((line, lineIndex) => {
			for (let charIndex = 0; charIndex < line.length; charIndex++) {
				if (itemMap[line[charIndex]])
					recipeItems[(lineIndex * width) + charIndex] = (itemMap[line[charIndex]])
			}
		})

		this.recipes.add(new ShapedRecipes(width, height, recipeItems, result));
	}

	public addShapelessRecipe(itemStack1: ItemStack, object2: (ItemStack | Item | Block)[]): void {
		let  arrayList3: ItemStack[] = [];
		// let  object4: java.lang.Object[] = object2;
		let  i5: int = object2.length;

		for(let  i6: int = 0; i6 < i5; ++i6) {
			let  object7 = object2[i6];
			if(object7 instanceof ItemStack) {
				arrayList3.push((object7 as ItemStack).copy());
			} else if(object7 instanceof Item) {
				arrayList3.push(new  ItemStack(object7 as Item));
			} else {
				if(!(object7 instanceof Block)) {
					throw new  java.lang.RuntimeException("Invalid shapeless recipy!");
				}

				arrayList3.push(new  ItemStack(object7 as Block));
			}
		}

		// console.log({arrayList3});

		this.recipes.add(new  ShapelessRecipes(itemStack1, arrayList3));
	}

	public findMatchingRecipe(inventoryCrafting1: InventoryCrafting| null):  ItemStack | null {
		for(let  i2: int = 0; i2 < this.recipes.size(); ++i2) {
			let  iRecipe3: IRecipe = this.recipes[i2] as IRecipe;
			if(iRecipe3.func_21135_a(inventoryCrafting1)) {
				return iRecipe3.func_21136_b(inventoryCrafting1);
			}
		}

		return null;
	}
}
