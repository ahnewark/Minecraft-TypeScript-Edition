import Tessellator from "../Tessellator";
import IModel from "./IModel";

export default class ModelBase implements IModel {

    /**
     * Rebuild the model
     *
     * @param tessellator Tessellator to render vertices
     * @param group      Group to attach the built model
     */
    rebuild(tessellator: Tessellator, group): void {

    }

    render(stack, limbSwing, limbSwingStrength, timeAlive, yaw, pitch, partialTicks): void {
        stack.updateMatrix();
    }

    setRotationAngles(stack, limbSwing, limbSwingStrength, timeAlive, yaw, pitch, partialTicks): void {

    }

}