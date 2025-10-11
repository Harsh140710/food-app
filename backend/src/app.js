// create server
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// mandatory part for creating application
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routes starts from here
import authRouter from './routes/auth.routes.js';
import foodRouter from './routes/food.routes.js';

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

export default app;