import Block from "../Block.js";

export default class BlockGlass extends Block {

    constructor(id, textureSlotId) {
        super(id, textureSlotId);

        // Sound
        this.sound = Block.sounds.glass;
    }

    isTranslucent() {
        return true;
    }

    async shouldRenderFace(world, x, y, z, face) {
        let typeId = await world.getBlockAtFace(x, y, z, face);
        return typeId === 0 || typeId !== this.id;
    }

    getOpacity() {
        return 0;
    }
}