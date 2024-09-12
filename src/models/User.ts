import { mongoose } from "../db";
const Schema = mongoose.Schema;

export interface interfaceUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  id: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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