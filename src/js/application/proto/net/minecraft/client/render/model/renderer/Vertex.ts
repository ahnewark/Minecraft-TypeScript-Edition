import Vector3 from "../../../../util/Vector3.js";

export default class Vertex {

    public readonly position: Vector3;
    public readonly u: number;
    public readonly v: number;

    /**
     * A vertex contains a 3 float vector position and UV coordinates
     *
     * @param x X position
     * @param y Y position
     * @param z Z position
     */
    constructor(x: number, y: number, z: number) {
        this.position = new Vector3(x, y, z);
        this.u = 0;
        this.v = 0;
    }

    withUV(u: number, v: number) {
        this.u = u;
        this.v = v;
        return this;
    }

    static create(vector: Vector3) {
        return new Vertex(vector.x, vector.y, vector.z);
    }

}