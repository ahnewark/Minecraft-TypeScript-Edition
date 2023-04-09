import { ByteBuffer } from '../jree/java/nio/ByteBuffer';
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
    const opfsPath = getOpfsPath(path);
    let nestedFolderName: string;
    if (opfsPath.indexOf('/') > -1) {
        nestedFolderName = opfsPath.substring(0, opfsPath.indexOf('/'))
    } else if (opfsPath.indexOf('.') == 0) {
        nestedFolderName = opfsPath;
    }

    if (nestedFolderName == undefined)
        return dirHandle;

    return await dirHandle.getDirectoryHandle(nestedFolderName);
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

    switch (openMode) {
        case 'as':
        case 'w':
            const writable = await (handle as any).createWritable();
            console.log('writable for ', path, writable);
            return writable;
        case 'r':
            return handle;
    }
}

const existsAsync = async (path: string) => {
    console.log('checking if file exists ', path);
    const root = await navigator.storage.getDirectory();
    const folder = await getNestedFolderHandle(path, root);
    const fileName = posixPath.basename(path);
    try {
        await folder.getFileHandle(fileName, { create: false});
        console.log('... it does');
        return true;
    } catch (error) {
        console.log('... it does not');
        return false;
    }
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

    console.log({res, settled})

    return res;
}

const writeAsync = async (fileHandle: FileSystemWritableFileStream, buffer: Int8Array, offset: number = 0, length: number = 0, position: number = 0): Promise<void> => {
    console.log('writing to file', {fileHandle, buffer, offset, length, position})
    await fileHandle.write({type: 'write', position, data: buffer});
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
    console.error('readAsync is not yet implemented.');
    console.log('Reading file', {fileHandle, buffer, position, length})
    const file = await fileHandle.getFile();
    //buffer(new Int8Array((await file.arrayBuffer()).slice(0, length)));
    // let settled = false;
    // let res;
    // openAsync(path, openMode, unk1)
    //     .then(data => res = data);

    // while (!settled) {
    //     // wait
    // }

    // return res;
}

export {
    mkdirAsync,
    openAsync,
    writeAsync,
    existsAsync,
    readAsync,
}