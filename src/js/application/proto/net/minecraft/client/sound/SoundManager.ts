import * as THREE from "three";
import { AudioListener, AudioLoader, PositionalAudio, Scene } from "three";

export default class SoundManager {

    private audioLoader: AudioLoader;
    private audioListener: AudioListener;
    private soundPool: {[name: string]: PositionalAudio[]};
    private scene: Scene;

    constructor() {
        this.audioLoader = new THREE.AudioLoader();
        this.audioListener = null;

        this.soundPool = {};
    }

    create(worldRenderer) {
        this.scene = worldRenderer.scene;

        this.audioListener = new THREE.AudioListener();
        worldRenderer.camera.add(this.audioListener);

        // Load initial sound pool
        // for (let i in Block.sounds) {
        //     let sound = Block.sounds[i];

        //     // Load sound types
        //     this.loadSoundPool(sound.getStepSound());
        // }
    }

    loadSoundPool(name) {
        let pool: PositionalAudio[] = [];
        let amount = 4;

        // Load all sounds into pool
        let path = name.replace(".", "/");
        for (let i = 0; i < amount; i++) {
            let sound = this.loadSound('src/resources/newsound/' + path + (i + 1) + '.ogg');
            pool.push(sound);
        }

        // Register sound pool
        this.soundPool[name] = pool;
    }

    loadSound(path) {
        if (!this.isCreated()) {
            return;
        }

        // Create sound
        let sound = new THREE.PositionalAudio(this.audioListener);
        sound.setRefDistance(0.1);
        sound.setRolloffFactor(6);
        sound.setFilter(sound.context.createBiquadFilter());
        sound.setVolume(0);

        // Load sound
        this.audioLoader.load(path, buffer => {
            sound.setBuffer(buffer);
            this.scene.add(sound);
        });

        return sound;
    }

    playSound(name, x, y, z, volume, pitch) {
        let pool = this.soundPool[name];

        if (typeof pool === "undefined") {
            // Load sound pool
            this.loadSoundPool(name);
        } else if (pool.length > 0) {
            // Play random sound in pool
            let sound = pool[Math.floor(Math.random() * pool.length)];
            if (typeof volume === "undefined" || typeof sound === "undefined") {
                return;
            }

            // Stop previous sound
            if (sound.isPlaying) {
                sound.stop();
            }

            // Update position
            sound.position.set(x, y, z);

            // Update volume and pitch
            sound.setVolume(volume);
            sound.filters[0].frequency.setValueAtTime(12000 * pitch, sound.context.currentTime);

            // Play sound
            sound.offset = 0;
            sound.play();
        }
    }

    isCreated() {
        return !(this.audioListener === null);
    }

}