import { mongoose } from "../db";
import { InterfaceUser } from "./User";
const Schema = mongoose.Schema;

interface interfaceTask {
  id: string;
  title: string;
  description: string;
  status: "to-do" | "in progress" | "blocked" | "done";
  assignedTo?: InterfaceUser;
  createdAt: Date;
  finishedBy?: string;
}

// Mongoose Schema
const TaskSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String!, required: true },
  description: String,
  status: {
    type: String,
    enum: ["to-do", "in progress", "blocked", "done"],
    default: "to-do",
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  finishedBy: String,
});

const Task = mongoose.model<interfaceTask>("Task", TaskSchema);

export { Task };
