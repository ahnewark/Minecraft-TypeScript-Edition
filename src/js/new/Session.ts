import { Block } from "./Block";

export class Session {
	public static registeredBlocksList: Block[] = [];
	public username:  string | undefined;
	public sessionId:  string | undefined;
	public mpPassParameter:  string | undefined;

	public constructor(string1: string| undefined, string2: string| undefined) {
		this.username = string1;
		this.sessionId = string2;
	}
}
