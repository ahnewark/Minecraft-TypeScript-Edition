/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { JavaString } from "../lang/index";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";
import { Charset } from "../nio/charset/Charset";
import { JavaFile } from "./File";
import { FileDescriptor } from "./FileDescriptor";
import { FileInputStream } from "./FileInputStream";
import { InputStreamReader } from "./InputStreamReader";

export class FileReader extends InputStreamReader {

    /** Creates a new FileReader, given the File to read, using the platform's default charset. */
    public static async Construct(file: JavaFile): Promise<FileReader>;
    /** Creates a new FileReader, given the FileDescriptor to read, using the platform's default charset. */
    public static async Construct(fd: FileDescriptor): Promise<FileReader>;
    /** Creates a new FileReader, given the File to read and the charset. */
    public static async Construct(file: JavaFile, charset: Charset): Promise<FileReader>;
    /** Creates a new FileReader, given the name of the file to read, using the platform's default charset. */
    public static async Construct(fileName: JavaString | string): Promise<FileReader>;
    /** Creates a new FileReader, given the name of the file to read and the charset. */
    public static async Construct(fileName: JavaString | string, charset: Charset): Promise<FileReader>;
    public static async Construct(...args: unknown[]): Promise<FileReader> {

        switch (args.length) {
            case 1: {
                const arg = args[0] as JavaFile | FileDescriptor | JavaString | string;

                if (arg instanceof JavaFile) {
                    return new FileReader(await FileInputStream.Construct(arg));
                } else if (arg instanceof FileDescriptor) {
                    return new FileReader(await FileInputStream.Construct(arg));
                } else {
                    return new FileReader(await FileInputStream.Construct(arg));
                }

                break;
            }

            case 2: {
                const [arg1, charset] = args as [JavaFile | FileDescriptor | JavaString | string, Charset];
                if (arg1 instanceof JavaFile) {
                    return new FileReader(await FileInputStream.Construct(arg1), charset);
                } else if (arg1 instanceof FileDescriptor) {
                    return new FileReader(await FileInputStream.Construct(arg1), charset);
                } else {
                    return new FileReader(await FileInputStream.Construct(arg1), charset);
                }

                break;
            }

            default: {
                throw new IllegalArgumentException(new JavaString("Invalid number of arguments"));
            }
        }
    }
}
