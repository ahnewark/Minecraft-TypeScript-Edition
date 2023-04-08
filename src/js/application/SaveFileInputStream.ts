import { java } from "jree/lib";
import SaveFile from "./SaveFile";

export class SaveFileInputStream extends java.io.FileInputStream {
    readonly saveFile: SaveFile;
    constructor(saveFile: SaveFile) {
        super('');
        this.saveFile = saveFile;
    }
    available(): number {
        throw new Error("Method not implemented.");
    }
    close(): void {
        throw new Error("Method not implemented.");
    }
    mark(readlimit: number): void {
        throw new Error("Method not implemented.");
    }
    markSupported(): boolean {
        throw new Error("Method not implemented.");
    }
    read(): number;
    read(b: Int8Array): number;
    read(b: Int8Array, off: number, len: number): number;
    read(b?: unknown, off?: unknown, len?: unknown): number {
        throw new Error("Method not implemented.");
    }
    readAllBytes(): Int8Array {
        throw new Error("Method not implemented.");
    }
    readNBytes(b: Int8Array, off: number, len: number): number;
    readNBytes(len: number): Int8Array;
    readNBytes(b: unknown, off?: unknown, len?: unknown): number | Int8Array {
        throw new Error("Method not implemented.");
    }
    reset(): void {
        throw new Error("Method not implemented.");
    }
    skip(n: bigint): bigint {
        throw new Error("Method not implemented.");
    }
    transferTo(out: java.io.OutputStream): bigint {
        throw new Error("Method not implemented.");
    }
    equals(obj: unknown): boolean {
        throw new Error("Method not implemented.");
    }
    getClass<T extends java.lang.Object>(): java.lang.Class<T> {
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
    protected clone(): java.lang.Object {
        throw new Error("Method not implemented.");
    }
    protected [Symbol.toPrimitive](_hint: string): string | number | bigint | boolean | null {
        throw new Error("Method not implemented.");
    }
    
}