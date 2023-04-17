/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NotImplementedError } from "../../NotImplementedError";
import { int } from "../../types";
import { JavaObject } from "../lang/Object";
import { JavaString } from "../lang/String";
import { Closeable } from "./Closeable";
import { Flushable } from "./Flushable";

/**
 * This is the base class for all output streams. An output stream accepts output bytes and sends them to some sink.
 */
export abstract class OutputStream extends JavaObject implements Closeable, Flushable {
    /** @returns a new OutputStream which discards all bytes. */
    public static nullOutputStream(): OutputStream {
        return new class extends OutputStream {
            public override async write(b: Int8Array): Promise<void>;
            public override async write(b: Int8Array, off: number, len: number): Promise<void>;
            public override async write(b: number): Promise<void>;
            public override async write(...args: unknown[]): Promise<void> {
                // Nothing to do here.
            }
        }();
    }

    /** Flushes this output stream and forces any buffered output bytes to be written out. */
    public async flush(): Promise<void> {
        // Nothing to do here.
    }

    /** Closes this output stream and releases any system resources associated with this stream. */
    public async close(): Promise<void> {
        // Nothing to do here.
    }

    public override toString(): JavaString {
        return new JavaString(super.toString());
    }

    /** Writes b.length bytes from the specified byte array to this output stream. */
    public async write(b: Int8Array): Promise<void>;
    /** Writes len bytes from the specified byte array starting at offset off to this output stream. */
    public async write(b: Int8Array, off: number, len: number): Promise<void>;
    /** Writes the specified byte to this output stream. */
    public async write(b: int): Promise<void>;
    public async write(...args: unknown[]): Promise<void> {
        if (typeof args[0] === "number") {
            throw new NotImplementedError("abstract");
        }

        const b = args[0] as Int8Array;
        let offset = 0;
        let length = b.length;
        if (args.length > 1) {
            offset = args[1] as number;
            length = args[2] as number;
        }

        for (let i = offset; i < (offset + length); i++) {
            await this.write(b[i]);
        }
    }

}
