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

const PlayerRowWithFilter = ({player, onlyShowCurrentTeam = false, showTeamsInitial = false}: Props) => {
    const [showTeams, setShowTeams] = useState(showTeamsInitial);

    useEffect(() => {
        setShowTeams(showTeamsInitial);
    }, [showTeamsInitial]);
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
                <button className='underline' onClick={() => setShowTeams(!showTeams)}>{player.numberOfTeams} seura{player.numberOfTeams > 1 && 'a'} {showTeams ? '▲' : '▼'}</button>
            </td>
        </tr>
        {showTeams && (
            <tr>
                <td colSpan={6} className='align-top pb-5'>
                    <table className="float-right">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {player.seasonsAndTeamsGroupedAlt.map(teamAndSeasons => {
                        const { team, seasons } = teamAndSeasons;
                        // If onlyShowCurrentTeam is true, only show the current team
                        const isCurrent = seasons.endsWith('-');
                        if (onlyShowCurrentTeam && !isCurrent) {
                            return null;
                        }

                        return (
                            <tr key={teamAndSeasons.team + seasons}>
                                {/* Add <b> tag if current */}
                                {isCurrent ? <><td className='align-top'><b>{team}</b></td><td className='align-top pl-1 md:pl-5'><b>{seasons}</b></td></> : <><td className='align-top'>{team}</td><td className='align-top pl-1 md:pl-5'>{seasons}</td></>}
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
