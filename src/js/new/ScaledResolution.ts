export class ScaledResolution {
	private scaledWidth:  number;
	private scaledHeight:  number;
	public scaleFactor:  number;

	public constructor(i1: number, i2: number) {
		this.scaledWidth = i1;
		this.scaledHeight = i2;

		for(this.scaleFactor = 1; this.scaledWidth / (this.scaleFactor + 1) >= 320 && this.scaledHeight / (this.scaleFactor + 1) >= 240; ++this.scaleFactor) {
		}

		this.scaledWidth /= this.scaleFactor;
		this.scaledHeight /= this.scaleFactor;
	}

	public getScaledWidth():  number {
		return this.scaledWidth;
	}

	public getScaledHeight():  number {
		return this.scaledHeight;
	}
}
