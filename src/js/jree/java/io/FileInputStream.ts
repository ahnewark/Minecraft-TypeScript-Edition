/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { int, long } from "../../types";

import { InputStream } from "./InputStream";
import { AutoCloseable } from "../lang/AutoCloseable";
import { FileChannel } from "../nio/channels/FileChannel";
import { StandardOpenOption } from "../nio/file/StandardOpenOption";
import { FileSystems } from "../nio/file/FileSystems";
import { ByteBuffer } from "../nio/ByteBuffer";
import { JavaFile } from "./File";
import { FileDescriptor } from "./FileDescriptor";
import { JavaString } from "../lang/String";
import { NotImplementedError } from "../../NotImplementedError";
import { IndexOutOfBoundsException } from "../lang/IndexOutOfBoundsException";
import { JavaMath } from "../lang/Math";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";

export class FileInputStream extends InputStream implements AutoCloseable {
    #channel: FileChannel;

    /**
     * Creates a FileInputStream by opening a connection to an actual file, the file named by the File object
     * file in the file system.
     */
    public static async Construct(file: JavaFile): Promise<FileInputStream>;
    /**
     * Creates a FileInputStream by using the file descriptor fdObj, which represents an existing connection
     * to an actual file in the file system.
     */
    public static async Construct(fdObj: FileDescriptor): Promise<FileInputStream>;
    /**
     * Creates a FileInputStream by opening a connection to an actual file, the file named by the path name
     * in the file system.
     */
    public static async Construct(name: JavaString | string): Promise<FileInputStream>;
    public static async Construct(...args: unknown[]): Promise<FileInputStream> {
        const _this = new FileInputStream();

        const source = args[0] as JavaFile | FileDescriptor | JavaString | string;

        if (source instanceof JavaFile) {
            _this.#channel = await FileChannel.open(source.toPath(), StandardOpenOption.READ);
        } else if (source instanceof JavaString || typeof source === "string") {
            const fileName = typeof source === "string" ? new JavaString(source) : source;
            const path = FileSystems.getDefault().getPath(fileName);
            _this.#channel = await FileChannel.open(path, StandardOpenOption.READ);
        } else {
            // No idea how file channels and file descriptors relate to each other. To me they look like an
            // either/or thing. So we just ignore the descriptor and open the channel.
            throw new NotImplementedError();
        }

        return _this;
    }

    public override available(): int {
        return Number(this.#channel.size() - this.#channel.position());
    }

    /** Closes this file input stream and releases any system resources associated with the stream. */
    public override async close(): Promise<void> {
        await this.#channel.close();
    }

    /** @returns the FileChannel object associated with this file input stream. */
    public getChannel(): FileChannel {
        return this.#channel;
    }

    /**
     * Returns the FileDescriptor object that represents the connection to the actual file in the file system being
     * used by this FileInputStream.
     */
    public getFD(): FileDescriptor {
        throw new NotImplementedError();
    }

    /** Reads the next byte of data from the input stream. */
    public override async read(): Promise<int>;
    /** Reads some number of bytes from the input stream and stores them into the buffer array b. */
    public override async read(b: Int8Array): Promise<int>;
    /** Reads up to len bytes of data from the input stream into an array of bytes. */
    public override async read(b: Int8Array, offset: int, length: int): Promise<int>;
    public override async read(...args: unknown[]): Promise<int> {
        switch (args.length) {
            case 0: {
                const buffer = ByteBuffer.allocate(1);
                const read = await this.#channel.read(buffer);

                if (read === 0) {
                    return -1;
                }

                return buffer.get(0);
            }

            case 1: {
                const b = args[0] as Int8Array;
                const buffer = ByteBuffer.wrap(b);
                const read = await this.#channel.read(buffer);

                if (read === 0) {
                    return -1;
                }

                return read;
            }

            case 3: {
                const [b, offset, length] = args as [Int8Array, int, int];
                if (offset < 0 || length < 0 || offset + length > b.length) {
                    throw new IndexOutOfBoundsException();
                }

                const buffer = ByteBuffer.wrap(b);
                const read = await this.#channel.read([buffer], offset, length);

                if (read === 0n) {
                    return -1;
                }

                return Number(read);
            }

            default: {
                throw new IllegalArgumentException("Invalid number of arguments");
            }
        }
    }

    /**
     * Skips over and discards n bytes of data from the input stream.
     *
     * @param n the number of bytes to be skipped.
     *
     * @returns the actual number of bytes skipped.
     */
    public override async skip(n: long): Promise<long> {
        const position = this.#channel.position();
        const remaining = this.#channel.size() - position;

        const count = JavaMath.min(n, remaining);
        this.#channel.position(position + count);

        return count;
    }
}
