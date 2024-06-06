import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/booksRoute.js"
import cors from "cors";

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
app.use(express.json());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(201).send("welcome to Book Store Project");
});
app.use("/books", bookRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("db is connected");
    app.listen(PORT, () => {
      console.log(`running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
