
import { JavaObject, int, java } from "../jree/index";
import { MCHashTable } from "./MCHashTable";

export class HashEntry {
	public readonly hashEntry:  int;
	public valueEntry: any;
	public nextEntry: HashEntry | null;
	public readonly slotHash:  int;

	public constructor(i1: int, i2: int, object3: any, hashEntry4: HashEntry| null) {
		this.valueEntry = object3;
		this.nextEntry = hashEntry4;
		this.hashEntry = i2;
		this.slotHash = i1;
	}

	public getHash():  int {
		return this.hashEntry;
	}

	public getValue():  java.lang.Object | null {
		return this.valueEntry;
	}

	public equals(object1: java.lang.Object| null):  boolean {
		if(!(object1 instanceof HashEntry)) {
			return false;
		} else {
			let  hashEntry2: HashEntry = object1 as HashEntry;
			let  integer3 = this.getHash();
			let  integer4 = hashEntry2.getHash();
			if(integer3 === integer4 || integer3 !== null && integer3 === integer4) {
				let  object5 = this.getValue();
				let  object6 = hashEntry2.getValue();
				if(object5 === object6 || object5 !== null && object5.equals(object6)) {
					return true;
				}
			}

			return false;
		}
	}

	public hashCode():  int {
		return MCHashTable.getHash(this.hashEntry);
	}

	public toString():  string {
		return this.getHash() + "=" + this.getValue();
	}
}
