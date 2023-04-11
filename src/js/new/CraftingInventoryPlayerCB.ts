
import { int, S } from "jree";
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
	public craftMatrix:  InventoryCrafting | null;
	public craftResult:  IInventory | null;
	public field_20124_c:  boolean;

	public constructor(inventoryPlayer1: InventoryPlayer| null);

	public constructor(inventoryPlayer1: InventoryPlayer| null, z2: boolean);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 1: {
				const [inventoryPlayer1] = args as [InventoryPlayer];


		this(inventoryPlayer1, true);
	

				break;
			}

			case 2: {
				const [inventoryPlayer1, z2] = args as [InventoryPlayer, boolean];


		super();
this.craftMatrix = new  InventoryCrafting(this, 2, 2);
		this.craftResult = new  InventoryCraftResult();
		this.field_20124_c = false;
		this.field_20124_c = z2;
		this.func_20117_a(new  SlotCrafting(this.craftMatrix, this.craftResult, 0, 144, 36));

		let  i3: int;
		let  i4: int;
		for(i3 = 0; i3 < 2; ++i3) {
			for(i4 = 0; i4 < 2; ++i4) {
				this.func_20117_a(new  Slot(this.craftMatrix, i4 + i3 * 2, 88 + i4 * 18, 26 + i3 * 18));
			}
		}

		for(i3 = 0; i3 < 4; ++i3) {
			this.func_20117_a(new  SlotArmor(this, inventoryPlayer1, inventoryPlayer1.getSizeInventory() - 1 - i3, 8, 8 + i3 * 18, i3));
		}

		for(i3 = 0; i3 < 3; ++i3) {
			for(i4 = 0; i4 < 9; ++i4) {
				this.func_20117_a(new  Slot(inventoryPlayer1, i4 + (i3 + 1) * 9, 8 + i4 * 18, 84 + i3 * 18));
			}
		}

		for(i3 = 0; i3 < 9; ++i3) {
			this.func_20117_a(new  Slot(inventoryPlayer1, i3, 8 + i3 * 18, 142));
		}

		this.onCraftMatrixChanged(this.craftMatrix);
	

				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	public onCraftMatrixChanged(iInventory1: IInventory| null):  void {
		this.craftResult.setInventorySlotContents(0, CraftingManager.getInstance().findMatchingRecipe(this.craftMatrix));
	}

	public onCraftGuiClosed(entityPlayer1: EntityPlayer| null):  void {
		super.onCraftGuiClosed(entityPlayer1);

		for(let  i2: int = 0; i2 < 4; ++i2) {
			let  itemStack3: ItemStack = this.craftMatrix.getStackInSlot(i2);
			if(itemStack3 !== null) {
				entityPlayer1.dropPlayerItem(itemStack3);
				this.craftMatrix.setInventorySlotContents(i2, null as ItemStack);
			}
		}

	}

	public func_20120_b(entityPlayer1: EntityPlayer| null):  boolean {
		return true;
	}
}
