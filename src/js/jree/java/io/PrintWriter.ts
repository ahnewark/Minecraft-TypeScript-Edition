/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// import printf from "printf";

import { char, double, float, int, long } from "../../types";
import { CharSequence } from "../lang/CharSequence";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";
import { JavaObject } from "../lang/Object";
import { JavaString } from "../lang/String";
import { Charset } from "../nio/charset/Charset";
import { Locale } from "../util/Locale";
import { JavaFile } from "./File";
import { FileOutputStream } from "./FileOutputStream";
import { OutputStream } from "./OutputStream";
import { OutputStreamWriter } from "./OutputStreamWriter";
import { Writer } from "./Writer";

/**
 * Prints formatted representations of objects to a text-output stream. This class implements all of the print
 * methods found in PrintStream. It does not contain methods for writing raw bytes, for which a program should use
 * unencoded byte streams.
 */
export class PrintWriter extends Writer {
    protected out: Writer;

    #autoFlush = false;

    /** Creates a new PrintWriter, without automatic line flushing, with the specified file. */
    public static async Construct(file: JavaFile): Promise<PrintWriter>;
    /** Creates a new PrintWriter, without automatic line flushing, with the specified file and charset. */
    public static async Construct(file: JavaFile, csn: JavaString | string): Promise<PrintWriter>;
    /** Creates a new PrintWriter, without automatic line flushing, with the specified file and charset. */
    public static async Construct(file: JavaFile, charset: Charset): Promise<PrintWriter>;
    /** Creates a new PrintWriter, without automatic line flushing, from an existing OutputStream. */
    public static async Construct(out: OutputStream): Promise<PrintWriter>;
    /** Creates a new PrintWriter from an existing OutputStream. */
    public static async Construct(out: OutputStream, autoFlush: boolean): Promise<PrintWriter>;
    /** Creates a new PrintWriter from an existing OutputStream. */
    public static async Construct(out: OutputStream, autoFlush: boolean, charset: Charset): Promise<PrintWriter>;
    /** Creates a new PrintWriter, without automatic line flushing. */
    public static async Construct(out: Writer): Promise<PrintWriter>;
    /** Creates a new PrintWriter. */
    public static async Construct(out: Writer, autoFlush: boolean): Promise<PrintWriter>;
    /** Creates a new PrintWriter, without automatic line flushing, with the specified file name. */
    public static async Construct(fileName: JavaString | string): Promise<PrintWriter>;
    /** Creates a new PrintWriter, without automatic line flushing, with the specified file name and charset. */
    public static async Construct(fileName: JavaString | string, csn: JavaString | string): Promise<PrintWriter>;
    /** Creates a new PrintWriter, without automatic line flushing, with the specified file name and charset. */
    public static async Construct(fileName: JavaString | string, charset: Charset): Promise<PrintWriter>;
    public static async Construct(...args: unknown[]): Promise<PrintWriter> {
        const _this = new PrintWriter();

        switch (args.length) {
            case 1: {
                const [arg] = args as [JavaFile | OutputStream | Writer | JavaString | string];
                if (arg instanceof JavaFile) {
                    _this.out = new OutputStreamWriter(await FileOutputStream.Construct(arg));
                } else if (arg instanceof OutputStream) {
                    _this.out = new OutputStreamWriter(arg);
                } else if (arg instanceof Writer) {
                    _this.out = arg;
                } else if (typeof arg === "string" || arg instanceof JavaString) {
                    _this.out = new OutputStreamWriter(await FileOutputStream.Construct(arg.toString()));
                } else {
                    throw new IllegalArgumentException("Invalid argument");
                }

                break;
            }

            case 2: {
                const [arg1, arg2] = args as [
                    JavaFile | OutputStream | Writer | JavaString | string, JavaString | string | Charset | boolean
                ];

                if (arg1 instanceof JavaFile) {
                    if (typeof arg2 === "string" || arg2 instanceof JavaString) {
                        _this.out = new OutputStreamWriter(await FileOutputStream.Construct(arg1), arg2);
                    } else if (arg2 instanceof Charset) {
                        _this.out = new OutputStreamWriter(await FileOutputStream.Construct(arg1), arg2);
                    } else {
                        _this.out = new OutputStreamWriter(await FileOutputStream.Construct(arg1));
                        _this.#autoFlush = arg2;
                    }

                } else if (arg1 instanceof OutputStream) {
                    if (typeof arg2 === "boolean") {
                        _this.out = new OutputStreamWriter(arg1);
                        _this.#autoFlush = arg2;
                    } else {
                        throw new IllegalArgumentException("Invalid argument");
                    }
                } else if (arg1 instanceof Writer) {
                    if (typeof arg2 === "boolean") {
                        _this.out = arg1;
                        _this.#autoFlush = arg2;
                    } else {
                        throw new IllegalArgumentException("Invalid argument");
                    }
                } else {
                    if (typeof arg2 === "string" || arg2 instanceof JavaString) {
                        _this.out = new OutputStreamWriter(await FileOutputStream.Construct(arg1.toString()), arg2.toString());
                    } else if (arg2 instanceof Charset) {
                        _this.out = new OutputStreamWriter(await FileOutputStream.Construct(arg1.toString()), arg2);
                    } else {
                        throw new IllegalArgumentException("Invalid argument");
                    }
                }

                break;
            }

            case 3: {
                const [out, autoFlush, charset] = args as [OutputStream, boolean, Charset];

                _this.out = new OutputStreamWriter(out, charset);
                _this.#autoFlush = autoFlush;

                break;
            }

            default: {
                throw new IllegalArgumentException("Invalid number of arguments");
            }
        }

        return _this;
    }

