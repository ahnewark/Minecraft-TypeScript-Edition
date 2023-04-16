import { int, long } from "../../jree/index";
import { InputStream, IOException } from "../../jree/java/io/index";
import { IllegalArgumentException, IndexOutOfBoundsException, Integer, NullPointerException } from "../../jree/java/lang/index";
import System from "../lang/System";
import { FilterInputStream } from "./FilterInputStream";

export class PushbackInputStream extends FilterInputStream {

    protected buf: Int8Array;

    protected pos: int;

    private ensureOpen(): void {
        if (this.in == null)
            throw new IOException("Stream closed");
    }


    public constructor (_in: InputStream);
    public constructor (_in: InputStream, size: int);
    public constructor (...args) {
        let _in = args[0] as InputStream;
        super(_in);
        let size: int;
        switch (args.length) {
            case 1: {
                size = 0;
                break;
            }
            case 2: {
                size = args[1];
                break;
            }
            default: {
                throw Error('You absolute fucking waste of skin, invalid fucking arguments, are you so dense!')
            }
        }

        if (size <= 0) {
            throw new IllegalArgumentException("size <= 0");
        }
        this.buf = new Int8Array(size);
        this.pos = size;
    }

    public async read(): Promise<int>;
    public async read(b: Int8Array, off: int, size: int): Promise<int>;
    public async read (...args): Promise<int> {
        switch (args.length) {
            case 0: {
                this.ensureOpen();
                if (this.pos < this.buf.length) {
                    return this.buf[this.pos++] & 0xff;
                }
                return super.read();
                break;
            }
            case 3: {
                let [b, off, len] = args as [Int8Array, int, int]
                this.ensureOpen();
                if (b == null) {
                    throw new NullPointerException();
                } else if (off < 0 || len < 0 || len > b.length - off) {
                    throw new IndexOutOfBoundsException();
                } else if (len == 0) {
                    return 0;
                }
        
                let avail = this.buf.length - this.pos;
                if (avail > 0) {
                    if (len < avail) {
                        avail = len;
                    }
                    System.arraycopy(this.buf, this.pos, b, off, avail);
                    this.pos += avail;
                    off += avail;
                    len -= avail;
                }
                if (len > 0) {
                    len = await super.read(b, off, len);
                    if (len == -1) {
                        return avail == 0 ? -1 : avail;
                    }
                    return avail + len;
                }
                return avail;
                break;
            }
            default: {
                throw new Error('WHAT THE FUCK');
            }
        }
    }

    public unread(b: number): void;
    public unread(b: Int8Array): void;
    public unread(b: Int8Array, off: int, len: int): void;
    public unread (...args): void {
        switch (args.length) {
            case 1: {
                if (typeof args[0] === 'number') {
                    this.ensureOpen();
                    if (this.pos == 0) {
                        throw new IOException("Push back buffer is full");
                    }
                    this.buf[--this.pos] = args[0] & 0xff;
                    break;
                } else {
                    let [b] = args as [Int8Array];
                    let off = 0;
                    let len = b.length;

                    this.ensureOpen();
                    if (len > this.pos) {
                        throw new IOException("Push back buffer is full");
                    }
                    this.pos -= len;
                    System.arraycopy(b, off, this.buf, this.pos, len);
                    break;
                }
            }
            case 3: {
                let [b, off, len] = args as [Int8Array, int, int];
                this.ensureOpen();
                if (len > this.pos) {
                    throw new IOException("Push back buffer is full");
                }
                this.pos -= len;
                System.arraycopy(b, off, this.buf, this.pos, len);
                break;
            }
        }
    }

    public available(): int {
        this.ensureOpen();
        let n = this.buf.length - this.pos;
        let avail = super.available();
        return n > (Integer.MAX_VALUE - avail)
                    ? Integer.MAX_VALUE
                    : n + avail;
    }

    public async skip(n: long): Promise<long> {
        this.ensureOpen();
        if (n <= 0) {
            return BigInt(0);
        }

        let pskip = BigInt(this.buf.length - this.pos);
        if (pskip > 0) {
            if (n < pskip) {
                pskip = n;
            }
            this.pos += Number(pskip);
            n -= pskip;
        }
        if (n > 0) {
            pskip += await super.skip(n);
        }
        return pskip;
    }

    public markSupported(): boolean {
        return false;
    }

    public mark(readlimit: int): void {
    }

    public reset(): void {
        throw new IOException("mark/reset not supported");
    }

    public async close(): Promise<void> {
        if (this.in == null)
            return;
        await this.in.close();
        // this.in = null;
        // this.buf = null;
    }
}