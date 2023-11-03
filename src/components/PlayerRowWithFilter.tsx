// A react component that displays a table of players. Each row is its own component.
// It takes a single prop, players, which is an array of player objects.
import { useState, useEffect } from "react";
import type { Player } from './PlayersTableWithFilter.tsx';

type Props = {
    player: Player
    onlyShowCurrentTeam?: boolean
    showTeamsInitial?: boolean
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

const PlayerRowWithFilter = ({player, showTeamsInitial = false}: Props) => {
    const [showTeams, setShowTeams] = useState(showTeamsInitial);

    useEffect(() => {
        setShowTeams(showTeamsInitial);
    }, [showTeamsInitial]);

    const latestSeason = player.seasonsAndTeamsGroupedAlt[player.seasonsAndTeamsGroupedAlt.length - 1];
    const teamsButtonClass = player.isActive ? 'font-bold' : '';
    return (
        <>
        {/* row should have a top border */}
        <tr className='border-t'>
            <td className='align-top py-5'>
                {/* Add <b> tag if player.isActive */}
                {player.isActive ? <b><a className="underline" href={`https://fi.wikipedia.org/${player.wikiLink}`}>{player.name}</a></b> : <a className="underline" href={`https://fi.wikipedia.org/${player.wikiLink}`}>{player.name}</a>}
            </td>
            <td className='align-top pl-1 md:pl-5 py-5'>{player.birthDate.slice(0,4)}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{positionMap(player.position)}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{player.numberOfSeasons}</td>
            <td className='align-top pl-1 md:pl-5 py-5'>{player.firstSeason.slice(0,4)}</td>
            <td className='align-top pl-1 md:pl-5 py-5 text-right'>
                <button className={`underline ${teamsButtonClass}`} onClick={() => setShowTeams(!showTeams)}>{latestSeason.team}{player.numberOfTeams >  1 && ` (+ ${player.numberOfTeams - 1})`} {showTeams ? '▲' : '▼'}</button>
            </td>
        </tr>
        {showTeams && (
            <tr>
                <td colSpan={6} className='align-top pb-5'>
                    <table className="float-right">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {player.seasonsAndTeamsGroupedAlt.map(teamAndSeasons => {
                        const { team, seasons } = teamAndSeasons;
                        const seasonsList = seasons.split(', ');

                        return (
                            <tr key={teamAndSeasons.team + seasons}>
                                {/* Add <b> tag if current */}
                                <><td className='align-top'>{team}</td><td className='align-top pl-1 md:pl-5'>{seasonsList.map(season => <div>{season}</div>)}</td></>
                            </tr>
                        );
                    }
                    )}
                    </tbody>
                    </table>
                </td>
            </tr>
        )}
        </>
    );
}

export default PlayerRowWithFilter;
