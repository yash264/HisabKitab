import { useState } from "react";
import { Tabs, Empty } from "antd";
import ExpensesView from "../helpers/expensesView";
import BalancesView from "../helpers/balancesView";
import AnalyticsView from "../helpers/analyticsView";
import api from "../externalAPI/api";


const GroupContent = ({ group }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const addExpense = async (newExpense) => {
    await api.post('/expenses', newExpense);
    setRefreshKey(prev => prev + 1);
  };

  if (!group) {
    return (
      <Empty
        description="Select a group to view expenses"
        style={{ marginTop: 100 }}
      />
    );
  }

  return (
    <Tabs
      defaultActiveKey="expenses"
      items={[
        {
          key: "expenses",
          label: "Expenses",
          children: <ExpensesView group={group} refreshKey={refreshKey} />
        },
        {
          key: "analyticsbalances",
          label: "Balances",
          children: <AnalyticsView group={group} refreshKey={refreshKey} />
        },
        {
          key: "analytics",
          label: "Analytics",
          children: <BalancesView group={group} refreshKey={refreshKey} />
        }
      ]}
    />
  );
};

export default GroupContent;