    /** Appends the specified character to this writer. */
    public override async append(c: char): Promise<this>;
    /** Appends the specified character sequence to this writer. */
    public override async append(csq: CharSequence): Promise<this>;
    /** Appends a subsequence of the specified character sequence to this writer. */
    public override async append(csq: CharSequence, start: int, end: int): Promise<this>;
    public override async append(...args: unknown[]): Promise<this> {
        switch (args.length) {
            case 1: {
                if (typeof args[0] === "number") {
                    await this.out.append(args[0]);
                } else {
                    await this.out.append(args[0] as CharSequence);
                }

                break;
            }

            case 3: {
                await this.out.append(args[0] as CharSequence, args[1] as int, args[2] as int);

                break;
            }

            default: {
                throw new IllegalArgumentException("Invalid number of arguments");
            }
        }

        if (this.#autoFlush) {
            await this.flush();
        }

        return this;
    }

    /**
     * Flushes the stream if it's not closed and checks its error state.
     *
     * @returns `true` if the print stream has encountered an error, either on the underlying output stream or during
     *          a format conversion.
     */
    public async checkError(): Promise<boolean> {
        await this.out.flush();

        return false;
    }

    /** Clears the error state of this stream. */
    public clearError(): void {
        // Nothing to do here.
    }

    /** Closes the stream and releases any system resources associated with it. */
    public async close(): Promise<void> {
        await this.out.close();
    }

    /** Flushes the stream. */
    public async flush(): Promise<void> {
        await this.out.flush();
    }

    /** Writes a formatted string to this writer using the specified format string and arguments. */
    public format(format: JavaString | string, ...args: unknown[]): this;
    /** Writes a formatted string to this writer using the specified format string and arguments. */
    public format(l: Locale, format: JavaString | string, ...args: unknown[]): this;
    public format(...args: unknown[]): this {
        console.error('PrintWriter.format is not yet implemented')
        // let index = 0;
        // if (args[0] instanceof Locale) {
        //     ++index; // Ignore the locale for now.
        // }

        // const text = printf(`${args[index]}`, args.slice(index + 1));
        // this.append(new JavaString(text));

        // if (this.#autoFlush) {
        //     this.flush();
        // }

        return this;
    }

