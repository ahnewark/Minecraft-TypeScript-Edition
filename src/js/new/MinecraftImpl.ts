import { UnexpectedThrowable } from "./UnexpectedThrowable";
// import { PanelCrashReport } from "./PanelCrashReport";
import { Minecraft } from "./Minecraft";
import { MinecraftApplet } from "./MinecraftApplet";

export  class MinecraftImpl extends Minecraft {
	//protected readonly mcFrame:  Frame | null;

	public constructor(/*component1: Component| null, canvas2: Canvas| null,*/ minecraftApplet3: MinecraftApplet| null, i4: number, i5: number, z6: boolean/*, frame7: Frame| null*/) {
		super(/*component1, canvas2,*/ minecraftApplet3, i4, i5, z6);
		// this.mcFrame = frame7;
	}

	public displayUnexpectedThrowable(unexpectedThrowable1: UnexpectedThrowable| null):  void {
		// this.mcFrame.removeAll();
		// this.mcFrame.add(new  PanelCrashReport(unexpectedThrowable1), "Center");
		// this.mcFrame.validate();
	}
}
