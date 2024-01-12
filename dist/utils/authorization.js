"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const authorization = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const value = token.split(" ")[1];
        if (value) {
            // jwt.verify(value, "just", (err:Error, data))
        }
    }
};
exports.authorization = authorization;
