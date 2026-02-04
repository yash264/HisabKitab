import express from "express";
import { getBalances } from "../controllers/balance.js";

const router = express.Router();

router.get("/analytics/:groupId", getBalances);
export default router;
