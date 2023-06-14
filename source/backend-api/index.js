// imports
import express from "express";
import { connectDB } from "./config/dbConnection.js";
import { manageUsersRouter } from "./Routes/manageUsers.js";
import { loginAdminRouter } from "./Routes/adminLogin.js";
import cors from "cors";
import { userLoginRouter } from "./Routes/loginUser.js";
import fileUpload from "express-fileupload";
import { donationRouter } from "./Routes/donation.js";

// initiate app
const app = express();

// allow requests
app.use(cors("*"));

// database connection
connectDB();

// express json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

// user management router that will only be used by admin
app.use(manageUsersRouter);

// admin login
app.use(loginAdminRouter);

// user login
app.use(userLoginRouter);

//donation
app.use(donationRouter);

// listen to port
const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
