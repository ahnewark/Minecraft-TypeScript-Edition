import { double, float, int, long } from "../../jree/index";
import { FilterOutputStream, OutputStream } from "../../jree/java/io/index";
import { Integer } from "../../jree/java/lang/Integer";
import { DataOutput } from "./DataOutput";

export class DataOutputStream extends FilterOutputStream implements DataOutput {
    protected written: int;

    private bytearr: Int8Array;
    
    public constructor(out: OutputStream) {
        super(out);
    }

    private incCount(value: int): void {
        let temp = this.written + value;
        if (temp < 0) {
            temp = Integer.MAX_VALUE;
        }
        this.written = temp;
    }

    public async write(b: Int8Array): Promise<void>;

    public async write(b: int): Promise<void>;

    public async write(b: Int8Array[], off: int, len: int): Promise<void>;

    public async write(...args) {
        switch (args.length) {
            case 1: {
                await this.out.write(args[0]);
                this.incCount(1);
            }
            case 3: {
                await this.out.write(args[0], args[1], args[2]);
                this.incCount(args[2]);
            }
        }
    }

    public flush(): void {
        this.out.flush();
    }

    public async writeBoolean(v: boolean): Promise<void> {
        await this.out.write(v ? 1 : 0);
        this.incCount(1);
    }

    public async writeByte(v: int): Promise<void> {
        await this.out.write(v);
        this.incCount(1);
    }

    public async writeShort(v: int): Promise<void> {
        await this.out.write((v >>> 8) & 0xFF);
        await this.out.write((v >>> 0) & 0xFF);
        this.incCount(2);
    }

    public async writeChar(v: int): Promise<void> {
        await this.out.write((v >>> 8) & 0xFF);
        await this.out.write((v >>> 0) & 0xFF);
        this.incCount(2);
    }

    public async writeInt(v: int): Promise<void> {
        await this.out.write((v >>> 24) & 0xFF);
        await this.out.write((v >>> 16) & 0xFF);
        await this.out.write((v >>>  8) & 0xFF);
        await this.out.write((v >>>  0) & 0xFF);
        this.incCount(4);
    }

    private writeBuffer : Int8Array = new Int8Array(8);

    public async writeLong(v: long): Promise<void> {
        this.writeBuffer[0] = Number(v >> BigInt(56));
        this.writeBuffer[1] = Number(v >> BigInt(48));
        this.writeBuffer[2] = Number(v >> BigInt(40));
        this.writeBuffer[3] = Number(v >> BigInt(32));
        this.writeBuffer[4] = Number(v >> BigInt(24));
        this.writeBuffer[5] = Number(v >> BigInt(16));
        this.writeBuffer[6] = Number(v >> BigInt(8));
        this.writeBuffer[7] = Number(v >> BigInt(0));
        await this.out.write(this.writeBuffer, 0, 8);
        this.incCount(8);
    }

    public async writeFloat(v: float): Promise<void> {
        let buf = new ArrayBuffer(4);
        (new Float32Array(buf))[0] = v;
        let intBytes = (new Uint32Array(buf))[0];
        await this.writeInt(intBytes);
    }

    public async writeDouble(v: double): Promise<void> {
        var buf = new ArrayBuffer(8);
        (new Float64Array(buf))[0] = v;
        let bigInt = BigInt(BigInt((new Uint32Array(buf))[0]) << BigInt(32) + BigInt((new Uint32Array(buf))[1]));
        await this.writeLong(bigInt);
    }

    public async writeBytes(s: string): Promise<void> {
        let len = s.length;
        for (let i = 0 ; i < len ; i++) {
            await this.out.write(s.charCodeAt(i));
        }
        this.incCount(len);
    }

    public async writeChars(s: string): Promise<void> {
        let len = s.length;
        for (let i = 0 ; i < len ; i++) {
            let v = s.charCodeAt(i);
            await this.out.write((v >>> 8) & 0xFF);
            await this.out.write((v >>> 0) & 0xFF);
        }
        this.incCount(len * 2);
    }

    public async writeUTF(str: string): Promise<void> {
        await DataOutputStream.writeUTF(str, this);
    }

    static async writeUTF(str: string, out: DataOutput): Promise<number> {
        let strlen = str.length;
        let utflen = 0;
        let c, count = 0;

        /* use charAt instead of copying String to char array */
        for (let i = 0; i < strlen; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                utflen++;
            } else if (c > 0x07FF) {
                utflen += 3;
            } else {
                utflen += 2;
            }
        }

        if (utflen > 65535)
            throw new Error("encoded string too long: " + utflen + " bytes");

        let bytearr: Int8Array;
        if (out instanceof DataOutputStream) {
            let dos = out as DataOutputStream;
            if(dos.bytearr == null || (dos.bytearr.length < (utflen+2)))
                dos.bytearr = new Int8Array((utflen*2) + 2);
            bytearr = dos.bytearr;
        } else {
            bytearr = new Int8Array(utflen+2);
        }

        bytearr[count++] = ((utflen >>> 8) & 0xFF);
        bytearr[count++] = ((utflen >>> 0) & 0xFF);

        let i=0;
        for (i=0; i<strlen; i++) {
           c = str.charCodeAt(i);
           if (!((c >= 0x0001) && (c <= 0x007F))) break;
           bytearr[count++] = c;
        }

        for (;i < strlen; i++){
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                bytearr[count++] = c;

            } else if (c > 0x07FF) {
                bytearr[count++] = (0xE0 | ((c >> 12) & 0x0F));
                bytearr[count++] = (0x80 | ((c >>  6) & 0x3F));
                bytearr[count++] = (0x80 | ((c >>  0) & 0x3F));
            } else {
                bytearr[count++] = (0xC0 | ((c >>  6) & 0x1F));
                bytearr[count++] = (0x80 | ((c >>  0) & 0x3F));
            }
        }
        await out.write(bytearr, 0, utflen+2);
        return utflen + 2;
    }

    public size(): int {
        return this.written;
    }
}