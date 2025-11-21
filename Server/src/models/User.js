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
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
     height: {
      type: Number, // store in cm
      required: true,
    },
    weight:{
      type:Number,
      required:true
    },
    fitnessLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    
    goal: {
      type: String,
      enum: ["weight_loss", "muscle_gain", "maintain", "endurance", "strength"],
      required: true,
    },
     workoutPreference: {
      type: String,
      enum: ["home", "gym", "both"],
      required: true,
    },
    bodyFat: {
      type: Number, // percentage
      default: null,
    },
     dailyActivityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      default: "sedentary",
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
    
},{ timestamps: true })
const NewUser=mongoose.model("NewUser",signup);
export default NewUser