export default class System {
    static arraycopy(src: RelativeIndexable<number>, srcPos: number, dest: RelativeIndexable<number>, destPos: number, count: number) {
        for (let index = 0; index < count; index++) {
            dest[index + destPos] = src[index + srcPos];
        }
    }
}