


import { JavaObject, java } from "../jree/index";
import { NBTTagCompound } from "./NBTTagCompound";
import { NBTBase } from "./NBTBase";
import { DataOutput } from "../java/io/DataOutput";
import { DataInput } from "../java/io/DataInput";
import { DataOutputStream } from "../java/io/DataOutputStream";
import { DataInputStream } from "../java/io/DataInputStream";
import { NBTRegistry } from "./static/NBTRegistry";
import GZIPOutputStream from "../jree/java/util/zip/GZIPOutputStream";
import GZIPInputStream from "../jree/java/util/zip/GZIPInputStream";

const DISABLE_COMPRESSION = false;

export  class CompressedStreamTools extends JavaObject {
	public static async func_1138_a(inputStream0: java.io.InputStream):  Promise<NBTTagCompound> {
		let  dataInputStream1: DataInputStream;

		if (DISABLE_COMPRESSION)
			dataInputStream1 = new DataInputStream(inputStream0);
		else 
			dataInputStream1 = new DataInputStream(new GZIPInputStream(inputStream0));

		let  nBTTagCompound2: NBTTagCompound;
		try {
			nBTTagCompound2 = await CompressedStreamTools.func_1141_a(dataInputStream1);
		} finally {
			await dataInputStream1.close();
		}

		return nBTTagCompound2;
	}

	public static async writeGzippedCompoundToOutputStream(nBTTagCompound0: NBTTagCompound, outputStream1: java.io.OutputStream):  Promise<void> {
		let dataOutputStream2: DataOutputStream;

		if (DISABLE_COMPRESSION)
			dataOutputStream2 = new DataOutputStream(outputStream1);
		else
			dataOutputStream2 = new DataOutputStream(new GZIPOutputStream(outputStream1));

		try {
			await CompressedStreamTools.func_1139_a(nBTTagCompound0, dataOutputStream2);
		} finally {
			await dataOutputStream2.close();
		}

	}

	public static async func_1141_a(dataInput0: DataInput):  Promise<NBTTagCompound> {
		let  nBTBase1: NBTBase = await NBTRegistry.readTag(dataInput0);
		if(nBTBase1 instanceof NBTTagCompound) {
			return nBTBase1 as NBTTagCompound;
		} else {
			throw new  java.io.IOException("Root tag must be a named compound tag");
		}
	}

	public static async func_1139_a(nBTTagCompound0: NBTTagCompound, dataOutput1: DataOutput): Promise<void> {
		await NBTRegistry.writeTag(nBTTagCompound0, dataOutput1);
	}
}
