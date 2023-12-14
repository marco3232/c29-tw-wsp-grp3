import { Router } from "express";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../hash";
import { pgClient } from "../app";
import { isLoggedIn } from "../middleware";
export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/email", isLoggedIn, getEmail);
authRouter.get("/logout", logout);

async function register(req: Request, res: Response) {
  console.log(req.body.email, req.body.passwordInput1, req.body.passwordInput2);

  if (req.body.email == undefined || req.body.email == "") {
    res.status(400).json({ message: "email can not be null" });
  } else if (
    req.body.passwordInput1 == undefined ||
    req.body.passwordInput1 == ""
  ) {
    res.status(400).json({ message: "password can not be null" });
  } else if (
    req.body.passwordInput2 == undefined ||
    req.body.passwordInput2 == ""
  ) {
    res.status(400).json({ message: "password verification can not be null" });
  } else if (req.body.passwordInput1 != req.body.passwordInput2) {
    res.status(400).json({ message: "Both passwords not same" });
  } else {
    let queryResult = await pgClient.query(
      "SELECT id from users WHERE email = $1",
      [req.body.email]
    );

    if (queryResult.rowCount != 0) {
      res.status(400).json({ message: "email already exist" });
    } else {
      console.log("app.ts 77");
      let hashed = await hashPassword(req.body.passwordInput1);
      await pgClient.query(
        "INSERT INTO users (first_name,last_name,email,password,contact_number) VALUES ($1,$2,$3,$4,$5)",
        [
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hashed,
          req.body.contact_number,
        ]
      );
      console.log("app.ts 83");
      res.json({ message: "register success" });
    }
  }
}

async function login(req: Request, res: Response) {
  console.log(req.body.email, req.body.password);

  let queryResult = await pgClient.query(
    "SELECT password from users where email =$1",
    [req.body.email]
  );
  if (queryResult.rowCount != 0) {
    // console.log(queryResult.rows[0].password)
    let compareResult = await checkPassword({
      plainPassword: req.body.password,
      hashedPassword: queryResult.rows[0].password,
    });
    console.log("compareResult", compareResult);
    if (compareResult) {
      req.session.email = req.body.email;
      res.status(200).json({ message: "login success" });
    } else {
      res.status(401).json({ message: "password is incorrect" });
    }
  } else {
    res.status(401).json({ message: "email is incorrect" }); // mark json username/password incorrect
  }
}

async function getEmail(req: Request, res: Response) {
  res.json({ message: "success", data: req.session.email });
}

async function logout(req: Request, res: Response) {
  if (!req.session.email) {
    res.status(401).json({ message: "your are not logged in" });
  } else {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: "logout failed" });
      } else {
        res.json({ message: "logout success" });
      }
    });
  }
}
