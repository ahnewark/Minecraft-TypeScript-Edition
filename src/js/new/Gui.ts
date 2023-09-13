import { JavaObject, float, int, double, java } from "../jree/index";
import { Tessellator } from "./Tessellator";
import { FontRenderer } from "./FontRenderer";
import { gl } from "../application/gl";

export  class Gui extends JavaObject {
	protected zLevel:  float = 0.0;

	// protected drawRect(i1: int, i2: int, i3: int, i4: int, i5: int):  void {
	// 	let  f6: float = (i5 >> 24 & 255) as float / 255.0;
	// 	let  f7: float = (i5 >> 16 & 255) as float / 255.0;
	// 	let  f8: float = (i5 >> 8 & 255) as float / 255.0;
	// 	let  f9: float = (i5 & 255) as float / 255.0;
	// 	let  tessellator10: Tessellator = Tessellator.instance;
	// 	GL11.glEnable(GL11.GL_BLEND);
	// 	GL11.glDisable(GL11.GL_TEXTURE_2D);
	// 	GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
	// 	GL11.glColor4f(f7, f8, f9, f6);
	// 	tessellator10.startDrawingQuads();
	// 	tessellator10.addVertex(i1 as double, i4 as double, 0.0);
	// 	tessellator10.addVertex(i3 as double, i4 as double, 0.0);
	// 	tessellator10.addVertex(i3 as double, i2 as double, 0.0);
	// 	tessellator10.addVertex(i1 as double, i2 as double, 0.0);
	// 	tessellator10.draw();
	// 	GL11.glEnable(GL11.GL_TEXTURE_2D);
	// 	GL11.glDisable(GL11.GL_BLEND);
	// }

    protected drawRect(stack, left, top, right, bottom, color, alpha = 1) {
        stack.save();
        stack.fillStyle = color;
        stack.globalAlpha = alpha;
        stack.fillRect(Math.floor(left), Math.floor(top), Math.floor(right - left), Math.floor(bottom - top));
        stack.restore();
    }

	// protected drawGradientRect(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int):  void {
	// 	let  f7: float = (i5 >> 24 & 255) as float / 255.0;
	// 	let  f8: float = (i5 >> 16 & 255) as float / 255.0;
	// 	let  f9: float = (i5 >> 8 & 255) as float / 255.0;
	// 	let  f10: float = (i5 & 255) as float / 255.0;
	// 	let  f11: float = (i6 >> 24 & 255) as float / 255.0;
	// 	let  f12: float = (i6 >> 16 & 255) as float / 255.0;
	// 	let  f13: float = (i6 >> 8 & 255) as float / 255.0;
	// 	let  f14: float = (i6 & 255) as float / 255.0;
    //     gl.disable(gl.TEXTURE_2D);
    //     gl.enable(gl.BLEND);
	// 	// GL11.glDisable(GL11.GL_TEXTURE_2D);
	// 	// GL11.glEnable(GL11.GL_BLEND);
	// 	GL11.glDisable(GL11.GL_ALPHA_TEST);
	// 	// GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    //     gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
	// 	GL11.glShadeModel(GL11.GL_SMOOTH);
	// 	let  tessellator15: Tessellator = Tessellator.instance;
	// 	tessellator15.startDrawingQuads();
	// 	tessellator15.setColorRGBA_F(f8, f9, f10, f7);
	// 	tessellator15.addVertex(i3 as double, i2 as double, 0.0);
	// 	tessellator15.addVertex(i1 as double, i2 as double, 0.0);
	// 	tessellator15.setColorRGBA_F(f12, f13, f14, f11);
	// 	tessellator15.addVertex(i1 as double, i4 as double, 0.0);
	// 	tessellator15.addVertex(i3 as double, i4 as double, 0.0);
	// 	tessellator15.draw();
	// 	GL11.glShadeModel(GL11.GL_FLAT);
	// 	GL11.glDisable(GL11.GL_BLEND);
	// 	GL11.glEnable(GL11.GL_ALPHA_TEST);
	// 	GL11.glEnable(GL11.GL_TEXTURE_2D);
	// }

    drawGradientRect(stack, left, top, right, bottom, color1, color2) {
        let gradient = stack.createLinearGradient(left + (right - left) / 2, top, left + (right - left) / 2, bottom - top);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        stack.fillStyle = gradient;
        stack.fillRect(left, top, right - left, bottom - top);
    }

	public drawCenteredString(fontRenderer1: FontRenderer| null, string2: java.lang.String| null, i3: int, i4: int, i5: int):  void {
		fontRenderer1.drawStringWithShadow(string2, i3 - fontRenderer1.getStringWidth(string2) / 2, i4, i5);
	}

	public drawString(fontRenderer1: FontRenderer| null, string2: java.lang.String| null, i3: int, i4: int, i5: int):  void {
		fontRenderer1.drawStringWithShadow(string2, i3, i4, i5);
	}

	public drawTexturedModalRect(i1: int, i2: int, i3: int, i4: int, i5: int, i6: int):  void {
		let  f7: float = 0.00390625;
		let  f8: float = 0.00390625;
		let  tessellator9: Tessellator = Tessellator.instance;
		tessellator9.startDrawingQuads();
		tessellator9.addVertexWithUV((i1 + 0) as double, (i2 + i6) as double, this.zLevel as double, ((i3 + 0) as float * f7) as double, ((i4 + i6) as float * f8) as double);
		tessellator9.addVertexWithUV((i1 + i5) as double, (i2 + i6) as double, this.zLevel as double, ((i3 + i5) as float * f7) as double, ((i4 + i6) as float * f8) as double);
		tessellator9.addVertexWithUV((i1 + i5) as double, (i2 + 0) as double, this.zLevel as double, ((i3 + i5) as float * f7) as double, ((i4 + 0) as float * f8) as double);
		tessellator9.addVertexWithUV((i1 + 0) as double, (i2 + 0) as double, this.zLevel as double, ((i3 + 0) as float * f7) as double, ((i4 + 0) as float * f8) as double);
		tessellator9.draw();
	}
}
