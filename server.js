import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/dbconnect.js";
import jobRoutes from "./routes/jobRoutes.js";
import { v2 as cloudinary } from 'cloudinary';


dotenv.config();
const app = express();


app.use(express.json());

app.use(cors({
  origin:"https://job-portal-frontend-pi-nine.vercel.app",
  credentials:true
}))
app.use(express.json(
    {
        limit : "7mb"
    }
))

cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret:process.env.api_secret 
    });

// Routes
app.use("/api/jobs", jobRoutes);

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
