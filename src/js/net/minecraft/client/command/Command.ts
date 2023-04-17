import Minecraft from "../Minecraft";

export default class Command {
    public command: string;
    public usage: string;
    public description: string;

    constructor(command, usage, description) {
        this.command = command;
        this.usage = usage;
        this.description = description;
    }

    execute(minecraft: Minecraft, args) {
        return false;
    }

}