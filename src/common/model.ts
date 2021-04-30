interface UnitNumbers {
    spear: number
    sword: number
    axe: number
    spy: number
    light: number
    heavy: number,
    archer: number,
    mountedArcher: number,
    ram: number,
    cat: number,
    knight: number,
    snob: number;
    militia: number;
}

class Army implements UnitNumbers {
    spear: number
    sword: number
    axe: number
    spy: number
    light: number
    heavy: number
    archer: number
    mountedArcher: number
    ram: number
    cat: number;
    knight: number;
    snob: number;
    militia: number;

    constructor({
                    spear = 0,
                    sword = 0,
                    axe = 0,
                    spy = 0,
                    light = 0,
                    heavy = 0,
                    archer = 0,
                    mountedArcher = 0,
                    ram = 0,
                    cat = 0,
                    paladin = 0,
                    snob = 0,
                    militia = 0
                }) {
        this.spear = spear;
        this.sword = sword;
        this.axe = axe;
        this.spy = spy;
        this.light = light;
        this.heavy = heavy;
        this.archer = archer;
        this.mountedArcher = mountedArcher;
        this.ram = ram;
        this.cat = cat;
        this.knight = paladin;
        this.snob = snob;
        this.militia = militia;
    }

    units(unitName: UnitTypes): number {
        //is this ok? or switch?
        return this[unitName];
    }

    setUnits(unitName: UnitTypes, count: number) {
        this[unitName] = count;
    }

    static empty(): Army {
        return new Army({});
    }
}

interface ResourcesData {
    wood: number;
    stone: number;
    iron: number;
}

class Resources implements ResourcesData {
    wood: number;
    stone: number;
    iron: number;

    constructor({wood = 0, stone = 0, iron = 0}: ResourcesData) {
        this.wood = wood;
        this.stone = stone;
        this.iron = iron;
    }

    add(resource?: ResourcesData, times: number = 1): Resources {
        if (resource === undefined || resource === null) return this;
        this.wood += resource.wood * times;
        this.stone += resource.stone * times;
        this.iron += resource.iron * times;

        return this;
    }

    static zero(): Resources {
        return new Resources({wood: 0, stone: 0, iron: 0})
    }
}

enum BuildingType {
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

enum UnitTypes {
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

export {
    Resources,
    ResourcesData,
    BuildingType,
    UnitTypes,
    Army
}