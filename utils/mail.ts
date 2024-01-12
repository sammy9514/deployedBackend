import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
  "946566539911-r9m95v7kur1icibllfeo4ec1qblbuk2o.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH =
  "1//04RCMfU7B6Du4CgYIARAAGAQSNwF-L9IrVN9ybm35ADK2A8fltN9bqBp-0GM_Qy9gZX7_W2_ZORW25JYDuDWAEumQ5Sm67B1SWwQ";
const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground/";

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });

const URL = "http://localhost:5173";

export const sendMail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ogunyemiayomide700@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });

    const getFile = path.join(__dirname, "../view");

    const data = {
      token: user.token,
      email: user.email,
      url: `${URL}/`,
    };

    const html = ejs.renderFile(getFile, { data });

    const mailer: any = {
      from: "ogunyemiayomide700@gmail.com",
      to: "ogunyemiayomide700@gmail.com",
      subject: "ratata",
      html,
    };

    await transporter.sendMail(mailer).then(() => {
      console.log("sent");
    });
  } catch (error) {
    console.log("error");
  }
};
