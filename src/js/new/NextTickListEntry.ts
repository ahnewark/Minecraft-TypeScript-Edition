
import { JavaObject, java, long, int } from "jree";

export  class NextTickListEntry extends JavaObject implements java.lang.Comparable<NextTickListEntry> {
	private static nextTickEntryID:  long = 0n;
	public xCoord:  int;
	public yCoord:  int;
	public zCoord:  int;
	public blockID:  int;
	public scheduledTime:  long;
	private tickEntryID:  long = NextTickListEntry.nextTickEntryID++;

	public constructor(i1: int, i2: int, i3: int, i4: int) {
		super();
		this.xCoord = i1;
		this.yCoord = i2;
		this.zCoord = i3;
		this.blockID = i4;
	}

	public equals(object1: java.lang.Object| null):  boolean {
		if(!(object1 instanceof NextTickListEntry)) {
			return false;
		} else {
			let  nextTickListEntry2: NextTickListEntry = object1 as NextTickListEntry;
			return this.xCoord === nextTickListEntry2.xCoord && this.yCoord === nextTickListEntry2.yCoord && this.zCoord === nextTickListEntry2.zCoord && this.blockID === nextTickListEntry2.blockID;
		}
	}

	public hashCode():  int {
		return (this.xCoord * 128 * 1024 + this.zCoord * 128 + this.yCoord) * 256 + this.blockID;
	}

	public setScheduledTime(j1: long):  NextTickListEntry | null {
		this.scheduledTime = j1;
		return this;
	}

	public comparer(nextTickListEntry1: NextTickListEntry):  int {
		return this.scheduledTime < nextTickListEntry1.scheduledTime ? -1 : (this.scheduledTime > nextTickListEntry1.scheduledTime ? 1 : (this.tickEntryID < nextTickListEntry1.tickEntryID ? -1 : (this.tickEntryID > nextTickListEntry1.tickEntryID ? 1 : 0)));
	}

	public compareTo(object1: java.lang.Object| null):  int {
		return this.comparer(object1 as NextTickListEntry);
	}
}
