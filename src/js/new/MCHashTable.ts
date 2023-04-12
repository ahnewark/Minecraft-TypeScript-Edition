
import { JavaObject, int, float, java } from "../jree/index";
import { HashEntry } from "./HashEntry";

export  class MCHashTable extends JavaObject {
	private slots:  HashEntry[] | undefined = new   Array<HashEntry>(16);
	private count:  int;
	private threshold:  int = 12;
	private readonly growFactor:  float = 0.75;
	private versionStamp:  int;

	private static computeHash(i0: int):  int {
		i0 ^= i0 >>> 20 ^ i0 >>> 12;
		return i0 ^ i0 >>> 7 ^ i0 >>> 4;
	}

	private static getSlotIndex(i0: int, i1: int):  int {
		return i0 & i1 - 1;
	}

	public lookup(i1: int):  java.lang.Object | undefined {
		let  i2: int = MCHashTable.computeHash(i1);

		for(let  hashEntry3: HashEntry = this.slots[MCHashTable.getSlotIndex(i2, this.slots.length)]; hashEntry3 !== undefined; hashEntry3 = hashEntry3.nextEntry) {
			if(hashEntry3.hashEntry === i1) {
				return hashEntry3.valueEntry;
			}
		}

		return undefined;
	}

	public addKey(i1: int, object2: java.lang.Object| undefined):  void {
		let  i3: int = MCHashTable.computeHash(i1);
		let  i4: int = MCHashTable.getSlotIndex(i3, this.slots.length);

		for(let  hashEntry5: HashEntry = this.slots[i4]; hashEntry5 !== undefined; hashEntry5 = hashEntry5.nextEntry) {
			if(hashEntry5.hashEntry === i1) {
				hashEntry5.valueEntry = object2;
			}
		}

		++this.versionStamp;
		this.insert(i3, i1, object2, i4);
	}

	private grow(i1: int):  void {
		let  hashEntry2: HashEntry[] = this.slots;
		let  i3: int = hashEntry2.length;
		if(i3 === 1073741824) {
			this.threshold = java.lang.Integer.MAX_VALUE;
		} else {
			let  hashEntry4: HashEntry[] = new   Array<HashEntry>(i1);
			this.copyTo(hashEntry4);
			this.slots = hashEntry4;
			this.threshold = (i1 as float * this.growFactor) as int;
		}
	}

	private copyTo(hashEntry1: HashEntry[]| undefined):  void {
		let  hashEntry2: HashEntry[] = this.slots;
		let  i3: int = hashEntry1.length;

		for(let  i4: int = 0; i4 < hashEntry2.length; ++i4) {
			let  hashEntry5: HashEntry = hashEntry2[i4];
			if(hashEntry5 !== undefined) {
				hashEntry2[i4] = undefined;

				let  hashEntry6: HashEntry;
				do {
					hashEntry6 = hashEntry5.nextEntry;
					let  i7: int = MCHashTable.getSlotIndex(hashEntry5.slotHash, i3);
					hashEntry5.nextEntry = hashEntry1[i7];
					hashEntry1[i7] = hashEntry5;
					hashEntry5 = hashEntry6;
				} while(hashEntry6 !== undefined);
			}
		}

	}

	public removeObject(i1: int):  java.lang.Object | undefined {
		let  hashEntry2: HashEntry = this.removeEntry(i1);
		return hashEntry2 === undefined ? undefined : hashEntry2.valueEntry;
	}

	protected removeEntry(i1: int):  HashEntry | undefined {
		let  i2: int = MCHashTable.computeHash(i1);
		let  i3: int = MCHashTable.getSlotIndex(i2, this.slots.length);
		let  hashEntry4: HashEntry = this.slots[i3];

		let  hashEntry5: HashEntry;
		let  hashEntry6: HashEntry;
		for(hashEntry5 = hashEntry4; hashEntry5 !== undefined; hashEntry5 = hashEntry6) {
			hashEntry6 = hashEntry5.nextEntry;
			if(hashEntry5.hashEntry === i1) {
				++this.versionStamp;
				--this.count;
				if(hashEntry4 === hashEntry5) {
					this.slots[i3] = hashEntry6;
				} else {
					hashEntry4.nextEntry = hashEntry6;
				}

				return hashEntry5;
			}

			hashEntry4 = hashEntry5;
		}

		return hashEntry5;
	}

	public clearMap():  void {
		++this.versionStamp;
		let  hashEntry1: HashEntry[] = this.slots;

		for(let  i2: int = 0; i2 < hashEntry1.length; ++i2) {
			hashEntry1[i2] = undefined;
		}

		this.count = 0;
	}

	private insert(i1: int, i2: int, object3: java.lang.Object| undefined, i4: int):  void {
		let  hashEntry5: HashEntry = this.slots[i4];
		this.slots[i4] = new  HashEntry(i1, i2, object3, hashEntry5);
		if(this.count++ >= this.threshold) {
			this.grow(2 * this.slots.length);
		}

	}

	public static getHash(i0: int):  int {
		return MCHashTable.computeHash(i0);
	}
}
