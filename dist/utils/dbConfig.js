"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const url = process.env.DATABASE_STRING;
const mainConnection = () => {
    try {
        (0, mongoose_1.connect)(url).then(() => {
            console.log("db is connected ");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mainConnection = mainConnection;
