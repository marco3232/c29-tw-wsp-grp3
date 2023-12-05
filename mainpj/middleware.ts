import { NextFunction, Request, Response } from "express";
// import formidable from "formidable";

//json login
// export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
//   if (req.session["isLoggedIn"] == true) {
//     next();
//   } else {
//     res.redirect("/");
//   }
// }

// use middleware to put/delete
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.session.email) {
    next();
  } else {
    res.status(401).json({ message: "access denied.you are not logged in." });
  }
}