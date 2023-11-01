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
                hdbid: player.hdbid,
            });
            id++;
        });
    });

    return list;
}

function dataEnrichedAsObjectWithHdbidAsKey() {
    const players = {};
    dataEnriched.forEach((player) => {
        players[player.hdbid] = player;
    });

    return players;
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

            // Array of strings
            const uniqueSeasonsArr = Array.from(uniqueSeasons);
            
            const data = {
                player: player.name,
                playerPosition: player.position,
                playerBirthDate: player.birthDate,
                playerWikiLink: player.wikiLink,
                seasons: playerTeam.seasons,
                // Contain array of strings
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
                // Adding a string to a set will not add duplicates
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

export function getPlayersBySeasons() {
    const playersSeasonsAndTeamsList = getPlayersSeasonsTeamsList();
    const uniqueSeasons = new Set();
    playersSeasonsAndTeamsList.forEach((seasonAndTeam) => {
        uniqueSeasons.add(seasonAndTeam.season);
    });
    const uniqueSeasonsArr = Array.from(uniqueSeasons).map((season) => {
        return {
            season,
        };
    });

    // Add unique players to each season. Each player can be in multiple seasons and is identified by hdbid
    const seasonsWithPlayers = uniqueSeasonsArr.map((season) => {
        const uniquePlayers = new Set();
        playersSeasonsAndTeamsList.forEach((seasonAndTeam) => {
            if (seasonAndTeam.season === season.season) {
                uniquePlayers.add(seasonAndTeam.hdbid);
            }
        });

        const uniquePlayersArr = Array.from(uniquePlayers).map((hdbid) => {
            return {
                hdbid,
                teams: [],
            };
        });

        // Add unique teams to each player for each season
        uniquePlayersArr.forEach((player) => {
            const uniqueTeams = new Set();
            playersSeasonsAndTeamsList.forEach((seasonAndTeam) => {
                if (seasonAndTeam.season === season.season && seasonAndTeam.hdbid === player.hdbid) {
                    uniqueTeams.add(seasonAndTeam.team);
                }
            });
            player.teams = Array.from(uniqueTeams);
        });

        return {
            ...season,
            players: uniquePlayersArr,
        };
    });

    // Add players and unique teams count to each season
    const seasonsWithPlayersAndTeamsCount = seasonsWithPlayers.map((season) => {
        const uniqueTeams = new Set();
        season.players.forEach((player) => {
            player.teams.forEach((team) => {
                uniqueTeams.add(team);
            });
        });

        return {
            ...season,
            playersCount: season.players.length,
            teamsCount: uniqueTeams.size,
        };
    });

    const playerData = dataEnrichedAsObjectWithHdbidAsKey();
    const seasonsWithPlayerData = seasonsWithPlayersAndTeamsCount.map((season) => {
        const players = season.players.map((player) => {
            return {
                name: playerData[player.hdbid].name,
                position: playerData[player.hdbid].position,
                birthDate: playerData[player.hdbid].birthDate,
                hdbid: playerData[player.hdbid].hdbid,
                teams: player.teams,
            };
        });

        return {
            ...season,
            players,
        };
    });

    const seasonsWithPositionCount = seasonsWithPlayerData.map((season) => {
        const goalieCount = season.players.filter((player) => player.position === 'G').length;
        const defenderCount = season.players.filter((player) => player.position === 'D').length;
        const forwardCount = season.players.filter((player) => player.position === 'F').length;

        return {
            ...season,
            goalieCount,
            defenderCount,
            forwardCount,
        };
    }
    );

    const seasonsOrderedBySeason = seasonsWithPositionCount.sort((a, b) => {
        return a.season > b.season ? 1 : -1;
    }
    );

    return seasonsOrderedBySeason;
}