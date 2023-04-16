import { byte, char, double, float, int, java, long, short } from "../../jree/index"
import { InputStream } from "../../jree/java/io/InputStream";
import { IndexOutOfBoundsException } from "../../jree/java/lang/IndexOutOfBoundsException";
import System from "../lang/System";
import { DataInput } from "./DataInput";
import { FilterInputStream } from "./FilterInputStream";
import { PushbackInputStream } from "./PushbackInputStream";

export class DataInputStream extends FilterInputStream implements DataInput {
    public constructor(_in: InputStream) {
        super(_in);
    }

    private bytearr = new Int8Array(80);
    private chararr = new Int8Array(80);

    public async read(): Promise<int>;
    public async read(b: Int8Array): Promise<int>;
    public async read(b: Int8Array, off: int, len: int): Promise<int>;
    public async read(...args): Promise<int> {
        switch (args.length) {
            case 0: {
                return super.read();
            }
            case 1: {
                const b = args[0] as Int8Array;
                return await this.in.read(b, 0, b.length);
            }
            case 3: {
                const [b, off, len] = args as [Int8Array, int, int];
                return await this.in.read(b, off, len);
            }
            default: {
                throw new Error('The Michael Rosen Rap!');
            }
        }
    }

    public async readFully(b: Int8Array): Promise<void>;

    public async readFully(b: Int8Array, off: int, len: int): Promise<void>;

    public async readFully(...args) {
        const b = args[0] as Int8Array;
        let off: int;
        let len: int;
        switch (args.length) {
            case 1: {
                off = 0;
                len = b.length;
                break;
            }
            case 3: {
                off = args[1];
                len = args[2];
                break;
            }
            default: {
                throw new Error('You may think Im happy, you may think Im sad');
            }
        }

        if (len < 0)
            throw new IndexOutOfBoundsException();
        let n = 0;
        while (n < len) {
            let count = await this.in.read(b, off + n, len - n);
            if (count < 0)
                throw new Error('EOF');
            n += count;
        }
    }

    public skipBytes(n: int): int {
        let total = 0;
        let cur = 0;

        while ((total<n) && ((cur = Number(this.in.skip(BigInt(n - total)))) > 0)) {
            total += cur;
        }

        return total;
    }

    public async readBoolean(): Promise<boolean> {
        let ch = await this.in.read();
        if (ch < 0)
            throw new Error('EOF');
        return (ch != 0);
    }

    public async readByte(): Promise<byte> {
        let ch = await this.in.read();
        if (ch < 0)
            throw new Error('EOF');
        return ch & 0xff;
    }

    public async readUnsignedByte(): Promise<int> {
        let ch = await this.in.read();
        if (ch < 0)
            throw new Error('EOF');
        return ch;
    }

    public async readShort(): Promise<short> {
        let ch1 = await this.in.read();
        let ch2 = await this.in.read();
        if ((ch1 | ch2) < 0)
            throw new Error('EOF');
        return ((ch1 << 8) + (ch2 << 0)) & 0xffff;
    }

    public async readUnsignedShort(): Promise<number> {
        let ch1 = await this.in.read();
        let ch2 = await this.in.read();
        if ((ch1 | ch2) < 0)
            throw new Error('EOF');

        return ((ch1 << 8) + (ch2 << 0)) & 0xffff;
    }

    public async readChar(): Promise<char> {
        let ch1 = await this.in.read();
        let ch2 = await this.in.read();
        if ((ch1 | ch2) < 0)
            throw new Error('EOF');
        return ((ch1 << 8) + (ch2 << 0)) & 0xffff;
    }

    public async readInt(): Promise<int> {
        let ch1 = await this.in.read();
        let ch2 = await this.in.read();
        let ch3 = await this.in.read();
        let ch4 = await this.in.read();
        if ((ch1 | ch2 | ch3 | ch4) < 0)
            throw new Error('eof');
        return ((ch1 << 24) + (ch2 << 16) + (ch3 << 8) + (ch4 << 0));
    }

    private readBuffer = new Int8Array(8);

    public async readLong(): Promise<long> {
        await this.readFully(this.readBuffer, 0, 8);
        return ((BigInt(this.readBuffer[0]) << BigInt(56)) +
                (BigInt(this.readBuffer[1] & 255) << BigInt(48)) +
                (BigInt(this.readBuffer[2] & 255) << BigInt(40)) +
                (BigInt(this.readBuffer[3] & 255) << BigInt(32)) +
                (BigInt(this.readBuffer[4] & 255) << BigInt(24)) +
                (BigInt(this.readBuffer[5] & 255) << BigInt(16)) +
                (BigInt(this.readBuffer[6] & 255) <<  BigInt(8)) +
                (BigInt(this.readBuffer[7] & 255) <<  BigInt(0)));
    }

