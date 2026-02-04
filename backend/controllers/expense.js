import Expense from "../models/expense.js";
import Group from "../models/Group.js";

export const addExpense = async (req, res) => {
  const { groupId, description, amount, paidBy, splitMode, splits } = req.body;

  let finalSplits = [];

  //  EQUAL SPLIT
  if (splitMode === "equal") {
    const group = await Group.findById(groupId);

    if (!group || group.participants.length === 0) {
      return res.status(400).json({ message: "Group has no participants" });
    }

    const share = amount / group.participants.length;

    finalSplits = group.participants.map((p) => ({
      participantId: p,
      shareAmount: share
    }));
  }

  // CUSTOM SPLIT
  else if (splitMode === "custom") {
    if (!splits || splits.length === 0) {
      return res.status(400).json({ message: "Custom splits required" });
    }

    const totalSplit = splits.reduce(
      (sum, s) => sum + s.shareAmount,
      0
    );

    if (totalSplit !== amount) {
      return res.status(400).json({
        message: "Split amounts must equal total expense"
      });
    }

    finalSplits = splits;
  }

  else {
    return res.status(400).json({ message: "Invalid split mode" });
  }

  const expense = await Expense.create({
    groupId,
    description,
    amount,
    paidBy,
    splitMode,
    splits: finalSplits
  });

  res.status(201).json(expense);
};



export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ groupId: req.params.groupId })
    .populate("groupId")
    .populate("paidBy")
    .populate("splits.participantId");

  res.json(expenses);
};

