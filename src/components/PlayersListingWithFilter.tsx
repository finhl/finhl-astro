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
  const [expandAllTeams, setExpandAllTeams] = useState(false);
  const [showGoalies, setShowGoalies] = useState(false);
  const [showDefenders, setShowDefenders] = useState(false);
  const [showForwards, setShowForwards] = useState(false);
  const playersToShowByActive = showOnlyActive
    ? players.filter((player) => player.isActive)
    : players;

    const showAllPositons = (showGoalies && showDefenders && showForwards) || (!showGoalies && !showDefenders && !showForwards);

    const playersToShow = showAllPositons ? playersToShowByActive : playersToShowByActive.filter((player) => {
      if (showGoalies && player.position === "G") {
        return true;
      }
      if (showDefenders && player.position === "D") {
        return true;
      }
      if (showForwards && player.position === "F") {
        return true;
      }
      return false;
    }
    );

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {showOnlyActive ? "Aktiiviset pelaajat" : "Kaikki pelaajat"}
      </h2>
      <div className="-mt-3 -ml-3 mb-6">
        <button
          className={`text-sm
            text-gray-300
            border border-gray-300
            hover:border-gray-100
            px-2 py-1 ml-3 mt-3${
              showOnlyActive
                ? " text-gray-700 bg-gray-300 hover:border-gray-900 "
                : ""
            }`}
          onClick={toggleShowOnlyActive}
        >
          Vain aktiiviset
        </button>
      </div>
      <div className="-mt-3 -ml-3 mb-6">
      <button
          className={`text-sm
             text-gray-300
             border border-gray-300
             hover:border-gray-100
             px-2 py-1 ml-3 mt-3${
               showGoalies
                 ? " text-gray-700 bg-gray-300 hover:border-gray-900 "
                 : ""
             }`}
          onClick={() => setShowGoalies(!showGoalies)}
        >
          Maalivahdit
        </button>
        <button
          className={`text-sm
             text-gray-300
             border border-gray-300
             hover:border-gray-100
             px-2 py-1 ml-3 mt-3${
               showDefenders
                 ? " text-gray-700 bg-gray-300 hover:border-gray-900 "
                 : ""
             }`}
          onClick={() => setShowDefenders(!showDefenders)}
        >
          Puolustajat
        </button>
        <button
          className={`text-sm
             text-gray-300
             border border-gray-300
             hover:border-gray-100
             px-2 py-1 ml-3 mt-3${
               showForwards
                 ? " text-gray-700 bg-gray-300 hover:border-gray-900 "
                 : ""
             }`}
          onClick={() => setShowForwards(!showForwards)}
        >
          Hyökkääjät
        </button>
      </div>
      <div className="-mt-3 -ml-3 mb-6">
        <button
          className={`text-sm
             text-gray-300
             border border-gray-300
             hover:border-gray-100
             px-2 py-1 ml-3 mt-3${
               expandAllTeams
                 ? " text-gray-700 bg-gray-300 hover:border-gray-900 "
                 : ""
             }`}
          onClick={() => setExpandAllTeams(!expandAllTeams)}
        >
          {expandAllTeams ? "Sulje" : "Avaa"} kaikki seuralistat
        </button>
      </div>
      {showOnlyActive && (
        <div className="mb-6">
          {playersToShow.length} pelaajaa jotka on pelannut tällä kaudella.
          <br />
          {goaliesInPlayersToShow.length} maalivahtia,{" "}
          {defendersInPlayersToShow.length} puolustajaa ja{" "}
          {forwardsInPlayersToShow.length} hyökkääjää.
        </div>
      )}
      <PlayersTableWithFilter
        players={playersToShow}
        expandAllTeams={expandAllTeams}
      />
    </div>
  );
};

export default PlayersListingWithFilter;
