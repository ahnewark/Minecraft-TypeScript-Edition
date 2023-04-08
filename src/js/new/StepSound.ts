export class StepSound {
	public readonly field_1678_a:  string;
	public readonly field_1677_b:  number;
	public readonly field_1679_c:  number;

	public constructor(string1: string, f2: number, f3: number) {
		this.field_1678_a = string1;
		this.field_1677_b = f2;
		this.field_1679_c = f3;
	}

	public func_1147_b():  number {
		return this.field_1677_b;
	}

	public func_1144_c():  number {
		return this.field_1679_c;
	}

	public func_1146_a(): string {
		return "step." + this.field_1678_a;
	}

	public func_1145_d(): string {
		return "step." + this.field_1678_a;
	}
}
