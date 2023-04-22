import Chunk from "../Chunk.js";
import World from "../World.js";

export default class ChunkProvider {

    private world: World;
    private chunks: Map<number, Chunk>;

    constructor(world) {
        this.world = world;
        this.chunks = new Map();
    }

    chunkExists(x, z) {
        let index = x + (z << 16);
        let chunk = this.chunks.get(index);
        return typeof chunk !== 'undefined';
    }

    async getChunkAt(x, z) {
        let index = x + (z << 16);
        let chunk = this.chunks.get(index);
        // console.log('getting chunk', {x, z, index, chunk: !chunk})
        if (!chunk) {
            chunk = await this.loadChunk(x, z);
        }
        this.chunks.set(index, chunk)
        return chunk;
    }

    async generateChunk(x, z) {
        let chunk = new Chunk(this.world, x, z);
        await chunk.generateSkylightMap();
        await chunk.generateBlockLightMap();
        return chunk;
    }

    populateChunk(chunk) {

    }

    async loadChunk(x, z) {
        let index = x + (z << 16);
        let chunk = this.chunks.get(index);

        if (chunk && chunk.loaded) return chunk
        console.log('loading chunk', {x, z, chunk})


        chunk = await this.generateChunk(x, z)

        // Register and mark as loaded
        chunk.loaded = true;
        this.chunks.set(index, chunk);

        this.populateChunk(chunk);

        // Register in three.js
        this.world.group.add(chunk.group);

        return chunk;
    }

    unloadChunk(x, z) {
        let index = x + (z << 16);
        this.chunks.delete(index);
    }

    getChunks() {
        return this.chunks;
    }

}