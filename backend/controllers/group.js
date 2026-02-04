import Group from "../models/Group.js";
import Participant from "../models/participants.js";
import Expense from "../models/expense.js";

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      ownerId: req.user.id
    });

    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch groups" });
  }
};

export const createGroup = async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      ownerId: req.user.id
    });

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Failed to create group" });
  }
};


