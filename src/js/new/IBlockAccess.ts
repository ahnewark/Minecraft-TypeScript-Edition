
import { float } from "jree";
import { WorldChunkManager } from "./WorldChunkManager";
// TODO: Tile Entities
// import { TileEntity } from "./TileEntity";
import { Material } from "./Material";

export interface IBlockAccess {
	 getBlockId(i1: number, i2: number, i3: number): number;
     // TODO: Tile Entities
	//  getBlockTileEntity(i1: number, i2: number, i3: number): TileEntity;
	 getLightBrightness(i1: number, i2: number, i3: number): float;
	 getBlockMetadata(i1: number, i2: number, i3: number): number;
	 getBlockMaterial(i1: number, i2: number, i3: number): Material;
	 isBlockOpaqueCube(i1: number, i2: number, i3: number): boolean;
	 getWorldChunkManager(): WorldChunkManager;
}
