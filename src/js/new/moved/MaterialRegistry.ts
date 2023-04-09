import { Material } from "../Material";
import { MaterialLiquid } from "../MaterialLiquid";
import { MaterialLogic } from "../MaterialLogic";
import { MaterialTransparent } from "../MaterialTransparent";

export class MaterialRegistry {
    public static readonly air:  Material = new  MaterialTransparent();
	public static readonly ground:  Material = new  Material();
	public static readonly wood:  Material = (new  Material()).setBurning();
	public static readonly rock:  Material = new  Material();
	public static readonly iron:  Material = new  Material();
	public static readonly water:  Material = new  MaterialLiquid();
	public static readonly lava:  Material = new  MaterialLiquid();
	public static readonly leaves:  Material = (new  Material()).setBurning();
	public static readonly plants:  Material = new  MaterialLogic();
	public static readonly sponge:  Material = new  Material();
	public static readonly cloth:  Material = (new  Material()).setBurning();
	public static readonly fire:  Material = new  MaterialTransparent();
	public static readonly sand:  Material = new  Material();
	public static readonly circuits:  Material = new  MaterialLogic();
	public static readonly glass:  Material = new  Material();
	public static readonly tnt:  Material = (new  Material()).setBurning();
	public static readonly unused:  Material = new  Material();
	public static readonly ice:  Material = new  Material();
	public static readonly snow:  Material = new  MaterialLogic();
	public static readonly builtSnow:  Material = new  Material();
	public static readonly cactus:  Material = new  Material();
	public static readonly clay:  Material = new  Material();
	public static readonly pumpkin:  Material = new  Material();
	public static readonly portal:  Material = new  Material();
	public static readonly field_21150_y:  Material = new Material();

}