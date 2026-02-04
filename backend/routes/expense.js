import express from "express";
import auth from "../middleware/authMiddleware.js";
import { addExpense, getExpenses } from "../controllers/expense.js";

const router = express.Router();

router.post("/", auth, addExpense);
router.get("/:groupId", auth, getExpenses);

export default router;
