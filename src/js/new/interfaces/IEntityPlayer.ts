import { Block } from "../Block";

export interface IEntityPlayer {
    canHarvestBlock(block1: Block| null):  boolean
    getCurrentPlayerStrVsBlock(block1: Block| null):  number
}