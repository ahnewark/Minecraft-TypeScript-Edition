


import { JavaObject, int, double, java } from "../jree/index";




export  class ColorizerFoliage {
	private static readonly field_6529_a: number[] = new   Array<number>(65536).fill(0);

	public static func_4146_a(d0: double, d2: double):  int {
		d2 *= d0;
		let  i4: int = Math.floor((1.0 - d0) * 255.0);
		let  i5: int = Math.floor((1.0 - d2) * 255.0);
		return ColorizerFoliage.field_6529_a[i5 << 8 | i4];
	}

	public static func_21175_a():  int {
		return 6396257;
	}

	public static func_21174_b():  int {
		return 8431445;
	}

	static {
		console.error('The Foliage colorizer is not yet implemented.')
		// try {
		// 	let  bufferedImage0: BufferedImage = ImageIO.read(ColorizerFoliage.class.getResource("/misc/foliagecolor.png"));
		// 	bufferedImage0.getRGB(0, 0, 256, 256, ColorizerFoliage.field_6529_a, 0, 256);
		// } catch (exception1) {
		// 	if (exception1 instanceof java.lang.Exception) {
		// 		exception1.printStackTrace();
		// 	} else {
		// 		throw exception1;
		// 	}
		// }

	}
}
