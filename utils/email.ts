import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

// const GOOGLE_ID =
//   "946566539911-r9m95v7kur1icibllfeo4ec1qblbuk2o.apps.googleusercontent.com";
// const GOOGLE_SECRET = "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";
// const GOOGLE_REFRESH =
//   "1//04RCMfU7B6Du4CgYIARAAGAQSNwF-L9IrVN9ybm35ADK2A8fltN9bqBp-0GM_Qy9gZX7_W2_ZORW25JYDuDWAEumQ5Sm67B1SWwQ";
// const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";

const GOOGLE_ID =
  "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH =
  "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });

const URL = "http://localhost:5173";

export const sendEmail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });

    const getFile = path.join(__dirname, "../view/index.ejs");

    const data = {
      token: user.token,
      email: user.email,
      url: `${URL}/`,
    };

    const html = await ejs.renderFile(getFile, { data });

    const mailer: any = {
      from: "codelabbest@gmail.com",
      to: "ogunyemiayomide700@gmail.com",
      subject: "I got it right",
      html,
    };

    await transporter.sendMail(mailer).then(() => {
      console.log("email sent");
    });
  } catch (error) {
    console.log(error);
  }
};
