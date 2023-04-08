import { JavaString, JavaObject, Class } from "jree/lib";
import { FileOutputStream, OutputStream } from "jree/lib/java/io";
import SaveFile from "./SaveFile";

export class SaveFileOutputStream extends FileOutputStream {
    readonly saveFile: SaveFile;
    constructor(saveFile: SaveFile) {
        super('');
        this.saveFile = saveFile;
    }
    flush(): void {
        throw new Error("Method not implemented.");
    }
    close(): void {
        throw new Error("Method not implemented.");
    }
    toString(): JavaString {
        throw new Error("Method not implemented.");
    }
    write(b: Int8Array): void;
    write(b: Int8Array, off: number, len: number): void;
    write(b: number): void;
    write(b: unknown, off?: unknown, len?: unknown): void {
        throw new Error("Method not implemented.");
    }
    #private: any;
    equals(obj: unknown): boolean {
        throw new Error("Method not implemented.");
    }
    getClass<T extends JavaObject>(): Class<T> {
        throw new Error("Method not implemented.");
    }
    hashCode(): number {
        throw new Error("Method not implemented.");
    }
    notify(): void {
        throw new Error("Method not implemented.");
    }
    notifyAll(): void {
        throw new Error("Method not implemented.");
    }
    wait(timeout?: number | undefined, nanos?: number | undefined): void {
        throw new Error("Method not implemented.");
    }
    protected clone(): JavaObject {
        throw new Error("Method not implemented.");
    }
    protected [Symbol.toPrimitive](_hint: string): string | number | bigint | boolean | null {
        throw new Error("Method not implemented.");
    }
    
}