import { Application, NextFunction, Request, Response } from "express";
import { mainError } from "./error/mainError";
import { handleError } from "./error/handleError";
import { HTTP } from "./utils/enum";
import auth from "./router/userRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v1", auth);
    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).json({
          message: "good to go",
        });
        app.all("*", (req: Request, res: Response, next: NextFunction) => {
          next(
            new mainError({
              name: "rkmk",
              message: "mkms",
              status: HTTP.BAD,
              success: false,
            })
          );
        });
      } catch (error) {
        res.status(404).json({
          message: "failed",
        });
      }
    });
  } catch (error) {
    app.use(handleError);
  }
};
