import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index.js";
import cors from 'cors';



dotenv.config();



const app = express();



app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(indexRouter);




mongoose.connect(process.env.MONGO_DB_URI);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("App listening on port 8080");
});
