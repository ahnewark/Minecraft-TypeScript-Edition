
import { java } from "../jree/index";

export  class MinecraftException extends java.lang.RuntimeException {
	public constructor(string1: string) {
		super(string1);
	}
}
