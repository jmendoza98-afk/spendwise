import { useState } from 'react'
import { CATEGORIES } from '../data/expenses'
import styles from './AddExpenseForm.module.css'

const EMPTY = { description: '', amount: '', category: 'food', date: new Date().toISOString().slice(0, 10) }

export function AddExpenseForm({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.description.trim()) return setError('Description is required.')
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError('Enter a valid amount.')
    onAdd({ ...form, amount: parseFloat(Number(form.amount).toFixed(2)) })
    setForm(EMPTY)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Expense</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <input
              className={styles.input}
              placeholder="e.g. Grocery run"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Amount ($)</label>
              <input
                className={styles.input}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <div className={styles.categories}>
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  type="button"
                  className={`${styles.catBtn} ${form.category === c.id ? styles.catActive : ''}`}
                  style={{ '--cat-color': c.color }}
                  onClick={() => set('category', c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit}>Add Expense</button>
        </form>
      </div>
    </div>
  )
}
