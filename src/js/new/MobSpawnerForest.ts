import { WorldGenerator } from "./WorldGenerator";
import { WorldGenTrees } from "./WorldGenTrees";
import { WorldGenForest } from "./WorldGenForest";
import { WorldGenBigTree } from "./WorldGenBigTree";
import { MobSpawnerBase } from "./MobSpawnerBase";
import { Random } from "../java/util/Random";

export  class MobSpawnerForest extends MobSpawnerBase {
	public getRandomWorldGenForTrees(random1: Random | undefined):  WorldGenerator | undefined {
		return (random1.nextInt(5) === 0 ? new  WorldGenForest() : (random1.nextInt(3) === 0 ? new  WorldGenBigTree() : new  WorldGenTrees())) as WorldGenerator;
	}
}
