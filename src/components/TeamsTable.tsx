// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import { useState } from "react";
import TeamRow from './TeamRow.tsx';

export type Team = {
    team: string,
    seasons: string,
    players: Player[],
    playersCount: number,
    goalieCount: number,
    defenderCount: number,
    forwardCount: number,
    seasonsCount: number,
}

export type Player = {
    player: string,
    playerPosition: string,
    playerBirthDate: string,
    playerWikiLink: string,
    seasons: string[],
};

type Props = {
    teams: Array<Team>
    showOnlyCurrentTeam?: boolean
};

const TeamsTable = ({teams, showOnlyCurrentTeam = false}: Props) => {
    const [sortBy, setSortBy] = useState('team');
    const [sortAsc, setSortAsc] = useState(true);

    function setSorting(newSortBy: string) {
        if (newSortBy === sortBy) {
            setSortAsc(!sortAsc);
        } else {
            setSortBy(newSortBy);
            setSortAsc(true);
        }
    }


    const sortedTeams = teams.sort((a, b) => {
        switch (sortBy) {
            case 'playersCount':
                if (sortAsc) {
                    return b.playersCount - a.playersCount;
                }   
                return a.playersCount - b.playersCount;
            case 'goalieCount':
                if (sortAsc) {
                    return b.goalieCount - a.goalieCount;
                }   
                return a.goalieCount - b.goalieCount;
            case 'defenderCount':
                if (sortAsc) {
                    return b.defenderCount - a.defenderCount;
                }   
                return a.defenderCount - b.defenderCount;
            case 'forwardCount':
                if (sortAsc) {
                    return b.forwardCount - a.forwardCount;
                }   
                return a.forwardCount - b.forwardCount;
            case 'seasonsCount':
                if (sortAsc) {
                    return b.seasonsCount - a.seasonsCount;
                }   
                return a.seasonsCount - b.seasonsCount;
            default:
                if (sortAsc) {
                    return a.team.localeCompare(b.team);
                }
                return b.team.localeCompare(a.team);
        }
    });

    if (sortedTeams.length === 0) {
        return <p>Ei joukkueita</p>;
    }
    return (
        <div className='overflow-x-auto'>
            <p className="mb-6 text-sm">PE = pelaajat, MV = maalivahdit, HY = hyökkääjät, PU = puolustajat, KA = kaudet</p>
        <table className="mb-6 min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
            <tr>
            <th className="text-left">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('team')}>Seura</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('playersCount')}>PE</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('goalieCount')}>MV</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('defenderCount')}>PU</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('forwardCount')}>HY</button>
            </th>
            <th className="text-left pl-1 md:pl-5">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('seasonsCount')}>KA</button>
            </th>
            </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {sortedTeams.map(team => <TeamRow team={team} onlyShowCurrentTeam={showOnlyCurrentTeam} key={team.team} />)}
        </tbody>
        </table>
        </div>
    );
}

export default TeamsTable;
