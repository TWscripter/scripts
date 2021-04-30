interface UnitNumbers {
    spear: number;
    sword: number;
    axe: number;
    spy: number;
    light: number;
    heavy: number;
    archer: number;
    mountedArcher: number;
    ram: number;
    cat: number;
    knight: number;
    snob: number;
    militia: number;
}
declare class Army implements UnitNumbers {
    spear: number;
    sword: number;
    axe: number;
    spy: number;
    light: number;
    heavy: number;
    archer: number;
    mountedArcher: number;
    ram: number;
    cat: number;
    knight: number;
    snob: number;
    militia: number;
    constructor({ spear, sword, axe, spy, light, heavy, archer, mountedArcher, ram, cat, paladin, snob, militia }: {
        spear?: number;
        sword?: number;
        axe?: number;
        spy?: number;
        light?: number;
        heavy?: number;
        archer?: number;
        mountedArcher?: number;
        ram?: number;
        cat?: number;
        paladin?: number;
        snob?: number;
        militia?: number;
    });
    units(unitName: UnitTypes): number;
    setUnits(unitName: UnitTypes, count: number): void;
    static empty(): Army;
}
interface ResourcesData {
    wood: number;
    stone: number;
    iron: number;
}
declare class Resources implements ResourcesData {
    wood: number;
    stone: number;
    iron: number;
    constructor({ wood, stone, iron }: ResourcesData);
    add(resource?: ResourcesData, times?: number): Resources;
    static zero(): Resources;
}
declare enum BuildingType {
    MAIN = "main",
    BARRACKS = "barracks",
    STABLE = "stable",
    SIEGE_FACTORY = "garage",
    SNOB = "snob",
    SMITH = "smith",
    PLACE = "place",
    STATUE = "statue",
    MARKET = "market",
    WOOD_CUTTER = "wood",
    CLAY_PIT = "stone",
    IRON_MINE = "iron",
    FARM = "farm",
    STORAGE = "storage",
    HIDE = "hide",
    WALL = "wall"
}
declare enum UnitTypes {
    SPEAR = "spear",
    SWORD = "sword",
    AXE = "axe",
    SPY = "spy",
    LIGHT = "light",
    HEAVY = "heavy",
    ARCHER = "archer",
    MOUNTED_ARCHER = "marcher",
    RAM = "ram",
    CATAPULT = "catapult",
    PALADIN = "knight",
    SNOB = "snob",
    MILITIA = "militia"
}
export { Resources, ResourcesData, BuildingType, UnitTypes, Army };
