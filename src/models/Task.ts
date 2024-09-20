import { mongoose } from "../db";
import { InterfaceUser } from "./User";
const Schema = mongoose.Schema;

export interface InterfaceTask {
  id: string;
  title: string;
  description: string;
  status: "to-do" | "in progress" | "blocked" | "done";
  assignedTo?: InterfaceUser;
  createdAt: Date;
  finishedBy?: string;
  tags: "red" | "green" | "purple" | "blue" | "orange";
}

// Mongoose Schema
const TaskSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["to-do", "in progress", "blocked", "done"],
    default: "to-do",
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  finishedBy: String,
  tags: { type: String, enum: ["red", "green", "purple", "blue", "orange"]}
});

const Task = mongoose.model<InterfaceTask>("Task", TaskSchema);

export { Task };
