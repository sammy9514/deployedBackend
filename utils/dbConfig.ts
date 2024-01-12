import dotEnv from "dotenv";
import { connect } from "mongoose";
dotEnv.config();
const url: string | undefined = process.env.DATABASE_STRING;
export const mainConnection = () => {
  try {
    connect(url!).then(() => {
      console.log("db is connected ");
    });
  } catch (error) {
    console.log(error);
  }
};
