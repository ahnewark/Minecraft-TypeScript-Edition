import { java, float, int, S, JavaString } from "../jree/index";
// import { StringTranslate } from "./StringTranslate";
import { KeyBinding } from "./KeyBinding";
import { EnumOptionsMappingHelper } from "./EnumOptionsMappingHelper";
import { EnumOptions } from "./EnumOptions";
import { Minecraft } from "./Minecraft";
import { File } from "../jree/java/io/index";
import { JavaFile } from "../jree/java/io/File";

export  class GameSettings {
	private static readonly RENDER_DISTANCES:  string[] | null =  ["options.renderDistance.far", "options.renderDistance.normal", "options.renderDistance.short", "options.renderDistance.tiny"];
	private static readonly DIFFICULTIES:  string[] | null =  ["options.difficulty.peaceful", "options.difficulty.easy", "options.difficulty.normal", "options.difficulty.hard"];
	public musicVolume:  float = 1.0;
	public soundVolume:  float = 1.0;
	public mouseSensitivity:  float = 0.5;
	public invertMouse:  boolean = false;
	public renderDistance:  int = 0;
	public viewBobbing:  boolean = true;
	public anaglyph:  boolean = false;
	public limitFramerate:  boolean = false;
	public fancyGraphics:  boolean = true;
	public skin:  string | null = "Default";
	public keyBindForward:  KeyBinding | null = new  KeyBinding("key.forward", 17);
	public keyBindLeft:  KeyBinding | null = new  KeyBinding("key.left", 30);
	public keyBindBack:  KeyBinding | null = new  KeyBinding("key.back", 31);
	public keyBindRight:  KeyBinding | null = new  KeyBinding("key.right", 32);
	public keyBindJump:  KeyBinding | null = new  KeyBinding("key.jump", 57);
	public keyBindInventory:  KeyBinding | null = new  KeyBinding("key.inventory", 23);
	public keyBindDrop:  KeyBinding | null = new  KeyBinding("key.drop", 16);
	public keyBindChat:  KeyBinding | null = new  KeyBinding("key.chat", 20);
	public keyBindToggleFog:  KeyBinding | null = new  KeyBinding("key.fog", 33);
	public keyBindSneak:  KeyBinding | null = new  KeyBinding("key.sneak", 42);
	public keyBindings:  KeyBinding[] | null =  [this.keyBindForward, this.keyBindLeft, this.keyBindBack, this.keyBindRight, this.keyBindJump, this.keyBindSneak, this.keyBindDrop, this.keyBindInventory, this.keyBindChat, this.keyBindToggleFog];
	protected mc:  Minecraft | null;
	private optionsFile:  JavaFile| null;
	public difficulty:  int = 2;
	public thirdPersonView:  boolean = false;
	public lastServer:  string | null = "";

	public constructor();

