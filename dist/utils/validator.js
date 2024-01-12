"use strict";
// import { NextFunction, Request, Response } from "express";
// import joi, { ObjectSchema } from "joi";
// import { HTTP } from "./enum";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error === undefined) {
            next();
        }
        else {
            res.status(404 /* HTTP.BAD */).json({
                message: "validation error",
                data: error,
            });
        }
    };
};
