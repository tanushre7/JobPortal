import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import jobRoutes from "./routes/job.route.js"; // ✅ path may vary

dotenv.config({});

const app = express();


app.use("/api/jobs", jobRoutes);  
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));


app.get("/home", (req, res) => {
    res.status(200).json({
      message: "I am coming from backend",
      success: true
    });
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB(); // <== inside listen
    console.log(`Server running at port ${PORT}`);
});
