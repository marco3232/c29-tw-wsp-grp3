import { Client } from "pg";
import dotenv from "dotenv";
import { hashPassword } from "./hash";
dotenv.config();

const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

async function isAdminData() {
  await client.connect();
  await client.query(`INSERT INTO users (email,password) values ($1,$2),($3,$4)`, [
    "marco@tecky.io",
    await hashPassword("marco"),
    "joz@tecky.io",
    await hashPassword("joz"),
  ]);
  await client.end();
}
isAdminData();

async function categories() {
  await client.connect();
  await client.query(`INSERT INTO products (name,unit_price) values ($1,$2),($3,$4)`, [
    "Jeans","100",
    "Shirts","200",
   
  ]);
  await client.end();
}
categories();

async function productDetails() {
  await client.connect();

  const productIdResult = await client.query(`INSERT into product (name,unit_price) VALUES ($1,$2)`,['Tanjiro,Jeans'])
  
  
  const productId = productIdResult.rows[0].id;
  
  await client.query(
    `INSERT INTO product_options (size,stock,product_id) values ($1,$2,$3)`,
    [
      "S","10",productId,
      "M","10",productId,
      "L","10",productId,
    ]
  );
  await client.end();
}
productDetails();
