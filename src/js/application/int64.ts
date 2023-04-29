import { Integer } from "../jree/java/lang";

export default class int64 {

    public constructor(
        private value: bigint
    ) {

    }

    public get asBigInt(): bigint {
        return this.value;
    }

    public get asNumber(): number {
        if (this.value > Number.MAX_SAFE_INTEGER) {
            console.warn('Lossy cast! int64 -> number!')
        }
        return Number(this.value);
    }

    public get asInt32Number(): number {
        if (this.value > Integer.MAX_VALUE) {
            console.warn('Lossy cast! int64 -> int32!')
            return Number(this.asNumber | 0x80000000)
        }
        return Number(this.value);
    }

    public unsignedRightShift(bits: number) {
        // Split the number in two int32s and shift those!
        let leftMask = 0xffffffff;
        let rightMask = 0xffffffff;

        if (bits >= 32) {
            leftMask = 0x00000000;
            rightMask >>>= (bits - 32)
        } else {
            leftMask >>>= bits;
        }
        
        const mask64 = (BigInt(leftMask) << 32n) + BigInt(rightMask);

        return new int64(this.value & mask64);
    }

}