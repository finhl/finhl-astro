// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import PlayerRow from './PlayerRow.jsx';

type Team = {
    name: string,
    years: Array<string>,
    allYears: Array<number|null>,
    isCurrent: boolean
};

export type Player = {
    name: string,
    teams: Array<Team>,
    isActive: boolean,
    wikiLink: string,
    position: string,
    yearOfBirth: string
};

type Props = {
    players: Array<Player>
};

const PlayersTable = ({players}: Props) => {
    if (players.length === 0) {
        return <p>Ei pelaajia</p>;
    }
    return (
        <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
            <tr>
            <th className="text-left">Nimi</th>
            <th className="text-left pl-1">S.</th>
            <th className="text-left pl-1">Pp</th>
            <th className="text-left pl-1">Seura(t)</th>
            </tr>
        </thead>
        {/* <tbody className='divide-y divide-gray-200 dark:divide-gray-700'> */}
        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {players.map(player => <PlayerRow player={player} key={player.name} />)}
        </tbody>
        </table>
    );
}

export default PlayersTable;
