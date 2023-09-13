
import { gl } from "../application/gl";
import { java, int, double, float, byte } from "../jree/index";
import { GLAllocation } from "./GLAllocation";

export  class Tessellator {
	private static convertQuadsToTriangles:  boolean = true;
	private static tryVBO:  boolean = false;
	private byteBuffer:  java.nio.ByteBuffer | null;
	private intBuffer:  java.nio.IntBuffer | null;
	private floatBuffer:  java.nio.FloatBuffer | null;
	private rawBuffer:  number[];
	private vertexCount:  int = 0;
	private textureU:  double;
	private textureV:  double;
	private color:  int;
	private hasColor:  boolean = false;
	private hasTexture:  boolean = false;
	private hasNormals:  boolean = false;
	private rawBufferIndex:  int = 0;
	private addedVertices:  int = 0;
	private isColorDisabled:  boolean = false;
	private drawMode:  int;
	private xOffset:  double;
	private yOffset:  double;
	private zOffset:  double;
	private normal:  int;
	public static readonly instance:  Tessellator | null = new  Tessellator(2097152);
	private isDrawing:  boolean = false;
	private useVBO:  boolean = false;
	// private vertexBuffers:  java.nio.IntBuffer | null;
	private vertexBuffers:  WebGLBuffer[] | null;
	private vboIndex:  int = 0;
	private vboCount:  int = 10;
	private bufferSize:  int;

	private constructor(i1: int) {
		this.bufferSize = i1;
		this.byteBuffer = GLAllocation.createDirectByteBuffer(i1 * 4);
		this.intBuffer = this.byteBuffer.asIntBuffer();
		this.floatBuffer = this.byteBuffer.asFloatBuffer();
		this.rawBuffer = new   Array<number>(i1);
		// this.useVBO = Tessellator.tryVBO && GLContext.getCapabilities().GL_ARB_vertex_buffer_object;
		this.useVBO = true;
		if(this.useVBO) {
			//this.vertexBuffers = GLAllocation.createDirectIntBuffer(this.vboCount);
			this.vertexBuffers = [];
			for (let i = 0; i < this.vboCount; i++) {
				this.vertexBuffers.push(gl.createBuffer())
			}  

			// ARBVertexBufferObject.glGenBuffersARB(this.vertexBuffers);
		}

	}

