import React from "react";

const AllDonationsTable = ({ donations }) => {
  return (
    <table className="w-[100%]">
      <thead>
        <tr>
          <th>Devotee FullName</th>
          <th>Donation Amount</th>
          <th>Month</th>
          <th>Year</th>
        </tr>
      </thead>
      {donations && (
        <tbody>
          {donations.map((e, index) => {
            return (
              <tr
                style={{
                  backgroundColor: `${e.amount >= 10000 ? "green" : "white"}`,
                }}
                key={index}
              >
                <td>
                  {e._id.userId.fullName.firstName +
                    " " +
                    e._id.userId.fullName.middleName +
                    " " +
                    e._id.userId.fullName.lastName}
                </td>
                <td>{e.amount}</td>
                <td>{e._id.month}</td>
                <td>{e._id.year}</td>
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default AllDonationsTable;
