import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  groupId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  },
  name: String,
  color: String
});

export default mongoose.model("Participant", ParticipantSchema);

