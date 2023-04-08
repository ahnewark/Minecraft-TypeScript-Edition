
import { java, S } from "jree";

export class EnumSkyBlock extends java.lang.Enum<EnumSkyBlock> {
    public static readonly Sky: EnumSkyBlock = new class extends EnumSkyBlock {}(15,S`Sky`, 0);
    public static readonly Block: EnumSkyBlock = new class extends EnumSkyBlock {}(0,S`Block`, 1);

    public readonly field_1722_c:  number;

    private constructor(i3: number, $name$: java.lang.String, $index$: number) {
        super($name$, $index$);
        this.field_1722_c = i3;
    }
}
