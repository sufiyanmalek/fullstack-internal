import React from "react";

const RemainingUserTable = ({ remainingDonations }) => {
  console.log(remainingDonations);
  return (
    <table>
      <thead>
        <tr>
          <th>Devotee Name</th>
          <th>Devotee Email</th>
          <th>Month</th>
        </tr>
      </thead>
      <tbody>
        {remainingDonations &&
          remainingDonations.map((e, index) => {
            return (
              <tr key={index}>
                <td>
                  {e.fullName.firstName +
                    " " +
                    e.fullName.middleName +
                    " " +
                    e.fullName.lastName}
                </td>
                <td>{e.emailId}</td>
                <td>
                  {new Date().toLocaleString("default", { month: "long" })}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default RemainingUserTable;
