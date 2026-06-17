import { useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Area, AreaChart
} from 'recharts'
import { CATEGORIES, CATEGORY_MAP } from '../data/expenses'
import { formatCurrency } from '../utils/format'
import styles from './SpendingChart.module.css'

function getTrendData(expenses) {
  const grouped = {}
  expenses.forEach(e => {
    if (!grouped[e.date]) grouped[e.date] = 0
    grouped[e.date] += e.amount
  })
  const sorted = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]))
  let running = 0
  return sorted.map(([date, amount]) => {
    running += amount
    return {
      date,
      label: new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      daily: amount,
      cumulative: running,
    }
  })
}

export function SpendingChart({ byCategory, expenses }) {
  const [view, setView] = useState('pie')

  const pieData = CATEGORIES
    .filter(c => byCategory[c.id])
    .map(c => ({ name: c.label, value: byCategory[c.id], color: c.color }))

  const total    = pieData.reduce((s, d) => s + d.value, 0)
  const trendData = getTrendData(expenses)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>Spending Overview</span>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${view === 'pie' ? styles.active : ''}`}
            onClick={() => setView('pie')}
          >
            By Category
          </button>
          <button
            className={`${styles.tab} ${view === 'trend' ? styles.active : ''}`}
            onClick={() => setView('trend')}
          >
            Trend
          </button>
        </div>
      </div>

      {view === 'pie' ? (
        <div className={styles.inner}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => formatCurrency(val)}
                contentStyle={{
                  background: '#1e1e26',
                  border: '1px solid #2a2a32',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
                itemStyle={{ color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.legend}>
            {pieData.map(d => (
              <div key={d.name} className={styles.legendItem}>
                <span className={styles.dot} style={{ background: d.color }} />
                <span className={styles.legendName}>{d.name}</span>
                <span className={styles.legendVal}>{Math.round((d.value / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.trendWrap}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6C8EF5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6C8EF5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e1e2a" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: '#555560', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: '#555560', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${v}`}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  background: '#1e1e26',
                  border: '1px solid #2a2a32',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
                itemStyle={{ color: '#ffffff' }}
                labelStyle={{ color: '#6C8EF5', fontWeight: 700 }}
                formatter={(val) => [formatCurrency(val), 'Cumulative']}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#6C8EF5"
                strokeWidth={2}
                fill="url(#trendGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#6C8EF5' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}



