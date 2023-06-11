import { EntityPlayer } from "../../../../../../../new/EntityPlayer.js";
import { EntityPlayerSP } from "../../../../../../../new/EntityPlayerSP.js";
import { Session } from "../../../../../../../new/Session.js";
import { World } from "../../../../../../../new/World.js";
import Minecraft from "../../Minecraft.js";

export default class PlayerController {

    private minecraft: Minecraft;

    constructor(minecraft) {
        this.minecraft = minecraft;
    }

    createPlayer(world: World): EntityPlayer {
        // return new PlayerEntity(this.minecraft, world, 0);
        return new EntityPlayerSP(world, new Session('codie', '123'), 0);
    }

    sendChatMessage(message) {
        // Handle message
        if (message.startsWith("/")) {
            this.minecraft.commandHandler.handleMessage(message.substring(1));
        } else {
            this.minecraft.addMessageToChat("<" + this.minecraft.player.username + "> " + message);
        }
    }
}