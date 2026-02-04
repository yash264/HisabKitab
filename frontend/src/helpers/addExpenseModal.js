import { Modal, Input, Button, Select, message, Divider } from "antd";
import { useEffect, useState } from "react";
import api from "../externalAPI/api";

const { Option } = Select;

const AddExpenseModal = ({ open, onClose, groupId, onAdded }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    paidBy: "",
    splitMode: "equal",
    splits: [] // for custom splits
  });

  useEffect(() => {
    if (!groupId) return;
    api.get(`/participants/${groupId}`).then((res) => {
      setParticipants(res.data);

      // Initialize custom splits
      setForm((f) => ({
        ...f,
        splits: res.data.map((p) => ({ participantId: p._id, shareAmount: 0 }))
      }));
    });
  }, [groupId]);

  const submit = async () => {
    try {
      setLoading(true);

      if (form.splitMode === "custom") {
        const totalSplit = form.splits.reduce(
          (sum, s) => sum + Number(s.shareAmount || 0),
          0
        );
        if (totalSplit !== Number(form.amount)) {
          message.error("Custom splits must add up to total amount!");
          setLoading(false);
          return;
        }
      }

      await api.post("/expenses", {
        ...form,
        amount: Number(form.amount),
        groupId
      });

      message.success("Expense added");
      onAdded();
      onClose();
      // Reset form
      setForm({
        description: "",
        amount: "",
        paidBy: "",
        splitMode: "equal",
        splits: participants.map((p) => ({ participantId: p._id, shareAmount: 0 }))
      });
    } catch (err) {
      console.error(err);
      message.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const handleSplitChange = (participantId, value) => {
    setForm((f) => ({
      ...f,
      splits: f.splits.map((s) =>
        s.participantId === participantId
          ? { ...s, shareAmount: Number(value) }
          : s
      )
    }));
  };

  return (
    <Modal
      title="Add Expense"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ marginBottom: 12 }}
      />

      <Input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        style={{ marginBottom: 12 }}
      />

      <Select
        placeholder="Paid by"
        style={{ width: "100%", marginBottom: 12 }}
        value={form.paidBy || undefined}
        onChange={(paidBy) => setForm({ ...form, paidBy })}
      >
        {participants.map((p) => (
          <Option key={p._id} value={p._id}>
            {p.name}
          </Option>
        ))}
      </Select>

      <Select
        value={form.splitMode}
        style={{ width: "100%", marginBottom: 12 }}
        onChange={(splitMode) => setForm({ ...form, splitMode })}
      >
        <Option value="equal">Equal</Option>
        <Option value="custom">Custom</Option>
      </Select>

      {/* Custom Split Inputs */}
      {form.splitMode === "custom" && (
        <>
          <Divider>Custom Split</Divider>
          {participants.map((p) => (
            <div
              key={p._id}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}
            >
              <span>{p.name}</span>
              <Input
                type="number"
                placeholder="Amount"
                value={
                  form.splits.find((s) => s.participantId === p._id)?.shareAmount || 0
                }
                onChange={(e) => handleSplitChange(p._id, e.target.value)}
                style={{ width: 120 }}
              />
            </div>
          ))}
        </>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" loading={loading} onClick={submit}>
          Add Expense
        </Button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;

