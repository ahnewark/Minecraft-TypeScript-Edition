import { IllegalArgumentException } from "../lang/IllegalArgumentException";
import { IndexOutOfBoundsException } from "../lang/IndexOutOfBoundsException";
import { NullPointerException } from "../lang/NullPointerException";

import { InputStream } from "./InputStream";

export default class ByteArrayInputStream extends InputStream {

    protected buf: Uint8Array;

    protected pos: number;

    protected _mark = 0;

    protected count: number;

    public constructor(buf: Uint8Array);
    public constructor(buf: Uint8Array, offset: number, length: number);
    public constructor(...args) {
        super();
        const buf = args[0] as Uint8Array;

        switch (args.length) {
            case 1: {

                this.buf = buf;
                this.pos = 0;
                this.count = buf.length;
                break;
            }
            case 3: {
                const offset = args[1] as number;
                const length = args[2] as number;

                this.buf = buf;
                this.pos = offset;
                this.count = Math.min(offset + length, buf.length);
                this._mark = offset;
            }
            default: {
                throw new IllegalArgumentException();
            }
        }
    }

    public async read(): Promise<number>;
    public async read(b: Int8Array, off: number, len: number): Promise<number>;
    public async read(...args) {
        switch(args.length) {
            case 0: {
                return (this.pos < this.count) ? (this.buf[this.pos++] & 0xff) : -1;
            }
            case 3: {
                const b = args[0] as Int8Array;
                const off = args[1] as number;
                let len = args[2] as number;

                if (b == null) {
                    throw new NullPointerException();
                } else if (off < 0 || len < 0 || len > b.length - off) {
                    throw new IndexOutOfBoundsException();
                }
        
                if (this.pos >= this.count) {
                    return -1;
                }
        
                let avail = this.count - this.pos;
                if (len > avail) {
                    this,len = avail;
                }
                if (len <= 0) {
                    return 0;
                }
                for (let i = 0; i < len; i++) {
                    b[this.pos + i] = this.buf[off + i]
                }
                this.pos += len;
                return len;
            }
        }
    }



    public async skip(n: bigint): Promise<bigint> {
        let k = (this.count - this.pos);
        if (Number(n) < k) {
            k = n < 0 ? 0 : Number(n);
        }

        this.pos += (k);
        return BigInt(k);
    }

    public available(): number {
        return this.count - this.pos;
    }

    public markSupported(): boolean {
        return true;
    }

    public mark(readAheadLimit: number): void {
        this._mark = this.pos;
    }

    public reset(): void {
        this.pos = this._mark;
    }

    public async close(): Promise<void> {
    }

}