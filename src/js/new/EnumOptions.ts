
import { java, S, int } from "../jree/index";


 export class  EnumOptions extends java.lang.Enum<EnumOptions> {
	public static readonly MUSIC: EnumOptions = new class extends EnumOptions {}("options.music", true, false,S`MUSIC`, 0);
	public static readonly SOUND: EnumOptions = new class extends EnumOptions {}("options.sound", true, false,S`SOUND`, 1);
	public static readonly INVERT_MOUSE: EnumOptions = new class extends EnumOptions {}("options.invertMouse", false, true,S`INVERT_MOUSE`, 2);
	public static readonly SENSITIVITY: EnumOptions = new class extends EnumOptions {}("options.sensitivity", true, false,S`SENSITIVITY`, 3);
	public static readonly RENDER_DISTANCE: EnumOptions = new class extends EnumOptions {}("options.renderDistance", false, false,S`RENDER_DISTANCE`, 4);
	public static readonly VIEW_BOBBING: EnumOptions = new class extends EnumOptions {}("options.viewBobbing", false, true,S`VIEW_BOBBING`, 5);
	public static readonly ANAGLYPH: EnumOptions = new class extends EnumOptions {}("options.anaglyph", false, true,S`ANAGLYPH`, 6);
	public static readonly LIMIT_FRAMERATE: EnumOptions = new class extends EnumOptions {}("options.limitFramerate", false, true,S`LIMIT_FRAMERATE`, 7);
	public static readonly DIFFICULTY: EnumOptions = new class extends EnumOptions {}("options.difficulty", false, false,S`DIFFICULTY`, 8);
	public static readonly GRAPHICS: EnumOptions = new class extends EnumOptions {}("options.graphics", false, false,S`GRAPHICS`, 9);

	private readonly enumFloat:  boolean;
	private readonly enumBoolean:  boolean;
	private readonly enumString:  string;

	public static func_20137_a(i0: int):  EnumOptions | null {
		let  enumOptions1: EnumOptions[] = this.values();
		let  i2: int = enumOptions1.length;

		for(let  i3: int = 0; i3 < i2; ++i3) {
			let  enumOptions4: EnumOptions = enumOptions1[i3];
			if(enumOptions4.returnEnumOrdinal() === i0) {
				return enumOptions4;
			}
		}

		return null;
	}

	private constructor(string3: string, z4: boolean, z5: boolean, $name$: java.lang.String, $index$: number) {
		super($name$, $index$);
		this.enumString = string3;
		this.enumFloat = z4;
		this.enumBoolean = z5;
	}

	public getEnumFloat():  boolean {
		return this.enumFloat;
	}

	public getEnumBoolean():  boolean {
		return this.enumBoolean;
	}

	public returnEnumOrdinal():  int {
		return this.ordinal();
	}

	public getEnumString():  string {
		return this.enumString;
	}
}
