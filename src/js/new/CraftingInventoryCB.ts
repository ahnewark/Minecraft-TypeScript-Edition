import { int, short } from "../jree/index";
import { Slot } from "./Slot";
import { ItemStack } from "./ItemStack";
import { InventoryPlayer } from "./InventoryPlayer";
import { IInventory } from "./IInventory";
import { ICrafting } from "./ICrafting";
import { EntityPlayer } from "./EntityPlayer";

export abstract  class CraftingInventoryCB {
	public field_20123_d: (ItemStack | null)[] = [];
	public field_20122_e: Slot[] = [];
	public windowId:  int = 0;
	private field_20917_a:  short = 0;
	protected field_20121_g: ICrafting[] = [];
	private field_20918_b: {} = {};

	protected func_20117_a(slot1: Slot| null):  void {
		slot1.field_20007_a = this.field_20122_e.length;
		this.field_20122_e.push(slot1);
		this.field_20123_d.push(null);
	}

	public func_20114_a():  void {
		for(let  i1: int = 0; i1 < this.field_20122_e.length; ++i1) {
			let  itemStack2: ItemStack = (this.field_20122_e[i1] as Slot).getStack();
			let  itemStack3: ItemStack = this.field_20123_d[i1] as ItemStack;
			if(!ItemStack.areItemStacksEqual(itemStack3, itemStack2)) {
				itemStack3 = itemStack2 === null ? null : itemStack2.copy();
				this.field_20123_d[i1] = itemStack3;

				for(let  i4: int = 0; i4 < this.field_20121_g.length; ++i4) {
					(this.field_20121_g[i4] as ICrafting).func_20159_a(this, i1, itemStack3);
				}
			}
		}

	}

	public func_20118_a(i1: int):  Slot | null {
		return this.field_20122_e[i1] as Slot;
	}

