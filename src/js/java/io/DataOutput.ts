import { byte, double, float, int, long } from "../jree/lib";

export abstract class DataOutput {

    public abstract write(buffer: Int8Array): void;

    public abstract write(buffer: Int8Array,  offset: int, count: int): void;

    public abstract write(oneByte: int): void;

    public abstract writeBoolean(val: boolean);

    public abstract writeByte(val: int): void

    public abstract writeBytes(str: string): void;

    public abstract writeChar(val: int): void;

    public abstract writeChars(str: string): void;

    public abstract writeDouble(val: double): void;

    public abstract writeFloat(val: float): void;

    public abstract writeInt(val: int): void;

    public abstract writeLong(val: long): void;

    public abstract writeShort(val: int): void;

    public abstract writeUTF(str: string): void;
}