import { Tabs, Empty } from "antd";
import ExpensesView from "../helpers/expensesView";
import BalancesView from "../helpers/balancesView";
import AnalyticsView from "../helpers/analyticsView";


const GroupContent = ({ group }) => {
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
          children: <ExpensesView group={group} />
        },
        {
          key: "analyticsbalances",
          label: "Balances",
          children: <AnalyticsView group={group} />
        },
        {
          key: "analytics",
          label: "Analytics",
          children: <BalancesView group={group} />
        }
      ]}
    />
  );
};

export default GroupContent;
