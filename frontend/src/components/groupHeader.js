import { useEffect, useState } from "react";
import api from "../externalAPI/api";

const GroupHeader = ({ group }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!group?._id) return;

    api.get(`/participants/${group._id}`).then((res) => {
      setParticipants(res.data || []);
    });
  }, [group]);

  if (!group) {
    return (
      <h3 style={{ margin: 0, fontWeight: 500, color: "#6b7280" }}>
        Select a group
      </h3>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* LEFT: Group Name */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "40%"
        }}
      >
        {group.name}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* RIGHT: Members */}
      <div
        style={{
          maxWidth: "55%",
          textAlign: "right",
          fontSize: 14,
          color: "#6b7280",
          lineHeight: 1.4,
          overflow: "hidden"
        }}
      >
        <span style={{ fontWeight: 500 }}>
          {participants.length} members:
        </span>{" "}
        <span style={{ color: "#111827" }}>
          {participants.map((p) => p.name).join(", ")}
        </span>
      </div>
    </div>
  );
};

export default GroupHeader;

