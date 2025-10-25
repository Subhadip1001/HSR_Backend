import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/db.js';
import userRouter from './Routers/user.router.js';
import contactRouter from './Routers/contact.router.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server started at http://localhost:${PORT}`);
});

// --- Export the app ---
export default app;