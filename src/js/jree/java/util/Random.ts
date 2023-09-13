import Long from "long";
import int64 from "../../../application/int64";
import { Serializable } from "../io";
import { IllegalArgumentException, Integer, System } from "../lang";
import { IntStream } from "./stream";

export class Random {
    /** use serialVersionUID from JDK 1.1 for interoperability */
    static serialVersionUID = 3905348978240129619n;

    /**
     * The internal state associated with this pseudorandom number generator.
     * (The specs for the methods in this class describe the ongoing
     * computation of this value.)
     */
    private seed: bigint;

    private static multiplier = 0x5DEECE66Dn;
    private static addend = 0xBn;
    private static mask = (1n << 48n) - 1n;

    private static DOUBLE_UNIT = 1.1102230246251565E-16;; // 1.0 / (1L << 53)

    // IllegalArgumentException messages
    static BadBound = "bound must be positive";
    static BadRange = "bound must be greater than origin";
    static BadSize  = "size must be non-negative";

    private static seedUniquifier(): bigint {
        // L'Ecuyer, "Tables of Linear Congruential Generators of
        // Different Sizes and Good Lattice Structure", 1999
        for (;;) {
            let current = this._seedUniquifier;
            let next = current * 181783497276652981n;
            if (Random._seedUniquifier = next)
                return next;
        }
    }

    private static _seedUniquifier
        = 8682522807148012n;

    public constructor();
    public constructor(seed: bigint);

    public constructor(...args) {
        let seed: bigint;

        switch (args.length) {
            case 1: {
                seed = BigInt(args[0]);
                break;
            }
            case 0: {
                seed = Random._seedUniquifier ^ BigInt(Math.floor(System.nanoTime()));
                break;
            }
            default: {
                throw new Error('foo')
            }
        }

        // if (this instanceof Random)
            this.seed = Random.initialScramble(seed);
        // else {
        //     // subclass might have overriden setSeed
        //     seed = 0n;
        //     this.setSeed(seed);
        // }
    }

    private static initialScramble(seed: bigint) {
        return (seed ^ this.multiplier) & this.mask;
    }

    public setSeed(seed: bigint) {
        this.seed = Random.initialScramble(seed);
        this.haveNextNextGaussian = false;
    }

    protected next(bits: number): number {
        let oldSeed = 0n;
        let nextSeed = 0n;
        do {
            oldSeed = this.seed;
            nextSeed = ((oldSeed * Random.multiplier) + Random.addend) & Random.mask;
        } while (!this._compareAndSet(oldSeed, nextSeed));

        const low = Number(nextSeed & 0xffffffffn);
        const high = Number((nextSeed >> 32n) & 0xffffffffn);
        let num = new Long(low, high, false).shiftRight(48 - bits);

        return num.greaterThan(Long.fromInt(0x7fffffff)) ? num.or(Long.fromInt(0x80000000)).toNumber() : num.toNumber(); // Cast to integer
    }

    private _compareAndSet(expect: bigint, update: bigint) {
        if (this.seed !== expect) {
            return false;
        }

        this.seed = update;
        return true;
    }

    public nextBytes(bytes: number[]) {
        for (let i = 0, len = bytes.length; i < len; )
            for (let rnd = this.nextInt(),
                     n = Math.min(len - i, 32/8);
                 n-- > 0; rnd >>= 8)
                bytes[i++] = (rnd) & 0xff;
    }

    private internalNextLong(origin: bigint, bound: bigint) {
        let r = this.nextLong();
        if (origin < bound) {
            let n = bound - origin, m = n - 1n;
            if ((n & m) == 0n)  // power of two
                r = (r & m) + origin;
            else if (n > 0n) {  // reject over-represented candidates
                for (let u = new int64(r).unsignedRightShift(1).asBigInt;           // ensure nonnegative
                     u + m - (r = u % n) < 0n;    // rejection check
                     u = new int64(this.nextLong()).unsignedRightShift(1).asBigInt) // retry
                    ;
                r += origin;
            }
            else {              // range not representable as long
                while (r < origin || r >= bound)
                    r = this.nextLong();
            }
        }
        return r;
    }

    private internalNextInt(origin: number, bound: number) {
        if (origin < bound) {
            let n = bound - origin;
            if (n > 0) {
                return this.nextInt(n) + origin;
            }
            else {  // range not representable as int
                let r: number;
                do {
                    r = this.nextInt();
                } while (r < origin || r >= bound);
                return r;
            }
        }
        else {
            return this.nextInt();
        }
    }

    private internalNextDouble(origin: number, bound: number) {
        let r = this.nextDouble();
        // if (origin < bound) {
        //     r = r * (bound - origin) + origin;
        //     if (r >= bound) // correct for rounding
        //         r = Double.longBitsToDouble(Double.doubleToLongBits(bound) - 1);
        // }
        return r;
    }

