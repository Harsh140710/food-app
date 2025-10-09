// create server
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello Food App")
})

export default app;