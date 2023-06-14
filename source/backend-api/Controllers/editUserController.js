//imports

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { User } from "../Models/userModel.js";
import { userValidator } from "../utils/validateUserRegistration.js";

// edit User
export const editUser = async (req, res) => {
  try {
    console.log("edit user");
    const client = new S3Client({});
    const main = async () => {
      const command = new PutObjectCommand({
        Bucket: "internal-exam",
        Key: req.files.image.name,
        Body: req.files.image.data,
      });
      try {
        const response = await client.send(command);
        console.log(response);
        const url = new URL(
          `https://internal-exam.s3.ap-south-1.amazonaws.com/${req.files.image.name}`
        );
        return url.href;
      } catch (err) {
        console.error(err);
      }
    };
    const imageUrl = await main();
    console.log(imageUrl);
    const userData = JSON.parse(req.body.user);
    userData.photo = imageUrl;
    const validation = userValidator(userData);
    if (validation.error) {
      res.status(403).send({
        message: "Validation Error",
        error: validation.error.details[0].message,
      });
    } else {
      console.log("here");
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userData._id },
        {
          fullName: {
            firstName: userData.fullName.firstName,
            middleName: userData.fullName.middleName,
            lastName: userData.fullName.lastName,
          },
          photo: userData.photo,
          address: {
            flatNumber: userData.address.flatNumber,
            area: userData.address.flatNumber,
            city: userData.address.flatNumber,
            pincode: userData.address.flatNumber,
          },
          emailId: userData.emailId,
          initiationDate: userData.initiationDate,
        },
        { new: true }
      );
      console.log("here");
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
