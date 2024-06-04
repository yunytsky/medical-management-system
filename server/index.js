// Imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

// Configurations
const app = express();  

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
// app.use("/auth", authRoutes);
app.use("/", routes)

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack, err.name, err.code);
    res.status(500).json({
        errorMessage: "Something went wrong. Try later."
    })
});

// App
const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})