import { CATEGORY_MAP, CATEGORIES } from '../data/expenses'
import { formatCurrency, formatDate } from '../utils/format'
import styles from './ExpenseList.module.css'

const RECURRENCE_BADGE = {
  weekly:  { label: '🔁 Weekly',  color: '#1f8a5f' },
  monthly: { label: '📅 Monthly', color: '#0b6b4f' },
}

export function ExpenseList({
  expenses, filterCategory, searchQuery, sortBy,
  setFilterCategory, setSearchQuery, setSortBy, onDelete,
}) {
  const recurringTotal = expenses
    .filter(expense => expense.recurring && expense.recurring !== 'none')
    .reduce((total, expense) => total + expense.amount, 0)

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select
          className={styles.select}
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <select
          className={styles.select}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date_desc">Newest first</option>
          <option value="date_asc">Oldest first</option>
          <option value="amount_desc">Highest amount</option>
          <option value="amount_asc">Lowest amount</option>
        </select>
      </div>

      {recurringTotal > 0 && (
        <div className={styles.recurringBanner}>
          <span>🔁 Recurring expenses this month:</span>
          <span className={styles.recurringAmt}>{formatCurrency(recurringTotal)}</span>
        </div>
      )}

      <div className={styles.list}>
        {expenses.length === 0 ? (
          <div className={styles.empty}>No expenses found.</div>
        ) : (
          expenses.map(expense => {
            const category = CATEGORY_MAP[expense.category]
            const recurrenceBadge = expense.recurring && expense.recurring !== 'none'
              ? RECURRENCE_BADGE[expense.recurring]
              : null
            return (
              <div key={expense.id} className={styles.item}>
                <div className={styles.dot} style={{ background: category?.color }} />
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <span className={styles.desc}>{expense.description}</span>
                    {recurrenceBadge && (
                      <span className={styles.badge} style={{ color: recurrenceBadge.color, borderColor: recurrenceBadge.color + '44', background: recurrenceBadge.color + '11' }}>
                        {recurrenceBadge.label}
                      </span>
                    )}
                  </div>
                  <span className={styles.meta}>
                    <span className={styles.catLabel} style={{ color: category?.color }}>{category?.label}</span>
                    <span className={styles.date}>{formatDate(expense.date)}</span>
                  </span>
                </div>
                <span className={styles.amount}>{formatCurrency(expense.amount)}</span>
                <button className={styles.del} onClick={() => onDelete(expense.id)} title="Delete">✕</button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}