// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import { useState } from "react";
import PlayerRowAdvanced from './PlayerRowAdvanced.tsx';

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
};

function sortPlayers(players: Player[], sortBy: string, sortAsc: boolean) {
    return players.sort((a, b) => {
        switch (sortBy) {
            case 'birthDate':
                if (sortAsc) {
                    return a.birthDate.localeCompare(b.birthDate);
                }   
                return b.birthDate.localeCompare(a.birthDate);
            case 'position':
                if (sortAsc) {
                    return a.position.localeCompare(b.position);
                }   
                return b.position.localeCompare(a.position);
            case 'seasons':
                if (sortAsc) {
                    return a.numberOfSeasons - b.numberOfSeasons;
                }
                return b.numberOfSeasons - a.numberOfSeasons;
            case 'teams':
                if (sortAsc) {
                    return a.numberOfTeams - b.numberOfTeams;
                }
                return b.numberOfTeams - a.numberOfTeams;
            case 'firstSeason':
                if (sortAsc) {
                    return a.firstSeason.localeCompare(b.firstSeason);
                }
                return a.firstSeason.localeCompare(b.firstSeason);
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
}

const PlayersTableAdvanced = ({players, showOnlyCurrentTeam = false}: Props) => {
    const [sortBy, setSortBy] = useState('names');
    const [sortAsc, setSortAsc] = useState(true);
    const [sortedPlayers, setSortedPlayers] = useState(players);

    function setSorting(newSortBy: string) {
        if (newSortBy === sortBy) {
            setSortAsc(!sortAsc);
        } else {
            setSortBy(newSortBy);
            setSortAsc(true);
        }
        setSortedPlayers(sortPlayers(players, newSortBy, newSortBy === sortBy ? !sortAsc : true));
    }

    if (sortedPlayers.length === 0) {
        return <p>Ei pelaajia</p>;
    }
    return (
        <div className='overflow-x-auto'>
        <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
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
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('teams')}>J</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('seasons')}>K</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('firstSeason')}>1. K</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <span className="text-sm text-gray-500 dark:text-gray-400">Seura(t)</span>
            </th>
            </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {sortedPlayers.map(player => <PlayerRowAdvanced player={player} onlyShowCurrentTeam={showOnlyCurrentTeam} key={player.wikiLink} />)}
        </tbody>
        </table>
        </div>
    );
}

export default PlayersTableAdvanced;
