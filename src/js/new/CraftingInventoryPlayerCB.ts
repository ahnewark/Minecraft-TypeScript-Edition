
import { int, java, S } from "../jree/index";
import { SlotCrafting } from "./SlotCrafting";
import { SlotArmor } from "./SlotArmor";
import { Slot } from "./Slot";
import { ItemStack } from "./ItemStack";
import { InventoryPlayer } from "./InventoryPlayer";
import { InventoryCrafting } from "./InventoryCrafting";
import { InventoryCraftResult } from "./InventoryCraftResult";
import { IInventory } from "./IInventory";
import { EntityPlayer } from "./EntityPlayer";
import { CraftingManager } from "./CraftingManager";
import { CraftingInventoryCB } from "./CraftingInventoryCB";

export  class CraftingInventoryPlayerCB extends CraftingInventoryCB {
	public craftMatrix:  InventoryCrafting | undefined;
	public craftResult:  IInventory | undefined;
	public field_20124_c:  boolean;

	public static async Construct(inventoryPlayer1: InventoryPlayer| undefined);
	public static async Construct(inventoryPlayer1: InventoryPlayer| undefined, z2: boolean);
    public static async Construct(...args: unknown[]) {
		const _this = new CraftingInventoryPlayerCB();

		const [inventoryPlayer1] = args as [InventoryPlayer];
		let z2 = true;
		switch (args.length) {
			case 1: {
				break;
			}

			case 2: {
				z2 = args[1] as boolean;

				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}


		_this.craftMatrix = new  InventoryCrafting(_this, 2, 2);
		_this.craftResult = new  InventoryCraftResult();
		_this.field_20124_c = false;
		_this.field_20124_c = z2;
		_this.func_20117_a(new  SlotCrafting(_this.craftMatrix, _this.craftResult, 0, 144, 36));

		let  i3: int;
		let  i4: int;
		for(i3 = 0; i3 < 2; ++i3) {
			for(i4 = 0; i4 < 2; ++i4) {
				_this.func_20117_a(new  Slot(_this.craftMatrix, i4 + i3 * 2, 88 + i4 * 18, 26 + i3 * 18));
			}
		}

		for(i3 = 0; i3 < 4; ++i3) {
			_this.func_20117_a(new  SlotArmor(_this, inventoryPlayer1, inventoryPlayer1.getSizeInventory() - 1 - i3, 8, 8 + i3 * 18, i3));
		}

		for(i3 = 0; i3 < 3; ++i3) {
			for(i4 = 0; i4 < 9; ++i4) {
				_this.func_20117_a(new  Slot(inventoryPlayer1, i4 + (i3 + 1) * 9, 8 + i4 * 18, 84 + i3 * 18));
			}
		}

		for(i3 = 0; i3 < 9; ++i3) {
			_this.func_20117_a(new  Slot(inventoryPlayer1, i3, 8 + i3 * 18, 142));
		}

		await _this.onCraftMatrixChanged(_this.craftMatrix);

		return _this;
	}


	public async onCraftMatrixChanged(iInventory1: IInventory| undefined):  Promise<void> {
		await this.craftResult.setInventorySlotContents(0, CraftingManager.getInstance().findMatchingRecipe(this.craftMatrix));
	}

	public async onCraftGuiClosed(entityPlayer1: EntityPlayer| undefined):  Promise<void> {
		await super.onCraftGuiClosed(entityPlayer1);

		for(let  i2: int = 0; i2 < 4; ++i2) {
			let  itemStack3: ItemStack = this.craftMatrix.getStackInSlot(i2);
			if(itemStack3 !== undefined) {
				await entityPlayer1.dropPlayerItem(itemStack3);
				await this.craftMatrix.setInventorySlotContents(i2, undefined as ItemStack);
			}
		}

	}

	public func_20120_b(entityPlayer1: EntityPlayer| undefined):  boolean {
		return true;
	}
}
