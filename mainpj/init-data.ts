import { Client } from "pg";
import dotenv from "dotenv";
import { hashPassword } from "./hash";

dotenv.config();
const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

main();
async function main() {
  await client.connect();

  await insertUsers();
  await insertCategories();
  await insertProducts();
  await insertProductOptions();
  await client.end();
}

// login user for test db
async function insertUsers() {
  await client.query(
    `INSERT INTO users (email,password) values ($1,$2),($3,$4)`,
    [
      "marco@tecky.io",
      await hashPassword("marco"),
      "joz@tecky.io",
      await hashPassword("joz"),
    ]
  );
}

// categories db
async function insertCategories() {
  await client.query(`INSERT INTO categories(name) VALUES($1),($2),($3)`, [
    "unders",
    "pants",
    "jackets",
  ]);
}

type productType = {
  name: string;
  description: string;
  unit_price: number;
  category_id: number;
  image: string;
};
// products db
async function insertProducts() {
  const result1 = await client.query(
    `SELECT * FROM categories where name =$1`,
    ["unders"]
  );
  const result2 = await client.query(
    `SELECT * FROM categories where name =$1`,["pants"]
  );
  const result3 = await client.query(
    `SELECT * FROM categories where name =$1`,["jackets"]
  );

  const undersId = result1.rows[0].id;
  const pantsId = result2.rows[0].id;
  const jacketsId = result3.rows[0].id;
  
    // 心血
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('HASHIBIRA INOSUKE Under','Only green color and very soft also can use combat style Beast Breathing','100',(SELECT id from categories where name ='under'),'under3.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('TOMIOKA GIYU Under','Only blue color and very soft also can use combat style Water Breathing','100',(SELECT id from categories where name ='under'),'under4.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('KAMADO TANJIRO Pants','Only green color and very comfortable also can use combat style Water Breathing','200',(SELECT id from categories where name ='pants'),'pants1.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('AGATSUMA ZENITSU Pants','Only yellow color and very flexible also can use combat style Thunder Breathing','200',(SELECT id from categories where name ='pants'),'pants2.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('HASHIBIRA INOSUKE Pants','Only green color and very comfortable also can use also can use Sun Breathing','200',(SELECT id from categories where name ='pants'),'pants3.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('TOMIOKA GIYU Pants','Only green color and very comfortable also can use also can use Sun Breathing','200',(SELECT id from categories where name ='pants'),'pants4.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('KAMADO TANJIRO Jacket','Only green color and very comfortable also can use also can use Sun Breathing','300',(SELECT id from categories where name ='jacket'),'jacket1.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('AGATSUMA ZENITSU Jacket','Only green color and very comfortable also can use also can use Sun Breathing','300',(SELECT id from categories where name ='jacket'),'jacket2.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('HASHIBIRA INOSUKE Jacket','Only green color and very comfortable also can use also can use Sun Breathing','300',(SELECT id from categories where name ='jacket'),'jacket3.jpg'),
  // INSERT INTO products (name,description,unit_price,category_id,image) VALUES ('TOMIOKA GIYU Jacket','Only green color and very comfortable also can use also can use Sun Breathing','300',(SELECT id from categories where name ='jacket'),'jacket4.jpg'),
  let productData: productType[] = [
    {
      name: "KAMADO TANJIRO Under",
      description:
        "Only green color and very comfortable also can use combat style Sun Breathing",
      unit_price: 100,
      category_id: undersId,
      image: "under1.jpg",
    },
    {
      name: "AGATSUMA ZENITSU Under",
      description:
        "Only yellow color and very flexible also can use combat style Thunder Breathing",
      unit_price: 100,
      category_id: undersId,
      image: "under2.jpg",
    },
    {
      name: "HASHIBIRA INOSUKE Under",
      description:
        "Only blue color and very soft also can use combat style Beast Breathing",
      unit_price: 100,
      category_id: undersId,
      image: "under3.jpg",
    },
    {
      name: "TOMIOKA GIYU Under",
      description:
        "Only blue color and very soft also can use combat style Water Breathing",
      unit_price: 100,
      category_id: undersId,
      image: "under4.jpg",
    },
    {
      name: "KAMADO TANJIRO Pants",
      description:
        "Only green color and very comfortable also can use combat style Water Breathing",
      unit_price: 200,
      category_id: pantsId,
      image: "pants1.jpg",
    },
    {
      name: "AGATSUMA ZENITSU Pants",
      description:
        "Only yellow color and very flexible also can use combat style Thunder Breathing",
      unit_price: 200,
      category_id: pantsId,
      image: "pants2.jpg",
    },
    {
      name: "HASHIBIRA INOSUKE Pants",
      description:
        "Only red color and very comfortable also can use also can use Sun Breathing",
      unit_price: 200,
      category_id: pantsId,
      image: "pants3.jpg",
    },
    {
      name: "TOMIOKA GIYU Pants",
      description:
        "Only blue color and very soft also can use combat style Water Breathing",
      unit_price: 200,
      category_id: pantsId,
      image: "pants4.jpg",
    },
    {
      name: "KAMADO TANJIRO Jacket",
      description:
        "Only green color and very comfortable also can use combat style Water Breathing",
      unit_price: 300,
      category_id: jacketsId,
      image: "jacket1.jpg",
    },
    {
      name: "AGATSUMA ZENITSU Jacket",
      description:
        "Only yellow color and very flexible also can use combat style Thunder Breathing",
      unit_price: 300,
      category_id: jacketsId,
      image: "jacket2.jpg",
    },
    {
      name: "HASHIBIRA INOSUKE Jacket",
      description:
        "Only blue color and very comfortable also can use also can use Sun Breathing",
      unit_price: 300,
      category_id: jacketsId,
      image: "jacket3.jpg",
    },
    {
      name: "TOMIOKA GIYU Jacket",
      description:
        "Only blue color and very soft also can use combat style Water Breathing",
      unit_price: 300,
      category_id: jacketsId,
      image: "jacket4.jpg",
    },
  ];

  for (let entry of productData) {
    await client.query(
      `INSERT INTO products(name,description,unit_price,category_id,image) 
  VALUES ($1,$2,$3,$4,$5)`,
      [entry.name, entry.description, entry.unit_price, entry.category_id,entry.image]
    );
  }
}

type productOptionType = {
  product_id: number;
  size: string;
  stock: number;
};
async function insertProductOptions() {
  let productOptionData: productOptionType[] = [
    {
      product_id: 1,
      size: "S",
      stock: 10,
    },
    {
      product_id: 1,
      size: "M",
      stock: 0,
    },
    {
      product_id: 1,
      size: "L",
      stock: 30,
    },
    {
      product_id: 2,
      size: "S",
      stock: 12,
    },
    {
      product_id: 2,
      size: "M",
      stock: 0,
    },
    {
      product_id: 2,
      size: "L",
      stock: 32,
    },
    {
      product_id: 3,
      size: "S",
      stock: 13,
    },
    {
      product_id: 3,
      size: "M",
      stock: 0,
    },
    {
      product_id: 3,
      size: "L",
      stock: 33,
    },
    {
      product_id: 4,
      size: "S",
      stock: 24,
    },
    {
      product_id: 4,
      size: "M",
      stock: 0,
    },
    {
      product_id: 4,
      size: "L",
      stock: 34,
    },
    {
      product_id: 5,
      size: "S",
      stock: 15,
    },
    {
      product_id: 5,
      size: "M",
      stock: 0,
    },
    {
      product_id: 5,
      size: "L",
      stock: 35,
    },
    {
      product_id: 6,
      size: "S",
      stock: 16,
    },
    {
      product_id: 6,
      size: "M",
      stock: 0,
    },
    {
      product_id: 6,
      size: "L",
      stock: 36,
    },
    {
      product_id: 7,
      size: "S",
      stock: 17,
    },
    {
      product_id: 7,
      size: "M",
      stock: 0,
    },
    {
      product_id: 7,
      size: "L",
      stock: 37,
    },
    {
      product_id: 8,
      size: "S",
      stock: 18,
    },
    {
      product_id: 8,
      size: "M",
      stock: 0,
    },
    {
      product_id: 8,
      size: "L",
      stock: 38,
    },
    {
      product_id: 9,
      size: "S",
      stock: 19,
    },
    {
      product_id: 9,
      size: "M",
      stock: 0,
    },
    {
      product_id: 9,
      size: "L",
      stock: 39,
    },
	{
      product_id: 10,
      size: "S",
      stock: 20,
    },
    {
      product_id: 10,
      size: "M",
      stock: 0,
    },
    {
      product_id: 10,
      size: "L",
      stock: 40,
    },
    {
      product_id: 11,
      size: "S",
      stock: 21,
    },
    {
      product_id: 11,
      size: "M",
      stock: 0,
    },
    {
      product_id: 11,
      size: "L",
      stock: 41,
    },
    {
      product_id: 12,
      size: "S",
      stock: 22,
    },
    {
      product_id: 12,
      size: "M",
      stock: 0,
    },
    {
      product_id: 12,
      size: "L",
      stock: 42,
    },
  ];

  for (let entry of productOptionData) {
    await client.query(
      `INSERT INTO product_options (product_id,size,stock) 
  VALUES ($1,$2,$3)`,
      [entry.product_id, entry.size, entry.stock]
    );
  }
}


// async function insertCats(){
//   `INSERT INTO cats (user_id,product_option_id,quantity) values ($1,$2,$3),`[

//   ]
// }