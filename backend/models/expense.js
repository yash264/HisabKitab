import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  groupId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  },
  description: String,
  amount: Number,
  paidBy:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant"
  },
  splitMode: String,
  splits: [
    {
      participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant" },
      shareAmount: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Expense", ExpenseSchema);

