import Timer from "../util/Timer";
import GameSettings from "../client/GameSettings.js";
import GameWindow from "../client/GameWindow.js";
import WorldRenderer from "../client/render/WorldRenderer.js";
import ScreenRenderer from "../client/render/gui/ScreenRenderer.js";
import ItemRenderer from "../client/render/gui/ItemRenderer.js";
import IngameOverlay from "../client/gui/overlay/IngameOverlay.js";
import SoundManager from "../client/sound/SoundManager.js";
import Block from "../client/world/block/Block.js";
import BoundingBox from "../util/BoundingBox";
import {BlockRegistry} from "../client/world/block/BlockRegistry.js";
import FontRenderer from "../client/render/gui/FontRenderer.js";
import GrassColorizer from "../client/render/GrassColorizer.js";
import GuiMainMenu from "../client/gui/screens/GuiMainMenu.js";
import GuiLoadingScreen from "../client/gui/screens/GuiLoadingScreen.js";
import * as THREE from "three";
import ParticleRenderer from "../client/render/particle/ParticleRenderer.js";
import GuiChat from "../client/gui/screens/GuiChat.js";
import CommandHandler from "../client/command/CommandHandler.js";
import GuiContainerPlayer from "../client/gui/screens/container/GuiContainerCreative";
import GameProfile from "../util/GameProfile";
import UUID from "../util/UUID";
import FocusStateType from "../util/FocusStateType.js";
import Session from "../util/Session";
import { Session as NewSession } from '../../../new/Session';
import PlayerControllerMultiplayer from "../client/network/controller/PlayerControllerMultiplayer.js";
// import * as Foobert from '.../client/.../client/.../client/new/index';
import { World as NewWorld } from '../../../new/World';
// import {JavaFile} from ".../client/.../client/.../client/jree/java/io/File";
// import { JavaString } from ".../client/.../client/.../client/jree/index.js";
// import { IOException } from ".../client/.../client/.../client/jree/java/io/IOException.js";
// import { FileOutputStream } from ".../client/.../client/.../client/jree/java/io/FileOutputStream.js";
// import { DataOutputStream } from ".../client/.../client/.../client/java/io/DataOutputStream.js";
// import { File, FileInputStream } from ".../client/.../client/.../client/jree/java/io/index.js";
// import { DataInputStream } from ".../client/.../client/.../client/java/io/DataInputStream.js";
import '../../../new/index';
import { JavaFile } from "../../../jree/java/io/File.js";
import { JavaString } from "../../../jree/index.js";
import GuiScreen from "../client/gui/GuiScreen.js";
import PlayerController from "../client/network/controller/PlayerController.js";
import World from "../client/world/World.js";
import { EntityPlayer } from "../../../new/EntityPlayer";
import { EntityPlayerSP } from "../../../new/EntityPlayerSP";
import { existsAsync } from "../../../node/fs";
import { main } from "../../../WorldTest";

// console.log({Foobert})

export default class Minecraft {

    private resources: { [texturePath: string]: HTMLImageElement };
    private currentScreen: GuiScreen;
    public loadingScreen: GuiLoadingScreen;
    public world: World;
    private newWorld: NewWorld;
    public player;
    private playerController: PlayerController;
    private fps: number;
    private maxFps: number;
    private timer: Timer;
    public settings: GameSettings;
    private window: GameWindow;
    public worldRenderer: WorldRenderer;
    private screenRenderer: ScreenRenderer;
    private itemRenderer: ItemRenderer;
    private ingameOverlay: IngameOverlay;
    private commandHandler: CommandHandler;
    private frames: number;
    private lastTime: number;
    private fontRenderer: FontRenderer;
    private grassColorizer: GrassColorizer;
    public particleRenderer: ParticleRenderer;
    private soundManager: SoundManager;
    private running: boolean;
    private session: Session;

    static VERSION = "Minecraft Beta 1.2_02"
    static URL_GITHUB = "https://github.com/craftycodie/js-minecraft";
    static PROTOCOL_VERSION = 47; //758;

