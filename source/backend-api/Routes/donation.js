import express from "express";
import { donate, getDonations } from "../Controllers/donationController.js";

export const donationRouter = express.Router();

donationRouter.post("/donation", donate);

donationRouter.get("/get/donation", getDonations);
