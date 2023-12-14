import { Router, Request, Response } from "express";
import { isLoggedIn } from "../middleware";
import { pgClient } from "../app";

export const paymentRouter = Router();

paymentRouter.post("/thankyou", isLoggedIn, async (req, res) => {
  console.log(req.body, req.session?.email);

  // need to check stock count!!! use if ,else bouns

  await pgClient.query(
    //   "INSERT INTO receipts (total,quantity,user_id) VALUES ($1,$2,(SELECT id from users where email = $3)",
    //   [req.body.total, req.body.quantity, req.session.email]

    // );
    "INSERT INTO carts (product_option_id,user_id,quantity,total) VALUES  ($1,(SELECT id from users where email = $2),$3,$4)",
    [
      req.body.product_option_id,
      req.session.email,
      req.body.quantity,
      req.body.total,
    ]
  );

  res.json({ message: "added receipt YEAH!!!!!" });
});

paymentRouter.get("/thankyou", async (req, res) => {
  let result = await pgClient.query(
    //     "SELECT * FROM receipts JOIN users ON user_id = users.id JOIN carts ON users.id = carts.user_id JOIN product_options ON product_option_id = product_options.idwhere user_id = (SELECT id from users where email = $1)"

    //   );
    "SELECT * FROM carts join product_options on product_option_id = product_options.id join products on product_id = products.id where user_id = (SELECT id from users where email = $1)",
    [req.session.email]
  );
  console.log("payment susscesssss!!!!!!", result.rows);
  res.json(result.rows);
});

paymentRouter.get("/payment", async (req: Request, res: Response) => {
  const email = req.session.email;
  const userId = await pgClient.query(
    `
      SELECT id
      FROM users
      WHERE email = $1
    `,
    [email]
  );
  const getCartProductQuery = `
      SELECT *
      FROM carts
      WHERE user_id = $1
      )
    `;
  const removeCartProductQuery = `
        DELETE
        FROM carts
        WEHRE user_id = $1
        )
    `;
  const addTransactionsQuery = `
          INSERT INTO receipts
          (total, quanitity, user_id, stripe_id)
          VALUES
          ($1, $2, $3, $4)
    `;
  const addTransactionDetailsQuery = `
    `;
  const cartProducts = await pgClient.query(getCartProductQuery, [userId]);
  const allCartProductInfo = await pgClient.query(`
      SELECT 
        c.user_id as user_id,
        c.product_option_id as product_option_id,
        c.quantity as quantity,
        '1234' as stripe_id,
        p.unit_price as unit_price,
      FROM carts c
      JOIN product_options po ON c.product_option_id = po.id
      JOIN products p ON po.product_id = p.id
    `);
  const total = allCartProductInfo.rows.reduce(
    (acc, cur) => acc + cur.unit_price * cur.quantity,
    0
  );
  const quanitity = allCartProductInfo.rows.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );
  const addTransaction = await pgClient.query(addTransactionsQuery, [
    total,
    quanitity,
    userId,
    1234,
  ]);
  console.log(
    removeCartProductQuery,
    addTransactionDetailsQuery,
    cartProducts,
    addTransaction
  );
});

/////////////////////////////////////////////////////////////////////////
