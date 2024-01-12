"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const GOOGLE_ID = "946566539911-r9m95v7kur1icibllfeo4ec1qblbuk2o.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH = "1//04RCMfU7B6Du4CgYIARAAGAQSNwF-L9IrVN9ybm35ADK2A8fltN9bqBp-0GM_Qy9gZX7_W2_ZORW25JYDuDWAEumQ5Sm67B1SWwQ";
const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground/";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT_URL);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
const URL = "http://localhost:5173";
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transporter = nodemailer_1.default.createTransport({
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
        const getFile = path_1.default.join(__dirname, "../view");
        const data = {
            token: user.token,
            email: user.email,
            url: `${URL}/`,
        };
        const html = ejs_1.default.renderFile(getFile, { data });
        const mailer = {
            from: "ogunyemiayomide700@gmail.com",
            to: "ogunyemiayomide700@gmail.com",
            subject: "ratata",
            html,
        };
        yield transporter.sendMail(mailer).then(() => {
            console.log("sent");
        });
    }
    catch (error) {
        console.log("error");
    }
});
exports.sendMail = sendMail;
