import Minecraft from './net/minecraft/client/Minecraft.js';

class Start {
    loadTextures(textures) {
        let resources:{ [texturePath: string]: HTMLImageElement } = {};
        let index = 0;

        return textures.reduce((currentPromise, texturePath) => {
            return currentPromise.then(() => {
                return new Promise<void>((resolve, reject) => {
                    // Load texture
                    let image = new Image();
                    image.src = "src/resources/" + texturePath;
                    image.onload = () => resolve();
                    resources[texturePath] = image;

                    index++;
                });
            });
        }, Promise.resolve()).then(() => {
            return resources;
        });
    }

    launch(canvasWrapperId) {
        this.loadTextures([
            "misc/grasscolor.png",
            "font/default.png",
            "gui/gui.png",
            "gui/background.png",
            "gui/icons.png",
            "terrain.png",
            "terrain/sun.png",
            "terrain/moon.png",
            "char.png",
            // "gui/title/minecraft.png",
            "gui/container.png"
        ]).then((resources) => {
            // Launch actual game on canvas
            window.app = new Minecraft(canvasWrapperId, resources);
        });
    }
}

// Listen on history back
window.addEventListener('pageshow', function (event) {
    if (window.app) {
        // Reload page to restart the game
        if (!window.app.running) {
            window.location.reload();
        }
    } else {
        // Launch game
        new Start().launch("canvas-container");
    }
});

export function require(module) {
    return window[module];
}