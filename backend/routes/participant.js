import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
    addParticipant,
    getParticipantsByGroup
  } from "../controllers/participant.js";

const router = express.Router();
router.post("/:groupId", auth, addParticipant);
router.get("/:groupId", auth, getParticipantsByGroup); 

export default router;
