import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getGroups,
  createGroup
} from "../controllers/group.js";

const router = express.Router();

router.get("/", auth, getGroups);     
router.post("/", auth, createGroup);

export default router;

