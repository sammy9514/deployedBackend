import { Request, Response } from "express";
import { HTTP } from "../utils/enum";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../utils/email";
import { sendMail } from "../utils/mail";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(3).toString("hex");
    const schoolCode = crypto.randomBytes(4).toString("hex");

    const user = await userModel.create({
      email,
      password: hashed,
      schoolCode,
      token,
      // status: SCHOOL.ADMIN,
    });

    sendEmail(user);
    // sendMail(user);

    return res.status(HTTP.CREATED).json({
      message: "This school has successfully been created.",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD).json({
      message:
        "Sorry!! User not created. There was an error with this request.",
    });
  }
};
