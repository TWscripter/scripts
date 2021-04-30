import { BuildingType, ResourcesData, UnitTypes } from "./model";
interface UnitConfigData {
    name: UnitTypes;
    inGame: boolean;
}
interface WorldConfigData {
    night: NightBonusConfigData;
    units: Array<UnitConfigData>;
    buildings: Array<BuildingConfigData>;
}
interface BuildingConfigData {
    buildingType: BuildingType;
    startPrice: ResourcesData;
    startPopulation: number;
    populationFactor: number;
    resourceFactor: ResourcesData;
    minLevel: number;
    maxLevel: number;
}
interface NightBonusConfigData {
    start: number;
    end: number;
    active: boolean;
}
declare function fetchWorldConfigData(): WorldConfigData;
export { fetchWorldConfigData, WorldConfigData, BuildingConfigData, NightBonusConfigData };
