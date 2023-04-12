import { EntityZombieSimple } from "../EntityZombieSimple";
import { EntityZombie } from "../EntityZombie";
import { EntityTNTPrimed } from "../EntityTNTPrimed";
import { EntitySquid } from "../EntitySquid";
import { EntitySpider } from "../EntitySpider";
import { EntitySnowball } from "../EntitySnowball";
import { EntitySlime } from "../EntitySlime";
import { EntitySkeleton } from "../EntitySkeleton";
import { EntitySheep } from "../EntitySheep";
import { EntityPigZombie } from "../EntityPigZombie";
import { EntityPig } from "../EntityPig";
import { EntityPainting } from "../EntityPainting";
import { EntityMobs } from "../EntityMobs";
import { EntityMinecart } from "../EntityMinecart";
import { EntityLiving } from "../EntityLiving";
import { EntityItem } from "../EntityItem";
import { EntityGhast } from "../EntityGhast";
import { EntityFallingSand } from "../EntityFallingSand";
import { EntityCreeper } from "../EntityCreeper";
import { EntityCow } from "../EntityCow";
import { EntityChicken } from "../EntityChicken";
import { EntityBoat } from "../EntityBoat";
import { EntityArrow } from "../EntityArrow";
import { World } from "../World";
import { EntityList } from "../EntityList";
import { Entity } from "../Entity";

export class EntityRegistry {
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

        Entity.entityItemCtor = (a1, a2, a3, a4, a5) => new EntityItem(a1, a2, a3, a4, a5)

	}
}