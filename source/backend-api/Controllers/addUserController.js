//imports
import { UserCreds } from "../Models/userCredentialsModel.js";
import { User } from "../Models/userModel.js";
import { NodeMailer } from "../utils/registrationMailer.js";
import { userValidator } from "../utils/validateUserRegistration.js";
import bcrypt from "bcrypt";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// add user controller
export const addUser = async (req, res) => {
  try {
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
    console.log(userData);

    // joi validation function
    const validation = userValidator(userData);
    if (validation.error) {
      res.status(403).send({
        message: "Validation Error",
        error: validation.error.details[0].message,
      });
    } else {
      const user = await User.findOne({ emailId: userData.emailId });
      if (user) {
        res.status(409).json({
          error: "user with this email already exists",
        });
      } else {
        const user = new User({ ...userData });
        await user.save();
        const year = user.initiationDate.getFullYear().toString();
        const firstname = user.fullName.firstName.substring(0, 2);
        const lastName = user.fullName.lastName.substring(0, 2);
        const month = (user.initiationDate.getMonth() + 1).toString();
        const username = year + firstname + lastName + month;
        const random = Math.floor(Math.random() * 1000000 + 1);
        console.log(random);
        const password = await bcrypt.hash(random.toString(), 10);
        const userCreds = new UserCreds({
          userId: username,
          password: password,
          User: user._id,
        });
        await userCreds.save();
        NodeMailer(user.emailId, {
          username: userCreds.userId,
          password: random,
        });
        res.status(200).json({
          message: "User registered successfully",
          userCreds,
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// export const addUser = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
