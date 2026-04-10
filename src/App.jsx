import { useState } from 'react'
import { useExpenses } from './hooks/useExpenses'
import { StatCard } from './components/StatCard'
import { BudgetBar } from './components/BudgetBar'
import { SpendingChart } from './components/SpendingChart'
import { ExpenseList } from './components/ExpenseList'
import { AddExpenseForm } from './components/AddExpenseForm'
import { formatCurrency } from './utils/format'
import styles from './App.module.css'

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const {
    filtered, totalSpent, remaining, budgetPct, byCategory,
    filterCategory, searchQuery, sortBy,
    setFilterCategory, setSearchQuery, setSortBy,
    addExpense, deleteExpense, budget, setBudget,
  } = useExpenses()

  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.logo}>spend<span>wise</span></h1>
            <p className={styles.sub}>Personal Finance Dashboard</p>
          </div>
          <button className={styles.addBtn} onClick={() => setShowForm(true)}>
            + Add Expense
          </button>
        </div>

        {/* Stat cards */}
        <div className={styles.stats}>
          <StatCard
            label="Total Spent"
            value={formatCurrency(totalSpent)}
            sub="This month"
            accent="#6C8EF5"
          />
          <StatCard
            label="Remaining"
            value={formatCurrency(Math.abs(remaining))}
            sub={remaining < 0 ? 'Over budget' : 'Left in budget'}
            accent={remaining < 0 ? '#F56C6C' : '#6CF5C2'}
          />
          <StatCard
            label="Transactions"
            value={filtered.length}
            sub="Recorded expenses"
            accent="#F5A26C"
          />
          {topCategory && (
            <StatCard
              label="Top Category"
              value={formatCurrency(topCategory[1])}
              sub={topCategory[0].charAt(0).toUpperCase() + topCategory[0].slice(1)}
              accent="#F56C9A"
            />
          )}
        </div>

        {/* Budget bar + chart */}
        <div className={styles.middle}>
          <div className={styles.budgetWrap}>
            <BudgetBar spent={totalSpent} budget={budget} pct={budgetPct} onSetBudget={setBudget} />
          </div>
          <SpendingChart byCategory={byCategory} />
        </div>

        {/* Expense list */}
        <ExpenseList
          expenses={filtered}
          filterCategory={filterCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          setFilterCategory={setFilterCategory}
          setSearchQuery={setSearchQuery}
          setSortBy={setSortBy}
          onDelete={deleteExpense}
        />

      </div>

      {showForm && (
        <AddExpenseForm onAdd={addExpense} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
