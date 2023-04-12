import { World } from "./World";
import { Chunk } from "./Chunk";

export interface IChunkLoader {
	 loadChunk(world1: World, i2: number, i3: number): Promise<Chunk | undefined>;

	 saveChunk(world1: World, chunk2: Chunk): Promise<void>;

	 saveExtraChunkData(world1: World, chunk2: Chunk): Promise<void>;

	 func_814_a(): void;

	 saveExtraData(): Promise<void>;
}
