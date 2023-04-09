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
                    output = new FileOutputStream(arg);
                } else if (arg instanceof OutputStream) {
                    output = arg;
                } else {
                    output = new FileOutputStream(arg);
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

                    output = new FileOutputStream(file);
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

                    output = new FileOutputStream(fileName);
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
                throw new IllegalArgumentException(new JavaString("Invalid int of arguments"));
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
    public append(c: char): PrintStream;
    /** Appends the specified character sequence to this output stream. */
    public append(csq: CharSequence | null): PrintStream;
    /** Appends a subsequence of the specified character sequence to this output stream. */
    public append(csq: CharSequence | null, start: int, end: int): PrintStream;
    public append(...args: unknown[]): PrintStream {
        if (args.length === 1) {
            const arg = args[0] as char | CharSequence | null;
            if (typeof arg === "number") {
                this.write(arg);
            } else {
                const s = arg ?? new JavaString("null");
                const buffer = this.encode(s);
                this.out.write(buffer);
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
            this.write(buffer);
        }

        return this;
    }

    /**
     * Flushes the stream and checks its error state.
     *
     * @returns `true` if the print stream has encountered an error, either on the underlying output stream or during
     *           a format conversion.
     */
    public checkError(): boolean {
        try {
            this.out.flush();
        } catch (e) {
            this.#haveError = true;
        }

        return this.#haveError;
    }

    /** Closes the stream. */
    public override close(): void {
        this.out.close();
    }

    /** Flushes the stream. */
    public override flush(): void {
        this.out.flush();
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
    public print(b: boolean): void;
    /** Prints a character. */
    public print(c: char): void;
    /** Prints an array of characters. */
    public print(s: Uint16Array): void;
    /** Prints a double-precision floating-point int. */
    public print(d: double): void;
    /** Prints a floating-point int. */
    public print(f: float): void;
    /** Prints an integer. */
    public print(i: int): void;
    /** Prints a long integer. */
    public print(l: long): void;
    /** Prints an object. */
    public print(obj: JavaObject | null): void;
    /** Prints a string. */
    public print(str: JavaString | null): void;
    public print(v: unknown): void {
        if (v === null) {
            this.append(new JavaString("null"));
        } else if (v instanceof JavaString) {
            this.append(v);
        } else {
            this.append(new JavaString(`${v}`));
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
    public println(): void;
    /** Prints a boolean and then terminate the line. */
    public println(b: boolean): void;
    /** Prints a character and then terminate the line. */
    public println(c: char): void;
    /** Prints an array of characters and then terminate the line. */
    public println(s: Uint16Array): void;
    /** Prints a double and then terminate the line. */
    public println(d: double): void;
    /** Prints a float and then terminate the line. */
    public println(f: float): void;
    /** Prints an integer and then terminate the line. */
    public println(i: int): void;
    /** Prints a long and then terminate the line. */
    public println(l: long): void;
    /** Prints an object and then terminate the line. */
    public println(obj: JavaObject | null): void;
    /** Prints a string and then terminate the line. */
    public println(str: JavaString | string): void;
    public println(v?: unknown): void {
        if (v !== undefined) {
            if (v === null) {
                const buffer = this.encode(new JavaString("null"));
                this.write(buffer);
            } else if (v instanceof JavaString) {
                const buffer = this.encode(v);
                this.write(buffer);
            } else {
                const buffer = this.encode(new JavaString(`${v}`));
                this.write(buffer);
            }
        }

        this.print(PrintStream.#lineSeparator);
        if (this.#autoFlush) {
            this.flush();
        }
    }

    public override async write(b: Int8Array): Promise<void>;
    public override async write(b: Int8Array, off: int, len: int): Promise<void>;
    public override async write(b: int): Promise<void>;
    public override async write(...args: unknown[]): Promise<void> {
        if (args.length === 1) {
            const b = args[0] as Int8Array | int;
            if (b instanceof Int8Array) {
                this.out.write(b, 0, b.length);
            } else {
                this.out.write(b);
            }
        } else {
            const [b, off, len] = args as [Int8Array, int, int];
            this.out.write(b.subarray(off, off + len));
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
