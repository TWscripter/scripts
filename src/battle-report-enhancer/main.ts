// ==UserScript==
// @name     Battle Report Enhancer - kill scores, spent resources
// @description Enhance TW report with kill score, lost resources etc
// @include https://*/game.php?*screen=report*
// @include https://*/game.php?*screen=forum*
// @author TW_Scripter
// ==/UserScript==

import { loadWorldConfig } from "../common/world-config-logic";
import { Resources } from "../common/model";
import { ReportParser, Results } from "./parser";
import { resolveLocalizationData } from "./localization";
import { numberFormatterClosure } from "../common/logic";

const numberFormatter = numberFormatterClosure("?");
const localization = resolveLocalizationData();
const reportParser = new ReportParser(localization, loadWorldConfig());

function addCss() {
    const style =
        `<style>
            .kill-score-text {
                display: inline-block;
                float: right;
            }
            .green-text {
                color: green;
            }
            .red-text {
                color: red;
            }
    </style>`;
    $("#content_value").prepend(style);
}

addCss();

function enrichReport(context: JQuery) {
    if (context.find("#attack_info_att_units").length === 0) return;
    const parsedReport = reportParser.parseReport(context);

    addUnitLosesData(context.find("#attack_info_att"), "green-text", parsedReport.attacker);
    addUnitLosesData(context.find("#attack_info_def"), "red-text", parsedReport.defender.units);

    const defenderTotalLostResources = Resources.zero()
        .add(parsedReport.defender.units?.armyLosesCost)
        .add(parsedReport.defender.buildingDamage?.cat?.buildCost)
        .add(parsedReport.defender.buildingDamage?.ram?.buildCost)
        .add(parsedReport.defender.stolen);
    const ramDamage = parsedReport.defender.buildingDamage?.ram;
    ramDamage?.jQueryElement?.append(formatResourcesWithPopulation(ramDamage?.buildCost));
    const catapultDamage = parsedReport.defender.buildingDamage.cat;
    catapultDamage?.jQueryElement?.append(formatResourcesWithPopulation(catapultDamage?.buildCost));

    context.find("#attack_results tbody").append(`
        <tr>
            <th>${localization.outputText.defenderLostResourcesTotal}:</th>
            <td colspan="2">${formatResourcesWithPopulation(defenderTotalLostResources)}</td>
        </tr>`
    );
}

function enrichNormalReportWithScores() {
    //normal reports
    const reportScreen = $(".report_ReportAttack");
    reportScreen.each((index, element) => {
        enrichReport($(element));
    })
    if (reportScreen.length === 0) {
        //forum reports
        $("table.vis").each((index, element) => {
            const context = $(element);
            if (context.find("#attack_results")) {
                enrichReport(context);
            }
        })
    }
}

function addUnitLosesData(context: JQuery, killScoreColor: string, results: Results) {
    const playerName = context.find('tbody > tr:nth-child(1) > th:nth-child(2)');
    const playerNameLink = $(playerName).find("a");
    //reset added text in case of multiple evaluations
    //@ts-ignore
    playerName.html(playerNameLink);
    playerNameLink.after(`<th class="kill-score-text ${killScoreColor}">${results.killScoreText}: ${numberFormatter(results.killScore)}</th>`);
    context.after(`
        <div class="nowrap">
            <h4>${results.armyLosesText}: </h4>
            ${formatResourcesWithPopulation(results?.armyLosesCost, results?.armyLosesPop)}
        </div>
    `);
}

function formatResourcesWithPopulation(resources?: Resources, pop?: number) {
    const population = pop == null ? "" : `<span class="icon header population"></span>${numberFormatter(pop)}`
    return `<div class="nowrap">
         <span class="icon wood"></span>${numberFormatter(resources?.wood)}
         <span class="icon stone"></span>${numberFormatter(resources?.stone)}
         <span class="icon iron"></span>${numberFormatter(resources?.iron)}
         ${population}
    </div>`;
}

enrichNormalReportWithScores();

$(function () {
    const target = document.querySelector('.report-preview');
    if (target === null) return;
    new MutationObserver(function (mutations) {
        const $report = $(".report-preview");
        if ($report.prop("style").display !== 'none') {
            enrichReport($report);
        }
    }).observe(target, {
        attributes: true
    });
});