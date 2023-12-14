import express, { Request, Response } from "express";

import dotenv from "dotenv";
import pg from "pg";
import { isAdminIn, isLoggedIn } from "./middleware";
import expressSession from "express-session";
import { resolve } from "path";
import { authRouter } from "./routers/authRouter";
import { browseRouter } from "./routers/browseRouter";
import { cartRouter } from "./routers/cartRouter";
import { paymentRouter } from "./routers/paymentRouter";

dotenv.config();

export type EmailListType = [{ email: string; password: string }];
declare module "express-session" {
  interface SessionData {
    email?: string;
    isAdmin?: boolean;
  }
}

export const pgClient = new pg.Client({
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRouter);
app.use(browseRouter);
app.use(cartRouter);
app.use(paymentRouter);

app.get("/cart.html",isLoggedIn,express.static("public/cart.html"))

app.get("/hi", (req: Request, res: Response) => {
  res.send("hello world");
});


// identifier
app.use(express.static("public"));
app.use("/product", express.static("public/product.html"));
app.use("/category", express.static("public/category.html"));

app.use(isLoggedIn, express.static("private"));
app.use("/admin", isAdminIn, express.static("admin"));

app.use((req: Request, res: Response) => {
  res.status(404).sendFile(resolve("public/404.html"));
});

app.listen(port, () => {
  console.log(`App Running At http://localhost:${port}`);
});
