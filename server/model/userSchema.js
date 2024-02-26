import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username:{
        unique: true,
        type: String,
        required:true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);


const userModel = new mongoose.model('User' , userSchema);

export default userModel