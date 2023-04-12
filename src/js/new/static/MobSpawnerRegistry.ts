import { MobSpawnerBase } from "../MobSpawnerBase";
import { MobSpawnerDesert } from "../MobSpawnerDesert";
import { MobSpawnerForest } from "../MobSpawnerForest";
import { MobSpawnerHell } from "../MobSpawnerHell";
import { MobSpawnerRainforest } from "../MobSpawnerRainforest";
import { MobSpawnerSwamp } from "../MobSpawnerSwamp";
import { MobSpawnerTaiga } from "../MobSpawnerTaiga";

export class MobSpawnerRegistry {
	static{
		MobSpawnerBase.rainforest = (new  MobSpawnerRainforest()).setColor(588342).setBiomeName("Rainforest").func_4124_a(2094168);
		MobSpawnerBase.swampland = (new  MobSpawnerSwamp()).setColor(522674).setBiomeName("Swampland").func_4124_a(9154376);
		MobSpawnerBase.seasonalForest = (new  MobSpawnerBase()).setColor(10215459).setBiomeName("Seasonal Forest");
		MobSpawnerBase.forest = (new  MobSpawnerForest()).setColor(353825).setBiomeName("Forest").func_4124_a(5159473);
		MobSpawnerBase.savanna = (new  MobSpawnerDesert()).setColor(14278691).setBiomeName("Savanna");
		MobSpawnerBase.shrubland = (new  MobSpawnerBase()).setColor(10595616).setBiomeName("Shrubland");
		MobSpawnerBase.taiga = (new  MobSpawnerTaiga()).setColor(3060051).setBiomeName("Taiga").doesNothingForMobSpawnerBase().func_4124_a(8107825);
		MobSpawnerBase.desert = (new  MobSpawnerDesert()).setColor(16421912).setBiomeName("Desert");
		MobSpawnerBase.plains = (new  MobSpawnerDesert()).setColor(16767248).setBiomeName("Plains");
		MobSpawnerBase.iceDesert = (new  MobSpawnerDesert()).setColor(16772499).setBiomeName("Ice Desert").doesNothingForMobSpawnerBase().func_4124_a(12899129);
		MobSpawnerBase.tundra = (new  MobSpawnerBase()).setColor(5762041).setBiomeName("Tundra").doesNothingForMobSpawnerBase().func_4124_a(12899129);
		MobSpawnerBase.hell = (new  MobSpawnerHell()).setColor(16711680).setBiomeName("Hell");
		MobSpawnerBase.generateBiomeLookup();
	}
}