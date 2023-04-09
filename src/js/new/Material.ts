export class Material {

	private canBurn:  boolean;

	public getIsLiquid():  boolean {
		return false;
	}

	public isSolid():  boolean {
		return true;
	}

	public getCanBlockGrass():  boolean {
		return true;
	}

	public getIsSolid():  boolean {
		return true;
	}

	public setBurning():  Material {
		this.canBurn = true;
		return this;
	}

	public getBurning():  boolean {
		return this.canBurn;
	}
}
