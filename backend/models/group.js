import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: String,
    ownerId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant"
      }
    ]
  },
  { timestamps: true }
);

const Group =
  mongoose.models.Group || mongoose.model("Group", GroupSchema);

export default Group;