	public constructor(minecraft1: Minecraft| null, file2: JavaFile| null);
    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				break;
			}

			case 2: {
				const [minecraft1, file2] = args as [Minecraft, JavaFile];


				this.mc = minecraft1;
				this.optionsFile = new JavaFile(file2, new JavaString("options.txt"));
				this.loadOptions();
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}


	// public getKeyBindingDescription(i1: int):  string | null {
	// 	let  stringTranslate2: StringTranslate = StringTranslate.getInstance();
	// 	return stringTranslate2.translateKey(this.keyBindings[i1].keyDescription);
	// }

	public getOptionDisplayString(i1: int):  string | null {
		console.error('GameSettings.getOptionDisplayString not implemented!');
		return 'foo';
		// return Keyboard.getKeyName(this.keyBindings[i1].keyCode);
	}

	public setKeyBinding(i1: int, i2: int):  void {
		this.keyBindings[i1].keyCode = i2;
		this.saveOptions();
	}

	public setOptionFloatValue(enumOptions1: EnumOptions| null, f2: float):  void {
		if(enumOptions1 === EnumOptions.MUSIC) {
			this.musicVolume = f2;
			this.mc.sndManager.onSoundOptionsChanged();
		}

		if(enumOptions1 === EnumOptions.SOUND) {
			this.soundVolume = f2;
			this.mc.sndManager.onSoundOptionsChanged();
		}

		if(enumOptions1 === EnumOptions.SENSITIVITY) {
			this.mouseSensitivity = f2;
		}

	}

	public setOptionValue(enumOptions1: EnumOptions| null, i2: int):  void {
		if(enumOptions1 === EnumOptions.INVERT_MOUSE) {
			this.invertMouse = !this.invertMouse;
		}

		if(enumOptions1 === EnumOptions.RENDER_DISTANCE) {
			this.renderDistance = this.renderDistance + i2 & 3;
		}

		if(enumOptions1 === EnumOptions.VIEW_BOBBING) {
			this.viewBobbing = !this.viewBobbing;
		}

		if(enumOptions1 === EnumOptions.ANAGLYPH) {
			this.anaglyph = !this.anaglyph;
			this.mc.renderEngine.refreshTextures();
		}

		if(enumOptions1 === EnumOptions.LIMIT_FRAMERATE) {
			this.limitFramerate = !this.limitFramerate;
		}

		if(enumOptions1 === EnumOptions.DIFFICULTY) {
			this.difficulty = this.difficulty + i2 & 3;
		}

		if(enumOptions1 === EnumOptions.GRAPHICS) {
			this.fancyGraphics = !this.fancyGraphics;
			this.mc.renderGlobal.loadRenderers();
		}

		this.saveOptions();
	}

	public getOptionFloatValue(enumOptions1: EnumOptions| null):  float {
		return enumOptions1 === EnumOptions.MUSIC ? this.musicVolume : (enumOptions1 === EnumOptions.SOUND ? this.soundVolume : (enumOptions1 === EnumOptions.SENSITIVITY ? this.mouseSensitivity : 0.0));
	}

	public getOptionOrdinalValue(enumOptions1: EnumOptions| null):  boolean {
		switch(EnumOptionsMappingHelper.enumOptionsMappingHelperArray[enumOptions1.ordinal()]) {
		case 1:
			return this.invertMouse;
		case 2:
			return this.viewBobbing;
		case 3:
			return this.anaglyph;
		case 4:
			return this.limitFramerate;
		default:
			return false;
		}
	}

	// public getKeyBinding(enumOptions1: EnumOptions| null):  string | null {
	// 	let  stringTranslate2: StringTranslate = StringTranslate.getInstance();
	// 	let  string3: string = stringTranslate2.translateKey(enumOptions1.getEnumString()) + ": ";
	// 	if(enumOptions1.getEnumFloat()) {
	// 		let  f5: float = this.getOptionFloatValue(enumOptions1);
	// 		return enumOptions1 === EnumOptions.SENSITIVITY ? (f5 === 0.0 ? string3 + stringTranslate2.translateKey("options.sensitivity.min") : (f5 === 1.0 ? string3 + stringTranslate2.translateKey("options.sensitivity.max") : string3 + (f5 * 200.0) + "%")) : (f5 === 0.0 ? string3 + stringTranslate2.translateKey("options.off") : string3 + (f5 * 100.0) + "%");
	// 	} else if(enumOptions1.getEnumBoolean()) {
	// 		let  z4: boolean = this.getOptionOrdinalValue(enumOptions1);
	// 		return z4 ? string3 + stringTranslate2.translateKey("options.on") : string3 + stringTranslate2.translateKey("options.off");
	// 	} else {
	// 		return enumOptions1 === EnumOptions.RENDER_DISTANCE ? string3 + stringTranslate2.translateKey(GameSettings.RENDER_DISTANCES[this.renderDistance]) : (enumOptions1 === EnumOptions.DIFFICULTY ? string3 + stringTranslate2.translateKey(GameSettings.DIFFICULTIES[this.difficulty]) : (enumOptions1 === EnumOptions.GRAPHICS ? (this.fancyGraphics ? string3 + stringTranslate2.translateKey("options.graphics.fancy") : string3 + stringTranslate2.translateKey("options.graphics.fast")) : string3));
	// 	}
	// }

	public async loadOptions():  Promise<void> {
		try {
			if(!this.optionsFile.exists()) {
				return;
			}

			let  bufferedReader1: java.io.BufferedReader = new  java.io.BufferedReader(await java.io.FileReader.Construct(this.optionsFile));
			let  string2: java.lang.String = S``;

			while((string2 = bufferedReader1.readLine()) !== null) {
				let  string3: JavaString[] = string2.split(":");
				if(string3[0].equals("music")) {
					this.musicVolume = this.parseFloat(string3[1]);
				}

				if(string3[0].equals("sound")) {
					this.soundVolume = this.parseFloat(string3[1]);
				}

				if(string3[0].equals("mouseSensitivity")) {
					this.mouseSensitivity = this.parseFloat(string3[1]);
				}

				if(string3[0].equals("invertYMouse")) {
					this.invertMouse = string3[1].equals("true");
				}

				if(string3[0].equals("viewDistance")) {
					this.renderDistance = java.lang.Integer.parseInt(string3[1]);
				}

				if(string3[0].equals("bobView")) {
					this.viewBobbing = string3[1].equals("true");
				}

				if(string3[0].equals("anaglyph3d")) {
					this.anaglyph = string3[1].equals("true");
				}

				if(string3[0].equals("limitFramerate")) {
					this.limitFramerate = string3[1].equals("true");
				}

				if(string3[0].equals("difficulty")) {
					this.difficulty = java.lang.Integer.parseInt(string3[1]);
				}

				if(string3[0].equals("fancyGraphics")) {
					this.fancyGraphics = string3[1].equals("true");
				}

				if(string3[0].equals("skin")) {
					this.skin = `${string3[1]}`;
				}

				if(string3[0].equals("lastServer")) {
					this.lastServer = `${string3[1]}`;
				}

				for(let  i4: int = 0; i4 < this.keyBindings.length; ++i4) {
					if(string3[0].equals("key_" + this.keyBindings[i4].keyDescription)) {
						this.keyBindings[i4].keyCode = java.lang.Integer.parseInt(string3[1]);
					}
				}
			}

			bufferedReader1.close();
		} catch (exception5) {
			if (exception5 instanceof java.lang.Exception) {
				console.error("Failed to load options");
				console.error(exception5);
				console.trace();
			} else {
				throw exception5;
			}
		}

	}

	private parseFloat(string1: JavaString):  float {
		return string1.equals("true") ? 1.0 : (string1.equals("false") ? 0.0 : parseFloat(`${string1}`));
	}

	public async saveOptions():  Promise<void> {
		try {
			let  printWriter1: java.io.PrintWriter = await java.io.PrintWriter.Construct(await  java.io.FileWriter.Construct(this.optionsFile));
			printWriter1.println("music:" + this.musicVolume);
			printWriter1.println("sound:" + this.soundVolume);
			printWriter1.println("invertYMouse:" + this.invertMouse);
			printWriter1.println("mouseSensitivity:" + this.mouseSensitivity);
			printWriter1.println("viewDistance:" + this.renderDistance);
			printWriter1.println("bobView:" + this.viewBobbing);
			printWriter1.println("anaglyph3d:" + this.anaglyph);
			printWriter1.println("limitFramerate:" + this.limitFramerate);
			printWriter1.println("difficulty:" + this.difficulty);
			printWriter1.println("fancyGraphics:" + this.fancyGraphics);
			printWriter1.println("skin:" + this.skin);
			printWriter1.println("lastServer:" + this.lastServer);

			for(let  i2: int = 0; i2 < this.keyBindings.length; ++i2) {
				printWriter1.println("key_" + this.keyBindings[i2].keyDescription + ":" + this.keyBindings[i2].keyCode);
			}

			printWriter1.close();
		} catch (exception3) {
			if (exception3 instanceof java.lang.Exception) {
				console.error("Failed to save options");
				console.error(exception3);
				console.trace();
			} else {
				throw exception3;
			}
		}

	}
}
