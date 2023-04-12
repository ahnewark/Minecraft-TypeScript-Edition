import { java } from "../jree/index";

export class  EnumMobType extends java.lang.Enum<EnumMobType> {
	public static readonly everything: EnumMobType = new class extends EnumMobType {}(`everything`, 0);
	public static readonly mobs: EnumMobType = new class extends EnumMobType {}(`mobs`, 1);
	public static readonly players: EnumMobType = new class extends EnumMobType {}(`players`, 2);
}
