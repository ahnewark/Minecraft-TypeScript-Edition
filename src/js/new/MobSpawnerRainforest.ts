


import { java } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { WorldGenTrees } from "./WorldGenTrees";
import { WorldGenBigTree } from "./WorldGenBigTree";
import { MobSpawnerBase } from "./MobSpawnerBase";
import { Random } from "../jree/java/util/Random";

export  class MobSpawnerRainforest extends MobSpawnerBase {
	public getRandomWorldGenForTrees(random1: Random| undefined):  WorldGenerator | undefined {
		return (random1.nextInt(3) === 0 ? new  WorldGenBigTree() : new  WorldGenTrees()) as WorldGenerator;
	}
}
