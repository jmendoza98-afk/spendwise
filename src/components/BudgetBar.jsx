import { useState } from 'react'
import { formatCurrency } from '../utils/format'
import styles from './BudgetBar.module.css'

export function BudgetBar({ spent, budget, pct, onSetBudget }) {
  const [editing, setEditing] = useState(false)
  const [input, setInput]     = useState(String(budget))
  const over     = spent > budget
  const barColor = pct > 90 ? '#c0392b' : pct > 70 ? '#c99a12' : '#1f8a5f'

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
          <span style={{ color: over ? '#c0392b' : '#16201c' }}>{formatCurrency(spent)}</span>
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
        <span style={{ color: over ? '#c0392b' : '#1f8a5f' }}>
          {over
            ? `${formatCurrency(spent - budget)} over budget`
            : `${formatCurrency(budget - spent)} remaining`}
        </span>
        <span className={styles.pct}>{Math.round(pct)}%</span>
      </div>
    </div>
  )
}