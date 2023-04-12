
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { InventoryCrafting } from "./InventoryCrafting";
import { IRecipe } from "./IRecipe";

export  class ShapedRecipes extends IRecipe {
	private field_21138_b:  int;
	private field_21142_c:  int;
	private field_21141_d:  ItemStack[] | undefined;
	private field_21140_e:  ItemStack | undefined;
	public readonly field_21139_a:  int;

	public constructor(i1: int, i2: int, itemStack3: ItemStack[]| undefined, itemStack4: ItemStack| undefined) {
		super();
		this.field_21139_a = itemStack4.itemID;
		this.field_21138_b = i1;
		this.field_21142_c = i2;
		this.field_21141_d = itemStack3;
		this.field_21140_e = itemStack4;
	}

	public func_21135_a(inventoryCrafting1: InventoryCrafting| undefined):  boolean {
		for(let  i2: int = 0; i2 <= 3 - this.field_21138_b; ++i2) {
			for(let  i3: int = 0; i3 <= 3 - this.field_21142_c; ++i3) {
				if(this.func_21137_a(inventoryCrafting1, i2, i3, true)) {
					return true;
				}

				if(this.func_21137_a(inventoryCrafting1, i2, i3, false)) {
					return true;
				}
			}
		}

		return false;
	}

	private func_21137_a(inventoryCrafting1: InventoryCrafting| undefined, i2: int, i3: int, z4: boolean):  boolean {
		for(let  i5: int = 0; i5 < 3; ++i5) {
			for(let  i6: int = 0; i6 < 3; ++i6) {
				let  i7: int = i5 - i2;
				let  i8: int = i6 - i3;
				let  itemStack9: ItemStack = undefined;
				if(i7 >= 0 && i8 >= 0 && i7 < this.field_21138_b && i8 < this.field_21142_c) {
					if(z4) {
						itemStack9 = this.field_21141_d[this.field_21138_b - i7 - 1 + i8 * this.field_21138_b];
					} else {
						itemStack9 = this.field_21141_d[i7 + i8 * this.field_21138_b];
					}
				}

				let  itemStack10: ItemStack = inventoryCrafting1.func_21103_b(i5, i6);
				if(itemStack10 !== undefined || itemStack9 !== undefined) {
					if(itemStack10 === undefined && itemStack9 !== undefined || itemStack10 !== undefined && itemStack9 === undefined) {
						return false;
					}

					if(itemStack9.itemID !== itemStack10.itemID) {
						return false;
					}

					if(itemStack9.getItemDamage() !== -1 && itemStack9.getItemDamage() !== itemStack10.getItemDamage()) {
						return false;
					}
				}
			}
		}

		return true;
	}

	public func_21136_b(inventoryCrafting1: InventoryCrafting| undefined):  ItemStack | undefined {
		return new  ItemStack(this.field_21140_e.itemID, this.field_21140_e.stackSize, this.field_21140_e.getItemDamage());
	}

	public getRecipeSize():  int {
		return this.field_21138_b * this.field_21142_c;
	}
}
