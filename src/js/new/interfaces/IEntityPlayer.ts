import { Block } from "../Block";

export interface IEntityPlayer {
    canHarvestBlock(block1: Block| undefined):  boolean
    getCurrentPlayerStrVsBlock(block1: Block| undefined):  number
}