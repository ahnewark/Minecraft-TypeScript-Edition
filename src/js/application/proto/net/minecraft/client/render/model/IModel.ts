import Tessellator from "../Tessellator";

export default interface IModel {

    /**
     * Rebuild the model
     *
     * @param tessellator Tessellator to render vertices
     * @param group      Group to attach the built model
     */
    rebuild(tessellator: Tessellator, group: THREE.Object3D): void;

    render(stack, limbSwing, limbSwingStrength, timeAlive, yaw, pitch, partialTicks): void

    setRotationAngles(stack, limbSwing, limbSwingStrength, timeAlive, yaw, pitch, partialTicks): void

}