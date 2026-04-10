import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { CATEGORIES, CATEGORY_MAP } from '../data/expenses'
import { formatCurrency } from '../utils/format'
import styles from './SpendingChart.module.css'

export function SpendingChart({ byCategory }) {
  const data = CATEGORIES
    .filter(c => byCategory[c.id])
    .map(c => ({ name: c.label, value: byCategory[c.id], color: c.color }))

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className={styles.wrap}>
      <span className={styles.title}>Spending by Category</span>
      <div className={styles.inner}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              formatter={(val) => formatCurrency(val)}
              contentStyle={{
                background: '#eaeaef',
                border: '1px solid #2a2a32',
                borderRadius: '8px',
                color: '#f0eee8',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.legend}>
          {data.map(d => (
            <div key={d.name} className={styles.legendItem}>
              <span className={styles.dot} style={{ background: d.color }} />
              <span className={styles.legendName}>{d.name}</span>
              <span className={styles.legendVal}>{Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
