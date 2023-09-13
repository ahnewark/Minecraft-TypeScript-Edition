


import { java } from "../jree/index";
import { Minecraft } from "./Minecraft";
import { CanvasMinecraftApplet } from "./CanvasMinecraftApplet";
import { MinecraftAppletImpl } from "./MinecraftAppletImpl";
import { Session } from "./Session";
import { AppletStub } from "../application/AppletStub";

export  class MinecraftApplet extends AppletStub {
	private mcCanvas:  CanvasMinecraftApplet | null;
	private mc:  Minecraft | null;
	// private mcThread:  java.lang.Thread | null = null;

	public init():  void {
		this.mcCanvas = new  CanvasMinecraftApplet(this);
		let  z1: boolean = false;
		if(this.getParameter("fullscreen") !== null) {
			z1 = this.getParameter("fullscreen") === "true";
		}

		this.mc = new  MinecraftAppletImpl(this, /*this, this.mcCanvas,*/ this, this.getWidth(), this.getHeight(), z1);
		this.mc.minecraftUri = this.getDocumentBase().getHost();
		if(this.getDocumentBase().getPort() > 0) {
			this.mc.minecraftUri = this.mc.minecraftUri + ":" + this.getDocumentBase().getPort();
		}

		if(this.getParameter("username") !== null && this.getParameter("sessionid") !== null) {
			this.mc.session = new  Session(this.getParameter("username"), this.getParameter("sessionid"));
			console.log("Setting user: " + this.mc.session.username + ", " + this.mc.session.sessionId);
			if(this.getParameter("mppass") !== null) {
				this.mc.session.mpPassParameter = this.getParameter("mppass");
			}
		} else {
			this.mc.session = new  Session("Player", "");
		}

		if(this.getParameter("loadmap_user") !== null && this.getParameter("loadmap_id") !== null) {
			this.mc.loadMapUserParameter = this.getParameter("loadmap_user");
			this.mc.loadMapIdParameter = java.lang.Integer.parseInt(this.getParameter("loadmap_id"));
		} else if(this.getParameter("server") !== null && this.getParameter("port") !== null) {
			this.mc.setServer(this.getParameter("server"), java.lang.Integer.parseInt(this.getParameter("port")));
		}

		this.mc.hideQuitButton = true;
		// this.setLayout(new  BorderLayout());
		// this.add(this.mcCanvas, "Center");
		// this.mcCanvas.setFocusable(true);
		// this.validate();
	}

	public startMainThread():  void {
		// if(this.mcThread === null) {
		// 	this.mcThread = new  java.lang.Thread(this.mc, "Minecraft main thread");
		// 	this.mcThread.start();
		// }
		this.mc.run();
	}

	public start():  void {
		if(this.mc !== null) {
			this.mc.isWorldLoaded = false;
		}

	}

	public stop():  void {
		if(this.mc !== null) {
			this.mc.isWorldLoaded = true;
		}

	}

	public destroy():  void {
		this.shutdown();
	}

	public shutdown():  void {
		// if(this.mcThread !== null) {
			this.mc.shutdown();

			// try {
			// 	// this.mcThread.join(10000);
			// } catch (interruptedException4) {
			// if (interruptedException4 instanceof InterruptedException) {
			// 	try {
			// 		this.mc.shutdownMinecraftApplet();
			// 	} catch (exception3) {
			// 		if (exception3 instanceof java.lang.Exception) {
			// 			console.trace();
			// 			console.error(exception3);
			// 		} else {
			// 			throw exception3;
			// 		}
			// 	}
			// } else {
			// 	throw interruptedException4;
			// }
		// }

		// 	this.mcThread = null;
		// }
	}

	public clearApplet():  void {
		this.mcCanvas = null;
		this.mc = null;
		// this.mcThread = null;

// 		try {
// 			this.removeAll();
// 			this.validate();
// 		} catch (exception2) {
// if (exception2 instanceof java.lang.Exception) {
// 		} else {
// 	throw exception2;
// 	}
// }

	}
}
