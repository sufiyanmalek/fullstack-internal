import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function UserHomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [view, setView] = useState(0);
  const [donation, setDonation] = useState();
  const years = [
    1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
    2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
    2035,
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // verify user on page access
  useEffect(() => {
    const cookie = JSON.parse(Cookies.get("user"));
    if (cookie) {
      setUser(cookie);
    } else {
      navigate("/devotee/login");
    }
  }, []);

  //handle logout
  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/devotee/login");
  };

  //handle donation form data
  const handleChange = (e) => {
    setDonation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      userId: user.User._id,
    }));
  };

  //donate Money
  const donateMoney = (e) => {
    e.preventDefault();
    var data = JSON.stringify(donation);

    var config = {
      method: "post",
      url: "http://localhost:3000/donation",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Donation done");
        e.target.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(user);
  console.log(donation);
  return (
    <div>
      <Navbar handleLogout={handleLogout} setView={setView} />
      {view === 1 && (
        <div className="w-[50%] mx-auto border border-black mt-10">
          <h1 className="text-center text-3xl border-b border-black">
            Donation Form:{" "}
          </h1>
          <div className="p-5">
            <form action="#" onSubmit={donateMoney} onChange={handleChange}>
              <label htmlFor="amount">Amount:</label>
              <input
                className="block border border-black mb-2 rounded-md py-1 px-2"
                type="number"
                name="amount"
                placeholder="Donation Amount"
                min={100}
              />
              <label htmlFor="month">Select Month:</label>
              <select name="month" id="month">
                <option value="select-year" defaultChecked>
                  --select month--
                </option>
                {months.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
              <br />
              <label htmlFor="year">Year:</label>

              <select name="year" id="year">
                <option value="select-year" defaultChecked>
                  --select year--
                </option>
                {years.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
              <div>
                <button className="py-1 px-2 bg-green-600 text-white font-semibold rounded-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {view == 2 && (
        <div className="w-[50%] border border-black mt-10 mx-auto">
          <div className="m-2">
            <img src={user.User.photo} alt="" />
          </div>
          <div className="m-2">
            <p>
              <strong>Full Name:</strong>{" "}
              {user.User.fullName.firstName +
                " " +
                user.User.fullName.middleName +
                " " +
                user.User.fullName.lastName}
            </p>
            <p>
              <strong>Email Id:</strong> {user.User.emailId}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {user.User.address.flatNumber +
                ", " +
                user.User.address.area +
                ", " +
                user.User.address.city +
                ", " +
                user.User.address.pincode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserHomePage;
