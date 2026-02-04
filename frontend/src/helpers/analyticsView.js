import { Card, Row, Col, List, Tag, Typography, Empty } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../externalAPI/api";

const { Title, Text } = Typography;

const AnalyticsView = ({ group }) => {
  const [stats, setStats] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!group) return;

    //  Fetch analytics (balances & settlements)
    api.get(`/analytics/${group._id}`).then((res) => setStats(res.data));

    //  Fetch expenses to calculate member contributions
    api.get(`/expenses/${group._id}`).then((res) => setExpenses(res.data));
  }, [group]);

  if (!stats) return null;

  const contributions = expenses.reduce((acc, e) => {
    const payer = e.paidBy?.name || "Unknown";
    acc[payer] = (acc[payer] || 0) + e.amount;
    return acc;
  }, {});

  const contributionEntries = Object.entries(contributions).map(([name, amount]) => ({
    name,
    amount
  }));

  return (
    <>
      {/* 🔹 TOP SUMMARY */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card bordered={false} style={{ borderRadius: 8, boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)" }}>
            <Title level={4}>Total Spent</Title>
            <Text strong style={{ fontSize: 24, color: "#1677ff" }}>
              ₹{stats.totalSpent.toFixed(2)}
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ borderRadius: 8, boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)" }}>
            <Title level={4}>Expenses</Title>
            <Text strong style={{ fontSize: 24, color: "#faad14" }}>
              {stats.expenseCount}
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ borderRadius: 8, boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)" }}>
            <Title level={4}>Avg per Person</Title>
            <Text strong style={{ fontSize: 24, color: "#52c41a" }}>
              ₹{stats.avgPerPerson.toFixed(2)}
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ borderRadius: 8, boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)" }}>
            <Title level={4}>Members</Title>
            <Text strong style={{ fontSize: 24, color: "#722ed1" }}>
              {Object.keys(stats.balances).length}
            </Text>
          </Card>
        </Col>
      </Row>

      {/* 🔹 MEMBER CONTRIBUTIONS + SETTLEMENTS */}
      <Row gutter={24}>
        {/* LEFT — MEMBER CONTRIBUTIONS */}
        <Col span={12}>
          <Card title="Member Contributions" bodyStyle={{ padding: 0 }}>
            {contributionEntries.length === 0 ? (
              <Empty style={{ padding: 32 }} description="No contributions yet" />
            ) : (
              <List
                dataSource={contributionEntries}
                renderItem={({ name, amount }) => (
                  <List.Item
                    style={{
                      padding: "14px 20px",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{name}</span>
                    <Tag color="#1677ff" style={{ fontWeight: 600 }}>
                      ₹{amount.toFixed(2)}
                    </Tag>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>

        {/* RIGHT — SETTLEMENTS */}
        <Col span={12}>
          <Card title="Suggested Settlements" bodyStyle={{ padding: 0 }}>
            {stats.settlements?.length === 0 ? (
              <Empty description="Nothing to settle 🎉" style={{ padding: 32 }} />
            ) : (
              <List
                dataSource={stats.settlements}
                renderItem={(s) => (
                  <List.Item style={{ padding: "14px 20px", display: "flex", alignItems: "center" }}>
                    <Tag
                      style={{
                        backgroundColor: "#ff4d4f", // red background
                        color: "#fff",              // white text
                        fontWeight: 600,
                        fontSize: 14
                      }}
                    >
                      {s.from}
                    </Tag>

                    <ArrowRightOutlined style={{ margin: "0 8px", color: "#000" }} />

                    <Tag
                      style={{
                        backgroundColor: "#52c41a", // green background
                        color: "#fff",              // white text
                        fontWeight: 600,
                        fontSize: 14
                      }}
                    >
                      {s.to}
                    </Tag>

                    <span style={{ marginLeft: 8, fontWeight: 600 }}>
                      ₹{s.amount.toFixed(2)}
                    </span>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>

      </Row>
    </>
  );
};

export default AnalyticsView;

