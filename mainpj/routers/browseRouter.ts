import { Router, Request, Response } from "express";
import { pgClient } from "../app";

export const browseRouter = Router();
browseRouter.get("/category", async (req, res) => {
  if (req.query.id) {
    let allResult = await pgClient.query(
      "select * from products where products.category_id = $1",
      [req.query.id]
    );
    console.log("chceck all result!!!!!!", allResult.rows);

    res.json({ data: allResult.rows });
  } else {
    let allResult = await pgClient.query("select * from products");
    console.log("chceck all result!!!!!!", allResult.rows);

    res.json({ data: allResult.rows });
  }
});

browseRouter.get("/hot-picks", async (req: Request, res: Response) => {
  let allResult = await pgClient.query("select * from products limit 4");
  //change logic to select hot item when
  console.log("chceck all result!!!!!!", allResult.rows);

  res.json({ data: allResult.rows });
});

browseRouter.get("/product", async (req: Request, res: Response) => {
  // console.log("this is get id", req.query.id);

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

  let productOptionIdResult = await pgClient.query(
    "select id from product_options where product_id = $1",
    [req.query.id]
  );

  res.json({
    basic_data: basicResult.rows[0],
    stock_data: stockResult.rows,
    option_id_data: productOptionIdResult.rows,
  });
});
