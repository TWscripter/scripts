import { BuildingType } from "../common/model";
interface LocalText2BuildingType {
    localizedText: string;
    type: BuildingType;
}
interface LocalizationData {
    parse: {
        resourceStolen: string;
        buildingDamageSourceCatapult: string;
        buildingDamageSourceRam: string;
        reportText2BuildingType: Array<LocalText2BuildingType>;
    };
    outputText: {
        defenderUnitsLostCostText: string;
        attackerUnitsLostCostText: string;
        defenderLostResourcesTotal: string;
        killScoreAsAttacker: string;
        killScoreAsDefender: string;
    };
}
declare function resolveLocalizationData(): LocalizationData;
export { resolveLocalizationData, LocalizationData };
