import { Request, Response, NextFunction } from "express";
import { verify, Secret, VerifyErrors } from "jsonwebtoken";

const authorization = (req: Request, res: Response, next: NextFunction) => {
  let token: string | string[] | undefined = req.get("authorization"); // gives the header field
  if (token) {
    if (typeof token !== "string") {
      token = token[0];
    }
    token = token.slice(7);
    verify(token, "qwe1234", (err: VerifyErrors | null, decoded: object | undefined | string) => {
      if (err) {
        res.json({
          success: 0,
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Access denied!! Unauthorized user",
    });
  }
};

export default authorization;
