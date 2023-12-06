import express, { Request, Response } from "express";

import dotenv from "dotenv";
import pg from "pg";
import { isLoggedIn } from "./middleware";
// import { uploadFile } from "./middleware";
import expressSession from "express-session";
import { resolve } from "path";
import { checkPassword, hashPassword } from "./hash";
// import jsonfile from "jsonfile";
// import { loginCheck } from "./utils";

export type UserListType = [{ username: string; password: string }];

dotenv.config();

const pgClient = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

pgClient.connect();

const app = express();
const port = 8080;

// declare module "express-session" {
//   interface SessionData {
//     // username?: string;
//     isLoggedIn?: boolean;
//   }
// }

app.use(
  expressSession({
    secret: process.env.SECRET!, // open the string when completed
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    username?: string;
    email?: string;
    isLoggedIn?: boolean;
    // passwordInPut1?: number;
    // passwordInPut2?: number;
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// identifier
app.use(express.static("public"));
app.use(express.static("picture"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("music"));
app.use("/protected", express.static("private"));

app.post("/register", async (req: Request, res: Response) => {
  console.log(req.body.email, req.body.passwordInput1, req.body.passwordInput2);
  console.log("app.ts 54");

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
    console.log("app.ts 68");
    let queryResult = await pgClient.query(
      "SELECT id from users WHERE email = $1",
      [req.body.email]
    );

    if (queryResult.rowCount != 0) {
      res.status(400).json({ message: "username already exist" });
    } else {
      console.log("app.ts 77");
      let hashed = await hashPassword(req.body.passwordInput1);
      await pgClient.query(
        "INSERT INTO users (email,password) VALUES ($1,$2)",
        [req.body.email, hashed]
      );
      console.log("app.ts 83");
      res.json({ message: "register success" });
    }
  }
});

// json login
// app.post("/login", async (req, res) => {
//   let emailInput = req.body.email;
//   let passwordInput = req.body.password;
//   console.log("***", emailInput, passwordInput);

//   let data: UserListType = await jsonfile.readFile("users.json");

//   let isVerifed = loginCheck(emailInput, passwordInput, data);
//   console.log("check is verifed", isVerifed);
//   if (isVerifed) {
//     req.session["isLoggedIn"] = true;
//     res.redirect("/protected/admin.html");
//   } else {
//     res.send("username or password is incorrect");
//   }
// });
app.post("/login", async (req, res) => {
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
    res.status(401).json({ message: "username is incorrect" }); // mark json username/password incorrect
  }
});

// app.get("/email",isLoggedIn,async(req,res)=>{
//   if(req.session.email){
//     res.json({message:"get username success",data:req.session.email})
//   }else {
//     res.status(401).json({message:"not login!!!"})
//   }
// })

app.get("/email", isLoggedIn, async (req, res) => {
  res.json({ message: "success", data: req.session.email });
});

app.get("/logout", async (req, res) => {
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
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use((req: Request, res: Response) => {
  res.status(404).sendFile(resolve("public/404.html"));
});

app.listen(port, () => {
  console.log(`App Running At http://localhost:${port}`);
});
