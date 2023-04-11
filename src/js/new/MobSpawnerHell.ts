
import { MobSpawnerBase } from "./MobSpawnerBase";

export  class MobSpawnerHell extends MobSpawnerBase {
	public constructor() {
		super();
		this.biomeMonsters =  ['Ghast', 'PigZombie'];
		this.biomeCreatures =  [];
	}
}
