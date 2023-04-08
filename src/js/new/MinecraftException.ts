
import { java } from "jree";

export  class MinecraftException extends java.lang.RuntimeException {
	public constructor(string1: string) {
		super(string1);
	}
}
