import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//all route
import connectDB from "./src/config/db.js";
import router from "./src/routes/auth.routes.js";
import passwordRoutes from "./src/routes/password.routes.js";
import homeRoute from "./src/routes/homeWorkout.routes.js";
import gymWorkoutRoutes from "./src/routes/gymWorkout.routes.js";
import fitnessRoutes from "./src/routes/fitness.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import fetchUser from "./src/routes/users.routes.js";
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/password", passwordRoutes);//Otp Send email
app.use("/api/fitness", fitnessRoutes);
app.use('/uploads', express.static(path.join(path.resolve(), 'homeUpload'))); //homeworkout video uplode
app.use("/api/homeworkout",homeRoute)//fetch homeworkout
app.use("/api/gymworkout", gymWorkoutRoutes);
app.use('/gymphoto', express.static(path.join(path.resolve(), 'gymphoto')));//gym workout video uplode
app.use("/api/admin", adminRoutes);
app.use("/api/users", fetchUser);


const PORT=process.env.PORT|| 8000

connectDB();



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})