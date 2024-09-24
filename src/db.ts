import mongoose from "mongoose";
import "dotenv/config";

// const user = process.env.user;
// const pass = process.env.pass;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI miljövariabeln är inte satt");
}

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
// Lyssnar på 'error'-händelsen
db.on("error", console.error.bind(console, "connection error:"));
// Lyssnar på 'open'-händelsen en gång
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export { mongoose };
