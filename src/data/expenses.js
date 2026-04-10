export const CATEGORIES = [
  { id: 'housing',       label: 'Housing',       color: '#6C8EF5' },
  { id: 'food',          label: 'Food',           color: '#F5A26C' },
  { id: 'transport',     label: 'Transport',      color: '#6CF5C2' },
  { id: 'entertainment', label: 'Entertainment',  color: '#F56C9A' },
  { id: 'health',        label: 'Health',         color: '#A26CF5' },
  { id: 'shopping',      label: 'Shopping',       color: '#F5D76C' },
  { id: 'utilities',     label: 'Utilities',      color: '#6CCFF5' },
  { id: 'other',         label: 'Other',          color: '#B0B0B0' },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
)

export const SEED_EXPENSES = [
  { id: 1,  description: 'Monthly Rent',        amount: 1850, category: 'housing',       date: '2026-04-01' },
  { id: 2,  description: 'Grocery Run',         amount: 94,   category: 'food',          date: '2026-04-02' },
  { id: 3,  description: 'Uber to Airport',     amount: 38,   category: 'transport',     date: '2026-04-03' },
  { id: 4,  description: 'Netflix',             amount: 17,   category: 'entertainment', date: '2026-04-03' },
  { id: 5,  description: 'Gym Membership',      amount: 45,   category: 'health',        date: '2026-04-04' },
  { id: 6,  description: 'New Shoes',           amount: 120,  category: 'shopping',      date: '2026-04-05' },
  { id: 7,  description: 'Electric Bill',       amount: 82,   category: 'utilities',     date: '2026-04-05' },
  { id: 8,  description: 'Lunch with Client',   amount: 63,   category: 'food',          date: '2026-04-06' },
  { id: 9,  description: 'Spotify',             amount: 11,   category: 'entertainment', date: '2026-04-06' },
  { id: 10, description: 'Gas',                 amount: 55,   category: 'transport',     date: '2026-04-07' },
  { id: 11, description: 'Doctor Visit',        amount: 30,   category: 'health',        date: '2026-04-07' },
  { id: 12, description: 'Coffee Beans',        amount: 22,   category: 'food',          date: '2026-04-08' },
]

export const MONTHLY_BUDGET = 3000
