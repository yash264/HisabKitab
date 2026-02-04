import { Card, Row, Col, List, Tag, Typography, Tooltip } from "antd";
import { useEffect, useState } from "react";
import api from "../externalAPI/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

const { Title, Text } = Typography;

const COLORS = [
  "#1677ff",
  "#52c41a",
  "#faad14",
  "#ff4d4f",
  "#722ed1",
  "#13c2c2",
  "#eb2f96"
];

const BalanceView = ({ group, refreshKey }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!group) return;
    api.get(`/analytics/${group._id}`).then((res) => setStats(res.data));
  }, [group, refreshKey]);

  if (!stats) return null;

  const balances = Object.entries(stats.balances).map(([name, amount]) => ({
    name,
    amount: Number(amount.toFixed(2))
  }));

  // Add these lines:
  const creditors = balances.filter(b => b.amount > 0).map(b => b.name);
  const debtors = balances.filter(b => b.amount < 0).map(b => b.name);
  const settledMembers = balances.filter(b => b.amount === 0).map(b => b.name);


  const getsTotal = balances
    .filter((b) => b.amount > 0)
    .reduce((s, b) => s + b.amount, 0);

  const owesTotal = Math.abs(
    balances
      .filter((b) => b.amount < 0)
      .reduce((s, b) => s + b.amount, 0)
  );

  const settlementChartData = stats.settlements.map((s) => ({
    name: `${s.from} → ${s.to}`,
    amount: s.amount
  }));

  const formatMoney = (v) => `₹${v.toFixed(2)}`;

  const pieData = balances.map((b) => ({
    name: b.name,
    value: Math.abs(b.amount)
  }));

  // Count creditors and debtors
  const creditorCount = balances.filter((b) => b.amount > 0).length;
  const debtorCount = balances.filter((b) => b.amount < 0).length;
  const settledCount = balances.filter((b) => b.amount === 0).length;


  return (
    <>
      <Row gutter={24}>
        {/* Pie Chart - Overall Settlement */}
        <Col span={12}>
          <Card
            title="Overall Settlement Status"
            style={{ borderRadius: 8, boxShadow: "0 2px 12px rgb(0 0 0 / 0.1)" }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: 12 }}
                />
                <RechartsTooltip formatter={(value) => formatMoney(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* New Creative Summary */}
        <Col span={12}>
          <Card
            title="Balance Summary"
            style={{ borderRadius: 8, boxShadow: "0 2px 12px rgb(0 0 0 / 0.1)" }}
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  label: "Creditors",
                  value: creditorCount,
                  color: "#52c41a",
                  names: creditors // array of creditor names
                },
                {
                  label: "Debtors",
                  value: debtorCount,
                  color: "#ff4d4f",
                  names: debtors // array of debtor names
                },
                {
                  label: "Settled Members",
                  value: settledCount,
                  color: "#1890ff",
                  names: settledMembers // array of settled member names
                }
              ]}
              renderItem={({ label, value, color, names }) => (
                <List.Item
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "12px 20px",
                    gap: 6
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Text strong>{label}</Text>
                    <Tag color={color} style={{ fontWeight: 600, fontSize: 14 }}>
                      {value}
                    </Tag>
                  </div>

                  <div style={{ marginTop: 4, color: "#6b7280", fontSize: 13 }}>
                    {names && names.length > 0 ? names.join(", ") : "—"}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

      </Row>

      {/* Bar Charts */}
      <Row gutter={24} style={{ marginTop: 24 }}>
        {/* Balance Distribution */}
        <Col span={12}>
          <Card
            title="Balance Distribution"
            style={{ borderRadius: 8, boxShadow: "0 2px 12px rgb(0 0 0 / 0.1)" }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={balances} margin={{ left: 10, right: 30 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <RechartsTooltip formatter={(v) => formatMoney(v)} />
                <Bar dataKey="amount">
                  {balances.map((b, i) => (
                    <Cell
                      key={i}
                      fill={b.amount >= 0 ? "#52c41a" : "#ff4d4f"}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Suggested Settlements */}
        <Col span={12}>
          <Card
            title="Suggested Settlements"
            style={{ borderRadius: 8, boxShadow: "0 2px 12px rgb(0 0 0 / 0.1)" }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={settlementChartData} layout="vertical" margin={{ top: 10 }}>
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `₹${v.toFixed(0)}`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={140}
                  tick={{ fontSize: 13 }}
                />
                <RechartsTooltip formatter={(v) => formatMoney(v)} />
                <Bar dataKey="amount" fill="#1677ff" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BalanceView;
