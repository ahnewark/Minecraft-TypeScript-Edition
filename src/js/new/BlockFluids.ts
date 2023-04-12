


import { int, float, java, double } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { Material } from "./Material";
import { IBlockAccess } from "./IBlockAccess";
import { Entity } from "./Entity";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../java/util/Random";
import { Block } from "./Block";

export abstract  class BlockFluids extends Block {
	protected constructor(i1: int, material2: Material| undefined) {
		super(i1, (material2 === MaterialRegistry.lava ? 14 : 12) * 16 + 13, material2);
		let  f3: float = 0.0;
		let  f4: float = 0.0;
		this.setBlockBounds(0.0 + f4, 0.0 + f3, 0.0 + f4, 1.0 + f4, 1.0 + f3, 1.0 + f4);
		this.setTickOnLoad(true);
	}

	public static setFluidHeight(i0: int):  float {
		if(i0 >= 8) {
			i0 = 0;
		}

		let  f1: float = (i0 + 1) as float / 9.0;
		return f1;
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 !== 0 && i1 !== 1 ? this.blockIndexInTexture + 1 : this.blockIndexInTexture;
	}

	protected async  func_290_h(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<int> {
		return await world1.getBlockMaterial(i2, i3, i4) !== this.blockMaterial ? -1 : await world1.getBlockMetadata(i2, i3, i4);
	}

	protected async func_289_b(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int): Promise<int> {
		if(await iBlockAccess1.getBlockMaterial(i2, i3, i4) !== this.blockMaterial) {
			return -1;
		} else {
			let  i5: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
			if(i5 >= 8) {
				i5 = 0;
			}

			return i5;
		}
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public canCollideCheck(i1: int, z2: boolean):  boolean {
		return z2 && i1 === 0;
	}

	public async shouldSideBeRendered(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<boolean> {
		let  material6: Material = await iBlockAccess1.getBlockMaterial(i2, i3, i4);
		return material6 === this.blockMaterial ? false : (material6 === MaterialRegistry.ice ? false : (i5 === 1 ? true : await super.shouldSideBeRendered(iBlockAccess1, i2, i3, i4, i5)));
	}

	public async getCollisionBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		return undefined;
	}

	public getRenderType():  int {
		return 4;
	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return 0;
	}

	public quantityDropped(random1: Random| undefined):  int {
		return 0;
	}

	private async func_291_e(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int):  Promise<Vec3D | undefined> {
		let  vec3D5: Vec3D = Vec3D.createVector(0.0, 0.0, 0.0);
		let  i6: int = await this.func_289_b(iBlockAccess1, i2, i3, i4);

		for(let  i7: int = 0; i7 < 4; ++i7) {
			let  i8: int = i2;
			let  i10: int = i4;
			if(i7 === 0) {
				i8 = i2 - 1;
			}

			if(i7 === 1) {
				i10 = i4 - 1;
			}

			if(i7 === 2) {
				++i8;
			}

			if(i7 === 3) {
				++i10;
			}

			let  i11: int = await this.func_289_b(iBlockAccess1, i8, i3, i10);
			let  i12: int;
			if(i11 < 0) {
				if(!(await iBlockAccess1.getBlockMaterial(i8, i3, i10)).getIsSolid()) {
					i11 = await this.func_289_b(iBlockAccess1, i8, i3 - 1, i10);
					if(i11 >= 0) {
						i12 = i11 - (i6 - 8);
						vec3D5 = vec3D5.addVector(((i8 - i2) * i12) as double, ((i3 - i3) * i12) as double, ((i10 - i4) * i12) as double);
					}
				}
			} else if(i11 >= 0) {
				i12 = i11 - i6;
				vec3D5 = vec3D5.addVector(((i8 - i2) * i12) as double, ((i3 - i3) * i12) as double, ((i10 - i4) * i12) as double);
			}
		}

		if(await iBlockAccess1.getBlockMetadata(i2, i3, i4) >= 8) {
			let  z13: boolean = false;
			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2, i3, i4 - 1, 2)) {
				z13 = true;
			}

			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2, i3, i4 + 1, 3)) {
				z13 = true;
			}

			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2 - 1, i3, i4, 4)) {
				z13 = true;
			}

			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2 + 1, i3, i4, 5)) {
				z13 = true;
			}

			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2, i3 + 1, i4 - 1, 2)) {
				z13 = true;
			}

			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2, i3 + 1, i4 + 1, 3)) {
				z13 = true;
			}

			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2 - 1, i3 + 1, i4, 4)) {
				z13 = true;
			}

			if(z13 || await this.shouldSideBeRendered(iBlockAccess1, i2 + 1, i3 + 1, i4, 5)) {
				z13 = true;
			}

			if(z13) {
				vec3D5 = vec3D5.normalize().addVector(0.0, -6.0, 0.0);
			}
		}

		vec3D5 = vec3D5.normalize();
		return vec3D5;
	}

	public async velocityToAddToEntity(world1: World| undefined, i2: int, i3: int, i4: int, entity5: Entity| undefined, vec3D6: Vec3D| undefined):  Promise<void> {
		let  vec3D7: Vec3D = await this.func_291_e(world1, i2, i3, i4);
		vec3D6.xCoord += vec3D7.xCoord;
		vec3D6.yCoord += vec3D7.yCoord;
		vec3D6.zCoord += vec3D7.zCoord;
	}

	public tickRate():  int {
		return this.blockMaterial === MaterialRegistry.water ? 5 : (this.blockMaterial === MaterialRegistry.lava ? 30 : 0);
	}

	public async getBlockBrightness(iBlockAccess1: IBlockAccess| undefined, i2: int, i3: int, i4: int):  Promise<float> {
		let  f5: float = await iBlockAccess1.getLightBrightness(i2, i3, i4);
		let  f6: float = await iBlockAccess1.getLightBrightness(i2, i3 + 1, i4);
		return f5 > f6 ? f5 : f6;
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		await super.updateTick(world1, i2, i3, i4, random5);
	}

	public getRenderBlockPass():  int {
		return this.blockMaterial === MaterialRegistry.water ? 1 : 0;
	}

	public async randomDisplayTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined): Promise<void> {
		if(this.blockMaterial === MaterialRegistry.water && random5.nextInt(64) === 0) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			if(i6 > 0 && i6 < 8) {
				world1.playSoundEffect((i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double, "liquid.water", random5.nextFloat() * 0.25 + 0.75, random5.nextFloat() * 1.0 + 0.5);
			}
		}

		if(this.blockMaterial === MaterialRegistry.lava && await world1.getBlockMaterial(i2, i3 + 1, i4) === MaterialRegistry.air && !await world1.isBlockOpaqueCube(i2, i3 + 1, i4) && random5.nextInt(100) === 0) {
			let  d12: double = (i2 as float + random5.nextFloat()) as double;
			let  d8: double = i3 as double + this.maxY;
			let  d10: double = (i4 as float + random5.nextFloat()) as double;
			world1.spawnParticle("lava", d12, d8, d10, 0.0, 0.0, 0.0);
		}

	}

	public static async func_293_a(iBlockAccess0: IBlockAccess| undefined, i1: int, i2: int, i3: int, material4: Material| undefined):  Promise<double> {
		let  vec3D5: Vec3D = undefined;
		if(material4 === MaterialRegistry.water) {
			vec3D5 = await (Block.waterStill as BlockFluids).func_291_e(iBlockAccess0, i1, i2, i3);
		}

		if(material4 === MaterialRegistry.lava) {
			vec3D5 = await (Block.lavaStill as BlockFluids).func_291_e(iBlockAccess0, i1, i2, i3);
		}

		return vec3D5.xCoord === 0.0 && vec3D5.zCoord === 0.0 ? -1000.0 : java.lang.Math.atan2(vec3D5.zCoord, vec3D5.xCoord) - java.lang.Math.PI / 2;
	}

	public async onBlockAdded(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		await this.checkForHarden(world1, i2, i3, i4);
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await this.checkForHarden(world1, i2, i3, i4);
	}

	private async checkForHarden(world1: World| undefined, i2: int, i3: int, i4: int): Promise<void> {
		if(await world1.getBlockId(i2, i3, i4) === this.blockID) {
			if(this.blockMaterial === MaterialRegistry.lava) {
				let  z5: boolean = false;
				if(z5 || await world1.getBlockMaterial(i2, i3, i4 - 1) === MaterialRegistry.water) {
					z5 = true;
				}

				if(z5 || await world1.getBlockMaterial(i2, i3, i4 + 1) === MaterialRegistry.water) {
					z5 = true;
				}

				if(z5 || await world1.getBlockMaterial(i2 - 1, i3, i4) === MaterialRegistry.water) {
					z5 = true;
				}

				if(z5 || await world1.getBlockMaterial(i2 + 1, i3, i4) === MaterialRegistry.water) {
					z5 = true;
				}

				if(z5 || await world1.getBlockMaterial(i2, i3 + 1, i4) === MaterialRegistry.water) {
					z5 = true;
				}

				if(z5) {
					let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
					if(i6 === 0) {
						await world1.setBlockWithNotify(i2, i3, i4, Block.obsidian.blockID);
					} else if(i6 <= 4) {
						await world1.setBlockWithNotify(i2, i3, i4, Block.cobblestone.blockID);
					}

					this.func_292_i(world1, i2, i3, i4);
				}
			}

		}
	}

	protected func_292_i(world1: World| undefined, i2: int, i3: int, i4: int):  void {
		world1.playSoundEffect((i2 as float + 0.5) as double, (i3 as float + 0.5) as double, (i4 as float + 0.5) as double, "random.fizz", 0.5, 2.6 + (world1.rand.nextFloat() - world1.rand.nextFloat()) * 0.8);

		for(let  i5: int = 0; i5 < 8; ++i5) {
			world1.spawnParticle("largesmoke", i2 as double + java.lang.Math.random(), i3 as double + 1.2, i4 as double + java.lang.Math.random(), 0.0, 0.0, 0.0);
		}

	}
}
