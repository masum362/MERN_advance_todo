import mongoose, { Schema } from "mongoose";

const todoSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    dueDate: {
      type: String,
      required: true,
    },
    priority:{
      type:String,
      required: true,
    },
    status:{
      type:String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const todoModel = new mongoose.model("Todo", todoSchema);

export default todoModel;
