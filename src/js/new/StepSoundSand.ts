
import { StepSound } from "./StepSound";

export  class StepSoundSand extends StepSound {
	public constructor(string1: string, f2: number, f3: number) {
		super(string1, f2, f3);
	}

	public func_1146_a(): string {
		return "step.gravel";
	}
}
