export class KeyBinding {
	public keyDescription:  string | null;
	public keyCode:  number;

	public constructor(string1: string| null, i2: number) {
		this.keyDescription = string1;
		this.keyCode = i2;
	}
}
