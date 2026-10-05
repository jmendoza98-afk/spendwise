export const CATEGORIES = [
  { id: 'housing',       label: 'Housing',       color: '#2f5d8a' },
  { id: 'food',          label: 'Food',          color: '#d17a22' },
  { id: 'transport',     label: 'Transport',     color: '#1f8a5f' },
  { id: 'entertainment', label: 'Entertainment', color: '#b8456f' },
  { id: 'health',        label: 'Health',        color: '#6b52b3' },
  { id: 'shopping',      label: 'Shopping',      color: '#c99a12' },
  { id: 'utilities',     label: 'Utilities',     color: '#2a85a8' },
  { id: 'other',         label: 'Other',         color: '#7b8580' },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
)

export const RECURRENCE_OPTIONS = [
  { id: 'none',    label: 'One-time' },
  { id: 'weekly',  label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
]

export const SEED_EXPENSES = [
  { id: 1,  description: 'Monthly Rent',        amount: 1850, category: 'housing',       date: '2026-04-01', recurring: 'monthly' },
  { id: 2,  description: 'Grocery Run',         amount: 94,   category: 'food',          date: '2026-04-02', recurring: 'none' },
  { id: 3,  description: 'Uber to Airport',     amount: 38,   category: 'transport',     date: '2026-04-03', recurring: 'none' },
  { id: 4,  description: 'Netflix',             amount: 17,   category: 'entertainment', date: '2026-04-03', recurring: 'monthly' },
  { id: 5,  description: 'Gym Membership',      amount: 45,   category: 'health',        date: '2026-04-04', recurring: 'monthly' },
  { id: 6,  description: 'New Shoes',           amount: 120,  category: 'shopping',      date: '2026-04-05', recurring: 'none' },
  { id: 7,  description: 'Electric Bill',       amount: 82,   category: 'utilities',     date: '2026-04-05', recurring: 'monthly' },
  { id: 8,  description: 'Lunch with Client',   amount: 63,   category: 'food',          date: '2026-04-06', recurring: 'none' },
  { id: 9,  description: 'Spotify',             amount: 11,   category: 'entertainment', date: '2026-04-06', recurring: 'monthly' },
  { id: 10, description: 'Gas',                 amount: 55,   category: 'transport',     date: '2026-04-07', recurring: 'weekly' },
  { id: 11, description: 'Doctor Visit',        amount: 30,   category: 'health',        date: '2026-04-07', recurring: 'none' },
  { id: 12, description: 'Coffee Beans',        amount: 22,   category: 'food',          date: '2026-04-08', recurring: 'weekly' },
]

export const MONTHLY_BUDGET = 3000
