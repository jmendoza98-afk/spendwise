import { CATEGORY_MAP, CATEGORIES } from '../data/expenses'
import { formatCurrency, formatDate } from '../utils/format'
import styles from './ExpenseList.module.css'

export function ExpenseList({
  expenses, filterCategory, searchQuery, sortBy,
  setFilterCategory, setSearchQuery, setSortBy, onDelete,
}) {
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

      <div className={styles.list}>
        {expenses.length === 0 ? (
          <div className={styles.empty}>No expenses found.</div>
        ) : (
          expenses.map(e => {
            const cat = CATEGORY_MAP[e.category]
            return (
              <div key={e.id} className={styles.item}>
                <div className={styles.dot} style={{ background: cat?.color }} />
                <div className={styles.info}>
                  <span className={styles.desc}>{e.description}</span>
                  <span className={styles.meta}>
                    <span className={styles.catLabel} style={{ color: cat?.color }}>{cat?.label}</span>
                    <span className={styles.date}>{formatDate(e.date)}</span>
                  </span>
                </div>
                <span className={styles.amount}>{formatCurrency(e.amount)}</span>
                <button className={styles.del} onClick={() => onDelete(e.id)} title="Delete">✕</button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
