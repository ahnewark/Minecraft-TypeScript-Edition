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

const getNestedFolderHandle = async (path: string, root: FileSystemDirectoryHandle): Promise<FileSystemDirectoryHandle> => {    
    // console.log('getNestedFolderHandle', path)
    if (path.startsWith('/'))
        path = path.substring(1);
    const directoies = path.split(posixPath.sep);
    if (directoies.length > 1) {
        const subDirectory = await root.getDirectoryHandle(directoies[0]);
        const remainingPath = path.substring(directoies[0].length);
        return await getNestedFolderHandle(remainingPath, subDirectory);
    }
    return root;
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
    // console.debug('Making directory ', path);
    try {
        const root = await navigator.storage.getDirectory();
        return await (mkdirsRecurse(path, root, options.recursive));
    } catch (error) {
        return false;
    }
}

type OpenModes = 'as' | 'w' | 'r';

const currentHandles: Map<(FileSystemFileHandle | FileSystemWritableFileStream), string> = new Map();


const openAsync = async (path: string, openMode: OpenModes, unk1: number): Promise<FileSystemFileHandle | FileSystemWritableFileStream> => {
    // console.debug('Opening file ', path, openMode);
    // console.trace();
    const root = await navigator.storage.getDirectory();
    const folder = await getNestedFolderHandle(path, root);
    const fileName = posixPath.basename(path);

    // console.log({fileName});

    // if (!fileName.includes('.'))
    //     return folder;
    
    let handle: FileSystemDirectoryHandle | FileSystemFileHandle;
    try {
        handle = await folder.getFileHandle(fileName, { create: openMode == 'as' || openMode == 'w'});
    } catch (err) {
        handle = await folder.getDirectoryHandle(fileName, { create: openMode == 'as' || openMode == 'w'});
    }

    if ((openMode === 'as' || openMode === 'w') && handle.kind === 'file')
        handle = await (handle as any).createWritable();

    // console.log({path, fileName, folder, handle})

    (handle as any).path = path;

    if (Array.from(currentHandles.values()).find(potential => potential === path))
        console.error('Opening a second handle for ' + path + '! This bad!')

    currentHandles.set(handle, path);

    return handle;
}

const existsAsync = async (path: string) => {
    // console.debug('checking if file exists ', path);
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
        // console.debug('... it does');
        return true;
    } catch (error) {
        try {
            await folder.getDirectoryHandle(fileName, { create: false});
            // console.debug('... it does');
            return true
        } catch (err) {

        }
    }
    // console.debug('... it does not');
    return false;
}

const isTypedArray = (function() {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    return (obj) => obj instanceof TypedArray;
  })();
  

const writeAsync = async (writable: FileSystemWritableFileStream, buffer: ArrayBuffer | TypedArray | DataView | Blob | String | string, offset: number = 0, length: number = 0, position?: number): Promise<void> => {
    // console.debug('writing to file', {writable, buffer, offset, length, position})
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
    // console.debug('Reading ', fileHandle.path)
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
    // console.debug('stat' + path);
    // console.log(await existsAsync(path));

    const handle = await openAsync(path, 'r', 0) as FileSystemFileHandle;
    // console.log(handle);
    const size = (await handle.getFile()).size;

    // console.debug('size', size)
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
    // console.debug('delete', path);
    const dir = await getNestedFolderHandle(path, await navigator.storage.getDirectory());
    const basename = posixPath.basename(path);
    await dir.removeEntry(basename);
    await Promise.all(Array.from(currentHandles.keys()).map(handle => {
        if (handle.path === path)
            return closeAsync(handle);
    }))
}

const renameAsync = async (oldPath: string, newPath: string) => {
    // console.debug('renaming', oldPath, newPath);
    if (!await existsAsync(oldPath))
        throw new Error('Cant rename file as it does not exist.')
    const oldFileHandle = await openAsync(oldPath, 'r', 0) as FileSystemFileHandle;
    const oldFile = await oldFileHandle.getFile()
    const newHandle = await openAsync(newPath, 'w', 0);
    await writeAsync(newHandle, await oldFile.arrayBuffer());
    await closeAsync(newHandle);
    await closeAsync(oldFileHandle);
    await deleteAsync(oldPath);
}

const closeAsync = async (handle: FileSystemFileHandle | FileSystemWritableFileStream) => {
    // console.debug('closing', handle.path)
    // console.trace();
    if (handle.close)
        await handle.close();

    currentHandles.delete(handle);
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