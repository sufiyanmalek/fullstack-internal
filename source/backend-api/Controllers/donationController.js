import { DonationModal } from "../Models/donationModal.js";
import { User } from "../Models/userModel.js";

export const donate = async (req, res) => {
  try {
    console.log(req.body);

    const donation = new DonationModal(req.body);
    await donation.save();
    res.status(200).send(donation);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getDonations = async (req, res) => {
  try {
    const month = new Date().toLocaleString("default", { month: "long" });
    const year = new Date().getFullYear();
    const donations = await DonationModal.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: "$userId" },

      {
        $group: {
          _id: { userId: "$userId", month: "$month", year: "$year" },
          amount: { $sum: "$amount" },
        },
      },
    ]);
    let userIds = [];
    donations.map((e) => {
      if (e._id.month == month && e._id.year == year) {
        userIds.push(e._id.userId._id);
      }
    });
    const remainingUsers = await User.find({ _id: { $nin: userIds } });
    res.status(200).json({
      donations,
      remainingUsers,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