    // TODO Add to settings
    static PROXY = {
        "address": "localhost",
        "port": 30023
    };

    static newWorld = undefined;

    /**
     * Create Minecraft instance and render it on a canvas
     */
    constructor(canvasWrapperId, resources) {
        this.resources = resources;

        // NewWorld.Construct(new JavaFile(new JavaString('/saves/')), 'World1').then(async world => {
        //     this.newWorld = world;
        //     Minecraft.newWorld = world;
        //     // await world.saveLevel();
        //     await this.newWorld.spawnPlayer(new EntityPlayerSP(world, new NewSession('craftycodie', 'foo'), 0))
        //     await world.saveWorld(true, null)
        //     console.log('saved the world.');

        //     // await existsAsync('/saves/World1/1')
        //     // console.log({world})
        // })

        const foo = async () => { 
            const world = await main() 
            this.newWorld = world;
            Minecraft.newWorld = world;
        };

        foo();

        // const main = async () => {
        //     const testFile = new File(new JavaString('/test/test.txt'));
        //     await testFile.getParentFile().mkdirs();

        //     await testFile.delete();

        //     const fos = await FileOutputStream.Construct(testFile);
        //     const dos = new DataOutputStream(fos);
        //     await dos.writeUTF('Test Test Among Us');
        //     await fos.close();

        //     const fis = await FileInputStream.Construct(testFile);
        //     const dis = new DataInputStream(fis);
        //     console.log({fileContents: await dis.readUTF()})
        //     await fis.close();
        // }

        // main();

        this.currentScreen = null;
        this.loadingScreen = null;
        this.world = null;
        this.player = null;
        this.playerController = null;
        this.fps = 0;
        this.maxFps = 0;

        // Tick timer
        this.timer = new Timer(20);

        this.settings = new GameSettings();
        this.settings.load();

        // Load session from settings
        if (this.settings.session === null) {
            let username = "Player" + Math.floor(Math.random() * 100);
            let profile = new GameProfile(UUID.randomUUID(), username);
            this.setSession(new Session(profile, ""));
        } else {
            this.setSession(Session.fromJson(this.settings.session));
        }

        // Create window and world renderer
        this.window = new GameWindow(this, canvasWrapperId);

        // Create renderers
        this.worldRenderer = new WorldRenderer(this, this.window);
        this.screenRenderer = new ScreenRenderer(this, this.window);
        this.itemRenderer = new ItemRenderer(this, this.window);

        // Create current screen and overlay
        this.ingameOverlay = new IngameOverlay(this, this.window);

        // Command handler
        this.commandHandler = new CommandHandler(this);

        this.frames = 0;
        this.lastTime = Date.now();

        // Create all blocks
        BlockRegistry.create();

        this.itemRenderer.initialize();

        // Create font renderer
        this.fontRenderer = new FontRenderer(this);

        // Grass colorizer
        this.grassColorizer = new GrassColorizer(this);

        this.particleRenderer = new ParticleRenderer(this);

        // Update window size
        this.window.updateWindowSize();

        // Create sound manager
        this.soundManager = new SoundManager();

        this.displayScreen(new GuiMainMenu());

        // Initialize
        this.init();
    }

    init() {
        // Start render loop
        this.running = true;
        this.requestNextFrame();
    }