    public nextInt();
    public nextInt(bound: number);

    public nextInt(...args) {
        switch (args.length) {
            case 0: {
                return this.next(32);
            }
            case 1: {
                const bound = args[0];
                if (bound <= 0)
                    throw new IllegalArgumentException(Random.BadBound);
        
                let r = this.next(31);
                let m = bound - 1;

                if ((bound & m) == 0)  // i.e., bound is a power of 2
                {
                    // r = (bound * r) >> 31;
                    r = Number((BigInt(bound) * BigInt(r)) >> 31n);
                    //r = Long.fromInt(bound).multiply(r).shiftRightUnsigned(31).toNumber();
                }
                else {
                    for (let u = r;
                        u - (r = u % bound) + m < 0;
                        u = this.next(31))
                        ;
                }
                return r;
            }
            default: {
                throw new Error('invalid arguments')
            }
        }
    }

    public nextLong() {
        // it's okay that the bottom word remains signed.
        return (BigInt(this.next(32)) << 32n) + BigInt(this.next(32));
    }

    public nextBoolean() {
        return this.next(1) != 0;
    }

    public nextFloat() {
        return this.next(24) / (1 << 24);
    }

    public nextDouble() {
        // const _next = this.next(26);
        // console.log(_next);


        // return new Long(this.next(26)).shiftLeft(27).add(this.next(27)).toNumber() * Random.DOUBLE_UNIT;
        return new Long(this.next(26), undefined, false).shiftLeft(27).add(this.next(27)).toNumber() * Random.DOUBLE_UNIT;

        // return Number(((BigInt(this.next(26)) << 27n) + BigInt(this.next(27))) * BigInt(Random.DOUBLE_UNIT));
    }

    private nextNextGaussian: bigint;
    private haveNextNextGaussian = false;

    public nextGaussian() {
        // See Knuth, ACP, Section 3.4.1 Algorithm C.
        if (this.haveNextNextGaussian) {
            this.haveNextNextGaussian = false;
            return this.nextNextGaussian;
        } else {
            let v1: number, v2: number, s: number;
            do {
                v1 = 2 * this.nextDouble() - 1; // between -1 and 1
                v2 = 2 * this.nextDouble() - 1; // between -1 and 1
                s = v1 * v1 + v2 * v2;
            } while (s >= 1 || s == 0);
            let multiplier = Math.sqrt(-2 * Math.log(s)/s);
            this.nextNextGaussian = BigInt((v2 * multiplier) & 0xffffffffffffffff);
            this.haveNextNextGaussian = true;
            return v1 * multiplier;
        }
    }

    // public ints(streamSize: number): IntStream {
    //     if (streamSize < 0)
    //         throw new IllegalArgumentException(Random.BadSize);
    //     return StreamSupport.intStream
    //             (new RandomIntsSpliterator
    //                      (this, 0n, streamSize, Integer.MAX_VALUE, 0),
    //              false);
    // }

    // public IntStream ints() {
    //     return StreamSupport.intStream
    //             (new RandomIntsSpliterator
    //                      (this, 0L, Long.MAX_VALUE, Integer.MAX_VALUE, 0),
    //              false);
    // }

    // public IntStream ints(long streamSize, int randomNumberOrigin,
    //                       int randomNumberBound) {
    //     if (streamSize < 0L)
    //         throw new IllegalArgumentException(BadSize);
    //     if (randomNumberOrigin >= randomNumberBound)
    //         throw new IllegalArgumentException(BadRange);
    //     return StreamSupport.intStream
    //             (new RandomIntsSpliterator
    //                      (this, 0L, streamSize, randomNumberOrigin, randomNumberBound),
    //              false);
    // }

    // public IntStream ints(int randomNumberOrigin, int randomNumberBound) {
    //     if (randomNumberOrigin >= randomNumberBound)
    //         throw new IllegalArgumentException(BadRange);
    //     return StreamSupport.intStream
    //             (new RandomIntsSpliterator
    //                      (this, 0L, Long.MAX_VALUE, randomNumberOrigin, randomNumberBound),
    //              false);
    // }

    // public LongStream longs(long streamSize) {
    //     if (streamSize < 0L)
    //         throw new IllegalArgumentException(BadSize);
    //     return StreamSupport.longStream
    //             (new RandomLongsSpliterator
    //                      (this, 0L, streamSize, Long.MAX_VALUE, 0L),
    //              false);
    // }

    // public LongStream longs() {
    //     return StreamSupport.longStream
    //             (new RandomLongsSpliterator
    //                      (this, 0L, Long.MAX_VALUE, Long.MAX_VALUE, 0L),
    //              false);
    // }

