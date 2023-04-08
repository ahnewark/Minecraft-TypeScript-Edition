import { World } from "./World";
import { Chunk } from "./Chunk";

export interface IChunkLoader {
	 loadChunk(world1: World, i2: number, i3: number): Chunk | null;

	 saveChunk(world1: World, chunk2: Chunk): void;

	 saveExtraChunkData(world1: World, chunk2: Chunk): void;

	 func_814_a(): void;

	 saveExtraData(): void;
}
