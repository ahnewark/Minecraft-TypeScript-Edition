/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NotImplementedError } from "../../NotImplementedError";
import { char, double, float, int, long } from "../../types";

import { CharSequence } from "../lang/CharSequence";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";
import { IndexOutOfBoundsException } from "../lang/IndexOutOfBoundsException";
import { JavaObject } from "../lang/Object";
import { JavaString } from "../lang/String";
import { System } from "../lang/System";
import { CharBuffer } from "../nio/CharBuffer";
import { Charset } from "../nio/charset/Charset";
import { CharsetEncoder } from "../nio/charset/CharsetEncoder";
import { Locale } from "../util/Locale";
import { JavaFile } from "./File";
import { FileOutputStream } from "./FileOutputStream";

import { FilterOutputStream } from "./FilterOutputStream";
import { OutputStream } from "./OutputStream";

/** A print stream is an output stream that prints representations of various data values conveniently. */
export class PrintStream extends FilterOutputStream {
    static #lineSeparator: JavaString | null;

    #autoFlush = false;
    #encoder: CharsetEncoder;
    #haveError = false;

    /** Creates a new print stream, without automatic line flushing, with the specified file. */
    public static async Construct(file: JavaFile): Promise<PrintStream>;
    /** Creates a new print stream, without automatic line flushing, with the specified file and charset. */
    public static async Construct(file: JavaFile, csn: JavaString): Promise<PrintStream>;
    /** Creates a new print stream, without automatic line flushing, with the specified file and charset. */
    public static async Construct(file: JavaFile, charset: Charset): Promise<PrintStream>;
    /** Creates a new print stream. */
    public static async Construct(out: OutputStream): Promise<PrintStream>;
    /** Creates a new print stream. */
    public static async Construct(out: OutputStream, autoFlush: boolean): Promise<PrintStream>;
    /** Creates a new print stream. */
    public static async Construct(out: OutputStream, autoFlush: boolean, encoding: JavaString): Promise<PrintStream>;
    /** Creates a new print stream, with the specified OutputStream, automatic line flushing and charset. */
    public static async Construct(out: OutputStream, autoFlush: boolean, charset: Charset): Promise<PrintStream>;
    /** Creates a new print stream, without automatic line flushing, with the specified file name. */
    public static async Construct(fileName: JavaString): Promise<PrintStream>;
    /** Creates a new print stream, without automatic line flushing, with the specified file name and charset. */
    public static async Construct(fileName: JavaString, csn: JavaString): Promise<PrintStream>;
    /** Creates a new print stream, without automatic line flushing, with the specified file name and charset. */
    public static async Construct(fileName: JavaString, charset: Charset): Promise<PrintStream>;
    public static async Construct(...args: unknown[]): Promise<PrintStream> {
        let output: OutputStream;
        let autoFlush = false;
        let charset: Charset;

        switch (args.length) {
            case 1: {
                const arg = args[0] as OutputStream | JavaFile | JavaString;
                if (arg instanceof JavaFile) {
                    output = await FileOutputStream.Construct(arg);
                } else if (arg instanceof OutputStream) {
                    output = arg;
                } else {
                    output = await FileOutputStream.Construct(arg);
                }

                charset = Charset.defaultCharset();

                break;
            }

            case 2: {
                if (args[0] instanceof OutputStream) {
                    [output, autoFlush] = args as [OutputStream, boolean];
                    charset = Charset.defaultCharset();
                } else if (args[0] instanceof JavaFile) {
                    const [file, arg2] = args as [JavaFile, JavaString | Charset];
                    if (arg2 instanceof Charset) {
                        charset = arg2;
                    } else {
                        const cs = Charset.forName(arg2);
                        if (cs === null) {
                            throw new IllegalArgumentException(new JavaString("Invalid charset name"));
                        }

                        charset = cs;
                    }

                    output = await FileOutputStream.Construct(file);
                } else {
                    const [fileName, arg2] = args as [JavaString, JavaString | Charset];
                    if (arg2 instanceof Charset) {
                        charset = arg2;
                    } else {
                        const cs = Charset.forName(arg2);
                        if (cs === null) {
                            throw new IllegalArgumentException(new JavaString("Invalid charset name"));
                        }

                        charset = cs;
                    }

                    output = await FileOutputStream.Construct(fileName);
                }

                break;
            }

            case 3: {
                let arg2;
                [output, autoFlush, arg2] = args as [OutputStream, boolean, JavaString | Charset];
                if (arg2 instanceof Charset) {
                    charset = arg2;
                } else {
                    const cs = Charset.forName(arg2);
                    if (cs === null) {
                        throw new IllegalArgumentException(new JavaString("Invalid charset name"));
                    }

                    charset = cs;
                }

                break;
            }

            default: {
                throw new IllegalArgumentException(new JavaString("Invalid number of arguments"));
            }
        }

        const _this = new PrintStream(output);
        _this.#autoFlush = autoFlush;
        _this.#encoder = charset.newEncoder();

        // Initialize this static field here to avoid static initialization order issues.
        if (!PrintStream.#lineSeparator) {
            PrintStream.#lineSeparator = System.getProperty(new JavaString("line.separator"));
        }

        return _this;
    }