	public draw():  void {
		if(!this.isDrawing) {
			throw new  java.lang.IllegalStateException("Not tesselating!");
		} else {
			this.isDrawing = false;
			if(this.vertexCount > 0) {
				this.intBuffer.clear();
				this.intBuffer.put(new Int32Array(this.rawBuffer), 0, this.rawBufferIndex);
				this.byteBuffer.position(0);
				this.byteBuffer.limit(this.rawBufferIndex * 4);
				if(this.useVBO) {
					this.vboIndex = (this.vboIndex + 1) % this.vboCount;
					// ARBVertexBufferObject.glBindBufferARB(gl.ARRAY_BUFFER, this.vertexBuffers.get(this.vboIndex));
					// ARBVertexBufferObject.glBufferDataARB(gl.ARRAY_BUFFER, this.byteBuffer, gl.STREAM_DRAW);
					gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffers[this.vboIndex])
					gl.bufferData(gl.ARRAY_BUFFER, this.byteBuffer.array(), gl.STREAM_DRAW);
				}

				if(this.hasTexture) {
					if(this.useVBO) {
						gl.vertexAttribPointer(2, gl.FLOAT, 32, false, 12, 0);
						// GL11.glTexCoordPointer(2, gl.FLOAT, 32, 12n);
					} else {
						this.floatBuffer.position(3);
						GL11.glTexCoordPointer(2, 32, this.floatBuffer);
					}

					// GL11.glEnableClientState(GL11.GL_TEXTURE_COORD_ARRAY);
				}

				if(this.hasColor) {
					if(this.useVBO) {
						GL11.glColorPointer(4, gl.UNSIGNED_BYTE, 32, 20n);
					} else {
						this.byteBuffer.position(20);
						GL11.glColorPointer(4, true, 32, this.byteBuffer);
					}

					GL11.glEnableClientState(GL11.GL_COLOR_ARRAY);
				}

				if(this.hasNormals) {
					if(this.useVBO) {
						GL11.glNormalPointer(gl.BYTE, 32, 24n);
					} else {
						this.byteBuffer.position(24);
						GL11.glNormalPointer(32, this.byteBuffer);
					}

					GL11.glEnableClientState(GL11.GL_NORMAL_ARRAY);
				}

				if(this.useVBO) {
					GL11.glVertexPointer(3, gl.FLOAT, 32, 0n);
				} else {
					this.floatBuffer.position(0);
					GL11.glVertexPointer(3, 32, this.floatBuffer);
				}

				GL11.glEnableClientState(GL11.GL_VERTEX_ARRAY);
				if(this.drawMode === 7 && Tessellator.convertQuadsToTriangles) {
					GL11.glDrawArrays(gl.TRIANGLES, gl.POINTS, this.vertexCount);
				} else {
					GL11.glDrawArrays(this.drawMode, gl.POINTS, this.vertexCount);
				}

				GL11.glDisableClientState(GL11.GL_VERTEX_ARRAY);
				if(this.hasTexture) {
					GL11.glDisableClientState(GL11.GL_TEXTURE_COORD_ARRAY);
				}

				if(this.hasColor) {
					GL11.glDisableClientState(GL11.GL_COLOR_ARRAY);
				}

				if(this.hasNormals) {
					GL11.glDisableClientState(GL11.GL_NORMAL_ARRAY);
				}
			}

			this.reset();
		}
	}

	private reset():  void {
		this.vertexCount = 0;
		this.byteBuffer.clear();
		this.rawBufferIndex = 0;
		this.addedVertices = 0;
	}

	public startDrawingQuads():  void {
		this.startDrawing(7);
	}

	public startDrawing(i1: int):  void {
		if(this.isDrawing) {
			throw new  java.lang.IllegalStateException("Already tesselating!");
		} else {
			this.isDrawing = true;
			this.reset();
			this.drawMode = i1;
			this.hasNormals = false;
			this.hasColor = false;
			this.hasTexture = false;
			this.isColorDisabled = false;
		}
	}

	public setTextureUV(d1: double, d3: double):  void {
		this.hasTexture = true;
		this.textureU = d1;
		this.textureV = d3;
	}

	public setColorOpaque_F(f1: float, f2: float, f3: float):  void {
		this.setColorOpaque((f1 * 255.0) as int, (f2 * 255.0) as int, (f3 * 255.0) as int);
	}

	public setColorRGBA_F(f1: float, f2: float, f3: float, f4: float):  void {
		this.setColorRGBA((f1 * 255.0) as int, (f2 * 255.0) as int, (f3 * 255.0) as int, (f4 * 255.0) as int);
	}

	public setColorOpaque(i1: int, i2: int, i3: int):  void {
		this.setColorRGBA(i1, i2, i3, 255);
	}

	public setColorRGBA(i1: int, i2: int, i3: int, i4: int):  void {
		if(!this.isColorDisabled) {
			if(i1 > 255) {
				i1 = 255;
			}

			if(i2 > 255) {
				i2 = 255;
			}

			if(i3 > 255) {
				i3 = 255;
			}

			if(i4 > 255) {
				i4 = 255;
			}

			if(i1 < 0) {
				i1 = 0;
			}

			if(i2 < 0) {
				i2 = 0;
			}

			if(i3 < 0) {
				i3 = 0;
			}

			if(i4 < 0) {
				i4 = 0;
			}

			this.hasColor = true;
			// if(java.nio.ByteOrder.nativeOrder() === java.nio.ByteOrder.LITTLE_ENDIAN) {
				this.color = i4 << 24 | i3 << 16 | i2 << 8 | i1;
			// } else {
			// 	this.color = i1 << 24 | i2 << 16 | i3 << 8 | i4;
			// }

		}
	}

	public addVertexWithUV(d1: double, d3: double, d5: double, d7: double, d9: double):  void {
		this.setTextureUV(d7, d9);
		this.addVertex(d1, d3, d5);
	}

	public addVertex(d1: double, d3: double, d5: double):  void {
		++this.addedVertices;
		if(this.drawMode === 7 && Tessellator.convertQuadsToTriangles && this.addedVertices % 4 === 0) {
			for(let  i7: int = 0; i7 < 2; ++i7) {
				let  i8: int = 8 * (3 - i7);
				if(this.hasTexture) {
					this.rawBuffer[this.rawBufferIndex + 3] = this.rawBuffer[this.rawBufferIndex - i8 + 3];
					this.rawBuffer[this.rawBufferIndex + 4] = this.rawBuffer[this.rawBufferIndex - i8 + 4];
				}

				if(this.hasColor) {
					this.rawBuffer[this.rawBufferIndex + 5] = this.rawBuffer[this.rawBufferIndex - i8 + 5];
				}

				this.rawBuffer[this.rawBufferIndex + 0] = this.rawBuffer[this.rawBufferIndex - i8 + 0];
				this.rawBuffer[this.rawBufferIndex + 1] = this.rawBuffer[this.rawBufferIndex - i8 + 1];
				this.rawBuffer[this.rawBufferIndex + 2] = this.rawBuffer[this.rawBufferIndex - i8 + 2];
				++this.vertexCount;
				this.rawBufferIndex += 8;
			}
		}

		if(this.hasTexture) {
			this.rawBuffer[this.rawBufferIndex + 3] = java.lang.Float.floatToRawIntBits(this.textureU as float);
			this.rawBuffer[this.rawBufferIndex + 4] = java.lang.Float.floatToRawIntBits(this.textureV as float);
		}

		if(this.hasColor) {
			this.rawBuffer[this.rawBufferIndex + 5] = this.color;
		}

		if(this.hasNormals) {
			this.rawBuffer[this.rawBufferIndex + 6] = this.normal;
		}

		this.rawBuffer[this.rawBufferIndex + 0] = java.lang.Float.floatToRawIntBits((d1 + this.xOffset) as float);
		this.rawBuffer[this.rawBufferIndex + 1] = java.lang.Float.floatToRawIntBits((d3 + this.yOffset) as float);
		this.rawBuffer[this.rawBufferIndex + 2] = java.lang.Float.floatToRawIntBits((d5 + this.zOffset) as float);
		this.rawBufferIndex += 8;
		++this.vertexCount;
		if(this.vertexCount % 4 === 0 && this.rawBufferIndex >= this.bufferSize - 32) {
			this.draw();
			this.isDrawing = true;
		}

	}

	public setColorOpaque_I(i1: int):  void {
		let  i2: int = i1 >> 16 & 255;
		let  i3: int = i1 >> 8 & 255;
		let  i4: int = i1 & 255;
		this.setColorOpaque(i2, i3, i4);
	}

	public setColorRGBA_I(i1: int, i2: int):  void {
		let  i3: int = i1 >> 16 & 255;
		let  i4: int = i1 >> 8 & 255;
		let  i5: int = i1 & 255;
		this.setColorRGBA(i3, i4, i5, i2);
	}

	public disableColor():  void {
		this.isColorDisabled = true;
	}

	public setNormal(f1: float, f2: float, f3: float):  void {
		if(!this.isDrawing) {
			console.log("But..");
		}

		this.hasNormals = true;
		let  b4: byte = ((f1 * 128.0) as int) as byte;
		let  b5: byte = ((f2 * 127.0) as int) as byte;
		let  b6: byte = ((f3 * 127.0) as int) as byte;
		this.normal = b4 | b5 << 8 | b6 << 16;
	}

	public setTranslationD(d1: double, d3: double, d5: double):  void {
		this.xOffset = d1;
		this.yOffset = d3;
		this.zOffset = d5;
	}

	public setTranslationF(f1: float, f2: float, f3: float):  void {
		this.xOffset += f1 as double;
		this.yOffset += f2 as double;
		this.zOffset += f3 as double;
	}
}
