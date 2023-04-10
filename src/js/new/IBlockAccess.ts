
import { float } from "../jree/index";
import { WorldChunkManager } from "./WorldChunkManager";
import { TileEntity } from "./TileEntity";
import { Material } from "./Material";

export interface IBlockAccess {
	 getBlockId(i1: number, i2: number, i3: number): Promise<number>;
	 getBlockTileEntity(i1: number, i2: number, i3: number): Promise<TileEntity>;
	 getLightBrightness(i1: number, i2: number, i3: number): Promise<float>;
	 getBlockMetadata(i1: number, i2: number, i3: number): Promise<number>;
	 getBlockMaterial(i1: number, i2: number, i3: number): Promise<Material>;
	 isBlockOpaqueCube(i1: number, i2: number, i3: number): Promise<boolean>;
	 getWorldChunkManager(): WorldChunkManager;
}
