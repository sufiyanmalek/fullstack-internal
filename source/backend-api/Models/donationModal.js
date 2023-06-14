import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
});

export const DonationModal = mongoose.model("donations", donationSchema);
