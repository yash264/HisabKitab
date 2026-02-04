import Participant from "../models/participants.js";
import Group from "../models/Group.js";

export const getParticipantsByGroup = async (req, res) => {
  const { groupId } = req.params;

  const participants = await Participant.find({
    groupId: groupId
  }).select("_id name");

  res.json(participants);
};


export const addParticipant = async (req, res) => {
  const participant = await Participant.create({
    groupId: req.params.groupId,
    name: req.body.name
  });

  await Group.findByIdAndUpdate(req.params.groupId, {
    $push: { participants: participant._id }
  });

  res.json(participant);
};

