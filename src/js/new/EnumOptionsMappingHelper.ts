import { EnumOptions } from "./EnumOptions";

export class EnumOptionsMappingHelper {
	public static readonly enumOptionsMappingHelperArray:  number[] = new   Array<number>(EnumOptions.values().length);

	static {
		// try {
			EnumOptionsMappingHelper.enumOptionsMappingHelperArray[EnumOptions.INVERT_MOUSE.ordinal()] = 1;
// 		} catch (noSuchFieldError4) {
// if (noSuchFieldError4 instanceof java.lang.NoSuchFieldError) {
// 		} else {
// 	throw noSuchFieldError4;
// 	}
// }

		// try {
			EnumOptionsMappingHelper.enumOptionsMappingHelperArray[EnumOptions.VIEW_BOBBING.ordinal()] = 2;
// 		} catch (noSuchFieldError3) {
// if (noSuchFieldError3 instanceof java.lang.NoSuchFieldError) {
// 		} else {
// 	throw noSuchFieldError3;
// 	}
// }

		// try {
			EnumOptionsMappingHelper.enumOptionsMappingHelperArray[EnumOptions.ANAGLYPH.ordinal()] = 3;
// 		} catch (noSuchFieldError2) {
// if (noSuchFieldError2 instanceof java.lang.NoSuchFieldError) {
// 		} else {
// 	throw noSuchFieldError2;
// 	}
// }

		// try {
			EnumOptionsMappingHelper.enumOptionsMappingHelperArray[EnumOptions.LIMIT_FRAMERATE.ordinal()] = 4;
// 		} catch (noSuchFieldError1) {
// if (noSuchFieldError1 instanceof java.lang.NoSuchFieldError) {
// 		} else {
// 	throw noSuchFieldError1;
// 	}
// }

	}
}
