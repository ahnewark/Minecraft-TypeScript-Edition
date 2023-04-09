import { double, long } from "../../jree/index";
import { IllegalArgumentException } from "../../jree/java/lang/IllegalArgumentException";

export class Random {
    
    private static multiplier: long = 0x5deece66dn;

    private haveNextNextGaussian: boolean;
 
    private seed: long;

    private nextNextGaussian: double;

    public constructor();

    public constructor(seed: number);

    public constructor(seed: long);

    public constructor(...args: unknown[]) {
        switch (args.length) {
            case 0: {
                this.internalSetSeed(BigInt(new Date().getTime()));
                break;
            }
            case 1: {
                if (typeof args[0] === 'number') {
                    this.internalSetSeed(BigInt(args[0]));
                }
                else {
                    this.internalSetSeed(args[0] as bigint);
                }
                break;
            }
            default: {
                throw new Error('Illegal Argument');
            }
        }
    }

    protected next(bits: number): number {
        this.seed = (this.seed * Random.multiplier + BigInt(0xb)) & ((BigInt(1) << BigInt(48)) - BigInt(1));
        return Number(this.seed) >>> 48 - bits;
    }

    public nextBoolean(): boolean {
        return this.next(1) != 0;
    }

    public nextBytes(buf: number[]): void {
        let rand = 0, count = 0, loop = 0;
        while (count < buf.length) {
            if (loop == 0) {
                rand = this.nextInt();
                loop = 3;
            } else {
                loop--;
            }
            buf[count++] = rand;
            rand >>= 8;
        }
    }

    public nextDouble(): double {
        return ((this.next(26) << 27) + this.next(27)) / 1 << 53;
    }

    public nextFloat(): number {
        return (this.next(24) / 16777216);
    }

    public nextGaussian(): number {
        if (this.haveNextNextGaussian) { // if X1 has been returned, return the
                                    // second Gaussian
            this.haveNextNextGaussian = false;
            return this.nextNextGaussian;
        }
        
        let v1, v2, s : number;

        do {
            v1 = 2 * this.nextDouble() - 1; // Generates two independent random
                                        // variables U1, U2
            v2 = 2 * this.nextDouble() - 1;
            s = v1 * v1 + v2 * v2;
        } while (s >= 1);

        let norm = Math.sqrt(-2 * Math.log(s) / s);
        this.nextNextGaussian = v2 * norm; // should that not be norm instead
                                        // of multiplier ?
        this.haveNextNextGaussian = true;
        return v1 * norm; // should that not be norm instead of multiplier
                            // ?
    }

    public nextInt(): number;

    public nextInt(n: number): number;

    public nextInt(...args): number {
        switch (args.length) 
        {
            case 0: {
                return this.next(32);
            }
            case 1: {
                const n = args[0];
                if (n > 0) {
                    if ((n & -n) == n) {
                        return ((n *  this.next(31)) >> 31);
                    }
                    let bits, val: number;
                    do {
                        bits = this.next(31);
                        val = bits % n;
                    } while (bits - val + (n - 1) < 0);
                    return val;
                }
            }
            default:
                throw new IllegalArgumentException();
        }
    }

    public nextLong(): long {
        return BigInt((this.next(32) << 32) + this.next(32));
    }

    public setSeed(seed: long): void {
        this.internalSetSeed(seed);
    }

    private internalSetSeed(seed: long): void {
        this.seed = (seed ^ Random.multiplier) & BigInt(((1 << 48) - 1));
        this.haveNextNextGaussian = false;
    }
}