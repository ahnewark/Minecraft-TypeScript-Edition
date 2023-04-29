import { ByteArrayOutputStream, OutputStream } from "../../io";
import DeflaterOutputStream from "./DeflaterOutputStream";
import { Deflate } from 'pako';

export default class GZIPOutputStream extends DeflaterOutputStream {

    private deflater: Deflate;
    private baos: ByteArrayOutputStream = new ByteArrayOutputStream();

    constructor(out: OutputStream) {
        super(out);
        this.deflater = new Deflate({level: -1, gzip: true});
    }

    /** Writes b.length bytes from the specified byte array to this output stream. */
    public async write(b: Int8Array): Promise<void>;
    /** Writes len bytes from the specified byte array starting at offset off to this output stream. */
    public async write(b: Int8Array, off: number, len: number): Promise<void>;
    /** Writes the specified byte to this output stream. */
    public async write(b: number): Promise<void>;
    public async write(...args: unknown[]): Promise<void> {
        if (typeof args[0] === "number") {
            await this.baos.write(args[0])
        } else {
            const b = args[0] as Int8Array;
            let offset = 0;
            let length = b.length;
            if (args.length > 1) {
                offset = args[1] as number;
                length = args[2] as number;
            }

            await this.baos.write(b, offset, length)
        }
    }

    public async flush() {
        // console.log('flushin', this.out)
    }

    public async close() {
        // console.log('closin', this.out)
        // console.log('gzip close', this.lastByte)
        // if(this.lastByte !== undefined) {
            // const ab = new ArrayBuffer(1);
            // ab[0] = this.lastByte;
        this.deflater.push(new Uint8Array(this.baos.toByteArray()), true)
        // console.log(this.deflater);
        // console.log(this.deflater.result);
        await this.out.write(this.deflater.result, 0, this.deflater.result.length)
        // }
        await this.out.close();
        this.deflater = new Deflate();
    }
}