	public async func_20116_a(i1: int, i2: int, entityPlayer3: EntityPlayer| null):  Promise<ItemStack | null> {
		let  itemStack4: ItemStack = null;
		if(i2 === 0 || i2 === 1) {
			let  inventoryPlayer5: InventoryPlayer = entityPlayer3.inventory;
			if(i1 === -999) {
				if(inventoryPlayer5.getItemStack() !== null && i1 === -999) {
					if(i2 === 0) {
						await entityPlayer3.dropPlayerItem(inventoryPlayer5.getItemStack());
						inventoryPlayer5.setItemStack(null as ItemStack);
					}

					if(i2 === 1) {
						await entityPlayer3.dropPlayerItem(inventoryPlayer5.getItemStack().splitStack(1));
						if(inventoryPlayer5.getItemStack().stackSize === 0) {
							inventoryPlayer5.setItemStack(null as ItemStack);
						}
					}
				}
			} else {
				let  slot6: Slot = this.field_20122_e[i1] as Slot;
				if(slot6 !== null) {
					slot6.onSlotChanged();
					let  itemStack7: ItemStack = slot6.getStack();
					if(itemStack7 !== null) {
						itemStack4 = itemStack7.copy();
					}

					if(itemStack7 !== null || inventoryPlayer5.getItemStack() !== null) {
						let  i8: int;
						if(itemStack7 !== null && inventoryPlayer5.getItemStack() === null) {
							i8 = i2 === 0 ? itemStack7.stackSize : (itemStack7.stackSize + 1) / 2;
							inventoryPlayer5.setItemStack(await slot6.decrStackSize(i8));
							if(itemStack7.stackSize === 0) {
								await slot6.putStack(null as ItemStack);
							}

							await slot6.onPickupFromSlot();
						} else if(itemStack7 === null && inventoryPlayer5.getItemStack() !== null && slot6.isItemValid(inventoryPlayer5.getItemStack())) {
							i8 = i2 === 0 ? inventoryPlayer5.getItemStack().stackSize : 1;
							if(i8 > slot6.getSlotStackLimit()) {
								i8 = slot6.getSlotStackLimit();
							}

							await slot6.putStack(inventoryPlayer5.getItemStack().splitStack(i8));
							if(inventoryPlayer5.getItemStack().stackSize === 0) {
								inventoryPlayer5.setItemStack(null as ItemStack);
							}
						} else if(itemStack7 !== null && inventoryPlayer5.getItemStack() !== null) {
							if(slot6.isItemValid(inventoryPlayer5.getItemStack())) {
								if(itemStack7.itemID !== inventoryPlayer5.getItemStack().itemID || itemStack7.getHasSubtypes() && itemStack7.getItemDamage() !== inventoryPlayer5.getItemStack().getItemDamage()) {
									if(inventoryPlayer5.getItemStack().stackSize <= slot6.getSlotStackLimit()) {
										await slot6.putStack(inventoryPlayer5.getItemStack());
										inventoryPlayer5.setItemStack(itemStack7);
									}
								} else if(itemStack7.itemID === inventoryPlayer5.getItemStack().itemID) {
									if(i2 === 0) {
										i8 = inventoryPlayer5.getItemStack().stackSize;
										if(i8 > slot6.getSlotStackLimit() - itemStack7.stackSize) {
											i8 = slot6.getSlotStackLimit() - itemStack7.stackSize;
										}

										if(i8 > inventoryPlayer5.getItemStack().getMaxStackSize() - itemStack7.stackSize) {
											i8 = inventoryPlayer5.getItemStack().getMaxStackSize() - itemStack7.stackSize;
										}

										inventoryPlayer5.getItemStack().splitStack(i8);
										if(inventoryPlayer5.getItemStack().stackSize === 0) {
											inventoryPlayer5.setItemStack(null as ItemStack);
										}

										itemStack7.stackSize += i8;
									} else if(i2 === 1) {
										i8 = 1;
										if(i8 > slot6.getSlotStackLimit() - itemStack7.stackSize) {
											i8 = slot6.getSlotStackLimit() - itemStack7.stackSize;
										}

										if(i8 > inventoryPlayer5.getItemStack().getMaxStackSize() - itemStack7.stackSize) {
											i8 = inventoryPlayer5.getItemStack().getMaxStackSize() - itemStack7.stackSize;
										}

										inventoryPlayer5.getItemStack().splitStack(i8);
										if(inventoryPlayer5.getItemStack().stackSize === 0) {
											inventoryPlayer5.setItemStack(null as ItemStack);
										}

										itemStack7.stackSize += i8;
									}
								}
							} else {
								let  itemStack10: ItemStack = inventoryPlayer5.getItemStack();
								if(itemStack7.itemID === itemStack10.itemID && itemStack10.getMaxStackSize() > 1 && (!itemStack7.getHasSubtypes() || itemStack7.getItemDamage() === itemStack10.getItemDamage())) {
									let  i9: int = itemStack7.stackSize;
									if(i9 > 0 && i9 + itemStack10.stackSize <= itemStack10.getMaxStackSize()) {
										itemStack10.stackSize += i9;
										itemStack7.splitStack(i9);
										if(itemStack7.stackSize === 0) {
											await slot6.putStack(null as ItemStack);
										}

										await slot6.onPickupFromSlot();
									}
								}
							}
						}
					}
				}
			}
		}

		return itemStack4;
	}

	public async onCraftGuiClosed(entityPlayer1: EntityPlayer| null): Promise<void> {
		let  inventoryPlayer2: InventoryPlayer = entityPlayer1.inventory;
		if(inventoryPlayer2.getItemStack() !== null) {
			await entityPlayer1.dropPlayerItem(inventoryPlayer2.getItemStack());
			inventoryPlayer2.setItemStack(null as ItemStack);
		}

	}

	public onCraftMatrixChanged(iInventory1: IInventory| null):  void {
		this.func_20114_a();
	}

	public async func_20119_a(i1: int, itemStack2: ItemStack| null):  Promise<void> {
		await this.func_20118_a(i1).putStack(itemStack2);
	}

	public async func_20115_a(itemStack1: ItemStack[]| null):  Promise<void> {
		for(let  i2: int = 0; i2 < itemStack1.length; ++i2) {
			await this.func_20118_a(i2).putStack(itemStack1[i2]);
		}

	}

	public func_20112_a(i1: int, i2: int):  void {
	}

	public func_20111_a(inventoryPlayer1: InventoryPlayer| null):  short {
		++this.field_20917_a;
		return this.field_20917_a;
	}

	public func_20113_a(s1: short):  void {
	}

	public func_20110_b(s1: short):  void {
	}

	public abstract func_20120_b(entityPlayer1: EntityPlayer| null):  boolean;
}
