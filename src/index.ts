import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import router from "./router";

configDotenv()

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);


server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = process.env.MONGO_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => {
    console.log(error);
});


app.use('/', router());
