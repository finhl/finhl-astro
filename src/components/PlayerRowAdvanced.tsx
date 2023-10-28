// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.

import type { Player } from './PlayersTableAdvanced.tsx';

type Props = {
    player: Player
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

const PlayerRowAdvanced = ({player, onlyShowCurrentTeam = false}: Props) => {
    return (
        <tr>
            <td className='align-top py-5'>
                {/* Add <b> tag if player.isActive */}
                {player.isActive ? <b><a className="underline" href={`https://fi.wikipedia.org/${player.wikiLink}`}>{player.name}</a></b> : <a className="underline" href={`https://fi.wikipedia.org/${player.wikiLink}`}>{player.name}</a>}
            </td>
            <td className='align-top pl-1 md:pl-5 py-5'>{player.birthDate.slice(0,4)}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{positionMap(player.position)}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{player.numberOfTeams}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{player.numberOfSeasons}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{player.firstSeason}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>
                {player.seasonsAndTeamsGroupedAlt.map(teamAndSeasons => {
                    const { team, seasons } = teamAndSeasons;
                    // If onlyShowCurrentTeam is true, only show the current team
                    const isCurrent = seasons.endsWith('-');
                    if (onlyShowCurrentTeam && !isCurrent) {
                        return null;
                    }

                    return (
                        <div key={teamAndSeasons.team + seasons}>
                            {/* Add <b> tag if current */}
                            {isCurrent ? <b>{team} {seasons}</b> : <>{team} {seasons}</>}
                        </div>
                    );
                }
                )}
            </td>
        </tr>
    );
}

export default PlayerRowAdvanced;
