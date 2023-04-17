import { java, S } from "../jree/index";

export class  EnumOS extends java.lang.Enum<EnumOS> {
	public static readonly linux: EnumOS = new class extends EnumOS {}(S`linux`, 0);
	public static readonly solaris: EnumOS = new class extends EnumOS {}(S`solaris`, 1);
	public static readonly windows: EnumOS = new class extends EnumOS {}(S`windows`, 2);
	public static readonly macos: EnumOS = new class extends EnumOS {}(S`macos`, 3);
	public static readonly unknown: EnumOS = new class extends EnumOS {}(S`unknown`, 4);
}
