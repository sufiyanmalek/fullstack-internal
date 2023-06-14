import React, { useState } from "react";
import AllDonationsTable from "./AllDonationsTable";
import RemainingUserTable from "./RemainingUserTable";

const DonationsTable = ({ donations, remainingDonations }) => {
  const [tableFlag, setTableflag] = useState(false);
  return (
    <div className="w-[50%] mx-auto mt-10">
      <div className="flex ">
        <p
          className="border border-black px-2 py-1 hover:cursor-pointer"
          onClick={() => setTableflag(false)}
          style={{ backgroundColor: `${tableFlag ? "white" : "gray"}` }}
        >
          All Donations
        </p>
        <p
          className="border border-black px-2 py-1 hover:cursor-pointer"
          onClick={() => setTableflag(true)}
          style={{ backgroundColor: `${!tableFlag ? "white" : "gray"}` }}
        >
          Remaining Donations
        </p>
      </div>
      {!tableFlag && <AllDonationsTable donations={donations} />}
      {tableFlag && (
        <RemainingUserTable remainingDonations={remainingDonations} />
      )}
    </div>
  );
};

export default DonationsTable;
