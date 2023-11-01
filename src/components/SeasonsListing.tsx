import SeasonsTable from "./SeasonsTable.tsx";

import type { Season } from "./SeasonsTable.tsx";

type Props = {
    seasons: Array<Season>;
};

const SeasonsListing = ({ seasons }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Kaikki kaudet</h2>
      <SeasonsTable seasons={seasons} />
    </>
  );
};

export default SeasonsListing;
