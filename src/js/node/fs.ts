import { ByteBuffer } from '../jree/java/nio/ByteBuffer';
import { TypedArray } from '../jree/java/util/Arrays';
import { int } from '../jree/types';
import posixPath from './path';

export type FileSystemWritableFileStream = any;

const getOpfsPath = (path: string) => {
    let newPath = path;
    if (newPath.startsWith('/'))
        newPath = newPath.substring(1);
    if (newPath.endsWith('/'))
        newPath = newPath.substring(0, newPath.length - 1)

    return newPath;
}

const getFirstFolder = (path: string): string | undefined => {
    let folderIndex = path.indexOf('/');
    if (folderIndex == -1) return path;
    return path.substring(0, path.indexOf('/'));
}

type MkdirOptions = {
    recursive: boolean
}

const directoryExists = async (path: string, dirHandle: FileSystemDirectoryHandle): Promise<boolean> => {
    try {
        await dirHandle.getDirectoryHandle(path, {create: false});
        return true;
    } catch (error) {
        return false;
    }
}

const getNestedFolderHandle = async (path: string, dirHandle: FileSystemDirectoryHandle): Promise<FileSystemDirectoryHandle> => {    
    let opfsPath = getOpfsPath(path);

    let nestedFolderName: string;
    if (posixPath.basename(opfsPath).includes('.')) {
        opfsPath = posixPath.dirname(opfsPath);
    }
    if (opfsPath.indexOf('/') > -1) {
        nestedFolderName = opfsPath.substring(0, opfsPath.indexOf('/'))
    } else {
        nestedFolderName = opfsPath;
    }

    let remainingPath = opfsPath.substring(nestedFolderName.length);

    const thisDir = await dirHandle.getDirectoryHandle(nestedFolderName);

    if (!remainingPath)
        return thisDir;

    return await getNestedFolderHandle(remainingPath, thisDir);
}

const mkdirsRecurse = async (path: string, dirHandle: FileSystemDirectoryHandle, recursiveCreate: boolean) => {
    const opfsPath = getOpfsPath(path);
    const firstFolder = getFirstFolder(opfsPath);
    const remainingPath = opfsPath.substring(firstFolder.length + 1);
    try {
        const exists = await directoryExists(getOpfsPath(firstFolder), dirHandle);
        if (exists && remainingPath.length == 0) return false;
        if (!exists && remainingPath.length > 0 && !recursiveCreate) return false;

        const newDirHandle = await dirHandle.getDirectoryHandle(getOpfsPath(firstFolder), { create: true });
        if (remainingPath.length > 0) {
            return await mkdirsRecurse(remainingPath, newDirHandle, recursiveCreate);
        } else {
            return true;
        }
    } catch (error) {
        console.error('Failed to recursively make directories', error);
        return false;
    }
}

const mkdirAsync = async (path: string, options: MkdirOptions): Promise<boolean> => {
    console.log('Making directory ', path);
    try {
        const root = await navigator.storage.getDirectory();
        return await (mkdirsRecurse(path, root, options.recursive));
    } catch (error) {
        return false;
    }
}

const mkdirSync = (
    path: string, options: MkdirOptions = {
        recursive: false}
    ) => 
{
    let settled = false;
    let res = false;
    mkdirAsync(path, options)
        .then(data => res = data)
        .finally(() => settled = true)

    while (!settled) {
        // wait
    }

    return res;
}

type OpenModes = 'as' | 'w' | 'r';

const openAsync = async (path: string, openMode: OpenModes, unk1: number) => {
    console.log('Opening file ', path, openMode);
    const root = await navigator.storage.getDirectory();
    const folder = await getNestedFolderHandle(path, root);
    const fileName = posixPath.basename(path);
    const handle = await folder.getFileHandle(fileName, { create: openMode == 'as' || openMode == 'w'});

    if (openMode === 'as' || openMode === 'w')
        return await await (handle as any).createWritable();

    // console.log({path, fileName, folder, handle})

    return handle;
}

const existsAsync = async (path: string) => {
    console.log('checking if file exists ', path);
    const root = await navigator.storage.getDirectory();
    
    let folder: FileSystemDirectoryHandle;
    try {
        folder = await getNestedFolderHandle(path, root);
    } catch(error) {
        return false;
    }
    
    const fileName = posixPath.basename(path);

    // console.log({folder, fileName});

    try {
        await folder.getFileHandle(fileName, { create: false});
        console.log('... it does');
        return true;
    } catch (error) {
        try {
            await folder.getDirectoryHandle(fileName, {create: false});
            console.log('... it does');
            return true
        } catch (err) {

        }
    }
    console.log('... it does not');
    return false;
}

