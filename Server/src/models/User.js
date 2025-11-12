import mongoose from "mongoose";
const signup=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    status: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
})
const NewUser=mongoose.model("NewUser",signup);
export default NewUser