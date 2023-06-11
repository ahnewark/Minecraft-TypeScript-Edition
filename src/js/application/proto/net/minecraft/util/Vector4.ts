export default class Vector4 {

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number= 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    addVector(x: number, y: number, z: number, w: number): Vector4 {
        return new Vector4(this.x + x, this.y + y, this.z + z, this.w + w);
    }

}