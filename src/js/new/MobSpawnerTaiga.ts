


import { WorldGenerator } from "./WorldGenerator";
import { WorldGenTaiga2 } from "./WorldGenTaiga2";
import { WorldGenTaiga1 } from "./WorldGenTaiga1";
import { MobSpawnerBase } from "./MobSpawnerBase";
import { Random } from "../java/util/Random";

export  class MobSpawnerTaiga extends MobSpawnerBase {
	public getRandomWorldGenForTrees(random1: Random | null):  WorldGenerator | null {
		return (random1.nextInt(3) === 0 ? new  WorldGenTaiga1() : new  WorldGenTaiga2()) as WorldGenerator;
	}
}
