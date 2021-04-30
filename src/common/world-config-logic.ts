import {Army, BuildingType, Resources, UnitTypes} from "./model";
import { BuildingConfigData, fetchWorldConfigData, NightBonusConfigData, WorldConfigData } from "./world-config";
import {genericCachedLocalQuery} from "./storage";

declare var game_data: any;

class UnitsConfig {
    private readonly config = new Map<UnitTypes, UnitConfig>()
    readonly inGameUnits = Array<UnitTypes>();

    constructor(units: Map<UnitTypes, UnitConfig>) {
        this.config = units;
        this.inGameUnits = Object.values(UnitTypes).filter(unitName => {
            return units.get(unitName).inGame
        })
    }

    unit(name: UnitTypes): UnitConfig {
        return this.config.get(name)
    }

    armyCost(army: Army): Resources {
        const resources = Resources.zero();
        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            resources.wood += unitCount * unitCfg.recruit.wood;
            resources.stone += unitCount * unitCfg.recruit.stone;
            resources.iron += unitCount * unitCfg.recruit.iron;
        })

        return resources;
    }

    attackerKillScore(army: Army): number {
        let killScore = 0;
        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            killScore += unitCfg.killScore.asAttacker * unitCount;
        })

        return killScore;
    }

    defenderKillScore(army: Army): number {
        let killScore = 0;
        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            killScore += unitCfg.killScore.asDefender * unitCount;
        })

        return killScore;
    }

    population(army: Army): number {
        let population = 0;

        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            population += unitCfg.population * unitCount;
        })

        return population;
    }

    static unitsConfig = new Map<UnitTypes, StaticUnitConfig>([
        [UnitTypes.SPEAR, {
            recruit: new Resources({wood: 50, stone: 30, iron: 10}),
            killScore: {
                asAttacker: 4,
                asDefender: 1
            },
            population: 1
        }],
        [UnitTypes.SWORD, {
            recruit: new Resources({wood: 30, stone: 30, iron: 70}),
            killScore: {
                asAttacker: 5,
                asDefender: 2
            },
            population: 1
        }],
        [UnitTypes.AXE, {
            recruit: new Resources({wood: 60, stone: 30, iron: 40}),
            killScore: {
                asAttacker: 1,
                asDefender: 4
            },
            population: 1
        }],
        [UnitTypes.ARCHER, {
            recruit: new Resources({wood: 100, stone: 30, iron: 60}),
            killScore: {
                asAttacker: 5,
                asDefender: 2
            },
            population: 1
        }],
        [UnitTypes.SPY, {
            recruit: new Resources({wood: 50, stone: 50, iron: 20}),
            killScore: {
                asAttacker: 1,
                asDefender: 2
            },
            population: 2
        }],
        [UnitTypes.LIGHT, {
            recruit: new Resources({wood: 125, stone: 100, iron: 250}),
            killScore: {
                asAttacker: 5,
                asDefender: 13
            },
            population: 4
        }],
        [UnitTypes.MOUNTED_ARCHER, {
            recruit: new Resources({wood: 250, stone: 100, iron: 150}),
            killScore: {
                asAttacker: 6,
                asDefender: 12
            },
            population: 5
        }],
        [UnitTypes.HEAVY, {
            recruit: new Resources({wood: 200, stone: 150, iron: 600}),
            killScore: {
                asAttacker: 23,
                asDefender: 15
            },
            population: 6
        }],
        [UnitTypes.RAM, {
            recruit: new Resources({wood: 300, stone: 200, iron: 200}),
            killScore: {
                asAttacker: 4,
                asDefender: 8
            },
            population: 5
        }],
        [UnitTypes.CATAPULT, {
            recruit: new Resources({wood: 320, stone: 400, iron: 100}),
            killScore: {
                asAttacker: 12,
                asDefender: 10
            },
            population: 8
        }],
        [UnitTypes.PALADIN, {
            recruit: new Resources({wood: 20, stone: 20, iron: 40}),
            killScore: {
                asAttacker: 40,
                asDefender: 20
            },
            population: 10
        }],
        [UnitTypes.SNOB, {
            recruit: new Resources({wood: 40000, stone: 50000, iron: 50000}),
            killScore: {
                asAttacker: 200,
                asDefender: 200
            },
            population: 100
        }],
        [UnitTypes.MILITIA, {
            recruit: new Resources({wood: 0, stone: 0, iron: 0}),
            killScore: {
                asAttacker: 1,
                asDefender: 4
            },
            population: 0
        }],
    ])
}

class StaticUnitConfig {
    readonly recruit: Resources;
    readonly population: number;
    readonly killScore: {
        asDefender: number,
        asAttacker: number;
    };
}

class BuildingsConfig {
    private readonly buildingsConfig: Map<BuildingType, BuildingConfig>;

    constructor(buildingsConfig: Map<BuildingType, BuildingConfig>) {
        this.buildingsConfig = buildingsConfig;
    }

    type(type: BuildingType): BuildingConfig {
        return this.buildingsConfig.get(type);
    }
}

class BuildingConfig {
    readonly data: BuildingConfigData;

    constructor(data: BuildingConfigData) {
        this.data = data;
    }

    costBetweenLevels(startLevel: number, endLevel: number): Resources {
        const lowerLevel = Math.min(startLevel, endLevel);
        const higherLevel = Math.max(startLevel, endLevel);
        return new Resources({
            wood: BuildingConfig.cost(this.data.startPrice.wood, this.data.resourceFactor.wood, lowerLevel, higherLevel),
            stone: BuildingConfig.cost(this.data.startPrice.stone, this.data.resourceFactor.stone, lowerLevel, higherLevel),
            iron: BuildingConfig.cost(this.data.startPrice.iron, this.data.resourceFactor.iron, lowerLevel, higherLevel)
        });
    }

    private static cost(startPrice: number, factor: number, lowerLevel: number, higherLevel: number): number {
        let factorStartLevel = Math.pow(factor, lowerLevel);
        let price = 0;

        for (let level = lowerLevel; level < higherLevel; level++) {
            price += factorStartLevel * startPrice;
            factorStartLevel *= factor;
        }

        return Math.ceil(price)
    }
}

interface WorldConfig {
    readonly units: UnitsConfig
    readonly buildings: BuildingsConfig
    readonly night: NightBonusConfigData
}

interface UnitConfig {
    inGame: boolean;
}

/**
 * Retrieve config for current world. Download once and cache results per game world.
 */
function loadWorldConfig(): WorldConfig {
    const query = genericCachedLocalQuery<{ expireAt: number, config: WorldConfigData }>(`${game_data.world}-pubWorldConfig_v1`, () => {
        const now = new Date();
        return {
            expireAt: now.setHours(now.getHours() + 24),
            config: fetchWorldConfigData()
        };
    });

    let cfg = query.value
    if (cfg.expireAt > Date.now()) {
        query.remove();
        cfg = query.forceRefresh();
    }

    const units = new Map<UnitTypes, UnitConfig>();
    cfg.config.units.forEach(unitCfg => {
        units.set(unitCfg.name, {
            inGame: unitCfg.inGame
        });
    })
    const buildings = new Map<BuildingType, BuildingConfig>();
    cfg.config.buildings.forEach(data => {
        buildings.set(data.buildingType, new BuildingConfig(data));
    });
    return {
        units: new UnitsConfig(units),
        buildings: new BuildingsConfig(buildings),
        night: cfg.config.night
    }
}

export {
    loadWorldConfig,
    WorldConfig
}