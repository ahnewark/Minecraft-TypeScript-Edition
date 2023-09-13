
import { MinecraftApplet } from "./MinecraftApplet";

export  class CanvasMinecraftApplet {
	protected readonly mcApplet:  MinecraftApplet | null;

	public constructor(minecraftApplet1: MinecraftApplet| null) {
		this.mcApplet = minecraftApplet1;
	}

	public addNotify():  void {
		this.mcApplet.startMainThread();
	}

	public removeNotify():  void {
		this.mcApplet.shutdown();
	}
}
