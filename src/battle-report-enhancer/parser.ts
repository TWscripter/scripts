import { Army, BuildingType, Resources } from "../common/model";
import { LocalizationData } from "./localization";
import { WorldConfig } from "../common/world-config-logic";
import { parseIntAndRemoveNonNum } from "../common/logic";

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
    jQueryElement: JQuery
}

class ReportParser {
    readonly localizationData: LocalizationData;
    readonly worldConfig: WorldConfig;

    constructor(localizationData: LocalizationData, worldConfig: WorldConfig) {
        this.localizationData = localizationData;
        this.worldConfig = worldConfig;
    }

    parseReport(context: JQuery) {
        const defenderArmyLoses = this.fillArmy(context.find("#attack_info_def_units tbody > tr:nth-child(3) > .unit-item"));
        const attackerArmyLoses = this.fillArmy(context.find("#attack_info_att_units tbody > tr:nth-child(3) > .unit-item"));
        const buildingDamage = this.parseBuildingDamageAndStolenData(context);

        return {
            defender: {
                units:  {
                    armyLosesCost: this.worldConfig.units.armyCost(defenderArmyLoses),
                    armyLosesPop: this.worldConfig.units.population(defenderArmyLoses),
                    armyLosesText: this.localizationData.outputText.defenderUnitsLostCostText,
                    killScore: this.worldConfig.units.defenderKillScore(attackerArmyLoses),
                    killScoreText: this.localizationData.outputText.killScoreAsDefender,
                },
                buildingDamage: buildingDamage,
                stolen: buildingDamage.stolen
            },
            attacker: {
                armyLosesCost: this.worldConfig.units.armyCost(attackerArmyLoses),
                armyLosesPop: this.worldConfig.units.population(attackerArmyLoses),
                armyLosesText: this.localizationData.outputText.attackerUnitsLostCostText,
                killScore: this.worldConfig.units.attackerKillScore(defenderArmyLoses),
                killScoreText: this.localizationData.outputText.killScoreAsAttacker
            },
        }
    }

    parseBuildingDamageAndStolenData(context: JQuery): { ram?: DemolitionResult, cat?: DemolitionResult, stolen: Resources } {
        const demolitions = context.find("#attack_results tbody tr");
        let ram: DemolitionResult = null;
        let cat: DemolitionResult = null;
        let stolen: Resources = Resources.zero();

        demolitions.each((index, element) => {
            const defenderAdditionalDamages = $(element).find("th").text();
            const data = $(element).find("td");
            if (defenderAdditionalDamages.startsWith(this.localizationData.parse.resourceStolen)) {
                data.find("span").each((index, element) => {
                    const spanQuery = $(element)
                    if (spanQuery.hasClass("wood")) {
                        stolen.wood = parseIntAndRemoveNonNum(spanQuery.closest(".nowrap").text());
                    } else if (spanQuery.hasClass("stone")) {
                        stolen.stone = parseIntAndRemoveNonNum(spanQuery.closest(".nowrap").text());
                    } else if (spanQuery.hasClass("iron")) {
                        stolen.iron = parseIntAndRemoveNonNum(spanQuery.closest(".nowrap").text());
                    }
                })
            } else if (defenderAdditionalDamages.startsWith(this.localizationData.parse.buildingDamageSourceRam)) {
                ram = this.parseDemolitions(data);
            } else if (defenderAdditionalDamages.startsWith(this.localizationData.parse.buildingDamageSourceCatapult)) {
                cat = this.parseDemolitions(data);
            }
        })

        return {
            ram: ram,
            cat: cat,
            stolen: stolen
        };
    }

    private parseDemolitions(source: JQuery): DemolitionResult {
        const text = source.text();
        const demolishedBuilding = this.localizationData.parse.reportText2BuildingType.find((e) => {
            return text.startsWith(e.localizedText)
        }).type;
        const startLevel = parseIntAndRemoveNonNum(source.find("b")[0].textContent);
        const demolishedToLevel = parseIntAndRemoveNonNum(source.find("b")[1].textContent);
        const buildingConfig = this.worldConfig.buildings.type(demolishedBuilding);
        const resources = buildingConfig.costBetweenLevels(startLevel, demolishedToLevel);

        return {
            buildingType: demolishedBuilding,
            buildCost: resources,
            jQueryElement: source
        }
    }

    private fillArmy(allLostUnits: JQuery): Army {
        if (allLostUnits.length === 0) return null;
        const army = Army.empty();
        this.worldConfig.units.inGameUnits.forEach(unit => {
            const lostUnitsText = allLostUnits.filter(`.unit-item-${unit}`).text();
            const lostUnits = lostUnitsText === "" ? 0 : parseInt(lostUnitsText);
            army.setUnits(unit, lostUnits);
        });

        return army;
    }
}

export {
    ReportParser,
    Results
}