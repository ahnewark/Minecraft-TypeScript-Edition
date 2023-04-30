import './new/index';
import { JavaFile } from "./jree/java/io/File";
import { S } from "./jree/templates";
import { ChunkProviderLoadOrGenerate } from "./new/ChunkProviderLoadOrGenerate";
import { EntityPlayer } from "./new/EntityPlayer";
import { EntityPlayerSP } from "./new/EntityPlayerSP";
import { IProgressUpdate } from "./new/IProgressUpdate";
import { Session } from "./new/Session";
import { World } from "./new/World";
import { mkdirAsync, openAsync, readAsync, statAsync } from './node/fs';
import JSZip from 'jszip';

class ProgressUpdateDOM implements IProgressUpdate {
    func_594_b(string1: string): void {
        // throw new Error("Method not implemented.");
    }
    displayLoadingString(string1: string): void {
        showText(string1);
    }
    setLoadingProgress(i1: number): void {
        showProgress(Math.floor(i1));
        // throw new Error("Method not implemented.");
    }
    
}

const func_6255_d = async (theWorld: World, string1: string) => {
    showText(string1);
    showText("Building terrain");
    let s2 = 128;
    let i3 = 0;
    let  i4 = s2 * 2 / 16 + 1;
    i4 *= i4;
    let iChunkProvider5 = theWorld.func_21118_q();
    let i6 = theWorld.spawnX;
    let i7 = theWorld.spawnZ;

    if(iChunkProvider5 instanceof ChunkProviderLoadOrGenerate) {
        let chunkProviderLoadOrGenerate8 = iChunkProvider5;
        chunkProviderLoadOrGenerate8.func_21110_c(i6 >> 4, i7 >> 4);
    }


    // const loadChunkPromises = []
    for(let i11 = -s2; i11 <= s2; i11 += 16) {
        for(let i9 = -s2; i9 <= s2; i9 += 16) {
            // loadChunkPromises.push((async ()=> {
                await theWorld.getBlockId(i6 + i11, 64, i7 + i9);
                while(await theWorld.lighting_func_6465_g()) {
                }
            // })())
            // this.loadingScreen.setLoadingProgress(i3++ * 100 / i4);
            
        }
    }

    // await Promise.all(loadChunkPromises);

    showText("Simulating world for a bit");
    let z10 = true;
    theWorld.func_656_j();
}

const changeWorld = async (world1: World, string2: string, entityPlayer3: EntityPlayer) => {
    showText(string2);
    console.log("Player is " + entityPlayer3);
    if(world1 != null) {
        if(!world1.multiplayerWorld) {
            await func_6255_d(world1, string2);
        }

        let iChunkProvider4 = world1.func_21118_q();
        if(iChunkProvider4 instanceof ChunkProviderLoadOrGenerate) {
            let chunkProviderLoadOrGenerate5 = iChunkProvider4;
            chunkProviderLoadOrGenerate5.func_21110_c(0, 0);
        }

        await world1.spawnPlayer(new EntityPlayerSP(world1, new Session('craftycodie', 'foo'), 0));
        if(world1.isNewWorld) {
            await world1.func_651_a(new ProgressUpdateDOM());
        }
    }
}

const root = document.getElementById('content');
// document.appendChild(root);

const showProgress = (progress: number) => {
    let div = document.getElementById('progress')
    if (!div) {
        div = document.createElement('progress');
        div.setAttribute('id', 'progress');
        div.setAttribute('max', '100')
        root.appendChild(div);
    }

    div.setAttribute('value', ''+ progress);
    div.textContent = progress + '%'
}

const showText = (text: string) => {
    const div = document.createElement('div');
    root.appendChild(div);
    div.appendChild(document.createTextNode(text));
}


const main = async() => {
    showText('World Test');

    await mkdirAsync(`/minecraft/saves/Test2`, { 'recursive': true})

    const world = await World.Construct(new JavaFile(S`/minecraft/saves`), 'Test3');
    if (world.isNewWorld) {
        await changeWorld(world, 'Generating level', null);
    } else {
        await changeWorld(world, 'Loading level', null);
    }

    return world;

}

const getDirectoryEntriesRecursive = async (
    directoryHandle,
    relativePath = '.',
  ) => {
    const fileHandles = [];
    const directoryHandles = [];
    const entries = {};
    // Get an iterator of the files and folders in the directory.
    const directoryIterator = directoryHandle.values();
    const directoryEntryPromises = [];
    for await (const handle of directoryIterator) {
      const nestedPath = `${relativePath}/${handle.name}`;
      if (handle.kind === 'file') {
        fileHandles.push({ handle, nestedPath });
        directoryEntryPromises.push(
          handle.getFile().then((file) => {
            return {
              name: handle.name,
              kind: handle.kind,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
              relativePath: nestedPath,
              handle
            };
          }),
        );
      } else if (handle.kind === 'directory') {
        directoryHandles.push({ handle, nestedPath });
        directoryEntryPromises.push(
          (async () => {
            return {
              name: handle.name,
              kind: handle.kind,
              relativePath: nestedPath,
              entries:
                  await getDirectoryEntriesRecursive(handle, nestedPath),
              handle,
            };
          })(),
        );
      }
    }
    const directoryEntries = await Promise.all(directoryEntryPromises);
    directoryEntries.forEach((directoryEntry) => {
      entries[directoryEntry.name] = directoryEntry;
    });
    return entries;
  };

const zipWorld = async (path: string): Promise<JSZip> => {
    const root = await openAsync(path, 'r', 0);
    const zip = new JSZip();
    await addFolderToZip('', root, zip);
    return zip;
}

const addFolderToZip = async (folderName: string, handle: FileSystemDirectoryHandle, zip: JSZip) => {
    const iterator = handle.values();
    // console.log('addFolderToZip', {folderName, handle});
    let childObj = await iterator.next();

    while(childObj.done === false) {
        const childHandle = childObj.value;
        if (childHandle.kind === 'directory') {
            await addFolderToZip(`${folderName}/${childHandle.name}`, childHandle, zip);
        }
        else {
            const childFile = await childHandle.getFile()
            // console.debug('adding file', `${folderName}/${childHandle.name}`);
            zip.file(`${folderName}/${childHandle.name}`, await childFile.arrayBuffer());
        }

        childObj = await iterator.next();
    }

}

const test = async () => {
    await main();
    // const worldZip = new JSZip();
    showText("Zipping...");

    const testWorldPath = '/minecraft/saves/Test2'
    const worldZip = await zipWorld(testWorldPath);

    // const testWorldFolder = await openAsync(testWorldPath, 'r', 0);

    // const levelHandle = await openAsync(testWorldPath + '/level.dat', "r", 0);
    // const levelSize = (await statAsync(testWorldPath + '/level.dat', { bigint: false })).size as number;
    // const levelData = new Int8Array(levelSize);
    // await readAsync(levelHandle, levelData, 0, levelSize, 0n)
    // worldZip.file('level.dat', levelData.buffer);
    const zipData = await worldZip.generateAsync({ 'type': 'arraybuffer'});
    var file = new Blob([zipData], {type: "application/octet-binary;charset=utf-8"});
		var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'World4.zip';
		document.body.appendChild(a);
		a.click();
    
}



export { main, test };