import cors from "cors";
import express from "express";
import mongoose from "mongoose";
// import { productRouter } from "./routes/product.js";

// Connect to mongo db database
mongoose
  .connect(
    "mongodb+srv://admin:KusDNQUKuB5WLSkS@resourcesrelationnelles.uzlf8km.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Unable to connect", err));

// Initialize express
const app = express();
app.use(cors()); // For cors management
app.use(express.json()); // Parsing the request for `JSON` support

// Welcome
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Routes for our api
// app.use("/api/products", productRouter);

// Server init
app.listen(3001, () => {
  console.log("Application listen to port 3001");
});
