import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.user;
const pass = process.env.pass;

mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0.pdly1.mongodb.net/trullo`
);

const db = mongoose.connection;
// Lyssnar på 'error'-händelsen
db.on("error", console.error.bind(console, "connection error:"));
// Lyssnar på 'open'-händelsen en gång
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export { mongoose };
