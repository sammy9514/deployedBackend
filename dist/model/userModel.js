"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("users", userModel);
