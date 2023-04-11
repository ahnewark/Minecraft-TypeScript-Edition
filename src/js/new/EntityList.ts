import { JavaObject, java, int } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { EntityZombieSimple } from "./EntityZombieSimple";
import { EntityZombie } from "./EntityZombie";
import { EntityTNTPrimed } from "./EntityTNTPrimed";
import { EntitySquid } from "./EntitySquid";
import { EntitySpider } from "./EntitySpider";
import { EntitySnowball } from "./EntitySnowball";
import { EntitySlime } from "./EntitySlime";
import { EntitySkeleton } from "./EntitySkeleton";
import { EntitySheep } from "./EntitySheep";
import { EntityPigZombie } from "./EntityPigZombie";
import { EntityPig } from "./EntityPig";
import { EntityPainting } from "./EntityPainting";
import { EntityMobs } from "./EntityMobs";
import { EntityMinecart } from "./EntityMinecart";
import { EntityLiving } from "./EntityLiving";
import { EntityItem } from "./EntityItem";
import { EntityGhast } from "./EntityGhast";
import { EntityFallingSand } from "./EntityFallingSand";
import { EntityCreeper } from "./EntityCreeper";
import { EntityCow } from "./EntityCow";
import { EntityChicken } from "./EntityChicken";
import { EntityBoat } from "./EntityBoat";
import { EntityArrow } from "./EntityArrow";
import { Entity } from "./Entity";

export class EntityList {
	private static stringToClassMapping:  { [string: string]: (world: World) => Entity } = {};
	private static IDtoClassMapping:  { [id: number]: (world: World) => Entity  }  = {};
	private static classToIDMapping: { [_class: string]: number }  = {};

	private static addMapping(class0: (world: World) => Entity, string1: string, i2: int):  void {
		EntityList.stringToClassMapping[string1] = class0;
		EntityList.IDtoClassMapping[i2] = class0;
		EntityList.classToIDMapping[string1] = i2;
	}

	public static createEntityInWorld(string0: string, world1: World| null):  Entity | null {
		let  entity2: Entity = null;

		try {
			let makeEntity = EntityList.stringToClassMapping[string0];
			if(makeEntity) {
				entity2 = makeEntity(world1);
			}
		} catch (exception4) {
			if (exception4 instanceof java.lang.Exception) {
				console.error(exception4);
				console.trace();
			} else {
				throw exception4;
			}
		}

		return entity2;
	}

	public static createEntityFromNBT(nBTTagCompound0: NBTTagCompound| null, world1: World| null):  Entity | null {
		let  entity2: Entity = null;

		try {
			let  makeEntity = EntityList.stringToClassMapping[nBTTagCompound0.getString("id")];
			if(makeEntity) {
				entity2 = makeEntity(world1);
			}
		} catch (exception4) {
			if (exception4 instanceof java.lang.Exception) {
				console.error(exception4);
				console.trace();
			} else {
				throw exception4;
			}
		}

		if(entity2 !== null) {
			entity2.readFromNBT(nBTTagCompound0);
		} else {
			console.log("Skipping Entity with id " + nBTTagCompound0.getString("id"));
		}

		return entity2;
	}

	public static createEntity(i0: int, world1: World| null):  Entity | null {
		let  entity2: Entity = null;

		try {
			let makeEntity = EntityList.IDtoClassMapping[i0];
			if(makeEntity) {
				entity2 = makeEntity(world1)
			}
		} catch (exception4) {
			if (exception4 instanceof java.lang.Exception) {
				console.error(exception4);
				console.trace();
			} else {
				throw exception4;
			}
		}

		if(entity2 === null) {
			console.log("Skipping Entity with id " + i0);
		}

		return entity2;
	}

	public static getEntityID(entity0: Entity| null):  int {
		return EntityList.classToIDMapping[entity0.type];
	}

	public static getEntityString(entity0: Entity| null): string {
		return entity0.type;
	}

	public static getEntityCtor(type: string): (world: World) => Entity {
		return this.stringToClassMapping[type];
	}

	static {
		EntityList.addMapping((world: World) => new EntityArrow(world), "Arrow", 10);
		EntityList.addMapping((world: World) => new EntitySnowball(world), "Snowball", 11);
		EntityList.addMapping((world: World) => new EntityItem(world), "Item", 1);
		EntityList.addMapping((world: World) => new EntityPainting(world), "Painting", 9);
		EntityList.addMapping((world: World) => new EntityLiving(world), "Mob", 48);
		EntityList.addMapping((world: World) => new EntityMobs(world), "Monster", 49);
		EntityList.addMapping((world: World) => new EntityCreeper(world), "Creeper", 50);
		EntityList.addMapping((world: World) => new EntitySkeleton(world), "Skeleton", 51);
		EntityList.addMapping((world: World) => new EntitySpider(world), "Spider", 52);
		EntityList.addMapping((world: World) => new EntityZombieSimple(world), "Giant", 53);
		EntityList.addMapping((world: World) => new EntityZombie(world), "Zombie", 54);
		EntityList.addMapping((world: World) => new EntitySlime(world), "Slime", 55);
		EntityList.addMapping((world: World) => new EntityGhast(world), "Ghast", 56);
		EntityList.addMapping((world: World) => new EntityPigZombie(world), "PigZombie", 57);
		EntityList.addMapping((world: World) => new EntityPig(world), "Pig", 90);
		EntityList.addMapping((world: World) => new EntitySheep(world), "Sheep", 91);
		EntityList.addMapping((world: World) => new EntityCow(world), "Cow", 92);
		EntityList.addMapping((world: World) => new EntityChicken(world), "Chicken", 93);
		EntityList.addMapping((world: World) => new EntitySquid(world), "Squid", 94);
		EntityList.addMapping((world: World) => new EntityTNTPrimed(world), "PrimedTnt", 20);
		EntityList.addMapping((world: World) => new EntityFallingSand(world), "FallingSand", 21);
		EntityList.addMapping((world: World) => new EntityMinecart(world), "Minecart", 40);
		EntityList.addMapping((world: World) => new EntityBoat(world), "Boat", 41);
	}
}
