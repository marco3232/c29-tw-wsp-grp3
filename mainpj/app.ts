import express, { Request, Response } from "express";

import dotenv from "dotenv";
import pg from "pg";
import { isAdminIn, isLoggedIn } from "./middleware";
// import { uploadFile } from "./middleware";
import expressSession from "express-session";
import { resolve } from "path";
import { checkPassword, hashPassword } from "./hash";
// import jsonfile from "jsonfile";

export type EmailListType = [{ email: string; password: string }];

// export type UserListType = [{ username: string; password: string }];
// type productType = {
//   name: string;
//   description: string;
//   unit_price: number;
//   category_id: number;
//   image: string;
// };
dotenv.config();

const pgClient = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

pgClient.connect();

const app = express();
const port = 8080;

app.use(
  expressSession({
    secret: process.env.SECRET!, // open the string when completed
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    email?: string;
    isAdmin?: boolean;
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/category", async (req, res) => {
  
  if(req.query.id){
    let allResult = await pgClient.query(
      "select * from products where products.category_id = $1",
      [req.query.id]
    );
    console.log("chceck all result!!!!!!", allResult.rows);
  
  
    res.json({data:allResult.rows});
  }else{
    let allResult = await pgClient.query(
      "select * from products"
    );
    console.log("chceck all result!!!!!!", allResult.rows);
  
  
    res.json({data:allResult.rows});
  }
 
});



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
      res.status(400).json({ message: "email already exist" });
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
    res.status(401).json({ message: "email is incorrect" }); // mark json username/password incorrect
  }
});

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

app.get("/product", async (req: Request, res: Response) => {
  console.log("this is get id", req.query.id);

  let basicResult = await pgClient.query(
    "select * from products where products.id = $1",
    [req.query.id]
  );

  console.log("this is basic Result", basicResult.rows[0]);

  let stockResult = await pgClient.query(
    "select size,stock from product_options where product_id = $1",
    [req.query.id]
  );

  console.log("this is stock", stockResult.rows);

  res.json({ basic_data: basicResult.rows[0], stock_data: stockResult.rows });
  // let queryResult = await pgClient.query("SELECT * FROM products");
  // console.log(queryResult.rows);
  // res.json(queryResult.rows);
});

// identifier
app.use(express.static("public"));
app.use("/product", express.static("public/product.html"));
app.use("/category", express.static("public/category.html"));
app.use(express.static("private"));
app.use("/admin", isAdminIn, express.static("admin"));

app.use((req: Request, res: Response) => {
  res.status(404).sendFile(resolve("public/404.html"));
});

app.listen(port, () => {
  console.log(`App Running At http://localhost:${port}`);
});
