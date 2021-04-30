import { BuildingType } from "../common/model";

declare var UI: any;
declare var game_data: any;

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
    },
    outputText: {
        defenderUnitsLostCostText: string;
        attackerUnitsLostCostText: string;
        defenderLostResourcesTotal: string;
        killScoreAsAttacker: string;
        killScoreAsDefender: string;
    }
}

function resolveLocalizationData(): LocalizationData {
    const localizationData = new Map<string, LocalizationData>();
    const gameLocale = game_data.locale;
    /**
     * To localise this script add locale from your game. type `game_data.locale` to web browser console while present on TW page.
     */
    localizationData.set("cs_CZ", {
        parse: {
            resourceStolen: "Kořist",
            buildingDamageSourceCatapult: "Škoda vzniklá střelbou z katapultu:",
            buildingDamageSourceRam: "Škoda vzniklá beranidlem:",
            reportText2BuildingType: [
                { localizedText: "Hlavní", type: BuildingType.MAIN },
                { localizedText: "Kasárna", type: BuildingType.BARRACKS },
                { localizedText: "Stáje", type: BuildingType.STABLE },
                { localizedText: "Dílna", type: BuildingType.SIEGE_FACTORY },
                { localizedText: "Panský", type: BuildingType.SNOB },
                { localizedText: "Kovárna", type: BuildingType.SMITH },
                { localizedText: "Nádvoří", type: BuildingType.PLACE },
                { localizedText: "Socha", type: BuildingType.STATUE },
                { localizedText: "Tržiště", type: BuildingType.MARKET },
                { localizedText: "Dřevorubec", type: BuildingType.WOOD_CUTTER },
                { localizedText: "Lom", type: BuildingType.CLAY_PIT },
                { localizedText: "Železný", type: BuildingType.IRON_MINE },
                { localizedText: "Selský", type: BuildingType.FARM },
                { localizedText: "Skladiště", type: BuildingType.STORAGE },
                { localizedText: "Skrýš", type: BuildingType.HIDE },
                { localizedText: "Hradby", type: BuildingType.WALL }
            ]
        },
        outputText: {
            attackerUnitsLostCostText: "Surovinové ztráty útočníka - jednotky",
            defenderUnitsLostCostText: "Surovinové ztráty obránce - jednotky",
            defenderLostResourcesTotal: "Surovinové ztráty obránce - celkem",
            killScoreAsAttacker: "Jako útočník",
            killScoreAsDefender: "Jako obránce"
        }
    });

    const buildingDamageData = localizationData.get(gameLocale);
    if (buildingDamageData == null) {
        UI.ErrorMessage(`Report enhancer won't work correctly for your game language mutation ${gameLocale}. Add transactions for correct behaviour. 
        Or raise issue to github repo https://github.com/TWscripter/scripts and help to resolve needed translations.`,
            5000
        );
        return localizationData.entries()[0];
    }

    return buildingDamageData;
}

export {
    resolveLocalizationData,
    LocalizationData
}