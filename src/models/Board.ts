import { mongoose } from "../db";
import { InterfaceTask } from "./Task";
const Schema = mongoose.Schema;

export interface InterfaceBoard {
  id: string;
  title: string;
  tasks?: InterfaceTask[];
  background: string;
}

// Mongoose Schema
const BoardSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  background: {
    type: String,
    enum: ["red", "green", "purple", "blue", "orange", "grey"],
  },
});

const Board = mongoose.model<InterfaceBoard>("Board", BoardSchema);

export { Board };
