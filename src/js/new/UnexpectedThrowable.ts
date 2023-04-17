
import { JavaObject, java } from "../jree/index";

export  class UnexpectedThrowable extends JavaObject {
	public readonly description:  string | null;
	public readonly exception:  java.lang.Throwable | null;

	public constructor(string1: string | null, throwable2: java.lang.Throwable| null) {
		super();
		this.description = string1;
		this.exception = throwable2;
	}
}
