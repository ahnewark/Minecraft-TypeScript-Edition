import { Block } from "../Block";
import { Session } from "../Session";

export class SessionRegistry {
    static {
		Session.registeredBlocksList.push(Block.stone);
		Session.registeredBlocksList.push(Block.cobblestone);
		Session.registeredBlocksList.push(Block.brick);
		Session.registeredBlocksList.push(Block.dirt);
		Session.registeredBlocksList.push(Block.planks);
		Session.registeredBlocksList.push(Block.wood);
		Session.registeredBlocksList.push(Block.leaves);
		Session.registeredBlocksList.push(Block.torchWood);
		Session.registeredBlocksList.push(Block.stairSingle);
		Session.registeredBlocksList.push(Block.glass);
		Session.registeredBlocksList.push(Block.cobblestoneMossy);
		Session.registeredBlocksList.push(Block.sapling);
		Session.registeredBlocksList.push(Block.plantYellow);
		Session.registeredBlocksList.push(Block.plantRed);
		Session.registeredBlocksList.push(Block.mushroomBrown);
		Session.registeredBlocksList.push(Block.mushroomRed);
		Session.registeredBlocksList.push(Block.sand);
		Session.registeredBlocksList.push(Block.gravel);
		Session.registeredBlocksList.push(Block.sponge);
		Session.registeredBlocksList.push(Block.cloth);
		Session.registeredBlocksList.push(Block.oreCoal);
		Session.registeredBlocksList.push(Block.oreIron);
		Session.registeredBlocksList.push(Block.oreGold);
		Session.registeredBlocksList.push(Block.blockSteel);
		Session.registeredBlocksList.push(Block.blockGold);
		Session.registeredBlocksList.push(Block.bookShelf);
		Session.registeredBlocksList.push(Block.tnt);
		Session.registeredBlocksList.push(Block.obsidian);
		console.log(Session.registeredBlocksList.length);
	}
}