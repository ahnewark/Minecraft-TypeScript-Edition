import { CraftingManager } from "../CraftingManager";

export class CraftingManagerRegistry {
    static {
        // This needs to happen after Item and Block registration.
        CraftingManager.instance = new CraftingManager();
    }
}