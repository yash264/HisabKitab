import { Card, List, Button, Tag, Spin, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../externalAPI/api";
import AddExpenseModal from "./addExpenseModal";


const ExpensesView = ({ group }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const load = async () => {
    if (!group) return;
    setLoading(true);
    const res = await api.get(`/expenses/${group._id}`);
    setExpenses(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [group]);

  return (
    <>
      <Card
        title={<span style={{ fontWeight: 700 }}>Expenses</span>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Add Expense
          </Button>
        }
        bodyStyle={{ padding: 0 }}
      >
        {loading ? (
          <div style={{ padding: 24, textAlign: "center" }}>
            <Spin />
          </div>
        ) : expenses.length === 0 ? (
          <Empty
            description="No expenses yet"
            style={{ padding: 32 }}
          />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={expenses}
            renderItem={(e) => (
              <List.Item
                style={{
                  padding: "14px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                <List.Item.Meta
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap"
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>
                        {e.description}
                      </span>

                      {e.paidBy?.name && (
                        <Tag
                          style={{
                            backgroundColor: "#52c41a", // green
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 13,
                            borderRadius: 4,
                            padding: "0 6px"
                          }}
                        >
                          Paid by {e.paidBy.name}
                        </Tag>
                      )}
                    </div>
                  }
                  description={
                    <span style={{ color: "#6b7280", fontSize: 13 }}>
                      {new Date(e.createdAt).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  }
                />

                {/* Amount */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    backgroundColor: "#52c41a", // blue background
                    borderRadius: 6,
                    padding: "4px 10px",
                    minWidth: 80,
                    textAlign: "center"
                  }}
                >
                  ₹{e.amount.toFixed(2)}
                </div>

              </List.Item>

            )}
          />
        )}
      </Card>

      <AddExpenseModal
        open={open}
        onClose={() => setOpen(false)}
        groupId={group?._id}
        onAdded={load}
      />
    </>
  );
};

export default ExpensesView;