    async loadWorld(world) {
        if (world === null) {
            this.worldRenderer.reset();
            this.itemRenderer.reset();

            // Disconnect from server
            if (this.playerController instanceof PlayerControllerMultiplayer) {
                let networkHandler = this.playerController.getNetworkHandler();
                if (networkHandler.getNetworkManager().isConnected()) {
                    networkHandler.getNetworkManager().close();
                }

                // Reset header and footer
                this.ingameOverlay.playerListOverlay.setHeader(null);
                this.ingameOverlay.playerListOverlay.setFooter(null);
            }
            this.playerController = null;

            if (this.world !== null) {
                this.world.getChunkProvider().getChunks().clear();
                this.world.clearEntities();
                this.world = null;
                this.player = null;
                this.loadingScreen = null;
            }
            this.displayScreen(new GuiMainMenu());
        } else {
            // Display loading screen
            this.loadingScreen = new GuiLoadingScreen();
            this.loadingScreen.setTitle("Building terrain...");
            this.displayScreen(this.loadingScreen);

            // Clear previous world
            if (this.world !== null) {
                this.world.getChunkProvider().getChunks().clear();
                this.world.clearEntities();
                this.worldRenderer.reset();
                this.itemRenderer.reset();
            }

            // Create world
            this.world = world;
            this.worldRenderer.scene.add(this.world.group);

            // Create player
            this.player = this.playerController.createPlayer(this.world);
            this.player.username = this.session.getProfile().getUsername();
            this.world.addEntity(this.player);

            // Load spawn chunks and respawn player
            await this.world.loadSpawnChunks();
            this.player.respawn();
        }
    }

    hasInGameFocus() {
        return this.window.isLocked() && this.currentScreen === null;
    }

    isInGame() {
        return this.world !== null && this.worldRenderer !== null && this.player !== null;
    }

    addMessageToChat(message) {
        this.ingameOverlay.chatOverlay.addMessage(message);
    }

    requestNextFrame() {
        // console.log('requestNextFrame')
        // return await new Promise<void>(resolve => {
        requestAnimationFrame(async () => {
            // console.log('requestAnimationFrame start')
            if (this.running) {
                await this.onLoop();
                this.requestNextFrame();
            }
            // console.log('requestAnimationFrame finish')

            // resolve();
        });
    }
    // );
        // requestAnimationFrame(async () => {
        //     if (this.running) {
        //         this.requestNextFrame();
        //         await this.onLoop();
        //     }
        // });
    // }

    async onLoop() {
        // Update the timer
        if (this.isPaused() && this.isInGame()) {
            let prevPartialTicks = this.timer.partialTicks;
            this.timer.advanceTime();
            this.timer.partialTicks = prevPartialTicks;
        } else {
            this.timer.advanceTime();
        }

        // Call the tick to reach updates 20 per seconds
        for (let i = 0; i < this.timer.ticks; i++) {
            await this.onTick();
        }

        // Render the game
        await this.onRender(this.timer.partialTicks);

        // Increase rendered frame
        this.frames++;

        // Loop if a second passed
        while (Date.now() >= this.lastTime + 1000) {
            this.fps = this.frames;
            this.maxFps = Math.max(this.maxFps, this.fps);
            this.lastTime += 1000;
            this.frames = 0;
        }
    }

    async onRender(partialTicks) {
        if (this.isInGame()) {
            // Player rotation
            if (this.hasInGameFocus()) {
                let deltaX = this.window.pullMouseMotionX();
                let deltaY = this.window.pullMouseMotionY();
                this.player.turn(deltaX, deltaY);
            }

            // Update lights
            while (await this.world.updateLights()) {
                // Empty
            }

            // Render the game
            if (this.isInGame() && !this.isPaused()) {
                await this.worldRenderer.render(partialTicks);
            }
        }

        // Render items in GUI
        this.itemRenderer.render(partialTicks);

        // Render current screen
        this.screenRenderer.render(partialTicks);
    }

    displayScreen(screen) {
        if (screen === this.currentScreen) {
            return;
        }

        if (typeof screen === "undefined") {
            console.error("Tried to display an undefined screen");
            return;
        }

        // Fallback screen
        if (screen === null && !this.isInGame()) {
            screen = new GuiMainMenu();
        }

        // Close previous screen
        if (this.currentScreen !== null) {
            this.currentScreen.onClose();
        }

        // Switch screen
        this.currentScreen = screen;

        // Update window size
        this.window.updateWindowSize();

        // Initialize new screen
        if (screen === null) {
            this.window.updateFocusState(FocusStateType.REQUEST_LOCK);
        } else {
            this.window.updateFocusState(FocusStateType.REQUEST_EXIT);
            screen.setup(this, this.window.width, this.window.height);
        }

        // Update items
        this.itemRenderer.rebuildAllItems();
    }

