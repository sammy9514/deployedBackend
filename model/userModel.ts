import { Document, Schema, model } from "mongoose";

export interface iData {
  email: string;
  password: string;
  token: string;
  verify: boolean;
  schoolCode: string;
  status: string;
}

interface iUserData extends iData, Document {}

const userModel = new Schema<iUserData>(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },
    token: {
      type: String,
    },
    status: {
      type: String,
      default: "school",
    },
    schoolCode: {
      type: String,
      unique: true,
    },
    verify: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iUserData>("users", userModel);
