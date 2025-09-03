import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from '../Backend/routes/userRoutes.js';
import expenseRouter from '../Backend/routes/expenseRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "https://expense-tracker-mu-eosin.vercel.app"],
  credentials: true,
  optionsSuccessStatus: 200
}));


app.options("*", cors({
  origin: ["http://localhost:5173", "https://expense-tracker-mu-eosin.vercel.app"],
  credentials: true
}));

app.use(express.json());


connectDB();


app.use('/api/user', authRouter);
app.use('/api/expenses', expenseRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
