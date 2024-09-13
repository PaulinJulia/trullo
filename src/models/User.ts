import { mongoose } from "../db";
const Schema = mongoose.Schema;

export interface interfaceUser {
  id: string;
  name: string;
  email: string;
  password: string;
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
});

const User = mongoose.model<interfaceUser>("User", UserSchema);

export { User };
