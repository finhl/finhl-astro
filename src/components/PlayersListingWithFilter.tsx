import PlayersTableWithFilter from "./PlayersTableWithFilter.tsx";
import { useState } from "react";

import type { Player } from "./PlayersTableWithFilter.tsx";

type Props = {
  players: Array<Player>;
};

// A React component that uses the PlayersTable component to display a list of players.
// Has a state to toggle between showing all players and only active players.
// Takes a single prop, players, which is an array of player objects.

const PlayersListingWithFilter = ({ players }: Props) => {
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [showOnlyCurrentTeam, setShowOnlyCurrentTeam] = useState(false);
  const [expandAllTeams, setExpandAllTeams] = useState(false);
  const playersToShow = showOnlyActive
    ? players.filter((player) => player.isActive)
    : players;
  const goaliesInPlayersToShow = playersToShow.filter(
    (player) => player.position === "G"
  );
  const defendersInPlayersToShow = playersToShow.filter(
    (player) => player.position === "D"
  );
  const forwardsInPlayersToShow = playersToShow.filter(
    (player) => player.position === "F"
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
                {showOnlyCurrentTeam ? "Kaikki seurat" : "Vain nykyinen seura"}
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setExpandAllTeams(!expandAllTeams)}
          >
            {expandAllTeams ? "Piilota kaikki seurat" : "Näytä kaikki seurat"}
          </button>
        </div>
      </div>
      <PlayersTableWithFilter
        players={playersToShow}
        showOnlyCurrentTeam={showOnlyActive && showOnlyCurrentTeam}
        expandAllTeams={expandAllTeams}
      />
    </div>
  );
};

export default PlayersListingWithFilter;
