import { byte, char, double, float, int, long, short } from "jree/lib";

export abstract class DataInput {
    public abstract readBoolean(): boolean;
    public abstract readByte(): number;
    public abstract readChar(): char;
    public abstract readDouble(): double;
    public abstract readFloat(): float;
    public abstract readFully(dst: Int8Array): void;
    public abstract readFully(dst: Int8Array, offset: int[], byteCount: int): void;
    public abstract readInt(): int;
    public abstract readLine(): string;
    public abstract readLong(): long;
    public abstract readShort(): short;
    public abstract readUnsignedByte(): int;
    public abstract readUnsignedShort(): int;
    public abstract readUTF(): string;
    public abstract skipBytes(count: int): int;
}