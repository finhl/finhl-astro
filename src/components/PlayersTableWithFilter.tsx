// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import { useState } from "react";
import PlayerRowWithFilter from './PlayerRowWithFilter.tsx';

export type Player = {
    name: string,
    firstName: string,
    lastName: string,
    numberOfTeams: number,
    numberOfSeasons: number,
    firstSeason: string,
    latestSeason: string,
    isActive: boolean,
    wikiLink: string,
    position: string,
    birthDate: string
    seasonsAndTeams: {
        team: string,
        season: string,
    }[],
    seasonsAndTeamsGroupedAlt: {
        team: string,
        seasons: string,
    }[],
};

type Props = {
    players: Array<Player>
    showOnlyCurrentTeam?: boolean
    expandAllTeams?: boolean
};

const PlayersTableWithFilter = ({players, showOnlyCurrentTeam = false, expandAllTeams = false}: Props) => {
    const [sortBy, setSortBy] = useState('names');
    const [sortAsc, setSortAsc] = useState(true);

    function setSorting(newSortBy: string) {
        if (newSortBy === sortBy) {
            setSortAsc(!sortAsc);
        } else {
            setSortBy(newSortBy);
            setSortAsc(true);
        }
    }


    const sortedPlayers = players.sort((a, b) => {
        switch (sortBy) {
            case 'birthDate':
                if (sortAsc) {
                    return a.birthDate.localeCompare(b.birthDate);
                }   
                return b.birthDate.localeCompare(a.birthDate);
            case 'position':
                if (sortAsc) {
                    return a.position   .localeCompare(b.position);
                }   
                return b.position.localeCompare(a.position);
            case 'seasons':
                if (sortAsc) {
                    return b.numberOfSeasons - a.numberOfSeasons;
                }
                return a.numberOfSeasons - b.numberOfSeasons;
            case 'teams':
                if (sortAsc) {
                    return b.numberOfTeams - a.numberOfTeams;
                }
                return a.numberOfTeams - b.numberOfTeams;
            case 'firstSeason':
                if (sortAsc) {
                    return a.firstSeason.localeCompare(b.firstSeason);
                }
                return b.firstSeason.localeCompare(a.firstSeason);
            case 'latestSeason':
                if (sortAsc) {
                    return a.latestSeason.localeCompare(b.latestSeason);
                }
                return b.latestSeason.localeCompare(a.latestSeason);
            default:
                if (sortAsc) {
                    return (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName);
                }
                return (b.lastName + b.firstName).localeCompare(a.lastName + a.firstName);
        }
    });

    if (sortedPlayers.length === 0) {
        return <p>Ei pelaajia</p>;
    }
    return (
        <div className='overflow-x-auto'>
            <p className="mb-6 text-sm">PP = pelipaikka, K = kausien lukumäärä, 1.K = ensimmäinen kausi</p>
        <table className="mb-6 min-w-full table-auto">
        <thead>
            <tr>
            <th className="text-left">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('names')}>Nimi</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('birthDate')}>Synt.</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('position')}>Pp</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('seasons')}>K</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('firstSeason')}>1. K</button>
            </th>
            <th className="text-left pl-1 md:pl-5 text-right">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('teams')}>Seura(t)</button>
            </th>
            </tr>
        </thead>
        <tbody>
            {sortedPlayers.map(player => <PlayerRowWithFilter player={player} onlyShowCurrentTeam={showOnlyCurrentTeam} showTeamsInitial={expandAllTeams} key={player.wikiLink} />)}
        </tbody>
        </table>
        <p className="mb-6 text-sm">Seuran vuodet tarkoittaa kauden <i>aloitusvuotta</i>. Esim. "Montreal Canadiens 1997-1998" tarkoittaa että pelaaja on edustanut Montrealia kausina 97-98 ja 98-99.</p>
        </div>
    );
}

export default PlayersTableWithFilter;
