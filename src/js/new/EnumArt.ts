
import { java, S, int } from "../jree/index";


export class  EnumArt extends java.lang.Enum<EnumArt> {
	public static readonly Kebab: EnumArt = new class extends EnumArt {}("Kebab", 16, 16, 0, 0,S`Kebab`, 0);
	public static readonly Aztec: EnumArt = new class extends EnumArt {}("Aztec", 16, 16, 16, 0,S`Aztec`, 1);
	public static readonly Alban: EnumArt = new class extends EnumArt {}("Alban", 16, 16, 32, 0,S`Alban`, 2);
	public static readonly Aztec2: EnumArt = new class extends EnumArt {}("Aztec2", 16, 16, 48, 0,S`Aztec2`, 3);
	public static readonly Bomb: EnumArt = new class extends EnumArt {}("Bomb", 16, 16, 64, 0,S`Bomb`, 4);
	public static readonly Plant: EnumArt = new class extends EnumArt {}("Plant", 16, 16, 80, 0,S`Plant`, 5);
	public static readonly Wasteland: EnumArt = new class extends EnumArt {}("Wasteland", 16, 16, 96, 0,S`Wasteland`, 6);
	public static readonly Pool: EnumArt = new class extends EnumArt {}("Pool", 32, 16, 0, 32,S`Pool`, 7);
	public static readonly Courbet: EnumArt = new class extends EnumArt {}("Courbet", 32, 16, 32, 32,S`Courbet`, 8);
	public static readonly Sea: EnumArt = new class extends EnumArt {}("Sea", 32, 16, 64, 32,S`Sea`, 9);
	public static readonly Sunset: EnumArt = new class extends EnumArt {}("Sunset", 32, 16, 96, 32,S`Sunset`, 10);
	public static readonly Creebet: EnumArt = new class extends EnumArt {}("Creebet", 32, 16, 128, 32,S`Creebet`, 11);
	public static readonly Wanderer: EnumArt = new class extends EnumArt {}("Wanderer", 16, 32, 0, 64,S`Wanderer`, 12);
	public static readonly Graham: EnumArt = new class extends EnumArt {}("Graham", 16, 32, 16, 64,S`Graham`, 13);
	public static readonly Match: EnumArt = new class extends EnumArt {}("Match", 32, 32, 0, 128,S`Match`, 14);
	public static readonly Bust: EnumArt = new class extends EnumArt {}("Bust", 32, 32, 32, 128,S`Bust`, 15);
	public static readonly Stage: EnumArt = new class extends EnumArt {}("Stage", 32, 32, 64, 128,S`Stage`, 16);
	public static readonly Void: EnumArt = new class extends EnumArt {}("Void", 32, 32, 96, 128,S`Void`, 17);
	public static readonly SkullAndRoses: EnumArt = new class extends EnumArt {}("SkullAndRoses", 32, 32, 128, 128,S`SkullAndRoses`, 18);
	public static readonly Fighters: EnumArt = new class extends EnumArt {}("Fighters", 64, 32, 0, 96,S`Fighters`, 19);
	public static readonly Pointer: EnumArt = new class extends EnumArt {}("Pointer", 64, 64, 0, 192,S`Pointer`, 20);
	public static readonly Pigscene: EnumArt = new class extends EnumArt {}("Pigscene", 64, 64, 64, 192,S`Pigscene`, 21);
	public static readonly BurningSkull: EnumArt = new class extends EnumArt {}("BurningSkull", 64, 64, 128, 192,S`BurningSkull`, 22);
	public static readonly Skeleton: EnumArt = new class extends EnumArt {}("Skeleton", 64, 48, 192, 64,S`Skeleton`, 23);
	public static readonly DonkeyKong: EnumArt = new class extends EnumArt {}("DonkeyKong", 64, 48, 192, 112,S`DonkeyKong`, 24);

	public readonly title:  string;
	public readonly sizeX:  int;
	public readonly sizeY:  int;
	public readonly offsetX:  int;
	public readonly offsetY:  int;

	private constructor(string3: string, i4: int, i5: int, i6: int, i7: int, $name$: java.lang.String, $index$: number) {
		super($name$, $index$);
		this.title = string3;
		this.sizeX = i4;
		this.sizeY = i5;
		this.offsetX = i6;
		this.offsetY = i7;
	}
}
