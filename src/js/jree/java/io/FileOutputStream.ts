/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { OutputStream } from "./OutputStream";
import { FileDescriptor } from "./FileDescriptor";
import { JavaFile } from "./File";
import { JavaString } from "../lang/String";
import { FileNotFoundException } from "./FileNotFoundException";
import { Throwable } from "../lang/Throwable";
import { IOException } from "./IOException";
import { IndexOutOfBoundsException } from "../lang/IndexOutOfBoundsException";
import { AutoCloseable } from "../lang/AutoCloseable";
import { JavaObject } from "../lang/Object";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";
import { openAsync, writeAsync } from "../../../node/fs";

/**
 * A file output stream is an output stream for writing data to a File or to a FileDescriptor. Whether or not a file
 * is available or may be created depends upon the underlying platform. Some platforms, in particular, allow a file
 * to be opened for writing by only one FileOutputStream (or other file-writing object) at a time. In such situations
 * the constructors in this class will fail if the file involved is already open.
 */
export class FileOutputStream extends OutputStream {

    private fd: FileDescriptor;
    private path?: string;
    private closed = true;

    public static async Construct(file: JavaFile): Promise<FileOutputStream>;
    /**
     * Creates a file output stream to write to the specified file descriptor, which represents an existing connection
     * to an actual file in the file system.
     */
    public static async Construct(fdObj: FileDescriptor): Promise<FileOutputStream>;
    /** Creates a file output stream to write to the file represented by the specified File object. */
    public static async Construct(file: JavaFile, append: boolean): Promise<FileOutputStream>;
    public static async Construct(name: JavaString | string): Promise<FileOutputStream>;
    /** Creates a file output stream to write to the file with the specified name. */
    public static async Construct(name: JavaString | string, append: boolean): Promise<FileOutputStream>;
    public static async Construct(...args: unknown[]): Promise<FileOutputStream> {
        const _this = new FileOutputStream();

        try {
            switch (args.length) {
                case 1: {
                    const arg = args[0] as JavaFile | FileDescriptor | JavaString | string;
                    if (arg instanceof JavaFile) {
                        _this.path = arg.getAbsolutePath().valueOf();
                        _this.fd = new FileDescriptor();
                        await _this.open(false);
                    } else if (arg instanceof FileDescriptor) {
                        _this.fd = arg;
                    } else {
                        _this.path = arg.valueOf();
                        _this.fd = new FileDescriptor();
                        await _this.open(false);
                    }

                    break;
                }

                case 2: {
                    const [fileOrFdObjOrName, append] =
                        args as [JavaFile | FileDescriptor | JavaString | string, boolean];
                    if (fileOrFdObjOrName instanceof JavaFile) {
                        _this.path = fileOrFdObjOrName.getAbsolutePath().valueOf();
                        _this.fd = new FileDescriptor();
                        await _this.open(append);
                    } else if (fileOrFdObjOrName instanceof FileDescriptor) {
                        _this.fd = fileOrFdObjOrName;
                    } else {
                        _this.path = fileOrFdObjOrName.valueOf();
                        _this.fd = new FileDescriptor();
                        await _this.open(append);
                    }

                    break;
                }

                default: {
                    throw new IllegalArgumentException("Wrong number of arguments");
                }
            }
        } catch (error) {
            throw new FileNotFoundException(Throwable.fromError(error));
        }

        return _this;
    }

    /** Closes this output stream and releases any system resources associated with this stream. */
    public override close(): void {
        if (this.closed) {
            return;
        }

        this.closed = true;
        this.fd.closeAll(new class extends JavaObject implements AutoCloseable {
            public constructor(private fd: FileDescriptor) {
                super();
            }

            public close(): void {
                this.fd.close();
            }
        }(this.fd));
    }

    /** Flushes this output stream and forces any buffered output bytes to be written out. */
    public override flush(): void {
        this.fd.sync();
    }

    /** Writes b.length bytes from the specified byte array to this output stream. */
    public override async write(b: Int8Array): Promise<void>;
    /** Writes len bytes from the specified byte array starting at offset off to this output stream. */
    public override async write(b: Int8Array, offset: number, length: number): Promise<void>;
    /** Writes the specified byte to this output stream. */
    public override async write(b: number): Promise<void>;
    public override async write(b: Int8Array | number, offset?: number, length?: number): Promise<void> {
        if (!this.fd.valid()) {
            throw new IOException(new JavaString("Cannot write data because the file handle is invalid."));
        }

        try {
            if (typeof b === "number") {
                const buffer = new Int8Array(1);
                buffer[0] = b;
                await writeAsync(this.fd.handle!, buffer, 0, 1);
            } else {
                offset ??= 0;
                length ??= b.length;
                if (offset < 0 || length < 0 || offset + length > b.length) {
                    throw new IndexOutOfBoundsException();
                }

                await writeAsync(this.fd.handle!, b, offset, length);
            }
        } catch (error) {
            throw new IOException(new JavaString("`Cannot write data to file"), Throwable.fromError(error));
        }
    }

    public getFD(): FileDescriptor {
        return this.fd;
    }

    private async open(append: boolean): Promise<void> {
        if (this.path) {
            try {
                const handle = await openAsync(this.path, append ? "as" : "w", 0x400);
                this.fd.handle = handle;
                this.closed = false;
            } catch (error) {
                throw new IOException(new JavaString("Cannot open file"), Throwable.fromError(error));
            }
        }
    }
}