    /** Prints a boolean value. */
    public print(b: boolean): void;
    /** Prints a character. */
    public print(c: char): void;
    /** Prints a character array. */
    public print(s: Uint16Array): void;
    /** Prints a double-precision floating-point number. */
    public print(d: double): void;
    /** Prints a floating-point number. */
    public print(f: float): void;
    /** Prints an integer. */
    public print(i: int): void;
    /** Prints a long integer. */
    public print(l: long): void;
    /** Prints an object. */
    public print(obj: JavaObject | null): void;
    /** Prints a string. */
    public print(s: JavaString | string): void;
    public print(...args: unknown[]): void {
        const s = JavaString.valueOf(args[0]);
        this.write(s);
    }

    /**
     * A convenience method to write a formatted string to this writer using the specified format string and arguments.
     */
    public printf(format: JavaString | string, ...args: unknown[]): this;
    /**
     * A convenience method to write a formatted string to this writer using the specified format string and arguments.
     */
    public printf(l: Locale, format: JavaString | string, ...args: unknown[]): this;
    public printf(...args: unknown[]): this {
        console.error('PrintWriter.printf is not yet implemented')
        // let index = 0;
        // if (args[0] instanceof Locale) {
        //     ++index; // Ignore the locale for now.
        // }

        // const text = printf(`${args[index]}`, args.slice(index + 1));
        // this.append(new JavaString(text));

        // if (this.#autoFlush) {
        //     this.flush();
        // }

        return this;
    }

    /** Terminates the current line by writing the line separator string. */
    public println(): void;
    /** Prints a boolean value and then terminates the line. */
    public println(b: boolean): void;
    /** Prints a character and then terminates the line. */
    public println(c: char): void;
    /** Prints a character array and then terminates the line. */
    public println(s: Uint16Array): void;
    /** Prints a double-precision floating-point number and then terminates the line. */
    public println(d: double): void;
    /** Prints a floating-point number and then terminates the line. */
    public println(f: float): void;
    /** Prints an integer and then terminates the line. */
    public println(i: int): void;
    /** Prints a long integer and then terminates the line. */
    public println(l: long): void;
    /** Prints an object and then terminates the line. */
    public println(obj: JavaObject | null): void;
    /** Prints a string and then terminates the line. */
    public println(s: JavaString | string): void;
    public println(...args: unknown[]): void {
        if (args.length > 0) {
            const s = JavaString.valueOf(args[0]);
            this.write(s);
        }

        this.write("\n");
    }

    /** Writes an array of characters. */
    public override write(buf: Uint16Array): void;
    /** Writes A Portion of an array of characters. */
    public override write(buf: Uint16Array, off: int, len: int): void;
    /** Writes a single character. */
    public override write(c: char): void;
    /** Writes a string. */
    public override write(s: JavaString | string): void;
    /** Writes a portion of a string. */
    public override write(s: JavaString | string, off: int, len: int): void;
    public override write(...args: unknown[]): void {
        switch (args.length) {
            case 1: {
                if (args[0] instanceof Uint16Array) {
                    this.out.write(args[0]);
                } else if (typeof args[0] === "number") {
                    this.out.write(args[0]);
                } else {
                    this.out.write(args[0] as JavaString | string);
                }

                break;
            }

            case 3: {
                const [buf, off, len] = args as [Uint16Array | JavaString | string, int, int];
                if (buf instanceof Uint16Array) {
                    this.out.write(buf, off, len);
                } else {
                    this.out.write(buf, off, len);
                }

                break;
            }

            default: {
                throw new IllegalArgumentException("Invalid number of arguments");
            }
        }
    }

    /** Indicates that an error has occurred. */
    protected setError(): void {
        // Nothing to do here.
    }
}
