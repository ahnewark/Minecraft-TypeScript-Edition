import { int, java, long } from "../../jree/index";

export class FilterInputStream extends java.io.InputStream {
    protected in: java.io.InputStream;

    protected constructor(_in: java.io.InputStream) {
        super();
        this.in = _in;
    }

    public read(): int;

    public read(b: Int8Array): int;

    public read(b: Int8Array, off: int, len: int): int;

    public read(...args) {
        switch (args.length) {
            case 0: {
                return this.in.read();
            }
            case 1: {
                const [b] = args as [Int8Array];
                return this.read(b, 0, b.length);
            }
            case 3: {
                const [b, off, len] = args as [Int8Array, number, number];
                return this.in.read(b, off, len);
            }
        }
    }

    public skip(n: long): long{
        return this.in.skip(n);
    }

    public available(): int {
        return this.in.available();
    }

    public close() {
        this.in.close();
    }

    public mark(readlimit: int): void {
        this.in.mark(readlimit);
    }

    public reset(): void {
        this.in.reset();
    }

    public markSupported(): boolean {
        return this.in.markSupported();
    }
}