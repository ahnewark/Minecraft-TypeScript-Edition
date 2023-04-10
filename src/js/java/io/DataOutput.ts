import { double, float, int, long } from "../../jree/types";

export abstract class DataOutput {

    public abstract write(buffer: Int8Array): Promise<void>;

    public abstract write(buffer: Int8Array,  offset: int, count: int): Promise<void>;

    public abstract write(oneByte: int): Promise<void>;

    public abstract writeBoolean(val: boolean);

    public abstract writeByte(val: int): Promise<void>

    public abstract writeBytes(str: string): Promise<void>;

    public abstract writeChar(val: int): Promise<void>;

    public abstract writeChars(str: string): Promise<void>;

    public abstract writeDouble(val: double): Promise<void>;

    public abstract writeFloat(val: float): Promise<void>;

    public abstract writeInt(val: int): Promise<void>;

    public abstract writeLong(val: long): Promise<void>;

    public abstract writeShort(val: int): Promise<void>;

    public abstract writeUTF(str: string): Promise<void>;
}