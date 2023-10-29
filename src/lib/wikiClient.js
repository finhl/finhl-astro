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

export function getPlayersSeasonsTeamsList() {
    const list = [];
    let id = 1;
    dataEnriched.forEach((player) => {
        player.seasonsAndTeams.forEach((seasonAndTeam) => {
            list.push({
                ...seasonAndTeam,
                id,
                player: player.name,
                playerWikiLink: player.wikiLink,
            });
            id++;
        });
    });

    return list;
}

export function getPlayersWithPerTeamData() {
    const players = getEnrichedData();
    
    const playersWithPerTeamData = players.map((player) => {
        const playerTeams = {};
        player.seasonsAndTeamsGroupedAlt.forEach((seasonAndTeam) => {
            if (playerTeams[seasonAndTeam.team]) {
                playerTeams[seasonAndTeam.team].push(seasonAndTeam.seasons);
            } else {
                playerTeams[seasonAndTeam.team] = [seasonAndTeam.seasons];
            }
        });

        const playerTeamsArr = [];

        Object.keys(playerTeams).forEach((team) => {
            playerTeamsArr.push({
                team,
                seasons: playerTeams[team],
            });
        });

        return {
            ...player,
            playerTeams: playerTeamsArr,
        };
    });

    return playersWithPerTeamData;
}

export function getPlayersByTeams() {
    const players = getPlayersWithPerTeamData();

    const teams = {};
    players.forEach((player) => {
        player.playerTeams.forEach((playerTeam) => {
            const uniqueSeasons = new Set();
            player.seasonsAndTeams.forEach((seasonAndTem) => {
                if (seasonAndTem.team === playerTeam.team) {
                    uniqueSeasons.add(seasonAndTem.season);
                }
            });

            const uniqueSeasonsArr = Array.from(uniqueSeasons);
            
            const data = {
                player: player.name,
                playerPosition: player.position,
                playerBirthDate: player.birthDate,
                playerWikiLink: player.wikiLink,
                seasons: playerTeam.seasons,
                seasonsList: uniqueSeasonsArr,
            }
            if (teams[playerTeam.team]) {
                teams[playerTeam.team].push(data);
            } else {
                teams[playerTeam.team] = [data];
            }
        });
    });

    const teamsArr = [];
    Object.keys(teams).forEach((team) => {
        teamsArr.push({
            team,
            players: teams[team],
        });
    });

    const teamsArrWithPlayersPerTeamCount = teamsArr.map((team) => {
        const goalieCount = team.players.filter((player) => player.playerPosition === 'G').length;
        const defenderCount = team.players.filter((player) => player.playerPosition === 'D').length;
        const forwardCount = team.players.filter((player) => player.playerPosition === 'F').length;
        const uniqueSeasons = new Set();
        team.players.forEach((player) => {
            player.seasonsList.forEach((season) => {
                uniqueSeasons.add(season);
            });
        });

        // Remove seasonsList from players
        team.players = team.players.map((player) => {
            delete player.seasonsList;
            return player;
        });

        return {
            ...team,
            playersCount: team.players.length,
            goalieCount,
            defenderCount,
            forwardCount,
            seasonsCount: uniqueSeasons.size,
        };
    }
    );

    return teamsArrWithPlayersPerTeamCount;
}