    /** Appends the specified character to this output stream. */
    public async append(c: char): Promise<PrintStream>;
    /** Appends the specified character sequence to this output stream. */
    public async append(csq: CharSequence | null): Promise<PrintStream>;
    /** Appends a subsequence of the specified character sequence to this output stream. */
    public async append(csq: CharSequence | null, start: int, end: int): Promise<PrintStream>;
    public async append(...args: unknown[]): Promise<PrintStream> {
        if (args.length === 1) {
            const arg = args[0] as char | CharSequence | null;
            if (typeof arg === "number") {
                await this.write(arg);
            } else {
                const s = arg ?? new JavaString("null");
                const buffer = this.encode(s);
                await this.out.write(buffer);
            }
        } else {
            const [csq, start, end] = args as [CharSequence | null, int, int];
            const s = csq ?? new JavaString("null");

            if (start < 0 || end < 0 || start > end || end > (s.length() ?? 0)) {
                throw new IndexOutOfBoundsException();
            }

            if (start === end) {
                return this;
            }

            const buffer = this.encode(s.subSequence(start, end));
            await this.write(buffer);
        }

        return this;
    }

    /**
     * Flushes the stream and checks its error state.
     *
     * @returns `true` if the print stream has encountered an error, either on the underlying output stream or during
     *           a format conversion.
     */
    public async checkError(): Promise<boolean> {
        try {
            await this.out.flush();
        } catch (e) {
            this.#haveError = true;
        }

        return this.#haveError;
    }

    /** Closes the stream. */
    public override async close(): Promise<void> {
        await this.out.close();
    }

    /** Flushes the stream. */
    public override async flush(): Promise<void> {
        await this.out.flush();
    }

    /** Writes a formatted string to this output stream using the specified format string and arguments. */
    public format(format: JavaString, ...args: unknown[]): PrintStream;
    /** Writes a formatted string to this output stream using the specified format string and arguments. */
    public format(l: Locale, format: JavaString, ...args: unknown[]): PrintStream;
    public format(...args: unknown[]): PrintStream {
        console.error('PrintStream.format is not yet implemented.')
        // let index = 0;
        // if (args[0] instanceof Locale) {
        //     ++index; // Ignore the locale for now.
        // }

        // const text = printf(`${args[index]}`, args.slice(index + 1));
        // this.append(new JavaString(text));

        return this;
    }

    /** Prints a boolean value. */
    public async print(b: boolean): Promise<void>;
    /** Prints a character. */
    public async print(c: char): Promise<void>;
    /** Prints an array of characters. */
    public async print(s: Uint16Array): Promise<void>;
    /** Prints a double-precision floating-point int. */
    public async print(d: double): Promise<void>;
    /** Prints a floating-point int. */
    public async print(f: float): Promise<void>;
    /** Prints an integer. */
    public async print(i: int): Promise<void>;
    /** Prints a long integer. */
    public async print(l: long): Promise<void>;
    /** Prints an object. */
    public async print(obj: JavaObject | null): Promise<void>;
    /** Prints a string. */
    public async print(str: JavaString | null): Promise<void>;
    public async print(v: unknown): Promise<void> {
        if (v === null) {
            await this.append(new JavaString("null"));
        } else if (v instanceof JavaString) {
            await this.append(v);
        } else {
            await this.append(new JavaString(`${v}`));
        }
    }

    /**
     * A convenience method to write a formatted string to this output stream using the specified format string
     * and arguments.
     *
     * @param format tbd
     * @param args tbd
     *
     * @returns tbd
     */
    public printf(format: JavaString, ...args: unknown[]): PrintStream {
        return this.format(format, args);
    }

    /** Terminates the current line by writing the line separator string. */
    public async println(): Promise<void>;
    /** Prints a boolean and then terminate the line. */
    public async println(b: boolean): Promise<void>;
    /** Prints a character and then terminate the line. */
    public async println(c: char): Promise<void>;
    /** Prints an array of characters and then terminate the line. */
    public async println(s: Uint16Array): Promise<void>;
    /** Prints a double and then terminate the line. */
    public async println(d: double): Promise<void>;
    /** Prints a float and then terminate the line. */
    public async println(f: float): Promise<void>;
    /** Prints an integer and then terminate the line. */
    public async println(i: int): Promise<void>;
    /** Prints a long and then terminate the line. */
    public async println(l: long): Promise<void>;
    /** Prints an object and then terminate the line. */
    public async println(obj: JavaObject | null): Promise<void>;
    /** Prints a string and then terminate the line. */
    public async println(str: JavaString | string): Promise<void>;
    public async println(v?: unknown): Promise<void> {
        if (v !== undefined) {
            if (v === null) {
                const buffer = this.encode(new JavaString("null"));
                await this.write(buffer);
            } else if (v instanceof JavaString) {
                const buffer = this.encode(v);
                await this.write(buffer);
            } else {
                const buffer = this.encode(new JavaString(`${v}`));
                await this.write(buffer);
            }
        }

        await this.print(PrintStream.#lineSeparator);
        if (this.#autoFlush) {
            await this.flush();
        }
    }

    public override async write(b: Int8Array): Promise<void>;
    public override async write(b: Int8Array, off: int, len: int): Promise<void>;
    public override async write(b: int): Promise<void>;
    public override async write(...args: unknown[]): Promise<void> {
        if (args.length === 1) {
            const b = args[0] as Int8Array | int;
            if (b instanceof Int8Array) {
                await this.out.write(b, 0, b.length);
            } else {
                await this.out.write(b);
            }
        } else {
            const [b, off, len] = args as [Int8Array, int, int];
            await this.out.write(b.subarray(off, off + len));
        }
    }

    /** Clears the internal error state of this stream. */
    protected clearError(): void {
        this.#haveError = false;
    }

    /** Sets the error state of the stream to true. */
    protected setError(): void {
        throw new NotImplementedError();
    }

    /**
     * Converts a character sequence to a byte array.
     *
     * @param s The character sequence to convert.
     *
     * @returns A byte array containing the encoded string.
     */
    private encode(s: CharSequence): Int8Array {
        const buffer = this.#encoder.encode(CharBuffer.wrap(s));

        return buffer.array();
    }
}
