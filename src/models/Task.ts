import { mongoose } from "../db";
const Schema = mongoose.Schema;
import { interfaceUser } from "./User";

interface interfaceTask {
  id: string;
  title: string;
  description: string;
  status: "to-do" | "in progress" | "blocked" | "done";
  assignedTo?: interfaceUser;
  createdAt: Date;
  finishedBy?: string;
}

const TaskSchema = new Schema({
  id: String,
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
});

const Task = mongoose.model<interfaceTask>("Task", TaskSchema);

export { Task };
