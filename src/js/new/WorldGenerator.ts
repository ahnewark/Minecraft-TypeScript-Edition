


import { Random } from "../jree/java/util/Random";
import { World } from "./World";

export abstract class WorldGenerator {
	public abstract generate(world1: World, random2: Random, i3: number, i4: number, i5: number):  Promise<boolean>;

	public func_517_a(d1: number, d3: number, d5: number):  void {}
}
