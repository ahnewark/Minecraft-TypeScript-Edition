import { gl } from "../application/gl";
import { JavaObject, java, int } from "../jree/index";

export class GLAllocation {
	// private static displayLists: int[] = [];
	// private static textureNames: int[] = [];
	private static textures: WebGLTexture[] = [];

	public static generateDisplayLists(i0: int):  int {
		throw new Error("generateDisplayLists is not supported in-browser")
	}

	public static generateTextureNames(intBuffer0: java.nio.IntBuffer| null):  void {

		//GL11.glGenTextures(intBuffer0);
		GLAllocation.textures.push(gl.createTexture());

		// for(let  i1: int = intBuffer0.position(); i1 < intBuffer0.limit(); ++i1) {
		// 	GLAllocation.textureNames.push(intBuffer0.get(i1));
		// }

		for(let i1: int = intBuffer0.position(); i1 < intBuffer0.limit(); ++i1) {
			GLAllocation.textures.push(gl.createTexture());
		}
	}

	public static deleteTexturesAndDisplayLists():  void {
		// for(let  i0: int = 0; i0 < GLAllocation.displayLists.length; i0 += 2) {
		// 	GL11.glDeleteLists((GLAllocation.displayLists[i0]).intValue(), (GLAllocation.displayLists[i0 + 1]).intValue());
		// }

		// let  intBuffer2: java.nio.IntBuffer = GLAllocation.createDirectIntBuffer(GLAllocation.textureNames.length);
		// intBuffer2.flip();
		// GL11.glDeleteTextures(intBuffer2);
		

		// for(let  i1: int = 0; i1 < GLAllocation.textureNames.length; ++i1) {
		// 	intBuffer2.put((GLAllocation.textureNames[i1] as java.lang.Integer).intValue());
		// }

		// intBuffer2.flip();
		// GL11.glDeleteTextures(intBuffer2);
		// GLAllocation.displayLists = [];
		// GLAllocation.textureNames = [];
		GLAllocation.textures = [];

		this.textures.forEach(texture => {
			gl.deleteTexture(texture);
		})

	}

	public static createDirectByteBuffer(i0: int):  java.nio.ByteBuffer | null {
		let  byteBuffer1: java.nio.ByteBuffer = java.nio.ByteBuffer.allocateDirect(i0)/*.order(java.nio.ByteOrder.nativeOrder())*/;
		return byteBuffer1;
	}

	public static createDirectIntBuffer(i0: int):  java.nio.IntBuffer | null {
		return GLAllocation.createDirectByteBuffer(i0 << 2).asIntBuffer();
	}

	public static createDirectFloatBuffer(i0: int):  java.nio.FloatBuffer | null {
		return GLAllocation.createDirectByteBuffer(i0 << 2).asFloatBuffer();
	}
}
