import mongoose, { Schema, Document } from "mongoose";

// Define the Task schema
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create the Task model
interface ITask extends Document {
  title: string;
  description: string;
  status: "pending" | "completed";
  creationDate: Date;
  user_id: mongoose.Types.ObjectId;
}

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;
