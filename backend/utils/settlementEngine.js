const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export const calculateBalances = (expenses) => {
  const balances = {};

  expenses.forEach((e) => {
    const payerId = e.paidBy?._id?.toString();

    // Credit payer
    if (payerId) {
      balances[payerId] = round2((balances[payerId] || 0) + e.amount);
    }

    // Debit participants
    e.splits.forEach((s) => {
      const pid = s.participantId?._id?.toString();
      if (!pid) return;

      balances[pid] = round2((balances[pid] || 0) - s.shareAmount);
    });
  });

  // Set near-zero balances to zero to clean noise
  Object.keys(balances).forEach((id) => {
    if (Math.abs(balances[id]) < 0.01) {
      balances[id] = 0;
    }
  });

  return balances;
};

export const settleBalances = (balances) => {
  const debtors = [];
  const creditors = [];

  // Separate debtors and creditors
  Object.entries(balances).forEach(([id, amount]) => {
    if (amount < 0) {
      debtors.push({ id, amount: -amount }); // owes
    } else if (amount > 0) {
      creditors.push({ id, amount }); // gets
    }
  });

  const settlements = [];

  let i = 0;
  let j = 0;

  // Two-pointer settlement algorithm
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const settleAmount = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.id,
      to: creditor.id,
      amount: Number(settleAmount.toFixed(2))
    });

    debtor.amount -= settleAmount;
    creditor.amount -= settleAmount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return settlements;
};
