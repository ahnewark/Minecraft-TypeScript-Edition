


import { java } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { WorldGenTrees } from "./WorldGenTrees";
import { WorldGenBigTree } from "./WorldGenBigTree";
import { MobSpawnerBase } from "./MobSpawnerBase";
import { Random } from "../java/util/Random";

export  class MobSpawnerRainforest extends MobSpawnerBase {
	public getRandomWorldGenForTrees(random1: Random| null):  WorldGenerator | null {
		return (random1.nextInt(3) === 0 ? new  WorldGenBigTree() : new  WorldGenTrees()) as WorldGenerator;
	}
}
