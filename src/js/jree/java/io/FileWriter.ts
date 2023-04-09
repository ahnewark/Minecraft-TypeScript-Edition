/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { JavaString } from "../..";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";
import { Charset } from "../nio/charset/Charset";
import { JavaFile } from "./File";
import { FileDescriptor } from "./FileDescriptor";
import { FileOutputStream } from "./FileOutputStream";
import { OutputStreamWriter } from "./OutputStreamWriter";
import { PrintStream } from "./PrintStream";

/**
 * Writes text to character files using a default buffer size. Encoding from characters to bytes uses either a
 * specified charset or the platform's default charset.
 */
export class FileWriter extends OutputStreamWriter {
    /** Constructs a FileWriter given the File to write, using the platform's default charset */
    public static async Construct(file: JavaFile): Promise<PrintStream>;
    /** Constructs a FileWriter given a file descriptor, using the platform's default charset. */
    public static async Construct(fd: FileDescriptor): Promise<PrintStream>;
    /**
     * Constructs a FileWriter given the File to write and a boolean indicating whether to append the data written,
     * using the platform's default charset.
     */
    public static async Construct(file: JavaFile, append: boolean): Promise<PrintStream>;
    /** Constructs a FileWriter given the File to write and charset. */
    public static async Construct(file: JavaFile, charset: Charset): Promise<PrintStream>;
    /**
     * Constructs a FileWriter given the File to write, charset and a boolean indicating whether to append the data
     * written.
     */
    public static async Construct(file: JavaFile, charset: Charset, append: boolean): Promise<PrintStream>;
    /** Constructs a FileWriter given the file name, using the platform's default charset. */
    public static async Construct(fileName: JavaString): Promise<PrintStream>;
    /**
     * Constructs a FileWriter given the file name and a boolean indicating whether to append the data written,
     * using the platform's default charset.
     */
    public static async Construct(fileName: JavaString, append: boolean): Promise<PrintStream>;
    /** Constructs a FileWriter given the file name and charset. */
    public static async Construct(fileName: JavaString, charset: Charset): Promise<PrintStream>;
    /**
     * Constructs a FileWriter given the file name, charset and a boolean indicating whether to append the data
     * written.
     */
    public static async Construct(fileName: JavaString, charset: Charset, append: boolean): Promise<PrintStream>;
    public static async Construct(...args: unknown[]): Promise<PrintStream> {
        let charset = Charset.defaultCharset();
        let stream;

        switch (args.length) {
            case 1: {
                const arg = args[0] as JavaFile | FileDescriptor | JavaString;
                if (arg instanceof JavaFile) {
                    stream = await FileOutputStream.Construct(arg);
                } else if (arg instanceof FileDescriptor) {
                    stream = await FileOutputStream.Construct(arg);
                } else {
                    stream = await FileOutputStream.Construct(arg);
                }
                break;
            }

            case 2: {
                const [arg1, arg2] = args as [JavaFile | JavaString, boolean | Charset];
                let append = false;
                if (typeof arg2 === "boolean") {
                    append = arg2;
                } else {
                    charset = arg2;
                }

                if (arg1 instanceof JavaFile) {
                    stream = await FileOutputStream.Construct(arg1, append);
                } else {
                    stream = await FileOutputStream.Construct(arg1, append);
                }

                break;
            }

            case 3: {
                const [arg1, arg2, arg3] = args as [JavaFile | JavaString, Charset, boolean];
                charset = arg2;
                if (arg1 instanceof JavaFile) {
                    stream = await FileOutputStream.Construct(arg1, arg3);
                } else {
                    stream = await FileOutputStream.Construct(arg1, arg3);
                }

                break;
            }

            default: {
                throw new IllegalArgumentException(new JavaString("Invalid number of arguments"));
            }
        }
        return new PrintStream(stream, charset);
    }
}
