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
                     background: '#ffffff',
                      border: '1px solid #cfd8d4',
                      borderRadius: '8px',
                      color: '#16201c',
                      fontSize: '12px',
                      fontWeight: 600,
                        }}
                        itemStyle={{ color: '#16201c' }}
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
                    <stop offset="5%"  stopColor="#0b6b4f" stopOpacity={0.25} />
                     <stop offset="95%" stopColor="#0b6b4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e3e9e6" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: '#6b7772', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: '#6b7772', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${v}`}
                width={45}
              />
              <Tooltip
                contentStyle={{
                   background: '#ffffff',
                    border: '1px solid #cfd8d4',
                    borderRadius: '8px',
                    color: '#16201c',
                    fontSize: '12px',
                    fontWeight: 600,
                    }}
                    itemStyle={{ color: '#16201c' }}
                labelStyle={{ color: '#0b6b4f', fontWeight: 700 }}
                formatter={(val) => [formatCurrency(val), 'Cumulative']}
              />
              <Area
                 type="monotone"
                  dataKey="cumulative"
                  stroke="#0b6b4f"
                  strokeWidth={2}
                  fill="url(#trendGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: '#0b6b4f' }}
                />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}



