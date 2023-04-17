import { EnumOS } from "./EnumOS";

export class EnumOSMappingHelper {
	public static readonly enumOSMappingArray:  number[] = new Array<number>(EnumOS.values().length);

	static {
		// try {
			EnumOSMappingHelper.enumOSMappingArray[EnumOS.linux.ordinal()] = 1;
		// } catch (noSuchFieldError4) {
		// 	if (noSuchFieldError4 instanceof java.lang.NoSuchFieldError) {
		// 	} else {
		// 		throw noSuchFieldError4;
		// 	}
		// }

		// try {
			EnumOSMappingHelper.enumOSMappingArray[EnumOS.solaris.ordinal()] = 2;
		// } catch (noSuchFieldError3) {
		// 	if (noSuchFieldError3 instanceof java.lang.NoSuchFieldError) {
		// 	} else {
		// 		throw noSuchFieldError3;
		// 	}
		// }

		// try {
			EnumOSMappingHelper.enumOSMappingArray[EnumOS.windows.ordinal()] = 3;
		// } catch (noSuchFieldError2) {
		// if (noSuchFieldError2 instanceof java.lang.NoSuchFieldError) {
		// } else {
		// 	throw noSuchFieldError2;
		// 	}
		// }

		// try {
			EnumOSMappingHelper.enumOSMappingArray[EnumOS.macos.ordinal()] = 4;
		// } catch (noSuchFieldError1) {
		// if (noSuchFieldError1 instanceof java.lang.NoSuchFieldError) {
		// } else {
		// 	throw noSuchFieldError1;
		// 	}
		// }

	}
}