    private loadingPromise: Promise<void>;

    async onTick() {
        if (this.isInGame() && !this.isPaused()) {
            // Tick overlay
            this.ingameOverlay.onTick();

            // Tick world
            this.world.onTick();

            // Tick renderer
            await this.worldRenderer.onTick();

            // Tick particle renderer
            this.particleRenderer.onTick();
        }

        // Tick the screen
        if (this.currentScreen !== null) {
            this.currentScreen.updateScreen();
        }

        // Update loading progress
        if (this.loadingScreen !== null && this.isInGame()) {
            let cameraChunkX = Math.floor(this.player.x) >> 4;
            let cameraChunkZ = Math.floor(this.player.z) >> 4;

            let renderDistance = this.settings.viewDistance;
            let requiredChunks = this.isSingleplayer() ? Math.pow(renderDistance * 2 - 1, 2) : 1;
            let loadedChunks = this.world.getChunkProvider().getChunks().size;

            const func = async () => {
                const chunkLoaders = [];
                for (let x = -renderDistance + 1; x < renderDistance; x++) {
                    for (let z = -renderDistance + 1; z < renderDistance; z++) {
                        chunkLoaders.push(this.world.getChunkAt(cameraChunkX + x, cameraChunkZ + z));
                        let progress = 1 / requiredChunks * Math.max(0, loadedChunks - this.world.lightUpdateQueue.length / 1000);
                        this.loadingScreen.setProgress(progress);
                    }
                }
                await Promise.all(chunkLoaders);
                console.log('done loading chunks')
                this.loadingScreen = null;
                this.displayScreen(null);
            }

            // Load chunks and count
            // setTimeout(async () => {
            if (!this.loadingPromise)
                this.loadingPromise = func().then(() => {
                    this.loadingScreen = null;
                    this.displayScreen(null);
                });
            // }, 0);

            // Update progress
            let progress = 1 / requiredChunks * Math.max(0, loadedChunks - this.world.lightUpdateQueue.length / 1000);
            // this.loadingScreen.setProgress(progress);

            // Finish loading
            if (progress >= 0.99) {
                this.loadingScreen = null;
                this.displayScreen(null);
                //this.soundManager.playMusic('hal', 1);
            }
        }
    }

    onKeyPressed(button) {
        // Select slot
        for (let i = 1; i <= 9; i++) {
            if (button === 'Digit' + i) {
                this.player.inventory.selectedSlotIndex = i - 1;
            }
        }

        // Toggle perspective
        if (button === this.settings.keyTogglePerspective) {
            this.settings.thirdPersonView = (this.settings.thirdPersonView + 1) % 3;
            this.settings.save();
        }

        // Open chat
        if (button === this.settings.keyOpenChat) {
            this.displayScreen(new GuiChat());
        }

        // Toggle debug overlay
        if (button === "F3") {
            this.settings.debugOverlay = !this.settings.debugOverlay;
            this.settings.save();
        }

        // Open inventory
        if (button === this.settings.keyOpenInventory) {
            this.displayScreen(new GuiContainerPlayer(this.player));
        }
    }

