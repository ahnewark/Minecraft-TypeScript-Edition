import { int, java, float, double } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { Material } from "./Material";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Block } from "./Block";

import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../jree/java/util/Random";

export  class BlockTorch extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.circuits);
		this.setTickOnLoad(true);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		return undefined;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 2;
	}

	public async canPlaceBlockAt(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.isBlockOpaqueCube(i2 - 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2 + 1, i3, i4) ? true : (await world1.isBlockOpaqueCube(i2, i3, i4 - 1) ? true : (await world1.isBlockOpaqueCube(i2, i3, i4 + 1) ? true : await world1.isBlockOpaqueCube(i2, i3 - 1, i4))));
	}

	public async onBlockPlaced(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		if(i5 === 1 && await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
			i6 = 5;
		}

		if(i5 === 2 && await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
			i6 = 4;
		}

		if(i5 === 3 && await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
			i6 = 3;
		}

		if(i5 === 4 && await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
			i6 = 2;
		}

		if(i5 === 5 && await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
			i6 = 1;
		}

		await world1.setBlockMetadataWithNotify(i2, i3, i4, i6);
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random| undefined):  Promise<void> {
		await super.updateTick(world1, i2, i3, i4, random5);
		if(await world1.getBlockMetadata(i2, i3, i4) === 0) {
			await this.onBlockAdded(world1, i2, i3, i4);
		}

	}

	public async onBlockAdded(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		if(await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 1);
		} else if(await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 2);
		} else if(await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 3);
		} else if(await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 4);
		} else if(await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 5);
		}

	    await this.dropTorchIfCantStay(world1, i2, i3, i4);
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(this.dropTorchIfCantStay(world1, i2, i3, i4)) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			let  z7: boolean = false;
			if(!await world1.isBlockOpaqueCube(i2 - 1, i3, i4) && i6 === 1) {
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2 + 1, i3, i4) && i6 === 2) {
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2, i3, i4 - 1) && i6 === 3) {
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2, i3, i4 + 1) && i6 === 4) {
				z7 = true;
			}

			if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4) && i6 === 5) {
				z7 = true;
			}

			if(z7) {
				await this.dropBlockAsItem(world1, i2, i3, i4,await  world1.getBlockMetadata(i2, i3, i4));
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			}
		}

	}

	private async dropTorchIfCantStay(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		if(!await this.canPlaceBlockAt(world1, i2, i3, i4)) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
			return false;
		} else {
			return true;
		}
	}

	public async collisionRayTrace(world1: World| undefined, i2: int, i3: int, i4: int, vec3D5: Vec3D| undefined, vec3D6: Vec3D| undefined):  Promise<MovingObjectPosition | undefined> {
		let  i7: int = await world1.getBlockMetadata(i2, i3, i4) & 7;
		let  f8: float = 0.15;
		if(i7 === 1) {
			this.setBlockBounds(0.0, 0.2, 0.5 - f8, f8 * 2.0, 0.8, 0.5 + f8);
		} else if(i7 === 2) {
			this.setBlockBounds(1.0 - f8 * 2.0, 0.2, 0.5 - f8, 1.0, 0.8, 0.5 + f8);
		} else if(i7 === 3) {
			this.setBlockBounds(0.5 - f8, 0.2, 0.0, 0.5 + f8, 0.8, f8 * 2.0);
		} else if(i7 === 4) {
			this.setBlockBounds(0.5 - f8, 0.2, 1.0 - f8 * 2.0, 0.5 + f8, 0.8, 1.0);
		} else {
			f8 = 0.1;
			this.setBlockBounds(0.5 - f8, 0.0, 0.5 - f8, 0.5 + f8, 0.6, 0.5 + f8);
		}

		return await super.collisionRayTrace(world1, i2, i3, i4, vec3D5, vec3D6);
	}

	public async randomDisplayTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random | undefined):  Promise<void> {
		let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
		let  d7: double = (i2 as float + 0.5) as double;
		let  d9: double = (i3 as float + 0.7) as double;
		let  d11: double = (i4 as float + 0.5) as double;
		let  d13: double = 0.22 as double;
		let  d15: double = 0.27 as double;
		if(i6 === 1) {
			world1.spawnParticle("smoke", d7 - d15, d9 + d13, d11, 0.0, 0.0, 0.0);
			world1.spawnParticle("flame", d7 - d15, d9 + d13, d11, 0.0, 0.0, 0.0);
		} else if(i6 === 2) {
			world1.spawnParticle("smoke", d7 + d15, d9 + d13, d11, 0.0, 0.0, 0.0);
			world1.spawnParticle("flame", d7 + d15, d9 + d13, d11, 0.0, 0.0, 0.0);
		} else if(i6 === 3) {
			world1.spawnParticle("smoke", d7, d9 + d13, d11 - d15, 0.0, 0.0, 0.0);
			world1.spawnParticle("flame", d7, d9 + d13, d11 - d15, 0.0, 0.0, 0.0);
		} else if(i6 === 4) {
			world1.spawnParticle("smoke", d7, d9 + d13, d11 + d15, 0.0, 0.0, 0.0);
			world1.spawnParticle("flame", d7, d9 + d13, d11 + d15, 0.0, 0.0, 0.0);
		} else {
			world1.spawnParticle("smoke", d7, d9, d11, 0.0, 0.0, 0.0);
			world1.spawnParticle("flame", d7, d9, d11, 0.0, 0.0, 0.0);
		}

	}
}