    // public LongStream longs(long streamSize, long randomNumberOrigin,
    //                         long randomNumberBound) {
    //     if (streamSize < 0L)
    //         throw new IllegalArgumentException(BadSize);
    //     if (randomNumberOrigin >= randomNumberBound)
    //         throw new IllegalArgumentException(BadRange);
    //     return StreamSupport.longStream
    //             (new RandomLongsSpliterator
    //                      (this, 0L, streamSize, randomNumberOrigin, randomNumberBound),
    //              false);
    // }

    // public LongStream longs(long randomNumberOrigin, long randomNumberBound) {
    //     if (randomNumberOrigin >= randomNumberBound)
    //         throw new IllegalArgumentException(BadRange);
    //     return StreamSupport.longStream
    //             (new RandomLongsSpliterator
    //                      (this, 0L, Long.MAX_VALUE, randomNumberOrigin, randomNumberBound),
    //              false);
    // }

    // public DoubleStream doubles(long streamSize) {
    //     if (streamSize < 0L)
    //         throw new IllegalArgumentException(BadSize);
    //     return StreamSupport.doubleStream
    //             (new RandomDoublesSpliterator
    //                      (this, 0L, streamSize, Double.MAX_VALUE, 0.0),
    //              false);
    // }

    // public DoubleStream doubles() {
    //     return StreamSupport.doubleStream
    //             (new RandomDoublesSpliterator
    //                      (this, 0L, Long.MAX_VALUE, Double.MAX_VALUE, 0.0),
    //              false);
    // }

    // public DoubleStream doubles(long streamSize, double randomNumberOrigin,
    //                             double randomNumberBound) {
    //     if (streamSize < 0L)
    //         throw new IllegalArgumentException(BadSize);
    //     if (!(randomNumberOrigin < randomNumberBound))
    //         throw new IllegalArgumentException(BadRange);
    //     return StreamSupport.doubleStream
    //             (new RandomDoublesSpliterator
    //                      (this, 0L, streamSize, randomNumberOrigin, randomNumberBound),
    //              false);
    // }

    // public DoubleStream doubles(double randomNumberOrigin, double randomNumberBound) {
    //     if (!(randomNumberOrigin < randomNumberBound))
    //         throw new IllegalArgumentException(BadRange);
    //     return StreamSupport.doubleStream
    //             (new RandomDoublesSpliterator
    //                      (this, 0L, Long.MAX_VALUE, randomNumberOrigin, randomNumberBound),
    //              false);
    // }

    // class RandomIntsSpliterator implements Spliterator.OfInt {
    //     final Random rng;
    //     long index;
    //     final long fence;
    //     final int origin;
    //     final int bound;
    //     RandomIntsSpliterator(Random rng, long index, long fence,
    //                           int origin, int bound) {
    //         this.rng = rng; this.index = index; this.fence = fence;
    //         this.origin = origin; this.bound = bound;
    //     }

    //     public RandomIntsSpliterator trySplit() {
    //         long i = index, m = (i + fence) >>> 1;
    //         return (m <= i) ? null :
    //                new RandomIntsSpliterator(rng, i, index = m, origin, bound);
    //     }

    //     public long estimateSize() {
    //         return fence - index;
    //     }

    //     public int characteristics() {
    //         return (Spliterator.SIZED | Spliterator.SUBSIZED |
    //                 Spliterator.NONNULL | Spliterator.IMMUTABLE);
    //     }

    //     public boolean tryAdvance(IntConsumer consumer) {
    //         if (consumer == null) throw new NullPointerException();
    //         long i = index, f = fence;
    //         if (i < f) {
    //             consumer.accept(rng.internalNextInt(origin, bound));
    //             index = i + 1;
    //             return true;
    //         }
    //         return false;
    //     }

    //     public void forEachRemaining(IntConsumer consumer) {
    //         if (consumer == null) throw new NullPointerException();
    //         long i = index, f = fence;
    //         if (i < f) {
    //             index = f;
    //             Random r = rng;
    //             int o = origin, b = bound;
    //             do {
    //                 consumer.accept(r.internalNextInt(o, b));
    //             } while (++i < f);
    //         }
    //     }
    // }

    // /**
    //  * Spliterator for long streams.
    //  */
    // static final class RandomLongsSpliterator implements Spliterator.OfLong {
    //     final Random rng;
    //     long index;
    //     final long fence;
    //     final long origin;
    //     final long bound;
    //     RandomLongsSpliterator(Random rng, long index, long fence,
    //                            long origin, long bound) {
    //         this.rng = rng; this.index = index; this.fence = fence;
    //         this.origin = origin; this.bound = bound;
    //     }

    //     public RandomLongsSpliterator trySplit() {
    //         long i = index, m = (i + fence) >>> 1;
    //         return (m <= i) ? null :
    //                new RandomLongsSpliterator(rng, i, index = m, origin, bound);
    //     }

