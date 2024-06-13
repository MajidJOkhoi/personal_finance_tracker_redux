import express from "express";
import mongoose from "mongoose";
import FinalRecords from "./routes/financialRecords.js"  // Correct import path
import { PORT, MONGO_URI } from "./config.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for handling CORS policies
app.use(cors());

// Optionally, to allow custom origins, uncomment and configure:
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// );

// Use the financial records router for routes starting with /financial-records
app.use("/financial-records", FinalRecords );


// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
