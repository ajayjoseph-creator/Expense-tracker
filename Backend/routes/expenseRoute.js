import express from 'express';
import { addExpense, getExpenses, summaryByCategory } from '../controllers/expenseController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.post("/addexpense", protect, addExpense);
router.get("/getexpense", protect, getExpenses);
router.get("/summary", protect, summaryByCategory);

export default router;
