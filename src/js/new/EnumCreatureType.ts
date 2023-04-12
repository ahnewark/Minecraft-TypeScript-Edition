
import { java, S, int } from "../jree/index";
import { Material } from "./Material";
import { MaterialRegistry } from "./static/MaterialRegistry";

export class EnumCreatureType extends java.lang.Enum<EnumCreatureType> {
	public static readonly monster: EnumCreatureType = new class extends EnumCreatureType {}(70, MaterialRegistry.air, false,S`monster`, 0);
	public static readonly creature: EnumCreatureType = new class extends EnumCreatureType {}(15, MaterialRegistry.air, true,S`creature`, 1);
	public static readonly waterCreature: EnumCreatureType = new class extends EnumCreatureType {}(5, MaterialRegistry.water, true,S`waterCreature`, 2);

	private readonly maxNumberOfCreature:  int;
	private readonly creatureMaterial:  Material | undefined;
	private readonly field_21172_g:  boolean;

	private constructor(i4: int, material5: Material| undefined, z6: boolean, $name$: java.lang.String, $index$: number) {
		super($name$, $index$);
		this.maxNumberOfCreature = i4;
		this.creatureMaterial = material5;
		this.field_21172_g = z6;
	}

	public getCreatureClass(): string {
		return `${this.name()}`;
	}

	public getMaxNumberOfCreature():  int {
		return this.maxNumberOfCreature;
	}

	public getCreatureMaterial():  Material | undefined {
		return this.creatureMaterial;
	}

	public func_21168_d():  boolean {
		return this.field_21172_g;
	}
}
