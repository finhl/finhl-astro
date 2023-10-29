import TeamsTable from "./TeamsTable.tsx";
import { useState } from "react";

import type { Team } from "./TeamsTable.tsx";

type Props = {
    teams: Array<Team>;
};

const TeamsListing = ({ teams }: Props) => {
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const teamsToShow = showOnlyActive
    ? teams.filter((team) => {
        // Return true if any of the players have a season that is the current season
        return team.players.some((player) => {
          return player.seasons.some((season) => {
            return season.includes("2023") || season.endsWith("-");
          });
        });
    })
    : teams;

  const toggleShowOnlyActive = () => {
    setShowOnlyActive(!showOnlyActive);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {showOnlyActive ? "Seurat joissa on pelannut suomalaisia tällä kaudella" : "Kaikki seurat"}
          </h2>
          {showOnlyActive && (
            <div className="mb-6">
              {teamsToShow.length} seuraa joissa suomalaisia tällä kaudella.
            </div>
          )}
        </div>
        <div>
          <button
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={toggleShowOnlyActive}
          >
            {showOnlyActive ? "Kaikki" : "Vain nykyinen kausi"}
          </button>
        </div>
      </div>
      <TeamsTable teams={teamsToShow} showOnlyCurrentTeam={showOnlyActive} />
    </div>
  );
};

export default TeamsListing;