    async onMouseClicked(button) {
        if (this.window.isLocked()) {
            let hitResult = this.player.rayTrace(5, this.timer.partialTicks);

            // Destroy block
            if (button === 0) {
                if (hitResult != null) {
                    // Get previous block
                    let typeId = await this.world.getBlockAt(hitResult.x, hitResult.y, hitResult.z);
                    let block = Block.getById(typeId);

                    if (typeId !== 0) {
                        let soundName = block.getSound().getBreakSound();

                        // Play sound
                        this.soundManager.playSound(
                            soundName,
                            hitResult.x + 0.5,
                            hitResult.y + 0.5,
                            hitResult.z + 0.5,
                            1.0,
                            1.0
                        );

                        // Spawn particle
                        this.particleRenderer.spawnBlockBreakParticle(this.world, hitResult.x, hitResult.y, hitResult.z);

                        // Destroy block
                        await this.world.setBlockAt(hitResult.x, hitResult.y, hitResult.z, 0);
                    }
                }

                this.player.swingArm();
            }

            // Pick block
            if (button === 1) {
                if (hitResult != null) {
                    let typeId = await this.world.getBlockAt(hitResult.x, hitResult.y, hitResult.z);
                    if (typeId !== 0) {
                        // Switch to slot if item is already in hotbar
                        for (const item of this.player.inventory.items) {
                            const index = this.player.inventory.items.indexOf(item);
                            if (item === typeId && index <= 8) {
                                this.player.inventory.selectedSlotIndex = index;
                                return;
                            }
                        }

                        // Set item in hotbar
                        this.player.inventory.setItemInSelectedSlot(typeId);
                    }
                }
            }

            // Place block
            if (button === 2) {
                if (hitResult != null) {
                    let x = hitResult.x + hitResult.face.x;
                    let y = hitResult.y + hitResult.face.y;
                    let z = hitResult.z + hitResult.face.z;

                    let placedBoundingBox = new BoundingBox(x, y, z, x + 1, y + 1, z + 1);

                    // Don't place blocks if the player is standing there
                    if (!placedBoundingBox.intersects(this.player.boundingBox)) {
                        let typeId = this.player.inventory.getItemInSelectedSlot();

                        // Get previous block
                        let prevTypeId = await this.world.getBlockAt(x, y, z);

                        if (typeId !== 0 && prevTypeId !== typeId) {
                            // Place block
                            await this.world.setBlockAt(x, y, z, typeId);

                            // Swing player arm
                            this.player.swingArm();

                            // Handle block abilities
                            let block = Block.getById(typeId);
                            block.onBlockPlaced(this.world, x, y, z, hitResult.face);

                            // Play sound
                            let sound = block.getSound();
                            let soundName = sound.getStepSound();
                            this.soundManager.playSound(
                                soundName,
                                hitResult.x + 0.5,
                                hitResult.y + 0.5,
                                hitResult.z + 0.5,
                                1.0,
                                sound.getPitch() * 0.8
                            );
                        }
                    }
                }
            }

            // Rebuild multiple chunk sections
            this.worldRenderer.flushRebuild = true;
        }
    }

    onMouseScroll(delta) {
        if (this.isInGame()) {
            this.player.inventory.shiftSelectedSlot(delta);
        }
    }

    isPaused() {
        return !this.hasInGameFocus() && this.loadingScreen === null && this.isSingleplayer();
    }

    setSession(session, save = false) {
        this.session = session;

        // Save session
        if (save) {
            this.settings.session = session.toJson();
            this.settings.save();
        }
    }

    updateAccessToken(token) {
        this.session.setAccessToken(token);
        this.setSession(this.session, true);
    }

    getSession() {
        return this.session;
    }

    isSingleplayer() {
        return this.isInGame() && !(this.playerController instanceof PlayerControllerMultiplayer);
    }

    stop() {
        if (this.currentScreen !== null) {
            this.currentScreen.onClose();
        }
        this.running = false;
        this.worldRenderer.reset();
        this.itemRenderer.reset();
        this.screenRenderer.reset();
        this.window.close();
    }

    getThreeTexture(id) {
        if (!(id in this.resources)) {
            console.error("Texture not found: " + id);
            return;
        }

        let image = this.resources[id];
        let canvas = document.createElement('canvas');
        let context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.imageSmoothingEnabled = false;
        context.drawImage(image, 0, 0, image.width, image.height);
        return new THREE.CanvasTexture(canvas);
    }
}