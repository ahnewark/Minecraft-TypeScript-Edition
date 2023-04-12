


import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { InventoryCrafting } from "./InventoryCrafting";
import { IRecipe } from "./IRecipe";

export  class ShapelessRecipes extends IRecipe {
	private readonly field_21144_a:  ItemStack | null;
	private readonly field_21143_b:  ItemStack[] | null;

	public constructor(itemStack1: ItemStack| null, list2: ItemStack[] | null) {
		super();
		this.field_21144_a = itemStack1;
		this.field_21143_b = list2;
	}

	public func_21135_a(inventoryCrafting1: InventoryCrafting| null):  boolean {
		let  arrayList2: ItemStack[] = [];

		for(let  i3: int = 0; i3 < 3; ++i3) {
			for(let  i4: int = 0; i4 < 3; ++i4) {
				let  itemStack5: ItemStack = inventoryCrafting1.func_21103_b(i4, i3);
				if(itemStack5 !== null) {
					let  z6: boolean = false;

					let _break = false;
					arrayList2.forEach((itemStack8, index) => {
						if (_break) return;
						if(itemStack5.itemID === itemStack8.itemID && (itemStack8.getItemDamage() === -1 || itemStack5.getItemDamage() === itemStack8.getItemDamage())) {
							z6 = true;
							arrayList2.splice(index, 1);
							_break = true;
						}
					})

					if(!z6) {
						return false;
					}
				}
			}
		}

		return arrayList2.length == 0;
	}

	public func_21136_b(inventoryCrafting1: InventoryCrafting| null):  ItemStack | null {
		return this.field_21144_a.copy();
	}

	public getRecipeSize():  int {
		return this.field_21143_b.length;
	}
}
