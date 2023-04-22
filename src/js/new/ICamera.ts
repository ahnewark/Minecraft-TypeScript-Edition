
import { AxisAlignedBB } from "./AxisAlignedBB";

export interface ICamera {
	 isBoundingBoxInFrustum(axisAlignedBB1: AxisAlignedBB| null): boolean;

	 setPosition(d1: number, d3: number, d5: number): void;
}
