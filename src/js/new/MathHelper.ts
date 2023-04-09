
import { java } from "../jree/index";

export  class MathHelper {
	private static SIN_TABLE:  Float64Array = new Float64Array(65536);

	public static sin(f0: number):  number {
		return MathHelper.SIN_TABLE[(f0 * 10430.378) & 65535];
	}

	public static cos(f0: number):  number {
		return MathHelper.SIN_TABLE[(f0 * 10430.378 + 16384.0) & 65535];
	}

	public static sqrt_float(f0: number): number {
		return java.lang.Math.sqrt(f0 as number)
	}

	public static sqrt_double(d0: number):  number {
		return java.lang.Math.sqrt(d0);
	}

	public static floor_float(f0: number):  number {
		let  i1: number = f0;
		return f0 < i1 ? i1 - 1 : i1;
	}

	public static floor_double(d0: number):  number {
		let  i2: number = d0;
		return d0 < i2 ? i2 - 1 : i2;
	}

	public static abs(f0: number):  number {
		return f0 >= 0.0 ? f0 : -f0;
	}

	public static abs_max(d0: number, d2: number):  number {
		if(d0 < 0.0) {
			d0 = -d0;
		}

		if(d2 < 0.0) {
			d2 = -d2;
		}

		return d0 > d2 ? d0 : d2;
	}

	public static bucketInt(i0: number, i1: number):  number {
		return i0 < 0 ? -((-i0 - 1) / i1) - 1 : i0 / i1;
	}

	static {
		for (let  i0: number = 0; i0 < 65536; ++i0) {
			MathHelper.SIN_TABLE[i0] = java.lang.Math.sin(i0 * java.lang.Math.PI * 2.0 / 65536.0);
		}
	}
}
