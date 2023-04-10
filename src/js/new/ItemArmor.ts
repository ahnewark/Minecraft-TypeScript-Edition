
import { int } from "../jree/index";
import { Item } from "./Item";

export  class ItemArmor extends Item {
	private static damageReduceAmountArray =  [3, 8, 6, 3];
	private static maxDamageArray =  [11, 16, 15, 13];
	public readonly armorLevel:  int;
	public readonly armorType:  int;
	public readonly damageReduceAmount:  int;
	public readonly renderIndex:  int;

	public constructor(i1: int, i2: int, i3: int, i4: int) {
		super(i1);
		this.armorLevel = i2;
		this.armorType = i4;
		this.renderIndex = i3;
		this.damageReduceAmount = ItemArmor.damageReduceAmountArray[i4];
		this.maxDamage = ItemArmor.maxDamageArray[i4] * 3 << i2;
		this.maxStackSize = 1;
	}
}
