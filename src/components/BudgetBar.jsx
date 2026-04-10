import { formatCurrency } from '../utils/format'
import styles from './BudgetBar.module.css'

export function BudgetBar({ spent, budget, pct }) {
  const over    = spent > budget
  const barColor = pct > 90 ? '#F56C6C' : pct > 70 ? '#F5D76C' : '#6CF5C2'

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <span className={styles.label}>Monthly Budget</span>
        <span className={styles.amounts}>
          <span style={{ color: over ? '#F56C6C' : '#f0eee8' }}>{formatCurrency(spent)}</span>
          <span className={styles.slash}> / </span>
          <span className={styles.budget}>{formatCurrency(budget)}</span>
        </span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: barColor }}
        />
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
