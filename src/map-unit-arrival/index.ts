// ==UserScript==
// @name        Map - Unit Arrival
// @description  TW Map - Unit Arrival on pointed village
// @include https://*/game.php?*screen=map*
// @author TW_Scripter
// ==/UserScript==

import { loadWorldConfig } from "../common/world-config-logic";

const worldConfig = loadWorldConfig();

function computeLandingTimes() {
    const mapPopup = $("#map_popup");
    if (mapPopup.find("#info_points_row").length === 0) return;
    mapPopup.find(".unit_landing_times").remove();

    const dateFormatter = new Intl.DateTimeFormat('cs-CZ',  {
        month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
    });

    mapPopup.find("#info_content > tbody tr").each((index, element) => {
        const unitsTable = $(element).find("td > table > tbody");
        if (unitsTable.length === 0) return;

        const landingTimes = Array<string>();
        //ehm there is not way how to distinguish between tables used for building, unit march times etc so lest just try to parse it
        $(element).find("td > table > tbody").find("tr > td").each((index, element) => {
            const textContent = element.textContent;
            if (textContent == null) return;

            const duration = textContent.trim().split(":");
            if (duration.length !== 3) return;

            const hours = parseInt(duration[0]);
            const minutes = parseInt(duration[1]);
            const seconds = parseInt(duration[2]);
            const now = new Date();
            now.setHours(now.getHours() + hours);
            now.setMinutes(now.getMinutes() + minutes);
            now.setSeconds(now.getSeconds() + seconds);
            const willArriveInNight = willArriveInNightBonus(now);
            const color = willArriveInNight ? "red" : "green";
            const backgroundColor = index % 2 === 0 ? "#F8F4E8" : "#DED3B9";

            landingTimes.push(`<td style="color: ${color}; padding:2px;background-color:${backgroundColor}">${dateFormatter.format(now)}</td>`);
        });
        if (landingTimes.length !== 0) {
            unitsTable.append(`
            <tr class="center unit_landing_times">
                ${landingTimes}
            </tr>
        `);
        }
    });

    function willArriveInNightBonus(arrival: Date): boolean {
        if (!worldConfig.night.active) return false;
        return arrival.getHours() >= worldConfig.night.start && arrival.getHours() < worldConfig.night.end
    }
}

$(function () {
    const target = document.querySelector('#map_popup');
    if (target === null) return;
    new MutationObserver(function (mutations) {
        computeLandingTimes();
    }).observe(target, {
        attributes: true
    });
});