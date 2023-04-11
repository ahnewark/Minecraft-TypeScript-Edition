import { MobSpawnerBase } from "../MobSpawnerBase";
import { MobSpawnerDesert } from "../MobSpawnerDesert";
import { MobSpawnerForest } from "../MobSpawnerForest";
import { MobSpawnerHell } from "../MobSpawnerHell";
import { MobSpawnerRainforest } from "../MobSpawnerRainforest";
import { MobSpawnerSwamp } from "../MobSpawnerSwamp";
import { MobSpawnerTaiga } from "../MobSpawnerTaiga";

export class MobSpawnerRegistry {
    public static readonly rainforest:  MobSpawnerBase = (new  MobSpawnerRainforest()).setColor(588342).setBiomeName("Rainforest").func_4124_a(2094168);
	public static readonly swampland:  MobSpawnerBase = (new  MobSpawnerSwamp()).setColor(522674).setBiomeName("Swampland").func_4124_a(9154376);
	public static readonly seasonalForest:  MobSpawnerBase = (new  MobSpawnerBase()).setColor(10215459).setBiomeName("Seasonal Forest");
	public static readonly forest:  MobSpawnerBase = (new  MobSpawnerForest()).setColor(353825).setBiomeName("Forest").func_4124_a(5159473);
	public static readonly savanna:  MobSpawnerBase = (new  MobSpawnerDesert()).setColor(14278691).setBiomeName("Savanna");
	public static readonly shrubland:  MobSpawnerBase = (new  MobSpawnerBase()).setColor(10595616).setBiomeName("Shrubland");
	public static readonly taiga:  MobSpawnerBase = (new  MobSpawnerTaiga()).setColor(3060051).setBiomeName("Taiga").doesNothingForMobSpawnerBase().func_4124_a(8107825);
	public static readonly desert:  MobSpawnerBase = (new  MobSpawnerDesert()).setColor(16421912).setBiomeName("Desert");
	public static readonly plains:  MobSpawnerBase = (new  MobSpawnerDesert()).setColor(16767248).setBiomeName("Plains");
	public static readonly iceDesert:  MobSpawnerBase = (new  MobSpawnerDesert()).setColor(16772499).setBiomeName("Ice Desert").doesNothingForMobSpawnerBase().func_4124_a(12899129);
	public static readonly tundra:  MobSpawnerBase = (new  MobSpawnerBase()).setColor(5762041).setBiomeName("Tundra").doesNothingForMobSpawnerBase().func_4124_a(12899129);
	public static readonly hell:  MobSpawnerBase = (new  MobSpawnerHell()).setColor(16711680).setBiomeName("Hell");
}