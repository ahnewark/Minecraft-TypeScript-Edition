import { java, S, int, float } from "../jree/index";

export class  EnumToolMaterial extends java.lang.Enum<EnumToolMaterial> {
	public static readonly WOOD: EnumToolMaterial = new class extends EnumToolMaterial {}(0, 59, 2.0, 0,S`WOOD`, 0);
	public static readonly STONE: EnumToolMaterial = new class extends EnumToolMaterial {}(1, 131, 4.0, 1,S`STONE`, 1);
	public static readonly IRON: EnumToolMaterial = new class extends EnumToolMaterial {}(2, 250, 6.0, 2,S`IRON`, 2);
	public static readonly EMERALD: EnumToolMaterial = new class extends EnumToolMaterial {}(3, 1561, 8.0, 3,S`EMERALD`, 3);
	public static readonly GOLD: EnumToolMaterial = new class extends EnumToolMaterial {}(0, 32, 12.0, 0,S`GOLD`, 4);

	private readonly harvestLevel:  int;
	private readonly maxUses:  int;
	private readonly efficiencyOnProperMaterial:  float;
	private readonly damageVsEntity:  int;

	private constructor(i3: int, i4: int, f5: float, i6: int, $name$: java.lang.String, $index$: number) {
		super($name$, $index$);
		this.harvestLevel = i3;
		this.maxUses = i4;
		this.efficiencyOnProperMaterial = f5;
		this.damageVsEntity = i6;
	}

	public getMaxUses():  int {
		return this.maxUses;
	}

	public getEfficiencyOnProperMaterial():  float {
		return this.efficiencyOnProperMaterial;
	}

	public getDamageVsEntity():  int {
		return this.damageVsEntity;
	}

	public getHarvestLevel():  int {
		return this.harvestLevel;
	}
}