    //     public long estimateSize() {
    //         return fence - index;
    //     }

    //     public int characteristics() {
    //         return (Spliterator.SIZED | Spliterator.SUBSIZED |
    //                 Spliterator.NONNULL | Spliterator.IMMUTABLE);
    //     }

    //     public boolean tryAdvance(LongConsumer consumer) {
    //         if (consumer == null) throw new NullPointerException();
    //         long i = index, f = fence;
    //         if (i < f) {
    //             consumer.accept(rng.internalNextLong(origin, bound));
    //             index = i + 1;
    //             return true;
    //         }
    //         return false;
    //     }

    //     public void forEachRemaining(LongConsumer consumer) {
    //         if (consumer == null) throw new NullPointerException();
    //         long i = index, f = fence;
    //         if (i < f) {
    //             index = f;
    //             Random r = rng;
    //             long o = origin, b = bound;
    //             do {
    //                 consumer.accept(r.internalNextLong(o, b));
    //             } while (++i < f);
    //         }
    //     }

    // }

    // /**
    //  * Spliterator for double streams.
    //  */
    // static final class RandomDoublesSpliterator implements Spliterator.OfDouble {
    //     final Random rng;
    //     long index;
    //     final long fence;
    //     final double origin;
    //     final double bound;
    //     RandomDoublesSpliterator(Random rng, long index, long fence,
    //                              double origin, double bound) {
    //         this.rng = rng; this.index = index; this.fence = fence;
    //         this.origin = origin; this.bound = bound;
    //     }

    //     public RandomDoublesSpliterator trySplit() {
    //         long i = index, m = (i + fence) >>> 1;
    //         return (m <= i) ? null :
    //                new RandomDoublesSpliterator(rng, i, index = m, origin, bound);
    //     }

    //     public long estimateSize() {
    //         return fence - index;
    //     }

    //     public int characteristics() {
    //         return (Spliterator.SIZED | Spliterator.SUBSIZED |
    //                 Spliterator.NONNULL | Spliterator.IMMUTABLE);
    //     }

    //     public boolean tryAdvance(DoubleConsumer consumer) {
    //         if (consumer == null) throw new NullPointerException();
    //         long i = index, f = fence;
    //         if (i < f) {
    //             consumer.accept(rng.internalNextDouble(origin, bound));
    //             index = i + 1;
    //             return true;
    //         }
    //         return false;
    //     }

    //     public void forEachRemaining(DoubleConsumer consumer) {
    //         if (consumer == null) throw new NullPointerException();
    //         long i = index, f = fence;
    //         if (i < f) {
    //             index = f;
    //             Random r = rng;
    //             double o = origin, b = bound;
    //             do {
    //                 consumer.accept(r.internalNextDouble(o, b));
    //             } while (++i < f);
    //         }
    //     }
    // }

    // private static ObjectStreamField[] serialPersistentFields = {
    //     new ObjectStreamField("seed", Long.TYPE),
    //     new ObjectStreamField("nextNextGaussian", Double.TYPE),
    //     new ObjectStreamField("haveNextNextGaussian", Boolean.TYPE)
    // };

    // private void readObject(java.io.ObjectInputStream s)
    //     throws java.io.IOException, ClassNotFoundException {

    //     ObjectInputStream.GetField fields = s.readFields();

    //     // The seed is read in as {@code long} for
    //     // historical reasons, but it is converted to an AtomicLong.
    //     long seedVal = fields.get("seed", -1L);
    //     if (seedVal < 0)
    //       throw new java.io.StreamCorruptedException(
    //                           "Random: invalid seed");
    //     resetSeed(seedVal);
    //     nextNextGaussian = fields.get("nextNextGaussian", 0.0);
    //     haveNextNextGaussian = fields.get("haveNextNextGaussian", false);
    // }

    // private void writeObject(ObjectOutputStream s)
    //     throws IOException {

    //     // set the values of the Serializable fields
    //     ObjectOutputStream.PutField fields = s.putFields();

    //     // The seed is serialized as a long for historical reasons.
    //     fields.put("seed", seed.get());
    //     fields.put("nextNextGaussian", nextNextGaussian);
    //     fields.put("haveNextNextGaussian", haveNextNextGaussian);

    //     // save them
    //     s.writeFields();
    // }

    // // Support for resetting seed while deserializing
    // private static final Unsafe unsafe = Unsafe.getUnsafe();
    // private static final long seedOffset;
    // static {
    //     try {
    //         seedOffset = unsafe.objectFieldOffset
    //             (Random.class.getDeclaredField("seed"));
    //     } catch (Exception ex) { throw new Error(ex); }
    // }
    // private void resetSeed(long seedVal) {
    //     unsafe.putObjectVolatile(this, seedOffset, new AtomicLong(seedVal));
    // }
}