import { Client } from "pg";
import dotenv from "dotenv";
// import xlsx from "xlsx";
import { hashPassword } from "./hash";
dotenv.config();

const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

// type UserType = {
//     username: string;
//     password: string;
//   };

//   async function main() {
//     await client.connect();

//     const filePath = "dummy-data/users.xlsx";

//     const workbook = xlsx.readFile(filePath);

//     const userSheet = workbook.Sheets["user"];

//     const usersData: UserType[] = xlsx.utils.sheet_to_json<UserType>(userSheet);

//     for (let entry of usersData) {
//       console.log(entry.username, entry.password);

//       let hashed = await hashPassword(entry.password);
//       await client.query(`INSERT INTO users (username,password) values ($1,$2)`, [
//         entry.username,
//         hashed,
//       ]);
//     }
// }

async function main() {
  await client.connect();
  await client.query(`INSERT INTO users (email,password) values ($1,$2),($3,$4)`, [
    "marco@tecky.io",
    await hashPassword("marco"),
    "joz@tecky.io",
    await hashPassword("joz"),
  ]);
  await client.end();
}
main();
