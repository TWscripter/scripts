/// <reference types="jquery" />
import { BuildingType, Resources } from "../common/model";
import { LocalizationData } from "./localization";
import { WorldConfig } from "../common/world-config-logic";
interface Results {
    armyLosesCost?: Resources;
    armyLosesPop?: number;
    armyLosesText: string;
    killScore?: number;
    killScoreText?: string;
}
interface DemolitionResult {
    buildingType: BuildingType;
    buildCost: Resources;
    jQueryElement: JQuery;
}
declare class ReportParser {
    readonly localizationData: LocalizationData;
    readonly worldConfig: WorldConfig;
    constructor(localizationData: LocalizationData, worldConfig: WorldConfig);
    parseReport(context: JQuery): {
        defender: {
            units: {
                armyLosesCost: Resources;
                armyLosesPop: number;
                armyLosesText: string;
                killScore: number;
                killScoreText: string;
            };
            buildingDamage: {
                ram?: DemolitionResult;
                cat?: DemolitionResult;
                stolen: Resources;
            };
            stolen: Resources;
        };
        attacker: {
            armyLosesCost: Resources;
            armyLosesPop: number;
            armyLosesText: string;
            killScore: number;
            killScoreText: string;
        };
    };
    parseBuildingDamageAndStolenData(context: JQuery): {
        ram?: DemolitionResult;
        cat?: DemolitionResult;
        stolen: Resources;
    };
    private parseDemolitions;
    private fillArmy;
}
export { ReportParser, Results };
