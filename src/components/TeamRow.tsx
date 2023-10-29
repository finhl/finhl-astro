// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import type { Team } from './TeamsTable.tsx';

type Props = {
    team: Team
    onlyShowCurrentTeam?: boolean
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

const TeamRow = ({team, onlyShowCurrentTeam = false}: Props) => {
    const players = onlyShowCurrentTeam ? team.players.filter(player => {
        // Return true if any of the seasons end in "-" or contains "2023"
        return player.seasons.some(season => {
            return season.includes("2023") || season.endsWith("-");
        });
    }) : team.players;
    return (
        <tr>
            <td className='align-top py-5'>{team.team}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{team.playersCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{team.goalieCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{team.defenderCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{team.forwardCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{team.seasonsCount}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>
                {players.map(player => {
                    return (
                        <div>{player.player} ({positionMap(player.playerPosition)}, {player.playerBirthDate.slice(0, 4)}) {player.seasons.join(", ")}</div>
                    );
                })}
            </td>
        </tr>
    );
}

export default TeamRow;
