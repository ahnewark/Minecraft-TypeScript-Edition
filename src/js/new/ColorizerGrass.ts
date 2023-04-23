


import { JavaObject, int, double, java } from "../jree/index";
import { ColorizerFoliage } from "./ColorizerFoliage";

export  class ColorizerGrass {
	private static readonly field_6540_a:  number[] = new   Array<number>(65536).fill(0);

	public static func_4147_a(d0: double, d2: double):  int {
		d2 *= d0;
		let  i4: int = Math.floor((1.0 - d0) * 255.0);
		let  i5: int = Math.floor((1.0 - d2) * 255.0);
		return ColorizerGrass.field_6540_a[i5 << 8 | i4];
	}

	static {
		console.error('The Grass colorizer is not yet implemented.')
		// try {
		// 	let  bufferedImage0: BufferedImage = ImageIO.read(ColorizerFoliage.class.getResource("/misc/grasscolor.png"));
		// 	bufferedImage0.getRGB(0, 0, 256, 256, ColorizerGrass.field_6540_a, 0, 256);
		// } catch (exception1) {
		// if (exception1 instanceof java.lang.Exception) {
		// 	exception1.printStackTrace();
		// 		} else {
		// 	throw exception1;
		// 	}
		// }
	}
}
