// create server
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// mandatory part for creating application
app.use(express.json());
app.use(cookieParser());


// routes starts from here
import authRouter from './routes/auth.routes.js';
import foodRouter from './routes/food.routes.js';

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

export default app;