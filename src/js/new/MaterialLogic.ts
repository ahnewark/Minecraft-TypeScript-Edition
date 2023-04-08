
import { Material } from "./Material";

export  class MaterialLogic extends Material {
	public isSolid():  boolean {
		return false;
	}

	public getCanBlockGrass():  boolean {
		return false;
	}

	public getIsSolid():  boolean {
		return false;
	}
}
