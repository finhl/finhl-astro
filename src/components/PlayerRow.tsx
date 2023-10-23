// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import type { Player } from './PlayersTable.tsx';

type Props = {
    player: Player
};

const PlayerRow = ({player}: Props) => {
    return (
        <tr>
            <td className='align-top py-5'>
                {/* Add <b> tag if player.isActive */}
                {player.isActive ? <b><a className="underline" href={player.wikiLink}>{player.name}</a></b> : <a className="underline" href={player.wikiLink}>{player.name}</a>}
            </td>
            <td className='align-top pl-5 py-5'>{player.yearOfBirth}</td>
            <td className='align-top pl-5 py-5'>{player.position}</td>
            <td className='align-top pl-5 py-5'>
                {player.teams.map(team => {
                    return (
                        <div key={team.name}>
                            {/* Add <b> tag if current */}
                            {team.isCurrent ? <b>{team.name} {team.years.join(', ')}</b> : <>{team.name} {team.years.join(', ')}</>}
                        </div>
                    );
                }
                )}
            </td>
        </tr>
    );
}

export default PlayerRow;
