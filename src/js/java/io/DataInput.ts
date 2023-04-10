import { byte, char, double, float, int, long, short } from "../../jree/index";

export abstract class DataInput {
    public abstract readBoolean(): Promise<boolean>;
    public abstract readByte(): Promise<number>;
    public abstract readChar(): Promise<char>;
    public abstract readDouble(): Promise<double>;
    public abstract readFloat(): Promise<float>;
    public abstract readFully(dst: Int8Array): Promise<void>;
    public abstract readFully(dst: Int8Array, offset: int, byteCount: int): Promise<void>;
    public abstract readInt(): Promise<int>;
    public abstract readLine(): Promise<string | null>;
    public abstract readLong(): Promise<long>;
    public abstract readShort(): Promise<short>;
    public abstract readUnsignedByte(): Promise<int>;
    public abstract readUnsignedShort(): Promise<int>;
    public abstract readUTF(): Promise<string>;
    public abstract skipBytes(count: int): int;
}