import { Modal, Input, Button, message } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import api from "../externalAPI/api";

const MAX_MEMBERS = 3;

const CreateGroupModal = ({ open, onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addMemberField = () => {
    if (members.length < MAX_MEMBERS) {
      setMembers([...members, ""]);
    }
  };

  const updateMember = (index, value) => {
    const copy = [...members];
    copy[index] = value;
    setMembers(copy);
  };

  const submit = async () => {
    if (!name.trim()) {
      return message.error("Group name is required");
    }

    try {
      setLoading(true);

      //  Create Group
      const res = await api.post("/groups", { name });
      const groupId = res.data._id;

      //  Add Participants
      const validMembers = members.filter((m) => m.trim());

      await Promise.all(
        validMembers.map((member) =>
          api.post(`/participants/${groupId}`, {
            name: member
          })
        )
      );

      message.success("Group created successfully");
      setName("");
      setMembers([""]);
      onCreated();
      onClose();
    } catch (err) {
      message.error("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create New Group"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      {/* Group Name */}
      <Input
        placeholder="Group name (e.g. Goa Trip)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* Participants */}
      <div style={{ marginBottom: 12, fontWeight: 600 }}>
        Participants (max 3)
      </div>

      {members.map((member, index) => (
        <Input
          key={index}
          prefix={<UserOutlined />}
          placeholder={`Member ${index + 1} name`}
          value={member}
          onChange={(e) => updateMember(index, e.target.value)}
          style={{ marginBottom: 8 }}
        />
      ))}

      {/* Add Member Button */}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={addMemberField}
        disabled={members.length >= MAX_MEMBERS}
        block
        style={{ marginBottom: 24 }}
      >
        Add Member
      </Button>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12
        }}
      >
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="primary"
          loading={loading}
          onClick={submit}
        >
          Create Group
        </Button>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;


