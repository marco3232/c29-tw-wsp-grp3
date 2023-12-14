import { Router } from "express";
import { isLoggedIn } from "../middleware";
import { pgClient } from "../app";

export const cartRouter = Router();
cartRouter.post("/addCart", isLoggedIn, async (req, res) => {
  console.log(req.body, req.session?.email);

  // step 1 :  check for the user ,if there is existing cart record
  // step 2 : if yes, update the count; if no, insert new record

  let existQuery = await pgClient.query(
    "SELECT * from carts where user_id =(SELECT id from users where email = $1) and product_option_id = $2",
    [req.session.email, req.body.product_option_id]
  );

  if (existQuery.rowCount == 0) {
    await pgClient.query(
      "INSERT INTO carts (product_option_id,user_id,quantity) VALUES  ($1,(SELECT id from users where email = $2),$3)",
      [req.body.product_option_id, req.session.email, req.body.quantity]
    );
  } else {
    await pgClient.query(
      "UPDATE carts SET quantity = quantity + $1 where user_id =(SELECT id from users where email = $2) and product_option_id = $3",
      [req.body.quantity, req.session.email, req.body.product_option_id]
    );
  }

  res.json({ message: "added to cart" });
});

cartRouter.get("/cart", async (req, res) => {
  let result = await pgClient.query(
    "SELECT * FROM carts join product_options on product_option_id = product_options.id join products on product_id = products.id where user_id = (SELECT id from users where email = $1)",
    [req.session.email]
  );
  console.log("$$$$$$$$$$$$$$$", result.rows);
  res.json(result.rows);
});