    public async readFloat(): Promise<float> {
        let int =  await this.readInt();
        var buffer = new ArrayBuffer(8);
        (new Uint32Array(buffer))[0] = int;
        return new Float32Array(buffer)[0];
    }

    public async readDouble(): Promise<double> {
        let int = await this.readLong();

        var buffer = new ArrayBuffer(8);
        (new Uint32Array(buffer))[0] = int[0];
        (new Uint32Array(buffer))[1] = int[1];
        return new Float64Array(buffer)[0];
    }

    private lineBuffer: Int16Array;

    public async readLine(): Promise<string | null> {
        let buf = this.lineBuffer;

        if (buf == null) {
            buf = this.lineBuffer = new Int16Array[128];
        }

        let room = buf.length;
        let offset = 0;
        let c;

loop:   while (true) {
            switch (c = await this.in.read()) {
              case -1:
              case 0xa:
                break loop;

              case 0xd:
                let c2 = await this.in.read();
                if ((c2 != 0xa) && (c2 != -1)) {
                    if (!(this.in instanceof PushbackInputStream)) {
                        this.in = new PushbackInputStream(this.in);
                    }
                    (this.in as PushbackInputStream).unread(c2);
                }
                break loop;

              default:
                if (--room < 0) {
                    buf = new Int16Array[offset + 128];
                    room = buf.length - offset - 1;
                    System.arraycopy(this.lineBuffer, 0, buf, 0, offset);
                    this.lineBuffer = buf;
                }
                buf[offset++] = c & 0xffff;
                break;
            }
        }
        if ((c == -1) && (offset == 0)) {
            return null;
        }

        //return String.copyValueOf(buf, 0, offset);
        // Uncertain.
        return new TextDecoder().decode(buf.slice(0, offset));
    }

    public async readUTF(): Promise<string> {
        return await DataInputStream.readUTF(this);
    }

    public static async readUTF(_in: DataInput): Promise<string> {
        let utflen = await _in.readUnsignedShort();
        let bytearr: Int8Array;
        let chararr: Int8Array;
        if (_in instanceof DataInputStream) {
            let dis = _in as DataInputStream;
            if (dis.bytearr.length < utflen){
                dis.bytearr = new Int8Array(utflen*2);
                dis.chararr = new Int8Array(utflen*2);
            }
            chararr = dis.chararr;
            bytearr = dis.bytearr;
        } else {
            bytearr = new Int8Array(utflen);
            chararr = new Int8Array(utflen);
        }

        let c, char2, char3: char;
        let count = 0;
        let chararr_count=0;

        await _in.readFully(bytearr, 0, utflen);

        while (count < utflen) {
            c = bytearr[count] & 0xff;
            if (c > 127) break;
            count++;
            chararr[chararr_count++]=c;
        }

        while (count < utflen) {
            c = bytearr[count] & 0xff;
            console.log({c, c4: c>>4});
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    /* 0xxxxxxx*/
                    count++;
                    chararr[chararr_count++]=c;
                    break;
                case 12: case 13:
                    /* 110x xxxx   10xx xxxx*/
                    count += 2;
                    if (count > utflen)
                        throw new Error(
                            "malformed input: partial character at end");
                    char2 =  bytearr[count-1];
                    if ((char2 & 0xC0) != 0x80)
                        throw new Error(
                            "malformed input around byte " + count);
                    chararr[chararr_count++]=(((c & 0x1F) << 6) |
                                                    (char2 & 0x3F));
                    break;
                case 14:
                    /* 1110 xxxx  10xx xxxx  10xx xxxx */
                    count += 3;
                    if (count > utflen)
                        throw new Error(
                            "malformed input: partial character at end");
                    char2 =  bytearr[count-2];
                    char3 =  bytearr[count-1];
                    if (((char2 & 0xC0) != 0x80) || ((char3 & 0xC0) != 0x80))
                        throw new Error(
                            "malformed input around byte " + (count-1));
                    chararr[chararr_count++]=(((c     & 0x0F) << 12) |
                                                    ((char2 & 0x3F) << 6)  |
                                                    ((char3 & 0x3F) << 0));
                    break;
                default:
                    /* 10xx xxxx,  1111 xxxx */
                    throw new Error(
                        "malformed input around byte " + count);
            }
        }
        // The number of chars produced may be less than utflen
        return '' + new java.lang.String(chararr, 0, chararr_count);
    }
}
