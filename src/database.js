import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));
