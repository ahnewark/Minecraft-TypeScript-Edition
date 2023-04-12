import { int, java } from "../jree/index";
import { World } from "./World";
import { Vec3D } from "./Vec3D";
import { MovingObjectPosition } from "./MovingObjectPosition";
import { MinecartTrackLogic } from "./MinecartTrackLogic";
import { IBlockAccess } from "./IBlockAccess";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { Block } from "./Block";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { MaterialRegistry } from "./index";
import { Random } from "../java/util/Random";

export  class BlockMinecartTrack extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.circuits);
		this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.125, 1.0);
	}

	public async getCollisionBoundingBoxFromPool(world1: World| null, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | null> {
		return null;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public async collisionRayTrace(world1: World| null, i2: int, i3: int, i4: int, vec3D5: Vec3D| null, vec3D6: Vec3D| null):  Promise<MovingObjectPosition | null> {
		this.setBlockBoundsBasedOnState(world1, i2, i3, i4);
		return await super.collisionRayTrace(world1, i2, i3, i4, vec3D5, vec3D6);
	}

	public async setBlockBoundsBasedOnState(iBlockAccess1: IBlockAccess| null, i2: int, i3: int, i4: int):  Promise<void> {
		let  i5: int = await iBlockAccess1.getBlockMetadata(i2, i3, i4);
		if(i5 >= 2 && i5 <= 5) {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.625, 1.0);
		} else {
			this.setBlockBounds(0.0, 0.0, 0.0, 1.0, 0.125, 1.0);
		}

	}

	public getBlockTextureFromSideAndMetadata(i1: int, i2: int):  int {
		return i2 >= 6 ? this.blockIndexInTexture - 16 : this.blockIndexInTexture;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 9;
	}

	public quantityDropped(random1: Random| null):  int {
		return 1;
	}

	public async canPlaceBlockAt(world1: World| null, i2: int, i3: int, i4: int):  Promise<boolean> {
		return await world1.isBlockOpaqueCube(i2, i3 - 1, i4);
	}

	public async onBlockAdded(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(!world1.multiplayerWorld) {
			await world1.setBlockMetadataWithNotify(i2, i3, i4, 15);
			await this.func_4031_h(world1, i2, i3, i4);
		}

	}

	public async onNeighborBlockChange(world1: World| null, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		if(!world1.multiplayerWorld) {
			let  i6: int = await world1.getBlockMetadata(i2, i3, i4);
			let  z7: boolean = false;
			if(!await world1.isBlockOpaqueCube(i2, i3 - 1, i4)) {
				z7 = true;
			}

			if(i6 === 2 && !await world1.isBlockOpaqueCube(i2 + 1, i3, i4)) {
				z7 = true;
			}

			if(i6 === 3 && !await world1.isBlockOpaqueCube(i2 - 1, i3, i4)) {
				z7 = true;
			}

			if(i6 === 4 && !await world1.isBlockOpaqueCube(i2, i3, i4 - 1)) {
				z7 = true;
			}

			if(i6 === 5 && !await world1.isBlockOpaqueCube(i2, i3, i4 + 1)) {
				z7 = true;
			}

			if(z7) {
				this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
				await world1.setBlockWithNotify(i2, i3, i4, 0);
			} else if(i5 > 0 && Block.blocksList[i5].canProvidePower() && MinecartTrackLogic.getNAdjacentTracks(await  MinecartTrackLogic.Construct(this, world1, i2, i3, i4)) === 3) {
				await this.func_4031_h(world1, i2, i3, i4);
			}

		}
	}

	private async func_4031_h(world1: World| null, i2: int, i3: int, i4: int):  Promise<void> {
		if(!world1.multiplayerWorld) {
			(await  MinecartTrackLogic.Construct(this, world1, i2, i3, i4)).func_792_a(await world1.isBlockIndirectlyGettingPowered(i2, i3, i4));
		}
	}
}
