const monthlyIncome = 3200;

const expenseData = [
  { name: "Rent", amount: 1200, group: "essential" },
  { name: "Groceries", amount: 420, group: "essential" },
  { name: "Transport", amount: 210, group: "essential" },
  { name: "Internet", amount: 90, group: "essential" },
  { name: "Dining out", amount: 180, group: "nonessential" },
  { name: "Entertainment", amount: 160, group: "nonessential" },
  { name: "Utilities", amount: 180, group: "essential" }
];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
const essentialsSpend = expenseData
  .filter((item) => item.group === "essential")
  .reduce((sum, item) => sum + item.amount, 0);
const nonEssentialsSpend = expenseData
  .filter((item) => item.group === "nonessential")
  .reduce((sum, item) => sum + item.amount, 0);
const remainingBalance = monthlyIncome - totalExpenses;

function renderExpenseList() {
  const list = document.getElementById("expenseList");

  expenseData.forEach((item) => {
    const row = document.createElement("li");
    row.className = `expense-item ${item.group}`;

    row.innerHTML = `
      <div>
        <span class="expense-name">${item.name}</span>
        <span class="expense-tag">${item.group === "essential" ? "Essential" : "Lifestyle"}</span>
      </div>
      <strong>${formatter.format(item.amount)}</strong>
    `;

    list.appendChild(row);
  });
}

function updateSummary() {
  document.getElementById("monthlyIncome").textContent = formatter.format(monthlyIncome);
  document.getElementById("totalExpenses").textContent = formatter.format(totalExpenses);
  document.getElementById("essentialSpend").textContent = formatter.format(essentialsSpend);
  document.getElementById("nonEssentialSpend").textContent = formatter.format(nonEssentialsSpend);
  document.getElementById("remainingBalance").textContent = formatter.format(remainingBalance);

  const budgetStatus = remainingBalance >= 0 ? "On track" : "Needs attention";
  document.getElementById("budgetStatus").textContent = budgetStatus;
  document.getElementById("budgetStatus").classList.toggle("warning", remainingBalance < 0);
}

renderExpenseList();
updateSummary();