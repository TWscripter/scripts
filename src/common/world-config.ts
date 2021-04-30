import {parseString} from "xml2js";
import {BuildingType, ResourcesData, UnitTypes} from "./model";

declare var game_data: any;
declare var UI: any;

//todo rewrite those fetches to async + return promise
function fetchUnitsConfig(): Array<UnitConfigData> {
    const cfg = Array<UnitConfigData>();
    $.ajax({
        url: "/interface.php?func=get_unit_info", type: "get", async: false,
        success: function (data: XMLDocument) {
            parseString(new XMLSerializer().serializeToString(data), {
                explicitArray: false,
                normalize: true
            }, function (err: any, result: any) {
                for (let unitName of Object.keys(UnitTypes)) {
                    const unitNameLower = unitName.toLowerCase();
                    const unitIngame = game_data.units.includes(unitNameLower);
                    cfg.push({
                        inGame: unitIngame,
                        name: UnitTypes[unitName]
                    });
                }
            })
        }, error: function () {
            UI.ErrorMessage('An error occurred while downloading data. Refresh the page to try again', 5000);
            throw new Error('interrupted script');
        }
    });

    return cfg;
}

function fetchBuildingConfig(): Array<BuildingConfigData> {
    let cfg: Array<BuildingConfigData> = [];
    $.ajax({
        url: "/interface.php?func=get_building_info", type: "get", async: false,
        success: function (data: XMLDocument) {
            parseString(new XMLSerializer().serializeToString(data), {
                explicitArray: false,
                normalize: true
            }, function (err: any, result: any) {
                let config = result.config;
                Object.values(BuildingType).forEach(buildingType => {
                    if (config.hasOwnProperty(buildingType)) {
                        let buildingConfig = config[buildingType];
                        cfg.push({
                            resourceFactor: {
                                wood: parseFloat(buildingConfig.wood_factor),
                                stone: parseFloat(buildingConfig.stone_factor),
                                iron: parseFloat(buildingConfig.iron_factor)
                            },
                            buildingType: buildingType,
                            startPrice: {
                                wood: parseInt(buildingConfig.wood),
                                stone: parseInt(buildingConfig.stone),
                                iron: parseInt(buildingConfig.iron)
                            },
                            startPopulation: parseInt(buildingConfig.pop),
                            populationFactor: parseInt(buildingConfig.pop_factor),
                            minLevel: parseInt(buildingConfig.min_level),
                            maxLevel: parseInt(buildingConfig.max_level)
                        });
                    }
                })

            })
        }, error: function () {
            UI.ErrorMessage('An error occurred while downloading data. Refresh the page to try again', 5000);
            throw new Error('interrupted script');
        }
    });

    return cfg;
}


function fetchWorldConfig(): NightBonusConfigData {
    let nightBonusCfg: NightBonusConfigData;
    $.ajax({
        url: "/interface.php?func=get_config", type: "get", async: false,
        success: function (data: XMLDocument) {
            parseString(new XMLSerializer().serializeToString(data), {
                explicitArray: false,
                normalize: true
            }, function (err: any, result: any) {
                let xmlCfg = result.config
                let night = xmlCfg.night;
                nightBonusCfg = {
                    active: night.active === "1",
                    start: parseInt(night.start_hour) % 24,
                    end: parseInt(night.end_hour) % 24
                }
            })
        }, error: function () {
            UI.ErrorMessage('An error occurred while downloading data. Refresh the page to try again', 5000);
            throw new Error('interrupted script');
        }
    });

    return nightBonusCfg;
}

interface UnitConfigData {
    name: UnitTypes,
    inGame: boolean
}

interface WorldConfigData {
    night: NightBonusConfigData,
    units: Array<UnitConfigData>,
    buildings: Array<BuildingConfigData>
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

function fetchWorldConfigData(): WorldConfigData {
    return {
        units: fetchUnitsConfig(),
        buildings: fetchBuildingConfig(),
        night: fetchWorldConfig()
    }
}

export {
    fetchWorldConfigData,
    WorldConfigData,
    BuildingConfigData,
    NightBonusConfigData
}