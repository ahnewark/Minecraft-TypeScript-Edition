
import { Material } from "./Material";

export class MaterialLiquid extends Material {
	public getIsLiquid():  boolean {
		return true;
	}

	public getIsSolid():  boolean {
		return false;
	}

	public isSolid():  boolean {
		return false;
	}
}
