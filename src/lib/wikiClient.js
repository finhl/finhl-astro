import data from './data.json';
import dataEnriched from './data-enriched.json';

const CURRENT_SEASON = '2023-24';

export function getWikiData() {
    // Return data as resolved promise
    return data;
}

export function getEnrichedData() {
    // return dataEnriched;
    const players = dataEnriched.map((player) => {
        const isActive = player.seasonsAndTeams.find((seasonAndTeam) => seasonAndTeam.season === CURRENT_SEASON) === undefined ? false : true;
        return {
            ...player,
            isActive,
        };
    });
    return players;
}
