


import { int } from "../jree/index";
import { UnexpectedThrowable } from "./UnexpectedThrowable";
// import { PanelCrashReport } from "./PanelCrashReport";
import { Minecraft } from "./Minecraft";
import { MinecraftApplet } from "./MinecraftApplet";




export  class MinecraftAppletImpl extends Minecraft {
	protected readonly mainFrame:  MinecraftApplet | null;

	public constructor(minecraftApplet1: MinecraftApplet| null, /*component2: Component| null, canvas3: Canvas| null,*/ minecraftApplet4: MinecraftApplet| null, i5: int, i6: int, z7: boolean) {
		super(/*component2, canvas3,*/ minecraftApplet4, i5, i6, z7);
		this.mainFrame = minecraftApplet1;
	}

	public displayUnexpectedThrowable(unexpectedThrowable1: UnexpectedThrowable| null):  void {
		// this.mainFrame.removeAll();
		// this.mainFrame.setLayout(new  BorderLayout());
		// this.mainFrame.add(new  PanelCrashReport(unexpectedThrowable1), "Center");
		// this.mainFrame.validate();
	}
}
