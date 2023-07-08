import mongoose, { Schema } from "mongoose";

export interface TodoInterface extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
  checked: boolean;
  createdAt: Date;
}

const todoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  checked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model<TodoInterface>("Todo", todoSchema);
