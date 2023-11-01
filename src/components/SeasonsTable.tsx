// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import { useState } from "react";
import SeasonRow from './SeasonRow.tsx';

export type Season = {
    season: string,
    players: Player[],
    playersCount: number,
    teamsCount: number,
    goalieCount: number,
    defenderCount: number,
    forwardCount: number,
}


export type Player = {
    name: string,
    position: string,
    birthDate: string,
    hdbid: string,
    teams: string[],
};

type Props = {
    seasons: Array<Season>
};

const SeasonsTable = ({seasons}: Props) => {
    const [sortBy, setSortBy] = useState('season');
    const [sortAsc, setSortAsc] = useState(true);

    function setSorting(newSortBy: string) {
        if (newSortBy === sortBy) {
            setSortAsc(!sortAsc);
        } else {
            setSortBy(newSortBy);
            setSortAsc(true);
        }
    }


    const sortedSeasons = seasons.sort((a, b) => {
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
            case 'teamsCount':
                if (sortAsc) {
                    return b.teamsCount - a.teamsCount;
                }   
                return a.teamsCount - b.teamsCount;
            default:
                if (sortAsc) {
                    return a.season.localeCompare(b.season);
                }
                return b.season.localeCompare(a.season);
        }
    });

    if (sortedSeasons.length === 0) {
        return <p>Ei kausia</p>;
    }
    return (
        <div className='overflow-x-auto'>
            <p className="mb-6 text-sm">PE = pelaajat, MV = maalivahdit, HY = hyökkääjät, PU = puolustajat, S = kuinka monessa eri seurass on ollut suomalaisia</p>
        <table className="mb-6 min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
            <tr>
            <th className="text-left">
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('season')}>Kausi</button>
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
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSorting('teamsCount')}>S</button>
            </th>
            </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {sortedSeasons.map(season => <SeasonRow season={season} key={season.season} />)}
        </tbody>
        </table>
        </div>
    );
}

export default SeasonsTable;
