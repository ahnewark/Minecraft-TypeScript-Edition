
import { IProgressUpdate } from "./IProgressUpdate";
import { Chunk } from "./Chunk";

export interface IChunkProvider {
	 chunkExists(i1: number, i2: number): boolean;
	 provideChunk(i1: number, i2: number): Promise<Chunk>;
	 populate(iChunkProvider1: IChunkProvider, i2: number, i3: number): Promise<void>;
	 saveChunks(z1: boolean, iProgressUpdate2: IProgressUpdate | undefined): Promise<boolean>;
	 func_532_a(): boolean;
	 func_536_b(): boolean;
	 toString(): string;
}