const openSync = (path: string, openMode: OpenModes, unk1: number) => {
    let settled = false;
    let res;
    openAsync(path, openMode, unk1)
        .then(data => res = data)
        .finally(() => settled = true)

    while (!settled) {
        // wait
    }

    // console.log({res, settled})

    return res;
}

const isTypedArray = (function() {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    return (obj) => obj instanceof TypedArray;
  })();
  

const writeAsync = async (writable: FileSystemWritableFileStream, buffer: ArrayBuffer | TypedArray | DataView | Blob | String | string, offset: number = 0, length: number = 0, position?: number): Promise<void> => {
    console.log('writing to file', {writable, buffer, offset, length, position})
    // if (position === undefined) {
    //     // console.log(file);
    //     position = ((await writable.getFile()).size);
    // }
    // const writable = await (fileHandle as any).createWritable();

    let trimmed = buffer;

    if (length) {
        if (buffer instanceof ArrayBuffer)
            trimmed = buffer.slice(offset, length);
        if (isTypedArray(buffer))
            trimmed = (buffer as TypedArray).slice(offset, length);
        if (buffer instanceof DataView)
            throw new Error('DataView Writing not yet implemented.')
        if (buffer instanceof Blob)
            trimmed = buffer.slice(offset, length)
        if (typeof buffer === 'string')
            trimmed = buffer.substring(offset, length)
    }

    // console.log({type: 'write', position, data: trimmed, length});
    await writable.write({type: 'write', position, data: trimmed});
    // await writable.close();
    // console.log({fileHandle});
    // let settled = false;
    // let res;
    // openAsync(path, openMode, unk1)
    //     .then(data => res = data);

    // while (!settled) {
    //     // wait
    // }

    // return res;
}

const readAsync = async (fileHandle: FileSystemFileHandle, buffer: Int8Array, offset: number, length: number, position: bigint): Promise<number> => {
    // console.error('readAsync is not yet implemented.');
    console.log('Reading file', {fileHandle, buffer, position, length})
    const file = await fileHandle.getFile();
    const arrayBuffer = new Int8Array(await file.slice(Number(position), Number(position) + length).arrayBuffer());
    for (let i = 0; i < arrayBuffer.byteLength; i++) {
        buffer[i] = arrayBuffer[i];
    }
    // console.log('test', file.size, await file.slice(Number(position), Number(position) + length).arrayBuffer())
    // const reader = file.stream().getReader();
    // console.log({file, reader})
    // await reader.read(Number(position));
    // const readBuffer = await reader.read(length);
    // console.log({readBuffer});

    // console.log({buffer, arrayBuffer});

    return arrayBuffer ? arrayBuffer.byteLength : 0;
}

export type StatOPtions = {
    bigint?: boolean;
    throwIfNoEntry?: boolean;
}

export type Stats = {
    size: number | bigint;
}

const statAsync = async (path: string, options: StatOPtions): Promise<Stats> => {
    console.log(path);
    console.log(await existsAsync(path));

    const handle = await openAsync(path, 'r', 0) as FileSystemFileHandle;
    console.log(handle);
    const size = (await handle.getFile()).size;
    if (options.bigint)
        return { size: BigInt(size) }
    else
        return {size};
}

type DeleteOptions = {
    force?: boolean;
    maxRetries?: number;
    recursive?: boolean;
    retryDelay?: number;
}

const deleteAsync = async (path, options?: DeleteOptions) => {
    console.log('delete', path);
    const dir = await getNestedFolderHandle(path, await navigator.storage.getDirectory());
    const basename = posixPath.basename(path);
    await dir.removeEntry(basename);
}

const renameAsync = async (oldPath: string, newPath: string) => {
    console.log('renaming', oldPath, newPath);
    if (!await existsAsync(oldPath))
        throw new Error('Cant rename file as it does not exist.')
    const oldFileHandle = await openAsync(oldPath, 'r', 0) as FileSystemFileHandle;
    const oldFile = await oldFileHandle.getFile()
    const newHandle = await openAsync(newPath, 'w', 0);
    await writeAsync(newHandle, await oldFile.arrayBuffer());
    await newHandle.close();
    await deleteAsync(oldPath);
}

const closeAsync = async (handle: FileSystemFileHandle | FileSystemWritableFileStream) => {
    console.log('closing', handle)
    if (handle.close)
        await handle.close();
}

export {
    mkdirAsync,
    openAsync,
    writeAsync,
    existsAsync,
    readAsync,
    statAsync,
    deleteAsync,
    renameAsync,
    closeAsync
}