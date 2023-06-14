import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserRegistrationForm from "../components/UserRegistrationForm";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserDetailsTable from "../components/UserDetailsTable";
import DonationsTable from "../components/DonationsTable";

const AdminHomePage = () => {
  // to change views
  const [view, setView] = useState(0);
  // to set form data
  const [userData, setUserData] = useState();
  const [imageData, setImageData] = useState();
  const [donations, setDonations] = useState();
  const [remainingDonations, setRemainingDonations] = useState();

  // edit button view
  const [editView, setEditView] = useState(0);

  //error handler state
  const [error, setError] = useState();

  //to navigate
  const navigate = useNavigate();

  //validate admin on page load
  useEffect(() => {
    const cookie = Cookies.get("admin");
    console.log(cookie);
    if (cookie) {
      var data = cookie;

      var config = {
        method: "post",
        url: "http://localhost:3000/admin/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            navigate("/admin/home");
          }
        })
        .catch(function (error) {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);

  // form data
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(userData);
  };

  //image data
  const handleImageChange = (e) => {
    setImageData(e.target.files[0]);
  };

  // admin logout
  const handleLogout = () => {
    Cookies.remove("admin");
    navigate("/");
  };

  // register user api request
  const registerUser = (e) => {
    e.preventDefault();
    console.log(userData.initiationDate);
    const difference = new Date() - new Date(userData.initiationDate);
    console.log(difference);
    if (difference > 5259600000) {
      alert("Initiation date should not be less than 2 months from now ");
    } else {
      var data = new FormData();
      data.append(
        "user",
        JSON.stringify({
          fullName: {
            firstName: userData.firstName,
            middleName: userData.middleName,
            lastName: userData.lastName,
          },
          address: {
            flatNumber: userData.flatNumber,
            area: userData.area,
            city: userData.city,
            pincode: userData.pincode,
          },
          emailId: userData.emailId,
          initiationDate: userData.initiationDate,
        })
      );
      data.append("image", imageData);
      var config = {
        method: "post",
        url: "http://localhost:3000/addUser",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios(config)
        .then(function (response) {
          setError();
          e.target.reset();
          setUserData();
          setView(0);
          alert("user Created");
        })
        .catch(function (error) {
          setError(error);
        });
    }
  };

  //edit user request
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(userData.initiationDate);
    const difference = new Date() - new Date(userData.initiationDate);
    console.log(difference);
    if (difference > 5259600000) {
      alert("Initiation date should not be less than 2 months from now ");
    } else {
      var data = new FormData();

      data.append(
        "user",
        JSON.stringify({
          fullName: {
            firstName: userData.firstName,
            middleName: userData.middleName,
            lastName: userData.lastName,
          },
          photo: userData.photo,
          address: {
            flatNumber: userData.flatNumber,
            area: userData.area,
            city: userData.city,
            pincode: userData.pincode,
          },
          emailId: userData.emailId,
          initiationDate: userData.initiationDate,
          _id: userData._id,
        })
      );
      data.append("image", imageData);

      var config = {
        method: "put",
        url: "http://localhost:3000/user",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setUserData();
          setError();
          setView(0);
          setEditView(0);
          alert("User Updated");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  //get donation api hitter
  const showDonations = () => {
    var config = {
      method: "get",
      url: "http://localhost:3000/get/donation",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDonations([...response.data.donations]);
        setRemainingDonations([...response.data.remainingUsers]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(donations);
  return (
    <div>
      <Navbar
        setView={setView}
        handleLogout={handleLogout}
        showDonations={showDonations}
      />
      {view === 1 && (
        <UserRegistrationForm
          handleChange={handleChange}
          registerUser={registerUser}
          userData={userData}
          error={error}
          handleEdit={handleEdit}
          editView={editView}
          handleImageChange={handleImageChange}
          imageData={imageData}
        />
      )}
      {view === 0 && (
        <UserDetailsTable
          setUserData={setUserData}
          setEditView={setEditView}
          setView={setView}
        />
      )}
      {view === 2 && (
        <DonationsTable
          donations={donations}
          remainingDonations={remainingDonations}
        />
      )}
    </div>
  );
};

export default AdminHomePage;
