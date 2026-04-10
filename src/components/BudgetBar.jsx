import { useState } from 'react'
import { formatCurrency } from '../utils/format'
import styles from './BudgetBar.module.css'

export function BudgetBar({ spent, budget, pct, onSetBudget }) {
  const [editing, setEditing] = useState(false)
  const [input, setInput]     = useState(String(budget))
  const over     = spent > budget
  const barColor = pct > 90 ? '#F56C6C' : pct > 70 ? '#F5D76C' : '#6CF5C2'

  function handleSave() {
    const val = parseFloat(input)
    if (val && val > 0) onSetBudget(val)
    setEditing(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <span className={styles.label}>Monthly Budget</span>
        <div className={styles.amounts}>
          <span style={{ color: over ? '#F56C6C' : '#f0eee8' }}>{formatCurrency(spent)}</span>
          <span className={styles.slash}> / </span>
          {editing ? (
            <input
              className={styles.budgetInput}
              type="number"
              value={input}
              onChange={e => setInput(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKey}
              autoFocus
            />
          ) : (
            <span
              className={styles.budgetClickable}
              onClick={() => { setInput(String(budget)); setEditing(true) }}
              title="Click to edit budget"
            >
              {formatCurrency(budget)} ✎
            </span>
          )}
        </div>
      </div>

      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%`, background: barColor }} />
      </div>

      <div className={styles.bottom}>
        <span style={{ color: over ? '#F56C6C' : '#6CF5C2' }}>
          {over
            ? `${formatCurrency(spent - budget)} over budget`
            : `${formatCurrency(budget - spent)} remaining`}
        </span>
        <span className={styles.pct}>{Math.round(pct)}%</span>
      </div>
    </div>
  )
}