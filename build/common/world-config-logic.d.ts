import { Army, BuildingType, Resources, UnitTypes } from "./model";
import { BuildingConfigData, NightBonusConfigData } from "./world-config";
declare class UnitsConfig {
    private readonly config;
    readonly inGameUnits: UnitTypes[];
    constructor(units: Map<UnitTypes, UnitConfig>);
    unit(name: UnitTypes): UnitConfig;
    armyCost(army: Army): Resources;
    attackerKillScore(army: Army): number;
    defenderKillScore(army: Army): number;
    population(army: Army): number;
    static unitsConfig: Map<UnitTypes, StaticUnitConfig>;
}
declare class StaticUnitConfig {
    readonly recruit: Resources;
    readonly population: number;
    readonly killScore: {
        asDefender: number;
        asAttacker: number;
    };
}
declare class BuildingsConfig {
    private readonly buildingsConfig;
    constructor(buildingsConfig: Map<BuildingType, BuildingConfig>);
    type(type: BuildingType): BuildingConfig;
}
declare class BuildingConfig {
    readonly data: BuildingConfigData;
    constructor(data: BuildingConfigData);
    costBetweenLevels(startLevel: number, endLevel: number): Resources;
    private static cost;
}
interface WorldConfig {
    readonly units: UnitsConfig;
    readonly buildings: BuildingsConfig;
    readonly night: NightBonusConfigData;
}
interface UnitConfig {
    inGame: boolean;
}
/**
 * Retrieve config for current world. Download once and cache results per game world.
 */
declare function loadWorldConfig(): WorldConfig;
export { loadWorldConfig, WorldConfig };
