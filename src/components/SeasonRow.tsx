// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import type { Season } from './SeasonsTable.tsx';

type Props = {
    season: Season
};

function positionMap(position: string) {
    switch (position) {
        case "F":
            return "h"
        case "D":
            return "p"
        case "G":
            return "m"
    
        default:
            return "?"
    }
}

const SeasonRow = ({season}: Props) => {
    return (
        <tr>
            <td className='align-top py-5'>{season.season}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{season.playersCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{season.goalieCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{season.defenderCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{season.forwardCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{season.teamsCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>
                {season.players.map(player => {
                    return (
                        <div key={player.hdbid}>{player.name} ({positionMap(player.position)}, {player.birthDate.slice(0, 4)}) {player.teams.join(", ")}</div>
                    );
                })}
            </td>
        </tr>
    );
}

export default SeasonRow;
