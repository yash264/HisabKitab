import Expense from "../models/expense.js";
import Group from "../models/Group.js";
import { calculateBalances, settleBalances } from "../utils/settlementEngine.js";

export const getBalances = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate("participants");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Load expenses with necessary populates
    const expenses = await Expense.find({ groupId: req.params.groupId })
      .populate("paidBy")
      .populate("splits.participantId");

    // Calculate raw balances and settlements
    const rawBalances = calculateBalances(expenses);
    const settlements = settleBalances(rawBalances);

    // Total spent sum
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    const idToName = {};
    group.participants.forEach((p) => {
      idToName[p._id.toString()] = p.name;
    });

    const balances = {};
    Object.entries(rawBalances).forEach(([id, amount]) => {
      balances[idToName[id] || id] = amount;  
    });

    const namedSettlements = settlements.map((s) => ({
      from: idToName[s.from] || s.from,
      to: idToName[s.to] || s.to,
      amount: Number(s.amount.toFixed(2))
    }));

    const members = Object.keys(balances).length;
    const avgPerPerson = members ? totalSpent / members : 0;

    return res.json({
      totalSpent,
      expenseCount: expenses.length,
      avgPerPerson,
      balances,
      settlements: namedSettlements,
      membersCount: members
    });
  } catch (error) {
    console.error("Error in getBalances:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



