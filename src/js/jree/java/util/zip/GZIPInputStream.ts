import { InputStream } from "../../io";
import InflaterInputStream from "./InflaterInputStream";
import { Inflate } from 'pako';
import ByteArrayInputStream from "../../io/ByteArrayInputStream";


export default class GZIPInputStream extends InflaterInputStream {

    private inflater: Inflate;
    private byteArrayInputStream: ByteArrayInputStream | undefined;

    public constructor(_in: InputStream) {
        super(_in);
        this.inflater = new Inflate();
    }

    private async decompress() {
        const compressed = await this.in.readAllBytes();
        // console.log(compressed);
        this.inflater.push(new Uint8Array(compressed), true);
        // console.log(this.inflater.result)
        this.byteArrayInputStream = new ByteArrayInputStream(this.inflater.result)
    }

    public async read(): Promise<number>;
    public async read(b: Int8Array): Promise<number>;
    public async read(b: Int8Array, off: number, len: number): Promise<number>;
    public async read(...args) {
        // console.log('read')
        // console.log(this.byteArrayInputStream)
        if (!this.byteArrayInputStream) {
            await this.decompress();
        }
        switch (args.length) {
            case 0: {
                return await this.byteArrayInputStream.read();
            }
            case 1: {
                const [b] = args as [Int8Array];
                return await this.read(b, 0, b.length);
            }
            case 3: {
                const [b, off, len] = args as [Int8Array, number, number];
                return await this.byteArrayInputStream.read(b, off, len);
            }
        }
    }
}