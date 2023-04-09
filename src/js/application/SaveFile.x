import axios from "axios";

export default class SaveFile {
    private path: string;
    
    private opfsPath() {
        return this.path;
    }

    constructor(path: string);

    constructor(folder: SaveFile, file: string);

    constructor(...args) {
        switch (args.length) {
            case 1: {
                this.path = args[0] as string;
                break;
            }
            case 2: {
                this.path = `${(args[0] as SaveFile).path}/${args[1]}`;
            }
        }
    }

    public mkdir(): void {}

    private async existsAsync(): Promise<boolean> {
        const root = await navigator.storage.getDirectory();

        try {
            await root.getFileHandle(this.opfsPath(), { create: false });
            return true;
        } catch (err) {
            return false;
        }
    }

    public exists(): boolean {
        let settled = false;
        let res = false;

        this.existsAsync()
            .then(data => res = data)
            .finally(() => settled = true);

        while (!settled) {
            // wait
        }

        return res;
    }

    private async lengthAsync(): Promise<number> {
        const root = await navigator.storage.getDirectory();

        const handle = await root.getFileHandle(this.opfsPath(), { create: false });
        const file = await handle.getFile();
        return file.size;
    }

    public length(): number {
        let settled = false;
        let res = -1;

        this.lengthAsync()
            .then(data => res = data)
            .catch(() => {})
            .finally(() => settled = true);

        while (!settled) {
            // wait...
        }

        if (res == -1) {
            throw Error('Failed to get file length.');
        }

        return res;
    }

    public async deleteAsync(): Promise<void> {
        if (await this.existsAsync()) {
            const dir = await navigator.storage.getDirectory();
            await dir.removeEntry(this.opfsPath());
        }
    }

    public delete(): void {
        let settled = false;

        this.deleteAsync()
            .finally(() => settled = true);

        while (!settled) {
            // wait...
        }
    }

    public async renameToAsync(newPath: string): Promise<void> {
        if (await this.existsAsync()) {
            const dir = await navigator.storage.getDirectory();
            const oldPath = this.opfsPath();
            const oldHandle = await dir.getFileHandle(oldPath);
            const file = await oldHandle.getFile();
            this.path = newPath;
            // TODO: Types
            const newHandle = await dir.getFileHandle(this.opfsPath(), { create: true }) as any;
            const writable = await newHandle.createWritable();
            await writable.write(file.arrayBuffer);
            await writable.close();
            dir.getFileHandle
            await dir.removeEntry(oldPath);
        }
    }

    public renameTo(newPath: SaveFile) {
        let settled = false;

        this.renameToAsync(newPath.path)
            .finally(() => settled = true);

        while (!settled) {
            // wait...
        }
    }

    // // TODO: Properly Type
    // private getDirectoryEntriesRecursive = async (
    //     directoryHandle,
    //     relativePath = '.',
    //   ) => {
    //     const fileHandles: {handle: string, nestedPath: string}[] = [];
    //     const directoryHandles: {handle: string, nestedPath: string}[] = [];
    //     const entries = {};
    //     // Get an iterator of the files and folders in the directory.
    //     const directoryIterator = directoryHandle.values();
    //     const directoryEntryPromises: Promise<any>[] = [];
    //     for await (const handle of directoryIterator) {
    //       const nestedPath = `${relativePath}/${handle.name}`;
    //       if (handle.kind === 'file') {
    //         fileHandles.push({ handle, nestedPath });
    //       } else if (handle.kind === 'directory') {
    //         directoryHandles.push({ handle, nestedPath });
    //         directoryEntryPromises.push(this.getDirectoryEntriesRecursive(handle, nestedPath));
    //       }
    //     }
    //     const directoryEntries = await Promise.all(directoryEntryPromises);
    //     directoryEntries.forEach((directoryEntry) => {
    //       entries[directoryEntry.name] = directoryEntry;
    //     });
    //     return entries;
    //   };

    public async listFilesAsync(): Promise<SaveFile[]> {
        // const dir = await navigator.storage.getDirectory();
        // const dirHandle = await dir.getDirectoryHandle(this.opfsPath());
        // for await (let [name, handle] of getDirectoryEntriesRecursive) {}
            
        // }

        // TODO: Implement
        return [];
    }

    public listFiles(): SaveFile[] {
        let settled = false;
        let res: SaveFile[] = [];

        this.listFilesAsync()
            .then(data=> {res = data})
            .finally(() => settled = true);

        while (!settled) {
            // wait...
        }

        return res;
    }


    public async isDirectoryAsync(): Promise<boolean> {
        const dir = await navigator.storage.getDirectory();
        try {
            await dir.getFileHandle(this.opfsPath());
            return true;
        } catch (error) {
            return false;
        }
    }

    public isDirectory(): boolean {
        let settled = false;
        let res: boolean = false;

        this.isDirectoryAsync()
            .then(data=> {res = data})
            .finally(() => settled = true);

        while (!settled) {
            // wait...
        }

        return res;
    }

    public mkdirs(): void {}
}