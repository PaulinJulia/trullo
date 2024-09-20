import { mongoose } from "../db";
const Schema = mongoose.Schema;

export interface InterfaceUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string
}

//Mongoose Schema
const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
  },
  password: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    minLength: 3,
  },
  role: { type: String, default: "user" },
});

const User = mongoose.model<InterfaceUser>("User", UserSchema);

export { User };
