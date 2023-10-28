import PlayersTable from "./PlayersTable.jsx";
import { useState } from "react";

import type { Player } from "./PlayersTable.jsx";

type Props = {
  players: Array<Player>;
};

// A React component that uses the PlayersTable component to display a list of players.
// Has a state to toggle between showing all players and only active players.
// Takes a single prop, players, which is an array of player objects.

const PlayersListing = ({ players }: Props) => {
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [showOnlyCurrentTeam, setShowOnlyCurrentTeam] = useState(false);
  const playersToShow = showOnlyActive
    ? players.filter((player) => player.isActive)
    : players;
  const goaliesInPlayersToShow = playersToShow.filter(
    (player) => player.position === "m"
  );
  const defendersInPlayersToShow = playersToShow.filter(
    (player) => player.position === "p"
  );
  const forwardsInPlayersToShow = playersToShow.filter(
    (player) => player.position === "h"
  );

  const toggleShowOnlyActive = () => {
    setShowOnlyActive(!showOnlyActive);
  };

  const toggleShowOnlyCurrentTeam = () => {
    setShowOnlyCurrentTeam(!showOnlyCurrentTeam);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {showOnlyActive ? "Aktiiviset pelaajat" : "Kaikki pelaajat"}
          </h2>
          {showOnlyActive && (
            <div className="mb-6">
              {playersToShow.length} aktiivista pelaajaa.
              <br />
              {goaliesInPlayersToShow.length} maalivahtia,{" "}
              {defendersInPlayersToShow.length} puolustajaa ja{" "}
              {forwardsInPlayersToShow.length} hyökkääjää.
            </div>
          )}
        </div>
        <div>
          <button
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={toggleShowOnlyActive}
          >
            {showOnlyActive ? "Kaikki" : "Vain aktiiviset"}
          </button>
          {showOnlyActive && (
            <div className="pt-6">
              <button
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={toggleShowOnlyCurrentTeam}
              >
                {showOnlyCurrentTeam
                  ? "Kaikki joukkeet"
                  : "Vain nykyinen joukkue"}
              </button>
            </div>
          )}
        </div>
      </div>
      <PlayersTable players={playersToShow} showOnlyCurrentTeam={showOnlyActive && showOnlyCurrentTeam} />
    </div>
  );
};

export default PlayersListing;
